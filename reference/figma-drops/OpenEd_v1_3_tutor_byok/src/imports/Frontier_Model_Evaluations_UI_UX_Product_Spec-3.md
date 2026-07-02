# Frontier Evaluation Lab: UI/UX Product Specification

How to turn the current generated course UI into a coherent, premium, source-grounded frontier evaluation lab.

**Version:** 1.0 - Prepared for Figma Make / React implementation - June 2026

> **Core answer:** Yes. The task is not simply to improve visuals. The product must become a serious interactive evaluator-training environment with a consistent design system, phase-based curriculum, lesson sources, labs, artifact builders, simulations and a capstone dossier. Figma Make cannot browse or invent the course; this spec tells it exactly what to build and what not to build.

## Table of contents

1. Product diagnosis
2. Canonical product decisions
3. Information architecture and navigation
4. Visual and component system
5. Lesson, simulation and artifact UX
6. Capstone and portfolio UX
7. Implementation handoff for the existing codebase
8. Figma Make prompts
9. QA board and acceptance criteria

# 1. Product diagnosis

The current prototype should be treated as a reusable screen/component inventory, not as the final course. The strongest existing assets are the course shell, dashboard, lesson screen, evidence library, benchmark builder, risk dashboard and capstone sections. The weakest part is the product logic: the course data, navigation priority, content depth, source handling and visual consistency are not yet production-grade.

| **Problem**                         | **Why it hurts learning**                                                                                                                                                                  | **Required correction**                                                                                                                            |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Three competing curricula           | The uploaded curriculum uses 10 modules, the design prompt uses 9 modules, and the requested competency model uses 6 phases. Learners and Figma Make will receive contradictory structure. | Lock the 6-phase/51-hour structure as canonical. Keep prior 9/10-module materials only as source mapping and content raw material.                 |
| Only surface-level learning content | Screens can look polished while teaching almost nothing. This is the main issue.                                                                                                           | Every lesson must contain teachable concept copy, worked examples, a knowledge check, a source list, an artifact output and a deeper reading path. |
| Source absence                      | Without sources, learners cannot trust claims or continue to advanced study.                                                                                                               | Every lesson gets 3-8 source IDs. Source drawer and source library become first-class navigation items.                                            |
| Navigation clutter                  | Too many parallel destinations compete for attention.                                                                                                                                      | Group navigation into Learn, Build, Evidence, Resources and Capstone. Keep one primary action per screen.                                          |
| Theme/token drift                   | The code uses a cyan-first token set and IBM Plex Sans display while the locked brief wants primary blue, dark-first institutional tone and Inter-first typography.                        | Normalize CSS and token exports to the agreed palette and type system.                                                                             |
| Generic AI visuals                  | AI brains, decorative gradients and generic dashboard patterns make the course feel generated.                                                                                             | Use Figma-native research diagrams, evidence cards, risk matrices, trace logs, threshold ladders and benchmark anatomy diagrams.                   |
| Unsafe seed evidence language       | Seed examples should not contain operational CBRN details or malicious cyber tactics.                                                                                                      | Replace with redacted, de-risked, fictional examples that teach evaluation design and evidence handling only.                                      |

# 2. Canonical product decisions

| **Item**            | **Decision**                                                                                                                                                                                  |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product name        | Frontier Evaluation Lab                                                                                                                                                                       |
| Promise             | A 51-hour interactive course that takes a novice from zero to intermediate competence in frontier model evaluation, with an advanced track through papers, books, tools and external courses. |
| Canonical structure | Six phases: The Paradigm, Harness Engineering, Autonomous Agents, Spatial and World Models, Red Teaming, Enterprise Pipeline.                                                                 |
| Primary loop        | Learn a concept -> inspect evidence -> make a decision -> save an artifact -> reuse it in the capstone.                                                                                   |
| Visual metaphor     | A professional AI safety evaluation lab: evidence review, benchmark design, risk threshold decisions and executive reporting.                                                                 |
| Tone                | Calm, precise, institutional, premium, research-grade, practical. Not cyberpunk, not generic edtech, not AI hype.                                                                             |
| Safety stance       | Teach evaluation design, governance reasoning and evidence handling. Do not include harmful operational cyber or biology instructions. Use fictional, sandboxed, redacted or toy examples.    |

