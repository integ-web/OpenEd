# Pages & Screens

Every route in the system with its purpose, UI structure, state dependencies, and navigation behavior.

---

## Public pages

These routes are accessible without authentication.

---

### `/` — Landing

**File:** `src/app/components/course/screens/landing.tsx`  
**Component:** `LandingScreen`  
**Wrapper:** `FullScreenWrapper` (has CourseProvider + AuthProvider context)  
**Auth-aware:** Yes — CTAs change based on `isAuthenticated`

**Sections (top to bottom):**
1. **Header bar** — Logo + wordmark. CTA: logged-out shows "Sign in" (→ `/login`) + "Start learning" (→ `/signup`); logged-in shows "Go to dashboard" (→ `/course/dashboard`)
2. **Hero** — Eyebrow label, H1, body copy, stat trio (51h / 6 phases / 1 capstone). CTA: logged-out → `/signup`; logged-in → `/course/dashboard`
3. **Course promises** — 4-card grid: Video-first learning, Artifact portfolio, AI Coach, Source-backed
4. **Six phases** — Phase card grid (color-coded with top border stripe), each showing ID, hours, difficulty, description, artifact output
5. **Audience** — 4 persona cards (Safety Researcher, ML Engineer, Trust & Safety Lead, Public-Interest Auditor)
6. **Bottom CTA** — Centered section. Logged-out: "Start learning" + diagnostic link. Logged-in: "Go to dashboard" only

**State reads:** `state.dark` (for C() tokens)  
**No protected state reads**

---

### `/login` — Sign In

**File:** `src/app/components/auth/LoginScreen.tsx`  
**Component:** `LoginScreen`  
**Shell:** `AuthShell` (standalone, always light)

**Layout:** Centered card (max-width 440px) with logo header

**Fields:** Email (type=email, autocomplete=email), Password (type=password, autocomplete=current-password)

**Interactions:**
- "Forgot password?" link → `/forgot-password`
- Form submit → `signIn(email, password)` → success redirects to `/course/dashboard`
- Error states: inline `AuthError` above form with friendly message
- "No account? Create one" link → `/signup`

**Error messages:**
- Empty fields: "Please enter your email and password."
- Wrong credentials: "Incorrect email or password. Please try again."
- Unconfirmed email: "Please confirm your email address before signing in."

---

### `/signup` — Create Account

**File:** `src/app/components/auth/SignUpScreen.tsx`  
**Component:** `SignUpScreen`  
**Shell:** `AuthShell`

**Fields:** Full name, Email, Password (min 8 chars)

**Interactions:**
- Submit → `signUp(email, password, fullName)` → stores `full_name` in Supabase user metadata
- If email confirmation required: shows `AuthSuccess` message ("Check your email to confirm...") + link to `/login`
- If auto-confirmed: redirects to `/course/dashboard`
- "Already have an account? Sign in" link → `/login`

**Validation:** Name required, email required, password ≥ 8 chars (client-side), all Supabase errors shown in `AuthError`

---

### `/forgot-password` — Reset Password

**File:** `src/app/components/auth/ForgotPasswordScreen.tsx`  
**Component:** `ForgotPasswordScreen`  
**Shell:** `AuthShell`

**Field:** Email address

**Interactions:**
- Submit → `resetPassword(email)` → Supabase sends email with reset link
- Success: `AuthSuccess` message appears, form hidden
- Redirect URL in reset email: `${origin}/auth/callback?type=recovery`
- "Remembered it? Sign in" → `/login`

---

### `/auth/callback` — Email Confirmation & Recovery

**File:** `src/app/components/auth/AuthCallbackScreen.tsx`  
**Component:** `AuthCallbackScreen`  
**Shell:** Standalone (no AuthShell)

**States:**
1. **Loading** — spinner while `supabase.auth.getSession()` resolves
2. **Success** — green checkmark + message + 2s delay redirect to `/course/dashboard`
3. **Error** — red error box + "Back to sign in" link

**Query params read:** `?type=recovery` (from password reset email)

This page handles both email confirmation links (Supabase default) and password recovery redirects.

---

### `/onboarding` — New Learner Setup

**File:** `src/app/components/course/screens/onboarding.tsx`  
**Component:** `OnboardingScreen`  
**Auth:** Not currently guarded (accessible without login)

**Steps (4):**
1. Welcome — intro + value prop
2. Name entry — `update({ learnerName })` to CourseState
3. Persona selection — 4 persona cards; `update({ persona })`
4. Summary — displays recommended starting point + proceed to course

