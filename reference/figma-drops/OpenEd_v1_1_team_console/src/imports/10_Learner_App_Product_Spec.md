# OpenEd Learner App Product Spec

## Goal

The Learner App lets students learn for free, ask doubts, practice, build artifacts, and see proof of progress. It should be the strongest product surface in v1 because learner trust and engagement determine whether OpenEd matters.

## Core learner promise

> Learn actively, ask freely, practice immediately, and build proof of what you understand.

## Information architecture

- Home.
- Course catalog.
- My learning.
- Course dashboard.
- Learning path.
- Lesson workspace.
- Sources.
- Glossary.
- Artifacts.
- SkillProof portfolio.
- AI tutor settings.

## Main screens

### 1. Learner home

Shows:

- Continue learning.
- Current course progress.
- Next lesson.
- Next artifact.
- AI tutor status.
- Recommended next step.

Avoid:

- Too many KPI cards.
- Empty dashboards.

### 2. Course catalog

V1 has FME as flagship. Catalog can show future courses as "coming soon" but should not fake availability.

Course card fields:

- Title.
- Level.
- Hours.
- Free.
- Format.
- Proof output.
- Source-backed badge.
- AI tutor available badge.

### 3. Learning path

Shows modules/lessons as a clear path:

- Required lessons.
- Practice tasks.
- Artifacts.
- Capstone/project.
- Advanced sources.

### 4. Lesson workspace

Desktop layout:

- Left/main: lesson content.
- Right: AI tutor.
- Bottom/side drawer: sources, transcript, rubric.

Mobile layout:

- Top: lesson title and progress.
- Content sections stacked.
- AI tutor as bottom sheet.
- Sources as drawer.

Tabs:

- Watch/Read.
- Understand.
- Practice.
- Build.
- Sources.

### 5. AI tutor panel

States:

- No key configured.
- Session key configured.
- Local browser key configured.
- Managed/mock mode.
- Answer loading.
- Tutor could not answer from sources.
- Escalate to educator / report issue.

### 6. Practice and quiz

Must include:

- Question/task.
- Learner input.
- Submit.
- Feedback.
- Explanation.
- Retry.
- Ask tutor for hint.

### 7. Artifact builder

Fields:

- Artifact title.
- Course/module connection.
- Guided fields.
- Rubric.
- Examples/non-examples.
- Save draft.
- Submit.
- Feedback.
- Revision.
- Add to portfolio.

### 8. SkillProof portfolio

Shows:

- Courses completed.
- Artifacts created.
- Skills demonstrated.
- Rubric feedback.
- Revision history.
- Source-backed learning path.
- Export/share controls.

## Mobile-first requirements

- Lesson can be completed on phone.
- Tutor can be used on phone.
- Quizzes work on phone.
- Artifact drafts work on phone, but long artifacts can suggest desktop for best experience.
- Offline/low-data text mode later.

## Learner data

Track:

- Course enrollments.
- Lesson starts/completions.
- Video progress where possible.
- Source opens.
- Tutor prompts and ratings, without storing sensitive API keys.
- Quiz attempts.
- Artifact drafts/submissions/revisions.
- Portfolio exports.

## Learner app failure modes

| Failure | Prevention |
|---|---|
| Learner gets lost | Persistent next action and breadcrumb. |
| AI tutor gives answer directly | Tutoring policy uses hints and Socratic mode. |
| Lessons feel repetitive | Template variants by lesson type. |
| Course feels too hard | Diagnostic, simpler explanations, glossary. |
| BYOK setup blocks learning | Mock mode and text content still work without AI. |
| Mobile artifact builder is painful | Step-by-step draft mode and save state. |

## Acceptance criteria

- A learner can sign up, enroll in FME, complete a lesson, ask the tutor, pass a quiz, save an artifact, and see it in the portfolio.
- The same flow works on desktop, tablet, and phone.
- The product is useful even if the learner never configures BYOK.


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