## Canonical 51-hour phase map

| **Phase**                    | **Hours** | **Intermediate competency**                                                             | **Advanced competency**                                                 | **Deliverable**                  |
|------------------------------|-----------|-----------------------------------------------------------------------------------------|-------------------------------------------------------------------------|----------------------------------|
| 1\. The Paradigm             | 6         | Outcome vs trajectory metrics; baseline capability limits; evaluation objective design. | Technical diligence and moat analysis for frontier AI claims.           | Custom Evaluation Rubric         |
| 2\. Harness Engineering      | 8         | Golden datasets; LLM-as-judge; RAG Triad; repeatable harnesses.                         | Judge entropy calibration and native-host harness design.               | Automated Native Testing Harness |
| 3\. Autonomous Agents        | 12        | Multi-turn tool calls, state changes and software task evaluation.                      | Memory-efficient, locally executed agents for low-compute constraints.  | Agent Execution Sandbox          |
| 4\. Spatial and World Models | 9         | Object permanence, physical accuracy and visual-spatial reasoning.                      | Zero-shot physical reasoning in industrial/factory simulation contexts. | Physical Simulation Benchmark    |
| 5\. Red Teaming              | 10        | State-based attacks, multi-turn prompt injection and adversarial evaluation.            | Sandbagging, deception and strategic underperformance profiling.        | Threat and Vulnerability Report  |
| 6\. Enterprise Pipeline      | 6         | TTFT, concurrency latency and model drift.                                              | Cost-to-capability models, telemetry logic and BI decision dashboards.  | Production-Ready Deployment Gate |

# 3. Information architecture and navigation

The navigation must make progress, source-backed trust and artifact creation visible at all times without overloading the main rail.

| **Area**          | **Purpose**                 | **Required behavior**                                                                                                                              |
|-------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Top nav           | Global state and confidence | Course name, current phase/lesson, progress percentage, artifact tray, source drawer, theme toggle, learner profile.                               |
| Left rail         | Primary navigation          | Course Home, Learning Map, Phases 1-6, Artifact Studio, Evidence Library, Source Library, Glossary, Capstone Studio. Use collapsible phase groups. |
| Breadcrumb        | Orientation                 | Home / Phase / Lesson / Activity. Always visible inside lesson and builder screens.                                                                |
| Lesson right rail | Progress and sources        | Learning objective, estimated time, artifact output, source IDs, advanced track links and next action.                                             |
| Artifact tray     | Continuity                  | Shows current drafts and what will feed the capstone. Saved state must be visible after every activity.                                            |
| Source drawer     | Trust path                  | Every claim-heavy lesson links to sources. Learner can open a source card without leaving the lesson.                                              |

## Required final screens

