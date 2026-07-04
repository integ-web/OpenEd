# OpenEd Roadmap and Future Progress Document

## Purpose

This roadmap is written for builders and investors. It shows how OpenEd grows from FME prototype into a scalable platform without trying to build all of Coursera, Udemy, DataCamp, and Moodle at once.

## Stage 0: Current state

Assets:

- FME course content and prototype.
- Course runtime concepts.
- BYOK tutor concept.
- Source library.
- Artifact builders.
- Capstone concept.
- Supabase direction.

Gaps:

- Platform identity.
- Auth/IAM completion.
- Generic course schema.
- Educator Studio.
- Assessment and Proof Engine.
- Strong mobile/tablet UX.
- AI tutor pedagogy system.
- Better design system.

## Stage 1: OpenEd v1 closed beta

Goal: Prove learner loop with FME.

Build:

- Auth and profiles.
- Learner app.
- FME as first course.
- Lesson runtime.
- AI tutor BYOK v0.
- Sources.
- Quizzes.
- Artifacts.
- Portfolio.
- Basic metrics.

Success:

- Learners complete first lessons.
- Learners use tutor.
- Learners submit artifacts.
- Design feels better than static LMS.

## Stage 2: Educator Studio v0

Goal: Prove course creation and QA.

Build:

- Course outline builder.
- Lesson editor.
- Source cards.
- Quiz/rubric builder.
- Artifact template builder.
- Publish-readiness QA.
- OpenEd Team review queue.

Success:

- 5-10 educators can create course drafts.
- QA catches missing sources/assessments.
- Courses feel less generic.

## Stage 3: Assessment and Proof Engine v1

Goal: Make proof credible.

Build:

- Proof ladder.
- Rubric scoring.
- Revision history.
- Portfolio proof items.
- Artifact feedback.
- Course completion certificate with proof context.

Success:

- Portfolio is more trusted than certificate-only output.
- Learners revise after feedback.

## Stage 4: AI Tutor v1.5

Goal: Move from chatbot to tutor.

Build:

- Intent classification.
- Pedagogical modes.
- Source-grounded retrieval.
- Rubric-aware feedback.
- Tutor answer ratings.
- Tutor failure review dashboard.
- Visual anchor cards.

Success:

- Tutor helpfulness above target.
- Lower hallucination reports.
- Higher practice/artifact completion among tutor users.

## Stage 5: Open course ecosystem

Goal: Grow supply carefully.

Build:

- Educator applications.
- Course review system.
- Public course catalog.
- Course quality badges.
- Public SkillProof portfolios.
- Community learning spaces.

Success:

- Courses grow without quality collapse.
- Learner retention improves.

## Stage 6: Institution and organization portals

Not v1. Build only after core learning/proof loop is strong.

Possible features:

- Cohorts.
- Organization admin.
- University portal.
- Gradebook.
- Private courses.
- Team analytics.
- SSO.
- LMS integrations.

## Investor narrative

OpenEd can grow through compounding layers:

1. Course runtime.
2. Tutor engine.
3. Educator Studio.
4. Proof system.
5. Course quality graph.
6. SkillProof graph.
7. Institution/organization layer.

The first moat is not content volume. It is the system that turns learning into proof.

## Milestones

| Horizon | Milestone |
|---|---|
| 0-4 weeks | Product docs, auth, FME runtime extraction, design refresh. |
| 1-2 months | Closed FME beta, tutor v0, artifacts, metrics. |
| 3 months | Educator Studio v0, QA review, 2nd course draft. |
| 6 months | Proof engine v1, public beta, portfolio sharing. |
| 9-12 months | Tutor v1.5, course catalog, educator onboarding. |
| 12+ months | Community, verified assessment, portals. |

## Stage gates

Do not move to next stage unless:

- Current stage has working product flows.
- Metrics are instrumented.
- User research confirms value.
- Quality and safety risks are manageable.


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
