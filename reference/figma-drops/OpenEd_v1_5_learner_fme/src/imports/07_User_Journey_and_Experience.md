# OpenEd User Journey and Experience Document

## Purpose

This document turns the FigJam journey into a product-level service blueprint. The live FigJam board is here:

https://www.figma.com/board/dGiTLdXqbxhYm20eyGuThn

The user journey visual should be treated as a planning artifact, not a finished UX spec.

## Learner journey

### Stage 1: Discover

User need: "Can this help me learn something useful without paying?"

Screens:

- Landing page.
- Course catalog.
- Course preview.
- FME flagship course page.

Key UX:

- Clear promise.
- Free learner model.
- Show what proof artifacts look like.
- Explain AI tutor and BYOK simply.

Failure risk:

- Too much startup positioning and not enough course value.

### Stage 2: Onboard

User need: "What should I learn first?"

Screens:

- Signup/login.
- Goal selection.
- Skill diagnostic.
- Learning path.

Key UX:

- Ask few questions.
- Show recommended path quickly.
- Do not make diagnostic feel like an exam.

Failure risk:

- Long onboarding before learner sees course value.

### Stage 3: Learn

User need: "Explain this in a way I understand."

Screens:

- Lesson workspace.
- Video/reference media.
- Text/transcript.
- Source drawer.
- AI tutor panel.

Key UX:

- Main lesson content in one clear focus area.
- AI tutor on the side on desktop, bottom drawer on mobile.
- Tabs: Watch/Read, Understand, Practice, Build, Sources.
- Progress is visible but not intrusive.

Failure risk:

- Flat repeated lesson template.
- Dark theme fatigue.
- AI tutor answers too directly and weakens learning.

### Stage 4: Practice

User need: "Can I try this now?"

Screens:

- Practice card.
- Quiz card.
- Feedback panel.
- Retry state.

Key UX:

- Immediate feedback.
- Explanation of wrong answers.
- Tutor can offer hints.
- Practice should be short enough to reduce friction.

Failure risk:

- Quizzes too easy; learners pass without learning.

### Stage 5: Build proof

User need: "Can I make something real from this?"

Screens:

- Artifact builder.
- Rubric drawer.
- Example answer.
- Save to portfolio.

Key UX:

- Guided fields.
- Example and non-example.
- Validation warnings.
- Save state.
- Connection to course/module outcome.

Failure risk:

- Artifact feels like homework with no payoff.

### Stage 6: Improve

User need: "What should I fix?"

Screens:

- Feedback screen.
- Rubric result.
- Revision history.
- AI tutor improvement suggestions.

Key UX:

- Feedback should be specific.
- Show what is strong, weak, missing.
- Encourage revision.

Failure risk:

- AI-generated feedback feels generic or unfair.

### Stage 7: Prove

User need: "Can I show this?"

Screens:

- SkillProof portfolio.
- Course completion.
- Certificate if applicable.
- Portfolio export.

Key UX:

- Show artifacts, skills demonstrated, rubric evidence, and revision history.
- Certificate should not be the only outcome.

Failure risk:

- Portfolio looks like a static profile, not proof.

## Educator journey

```text
Apply/start -> create course outline -> add lessons -> map sources -> add practice -> define artifacts -> create rubrics -> run QA -> submit for review -> revise -> publish
```

### Educator success moments

- "I can make a structured course without engineering help."
- "The QA checklist shows what is missing."
- "AI helps me draft, but I remain responsible."
- "My course looks professional and trustworthy."

### Educator failure moments

- Too many mandatory fields before a draft exists.
- AI-generated content feels generic.
- QA feels punitive.
- Publishing review is slow.

## OpenEd Team journey

```text
review course -> inspect sources -> inspect assessments -> inspect safety -> request changes or approve -> monitor analytics -> handle reports -> improve templates
```

OpenEd Team needs efficient review tools:

- Course readiness dashboard.
- Missing-source warnings.
- Weak-assessment warnings.
- Unsafe content warnings.
- Duplicate/generic lesson warnings.
- Abuse report queue.
- Audit log.

## Cross-device behavior

### Phone

Primary use:

- Short lessons.
- Reading summaries.
- AI tutor chat.
- Quizzes.
- Progress checks.
- Light artifact drafts.

Design:

- Bottom navigation.
- Tutor as bottom sheet.
- Video full-width.
- Sources as drawer.
- Artifact builder in step-by-step mode.

### Tablet

Primary use:

- Lesson + tutor side-by-side.
- Reading and note-taking.
- Artifact drafting.

Design:

- Two-column lesson layout.
- Collapsible navigation.
- Split view for sources.

### Desktop

Primary use:

- Full lesson workspace.
- Educator Studio.
- Artifact editing.
- Capstone.
- Team QA.

Design:

- Top nav + left rail.
- Tutor side panel.
- Wide artifact builder.
- Source and rubric drawers.

## Experience principles

1. One primary action per screen.
2. Learner always sees why the lesson matters.
3. AI tutor is visible but not dominant.
4. Every interaction returns feedback.
5. Every artifact is connected to proof.
6. Every course has a source graph.
7. Dark mode should feel calm, not heavy.
8. Mobile should be a first-class path, not a reduced desktop.


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
