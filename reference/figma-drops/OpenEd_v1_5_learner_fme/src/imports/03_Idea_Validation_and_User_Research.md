# OpenEd Idea Validation and User Research Plan

## Purpose

This document defines how OpenEd should be validated before overbuilding. The goal is to test the riskiest assumptions around learner demand, educator creation, AI tutor usefulness, proof credibility, and willingness to adopt.

## Riskiest assumptions

| Assumption | Why risky | Validation method |
|---|---|---|
| Learners want source-mapped courses | Learners may prefer quick videos | Landing page and onboarding tests. |
| BYOK is acceptable | Learners may not understand API keys | Usability test with 10-15 learners. |
| AI tutor improves persistence | Tutor could become a novelty | Cohort A/B test: tutor vs no tutor. |
| Artifacts feel valuable | Learners may avoid extra work | Measure artifact start and completion rates. |
| Educators will use structured Studio | Creators may prefer easy uploads | Educator prototype test. |
| OpenEd QA is acceptable | Educators may dislike review | Interview educators on publishing barriers. |
| Proof engine is trusted | Rubric scores may feel arbitrary | Blind review of portfolios by educators. |

## User research segments

### Learners

Recruit at least 30 learners across:

- College students from Tier 1, 2, and 3 cities.
- Self-learners using YouTube, Coursera, Udemy, DataCamp, freeCodeCamp, or ChatGPT.
- Early professionals upskilling after work.
- Learners with strong English and learners who prefer simpler English/Hinglish explanations.
- Mobile-first learners and desktop-heavy learners.

### Educators

Recruit at least 15 educators across:

- YouTube/course creators.
- College faculty.
- Independent mentors.
- Bootcamp instructors.
- Professionals who want to teach but have not published a course.

### OpenEd Team proxy users

Before there is a full team, use internal reviewers to test:

- Course QA.
- Content safety review.
- Source verification.
- Rubric review.
- Abuse report handling.

## Research questions

### Learner questions

1. What platforms do you currently use to learn?
2. What makes you stop a course?
3. How do you solve doubts today?
4. What do you trust more: certificate, project, quiz score, portfolio, or educator name?
5. Would you use an AI tutor inside the lesson?
6. Would you bring your own API key if that kept learning free?
7. What would make you share your learning proof publicly?
8. What is the minimum feedback that feels useful?

### Educator questions

1. How do you currently structure a course?
2. What is hardest: lessons, sources, videos, assignments, grading, or community?
3. Would a publish-readiness score feel helpful or restrictive?
4. How much source mapping is reasonable?
5. What is the minimum viable educator dashboard?
6. What would make you trust AI-generated quiz/rubric suggestions?
7. Would you accept OpenEd Team review before publishing?

## Prototype tests

### Test 1: FME learner runtime

Task: Ask a learner to complete one FME lesson using video/text/source/tutor/practice/artifact.

Measure:

- Time to understand next action.
- Tutor usage.
- Lesson completion.
- Practice completion.
- Artifact start and save.
- Self-reported confidence before/after.

Success:

- 70% can complete without moderator intervention.
- 50% use the tutor at least once.
- 40% complete the artifact checkpoint.

### Test 2: BYOK setup

Task: Ask learners to read BYOK onboarding and choose session mode or local browser storage.

Measure:

- Confusion rate.
- Trust rating.
- Drop-off.
- Whether learners understand risk.

Success:

- 80% understand that OpenEd does not pay for or store their key.
- 80% understand browser storage risk after reading copy.

### Test 3: Educator Studio v0

Task: Ask educators to create one lesson using structured fields.

Measure:

- Time to create outline.
- Source-card completion.
- Quiz/rubric completion.
- Publish-readiness score comprehension.
- Perceived friction.

Success:

- Educators can create a lesson in under 45 minutes.
- 70% say structure improved course clarity.

### Test 4: Proof credibility

Task: Show reviewers a SkillProof portfolio with artifacts and rubrics.

Measure:

- Trust rating vs certificate-only profile.
- Clarity of evidence.
- Believability of rubric.
- Missing proof questions.

Success:

- Reviewers trust portfolio more than certificate-only profile.
- Reviewers can name what skill the artifact demonstrates.

## Quantitative MVP validation

| Metric | Target for first closed beta |
|---|---|
| Learner activation | 50% complete onboarding + first lesson start. |
| First lesson completion | 40% complete first lesson. |
| First artifact start | 25% start first artifact. |
| First artifact saved | 15% save first artifact. |
| Tutor use | 50% of active learners ask at least one tutor question. |
| Tutor helpfulness | 4.0/5 average on rated answers. |
| Source drawer open rate | 20% of learners open at least one source. |
| Educator lesson creation | 60% of educators complete first lesson draft. |
| QA pass rate | 50% of submitted educator lessons pass after one revision. |

## Validation artifacts

Create these artifacts during validation:

- Interview notes.
- Learner journey recordings.
- Friction log.
- Tutor failure log.
- BYOK confusion log.
- Artifact quality samples.
- Educator Studio completion logs.
- QA reviewer notes.
- Decision memo: build, revise, or pause each feature.

## Decision framework

OpenEd should continue if:

- Learners prefer the OpenEd lesson workspace over a static video/article experience.
- AI tutor usage correlates with task completion or confidence.
- Artifact-based proof is perceived as more meaningful than certificates.
- Educators can create structured lessons without heavy support.

OpenEd should pivot if:

- Learners treat AI tutor as generic ChatGPT and ignore the course.
- Educators reject structured creation because it is too slow.
- BYOK is too confusing for target users.
- Artifact completion is too low without cohort or mentor support.


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
