# OpenEd Risks, Externalities, and Failure Modes

## Purpose

This document lists what can fail, where, why, and how OpenEd should reduce the likelihood or impact.

## Risk categories

1. Learning risk.
2. AI risk.
3. Assessment risk.
4. Trust/safety risk.
5. Security/privacy risk.
6. Market risk.
7. Operational risk.
8. Accessibility risk.

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---:|---:|---|
| Learners churn after first lesson | High | High | Improve onboarding, lesson variety, tutor, visual excitement. |
| Lessons feel like static content | High | High | Use lesson variants, practice, artifacts, visual explainers. |
| AI tutor hallucinates | Medium | High | Source grounding, citations, fallback, reporting. |
| AI tutor enables cheating | Medium | High | Assessment mode, hints first, artifact process prompts. |
| BYOK is confusing | Medium | Medium | Session default, simple copy, mock mode. |
| API keys leak from browser | Medium | High | Warn users; do not store by default; optional gateway; no logs. |
| Educators publish low-quality courses | High | High | Publish-readiness QA and review. |
| Review queue bottlenecks | Medium | Medium | Automated QA, risk triage, templates. |
| Rubric feedback feels unfair | Medium | Medium | Show criteria/examples, allow revision, educator review later. |
| Certificates become weak signals | Medium | High | Use proof ladder and portfolios. |
| Dark theme hurts usability | High | Medium | Light-first default, calmer dark mode. |
| Mobile experience is compromised | Medium | High | Design mobile flows first for learner app. |
| Source links break | Medium | Medium | Link checker and source metadata QA. |
| External videos blocked | High | Medium | Text/transcript fallback and reference media model. |
| Platform costs grow | Medium | High | BYOK, caching, managed AI limits later. |
| Legal/IP issues from course content | Medium | High | Source/license checks and educator warranties. |
| Harmful content appears | Medium | High | Safety policy, moderation, restricted topics review. |
| AI overreliance reduces learning | Medium | High | Socratic mode, retrieval practice, reflection. |

## Failure mode analysis by product area

### Learner App

Failure points:

- Learner does not understand course value.
- Learner cannot set up BYOK.
- Learner does not know what to do next.
- Learner skips practice.
- Learner completes but has no proof.

Controls:

- Clear continue card.
- No-key tutor fallback.
- Short practice tasks.
- Artifact payoff.
- Portfolio preview.

### Educator Studio

Failure points:

- Course builder too complex.
- Educator uses AI to produce generic content.
- Source mapping becomes burdensome.
- QA feels like punishment.

Controls:

- Guided/expert modes.
- Draft quickly, improve later.
- AI-assisted source cards.
- QA framed as publish readiness.

### Assessment and Proof Engine

Failure points:

- Quizzes too easy.
- Artifacts too hard.
- Feedback too generic.
- Learners use AI to fabricate submissions.

Controls:

- Mixed question types.
- Examples and non-examples.
- Rubric specificity.
- Revision/process history.
- AI-use declaration.

### AI Tutor

Failure points:

- Generic chatbot behavior.
- Incorrect answers.
- Direct answers during assessment.
- Prompt leakage.
- Data leakage.

Controls:

- Course context retrieval.
- Tutor modes.
- Assessment constraints.
- Server gateway for proprietary logic.
- Redaction and no-key-storage policy.

## Externalities

### Positive

- Free access to better learning.
- Lower anxiety due to private doubt-solving.
- Better educator tooling.
- More evidence-based skill development.

### Negative

- Learners may outsource thinking.
- Educators may overproduce generic AI content.
- AI tutoring may widen gap between learners who can use keys and those who cannot.
- Artifact proof may create new pressure to perform.

## Governance cadence

- Weekly: tutor failure review.
- Weekly: course QA queue review.
- Monthly: safety policy review.
- Monthly: metric review.
- Quarterly: market and competitor review.
- Quarterly: accessibility review.


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
