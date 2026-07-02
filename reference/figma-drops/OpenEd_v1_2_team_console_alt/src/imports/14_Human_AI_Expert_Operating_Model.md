# OpenEd Human-AI-Expert Operating Model

## Purpose

OpenEd should not frame AI as replacing educators. The operating model defines what humans handle, what AI handles, what OpenEd Team handles, and where escalation is required.

## Operating principle

```text
AI increases access to feedback. Humans retain responsibility for course quality, pedagogy, trust, and high-stakes judgments.
```

## Responsibility matrix

| Task | AI tutor | Educator | OpenEd Team | Learner |
|---|---|---|---|---|
| Explain lesson concept | Primary | Review quality | Policy/safety | Ask/learn |
| Answer source-based question | Primary with citations | Provide sources | QA source policy | Ask/verify |
| Generate lesson draft | Assist | Owns/reviews | QA | N/A |
| Create final course | No | Primary | Review/publish | N/A |
| Quiz feedback | Primary formative | Creates/reviews | QA | Attempts |
| Artifact formative feedback | Assist | Optional review | QA rubric | Builds/revises |
| High-stakes grading | Assist only | Human/reviewer later | Policy | Submits |
| Moderation | Flag | Report | Primary | Report |
| BYOK key management | No storage | No access | No access | Owns |
| Course safety | Flag | Responsible | Primary | Report |

## Human roles

### Learner

Learner is active:

- Attempts questions.
- Asks doubts.
- Builds artifacts.
- Reflects on feedback.
- Decides what to share.

### Educator

Educator owns course truth:

- Defines objectives.
- Selects sources.
- Approves AI-generated drafts.
- Designs assessments.
- Designs rubrics.
- Responds to course feedback.

### OpenEd Team

OpenEd Team owns platform trust:

- Reviews course quality.
- Enforces source and safety requirements.
- Manages IAM.
- Handles abuse reports.
- Monitors quality metrics.
- Updates policy.

## AI roles

AI handles:

- Personalized explanations.
- Hints.
- Examples.
- Quiz feedback.
- Drafting support.
- Rubric-aligned feedback suggestions.
- Source summarization.
- QA issue flagging.

AI should not handle alone:

- Publishing approval.
- High-stakes certification.
- Final credential decisions.
- Sensitive policy decisions.
- User discipline.
- Content takedown without human review.

## Escalation rules

Escalate to educator or OpenEd Team when:

- Tutor cannot answer from sources.
- Learner reports wrong/harmful answer.
- Content involves safety-sensitive domain.
- Artifact feedback is disputed.
- Course source is missing or broken.
- Learner asks for direct cheating help.
- Moderation report is filed.

## AI transparency

OpenEd should show:

- When the AI is answering from course sources.
- When it is making a general explanation.
- When confidence is low.
- When a human review is required.
- Whether the answer is formative, not final grading.

## Human workload control

The model should not create unmanageable human review queues. Use triage:

| Item | Review priority |
|---|---|
| New course publish | High |
| Reported unsafe content | High |
| Tutor hallucination report | Medium-high |
| Generic learner doubt | AI handles |
| Routine quiz feedback | AI handles |
| Low-risk source metadata issue | Batch review |

## Failure modes

| Failure | Mitigation |
|---|---|
| Educators overtrust AI drafts | Mandatory educator review and source verification. |
| Learners overtrust tutor | Citation, uncertainty, and source drawer. |
| OpenEd Team overloaded | Automated QA triage and risk-based review. |
| AI undermines learning | Hint-first and Socratic modes. |
| Experts become bottleneck | Use expert review for templates, rubrics, and high-risk courses first. |

## V1 implementation

V1 should implement:

- Tutor answer reporting.
- Educator source and rubric ownership.
- OpenEd Team publish approval.
- Audit log for moderation and approvals.
- Clear labels: AI feedback vs educator feedback.


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
