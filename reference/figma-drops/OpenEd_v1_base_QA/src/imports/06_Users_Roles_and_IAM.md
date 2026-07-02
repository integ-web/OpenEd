# OpenEd Users, Roles, and IAM Document

## Scope

OpenEd v1 has exactly three user categories:

1. OpenEd Team.
2. Students / Learners.
3. Educators.

This document defines v1 user roles, permissions, onboarding states, and IAM boundaries. It intentionally excludes employers, universities, organization admins, paid cohorts, and enterprise portals until later phases.

## Role model

### OpenEd Team

The OpenEd Team manages platform quality and trust.

Capabilities:

- Review courses submitted by educators.
- Approve, reject, or request changes.
- View course QA reports.
- Manage reported content.
- Manage public/private course visibility.
- Manage educator verification status.
- View aggregate analytics.
- Manage platform policies.
- Manage role assignments.
- Moderate harmful or spam content.

Restrictions:

- Cannot access learner BYOK keys.
- Should not access private learner artifacts except for support/moderation with audit logs.
- Cannot impersonate users without explicit audited support flow.

### Student / Learner

The learner uses OpenEd to learn, ask, practice, and build proof.

Capabilities:

- Create account and profile.
- Enroll in free courses.
- Save lesson progress.
- Use AI tutor if configured.
- Manage BYOK settings.
- Complete quizzes.
- Submit artifacts.
- Receive feedback.
- Build SkillProof portfolio.
- Export/share portfolio items.
- Delete own data where legally and technically feasible.

Restrictions:

- Cannot edit course content.
- Cannot view other learners' private artifacts.
- Cannot publish courses unless upgraded to educator role.

### Educator

The educator creates courses.

Capabilities:

- Create course drafts.
- Add lessons, sources, media, quizzes, rubrics, artifacts.
- Preview course as learner.
- Run course QA checks.
- Submit course for review.
- Edit own draft courses.
- View own course analytics.
- Respond to learner feedback if enabled.
- Review learner artifacts only for courses they own and only when that feature is enabled.

Restrictions:

- Cannot publish without OpenEd Team approval.
- Cannot access learner BYOK keys.
- Cannot override platform safety policy.
- Cannot view analytics across other educators' courses.

## Permission matrix

| Capability | Learner | Educator | OpenEd Team |
|---|---:|---:|---:|
| View public courses | Yes | Yes | Yes |
| Enroll in course | Yes | Yes | Yes |
| Save progress | Yes | Yes | Optional |
| Use AI tutor | Yes | Yes | Yes |
| Create course draft | No | Yes | Yes |
| Submit course for QA | No | Yes | Yes |
| Approve course | No | No | Yes |
| View course QA | Own learning only | Own courses | All |
| Submit artifacts | Yes | Optional | Optional |
| Grade artifacts | No | Own courses | Review mode |
| Moderate content | No | Own course comments only | Yes |
| Manage roles | No | No | Yes |
| View platform analytics | No | Own courses | Aggregate/all |
| Access BYOK key | User only | User only | Never |

## Authentication

V1 should support:

- Email/password sign-up and login.
- Forgot password.
- Email verification if enabled.
- Session persistence.
- Protected routes.
- Profile creation on sign-up.
- Role-based route guards.

Later:

- Google login.
- Magic links.
- Passkeys.
- MFA.
- Institution SSO.

## Supabase security posture

Use Supabase Auth and Postgres Row Level Security. RLS should be enabled on all public schema tables that contain user or course data. Policies should use `auth.uid()` for ownership checks and explicitly check authentication. The service role key must never appear in frontend code.

## Core tables

| Table | Purpose |
|---|---|
| profiles | User profile, display name, role, onboarding status. |
| courses | Course metadata and status. |
| course_versions | Versioned course content. |
| course_enrollments | Learner-course relationships. |
| lesson_progress | Per-lesson progress and completion. |
| artifacts | Learner-created proof objects. |
| artifact_feedback | Rubric feedback and revisions. |
| tutor_sessions | Non-sensitive tutor session metadata. |
| educator_courses | Educator-course ownership. |
| course_reviews | OpenEd Team QA decisions. |
| content_reports | Abuse/safety reports. |
| audit_events | Sensitive admin and moderation actions. |

## Route access

### Public

- Landing.
- Course preview.
- Login.
- Signup.
- Forgot password.
- Public portfolio items if learner explicitly shares.

### Learner-protected

- Dashboard.
- Learning map.
- Lesson workspace.
- Quiz.
- Artifact builder.
- Portfolio.
- BYOK settings.

### Educator-protected

- Educator dashboard.
- Course drafts.
- Lesson builder.
- Source card editor.
- Quiz/rubric builder.
- Publish-readiness QA.

### OpenEd Team-protected

- Course review queue.
- Reports/moderation.
- Platform analytics.
- Role management.
- Policy configuration.

## IAM failure modes

| Failure mode | Prevention |
|---|---|
| Learner sees another learner's artifact | RLS owner checks, route guards, test fixtures. |
| Educator publishes unreviewed course | Course status machine; publish action restricted. |
| Admin actions not auditable | audit_events table required. |
| BYOK key exposed | Never store on server; never log; optional browser storage warning. |
| Role escalation bug | Server-side checks and RLS, not UI-only checks. |
| Deleted course breaks learner records | Soft-delete and versioned course references. |

## V1 role-state machine

```text
anonymous -> learner_pending_email -> learner_active
learner_active -> educator_applicant -> educator_active
educator_active -> educator_suspended
open_ed_team_member -> open_ed_reviewer -> open_ed_admin
```

Educator role should not be self-granted in v1 unless the platform explicitly allows public course drafting. Publishing rights always require OpenEd Team approval.


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
