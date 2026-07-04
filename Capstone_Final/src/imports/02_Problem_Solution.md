# OpenEd Problem-Solution Document

## Problem statement

Online learning has become abundant, but serious skill formation is still hard. Learners can access thousands of videos and courses, yet many still do not know what to learn, how to verify what they understood, how to get doubts solved, or how to prove ability. Educators can upload content, but the platforms rarely force good instructional structure, source mapping, or meaningful proof of learning.

OpenEd targets the gap between content access and actual learning.

## Problem tree

### Learner problems

| Symptom | Root problem | Consequence |
|---|---|---|
| Video fatigue | Lessons are passive | Learners stop opening the course. |
| Doubts remain unresolved | AI tutor or human mentor is missing/paid | Learners lose momentum. |
| Too many resources | No learning path or source hierarchy | Learners jump between links. |
| Weak certificates | Completion is not proof | Employers/peers cannot trust claims. |
| Poor feedback | Quizzes are shallow or absent | Learners do not know what to improve. |
| Language/confidence gap | Content assumes fluent English and prior context | Learners feel excluded. |

### Educator problems

| Symptom | Root problem | Consequence |
|---|---|---|
| Good educators cannot publish well | Course creation tools are too limited or too scattered | Knowledge stays in notes and videos. |
| Anyone can upload low-quality content | Platform checks focus on upload, not teaching proof | Learner trust drops. |
| Assessments are hard to design | Rubrics and artifacts are not native | Courses become content dumps. |
| Sources are not mapped | No structure for citations and advanced resources | Learners cannot go deeper reliably. |

### Platform problems

| Symptom | Root problem | Consequence |
|---|---|---|
| Low completion | Product optimizes catalog size over learning loop | Users churn. |
| AI feature is generic | Chatbot is bolted onto content | Answers are not trustworthy or pedagogical. |
| Grading is either too weak or too heavy | No flexible proof levels | Certificates lose meaning. |
| Mobile and desktop conflict | One layout is stretched across devices | Learning becomes uncomfortable. |

## Solution

OpenEd provides a Learn-Prove system.

```text
Choose goal -> diagnostic -> learning path -> lesson -> tutor -> practice -> artifact -> feedback -> SkillProof portfolio
```

The product does not treat content as the course. A course is a structured learning environment made of:

- Lessons.
- Sources.
- Tutor prompts.
- Practice tasks.
- Quizzes.
- Rubrics.
- Artifacts.
- Feedback.
- Portfolio output.

## Solution pillars

### 1. Source-mapped courses

Every serious course should show where its claims come from. Sources are not an appendix; they are part of the learner's trust model.

Source cards include title, author/organization, type, difficulty, required/optional status, why it matters, and recommended section or timestamp.

### 2. Course-grounded AI tutor

The AI tutor answers from the course context, lesson summary, transcript, source cards, artifact rubric, and learner state. It should not act like a generic chatbot that simply produces answers.

### 3. Practice and artifacts

Every meaningful module should include a proof output: a memo, design, notebook, rubric, project, model, report, or similar artifact. Artifacts become the learner's SkillProof portfolio.

### 4. Educator Studio

Educators create courses using structured building blocks: outline, lesson, source cards, media, quiz, practice, rubric, artifact, publish-readiness QA.

### 5. Assessment and Proof Engine

OpenEd separates completion from mastery. The proof ladder is:

| Level | Meaning |
|---|---|
| Seen | Learner opened or watched/read content. |
| Checked | Learner passed a knowledge check. |
| Practiced | Learner completed a practice task. |
| Built | Learner submitted an artifact. |
| Revised | Learner improved after feedback. |
| Proved | Learner met rubric thresholds and portfolio criteria. |

## Why this is better than current edtech

| Current pattern | OpenEd answer |
|---|---|
| Video playlists | Interactive lesson workspace. |
| Static articles | Multimodal learning with tutor and practice. |
| Generic chatbots | Course-grounded tutor. |
| Weak certificates | Artifact-based SkillProof. |
| Educator fame as quality proxy | Course quality and source QA. |
| Paid AI help | Free learner access plus BYOK. |
| LMS admin complexity | Learner-first v1 with portals later. |

## Minimum proof of success

OpenEd should first prove the following with FME:

1. Learners can complete a serious course without feeling lost.
2. The AI tutor helps learners understand, not cheat.
3. Source mapping improves trust.
4. Artifacts make learning feel useful.
5. The educator workflow can create a course with publish-readiness checks.
6. The proof engine can distinguish completion from mastery.


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
