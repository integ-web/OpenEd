# OpenEd Context and Strategy Document

## Executive summary

OpenEd is an independent AI-native learning platform. The current Frontier Model Evaluations course is the first flagship course and the first proof of the product model. The platform should not be positioned as a course website, a generic LMS, or an AI chatbot wrapper. It should be positioned as a serious learning system where learners can learn, ask, practice, build, get feedback, and prove capability.

The v1 product is made of three surfaces:

1. Learner App - the course runtime and student learning experience.
2. Educator Studio - the course creation, source mapping, rubric, and publish-readiness system.
3. Assessment and Proof Engine - quizzes, artifacts, rubrics, portfolio outputs, and mastery states.

## Why the FME prototype matters

The FME prototype already contains several unusually strong primitives for a future learning platform:

- A serious course shell.
- Lessons with structured objectives and sources.
- BYOK AI coach direction.
- Source library and glossary patterns.
- Evidence cards and artifact builders.
- A capstone studio concept.
- Content QA direction.
- A design language around evidence, risk, rubrics, and proof.

The prototype is currently course-specific and visually imperfect. OpenEd should extract the reusable primitives and generalize them into a platform kit.

## What changes from FME to OpenEd

| Current FME prototype | OpenEd v1 platform |
|---|---|
| One course | Multi-course architecture, with FME as first course |
| Course-specific artifacts | Generic artifact/proof model |
| FME capstone | Generic capstone/project studio template |
| Evaluation-specific sources | Source cards for all courses |
| Course AI coach | Course-grounded AI tutor system |
| Course QA | Platform publish-readiness QA |
| Static course runtime | Learner + educator + proof surfaces |

## Strategic position

OpenEd should own the category: "free AI-native serious learning."

The unique combination is:

```text
Free learner access + BYOK AI tutor + source-mapped lessons + educator QA + artifact-based proof + SkillProof portfolio
```

The first wedge is not "replace Coursera" or "replace Moodle." The wedge is narrower and stronger:

> Serious online courses should not be passive video playlists. They should be source-backed, tutor-assisted, practice-driven, and proof-producing.

## Scope of v1

V1 must prove that a learner can complete one serious course end-to-end and generate credible evidence of progress.

In v1, OpenEd should support:

- Auth and three user roles.
- Course catalog with FME as the flagship course.
- Course runtime for lessons, sources, tutor, progress, quiz, and artifact checkpoints.
- BYOK AI tutor with secure, honest copy and clear limitations.
- Educator Studio v0 for course creation.
- Publish-readiness QA for course quality.
- Assessment and Proof Engine v0.
- SkillProof portfolio.
- Responsive phone, tablet, desktop experience.

V1 should not support:

- Employer dashboards.
- University portals.
- Paid cohort management.
- Enterprise SSO.
- SCORM/LTI integration.
- Proctored exams.
- A full marketplace.
- Complex multi-grader workflows.

## Principles

1. Learners stay free.
2. Educators must earn publishing trust through course quality, not fame.
3. AI is a tutor and assistant, not a replacement for educator judgment.
4. Every lesson should connect to a source, a task, and a proof artifact where possible.
5. The product must be mobile-usable from day one.
6. The platform must separate learning support from proof of mastery.
7. The design must be clear, warm, and serious - not a dark, flat dashboard.

## Strategic risks

| Risk | Why it matters | Strategy |
|---|---|---|
| Becoming generic edtech | Incumbents are large and sticky | Own source-mapped, tutor-assisted, proof-based courses. |
| AI tutor hallucination | Can destroy learner trust | Ground tutor in course content; cite sources; use uncertainty states. |
| Weak proof | Certificates become meaningless | Use artifacts, rubrics, revision history, and portfolios. |
| Educator spam | Open platforms invite low-quality content | Publish-readiness QA and OpenEd Team review. |
| Cost pressure | Free learners can be expensive | BYOK, cached context, optional managed AI later. |
| Device fragmentation | India is mobile-heavy but courses need desktop | Responsive layouts with task-appropriate modes. |

## Strategy test

The v1 succeeds if:

- Learners finish more than a passive video course.
- Learners use the AI tutor for real explanations and practice feedback.
- Learners produce artifacts that could be shown in a portfolio.
- Educators can create a source-mapped course without engineering help.
- The OpenEd Team can review course quality before publication.


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
