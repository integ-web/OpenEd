# OpenEd Technical Architecture and Data Model

## Architecture overview

OpenEd v1 can be built with:

- React/Vite frontend from the current FME codebase.
- Supabase Auth.
- Supabase Postgres.
- Row Level Security.
- Supabase Storage for course assets and artifact attachments.
- Optional Edge Functions for AI tutor gateway, QA jobs, and signed operations.
- pgvector later for source retrieval.

## Frontend layers

```text
App shell
  -> Auth provider
  -> Role guard
  -> Course runtime
  -> Learner app
  -> Educator studio
  -> OpenEd team console
  -> Shared components
```

## Backend layers

```text
Supabase Auth
Postgres tables + RLS
Storage buckets
Edge functions
  - tutor gateway optional
  - content QA jobs
  - media metadata jobs
  - signed portfolio export
```

## Core schema

### profiles

- id uuid pk references auth.users.
- email.
- full_name.
- role: learner, educator, opened_team.
- educator_status.
- onboarded.
- created_at.
- updated_at.

### courses

- id uuid.
- slug.
- title.
- description.
- status: draft, review, changes_requested, published, archived.
- owner_id.
- level.
- hours.
- public_visibility.
- created_at.
- updated_at.

### course_versions

- id uuid.
- course_id.
- version_number.
- content_json.
- published_at.
- created_by.

### modules

- id uuid.
- course_id.
- title.
- order_index.
- learning_outcomes.

### lessons

- id uuid.
- module_id.
- title.
- objective.
- content_json.
- lesson_type.
- order_index.

### sources

- id uuid.
- course_id.
- lesson_id nullable.
- title.
- author_org.
- url.
- type.
- difficulty.
- required.
- why_it_matters.
- section_or_timestamp.

### enrollments

- id uuid.
- user_id.
- course_id.
- status.
- started_at.
- completed_at.

### lesson_progress

- id uuid.
- user_id.
- lesson_id.
- progress_percent.
- progress_seconds.
- completed.
- updated_at.

### quiz_attempts

- id uuid.
- user_id.
- quiz_id.
- score.
- responses_json.
- completed_at.

### artifact_templates

- id uuid.
- course_id.
- lesson_id.
- schema_json.
- rubric_id.

### artifact_submissions

- id uuid.
- user_id.
- artifact_template_id.
- content_json.
- status.
- revision_number.
- submitted_at.

### rubrics

- id uuid.
- course_id.
- criteria_json.
- passing_threshold.

### artifact_feedback

- id uuid.
- submission_id.
- reviewer_type: ai, educator, opened_team.
- reviewer_id nullable.
- rubric_scores_json.
- feedback_text.
- created_at.

### portfolio_items

- id uuid.
- user_id.
- artifact_submission_id.
- visibility.
- public_slug nullable.
- created_at.

### tutor_sessions

- id uuid.
- user_id.
- course_id.
- lesson_id.
- provider.
- mode.
- created_at.

Do not store BYOK keys in this table.

### tutor_messages

- id uuid.
- session_id.
- role.
- message_text.
- redacted_metadata_json.
- rating nullable.
- reported boolean.
- created_at.

Store only if user consents. Consider no-message-storage default for BYOK mode.

### course_reviews

- id uuid.
- course_id.
- reviewer_id.
- status.
- findings_json.
- decision.
- created_at.

### audit_events

- id uuid.
- actor_id.
- action.
- entity_type.
- entity_id.
- metadata_json.
- created_at.

## RLS principles

- Learners can read their own progress, artifacts, tutor sessions, and portfolio private data.
- Educators can edit only their own course drafts.
- Educators can view learner submissions only for their courses and only when enabled.
- OpenEd Team can review content through role policies and audited actions.
- Public course data can be read by everyone only when course status is published.

## AI architecture

### Client-side BYOK path

- User enters key.
- Key stored in memory or optional local browser storage.
- Browser sends request to provider.
- Course context is assembled in client.

Use for simple/open tutor mode.

### Server tutor gateway path

- User enters key.
- Browser sends key to Edge Function for one request.
- Edge Function uses hidden tutor policy.
- Key is never stored/logged.
- Response returns to browser.

Use for proprietary tutor mode and safety controls.

## Video/progress tracking

- OpenEd-hosted videos: use native HTML5 events.
- YouTube embeds: use IFrame Player API when embeddable.
- External blocked videos: fallback to text/transcript progress.
- Track progress by time, percent, and checkpoint completion.

## Storage buckets

| Bucket | Purpose |
|---|---|
| course-assets | Course media, diagrams, downloadable files. |
| educator-drafts | Draft media and source attachments. |
| artifact-attachments | Learner artifact uploads. |
| portfolio-exports | Generated exports. |

## Event instrumentation

Events:

- user_signed_up.
- course_enrolled.
- lesson_started.
- lesson_completed.
- source_opened.
- tutor_question_asked.
- tutor_answer_rated.
- quiz_submitted.
- artifact_started.
- artifact_saved.
- artifact_submitted.
- portfolio_item_created.
- educator_course_created.
- course_qa_run.
- course_submitted_for_review.
- course_published.

## Technical failure modes

| Failure | Mitigation |
|---|---|
| RLS misconfiguration | Automated policy tests. |
| Frontend role guard bypass | Server/RLS checks; UI is not authority. |
| BYOK key logged | Redaction middleware and no logs for headers/body keys. |
| Course JSON becomes unmanageable | Versioned schema and migrations. |
| External video blocked | Fallback text/summary/transcript path. |
| Mobile app too slow | Lazy loading, code splitting, lightweight lessons. |


---

## Source notes

This document is grounded in the current OpenEd/FME project context and the following reference set where applicable:

- Uploaded Frontier Model Evaluations prototype code bundle, latest inspected bundle: Design System for Frontier Model Evaluation (5).zip.
- Uploaded Frontier Model Evaluations 51-hour curriculum and Module 1 foundations files.
- Coursera, Udemy, DataCamp, Moodle, Khanmigo, Duolingo public documentation and product pages.
- Supabase Auth and Row Level Security documentation.
- OpenAI API key safety guidance, MDN Web APIs, and YouTube IFrame Player API documentation.
- Bloom's 2 sigma problem, intelligent tutoring systems research, CourseAssist, LearnLM-Tutor, DCCI, and UNESCO guidance for generative AI in education.

Document version: OpenEd v1 planning pack, 2026-06-17.
