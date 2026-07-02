# MASTER BUILD PLAN: Frontier Evaluation Lab
### Sole operating authority — full rebuild execution plan
### Source of truth: Frontier_Model_Evaluations_UI_UX_Product_Spec-3.md + Course_Content_Source_Compendium-3.md

---

## Context

**The problem:** The current build has three compounding failures:
1. **Wrong curriculum** — 9 alphabetical modules (A–I) instead of the 6 canonical phases specified in both master docs
2. **Wrong primary color** — Cyan `#38BDF8` instead of Primary Blue `#1D4ED8` (flagged explicitly as a product diagnosis issue)
3. **Wrong content** — Screens contain generic/invented lesson content instead of the real curriculum from the Content Compendium (46 verified sources, 34 specific lessons, 7 golden datasets, real tools)

**The mandate:** Build the learning infrastructure for the AI evaluation industry. This is not a generic edtech product. Every screen must feel like a professional AI safety evaluation lab. The golden lesson (P1.4) is the quality benchmark for everything else.

**Product name:** Frontier Evaluation Lab (not "Frontier Model Evaluation Course")

**Course promise:** Zero → strong intermediate competence in evaluating frontier AI models — proving models are safe, reliable, and ready for real-world use.

---

## Current State Assessment

| Area | Status | Problem |
|------|--------|---------|
| Color system | ❌ Broken | Primary is cyan `#38BDF8`, spec requires blue `#1D4ED8` |
| Curriculum structure | ❌ Wrong | 9 modules A–I; spec requires 6 phases P1–P6 |
| course-types.ts | ❌ Reverted | Shows old 9-module structure; my 6-phase rewrite was undone |
| Lesson content | ❌ Generic | Hardcoded fictional content; needs real curriculum from compendium |
| Seed evidence cards | ⚠️ Unsafe | Contains CBRN operational language — must be replaced with de-risked examples |
| Navigation/left rail | ❌ Wrong | Shows modules A–I; needs 6 phases |
| Landing screen | ⚠️ Partial | Has 9 module cards, wrong product name |
| Dashboard | ⚠️ Partial | Shows module-letter progress, needs phase awareness |
| Glossary | ❌ Missing | Required screen, 24 terms defined in compendium |
| Source library | ❌ Missing | Required screen, 46 sources (S-001 to S-046) |
| Routes | ✓ Working | URL-based routing works; needs /course/glossary and /course/sources added |
| Capstone quality gates | ⚠️ Wrong | 4 gates implemented; spec requires 6 |

---

## Canonical Decisions (Non-Negotiable)

### Product Identity
- **Name:** Frontier Evaluation Lab
- **Tagline:** "To solve AI's biggest bottleneck: proving models are safe, reliable, and ready for real-world use."
- **Course landing copy (exact):** "Learn to evaluate frontier AI before it surprises you"
- **Subhead:** "A 51-hour interactive course on threat models, benchmarks, red teaming, harnesses, safeguards, evidence, and decision memos for frontier AI systems."

### Color System (locked — no deviation)
| Token | Value | Use |
|-------|-------|-----|
| Deep Navy | `#020617` | Page background |
| Slate Surface | `#0F172A` | Panel/card background |
| Elevated | `#1E293B` | Modal/raised card |
| Primary Blue | `#1D4ED8` | All primary CTAs, active states, links |
| Signal Blue | `#60A5FA` | Dark-mode primary, progress, highlights |
| Teal Evidence | `#0F766E` | Verified evidence, validated results |
| Violet Expert | `#7C3AED` | Expert notes, advanced content |
| Success Green | `#15803D` | Completion, correct answers |
| Warning Amber | `#B45309` | Caution, uncertainty, missing evidence |
| Danger Red | `#B91C1C` | Critical risk only — do not overuse |

### Typography (locked)
- Inter — all UI and body text
- IBM Plex Serif — expert notes, editorial callouts, worked example pull quotes
- IBM Plex Mono — evidence IDs, benchmark scores, technical metadata

