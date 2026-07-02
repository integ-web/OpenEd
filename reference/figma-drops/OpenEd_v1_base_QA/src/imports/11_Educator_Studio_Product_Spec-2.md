# OpenEd Educator Studio Product Spec

## Goal

Educator Studio lets educators create high-quality courses without engineering help. It should not become a free-form upload portal. It should guide educators through a course schema that produces better learning outcomes, better source trust, and better assessment.

## Educator promise

> Turn expertise into a trustworthy, interactive, source-mapped course with practice, rubrics, and proof outputs.

## Studio modules

1. Course outline builder.
2. Lesson editor.
3. Media/reference manager.
4. Source card editor.
5. Practice/quiz builder.
6. Artifact builder template.
7. Rubric builder.
8. AI tutor settings.
9. Publish-readiness QA.
10. Review submission.

## Course object model

A course is not just content. A course has:

- Course metadata.
- Audience.
- Prerequisites.
- Learning outcomes.
- Modules.
- Lessons.
- Source graph.
- Activities.
- Quizzes.
- Artifacts.
- Rubrics.
- Proof levels.
- Tutor context.
- QA status.

## Lesson editor

Fields:

- Title.
- Subtitle.
- Duration.
- Level.
- Learning objective.
- Lesson promise.
- Concept explanation.
- Worked example.
- Common mistake.
- Practice activity.
- Quiz.
- Artifact output.
- Source cards.
- Tutor suggested prompts.
- Accessibility notes.

## Source card editor

Fields:

- Title.
- Author/organization.
- URL or citation.
- Type: paper, book, video, documentation, article, course, report.
- Required or optional.
- Difficulty.
- Why it matters.
- Relevant section, chapter, or timestamp.
- License/usage note.

## Media/reference manager

For v1, OpenEd should support external videos and text/media references. It should not assume all videos are embeddable.

Fields:

- Media title.
- Provider.
- URL.
- Embed status: unverified, embeddable, blocked, fallback required.
- Transcript status: provided, pending, not available.
- Course-authored summary.
- Lesson chapters.

## Quiz builder

Question types:

- Multiple choice.
- Multiple select.
- Short answer.
- Classification.
- Scenario decision.
- Source interpretation.

Every question needs:

- Correct/strong answer.
- Explanation.
- Wrong-answer feedback.
- Difficulty.
- Skill tag.
- Linked lesson/source.

## Artifact template builder

Artifacts are central to OpenEd.

Artifact template fields:

- Artifact name.
- Purpose.
- Fields.
- Example answer.
- Non-example.
- Rubric.
- Required evidence.
- Completion threshold.
- Portfolio visibility default.

## Rubric builder

Rubric fields:

- Criteria.
- Levels.
- Descriptors.
- Weight.
- Evidence required.
- Feedback suggestions.
- AI-assist allowed or not.

## Publish-readiness QA

Checks:

- No empty lesson.
- Every lesson has objective.
- Every lesson has source or reason no source needed.
- Every module has assessment.
- Every module has practice or artifact.
- Quiz has feedback.
- Rubric exists for artifacts.
- AI tutor context exists.
- Accessibility fields filled.
- No unsafe content.
- No unsupported claims.

## Educator AI assistance

AI can help educators:

- Convert notes into lesson outline.
- Draft quiz questions.
- Suggest rubric criteria.
- Summarize source relevance.
- Flag missing prerequisites.
- Rewrite for simpler language.

AI should not:

- Publish without educator review.
- Invent sources.
- Claim unsupported expertise.
- Generate harmful content.

## Publishing workflow

```text
Draft -> Internal preview -> QA check -> Submit for review -> OpenEd Team review -> Changes requested / Approved -> Published -> Monitored
```

## Educator dashboard metrics

- Draft courses.
- Published courses.
- Learners enrolled.
- Lesson completion.
- Tutor usage.
- Quiz pass/retry.
- Artifact submission.
- Source opens.
- Learner feedback.
- QA issues.

## Failure modes

| Failure | Mitigation |
|---|---|
| Educators find Studio too rigid | Allow guided and expert modes. |
| Educators use AI to create generic lessons | QA flags repeated/generic text and missing examples. |
| Course review becomes bottleneck | Triage by risk and automated QA. |
| Source mapping feels tedious | AI-assisted source card drafting, but educator confirms. |
| Low-quality educators flood platform | Educator onboarding and publishing gates. |


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
