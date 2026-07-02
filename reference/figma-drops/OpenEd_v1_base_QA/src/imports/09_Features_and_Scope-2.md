# OpenEd Features and Scope Document

## Purpose

This document defines what OpenEd v1 includes, what it excludes, and what should be phased later. The goal is to prevent product sprawl while still building a complete v1 with learner app, educator studio, and assessment/proof engine.

## V1 feature summary

| Product surface | V1 features |
|---|---|
| Learner App | Auth, course catalog, dashboard, lesson workspace, AI tutor, sources, quizzes, artifacts, progress, SkillProof portfolio. |
| Educator Studio | Course draft, lesson editor, source cards, media fields, quiz builder, rubric builder, artifact template, publish-readiness QA. |
| Assessment and Proof Engine | Quiz attempts, feedback, artifact submissions, rubric scores, revision states, portfolio proof levels. |
| OpenEd Team Console | Course review queue, content QA, source QA, abuse reports, role management, aggregate metrics. |

## Must-have v1

### Learner

- Signup/login.
- Enroll in FME course.
- Resume learning.
- Lesson screen with video/text/source/tutor/practice/build tabs.
- BYOK setup and mock/no-key fallback.
- Progress tracking.
- Quiz attempts with explanations.
- Artifact submission and save state.
- SkillProof portfolio.

### Educator

- Educator onboarding.
- Course outline builder.
- Lesson builder.
- Source card editor.
- Quiz builder.
- Rubric builder.
- Artifact builder template.
- Preview as learner.
- Publish-readiness QA.
- Submit for review.

### Assessment/proof

- Quiz engine.
- Question bank model.
- Attempt history.
- Artifact schema.
- Rubric schema.
- Feedback state.
- Revision history.
- Proof levels.

### Platform team

- Review dashboard.
- Course approval status.
- Report queue.
- Role management.
- Audit log.

## Should-have v1.1

- Google login.
- AI-assisted educator content drafting.
- Better source ingestion.
- Basic semantic search across course sources.
- Tutor answer rating and failure reports.
- Peer feedback optional.
- Course import/export format.
- Public portfolio sharing.
- More polished mobile gestures.

## Could-have later

- University portal.
- Organization portal.
- Employer proof view.
- Paid verified assessment.
- Live cohorts.
- Community forums.
- Mentorship marketplace.
- Full proctoring.
- SCORM/LTI.
- LMS migration tools.
- Multi-language course authoring.

## Won't-have in v1

- Employer dashboards.
- Marketplace payments.
- Institution SSO.
- Full LMS gradebook.
- Proctored high-stakes exams.
- Automatic certification that claims job readiness.
- External video frame analysis for videos OpenEd cannot legally or technically access.
- Hidden storage of BYOK keys on OpenEd servers.

## Scope boundaries

### AI tutor

V1 tutor can:

- Explain course concepts.
- Answer from lesson/source context.
- Ask Socratic questions.
- Provide hints.
- Give quiz explanations.
- Help interpret rubric fields.
- Suggest next learning steps.

V1 tutor should not:

- Guarantee correctness.
- Grade high-stakes submissions alone.
- Bypass learning by giving direct final answers where the goal is practice.
- Access hidden video visuals without provided transcript/frames/metadata.
- Store learner API keys on server.

### Assessment

V1 assessment can:

- Track quizzes.
- Capture artifacts.
- Apply rubrics.
- Show feedback.
- Build proof portfolio.

V1 assessment should not:

- Claim fraud-proof certification.
- Replace human grading for high-stakes credentials.
- Use invasive proctoring.

### Educator Studio

V1 Studio can:

- Create structured courses.
- Enforce content completeness.
- Run QA checks.
- Submit for review.

V1 Studio should not:

- Auto-generate entire courses without educator responsibility.
- Publish courses without review.
- Become a full video-hosting CDN unless needed later.

## Feature prioritization method

Use this rule:

```text
Build first if it improves the learning loop, proof loop, or course quality loop.
Delay if it primarily improves marketplace scale, enterprise admin, or monetization.
```


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