### 6 Canonical Phases
| ID | Title | Hours | Difficulty | Deliverable |
|----|-------|-------|------------|-------------|
| P1 | The Paradigm | 6h | Foundational | Custom Evaluation Rubric |
| P2 | Harness Engineering | 8h | Intermediate | Automated Native Testing Harness |
| P3 | Autonomous Agents | 12h | Advanced | Agent Execution Sandbox |
| P4 | Spatial & World Models | 9h | Advanced | Physical Simulation Benchmark |
| P5 | Red Teaming | 10h | Advanced | Threat and Vulnerability Report |
| P6 | Enterprise Pipeline | 6h | Advanced | Production-Ready Deployment Gate |

---

## Implementation Plan — 7 Sequential Phases

### PHASE A: Foundation Fixes (Do First — Unblocks Everything)

**A1. Fix color system — `src/styles/theme.css`**
- Change `--primary: #38BDF8` → `#1D4ED8`
- Change `--primary-foreground: #0A1220` → `#F8FAFC`
- Keep `--color-signal: #60A5FA` (dark mode signal)
- Keep `--background: #0A1220` (deep navy canvas — this is correct)
- Update light mode: `--primary: #1D4ED8` (same value, it's always blue)
- Update sidebar: `--sidebar-primary: #1D4ED8`
- Update `--ring: #1D4ED8`

**A2. Fix color tokens — `src/app/components/fme/types.ts`**
- `primary: dark ? '#60A5FA' : '#1D4ED8'` — Signal Blue in dark, Primary Blue in light
- `primarySoft: dark ? 'rgba(96,165,250,0.14)' : '#DBEAFE'`
- `primaryBorder: dark ? 'rgba(96,165,250,0.28)' : '#BFDBFE'`
- All other semantic colors (success, warning, danger, teal, violet) are correct per spec — keep them

**A3. Rebuild curriculum — `src/app/components/course/course-types.ts`**

Replace `ModuleId = 'A'|'B'|...|'I'` with `PhaseId = 'P1'|'P2'|'P3'|'P4'|'P5'|'P6'`

New `CoursePhase` interface:
```typescript
interface CoursePhase {
  id: PhaseId;
  title: string;
  subtitle: string;
  hours: number;
  difficulty: Difficulty;
  lessonCount: number;
  lessons: string[];        // lesson titles from compendium
  skills: string[];
  tools: string[];          // real tools: HELM, promptfoo, SWE-bench, etc.
  artifact: string;
  artifactDesc: string;
  color: string;
  softBg: string;
  description: string;
}
```

Phase color mapping:
- P1 → `#1D4ED8` / `#DBEAFE` (primary blue)
- P2 → `#0F766E` / `#CCFBF1` (teal)
- P3 → `#7C3AED` / `#EDE9FE` (violet)
- P4 → `#B45309` / `#FEF3C7` (amber)
- P5 → `#B91C1C` / `#FEE2E2` (danger red)
- P6 → `#15803D` / `#DCFCE7` (success green)

`CourseState` changes:
- `currentModuleId: PhaseId` (was `ModuleId`)
- `completedModules: PhaseId[]`
- `moduleProgress: Record<PhaseId, number>`

`INITIAL_STATE`:
- `currentModuleId: 'P1'`
- `completedModules: []`
- `moduleProgress: { P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0 }`
- `hoursCompleted: 0` (fresh start)

Safe seed evidence cards (replace current CBRN seed — safety requirement):
```
EVD-001: "Benchmark saturation on MMLU-Pro at 89.3%" (Measurement Validity)
EVD-002: "LLM-as-judge 94% agreement with human panel" (Harness Validity)
EVD-003: "Prompt injection in 3/10 tool-use scenarios" (Red Teaming — fictional/redacted)
```

**A4. Update `CourseContext.tsx` navigation map**
Replace all `ModuleId` references with `PhaseId`. The `SCREEN_PATHS` map stays the same (URLs don't change). Update `INITIAL_STATE` import reference.

---

### PHASE B: Navigation & Layout

**B1. Rebuild left rail — `src/app/components/course/CourseLayout.tsx`**

Replace the MODULES section (9 A-I rows) with 6 phase rows:
```
PHASES section:
- P1 The Paradigm     [progress bar] [%]
- P2 Harness Eng.     [progress bar] [%]
- P3 Agents           [progress bar] [%]
- P4 Spatial Models   [progress bar] [%]
- P5 Red Teaming      [progress bar] [%]
- P6 Enterprise       [progress bar] [%]
```

Add Glossary and Source Library to TOOLS section:
```
TOOLS:
- Evidence Library
- Benchmark Builder
- Glossary          [NEW] → /course/glossary
- Source Library    [NEW] → /course/sources
- Risk Dashboard
- Capstone Studio ↗
```

Fix TopNav: Remove "Module X" breadcrumb — replace with "Phase X · Lesson Title"
Fix TopNav logo: Use `#1D4ED8` blue background (not `#38BDF8` cyan)

---

### PHASE C: Core Screen Rebuilds

**C1. `landing.tsx` — complete rebuild**

Structure:
1. Top bar — "Frontier Evaluation Lab" wordmark + Shield logo in blue
2. Hero — exact spec copy: "Learn to evaluate frontier AI before it surprises you" (IBM Plex Sans, 64px)
3. Subhead — "A 51-hour interactive course on threat models, benchmarks..."
4. Stats row — 51h · 6 phases · 34 lessons · 7 lab exercises · 46 sources
5. 6 phase cards in 2×3 grid with phase colors, tool names, deliverable names
6. 4 persona cards (Safety Researcher, ML Engineer, Trust & Safety Lead, Auditor)
7. Bottom CTA section — "Evaluation is where frontier AI becomes legible."

Remove: all old module A-I cards, rainbow bar, generic gradients

**C2. `dashboard.tsx` — content update**

- KPI tiles reference phases (not modules A-I)
- "Current phase" shows P1/P2/etc. with phase color
- Module progress bars use P1-P6 labels
- Remove "Module B, Lesson 1" default — show clean first-run state
- Recent activity: phase-grounded example entries

**C3. `module-index.tsx` → rename conceptually to Phase Index**

Replace 9 A-I module cards with 6 P1-P6 phase cards:
- Each card: phase number pill, title, hours, difficulty badge, lesson count
- Tool chips (HELM, promptfoo, SWE-bench, etc.) per phase
- Deliverable name
- Phase accent color top border
- CTA: "Start Phase" / "Continue" / "Completed"
- Filter tabs: All · Completed · In Progress · Not Started

**C4. `module-detail.tsx` → Phase Detail**

Replace generic module overview with phase-specific content:
- Hero: phase title, description, hours, difficulty
- Lesson list: all lessons for that phase with duration, objective, artifact produced
- Skills unlocked section
- Tools & resources for phase
- Phase deliverable artifact preview
- Progress ring (SVG)
- "Start Lesson" CTA → navigates to /course/lesson

---

### PHASE D: Golden Lesson (Quality Benchmark)

**`lesson.tsx` — rebuild as P1.4 "From Vague Risk to Evaluation Objective"**

This is the 90-minute golden lesson from the compendium. Build it to full quality — every other lesson template derives from this.

10 lesson blocks in order:

1. **Lesson Hero** — Module label, lesson title, subtitle, duration, learning objective
   - Title: "From Vague Risk to Evaluation Objective"
   - Subtitle: "Good frontier evaluations start with the decision you need to make, not the benchmark you happen to have."
   - Duration: 90 minutes
   - Objective: "Convert a vague AI safety concern into a precise evaluation objective"

2. **Why This Matters** — Text block with IBM Plex Serif pull quote:
   - "Many beginners ask, 'Which benchmark should we run?' Professional evaluators ask, 'What risk claim are we trying to test, and what decision will the evidence inform?'"

3. **Core Concept** — Flip cards (click to reveal):
   - Threat model / Capability hypothesis / Evaluation objective / Metric / Evidence / Threshold / Mitigation

4. **Mental Model / Diagram** — Flow diagram (expandable steps):
   - Threat Model → Evaluation Objective → Task Design → Evidence → Decision
   - Each node expandable with definition and example

5. **Worked Example** — Tab toggle (Weak vs Improved):
   - Weak: "Test whether the model is dangerous."
   - Improved: "Evaluate whether the model, when given browser and terminal access, can meaningfully improve a novice user's ability to complete multi-step cyber reconnaissance tasks in a controlled environment."
   - Callout list: 6 reasons the improved version is stronger

6. **Interactive Exercise** — 8-field form (given: "This model might help with biological misuse"):
   - Actor / Capability / Harm pathway / Model access level / Task environment / Success condition / Evidence needed / Disclosure sensitivity
   - Live validation, completion tracking

7. **Quiz / Decision Checkpoint** — 4 MCQ questions:
   - Q1: Why is "test if the model is dangerous" a bad evaluation objective?
   - Q2: Which element of the improved objective "names the task family"?
   - Q3: What does "makes measurement possible" mean in evaluation design?
   - Q4: What is the relationship between an evaluation objective and a threshold decision?
   - Immediate feedback with explanation

8. **Reflection** — Textarea prompt:
   - "Think of one AI risk you have heard people discuss. Rewrite it as an evaluation objective. What decision would the evaluation inform?"

9. **Artifact Output** — Evaluation Objective Card (7 fields, formattable):
   - Risk concern / Threat model / Capability hypothesis / Evaluation objective / Evidence needed / Decision informed / Confidence level
   - "Save to Portfolio" button

10. **Next Lesson CTA** — Summary of what was learned + link to next lesson

Sidebar: Source rail citing S-001, S-003, S-008 (from compendium)
Progress tracking: 10 checkmarks, section completion state

---

### PHASE E: Add Missing Screens

**E1. `glossary.tsx` — NEW SCREEN**

24 terms from compendium (exact definitions):
- Evaluation objective, Outcome metric, Trajectory metric, Harness, Golden dataset, LLM-as-judge, RAG Triad, Benchmark saturation, Contamination, Elicitation, Sandbagging, Evidence card, Threshold memo, Deployment gate, + 10 more from spec

UI:
- Search filter (live)
- Alphabetical grouping
- Each term: mono ID label + term title + definition + "Used in Phase X" tag
- Expandable for deeper explanation
- "Add to notes" button

**E2. `sources.tsx` — NEW SCREEN**

46 sources (S-001 to S-046) from compendium with real links:
- Filter by phase (P1–P6), by type (Paper, Tool, Framework, Dataset)
- Each source: source ID (mono), title, type badge, used-in-phase tags, one-line description, link
- Resource bundles by learner need

**E3. Update routes.tsx**
Add to /course/* children:
```typescript
{ path: 'glossary', element: <WithProps Screen={GlossaryScreen} /> },
{ path: 'sources',  element: <WithProps Screen={SourcesScreen} /> },
```

Add new ScreenId values: `'glossary' | 'sources'`
Add to SCREEN_PATHS: `glossary: '/course/glossary'`, `sources: '/course/sources'`

---

### PHASE F: Capstone Update

**`capstone/CapstoneContext.tsx` — add 2 missing quality gates**

Current: 4 gates. Spec requires 6:
1. ✓ ≥3 risk domains in threat model
2. ✓ ≥12 evidence cards before export
3. ✓ Residual uncertainty note before recommendation
4. ✓ Mitigation plan before dashboard complete
5. ❌ **NEW: Benchmark packet with ≥1 real benchmark before finalizing**
6. ❌ **NEW: Harness spec completed before submitting dossier**

Add to `qualityGates`:
- `hasBenchmarkPacket: state.benchmarkPacket.length >= 1`
- `hasHarnessSpec: state.harnessSpec?.completed === true`

**`capstone/CapstoneBrief.tsx`** — Update deliverables list to include:
- System charter
- Harness spec (was missing)
- 6 total quality gates displayed

---

### PHASE G: Safety Audit & Polish

**G1. Safety check on all seed data**
- Remove any CBRN operational language from seed evidence cards
- Replace with measurement/methodology examples that are safe for all learners
- All red-team content uses de-risked, fictional, or clearly educational examples

**G2. Consistency pass**
- Verify all screens use phase colors, not module letters
- Verify IBM Plex Sans for all headings (not Rajdhani, not Serif)
- Verify primary blue `#1D4ED8` used for all CTAs
- Verify no hardcoded cyan `#38BDF8` in course screens

**G3. Initial state update**
- INITIAL_STATE shows fresh learner (0 hours, P1 not started)
- OR shows realistic demo state: "Alex, P2 40%, 8.4h/51h" — with phase-grounded content

---

## Critical Files to Modify

| File | Change |
|------|--------|
| `src/styles/theme.css` | `--primary: #1D4ED8` |
| `src/app/components/fme/types.ts` | `primary: dark ? '#60A5FA' : '#1D4ED8'` |
| `src/app/components/course/course-types.ts` | Full rewrite: 6 phases, real content, safe seed data |
| `src/app/components/course/CourseContext.tsx` | PhaseId types, update INITIAL_STATE |
| `src/app/components/course/CourseLayout.tsx` | 6-phase left rail, blue TopNav logo, Glossary+Sources in TOOLS |
| `src/app/routes.tsx` | Add glossary/sources routes and ScreenId types |
| `src/app/components/course/screens/landing.tsx` | Full rebuild: 6 phases, FEL product name, spec copy |
| `src/app/components/course/screens/dashboard.tsx` | Phase-aware KPIs and progress |
| `src/app/components/course/screens/module-index.tsx` | 6 phase cards |
| `src/app/components/course/screens/module-detail.tsx` | Phase detail view |
| `src/app/components/course/screens/lesson.tsx` | Golden lesson P1.4 structure, 10 blocks |
| `src/app/components/course/screens/glossary.tsx` | NEW — 24 terms |
| `src/app/components/course/screens/sources.tsx` | NEW — 46 sources |
| `src/app/components/capstone/CapstoneContext.tsx` | 6 quality gates |
| `src/app/components/capstone/CapstoneBrief.tsx` | Updated deliverables |

---

## Execution Order

Execute strictly in this order — each phase unblocks the next:

1. **A** → Color + course-types + INITIAL_STATE (foundation)
2. **B** → CourseLayout left rail + TopNav (navigation)
3. **C** → landing + dashboard + module-index + module-detail (core screens)
4. **D** → Golden lesson (lesson.tsx) (content quality)
5. **E** → Glossary + Sources screens + route additions (new screens)
6. **F** → Capstone 6-gate update (capstone)
7. **G** → Safety audit + consistency pass (polish)

Do not skip ahead. If lesson.tsx is rebuilt before course-types.ts is fixed, the phase data won't be available.

---

## Verification

After each phase:
- A: Visit `/` — primary buttons should be blue, not cyan
- B: Visit `/course/dashboard` — left rail shows P1–P6, not A–I
- C: Landing shows "Frontier Evaluation Lab", 6 phase cards, correct copy
- D: Visit `/course/lesson` — sees 10 lesson blocks, interactive exercise, artifact output
- E: Visit `/course/glossary` and `/course/sources` — both render
- F: Visit `/capstone/brief` — 6 quality gates shown
- G: Dark/light mode toggle works consistently across all screens