| **Screen**                | **Role**                                                                            |
|---------------------------|-------------------------------------------------------------------------------------|
| Course Landing            | Premium product entry with clear promise, audience, phase preview and two CTAs.     |
| Learner Onboarding        | Persona and goal selection; sets examples and advanced recommendations.             |
| Diagnostic Quiz           | Assesses ML, evaluation, safety and coding baseline; recommends pacing.             |
| Course Dashboard          | Progress, next lesson, current artifact, source reminders, capstone readiness.      |
| 51-Hour Learning Map      | Six-phase pathway with phase deliverables and estimated workload.                   |
| Phase Overview Template   | Promise, competencies, lesson list, deliverable, sources and phase studio.          |
| Lesson Template           | Interactive lesson experience; not an article.                                      |
| Screencast Lab Template   | Terminal/IDE view, command transcript, validation output and save artifact CTA.     |
| Simulation Template       | Scenario, stakeholder context, evidence cards, decision, consequence and debrief.   |
| Quiz Template             | Questions with explanations, wrong-answer feedback and retry state.                 |
| Evidence Card Library     | Searchable cards with claim, source, confidence, limitation and decision relevance. |
| Benchmark Packet Builder  | Claim under test, tasks, scaffolds, baselines, scoring and validity threats.        |
| Threat Model Canvas       | Actor, access, harm pathway, safeguards, residual risk and monitoring signal.       |
| Harness Spec Builder      | Dataset, runner, model adapter, judge, scorers, logging and validation scripts.     |
| Agent Trace Viewer        | Timeline of tool calls, state changes, observations, budgets and stop conditions.   |
| Red-Team Campaign Builder | Scope, hypotheses, methods, safety bounds, evidence handling and escalation.        |
| Risk Dashboard Builder    | Risk matrix, threshold ladder, evidence map and mitigation status.                  |
| Threshold Memo Builder    | Decision, claim, threshold, evidence, limitations, mitigations and recommendation.  |
| Executive Report Builder  | Leadership-ready summary with uncertainty and next actions.                         |
| Glossary                  | Evaluation and frontier safety vocabulary with examples.                            |
| Source Library            | Papers, books, courses, tools and benchmarks linked to lessons.                     |
| Troubleshooting Wiki      | Setup issues, API keys, validator failures, permissions and common errors.          |
| Capstone Studio           | Aster-3 Frontier dossier with quality gates and final recommendation.               |
| Final Portfolio Export    | Case-study view suitable for learner portfolio.                                     |
| Certificate / Completion  | Completion summary, artifacts, skills and next advanced path.                       |
| Design System Page        | Tokens, typography, grids, components and accessibility rules.                      |
| QA Board Page             | Content, visual, UX and accessibility acceptance checklist.                         |

# 4. Visual and component system

Use the locked dark-first research interface, but correct token drift so the implementation matches the brief rather than the current cyan-first defaults.

| **Token**         | **Dark**                  | **Light / use rule**                                                                                  |
|-------------------|---------------------------|-------------------------------------------------------------------------------------------------------|
| Canvas            | Deep Navy #020617        | Light Background #F8FAFC                                                                             |
| Surface           | Slate Surface #0F172A    | White Surface #FFFFFF                                                                                |
| Elevated          | Elevated Surface #1E293B | Light card #F1F5F9                                                                                   |
| Primary action    | Primary Blue #1D4ED8     | Use for primary CTA and active states. In dark mode, pair with Signal Blue #60A5FA for glow/outline. |
| Evidence          | Teal Evidence #0F766E    | Verified evidence, source-backed claims and validated artifacts.                                      |
| Expert / advanced | Violet Expert #7C3AED    | Expert insight, advanced reveal panels and deeper track.                                              |
| Success           | Success Green #15803D    | Correct answers, completion, passed validators.                                                       |
| Warning           | Warning Amber #B45309    | Uncertainty, caution, missing evidence, unresolved limitations.                                       |
| Danger            | Danger Red #B91C1C       | High/critical risk only. Do not use decoratively.                                                     |

Typography: Inter for all UI/body text, IBM Plex Serif for editorial expert notes and important quotes, IBM Plex Mono for evidence IDs, logs, technical labels, model versions, scores and code-like metadata. Remove IBM Plex Sans as a headline dependency unless intentionally kept as a fallback only.

## Component inventory and state requirements

| **Family**     | **Components**                                                                    | **Required states**                                                            |
|----------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Navigation     | Top nav, left rail, breadcrumb, progress stepper, phase tracker                   | Active, hover, focus, collapsed, locked, completed, current                    |
| Learning cards | Phase card, lesson card, concept card, case card, reflection card                 | Default, in progress, completed, locked, advanced, source-linked               |
| Evidence cards | Evidence card, source card, claim card, limitation card                           | Verified, needs replication, low/medium/high confidence, restricted visibility |
| Builders       | Threat canvas, benchmark packet, harness spec, red-team brief, memo, report       | Empty, draft, validation warning, saved, export-ready                          |
| Simulation     | Scenario brief, evidence drawer, decision card, consequence panel, expert debrief | Initial, selected, consequence revealed, retry, saved artifact                 |
| Dashboards     | KPI tile, risk matrix, evidence map, threshold ladder, confidence indicator       | Normal, warning, critical, filtered, insufficient evidence                     |

## Required diagram language

