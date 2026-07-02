# Frontier Evaluation Lab — System Kit

The complete design and engineering specification for the **Frontier Model Evaluation (FME)** course platform. This document is the authoritative reference for all AI-assisted work on this project.

---

## What this system is

A full-stack interactive learning platform for professionals learning to evaluate the safety of frontier AI systems. It is structured as a 51-hour, 6-phase video-first course culminating in a capstone deployment decision exercise.

**Product name:** Frontier Evaluation Lab  
**Visual identity:** `Shield` icon + "Frontier Evaluation Lab" wordmark in IBM Plex Sans  
**Primary accent:** Blue `#2563EB` (light) / `#60A5FA` (dark)

---

## Kit documents

| File | Contents |
|---|---|
| [tokens.md](./tokens.md) | Color palette, typography, shadows, radii, motion — the complete `C()` token system |
| [pages.md](./pages.md) | Every route: purpose, sections, state reads, navigation |
| [components.md](./components.md) | All reusable components — auth shell, course shell, UI primitives, composites |
| [patterns.md](./patterns.md) | Layout, interaction, progress, and data-display patterns used across the system |
| [auth.md](./auth.md) | Supabase Auth wiring, route protection, AuthContext API, redirect rules |
| [data.md](./data.md) | CourseState shape, MODULES data, all TypeScript types |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Routing | React Router 7 (`createBrowserRouter`) |
| Auth | Supabase Auth (`@supabase/supabase-js`) |
| Styling | Inline styles using `C(dark)` token function + `fonts` / `shadow` / `radii` / `motion` constants |
| UI Primitives | Radix UI (47 wrapped components in `src/app/components/ui/`) |
| Charts | Recharts |
| Icons | Lucide React |
| Animation | Motion (motion/react) |
| State | React Context (`CourseContext`, `CapstoneContext`, `AuthContext`) |
| Backend | Supabase (Postgres + Auth) |

---

## Route map

### Public
```
/                    Landing page (auth-aware CTA)
/login               Email/password sign-in
/signup              Account creation
/forgot-password     Password reset request
/auth/callback       Email confirm + recovery redirect handler
/onboarding          4-step new-learner setup (no guard)
/diagnostic          6-question placement test (no guard)
```

### Protected — full-screen
```
/certificate         Printable diploma
```

### Protected — course shell (CourseLayout)
```
/course/dashboard    Learner home + progress overview
/course/map          Visual 6-phase journey timeline
/course/modules      Phase grid with status filters
/course/module       Module detail (phase hero + lesson list)
/course/module/:id   Module detail by ID
/course/lesson       Multi-tab lesson (Watch/Understand/Practice/Build/Sources)
/course/case-study   Real-world evaluation case study
/course/simulation   3-phase governance decision simulation
/course/quiz         6-question knowledge check
/course/evidence     Evidence card library (CRUD)
/course/benchmark    4-step benchmark design wizard
/course/risk         Likelihood × severity risk matrix
/course/portfolio    Completion checklist + artifact grid
/course/glossary     16-term searchable glossary
/course/sources      20-source filterable reference library
/course/content-qa   Content quality dashboard (internal tool)
```

### Protected — capstone studio
```
/capstone            → redirects to /capstone/brief
/capstone/:section   Any of 12 capstone sections
```

### Capstone sections (in order)
```
brief → model-profile → release-context → threat-model →
evaluations → benchmarks → evidence-cards → threshold-memo →
risk-dashboard → executive-report → peer-review → final-defense
```

---

## Design system principles

1. **Token-first** — Never hardcode colors. Always use `C(dark).tokenName` or `c.tokenName` after `const c = C(state.dark)`.
2. **Dark/light parity** — Every surface, text, and border token has both a light and dark value. The `dark` boolean is sourced from `CourseState.dark` or `CapstoneState.dark`.
3. **IBM Plex family** — Four faces: Sans (display/headings), Serif (editorial), Mono (metadata/IDs/scores). Inter for body.
4. **Blue is primary** — `#2563EB` light / `#60A5FA` dark. Used for links, CTA buttons, active states, progress fills.
5. **Phase colors** — Each of 6 phases has its own accent. Never mix phase colors across phases.
6. **Inline styles** — This codebase uses inline `style={{}}` objects throughout, not Tailwind classes. Match this convention when adding to existing components.
7. **No Redux** — State lives in React Context. Course state mutates via `update(Partial<CourseState>)`. Navigation via `navigate(ScreenId)`.
8. **Icons** — Lucide React only. Import individually: `import { Shield, ArrowRight } from 'lucide-react'`.

---

## File structure

```
src/
  app/
    App.tsx                          RouterProvider entry
    routes.tsx                       createBrowserRouter config
    data/                            Static data files
    components/
      auth/
        AuthContext.tsx              AuthProvider + useAuth hook
        AuthShell.tsx               Shared auth page shell + field components
        LoginScreen.tsx             /login
        SignUpScreen.tsx            /signup
        ForgotPasswordScreen.tsx    /forgot-password
        AuthCallbackScreen.tsx      /auth/callback
        ProtectedRoute.tsx          Auth guard wrapper
      capstone/
        CapstoneContext.tsx
        CapstoneStudio.tsx          Section router
        CapstoneBrief.tsx
        ModelProfile.tsx
        ReleaseContext.tsx
        ThreatModelCanvas.tsx
        ... (12 section components total)
      course/
        CourseContext.tsx            State + navigate + update
        CourseLayout.tsx            Shell (TopNav + LeftRail + Outlet)
        course-types.ts             All TypeScript types
        screens/
          landing.tsx
          onboarding.tsx
          diagnostic.tsx
          dashboard.tsx
          learning-map.tsx
          module-index.tsx
          module-detail.tsx
          lesson.tsx
          case-study.tsx
          simulation.tsx
          quiz.tsx
          evidence-library.tsx
          benchmark-builder.tsx
          risk-dashboard.tsx
          portfolio.tsx
          glossary.tsx
          sources.tsx
          content-qa.tsx
          certificate.tsx
      fme/
        types.ts                    C(), fonts, shadow, radii, motion tokens
      ui/
        (47 Radix-based primitives)
  lib/
    supabase.ts                     Supabase client (anon key only)
  styles/
    fonts.css                       Google Fonts imports
    theme.css                       Tailwind v4 CSS variables
utils/
  supabase/
    info.tsx                        projectId + publicAnonKey (autogenerated)
guidelines/
  Guidelines.md                     ← this file
  tokens.md
  pages.md
  components.md
  patterns.md
  auth.md
  data.md
```
