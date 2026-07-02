create type public.opened_role as enum ('learner', 'educator', 'opened_team');
create type public.course_status as enum ('draft', 'submitted', 'changes_requested', 'approved', 'published', 'rejected');
create type public.submission_status as enum ('draft', 'submitted', 'scored', 'revision_requested', 'accepted');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.opened_role not null default 'learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  owner_id uuid references public.profiles(id),
  status public.course_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.course_versions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  version_number int not null default 1,
  status public.course_status not null default 'draft',
  submitted_at timestamptz,
  reviewed_at timestamptz
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  position int not null
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  position int not null,
  minutes int not null default 30,
  transcript text not null default ''
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  organization text,
  url text,
  source_type text not null default 'paper',
  required boolean not null default true
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  media_type text not null,
  url text
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, course_id)
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  practice_completed boolean not null default false,
  artifact_completed boolean not null default false,
  quiz_completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  prompt text not null,
  choices jsonb not null default '[]',
  answer_index int not null,
  feedback text not null default ''
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  answer_index int not null,
  correct boolean not null,
  created_at timestamptz not null default now()
);

create table public.artifact_templates (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  prompt text not null
);

create table public.artifact_submissions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.artifact_templates(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  status public.submission_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rubrics (
  id uuid primary key default gen_random_uuid(),
  artifact_template_id uuid references public.artifact_templates(id) on delete cascade,
  title text not null
);

create table public.rubric_criteria (
  id uuid primary key default gen_random_uuid(),
  rubric_id uuid references public.rubrics(id) on delete cascade,
  label text not null,
  max_score int not null default 4
);

create table public.rubric_scores (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.artifact_submissions(id) on delete cascade,
  criterion_id uuid references public.rubric_criteria(id) on delete cascade,
  score int not null,
  feedback text not null default ''
);

create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  artifact_submission_id uuid references public.artifact_submissions(id) on delete set null,
  title text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table public.course_reviews (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  reviewer_id uuid references public.profiles(id),
  decision public.course_status not null,
  note text not null default '',
  created_at timestamptz not null default now()
);

create table public.review_findings (
  id uuid primary key default gen_random_uuid(),
  course_review_id uuid references public.course_reviews(id) on delete cascade,
  category text not null,
  severity text not null,
  note text not null
);

create table public.moderation_reports (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete set null,
  lesson_id uuid references public.lessons(id) on delete set null,
  reporter_id uuid references public.profiles(id) on delete set null,
  severity text not null,
  note text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table public.ai_tutor_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  provider text not null default 'mock',
  created_at timestamptz not null default now()
);

create table public.ai_tutor_messages_optional (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.ai_tutor_sessions(id) on delete cascade,
  role text not null check (role in ('learner', 'tutor')),
  content text not null,
  created_at timestamptz not null default now()
);

create table public.byok_preferences_without_keys (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  provider text not null default 'mock',
  model text,
  storage_mode text not null default 'session',
  updated_at timestamptz not null default now(),
  constraint no_key_material check (
    provider not like '%key%' and coalesce(model, '') not like '%sk-%'
  )
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_versions enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.sources enable row level security;
alter table public.media_assets enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.artifact_templates enable row level security;
alter table public.artifact_submissions enable row level security;
alter table public.rubrics enable row level security;
alter table public.rubric_criteria enable row level security;
alter table public.rubric_scores enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.course_reviews enable row level security;
alter table public.review_findings enable row level security;
alter table public.moderation_reports enable row level security;
alter table public.ai_tutor_sessions enable row level security;
alter table public.ai_tutor_messages_optional enable row level security;
alter table public.byok_preferences_without_keys enable row level security;

create function public.current_opened_role()
returns public.opened_role
language sql
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "profiles read own or team" on public.profiles
  for select using (id = auth.uid() or public.current_opened_role() = 'opened_team');

create policy "profiles update own limited" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "published courses are readable" on public.courses
  for select using (status in ('approved', 'published') or owner_id = auth.uid() or public.current_opened_role() = 'opened_team');

create policy "educators create own courses" on public.courses
  for insert with check (owner_id = auth.uid() and public.current_opened_role() in ('educator', 'opened_team'));

create policy "educators update own drafts" on public.courses
  for update using (owner_id = auth.uid() or public.current_opened_role() = 'opened_team');

create policy "course children readable with course" on public.modules
  for select using (exists (select 1 from public.courses c where c.id = course_id));

create policy "lesson readable through module" on public.lessons
  for select using (exists (
    select 1 from public.modules m join public.courses c on c.id = m.course_id
    where m.id = module_id
  ));

create policy "sources readable through lesson" on public.sources
  for select using (true);

create policy "learners own enrollment" on public.enrollments
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "learners own progress" on public.lesson_progress
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "quiz questions readable" on public.quiz_questions for select using (true);
create policy "artifact templates readable" on public.artifact_templates for select using (true);
create policy "rubrics readable" on public.rubrics for select using (true);
create policy "rubric criteria readable" on public.rubric_criteria for select using (true);

create policy "learners own quiz attempts" on public.quiz_attempts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "learners own submissions educators team read" on public.artifact_submissions
  for select using (user_id = auth.uid() or public.current_opened_role() in ('educator', 'opened_team'));

create policy "learners submit artifacts" on public.artifact_submissions
  for insert with check (user_id = auth.uid());

create policy "educators and team score rubrics" on public.rubric_scores
  for all using (public.current_opened_role() in ('educator', 'opened_team'))
  with check (public.current_opened_role() in ('educator', 'opened_team'));

create policy "portfolio owner readable team readable" on public.portfolio_items
  for select using (user_id = auth.uid() or public.current_opened_role() = 'opened_team');

create policy "team manages course reviews" on public.course_reviews
  for all using (public.current_opened_role() = 'opened_team')
  with check (public.current_opened_role() = 'opened_team');

create policy "team manages findings" on public.review_findings
  for all using (public.current_opened_role() = 'opened_team')
  with check (public.current_opened_role() = 'opened_team');

create policy "reports readable to owner and team" on public.moderation_reports
  for select using (reporter_id = auth.uid() or public.current_opened_role() = 'opened_team');

create policy "authenticated users create reports" on public.moderation_reports
  for insert with check (reporter_id = auth.uid());

create policy "tutor sessions own" on public.ai_tutor_sessions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "tutor messages own via session" on public.ai_tutor_messages_optional
  for all using (
    exists (select 1 from public.ai_tutor_sessions s where s.id = session_id and s.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.ai_tutor_sessions s where s.id = session_id and s.user_id = auth.uid())
  );

create policy "byok preferences own no keys" on public.byok_preferences_without_keys
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
