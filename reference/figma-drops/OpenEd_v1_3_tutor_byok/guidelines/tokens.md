# Design Tokens

Source of truth: `src/app/components/fme/types.ts`

All token values are accessed via the `C(dark: boolean)` function. **Never hardcode colors.** Always call `const c = C(state.dark)` or `const c = C(dark)` at the top of a component, then reference `c.tokenName`.

---

## Color Tokens

### Canvas & Surfaces

| Token | Light | Dark | Semantic name |
|---|---|---|---|
| `c.bg` | `#F8FAFC` | `#0A1220` | bg.canvas — page background |
| `c.surface` | `#FFFFFF` | `#0F172A` | bg.surface — cards, sidebars, nav |
| `c.elevated` | `#F1F5F9` | `#142033` | bg.surface.raised — chips, hover states, code blocks |

### Text

| Token | Light | Dark | Use |
|---|---|---|---|
| `c.textPrimary` | `#0F172A` | `#F8FAFC` | Headlines, labels, primary content |
| `c.textSecondary` | `#334155` | `#CBD5E1` | Body copy, descriptions |
| `c.textTertiary` | `#64748B` | `#94A3B8` | Metadata, timestamps, placeholders |

### Borders

| Token | Light | Dark | Use |
|---|---|---|---|
| `c.border` | `#CBD5E1` | `#1E293B` | Standard dividers, card edges |
| `c.borderSubtle` | `#E2E8F0` | `#142033` | Very light separators |

### Primary Blue *(locked — do not alter)*

| Token | Light | Dark | Use |
|---|---|---|---|
| `c.primary` | `#1D4ED8` | `#60A5FA` | Main CTA buttons, active states |
| `c.primarySoft` | `#DBEAFE` | `rgba(96,165,250,0.14)` | Active nav backgrounds |
| `c.primaryBorder` | `#BFDBFE` | `rgba(96,165,250,0.28)` | Active nav borders, focus rings |
| `c.signal` | `#1D4ED8` | `#60A5FA` | Links, progress fills (alias of primary) |
| `c.signalSoft` | `#EFF6FF` | `rgba(96,165,250,0.12)` | Info callout backgrounds |

> **Landing/auth screens** use the hardcoded value `#2563EB` (slightly lighter than the `#1D4ED8` primary) for buttons. This is intentional — the landing screen predates the locked spec. Do not unify them.

### Accent — Success (Emerald)

| Token | Light | Dark |
|---|---|---|
| `c.success` | `#047857` | `#10B981` |
| `c.successSoft` | `#D1FAE5` | `rgba(16,185,129,0.12)` |
| `c.successBorder` | `#A7F3D0` | `rgba(16,185,129,0.25)` |

**Use for:** completed lesson/artifact status, correct quiz answers, validated evidence.

### Accent — Warning (Amber)

| Token | Light | Dark |
|---|---|---|
| `c.warning` | `#B45309` | `#F59E0B` |
| `c.warningSoft` | `#FEF3C7` | `rgba(245,158,11,0.12)` |
| `c.warningBorder` | `#FDE68A` | `rgba(245,158,11,0.25)` |

**Use for:** in-progress states, partial completion, caution flags.

### Accent — Danger / Critical (Rose)

| Token | Light | Dark |
|---|---|---|
| `c.danger` | `#BE123C` | `#F43F5E` |
| `c.dangerSoft` | `#FFE4E6` | `rgba(244,63,94,0.12)` |
| `c.dangerBorder` | `#FECDD3` | `rgba(244,63,94,0.25)` |

**Use for:** auth errors, wrong quiz answers, critical risk findings, locked/blocked states.

### Accent — Analysis (Violet)

| Token | Light | Dark |
|---|---|---|
| `c.violet` | `#7C3AED` | `#8B5CF6` |
| `c.violetSoft` | `#EDE9FE` | `rgba(139,92,246,0.12)` |
| `c.violetBorder` | `#DDD6FE` | `rgba(139,92,246,0.25)` |

**Use for:** AI Coach elements, analysis/reasoning callouts, capstone sections.

### Accent — Evidence (Teal)

| Token | Light | Dark |
|---|---|---|
| `c.teal` | `#0F766E` | `#2DD4BF` |
| `c.tealSoft` | `#CCFBF1` | `rgba(45,212,191,0.12)` |
| `c.tealBorder` | `#99F6E4` | `rgba(45,212,191,0.25)` |

