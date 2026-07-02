# Plan: Frontier Model Evaluation — Interactive Design System

## Context

The user wants a complete, production-quality **interactive design system viewer** for a 51-hour learning platform called **Frontier Model Evaluation (FME)**. The design system should exist as a live React web application with 8 scrollable pages navigated via a fixed sidebar. The research document at `src/imports/deep-research-report__4_-1.md` provides the course content, module structure, glossary, and realistic placeholder content to use throughout.

App.tsx is currently empty. The project has a full shadcn/ui component library (48 components), Tailwind v4, lucide-react, recharts, and all necessary packages installed.

---

## File Structure

```
src/
  styles/
    fonts.css                        ← ADD: Google Fonts import
  app/
    App.tsx                          ← REWRITE: sidebar shell + dark mode + routing
    components/
      fme/
        types.ts                     ← NEW: PageProps, C() color helper, fonts, shadow
        cover-page.tsx               ← NEW
        brand-system-page.tsx        ← NEW
        design-tokens-page.tsx       ← NEW
        components-page.tsx          ← NEW
        course-templates-page.tsx    ← NEW
        simulation-templates-page.tsx ← NEW
        quiz-templates-page.tsx      ← NEW
        capstone-templates-page.tsx  ← NEW
```

---

## Shared Foundation (`types.ts`)

### `PageProps`
```ts
export interface PageProps { dark: boolean; }
```

### `C(dark: boolean)` — brand color helper
Returns an object with all FME token values for both modes:
- `bg`, `surface`, `elevated`, `textPrimary`, `textSecondary`, `textTertiary`
- `border`, `borderSubtle`
- `primary`, `primarySoft`, `primaryBorder`
- `success`, `successSoft`, `successBorder`
- `warning`, `warningSoft`, `warningBorder`
- `danger`, `dangerSoft`, `dangerBorder`
- `teal`, `tealSoft`, `tealBorder`
- `violet`, `violetSoft`, `violetBorder`

### `fonts`
```ts
export const fonts = {
  sans: '"Inter", system-ui, sans-serif',
  serif: '"IBM Plex Serif", Georgia, serif',
  mono: '"IBM Plex Mono", "Courier New", monospace',
};
```

### `shadow`
```ts
export const shadow = {
  sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
  lg: '0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.05)',
};
```

---

## `App.tsx` — Shell

- Fixed 228px left sidebar with `background: c.surface`, `border-right: 1px solid c.border`
- **Top of sidebar:** FME logo lockup (Shield icon + "FME" + "DESIGN SYSTEM" in IBM Plex Mono)
- **Nav items (8):** num (mono) + label (sans), active state: `c.primarySoft` bg + `c.primary` left border + bold text
- **Bottom of sidebar:** version label + dark/light mode toggle button (Moon/Sun icon)
- **Main area:** `flex-1`, `overflow-y: auto`, renders the active `<PageComponent dark={dark} />`
- `useState` for `activePage` (default: `'cover'`) and `dark` (default: `false`)

---

## Page Designs

### 1. Cover Page
- Always dark-themed regardless of mode toggle (gradient: `#020617 → #0F172A → #0C1A3E`)
- Subtle grid overlay (1px lines at 48px intervals, 4% opacity)
- 3px rainbow accent line at top (`#1D4ED8 → #60A5FA → #2DD4BF → #A78BFA`)
- **Header row:** FME logo lockup (left) + "VERSION 1.0 / JUNE 2026" (right, mono)
- **Hero:** `"FRONTIER MODEL EVALUATION"` in IBM Plex Serif 72px, second word gradient-colored
- Tagline paragraph in Body L style
- **Stats row:** 4 tiles (51 Hours / 8 Modules / 100+ Components / 8 Pages)
- **Document structure grid:** 2×4 grid showing page nums + titles
- Footer rule with tagline

### 2. Brand System Page
Three sections:
1. **Brand Identity:** Logo lockup demo + brand personality cards (5 keywords with color dots and descriptions)
2. **Color System Light Mode:** 5-col grid of 15 color swatches (hex + token name)
3. **Color System Dark Mode:** Dark-background container with 6-col swatch grid
4. **Typography Scale:** Table with columns: Style / Size / LineHeight / Weight / Live Sample — rows for all 9 type styles rendered with actual fonts and sizes

### 3. Design Tokens Page
Sections:
- **Color tokens table:** Token name / Light hex+swatch / Dark hex+swatch / Group
- **Spacing scale:** Horizontal bars showing each spacing value (4–64px) with label + bar
- **Border radii:** 6 boxes with visual preview of each radius (10px button, 16px card, 20px modal, 999px badge, 8px input, 6px sm)
- **Elevation:** 5 boxes with applied shadow (none → sm → md → lg → focus ring)
- **Motion tokens:** Table with token name / value / usage context
- **Grid layout:** 3 rows (Desktop/Tablet/Mobile) with visual column preview

### 4. Components Page
Gallery organized into 5 sections, each with `Section` heading component:
1. **Navigation:** Breadcrumb trail, progress tracker bar, top nav strip
2. **Cards:** Course card, Evidence card, Source card, Case study card, Reflection card, Concept card (all 6 in 3-col grid)
3. **Learning components:** Learning objective block, Mental model block, "Why this matters" block — stacked full-width
4. **Badges & chips:** Risk badges (CRITICAL/HIGH/MEDIUM/LOW), Threshold badges (CAL-1 through CAL-5), Metric chips
5. **Interactive states:** Expandable drawer (interactive), Confidence slider (interactive), Completion state, Locked state, Retry state, Toast notification — 2-col grid
6. **Dashboard:** 4 KPI tiles + Risk matrix visualization

