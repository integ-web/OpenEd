-- OpenEd v1 auth/IAM hardening.
-- This migration repairs profile creation, role escalation risk, and RLS gaps
-- without mutating the original foundation migration destructively.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_opened_role()
returns public.opened_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_opened_team()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_opened_role() = 'opened_team', false)
$$;

create or replace function public.owns_course(course_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.courses
    where id = course_uuid and owner_id = auth.uid()
  )
$$;

create or replace function public.can_edit_course(course_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.courses
    where id = course_uuid
      and owner_id = auth.uid()
      and status in ('draft', 'changes_requested')
  ) or public.is_opened_team()
$$;

create or replace function public.can_edit_lesson(lesson_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.lessons l
    join public.modules m on m.id = l.module_id
    where l.id = lesson_uuid
      and public.can_edit_course(m.course_id)
  )
$$;

create or replace function public.can_review_submission(submission_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_opened_team() or exists (
    select 1
    from public.artifact_submissions s
    join public.artifact_templates at on at.id = s.template_id
    join public.lessons l on l.id = at.lesson_id
    join public.modules m on m.id = l.module_id
    join public.courses c on c.id = m.course_id
    where s.id = submission_uuid
      and c.owner_id = auth.uid()
  )
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', 'OpenEd learner'),
    'learner'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_opened_profile on auth.users;
create trigger on_auth_user_created_opened_profile
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.prevent_self_role_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role
    and auth.uid() = new.id
    and not public.is_opened_team()
  then
    raise exception 'Users cannot update their own OpenEd role';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_self_role_update on public.profiles;
create trigger prevent_self_role_update
  before update on public.profiles
  for each row execute function public.prevent_self_role_update();

create or replace function public.grant_educator_role(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_opened_team() then
    raise exception 'Only OpenEd Team can grant educator role';
  end if;

  update public.profiles
  set role = 'educator', updated_at = now()
  where id = target_user_id and role <> 'opened_team';
end;
$$;

comment on function public.grant_educator_role(uuid)
  is 'OpenEd Team-only path for educator grants. opened_team remains manually/admin provisioned only.';

create table if not exists public.platform_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id uuid,
  note text not null default '',
  created_at timestamptz not null default now()
);

alter table public.platform_audit_log enable row level security;

drop policy if exists "profiles update own limited" on public.profiles;
create policy "profiles update own non role fields" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and role = public.current_opened_role());

drop policy if exists "team updates profiles roles" on public.profiles;
create policy "team updates profiles roles" on public.profiles
  for update using (public.is_opened_team())
  with check (public.is_opened_team());

drop policy if exists "team inserts audit log" on public.platform_audit_log;
create policy "team inserts audit log" on public.platform_audit_log
  for insert with check (public.is_opened_team() or actor_id = auth.uid());

drop policy if exists "team reads audit log" on public.platform_audit_log;
create policy "team reads audit log" on public.platform_audit_log
  for select using (public.is_opened_team() or actor_id = auth.uid());

drop policy if exists "educators insert course versions" on public.course_versions;
create policy "educators insert course versions" on public.course_versions
  for insert with check (public.can_edit_course(course_id));

drop policy if exists "educators update course versions" on public.course_versions;
create policy "educators update course versions" on public.course_versions
  for update using (public.can_edit_course(course_id))
  with check (public.can_edit_course(course_id));

drop policy if exists "educators insert modules" on public.modules;
create policy "educators insert modules" on public.modules
  for insert with check (public.can_edit_course(course_id));

drop policy if exists "educators update modules" on public.modules;
create policy "educators update modules" on public.modules
  for update using (public.can_edit_course(course_id))
  with check (public.can_edit_course(course_id));

drop policy if exists "educators delete modules" on public.modules;
create policy "educators delete modules" on public.modules
  for delete using (public.can_edit_course(course_id));

drop policy if exists "educators insert lessons" on public.lessons;
create policy "educators insert lessons" on public.lessons
  for insert with check (
    exists (select 1 from public.modules m where m.id = module_id and public.can_edit_course(m.course_id))
  );

drop policy if exists "educators update lessons" on public.lessons;
create policy "educators update lessons" on public.lessons
  for update using (
    exists (select 1 from public.modules m where m.id = module_id and public.can_edit_course(m.course_id))
  ) with check (
    exists (select 1 from public.modules m where m.id = module_id and public.can_edit_course(m.course_id))
  );

drop policy if exists "educators delete lessons" on public.lessons;
create policy "educators delete lessons" on public.lessons
  for delete using (
    exists (select 1 from public.modules m where m.id = module_id and public.can_edit_course(m.course_id))
  );

drop policy if exists "sources readable through lesson" on public.sources;
create policy "sources readable through published or owned course" on public.sources
  for select using (
    exists (
      select 1
      from public.lessons l
      join public.modules m on m.id = l.module_id
      join public.courses c on c.id = m.course_id
      where l.id = lesson_id
        and (c.status in ('approved', 'published') or c.owner_id = auth.uid() or public.is_opened_team())
    )
  );

drop policy if exists "educators manage sources" on public.sources;
create policy "educators manage sources" on public.sources
  for all using (public.can_edit_lesson(lesson_id))
  with check (public.can_edit_lesson(lesson_id));

drop policy if exists "educators manage media assets" on public.media_assets;
create policy "educators manage media assets" on public.media_assets
  for all using (public.can_edit_lesson(lesson_id))
  with check (public.can_edit_lesson(lesson_id));

