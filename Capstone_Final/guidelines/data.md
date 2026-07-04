# Data Model

All TypeScript types, state shapes, and static data structures in the system.

Source: `src/app/components/course/course-types.ts`

---

## CourseState

The single source of truth for learner progress. Stored in `CourseContext` (React state). Currently ephemeral — resets on page refresh.

```ts
interface CourseState {
  // Navigation
  screen: ScreenId;

  // Onboarding
  onboarded: boolean;
  learnerName: string;
  persona: string | null;

  // Current position
  currentModuleId: PhaseId;
  currentLessonIndex: number;
  currentLessonId: string;

  // Progress
  hoursCompleted: number;           // total hours across all modules
  moduleProgress: Record<PhaseId, number>;  // 0–100 per phase
  completedModules: PhaseId[];
  completedLessons: string[];

  // Tools
  evidenceCards: EvidenceCard[];
  benchmarks: BenchmarkEntry[];
  capstoneProgress: CapstoneProgress;
  artifactsCreated: string[];       // list of artifact type IDs created

  // UI
  dark: boolean;
}
```

### Initial state (INITIAL_STATE)

```ts
const INITIAL_STATE: CourseState = {
  screen: 'landing',
  onboarded: false,
  learnerName: 'Learner',
  persona: null,
  currentModuleId: 'P1',
  currentLessonIndex: 0,
  currentLessonId: 'p1-l1',
  hoursCompleted: 8.5,             // seeded for demo purposes
  moduleProgress: { P1: 65, P2: 20, P3: 0, P4: 0, P5: 0, P6: 0 },
  completedModules: [],
  completedLessons: ['p1-l1', 'p1-l2', 'p1-l3'],
  evidenceCards: SEED_EVIDENCE,
  benchmarks: SEED_BENCHMARKS,
  capstoneProgress: { ... },
  artifactsCreated: ['threat-model', 'eval-protocol'],
  dark: false,
};
```

---

## Types

### ScreenId

All navigable screen names:

```ts
type ScreenId =
  | 'landing' | 'onboarding' | 'diagnostic'
  | 'dashboard' | 'map' | 'modules'
  | 'module' | 'lesson' | 'case-study'
  | 'simulation' | 'quiz'
  | 'evidence' | 'benchmark' | 'risk'
  | 'capstone' | 'portfolio' | 'certificate'
  | 'glossary' | 'sources' | 'content-qa';
```

Mapped to URL paths via `SCREEN_PATHS` in `CourseContext.tsx`.

### PhaseId

```ts
type PhaseId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
```

### EvidenceCard

```ts
interface EvidenceCard {
  id: string;           // "EVD-0001" format
  domain: string;       // one of 8 evaluation domains
  type: EvidenceType;   // 'behavioral' | 'capability' | 'safety' | 'alignment'
  confidence: 'high' | 'medium' | 'low';
  finding: string;      // the finding text
  source: string;       // citation / source name
  date: string;         // ISO date string
}
```

### BenchmarkEntry

```ts
interface BenchmarkEntry {
  id: string;
  name: string;
  domain: string;
  elicitation: string;     // 'zero-shot' | 'few-shot' | 'chain-of-thought' | 'adversarial'
  objective: string;
  tasks: BenchmarkTask[];
  validity: ValidityRating; // 'high' | 'medium' | 'low'
  threats: ThreatRating[];
  createdAt: string;
}

interface BenchmarkTask {
  id: string;
  description: string;
  type: string;            // 'multiple-choice' | 'free-response' | 'code-generation' | etc.
  difficulty: 'easy' | 'medium' | 'hard';
  target: number;          // target score (0–100)
}
```

### CapstoneProgress

```ts
interface CapstoneProgress {
  sections: Record<CapstoneSection, SectionStatus>;
  submitted: boolean;
  submittedAt: string | null;
  recommendation: 'approve' | 'approve-conditions' | 'defer' | 'reject' | null;
}

type SectionStatus = 'empty' | 'partial' | 'complete';

type CapstoneSection =
  | 'brief' | 'model-profile' | 'release-context' | 'threat-model'
  | 'evaluations' | 'benchmarks' | 'evidence-cards' | 'threshold-memo'
  | 'risk-dashboard' | 'executive-report' | 'peer-review' | 'final-defense';
```

### ScreenProps

Passed to every course screen via `WithProps` or `FullScreenWrapper`:

```ts
interface ScreenProps {
  state: CourseState;
  navigate: (screen: ScreenId) => void;
  update: (updates: Partial<CourseState>) => void;
}
```

---

## MODULES — Static Phase Data

The `MODULES` array is the canonical source for all phase metadata. 6 entries, one per phase.

```ts
interface Module {
  id: PhaseId;           // 'P1' through 'P6'
  title: string;         // Short phase name
  subtitle: string;      // One-line description
  hours: number;         // Total video hours
  difficulty: string;    // 'Foundational' | 'Intermediate' | 'Advanced'
  color: string;         // Phase accent hex color
  lessons: string[];     // Array of lesson names
  skills: string[];      // Skills earned in this phase
  tools: string[];       // External tools introduced
  artifact: string;      // Name of the deliverable artifact
  description: string;   // Long description paragraph
}
```

**Phase registry:**

| ID | Title | Hours | Difficulty | Artifact | Color |
|---|---|---|---|---|---|
| P1 | Threat Modeling | ~8h | Foundational | Threat Model Canvas | `#2563EB` |
| P2 | Benchmarks & Metrics | ~9h | Intermediate | Benchmark Suite | `#0F766E` |
| P3 | Red Teaming | ~9h | Intermediate | Red Team Report | `#7C3AED` |
| P4 | Evaluation Harnesses | ~8h | Advanced | Evaluation Harness | `#B45309` |
| P5 | Evidence & Standards | ~9h | Advanced | Evidence Library | `#047857` |
| P6 | Release Decisions | ~8h | Advanced | Release Recommendation | `#BE123C` |

**Total:** 51 hours (`TOTAL_HOURS = 51`)

---

## Evaluation Domains

Used in EvidenceCard, risk matrix, benchmark domain dropdown. 8 canonical domains:

1. Cybersecurity uplift
2. CBRN risks
3. Deception & manipulation
4. Autonomous replication
5. Persuasion & influence ops
6. Situational awareness
7. Power-seeking behavior
8. Catastrophic potential

---

## Seed Data

The initial state includes pre-seeded evidence cards and benchmarks so the UI has content on first load.

**SEED_EVIDENCE:** ~8 evidence cards covering domains like cybersecurity, CBRN, deception, with mixed confidence levels.

**SEED_BENCHMARKS:** ~3 benchmark entries covering threat modeling, red teaming, and capability domains.

These exist only for demonstration. In a production deployment with Supabase persistence, the initial state would be empty and loaded from the database.

---

## SCREEN_PATHS / PATH_TO_SCREEN

Bidirectional mapping between `ScreenId` and URL paths, defined in `CourseContext.tsx`:

```ts
const SCREEN_PATHS: Record<ScreenId, string> = {
  landing:      '/',
  onboarding:   '/onboarding',
  diagnostic:   '/diagnostic',
  dashboard:    '/course/dashboard',
  map:          '/course/map',
  modules:      '/course/modules',
  module:       '/course/module',
  lesson:       '/course/lesson',
  'case-study': '/course/case-study',
  simulation:   '/course/simulation',
  quiz:         '/course/quiz',
  evidence:     '/course/evidence',
  benchmark:    '/course/benchmark',
  risk:         '/course/risk',
  capstone:     '/capstone/brief',
  portfolio:    '/course/portfolio',
  certificate:  '/certificate',
  glossary:     '/course/glossary',
  sources:      '/course/sources',
  'content-qa': '/course/content-qa',
};
```

`PATH_TO_SCREEN` is the inverse mapping, used by `useActiveScreen()` in CourseLayout to highlight the current nav item.

---

## CapstoneContext State

The Capstone Studio uses its own context (`CapstoneContext`) separate from `CourseContext`.

Tracks per-section artifact data, completion status, and final submission. Each section component reads/writes its own slice.

The capstone model (Aster-3) is defined in `CapstoneContext` with fixed capability ratings, training details, and deployment context used across all 12 capstone sections.

---

## Supabase Auth User Shape

After authentication, `useAuth().user` is a Supabase `User` object:

```ts
{
  id: string,                           // UUID — use as FK for progress persistence
  email: string,
  user_metadata: {
    full_name: string,                  // set at signup
    email_verified?: boolean,
  },
  app_metadata: {
    provider: 'email',
    providers: ['email'],
  },
  created_at: string,
  last_sign_in_at: string,
}
```
