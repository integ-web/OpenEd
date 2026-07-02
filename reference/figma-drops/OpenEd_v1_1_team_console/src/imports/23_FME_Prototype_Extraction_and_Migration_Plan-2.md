# FME Prototype Extraction and Migration Plan for OpenEd

## Purpose

This document explains how to turn the current Frontier Model Evaluations course prototype into OpenEd v1 without throwing away the useful work.

## What to keep

The current FME prototype contains reusable assets:

- Course shell.
- Course route structure.
- Lesson runtime concepts.
- BYOK coach panel.
- Video reference player.
- Source library.
- Glossary.
- Evidence card library.
- Artifact builders.
- Capstone studio.
- Content QA screen.
- Design token work.
- Course content data.

## What to change

| Current issue | OpenEd migration fix |
|---|---|
| FME-specific labels | Generalize to course/runtime vocabulary. |
| Dark theme too heavy | Light-first OpenEd theme and calmer dark mode. |
| Lesson screens repetitive | Lesson type variants. |
| Flat UI | Add visual learning moments and progress maps. |
| Capstone weak but usable | Keep for prototype; rebuild later as generic project studio. |
| Hardcoded data | Move to course schema. |
| Course-only app | Add auth, learner, educator, proof surfaces. |
| BYOK coach prototype | Formalize tutor modes and storage/security. |

## Refactor plan

### Step 1: Rename and reframe

- App name: OpenEd.
- FME becomes first course.
- Routes under `/course/:courseSlug/...`.
- Components under generic names.

### Step 2: Extract course runtime

Create:

- CourseShell.
- CourseDashboard.
- LearningPath.
- LessonWorkspace.
- SourceDrawer.
- TutorPanel.
- QuizRuntime.
- ArtifactRuntime.
- PortfolioRuntime.

### Step 3: Add platform shell

Create:

- Public landing.
- Auth pages.
- Learner dashboard.
- Course catalog.
- Educator Studio.
- OpenEd Team console.

### Step 4: Build data model

Move from local course data to Supabase tables:

- courses.
- modules.
- lessons.
- sources.
- enrollments.
- progress.
- artifacts.
- rubrics.
- tutor_sessions.

### Step 5: Fix design system

- Light mode default.
- Dark mode softened.
- Phone/tablet/desktop breakpoints.
- New OpenEd brand tokens.
- Course-specific accent colors.
- More visual diagrams and milestones.

### Step 6: Capstone treatment

For v1:

- Keep FME capstone as prototype project.
- Label as "FME Capstone Prototype."
- Do not present as the universal OpenEd capstone model.

Later:

- Build generic Project Studio template.
- Add reviewer defense.
- Add stronger quality gates.

## Component mapping

| FME component | OpenEd component |
|---|---|
| BYOKCoachPanel | AITutorPanel |
| VideoReferencePlayer | LessonMediaPlayer |
| EvidenceCardBuilder | ArtifactBuilder / ProofCardBuilder |
| BenchmarkPacketBuilder | Course-specific ArtifactTemplate |
| RiskDashboardBuilder | ProjectDashboardBuilder |
| CapstoneStudio | ProjectStudio |
| ContentQAScreen | PublishReadinessQA |
| SourcesScreen | SourceLibrary |
| GlossaryScreen | Glossary |

## Migration risks

| Risk | Mitigation |
|---|---|
| Break existing FME flow | Keep FME as seeded course data and test routes. |
| Overgeneralize too early | Generalize only shared runtime primitives. |
| Add Educator Studio before learner runtime stabilizes | Build in parallel but release learner first. |
| UI remains flat | Create lesson variants and visual excitement kit. |
| Mobile is an afterthought | Build phone lesson and tutor flow early. |

## Completion criteria

Migration is successful when:

- FME works as a course inside OpenEd.
- Learner app is not FME-branded only.
- Educator can draft a new course using the same schema.
- Artifacts flow into SkillProof portfolio.
- OpenEd Team can review course QA.
- Responsive UI is acceptable on phone, tablet, desktop.


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