- Figma-native diagrams only: grouped cards, arrows, labels and text summaries. No flat decorative AI art.

- Use 5-9 nodes wherever possible. Keep labels explicit and readable in dark and light modes.

- Minimum diagram set: evaluation lifecycle, objective-to-evidence chain, benchmark anatomy, contamination pathways, harness stack, elicitation ladder, agent trace loop, red-team campaign loop, evidence card flow, threshold ladder, incident response loop and capstone workflow.

# 5. Lesson, simulation and artifact UX

> **Lesson rule:** A lesson is an interactive decision-and-artifact flow, not an article. Long prose belongs in expandable drawers, transcript downloads or the source hub.

| **Lesson block**           | **On-screen payload**                                                | **Interaction**                                   |
|----------------------------|----------------------------------------------------------------------|---------------------------------------------------|
| Hero                       | Title, duration, one learning objective, artifact output             | Start/resume CTA                                  |
| Why this matters           | 80-120 words connecting concept to frontier evaluation practice      | Source-linked claim drawer                        |
| Core concept               | Concise explanation with 3-5 key points                              | Reveal expert detail                              |
| Diagram / mental model     | Figma-native diagram with text summary                               | Hover/focus labels and screen-reader summary      |
| Worked example             | Weak vs strong example, trace or score comparison                    | Ask learner to identify why it is stronger/weaker |
| Interactive exercise       | Form, sort, classify, score, trace or choose action                  | Immediate feedback and saved draft                |
| Quiz / decision checkpoint | 1-3 questions or scenario decision                                   | Correct explanation and wrong-answer feedback     |
| Reflection                 | Short professional reflection question                               | Optional saved note                               |
| Artifact output            | Generated card, rubric row, task spec, evidence card or memo section | Save to artifact tray and capstone                |
| Next lesson CTA            | What to do next and why it matters                                   | Continue, review sources or open advanced track   |

## Golden lesson to build first

| **Field**          | **Golden lesson payload**                                                                                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Phase              | 1\. The Paradigm                                                                                                                                                                                  |
| Lesson             | From Vague Risk to Evaluation Objective                                                                                                                                                           |
| Duration           | 90 minutes                                                                                                                                                                                        |
| Learning objective | Convert a vague AI safety concern into a precise evaluation objective that can guide benchmark design, red-team tasks, evidence collection and governance decisions.                              |
| Mental model       | Threat Model -> Evaluation Objective -> Task Design -> Evidence -> Decision                                                                                                                   |
| Exercise           | Convert "This model might help with biological misuse" into actor, capability, harm pathway, model access level, task environment, success condition, evidence needed and disclosure sensitivity. |
| Artifact           | Evaluation Objective Card                                                                                                                                                                         |

## Simulation system

| **Simulation**                           | **Learner decision**                                                                                                    | **Artifact saved**                                   |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| Cyber release-gate review                | Whether evidence supports enterprise release when external evaluator says the harness under-elicits capability.         | Release-gate decision note and evidence limitations. |
| Third-party evaluator access negotiation | Whether four days of black-box access supports a safety claim.                                                          | Evaluator access memo.                               |
| Biology benchmark triage                 | How to triage a draft bio benchmark with harmless textbook items, risky operational prompts and possible contamination. | Safe benchmark revision note.                        |
| Agent prompt-injection response drill    | How a tool-using agent should handle untrusted content containing hidden instructions.                                  | Prompt-injection evidence card.                      |
| Aster-3 capstone review                  | Whether to release, restrict, trusted-access release or delay.                                                          | Final deployment recommendation.                     |

## Artifact builders and validation states