drop policy if exists "educators manage quiz questions" on public.quiz_questions;
create policy "educators manage quiz questions" on public.quiz_questions
  for all using (public.can_edit_lesson(lesson_id))
  with check (public.can_edit_lesson(lesson_id));

drop policy if exists "educators manage artifact templates" on public.artifact_templates;
create policy "educators manage artifact templates" on public.artifact_templates
  for all using (public.can_edit_lesson(lesson_id))
  with check (public.can_edit_lesson(lesson_id));

drop policy if exists "educators manage rubrics" on public.rubrics;
create policy "educators manage rubrics" on public.rubrics
  for all using (
    exists (
      select 1 from public.artifact_templates at
      where at.id = artifact_template_id and public.can_edit_lesson(at.lesson_id)
    )
  ) with check (
    exists (
      select 1 from public.artifact_templates at
      where at.id = artifact_template_id and public.can_edit_lesson(at.lesson_id)
    )
  );

drop policy if exists "educators manage rubric criteria" on public.rubric_criteria;
create policy "educators manage rubric criteria" on public.rubric_criteria
  for all using (
    exists (
      select 1
      from public.rubrics r
      join public.artifact_templates at on at.id = r.artifact_template_id
      where r.id = rubric_id and public.can_edit_lesson(at.lesson_id)
    )
  ) with check (
    exists (
      select 1
      from public.rubrics r
      join public.artifact_templates at on at.id = r.artifact_template_id
      where r.id = rubric_id and public.can_edit_lesson(at.lesson_id)
    )
  );

drop policy if exists "learners own submissions educators team read" on public.artifact_submissions;
create policy "learners own submissions owner educator team read" on public.artifact_submissions
  for select using (user_id = auth.uid() or public.can_review_submission(id));

drop policy if exists "educators update reviewable submissions" on public.artifact_submissions;
create policy "educators update reviewable submissions" on public.artifact_submissions
  for update using (public.can_review_submission(id))
  with check (public.can_review_submission(id));

drop policy if exists "educators and team score rubrics" on public.rubric_scores;
create policy "educators score owned course submissions" on public.rubric_scores
  for all using (public.can_review_submission(submission_id))
  with check (public.can_review_submission(submission_id));

drop policy if exists "portfolio accepted proof inserts" on public.portfolio_items;
create policy "portfolio accepted proof inserts" on public.portfolio_items
  for insert with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.artifact_submissions s
      where s.id = artifact_submission_id
        and s.user_id = auth.uid()
        and s.status = 'accepted'
    )
  );

drop policy if exists "byok preferences own no keys" on public.byok_preferences_without_keys;
create policy "byok preferences own no keys" on public.byok_preferences_without_keys
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

comment on table public.byok_preferences_without_keys
  is 'Stores provider/model/storage preferences only. BYOK key material must remain browser-only and must never be written to Supabase.';

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_courses_owner_status on public.courses(owner_id, status);
create index if not exists idx_course_versions_course on public.course_versions(course_id);
create index if not exists idx_modules_course_position on public.modules(course_id, position);
create index if not exists idx_lessons_module_position on public.lessons(module_id, position);
create index if not exists idx_sources_lesson on public.sources(lesson_id);
create index if not exists idx_media_assets_lesson on public.media_assets(lesson_id);
create index if not exists idx_enrollments_user_course on public.enrollments(user_id, course_id);
create index if not exists idx_lesson_progress_user_lesson on public.lesson_progress(user_id, lesson_id);
create index if not exists idx_quiz_questions_lesson on public.quiz_questions(lesson_id);
create index if not exists idx_quiz_attempts_user_question on public.quiz_attempts(user_id, question_id);
create index if not exists idx_artifact_templates_lesson on public.artifact_templates(lesson_id);
create index if not exists idx_artifact_submissions_user_template on public.artifact_submissions(user_id, template_id);
create index if not exists idx_rubrics_artifact_template on public.rubrics(artifact_template_id);
create index if not exists idx_rubric_criteria_rubric on public.rubric_criteria(rubric_id);
create index if not exists idx_rubric_scores_submission on public.rubric_scores(submission_id);
create index if not exists idx_portfolio_items_user on public.portfolio_items(user_id);
create index if not exists idx_course_reviews_course on public.course_reviews(course_id);
create index if not exists idx_review_findings_review on public.review_findings(course_review_id);
create index if not exists idx_moderation_reports_status on public.moderation_reports(status);
create index if not exists idx_ai_tutor_sessions_user_lesson on public.ai_tutor_sessions(user_id, lesson_id);
create index if not exists idx_platform_audit_actor on public.platform_audit_log(actor_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at before update on public.courses
  for each row execute function public.set_updated_at();

drop trigger if exists set_lesson_progress_updated_at on public.lesson_progress;
create trigger set_lesson_progress_updated_at before update on public.lesson_progress
  for each row execute function public.set_updated_at();

drop trigger if exists set_artifact_submissions_updated_at on public.artifact_submissions;
create trigger set_artifact_submissions_updated_at before update on public.artifact_submissions
  for each row execute function public.set_updated_at();

drop trigger if exists set_byok_preferences_updated_at on public.byok_preferences_without_keys;
create trigger set_byok_preferences_updated_at before update on public.byok_preferences_without_keys
  for each row execute function public.set_updated_at();
