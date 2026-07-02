# OpenEd Assessment and Proof Engine

## Purpose

The Assessment and Proof Engine is what prevents OpenEd from becoming another passive course platform. Its job is to translate learning activity into credible proof without making v1 too complex.

## Philosophy

OpenEd should not claim that every learner who completes a course has mastered the subject. It should show evidence levels.

```text
Completion is not mastery. A certificate is not proof. Proof is built through checked understanding, applied work, feedback, and revision.
```

## Proof ladder

| Level | Name | Evidence |
|---|---|---|
| 0 | Enrolled | Learner joined course. |
| 1 | Engaged | Lesson progress and notes. |
| 2 | Checked | Quiz attempts and explanations. |
| 3 | Practiced | Practice tasks submitted. |
| 4 | Built | Artifact submitted. |
| 5 | Revised | Artifact improved after feedback. |
| 6 | Proved | Rubric threshold met and portfolio item generated. |

## Assessment types

### Knowledge checks

Short checks inside lessons.

Purpose:

- Confirm understanding.
- Keep learners active.
- Give instant feedback.

Not for high-stakes proof.

### Quizzes

Course/module quizzes.

Features:

- Question banks.
- Randomized order.
- Feedback per option.
- Retry limits configurable.
- Linked concepts and sources.

### Practice tasks

Small applied tasks.

Features:

- Short prompt.
- Expected behavior.
- Strong answer example after submission.
- Tutor hint support.

### Artifacts

Longer proof outputs.

Examples:

- Memo.
- Design brief.
- Code notebook.
- Evaluation rubric.
- Research summary.
- Case analysis.
- Project file.

### Capstone/project

Final integrated proof.

For FME, the current capstone works as prototype proof but should later be redesigned into a stronger capstone studio with reviewer-style defense.

## Rubric design

Each artifact rubric needs:

- Criteria.
- Level descriptors.
- Evidence required.
- Common mistakes.
- Example answer.
- Feedback suggestions.
- Passing threshold.

Example criteria:

| Criterion | Beginning | Passing | Strong |
|---|---|---|---|
| Specificity | Vague claim | Names actor/task/context | Names actor/task/context/threshold/evidence |
| Evidence | Unsupported | Uses one source/data point | Uses multiple sources and limitations |
| Reasoning | Assertion | Basic justification | Compares alternatives and uncertainty |
| Communication | Hard to follow | Clear | Clear, concise, decision-ready |

## Cheating-resistance in v1

OpenEd should not overpromise anti-cheating. V1 can reduce low-effort passing through:

- Randomized quizzes.
- Question variants.
- Short answer reasoning.
- Artifact revision history.
- Process prompts.
- AI-use declaration.
- Similarity checks later.
- Human review for high-stakes proof later.

## AI in assessment

AI can:

- Give formative feedback.
- Suggest rubric-aligned improvements.
- Explain quiz answers.
- Generate practice variants for educator review.
- Flag suspiciously generic submissions.

AI should not:

- Be the only final grader for high-stakes proof.
- Certify mastery without human/validated rubric control.
- Punish learners based on unreliable AI detection.

## SkillProof portfolio

The portfolio should show:

- Course completed.
- Artifacts built.
- Skills demonstrated.
- Rubric criteria met.
- Revision history.
- Learner reflection.
- Source-backed learning path.
- Share/export controls.

## Proof data model

Objects:

- question.
- quiz_attempt.
- practice_submission.
- artifact_template.
- artifact_submission.
- rubric.
- rubric_score.
- feedback.
- revision.
- proof_item.
- portfolio.

## Failure modes

| Failure | Mitigation |
|---|---|
| Anyone can pass by guessing | Use explanations, scenario decisions, and artifacts. |
| AI gives final answers | Tutor answer policy shifts to hints during assessment. |
| Learners feel over-assessed | Keep checks short and meaningful. |
| Rubrics feel arbitrary | Show examples and descriptors before submission. |
| Cheating panic leads to invasive proctoring | Start with transparent proof signals, not surveillance. |
| AI detector false positives | Do not rely on AI detectors as proof. |

## V1 acceptance criteria

- Learner can complete a quiz and receive feedback.
- Learner can submit an artifact and view rubric feedback.
- Learner can revise an artifact.
- Learner can add proof item to portfolio.
- Educator can create a rubric.
- OpenEd Team can inspect proof model for a course.


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