**Navigation:** Previous / Next buttons; step dots at top

**State writes:** `state.learnerName`, `state.persona` via `update()`

---

### `/diagnostic` — Placement Test

**File:** `src/app/components/course/screens/diagnostic.tsx`  
**Component:** `DiagnosticScreen`  
**Auth:** Not guarded

**Structure:** 6 questions with 4 options each; explanation reveals on answer; nav buttons

**Scoring:**
- 5–6 correct → "Strong foundation" — jump to a later phase
- 3–4 correct → "Good baseline" — start from Phase 2
- 0–2 correct → "Start from the beginning" — Phase 1

**State writes:** navigates to appropriate module on completion

---

## Protected — Full Screen

### `/certificate` — Completion Certificate

**File:** `src/app/components/course/screens/certificate.tsx`  
**Component:** `CertificateScreen`  
**Auth:** Protected (ProtectedRoute)  
**Mode:** Always light (print-optimized)

**Layout:** Centered diploma card with decorative gradient border lines

**Sections:**
1. Logo + "Frontier Evaluation Lab" issuer header
2. "This certifies that" + learner name block
3. Course title + 3-line body text
4. Competencies list (5 items) + stats row (51h, 6 phases, 1 capstone)
5. Certificate ID + date + signature line
6. Action bar: Share, Download PDF

**State reads:** `state.learnerName`, `state.completedDate` (or current date)

---

## Protected — Course Shell

All routes under `/course/*` are rendered inside `CourseLayout` (TopNav + LeftRail + scrollable main area). ProtectedRoute guards the entire `course` path — unauthorized access redirects to `/login`.

---

### `/course/dashboard` — Learner Home

**File:** `src/app/components/course/screens/dashboard.tsx`  
**Component:** `DashboardScreen`

**Regions:**
1. **Greeting header** — "Good [time], [name]" + current phase tag
2. **Continue learning card** — Current lesson, video progress bar, CTA "Continue lesson"
3. **AI Coach nudge** — Right sidebar card with contextual prompt
4. **Artifact checkpoint** — Current artifact status (not started / in progress / complete)
5. **Course progress** — Per-phase progress bars with hours completed / total
6. **Capstone readiness** — Checklist of 5 items (evidence cards, benchmarks, threat model, etc.)
7. **6-phase path carousel** — Horizontal scroll of phase cards; click to navigate

**State reads:** `hoursCompleted`, `currentModuleId`, `currentLessonIndex`, `moduleProgress`, `artifactsCreated`, `completedModules`, `capstoneProgress`, `evidenceCards`

---

### `/course/map` — Learning Map

**File:** `src/app/components/course/screens/learning-map.tsx`  
**Component:** `LearningMapScreen`

**Layout:** Vertical timeline with phase nodes connected by a line

**Per phase:** Phase card showing status (done/active/upcoming), expand toggle, expandable lesson list with status icons (✓ / ▶ / ○)

**State reads:** `moduleProgress`, `completedModules`, `currentModuleId`, `currentLessonIndex`

**Navigation:** Click lesson → `navigate('lesson')`; click phase → `navigate('module')`

---

### `/course/modules` — Phase Grid

**File:** `src/app/components/course/screens/module-index.tsx`  
**Component:** `ModuleIndexScreen`

**Layout:** Filter tabs (All / Completed / In Progress / Locked) + 3-column card grid

**Each phase card:** Color stripe header, phase ID (P1–P6), hours badge, difficulty label, description, skills list, progress bar, status badge

**State reads:** `completedModules`, `moduleProgress`

**Navigation:** Click card → `navigate('module')`

---

### `/course/module` — Module Detail

**File:** `src/app/components/course/screens/module-detail.tsx`  
**Component:** `ModuleDetailScreen`

**Largest screen** (771 lines). Sections:

1. **Dark hero** — Gradient background, module badge, promise statement, SVG progress ring, CTA
2. **Lesson timeline** — Vertical list with status circles (done/active/locked), hours, lesson names
3. **Skills grid** — Earned (filled) vs locked (outlined) skill chips
4. **Expandable artifacts** — Accordion of 3 artifact types per phase
5. **Case studies** — 3-column cards with organization + context snippets
6. **Interactive challenge** — 3-step exercise:
   - Step 1: Rate 5 risk domains (sliders)
   - Step 2: Select evaluation types (checkboxes)
   - Step 3: Write release recommendation + submit