| **Builder**         | **Fields**                                                                                                                                                                                                                           | **Validation warnings**                                                           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Threat Model Canvas | system, threat actor, target/victim, capability needed, access condition, enabling conditions, harm pathway, safeguards, failure mode, severe harm endpoint, residual risk, monitoring signal                                        | Missing actor/pathway; unsupported severity; no monitoring signal.                |
| Benchmark Packet    | benchmark name, claim under test, risk domain, threat actor, deployment context, task families, tools, prompt/scaffold rules, baselines, scoring rubric, repetitions, validity threats, security handling, disclosure classification | No claim; no baselines; no validity threats; unsafe task detail.                  |
| Harness Spec        | dataset, model adapter, solver/scaffold, judge, scorers, logger, run config, budgets, validation script, report output                                                                                                               | No deterministic logging; no judge calibration; no budget rules.                  |
| Evidence Card       | evidence ID, claim, system version, harness version, task/scenario, observed behavior, evidence type, score, confidence, limitation, replication, decision relevance, reviewer sign-off                                              | No limitation; no replication status; no decision relevance.                      |
| Threshold Memo      | decision requested, primary claim, threshold implicated, evidence summary, known limitations, residual risk, mitigations, recommendation, owner, deadline                                                                            | No residual uncertainty; no mitigation owner; unsupported release recommendation. |
| Executive Report    | what changed, what tested, what found, what uncertain, release implication, recommendation                                                                                                                                           | Too technical; missing decision; missing uncertainty.                             |

# 6. Capstone and portfolio UX

Capstone name: Pre-deployment Evaluation Dossier for Aster-3 Frontier.

Scenario: Aster-3 Frontier is a fictional multimodal frontier model with browsing, code sandbox, document tools and a limited enterprise workspace. The organization is considering restricted release to research, enterprise and government partners.

| **Capstone gate**    | **Rule**                                                                |
|----------------------|-------------------------------------------------------------------------|
| Risk-domain coverage | Cannot complete without at least three risk domains.                    |
| Evidence minimum     | Cannot export report without 12 evidence cards.                         |
| Residual uncertainty | Cannot submit recommendation without an explicit uncertainty note.      |
| Mitigation plan      | Cannot complete dashboard without mitigation owners and due dates.      |
| Benchmark packet     | Cannot finish without claim, baselines, scoring and validity threats.   |
| Harness spec         | Cannot finish without data, runner, scorer, logs and validation script. |

Final portfolio export: hero summary, problem, system context, threat model, evaluation design, evidence map, risk dashboard, recommendation, limitations and what the learner would do next.

# 7. Implementation handoff for the existing codebase

The zip already includes React routes and screens that can be retained: landing, onboarding, diagnostic, dashboard, map, modules, module detail, lesson, simulation, quiz, evidence, benchmark, risk, portfolio and capstone. The course data model and design tokens should be changed.

Required data model changes:

\- Replace ModuleId = 'A' \| ... \| 'I' with PhaseId = 'P1' \| ... \| 'P6'.

\- Replace module lessons as strings with LessonContent objects.

\- Add sources: SourceItem\[\] and sourceIds on every lesson.

\- Add mediaPlan fields: conceptLecture, screencast, slidesPdf, transcript.

\- Add lab fields: starterRepoPath, datasetIds, validationScript, solutionPath.

\- Add artifactSchema and rubric fields per phase.

\- Add safety flags: disclosureTier, infoHazardReview, safeExampleOnly.

| **File / area**                                          | **Change**                                                                                                                                     |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| src/app/components/course/course-types.ts                | Replace 9-module catalogue with six-phase data from the course compendium. Add LessonContent, SourceItem, LabSpec and ArtifactSpec interfaces. |
| src/app/components/course/CourseLayout.tsx               | Change left rail grouping from Modules A-I to Phase groups plus Artifact Studio and Source Library.                                            |
| src/app/components/course/screens/lesson.tsx             | Render lesson blocks from structured lesson payload instead of static/generic course copy. Add source drawer and artifact output state.        |
| src/app/components/course/screens/module-detail.tsx      | Rename to Phase Overview or adapt copy. Show competency, lessons, source list and phase studio.                                                |
| src/styles/theme.css and src/app/components/fme/types.ts | Normalize to Deep Navy #020617, Primary Blue #1D4ED8, Signal Blue #60A5FA and required semantic colors.                                     |
| Seed evidence cards                                      | Remove or redact operationally harmful CBRN/cyber details. Use fictional evidence summaries with no procedural content.                        |
| Routing                                                  | Keep existing routes, but expose /course/phase/:id and /course/lesson/:id for content-scalable implementation.                                 |

# 8. Figma Make prompts

