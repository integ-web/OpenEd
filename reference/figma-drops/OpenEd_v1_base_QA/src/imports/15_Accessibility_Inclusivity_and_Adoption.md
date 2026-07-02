# OpenEd Accessibility, Inclusivity, and Adoption Document

## Purpose

OpenEd is meant to be free and accessible for learners. Accessibility is not a legal checkbox; it is core to adoption, trust, and learning outcomes.

## Accessibility principles

1. Learning works without video.
2. Learning works without AI.
3. Learning works on phones.
4. Learners can read, listen, ask, practice, and revisit.
5. No learner is blocked by dark theme fatigue.
6. No meaning is conveyed by color alone.
7. Feedback is clear and actionable.

## Design accessibility

- Strong contrast in both themes.
- Light mode default.
- Calmer dark mode.
- Keyboard focus states.
- Screen-reader labels.
- Captions/transcripts.
- Reduced motion setting.
- Text summaries for diagrams.
- Touch targets at least 44px on mobile.
- Form errors in text, not only red color.

## Learning accessibility

- Lesson summary for every video.
- Transcript or authored text fallback.
- Glossary terms.
- Simple explanation mode.
- Example/non-example pairs.
- Practice with feedback.
- Tutor prompt chips for learners who do not know what to ask.
- Source cards with difficulty labels.

## Economic accessibility

- Learners can access courses for free.
- BYOK is optional, not mandatory.
- Course content remains useful without AI.
- Managed AI credits can come later through sponsor/institution/paid options.

## Language accessibility

V1:

- Simple English mode.
- Hinglish-style explanation option if implemented responsibly.
- Glossary definitions.

Later:

- Hindi and regional language UI.
- Educator-provided translations.
- AI-assisted translation with human review.

## Low-bandwidth mode

V1 should support:

- Text-first lesson mode.
- Video fallback if embed is blocked.
- Saved progress without video.
- Lightweight diagrams.

Later:

- Offline reading packs.
- Downloadable transcripts.
- PWA offline mode.

## Five adopter types

### 1. Innovators

Who:

- AI enthusiasts.
- Power learners.
- Builders.
- Early educators.

What they need:

- BYOK tutor.
- Advanced settings.
- FME flagship course.
- Public roadmap.

### 2. Early adopters

Who:

- Serious students.
- Independent educators.
- Tech communities.

What they need:

- Clear proof of value.
- Portfolio outputs.
- High-quality course examples.

### 3. Early majority

Who:

- Mainstream learners who want reliable upskilling.

What they need:

- Simpler onboarding.
- Strong trust signals.
- Mobile-first experience.
- Clear outcomes.

### 4. Late majority

Who:

- Learners and educators skeptical of AI.

What they need:

- Human oversight.
- Non-AI mode.
- Verified course quality.
- Simple language.

### 5. Laggards

Who:

- Users with limited internet, low AI trust, or low digital confidence.

What they need:

- Low-data mode.
- Simple text paths.
- Assisted onboarding.
- Community/mentor support later.

## Adoption sequence

OpenEd should begin with innovators and early adopters using FME and AI/tech courses. It should not start with a broad all-subject marketplace.

Recommended sequence:

1. FME flagship course beta.
2. 2-3 additional serious AI/product/tech courses.
3. Educator Studio invite-only.
4. Learner portfolio sharing.
5. Community learning.
6. Regional language/low-data expansion.

## Inclusivity failure modes

| Failure | Prevention |
|---|---|
| BYOK excludes learners | Keep content and mock/no-key mode useful. |
| English-first blocks learners | Simple language and translation roadmap. |
| Desktop-first blocks mobile users | Mobile lesson and tutor flows from v1. |
| Visual-heavy course blocks low bandwidth | Text fallback and lightweight diagrams. |
| AI tutor confuses beginners | Prompt chips, examples, and safe defaults. |
| Accessibility becomes afterthought | Include QA gates before publish. |


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