7. **Quiz preview** — Question count, passing score, estimated time
8. **Progress state display** — 4 states: not started, in progress, completed, certified

**State reads:** All CourseState fields  
**Local state:** Challenge step, domain ratings, selected evals, reasoning text, submitted flag

---

### `/course/lesson` — Lesson Viewer

**File:** `src/app/components/course/screens/lesson.tsx`  
**Component:** `LessonScreen`

**Layout:** Header + 5-tab body + optional AI Coach sidebar (toggleable)

**Tabs:**
| Tab | Contents |
|---|---|
| Watch | Video embed (or placeholder), key ideas list, notes textarea |
| Understand | Expandable key ideas with detail, mental model card, worked example (weak vs improved), common mistake callout |
| Practice | Scenario card, freetext response fields, knowledge check questions |
| Build | Artifact builder with form fields; save button → `update({ artifactsCreated })` |
| Sources | Required + optional source cards with authors, citations, link buttons |

**Completion:** After all tabs visited + artifact saved: confidence star rating (1–5) → marks lesson complete → routes to next

**State reads:** `currentLessonId`, `currentModuleId`, `artifactsCreated`  
**State writes:** `artifactsCreated`, `hoursCompleted`, `currentLessonIndex`

---

### `/course/case-study` — Case Study

**File:** `src/app/components/course/screens/case-study.tsx`  
**Component:** `CaseStudyScreen`

**Content:** Real-world evaluation case (AISI/CAISI o1 model evaluation)

**Layout:** Two-column (main content + right sidebar)

**Main sections:**
1. Context box — model, organization, date, evaluation type
2. Timeline — Chronological events with left connector line
3. Evaluation design — 3 columns: methodology, scope, tools
4. Key findings — Cards with type badge (behavioral/capability/safety), domain, confidence level
5. Decision & mitigations
6. Lessons for evaluators

**Sidebar:** Metadata, related concepts, reflection Q&A form with save button

---

### `/course/simulation` — Decision Simulation

**File:** `src/app/components/course/screens/simulation.tsx`  
**Component:** `SimulationScreen`

**Scenario:** CAL-3 threshold governance decision for a frontier model

**Phase tabs (stepper):**
1. **Evidence review** — Select relevant evidence items from a list (checkboxes); progress bar shows selected count
2. **Framework application** — Choose NIST RMF function + AISI guidance tier + CAL level (radio groups)
3. **Decision** — Select one of 4 deployment options (Approve / Approve with conditions / Defer / Reject); write justification; submit
4. **Outcome** — Compare your decision vs expert recommendation; see explanation

---

### `/course/quiz` — Knowledge Check

**File:** `src/app/components/course/screens/quiz.tsx`  
**Component:** `QuizScreen`

**Structure:** 6 questions, one at a time

**Per question:** Question text + 4 options; segment progress bar at top

**Answer flow:** Select option → Submit → color reveal (correct = success green, wrong = danger red, unchosen correct = outlined green) → explanation paragraph → Next

**Results page:** Score, mastery label (Foundational / Developing / Proficient / Expert), per-question breakdown

---

### `/course/evidence` — Evidence Library

**File:** `src/app/components/course/screens/evidence-library.tsx`  
**Component:** `EvidenceLibraryScreen`

**Layout:** Header + domain coverage chart + filters + card grid

**Domain coverage bar chart:** 8 domains, horizontal bars showing count per domain

**Filters:** Type (behavioral / capability / safety / alignment) + Confidence (high / medium / low)

**Evidence card fields:** ID (EVD-XXXX), domain, type, confidence dot, finding text, source, date

**Create new card:** Inline form with all fields + save → `update({ evidenceCards: [...] })`

**State reads/writes:** `state.evidenceCards`

---

### `/course/benchmark` — Benchmark Builder

**File:** `src/app/components/course/screens/benchmark-builder.tsx`  
**Component:** `BenchmarkBuilderScreen`

**4-step wizard:**
1. **Define scope** — Domain dropdown, elicitation method radio, evaluation objective textarea
2. **Add tasks** — Table view of tasks; inline "Add task" form (description, type, difficulty, target)
3. **Assess validity** — 5 threat categories rated High/Medium/Low (radio buttons); overall validity computed
4. **Review & save** — Summary cards + full task table + threat checklist; Save → `update({ benchmarks: [...] })`

---

### `/course/risk` — Risk Dashboard

**File:** `src/app/components/course/screens/risk-dashboard.tsx`  
**Component:** `RiskDashboardScreen`