All components use realistic FME content (no lorem ipsum).

### 5. Course Templates Page
Full 3-panel lesson layout showing "Module 3, Lesson 2: Elicitation Strategies":
- **Top nav** strip (course-level navigation)
- **Left rail (240px):** Module title, progress bar, lesson list with checkmarks and active state
- **Main content:** Breadcrumb → Lesson header (serif 36px title, clock + difficulty + module meta) → Learning objectives block (blue soft background, numbered list) → Mental model block (teal left border) → Body paragraphs → "Why this matters" block (warning soft background) → Glossary terms grid (2-col) → Prev/Next navigation buttons
- **Right panel (300px):** Sources list, your notes textarea, module progress tracker

### 6. Simulation Templates Page
Red Team Decision Simulation:
- **Scenario header:** Dark-red background box with Shield icon, CRITICAL badge, scenario description, timer
- **Evaluation timeline:** Vertical timeline with color-coded event dots (info/warning/danger/action)
- **Decision options:** 2×2 grid of option cards (A/B/C/D), each with title, risk badge, description, consequence note. Clicking selects with `useState`; shows confirmation banner
- **Evidence log table:** ID / Summary / Confidence / Type columns with color-coded type values

### 7. Quiz Templates Page
- **Quiz header bar:** Module/title info, question count, time limit, pass threshold stats
- **Progress dots row:** 8 colored segments
- **Question 1 (Multiple choice):** Numbered indicator → question text → 4 radio options with A/B/C/D labels; Submit button disabled until selection → reveals correct/incorrect feedback block with explanation + sources
- **Question 2 (Scenario-based):** Shows scenario context box before options; same answer/feedback pattern
- **Bottom row (2-col):** Completion state card + Retry state card as static examples

All questions use realistic FME content (elicitation, scaffolded prompting, benchmark validity, etc.)

### 8. Capstone Templates Page
- **Dossier cover block:** Dark gradient, "PRE-DEPLOYMENT SAFETY EVALUATION" header, model name, evaluators, dates, overall risk rating
- **6 KPI tiles:** Evidence Items / Active Findings / Threshold Status / Evaluation Coverage / Avg. Confidence / Reviewers
- **Two-column row:**
  - Domain coverage: 8 risk domains with horizontal bar (colored by risk level) + risk badge
  - Findings table: ID / Domain / Finding / Severity / Status (color-coded status labels)
- **Executive summary panel:** Overall assessment text, 3 meta-tiles (Deployment Recommendation, Required Mitigations, Review Date), numbered mitigation list
- **Capstone deliverables:** 6 artifact cards (Evaluation Plan / Benchmark Packet / Evidence Log / Red Team Report / Dashboard / Executive Report) with status chips

---

## Realistic Content

All pages use domain-accurate FME content drawn from the research document:

- **Module names:** A–I from the schedule (Frontier AI Foundations, Governance & Law, Evaluation Science, Benchmarks, Cyber, Bio/Chem, Agents & Autonomy, Red Teaming, Reporting)
- **Concepts:** Elicitation, scaffolding, threat model, CAL-3/CAL-4 thresholds, HarmBench, CBRN uplift, AISI/CAISI, NIST AI RMF, system card, evidence card, red team finding
- **Evidence IDs:** EVD-2024-xxx format
- **Finding IDs:** RT-xxx format
- **Threshold labels:** CAL-1 through CAL-5

---

## Implementation Notes

1. **No lorem ipsum.** Every component shows real FME evaluation content.
2. **React imports:** All files using `ReactNode` type must import `{ type ReactNode } from 'react'`.
3. **Unused imports:** Remove any imported-but-unused icons/components.
4. **Dark mode prop:** Every page receives `dark: boolean` and uses `C(dark)` for all colors.
5. **Fonts:** `fonts.css` imports from Google Fonts; all text elements explicitly set `fontFamily` from `fonts.*` constants.
6. **Interactivity:** Components page has working slider + expandable drawer via `useState`. Quiz page has working answer selection + feedback reveal.
7. **No `find`, `glob`, or symlink-tricky operations** in build scripts.
8. **No design system packages (`@make-kits`)** are installed — the shadcn/ui components don't need to be used since the FME tokens differ from the shadcn theme. Inline styles + font constants is the cleanest approach.

---

## Verification

After implementation, confirm:
- [ ] App renders with a visible sidebar and correct page content in the preview
- [ ] Clicking each of the 8 nav items switches the main content area
- [ ] Dark/light toggle changes all surface colors across all visible components
- [ ] Cover page is always dark regardless of mode
- [ ] Components page has working slider + expandable drawer
- [ ] Quiz page shows correct/incorrect feedback after submitting an answer
- [ ] Simulation page shows decision selection feedback
- [ ] No TypeScript errors (all `ReactNode` types properly imported)
- [ ] Google Fonts (Inter, IBM Plex Serif, IBM Plex Mono) are loaded via fonts.css