> **How to use this:** Paste Prompt A first to rebuild/consolidate the product. Paste Prompt B after the course content compendium is attached. Paste Prompt C if Figma drifts into a new visual style.

## Prompt A - Master rebuild and consolidation

You are the principal product designer, creative director, curriculum architect, design system lead and UX QA auditor for Frontier Evaluation Lab.

Do not create another disconnected version. Audit the existing screens and components, keep the strongest parts and rebuild one coherent premium interactive course product.

Canonical course structure is six phases totaling 51 hours:

1. The Paradigm - 6h - Custom Evaluation Rubric

2. Harness Engineering - 8h - Automated Native Testing Harness

3. Autonomous Agents - 12h - Agent Execution Sandbox

4. Spatial and World Models - 9h - Physical Simulation Benchmark

5. Red Teaming - 10h - Threat and Vulnerability Report

6. Enterprise Pipeline - 6h - Production-Ready Deployment Gate

The product should feel like a professional AI safety evaluation lab, research academy, mission-critical evidence dashboard and public-interest technology platform. It must not feel like generic edtech, a generic SaaS dashboard, a startup landing page, cyberpunk, decorative AI art, a static slide deck or a boring LMS.

Use one design system, one navigation system, one typography system, one color system, one component system and one phase structure.

Every lesson must include: lesson hero, why this matters, core concept, diagram or mental model, worked example, interaction, quiz or decision checkpoint, reflection, artifact output and next CTA.

Every lesson must include source cards and an advanced learning path.

Do not use lorem ipsum. Do not include harmful operational cyber or biology instructions. Use fictional, sandboxed, redacted or de-risked examples.

## Prompt B - Content integration

Now integrate the full course content compendium into the existing Frontier Evaluation Lab design.

Do not redesign the product. Preserve the locked visual direction and components. Populate the six phases, all lesson pages, source library, glossary, simulations, artifact builders, capstone studio and final portfolio export.

Break long content into short screen copy, expandable details, concept cards, expert panels, worked examples, quiz cards, reflection prompts, artifact builder fields and downloadable transcripts.

Every lesson must show its source IDs. Every phase must produce its required artifact. Every quiz must include correct answer, explanation, wrong-answer feedback and retry state. Every builder must include empty, draft, validation warning, saved and export states.

After integration, create a QA summary page listing missing content, overlong screens, inconsistent components, broken flows, accessibility concerns and suggested fixes.

## Prompt C - Visual decision lock

Lock the visual direction. Do not create a new style.

The UI is dark-first, research-grade, calm, institutional and mission-critical.

Use the AI safety evaluation lab metaphor throughout.

Remove generic edtech visuals, random gradients, neon/cyberpunk colors, AI brain/robot illustrations, inconsistent icons, decorative clutter and marketing-page styling.

Keep evidence cards, risk dashboards, evaluation lab interface, research-grade diagrams, clean course navigation, professional artifact builders and serious but inspiring tone.

# 9. QA board and acceptance criteria

| **QA area**       | **Acceptance criteria**                                                                                                                                                         |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Content QA        | No lorem ipsum; no unsupported safety claims; every lesson has objective, source IDs, interaction, knowledge check and artifact output; every phase has deliverable and rubric. |
| Visual QA         | One typography system; one semantic color system; risk colors used only semantically; dark and light themes both pass contrast.                                                 |
| UX QA             | Learner always knows location, objective, next action, artifact, source path and capstone connection. One primary action per screen.                                            |
| Accessibility QA  | Keyboard focus visible; no meaning by color alone; captions/transcript placeholders; reduced motion option; diagram text summaries.                                             |
| Safety QA         | Cyber/bio content is de-risked, fictional or redacted; no operational harm instructions; sensitive examples use disclosure tiers and expert-review language.                    |
| Implementation QA | Course data model matches six phases; source library renders; artifact save/export states work; validation warnings block incomplete capstone exports.                          |

Immediate P0 backlog: normalize tokens, replace course data with six phases, add source library and source drawer, build the golden lesson, reduce navigation clutter, add artifact tray, redact unsafe seed examples and wire phase artifacts into capstone gates.