**Use for:** evidence library items, validated findings, teal artifact badges.

---

## Phase Colors

Each of the 6 course phases has a canonical accent color. These are stored on each module object and passed as `phase.color`. Use them **only** for that phase — never mix.

| Phase | Color |
|---|---|
| P1 — Threat Modeling | `#2563EB` (blue) |
| P2 — Benchmarks | `#0F766E` (teal) |
| P3 — Red Teaming | `#7C3AED` (violet) |
| P4 — Harnesses | `#B45309` (amber) |
| P5 — Evidence | `#047857` (emerald) |
| P6 — Release | `#BE123C` (rose/critical) |

> Exact values come from `MODULES` in `course-types.ts`. Always source from there, never guess.

---

## Typography

```ts
import { fonts } from 'src/app/components/fme/types';
```

| Token | Value | Use |
|---|---|---|
| `fonts.sans` | `"Inter", system-ui, sans-serif` | All body text, UI labels, buttons, form fields |
| `fonts.display` | `"IBM Plex Sans", "Inter", system-ui, sans-serif` | Headlines, section titles, card titles, module names |
| `fonts.serif` | `"IBM Plex Serif", Georgia, serif` | Editorial notes, expert commentary, pullquotes |
| `fonts.mono` | `"IBM Plex Mono", "Courier New", monospace` | Evidence IDs, scores, metadata tags, progress labels, code |

### Type scale (reference, not enforced by token)

| Role | Size | Font | Weight |
|---|---|---|---|
| Page headline | `clamp(30px, 4vw, 52px)` | display | 700 |
| Section heading h2 | 26px | display | 700 |
| Card title | 14–15px | display | 700 |
| Body | 14–16px | sans | 400 |
| Small label | 13px | sans | 500 |
| Metadata / tag | 11px | mono | 400–700 |
| Badge text | 10–11px | mono | 700 |

---

## Shadows

```ts
import { shadow } from 'src/app/components/fme/types';
```

| Token | Value | Use |
|---|---|---|
| `shadow.sm` | `0 1px 2px rgba(0,0,0,0.20), 0 1px 4px rgba(0,0,0,0.12)` | Cards, chips |
| `shadow.md` | `0 4px 8px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12)` | Dropdowns, popovers |
| `shadow.lg` | `0 10px 20px rgba(0,0,0,0.20), 0 4px 8px rgba(0,0,0,0.12)` | Modals, heavy panels |

---

## Border Radii

```ts
import { radii } from 'src/app/components/fme/types';
```

| Token | Value | Use |
|---|---|---|
| `radii.none` | `0` | Hard edges, dividers |
| `radii.xs` | `6px` | Chips, tags, small badges |
| `radii.sm` | `10px` | Buttons, inputs, small cards |
| `radii.md` | `14px` | Cards (most common) |
| `radii.lg` | `20px` | Panels, modals, large surfaces |
| `radii.pill` | `999px` | Badges, progress bars, avatar circles |

**Most-used:** cards use `borderRadius: 14`, buttons use `borderRadius: 8`, nav items use `borderRadius: 10`.

---

## Motion

```ts
import { motion } from 'src/app/components/fme/types';
```

| Token | Value | Use |
|---|---|---|
| `motion.fast` | `120ms ease` | Hover state transitions, active state fills |
| `motion.base` | `180ms ease` | Panel expand/collapse, sidebar width |
| `motion.slow` | `240ms ease` | Page-level fades, large layout transitions |

> The sidebar rail uses `transition: 'width 0.18s ease, padding 0.18s ease'` (custom, near `motion.base`). Spinner animation uses `animation: 'spin 0.7s linear infinite'` with `@keyframes spin { to { transform: rotate(360deg); } }`.

---

## Dark mode

Dark mode is controlled by `CourseState.dark` (a boolean stored in course context, persisted in local React state). The toggle button lives in the TopNav of `CourseLayout`.

- Default: light mode
- Read: `const c = C(state.dark)` inside any screen that gets `ScreenProps`
- In non-course components (auth screens, etc.): dark mode is not yet wired — auth screens are always light

The `C()` function is pure — no side effects, no context. Call it anywhere with any boolean.
