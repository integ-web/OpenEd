# OpenEd Design System and Experience Principles

## Purpose

The current FME prototype proves useful structure but has visual issues: the dark theme feels heavy, the UI is flat, lesson screens can feel repetitive, and the product lacks enough visual excitement. OpenEd v1 should establish a broader, warmer, more flexible design language for serious learning.

## Design strategy

OpenEd should feel like:

- A trusted learning studio.
- A guided workspace.
- A calm AI-native product.
- A platform for serious but accessible learning.

It should not feel like:

- A government dashboard.
- A flat LMS.
- A dark cybersecurity product.
- A generic SaaS template.
- A course PDF viewer.

## Theme direction

### Light-first

Light mode should be the default for learning. It improves readability, reduces fatigue, and feels less intimidating.

Suggested tokens:

| Token | Value | Use |
|---|---|---|
| Canvas | #F8FAFC | App background |
| Surface | #FFFFFF | Cards and panels |
| Soft surface | #F1F5F9 | Secondary panels |
| Primary text | #0F172A | Main text |
| Secondary text | #475569 | Supporting text |
| Border | #E2E8F0 | Subtle dividers |
| Primary | #2563EB | Actions and progress |
| Evidence teal | #0F766E | Sources/proof |
| Tutor violet | #6D28D9 | AI tutor and explanations |
| Warm accent | #F97316 | Human/creative moments |

### Dark mode rebuild

The current dark mode should be softened. Avoid pure black, harsh saturated colors, and too many boxed panels.

Suggested tokens:

| Token | Value | Use |
|---|---|---|
| Canvas | #0B1120 | App background |
| Surface | #111827 | Main cards |
| Soft surface | #1E293B | Secondary panels |
| Elevated | #273449 | Drawers/modals |
| Text | #F8FAFC | Primary text |
| Muted text | #CBD5E1 | Secondary text |
| Border | #334155 | Dividers |
| Primary | #60A5FA | Actions |
| Evidence | #2DD4BF | Sources/proof |
| Tutor | #A78BFA | AI tutor |

## Visual excitement without clutter

Learners like moments of visual interest. OpenEd should add visual excitement through learning-native elements, not decorative noise.

Use:

- Progress maps.
- Animated but subtle learning milestones.
- Concept diagrams.
- Before/after examples.
- Visual tutor sketches.
- SkillProof cards.
- Mini simulations.
- Course identity covers.
- Achievement moments.
- Warm illustration spots.

Avoid:

- Random gradients.
- AI brain/robot imagery.
- Overcrowded dashboards.
- Neon accents.
- Excessive shadows.
- Decorative charts with no meaning.

## Typography

Use a simple family stack:

- Inter or similar for UI and body.
- IBM Plex Mono for code, metadata, IDs, timestamps.
- Optional serif only for editorial quotes or educator notes.

Reading rules:

- Body: 16px minimum desktop/tablet, 15-16px mobile.
- Line height: 1.55-1.7 for reading.
- Lesson text column: 680-760px max on desktop.
- Avoid dense all-caps metadata.

## Layout rules

### Desktop

- Top bar: 64px.
- Left rail: 72px collapsed, 280px expanded.
- Main lesson: fluid center.
- Tutor panel: 340-380px.
- Use 24px and 32px spacing.

### Tablet

- Top bar remains.
- Left rail collapses to drawer.
- Tutor can be side-by-side or drawer depending width.

### Mobile

- Bottom nav or compact top nav.
- Tutor as bottom sheet.
- Sources as full-screen drawer.
- Artifact builder uses step-by-step flow.
- Avoid desktop tables; use stacked cards.

## Component system

Core components:

- CourseCard.
- LessonCard.
- LessonWorkspace.
- VideoReferencePlayer.
- TranscriptDrawer.
- SourceCard.
- AITutorPanel.
- TutorPromptChip.
- PracticeCard.
- QuizCard.
- FeedbackPanel.
- ArtifactBuilder.
- RubricDrawer.
- SkillProofCard.
- PublishReadinessPanel.
- ContentQACard.

## Lesson template variation

Every lesson should not look identical. Use template variants:

| Lesson type | Primary visual |
|---|---|
| Concept lesson | Diagram + tutor explanation |
| Case lesson | Storyboard + decision point |
| Tool lesson | Screencast/reference media + checklist |
| Practice lesson | Interactive task + feedback |
| Project lesson | Artifact builder + rubric |
| Review lesson | Knowledge map + quiz |

## Design acceptance criteria

- Learner can identify primary action in 3 seconds.
- Dark mode no longer feels visually heavy.
- Lesson screens do not all look like the same card stack.
- The AI tutor feels integrated, not bolted on.
- Course sources feel trustworthy and easy to inspect.
- The product works on phone, tablet, and desktop without hidden core functionality.


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
