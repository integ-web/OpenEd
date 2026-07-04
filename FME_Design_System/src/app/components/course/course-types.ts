/* ═══════════════════════════════════════════════════════════════════════════
   Frontier Evaluation Lab — Course Data Model
   Canonical 6-phase structure. Source: master spec Compendium-3 + Spec-3.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Screen IDs ──────────────────────────────────────────────────────────────
export type ScreenId =
  | 'landing' | 'onboarding' | 'diagnostic' | 'dashboard'
  | 'map' | 'modules' | 'module' | 'lesson' | 'case-study'
  | 'simulation' | 'quiz' | 'evidence' | 'benchmark'
  | 'risk' | 'capstone' | 'portfolio' | 'certificate'
  | 'glossary' | 'sources' | 'content-qa';

// ─── Phase IDs (replaces ModuleId A–I) ───────────────────────────────────────
export type PhaseId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type ModuleId = PhaseId; // backward-compat alias for screens not yet updated

export type Difficulty = 'Foundational' | 'Intermediate' | 'Advanced';
export type EvidenceType = 'Positive' | 'Negative' | 'Threshold' | 'Mitigating';
export type Confidence = 'High' | 'Medium' | 'Low';

// ─── Phase shape ──────────────────────────────────────────────────────────────
export interface CoursePhase {
  id: PhaseId;
  title: string;
  subtitle: string;
  hours: number;
  difficulty: Difficulty;
  lessonCount: number;
  lessons: string[];
  skills: string[];
  tools: string[];
  artifact: string;
  artifactDesc: string;
  color: string;
  softBg: string;
  description: string;
}

export type CourseModule = CoursePhase; // backward-compat alias

// ─── Evidence and benchmark shapes ───────────────────────────────────────────
export interface EvidenceCard {
  id: string;
  title: string;
  domain: string;
  type: EvidenceType;
  confidence: Confidence;
  summary: string;
  source: string;
  date: string;
}

export interface BenchmarkEntry {
  id: string;
  name: string;
  domain: string;
  taskType: string;
  metric: string;
  tasks: number;
  validity: 'Strong' | 'Moderate' | 'Weak';
  notes: string;
}

// ─── Course state ─────────────────────────────────────────────────────────────
export interface CourseState {
  screen: ScreenId;
  dark: boolean;
  onboarded: boolean;
  diagnosed: boolean;
  learnerName: string;
  learnerPersona: 'safety-researcher' | 'ml-engineer' | 'trust-safety' | 'auditor';
  currentModuleId: PhaseId;
  currentLessonIndex: number;
  currentLessonId: string;
  completedModules: PhaseId[];
  moduleProgress: Record<PhaseId, number>;
  hoursCompleted: number;
  artifactsCreated: string[];
  quizMastery: number;
  capstoneProgress: number;
  evidenceCards: EvidenceCard[];
  benchmarks: BenchmarkEntry[];
}

export interface ScreenProps {
  state: CourseState;
  navigate: (screen: ScreenId) => void;
  update: (updates: Partial<CourseState>) => void;
}

// ─── Six canonical phases ─────────────────────────────────────────────────────
export const MODULES: CoursePhase[] = [
  {
    id: 'P1',
    title: 'The Paradigm',
    subtitle: 'Outcome vs trajectory metrics, benchmark limits, reading frontier claims',
    hours: 6,
    difficulty: 'Foundational',
    lessonCount: 6,
    lessons: [
      'What Is Frontier Model Evaluation?',
      'Outcome Metrics vs Trajectory Metrics',
      'Benchmark Saturation, Contamination and Goodhart',
      'From Vague Risk to Evaluation Objective',
      'Technical Due Diligence and AI Moats',
      'Phase Studio: Build the Custom Evaluation Rubric',
    ],
    skills: [
      'Define outcome vs trajectory metrics clearly',
      'Identify benchmark saturation and contamination signals',
      'Convert vague risk concerns to precise evaluation objectives',
      'Read frontier capability claims with structured skepticism',
    ],
    tools: ['HELM', 'Chatbot Arena', 'MMLU', 'GPQA Diamond'],
    artifact: 'Custom Evaluation Rubric',
    artifactDesc: 'A structured rubric linking risk claim → evaluation objective → metric → threshold for a chosen capability domain',
    color: '#1D4ED8',
    softBg: '#DBEAFE',
    description: 'Establish the evaluation mindset: define what you are measuring, why benchmark wins can mislead, and how to convert vague safety concerns into testable objectives.',
  },
  {
    id: 'P2',
    title: 'Harness Engineering',
    subtitle: 'Automate golden datasets, configure LLM-as-judge without self-deception',
    hours: 8,
    difficulty: 'Intermediate',
    lessonCount: 6,
    lessons: [
      'Evaluation Harness Anatomy',
      'Golden Datasets and Edge-Case Sampling',
      'LLM-as-Judge Without Self-Deception',
      'RAG Triad and Retrieval-Aware Evaluation',
      'Native Host Deployment for Low-Overhead Labs',
      'Promptfoo, DeepEval and Inspect AI Lab',
    ],
    skills: [
      'Build automated evaluation harnesses from scratch',
      'Construct and validate golden test datasets',
      'Configure and calibrate LLM-as-judge scoring systems',
      'Evaluate RAG pipelines using the RAG Triad framework',
    ],
    tools: ['DeepEval', 'promptfoo', 'Inspect AI', 'OpenAI Evals'],
    artifact: 'Automated Native Testing Harness',
    artifactDesc: 'A working harness with golden dataset, calibrated judge scorer, and automated pass/fail reporting for a target capability',
    color: '#0F766E',
    softBg: '#CCFBF1',
    description: 'Move from manual inspection to repeatable automated evaluation. Build harnesses that run in CI, configure judge calibration, and know when automation misleads you.',
  },
  {
    id: 'P3',
    title: 'Autonomous Agents',
    subtitle: 'Multi-turn tool calls, agent state, trajectory scoring',
    hours: 12,
    difficulty: 'Advanced',
    lessonCount: 7,
    lessons: [
      'Agent Anatomy: Tools, State and Control',
      'Software Engineering Benchmarks and Contamination',
      'Desktop and Web Agent Evaluation',
      'Rust Sandbox and Low-Compute Execution',
      'Memory, Context and Long-Horizon Reliability',
      'Scoring Agent Trajectories',
      'Phase Studio: Agent Sandbox Report',
    ],
    skills: [
      'Evaluate multi-turn tool-use agent behavior end-to-end',
      'Trace agent state changes across long task horizons',
      'Design SWE-bench and web agent test environments',
      'Score trajectories, not just final outputs',
    ],
    tools: ['SWE-bench', 'OSWorld', 'WebArena', 'GAIA', 'Inspect AI'],
    artifact: 'Agent Execution Sandbox',
    artifactDesc: 'A sandboxed evaluation environment with trajectory scoring, tool-use logs, and a structured failure-mode report',
    color: '#7C3AED',
    softBg: '#EDE9FE',
    description: 'Agents change the risk surface fundamentally. Evaluate multi-turn tool-use behavior, score trajectories, and detect when agent scaffolds create emergent risks.',
  },
  {
    id: 'P4',
    title: 'Spatial & World Models',
    subtitle: 'Object permanence, physical accuracy, generalization under novelty',
    hours: 9,
    difficulty: 'Advanced',
    lessonCount: 7,
    lessons: [
      'What Counts as Spatial or World-Model Evaluation?',
      'Object Permanence and Visual-Spatial Reasoning',
      'ARC-AGI-2 and Generalization Under Novelty',
      'Physical Reasoning Benchmarks',
      'Robotics and Industrial Simulation',
      'Video and World-Model API Evaluation',
      'Phase Studio: Physical Simulation Benchmark',
    ],
    skills: [
      'Evaluate object permanence and spatial reasoning',
      'Design ARC-AGI-style generalization tests',
      'Benchmark physical reasoning in simulation environments',
      'Assess world-model quality in video generation APIs',
    ],
    tools: ['ARC-AGI-2', 'RLBench', 'PHYBench', 'PyBullet'],
    artifact: 'Physical Simulation Benchmark',
    artifactDesc: 'A benchmark packet for spatial or physical reasoning with scenario designs, scoring rubrics, and baseline comparisons',
    color: '#B45309',
    softBg: '#FEF3C7',
    description: 'Spatial and world models are the next capability frontier. Test how models generalize to novel physical scenarios, track objects, and reason about the real world.',
  },
  {
    id: 'P5',
    title: 'Red Teaming',
    subtitle: 'State-based attacks, prompt injection, sandbagging, dangerous capabilities',
    hours: 10,
    difficulty: 'Advanced',
    lessonCount: 8,
    lessons: [
      'Red Teaming as Evaluation, Not Chaos',
      'State-Based Attacks and Prompt Injection',
      'Automated Red Teaming and Jailbreak Datasets',
      'Sandbagging, Scheming and Strategic Underperformance',
      'Dangerous Capability Domains and Information Hazards',
      'Third-Party Evaluator Access Negotiation',
      'Evidence Review, Risk Scoring and Replication',
      'Phase Studio: Threat and Vulnerability Report',
    ],
    skills: [
      'Design structured red-team campaigns with defined scope',
      'Execute state-based and prompt injection attack patterns',
      'Detect sandbagging and strategic model underperformance',
      'Produce governance-ready threat and vulnerability reports',
    ],
    tools: ['Inspect AI', 'promptfoo', 'Garak', 'HarmBench'],
    artifact: 'Threat and Vulnerability Report',
    artifactDesc: 'A red-team campaign report with attack taxonomy, evidence log, risk scores, and review board recommendations',
    color: '#B91C1C',
    softBg: '#FEE2E2',
    description: 'Red teaming finds what benchmarks miss. Design structured campaigns, automate attacks at scale, detect strategic model behavior, and report findings for governance.',
  },
  {
    id: 'P6',
    title: 'Enterprise Pipeline',
    subtitle: 'Latency, drift, deployment gates, production telemetry',
    hours: 6,
    difficulty: 'Advanced',
    lessonCount: 6,
    lessons: [
      'Production Telemetry for Model Evaluation',
      'Performance Metrics: TTFT, Latency and Concurrency',
      'Model Drift and Regression Gates',
      'Cost-to-Capability and Edge Deployment Models',
      'Dashboards, Threshold Memos and Executive Reports',
      'Capstone: Deployment Gate for Aster-3 Frontier',
    ],
    skills: [
      'Instrument production pipelines for evaluation signals',
      'Measure TTFT, p95 latency, and throughput under load',
      'Build regression gates and automated deployment criteria',
      'Write threshold memos and executive reports',
    ],
    tools: ['OpenTelemetry', 'GitHub Actions', 'Prometheus', 'Grafana'],
    artifact: 'Production-Ready Deployment Gate',
    artifactDesc: 'A deployment gate spec with latency thresholds, regression criteria, monitoring hooks, and a go/no-go recommendation',
    color: '#15803D',
    softBg: '#DCFCE7',
    description: 'Close the loop between evaluation and production. Build telemetry pipelines, detect drift, write threshold memos, and defend a deployment gate decision in the capstone.',
  },
];

export const PHASES = MODULES;
export const TOTAL_HOURS = 51;

// ─── Safe seed evidence (no operational hazard content) ───────────────────────
const SEED_EVIDENCE: EvidenceCard[] = [
  {
    id: 'EVD-001',
    title: 'MMLU-Pro saturation at 89.3% — benchmark no longer decision-relevant',
    domain: 'Measurement Validity',
    type: 'Threshold',
    confidence: 'High',
    summary: 'Aster-3 scores 89.3% on MMLU-Pro, approaching ceiling. Score differences between top models fall within noise. Recommend held-out evaluation set for capability differentiation.',
    source: 'P1 · Benchmark Analysis Lab',
    date: '2026-06-01',
  },
  {
    id: 'EVD-002',
    title: 'LLM-as-judge: 94% agreement with expert human panel on code rubric',
    domain: 'Harness Validity',
    type: 'Positive',
    confidence: 'High',
    summary: 'Automated judge achieves 94% agreement with expert human panel across 200 stratified samples. Acceptable for CI integration with weekly spot-check protocol.',
    source: 'P2 · Judge Calibration Lab',
    date: '2026-06-03',
  },
  {
    id: 'EVD-003',
    title: 'Prompt injection: 3/10 tool-use scenarios redirected (fictional/sandboxed)',
    domain: 'Agent Security',
    type: 'Positive',
    confidence: 'Medium',
    summary: 'In controlled fictional simulation, indirect injection via retrieved content redirected agent in 30% of runs. All scenarios used fictional targets. Requires independent replication.',
    source: 'P5 · Red Team Campaign (Simulated)',
    date: '2026-06-05',
  },
];

const SEED_BENCHMARKS: BenchmarkEntry[] = [
  {
    id: 'BM-001',
    name: 'Custom Evaluation Rubric v1 — P1 Artifact',
    domain: 'Evaluation Design',
    taskType: 'Multi-criteria evaluation objective framework',
    metric: 'Rubric coverage score (0–100)',
    tasks: 12,
    validity: 'Moderate',
    notes: 'Phase 1 artifact. Requires expert review before governance decisions.',
  },
];

// ─── Initial state — fresh start ──────────────────────────────────────────────
export const INITIAL_STATE: CourseState = {
  screen: 'landing',
  dark: false,
  currentLessonId: 'P1.L1',
  onboarded: false,
  diagnosed: false,
  learnerName: 'Alex',
  learnerPersona: 'safety-researcher',
  currentModuleId: 'P1',
  currentLessonIndex: 0,
  completedModules: [],
  moduleProgress: { P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0 },
  hoursCompleted: 0,
  artifactsCreated: [],
  quizMastery: 0,
  capstoneProgress: 0,
  evidenceCards: SEED_EVIDENCE,
  benchmarks: SEED_BENCHMARKS,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getModule(id: PhaseId): CoursePhase {
  return MODULES.find(m => m.id === id) ?? MODULES[0];
}

export function getPhase(id: PhaseId): CoursePhase {
  return getModule(id);
}

export function nextScreen(current: ScreenId): ScreenId {
  const order: ScreenId[] = ['landing', 'onboarding', 'diagnostic', 'dashboard'];
  const idx = order.indexOf(current);
  return idx >= 0 && idx < order.length - 1 ? order[idx + 1] : 'dashboard';
}

export const PERSONA_LABELS: Record<CourseState['learnerPersona'], string> = {
  'safety-researcher': 'Safety Researcher',
  'ml-engineer': 'ML Engineer',
  'trust-safety': 'Trust & Safety Lead',
  'auditor': 'Public-Interest Auditor',
};