**Layout:** Two-panel (left: matrix + legend, right: findings list + report)

**Risk matrix:** 5×5 grid (likelihood × severity). Cells colored by risk level (low/medium/high/critical). Findings plotted as colored dots; hover shows tooltip.

**Domain legend:** 8 domains with color codes

**Quick-add buttons:** Pre-filled risk entries for common finding types

**Right panel:**
- Filtered findings list
- Risk summary report (count by level)
- Deployment recommendation (auto-generated from risk profile)
- Mitigations checklist

---

### `/course/portfolio` — Completion Review

**File:** `src/app/components/course/screens/portfolio.tsx`  
**Component:** `PortfolioScreen`

**Layout:** Two-column (left: checklist sidebar, right: artifact grid + CTA)

**Left sidebar:**
- Completion checklist (5 items with ✓/✗ icons)
- Progress bar (% complete)
- Course stats (hours, phases, evidence cards, benchmarks)

**Artifact grid (8 items, 2-column):**
- Threat Model Canvas
- Evaluation Protocol
- Benchmark Suite
- Red Team Report
- Evaluation Harness
- Evidence Library
- Threshold Memo
- Risk Dashboard

Each card shows: module badge (color-coded), artifact name, status (complete / in-progress / pending), action button

**CTA section:** "Generate certificate" (enabled only when all complete) + PDF export button

---

### `/course/glossary` — Term Reference

**File:** `src/app/components/course/screens/glossary.tsx`  
**Component:** `GlossaryScreen`

**16 terms** covering: CAL levels, red teaming, elicitation, benchmark, harness, uplift, deployment decision, threat model, evidence standard, external evaluation, sandbox testing, base rate, transfer learning, emergent capability, constitutional AI, RLHF

**Search:** Real-time filter by term name or definition text

**Card:** Term name + phase badge + definition text

---

### `/course/sources` — Reference Library

**File:** `src/app/components/course/screens/sources.tsx`  
**Component:** `SourcesScreen`

**20 sources** — academic papers, frameworks, tools, datasets

**Each source:** Title, authors, organization, year, type badge, phase badge, description, external link

**Filters:** Type tabs (All / Paper / Framework / Tool / Dataset) + Phase tabs (All / P1–P6)

---

### `/course/content-qa` — Content QA Dashboard

**File:** `src/app/components/course/screens/content-qa.tsx`  
**Component:** `ContentQAScreen`  
**Purpose:** Internal editorial/QA tool, not student-facing

**Regions:**
1. **Stats grid** — 8 KPIs: total lessons, cited sources, video lessons, artifacts, words, links, completion rate, gaps
2. **Video QA V4 panel** — Expandable: pass/fail count breakdown, duplicate detection, per-lesson video status
3. **QA rules** — 2-column summary of active content rules and their pass/fail counts
4. **Content gaps** — Alert cards for lessons missing citations, videos, or artifacts
5. **Per-phase QA rows** — Each phase expandable; per-lesson rows with video badge, citation count, artifact status, QA icon

**Navigation:** "Open" buttons route to the relevant lesson

---

## Protected — Capstone Studio

### `/capstone/:section` — Capstone Studio

**File:** `src/app/components/capstone/CapstoneStudio.tsx`  
**Shell:** Standalone (does not use CourseLayout)  
**Provider:** CapstoneContext

**12 sections** (URL segments):

| Segment | Component | Purpose |
|---|---|---|
| `brief` | `CapstoneBrief` | Project brief + objectives overview |
| `model-profile` | `ModelProfile` | Aster-3 model capability profile |
| `release-context` | `ReleaseContext` | Deployment context + stakeholders |
| `threat-model` | `ThreatModelCanvas` | Threat identification canvas |
| `evaluations` | (section) | Evaluation design decisions |
| `benchmarks` | `BenchmarkPacket` | Benchmark suite assembly |
| `evidence-cards` | `EvidenceCardLibrary` | Evidence card management |
| `threshold-memo` | `ThresholdMemo` | Safety threshold reasoning doc |
| `risk-dashboard` | `RiskDashboard` | Risk matrix for capstone findings |
| `executive-report` | `ExecutiveReport` | Governance-ready summary |
| `peer-review` | `PeerReview` | Peer feedback exchange |
| `final-defense` | `FinalDefense` | Deployment recommendation defense |

**Navigation:** Left sidebar with section list + status indicators (empty / partial / complete)

**State:** `CapstoneContext` tracks per-section completion, all artifact data, submission status
