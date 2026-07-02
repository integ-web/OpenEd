# OpenEd V1 Product Requirements Document

## Product summary

OpenEd v1 is a free AI-native learning platform built around one flagship course, Frontier Model Evaluations. V1 must prove that learners can learn, ask, practice, build, and prove progress; educators can create structured source-mapped courses; and the platform team can maintain quality through QA and IAM.

## Goals

1. Launch FME as the first OpenEd course.
2. Implement learner app end-to-end.
3. Implement educator studio v0.
4. Implement assessment/proof engine v0.
5. Implement AI tutor BYOK v0.
6. Implement Supabase auth/IAM and core data model.
7. Improve visual system across phone, tablet, desktop.

## Non-goals

- Employer portals.
- University portals.
- Paid marketplace.
- Full LMS replacement.
- High-stakes proctoring.
- Enterprise SSO.
- Fully proprietary visual-video tutor.

## User stories

### Learner

- As a learner, I can sign up and enroll in a free course.
- As a learner, I can resume my current lesson.
- As a learner, I can ask the AI tutor for explanation.
- As a learner, I can complete a quiz and see feedback.
- As a learner, I can submit an artifact and receive rubric guidance.
- As a learner, I can view my SkillProof portfolio.

### Educator

- As an educator, I can create a course draft.
- As an educator, I can add lessons, sources, quizzes, rubrics, and artifacts.
- As an educator, I can preview as learner.
- As an educator, I can run publish-readiness QA.
- As an educator, I can submit a course for review.

### OpenEd Team

- As a reviewer, I can review course quality.
- As a reviewer, I can approve, reject, or request changes.
- As a moderator, I can review reported content.
- As an admin, I can assign roles.

## Functional requirements

### Auth

- Email/password login.
- Session persistence.
- Route protection.
- Role-based access.
- Profile creation.

### Course runtime

- Course catalog.
- Course dashboard.
- Learning path.
- Lesson workspace.
- Source drawer.
- Glossary.
- Progress tracking.

### AI tutor

- BYOK setup.
- Session-only mode.
- Optional local browser storage with warning.
- Lesson-grounded context.
- Prompt chips.
- Tutor ratings.
- Report answer issue.

### Educator Studio

- Course draft CRUD.
- Lesson CRUD.
- Source card CRUD.
- Quiz/rubric CRUD.
- Artifact template CRUD.
- Publish-readiness QA.

### Assessment and proof

- Quiz attempts.
- Feedback.
- Artifact submissions.
- Rubric scoring.
- Revision history.
- Portfolio items.

### OpenEd Team console

- Course review queue.
- Course status transitions.
- Report queue.
- Audit events.

## Non-functional requirements

| Requirement | Target |
|---|---|
| Accessibility | WCAG-informed design; keyboard/focus states; transcripts. |
| Performance | Initial course pages under 3s on decent connection. |
| Security | RLS on all user data; no service role in frontend. |
| Privacy | No BYOK key in logs; data minimization. |
| Responsiveness | Phone, tablet, desktop. |
| Reliability | Autosave artifacts and lesson progress. |
| Maintainability | Data-driven course content and reusable components. |

## Release criteria

- Learner can complete first FME module path.
- Educator can create one draft course.
- OpenEd Team can review course draft.
- BYOK tutor works or gracefully falls back.
- Artifact appears in portfolio.
- Mobile and desktop QA pass.
- RLS policies pass basic tests.
- No service role key exposed.
- No course content requires missing video to learn.

## Open questions

1. Is OpenEd fully open-source, hybrid, or proprietary?
2. Does BYOK remain client-only or move to optional no-log server gateway?
3. How will educator applications be approved?
4. How high-stakes should v1 proof claims be?
5. Which course comes after FME?


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
