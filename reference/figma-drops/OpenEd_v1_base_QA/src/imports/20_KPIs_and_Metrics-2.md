# OpenEd KPIs and Metrics Sheet

## North Star Metric

**Meaningful Learning Proofs Created per Active Learner.**

Definition:

```text
Count of submitted portfolio-eligible artifacts that meet a minimum rubric threshold, divided by active learners in a period.
```

Why:

- It balances learning, practice, proof, and quality.
- It avoids optimizing only for video views or signups.

## Metric hierarchy

### Acquisition

| Metric | Definition | Why it matters |
|---|---|---|
| Visitor to signup | Signups / unique visitors | Landing promise fit. |
| Course preview to enrollment | Enrollments / previews | Course value clarity. |
| Source of signup | Channel attribution | Growth learning. |

### Activation

| Metric | Definition | Target beta |
|---|---|---|
| Onboarding completion | Completed onboarding / signed up | 60% |
| First lesson start | Started first lesson / enrolled | 70% |
| First tutor interaction | Tutor users / lesson starters | 40% |
| First quiz attempt | Quiz attempts / lesson starters | 35% |
| First artifact start | Artifact starts / lesson starters | 25% |

### Engagement

| Metric | Definition |
|---|---|
| Weekly active learners | Learners with meaningful activity in 7 days. |
| Lesson completion rate | Completed lessons / started lessons. |
| Return rate D7 | Learners active 7 days after signup. |
| Source drawer open rate | Learners opening source drawer. |
| Tutor depth | Avg tutor turns per active lesson. |

### Learning/proof

| Metric | Definition |
|---|---|
| Quiz improvement | Score change after retries. |
| Artifact completion | Submitted artifacts / started artifacts. |
| Revision rate | Revised artifacts / submitted artifacts. |
| Proof threshold pass rate | Artifacts meeting rubric threshold. |
| Portfolio creation | Portfolio items / active learners. |

### Tutor quality

| Metric | Definition |
|---|---|
| Tutor helpfulness | Average learner rating. |
| Source-grounded answer rate | Answers with lesson/source grounding. |
| Tutor fallback rate | Tutor says context insufficient. |
| Tutor hallucination reports | Reported hallucinations / tutor answers. |
| Hint-to-answer ratio | Hints vs direct answers in assessment contexts. |

### Educator metrics

| Metric | Definition |
|---|---|
| Course draft creation | Educators creating first draft. |
| Lesson completion by educator | Lessons with objective/source/quiz/rubric. |
| QA pass rate | Courses passing publish-readiness. |
| Revision cycles | Avg rounds before approval. |
| Time to publish | Draft to approved. |

### Platform quality

| Metric | Definition |
|---|---|
| Course reports | Reports per 1000 active learners. |
| Tutor incident rate | Safety or hallucination reports. |
| Broken source rate | Broken links / total sources. |
| Video fallback rate | Blocked video sessions / video sessions. |
| RLS/security test pass | Security checks passing. |

## Metric event dictionary

| Event | Properties |
|---|---|
| user_signed_up | source, device, role |
| onboarding_completed | learner_goal, level |
| course_enrolled | course_id |
| lesson_started | course_id, lesson_id, device |
| lesson_completed | lesson_id, progress_seconds |
| source_opened | source_id, lesson_id |
| tutor_question_asked | mode, lesson_id, key_mode, device |
| tutor_answer_rated | rating, reason, mode |
| quiz_submitted | quiz_id, score, attempt_number |
| artifact_started | artifact_template_id |
| artifact_saved | artifact_id, draft_completion |
| artifact_submitted | artifact_id, revision_number |
| portfolio_item_created | artifact_id, visibility |
| course_qa_run | course_id, issues_count |
| course_submitted_for_review | course_id |
| course_published | course_id |

## Dashboard views

### Learner dashboard

- Course progress.
- Next lesson.
- Next artifact.
- Tutor usage streak.
- Portfolio progress.

### Educator dashboard

- Course completion funnel.
- Tutor question themes.
- Artifact submission rate.
- QA issues.
- Learner feedback.

### OpenEd Team dashboard

- Active learners.
- Proofs created.
- Tutor quality.
- Course QA queue.
- Risk reports.
- Broken sources/videos.

## Metric risks

| Bad optimization | Guardrail |
|---|---|
| Optimize signups | Track activation and proof. |
| Optimize video watch time | Track practice/artifacts. |
| Optimize quiz pass rate | Track item difficulty and retries. |
| Optimize tutor usage | Track helpfulness and learning outcomes. |
| Optimize course count | Track QA pass and learner outcomes. |


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
