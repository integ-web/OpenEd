/* ============================================================================
   Frontier Model Evaluations — Course Content Data
   Source of truth: phase_01–06 content pack files.
   Do NOT invent URLs, citations, or lesson content.
   VIDEO_PENDING = course-original recording not yet produced.
   candidate-external = real external video; verify before publishing.
   ============================================================================ */

export type VideoStatus = 'pending' | 'candidate-external';
export type Difficulty = 'beginner' | 'beginner-intermediate' | 'intermediate' | 'advanced';

export interface LessonSource {
  id: string;
  title: string;
  org: string;
  type: string;
  diff: Difficulty;
  required: boolean;
  why: string;
  url: string;
}

export interface LessonData {
  lessonId: string;
  phaseId: string;
  phaseTitle: string;
  lessonNum: number;
  lessonOf: number;
  title: string;
  subtitle: string;         // lessonPromise
  duration: string;
  difficulty: Difficulty;
  objective: string;
  videoTitle: string;
  videoProvider: string;
  videoUrl: string | null;
  videoDuration: string;
  videoStatus: VideoStatus;
  chapters: { t: string; title: string; cue: string }[];
  transcriptSummary: string;
  keyIdeas: { title: string; body: string; example: string }[];
  mentalModelTitle: string;
  flowNodes: { label: string; color: string; desc: string }[];
  workedExample: {
    weak: string;
    weakProblems: string[];
    improved: string;
    improvedStrengths: [string, string][];
  };
  practicePrompt: string;
  practiceTask: string;
  practiceFields: { key: string; label: string; ph: string }[];
  quizQuestion: string;
  quizOptions: string[];
  quizCorrect: number;
  quizExplanation: string;
  artifactType: string;
  artifactFields: { key: string; label: string; ph: string }[];
  commonMistake: string;
  coachOpening: string;
  coachPrompts: string[];
  sources: LessonSource[];
  nextLessonId: string | null;
  capstoneConnection: string;
}

// ─── Phase 1 ─────────────────────────────────────────────────────────────────

const P1L1: LessonData = {
  lessonId: 'P1.L1', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 1, lessonOf: 6,
  title: 'What Is Frontier Model Evaluation?',
  subtitle: 'Understand why evaluation is the scientific act that turns model behavior into decision-grade evidence.',
  duration: '45 min', difficulty: 'beginner',
  objective: 'Explain frontier model evaluation as systematic measurement of model behavior under defined conditions.',
  videoTitle: 'Holistic Evaluation of Language Models (HELM) — Yifan Mai, Stanford University',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=fLoYcXLG6ro',
  videoDuration: 'External video — confirm timestamp after embedding',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Evaluation as behavior', cue: 'Focus on what the system does under defined conditions.' },
    { t: '—', title: 'Scenarios and metrics', cue: 'HELM-style matrix of use cases and desiderata.' },
    { t: '—', title: 'From measurement to decision', cue: 'Why scores need interpretation.' },
  ],
  transcriptSummary: 'This lecture introduces holistic evaluation across scenarios and metrics. Key insight: a benchmark is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. The starting question is never "what can we run?" but "what uncertainty is blocking a responsible decision?"',
  keyIdeas: [
    { title: 'Defined conditions', body: 'The prompt, tool access, context, budget, and evaluator all shape the behavior observed. Change any condition and you get different evidence.', example: 'The same model may appear safe under a system prompt and unsafe without one — the conditions are part of the measurement.' },
    { title: 'Measurement instrument', body: 'An eval is a measuring instrument with calibration error, not a truth oracle. Like any instrument, it can be miscalibrated, misapplied, or saturated.', example: 'A saturated benchmark looks like a perfect score, but it only means the instrument has run out of resolution.' },
    { title: 'Decision linkage', body: 'A useful eval informs a release, mitigation, or research decision. Without a decision, there is no reason to run the evaluation.', example: '"Does this model meet the quality bar for the customer-facing pilot?" is a decision. "Is the model good?" is not.' },
  ],
  mentalModelTitle: 'Question → Task → Input → Model → Measurement → Analysis → Decision',
  flowNodes: [
    { label: 'Question', color: '#2563EB', desc: 'What uncertainty blocks a responsible decision?' },
    { label: 'Task', color: '#0F766E', desc: 'The scenario structure that makes the question testable.' },
    { label: 'Input', color: '#6D28D9', desc: 'Prompt, tool access, context, budget.' },
    { label: 'Model', color: '#B45309', desc: 'The system under evaluation.' },
    { label: 'Measurement', color: '#B91C1C', desc: 'Score, label, judgment — with calibration uncertainty.' },
    { label: 'Analysis', color: '#15803D', desc: 'Interpreting evidence, accounting for validity threats.' },
    { label: 'Decision', color: '#0F172A', desc: 'Release, restrict, mitigate, investigate, or stop.' },
  ],
  workedExample: {
    weak: '"The model seems good."',
    weakProblems: ['No task defined', 'No conditions named', 'No measurement described', 'No uncertainty quantified', 'Cannot inform any decision'],
    improved: '"On 120 held-out tasks representing the target workflow, Aster-3 solved 72% with tool access under a $2 budget, with 95% CI reported and failures categorized."',
    improvedStrengths: [['Task set', '120 held-out tasks — defined scope'], ['Access condition', 'tool access — named constraint'], ['Metric', '72% — measurable success rate'], ['Budget', '$2 — operational constraint'], ['Uncertainty', '95% CI — honest bounds'], ['Failure analysis', 'categorized — actionable for improvement']],
  },
  practicePrompt: 'A manager asks whether a new model is "safe enough."',
  practiceTask: 'Rewrite the request as an evaluation question with a decision it supports.',
  practiceFields: [
    { key: 'context', label: 'Deployment context', ph: 'What will the model be used for and by whom?' },
    { key: 'riskClaim', label: 'Risk claim to test', ph: 'What specific behavior are you worried about?' },
    { key: 'evidence', label: 'Evidence needed', ph: 'What measurement would increase or decrease confidence?' },
    { key: 'threshold', label: 'Action threshold', ph: 'What result would change the recommendation?' },
  ],
  quizQuestion: 'Which statement is closest to a real evaluation objective?',
  quizOptions: ['The model is powerful.', 'The model is better than competitors.', 'Measure whether the model can complete the target workflow under defined access conditions and report uncertainty.', 'Ask five employees if the demo felt impressive.'],
  quizCorrect: 2,
  quizExplanation: 'Option C names measurement and conditions; the others are claims or anecdotes.',
  artifactType: 'Evaluation Lifecycle Map',
  artifactFields: [
    { key: 'question', label: 'Question', ph: 'What uncertainty blocks the deployment decision?' },
    { key: 'taskFamily', label: 'Task family', ph: 'What tasks represent the deployment scenario?' },
    { key: 'inputConditions', label: 'Input conditions', ph: 'Prompt format, tool access, context window, budget' },
    { key: 'measurementMethod', label: 'Measurement method', ph: 'How will outputs be scored?' },
    { key: 'analysisPlan', label: 'Analysis plan', ph: 'How will you interpret results and handle uncertainty?' },
    { key: 'decisionSupported', label: 'Decision supported', ph: 'What deployment or governance decision does this inform?' },
  ],
  commonMistake: 'Using demos, anecdotes, or leaderboard screenshots as proof. A demo is a selected example, not a distribution of behavior.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What deployment scenario are you thinking about?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-001', title: 'HELM: Holistic Evaluation of Language Models', org: 'Stanford CRFM', type: 'paper / leaderboard', diff: 'intermediate', required: true, why: 'Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage.', url: 'https://crfm.stanford.edu/helm/latest/' },
    { id: 'S-026', title: 'Model Evaluation for Extreme Risks', org: 'Shevlane et al.', type: 'paper', diff: 'advanced', required: true, why: 'Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance.', url: 'https://arxiv.org/abs/2305.15324' },
    { id: 'S-042', title: 'Speech and Language Processing', org: 'Jurafsky & Martin, Stanford', type: 'free book', diff: 'advanced', required: true, why: 'Foundational NLP textbook for metrics, language modeling, QA, and evaluation background.', url: 'https://web.stanford.edu/~jurafsky/slp3/' },
    { id: 'S-044', title: 'Model Cards for Model Reporting', org: 'Mitchell et al.', type: 'paper', diff: 'intermediate', required: false, why: 'Reporting pattern for model behavior, limitations, intended use, and responsible disclosure.', url: 'https://arxiv.org/abs/1810.03993' },
  ],
  nextLessonId: 'P1.L2',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P1L2: LessonData = {
  lessonId: 'P1.L2', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 2, lessonOf: 6,
  title: 'Model Types and Capability Surfaces',
  subtitle: 'Learn why "LLM evaluation" is not one thing: model type changes the task, metric, and risk surface.',
  duration: '60 min', difficulty: 'beginner',
  objective: 'Distinguish base, instruction-tuned, RLHF, code, multimodal, agentic, and frontier models by evaluation implications.',
  videoTitle: 'Stanford CS229: Building Large Language Models',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=9vM4p9NN0Ts',
  videoDuration: 'External lecture — includes evaluation methods and MMLU segment',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Model families', cue: 'How model training and interface shape evaluation.' },
    { t: '—', title: 'Benchmark fit', cue: 'Why model type changes what scores mean.' },
    { t: '—', title: 'Tool access', cue: 'How scaffolds alter capability.' },
  ],
  transcriptSummary: 'This lecture covers how base, instruction-tuned, RLHF, code, multimodal, agentic, and frontier models differ in evaluation implications. The key insight: the same benchmark result means different things depending on model type and access conditions.',
  keyIdeas: [
    { title: 'Base vs assistant', body: 'Base models complete distributions; assistants respond to instructions. Evaluating a base model with instruction-tuned rubrics produces misleading results.', example: 'Evaluating a base model on MMLU using instruction-following rubrics will systematically underestimate its knowledge.' },
    { title: 'Tools change capability', body: 'Tool access can turn a weak single-turn answerer into a stronger agentic system — and change the risk surface entirely.', example: 'A model that scores modestly on QA can score dramatically higher on SWE-bench when given a code executor.' },
    { title: 'Frontier adds risk domains', body: 'Frontier models require dangerous capability and governance-oriented evaluations that base/instruction-tuned evaluations do not cover.', example: 'Uplift, persuasion, and autonomous replication evaluations only apply once capability and deployment scope reach frontier scale.' },
  ],
  mentalModelTitle: 'Model type → Capability surface → Evaluation family → Risk domains',
  flowNodes: [
    { label: 'Base model', color: '#64748B', desc: 'Completion tasks, perplexity, knowledge' },
    { label: 'Instruction-tuned', color: '#2563EB', desc: 'Instruction following, safety alignment' },
    { label: 'Code model', color: '#0F766E', desc: 'Execution-based, SWE-bench family' },
    { label: 'Multimodal', color: '#6D28D9', desc: 'Vision-language, GUI grounding' },
    { label: 'Agentic', color: '#B45309', desc: 'Tool use, trajectory, state safety' },
    { label: 'Frontier', color: '#B91C1C', desc: 'Dangerous capabilities, governance gates' },
  ],
  workedExample: {
    weak: '"Evaluate all models with MMLU."',
    weakProblems: ['MMLU tests static knowledge, not tool use', 'Cannot distinguish agent behavior', 'Misses safety and dangerous capability domains', 'Pretends one metric covers all deployment modes'],
    improved: '"Use MMLU for broad knowledge, HumanEval or SWE-bench for code, OSWorld/WebArena for agents, and safety/domain evals for frontier risk."',
    improvedStrengths: [['Knowledge', 'MMLU — broad academic knowledge'], ['Code', 'SWE-bench — execution-based software skills'], ['Agents', 'OSWorld/WebArena — environment and tool use'], ['Frontier risk', 'Dangerous capability evals — governance domains']],
  },
  practicePrompt: 'A multimodal agent can read screenshots and use tools.',
  practiceTask: 'Choose three evaluation families and explain why each applies.',
  practiceFields: [
    { key: 'family1', label: 'Evaluation family 1', ph: 'e.g. Visual perception tasks (OSWorld)' },
    { key: 'family2', label: 'Evaluation family 2', ph: 'e.g. Tool trajectory scoring' },
    { key: 'family3', label: 'Evaluation family 3', ph: 'e.g. Task completion on desktop/web' },
    { key: 'justification', label: 'Why these three', ph: 'Connect each family to the model capabilities that create real risk' },
  ],
  quizQuestion: 'Why is agent evaluation harder than base-model evaluation?',
  quizOptions: ['Agents are always smaller.', 'Agents require no prompts.', 'Agents create multi-step trajectories with tools, state, and environment feedback.', 'Agents cannot be evaluated.'],
  quizCorrect: 2,
  quizExplanation: 'Agent behavior is path-dependent and environment-dependent, so outcome-only metrics miss many failures.',
  artifactType: 'Model Capability Surface Map',
  artifactFields: [
    { key: 'modelType', label: 'Model type', ph: 'e.g. Instruction-tuned multimodal agentic' },
    { key: 'capabilitySurface', label: 'Capability surface', ph: 'What can this model do that matters for evaluation?' },
    { key: 'primaryMetric', label: 'Primary metric', ph: 'Best-fit evaluation metric for this model type' },
    { key: 'trajectorySignals', label: 'Trajectory signals', ph: 'What intermediate signals matter beyond final answer?' },
    { key: 'safetyConcerns', label: 'Safety concerns', ph: 'What risk domains are relevant to this model type?' },
    { key: 'benchmarkFamilies', label: 'Recommended benchmark families', ph: 'Which evaluation families fit this model and deployment?' },
  ],
  commonMistake: 'Running one benchmark and assuming it applies to every model architecture or deployment mode.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What model type are you evaluating, and what deployment are you preparing for?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-012', title: 'MMLU', org: 'Hendrycks et al.', type: 'benchmark / paper', diff: 'intermediate', required: true, why: 'Canonical multitask academic knowledge benchmark and a useful saturation case study.', url: 'https://arxiv.org/abs/2009.03300' },
    { id: 'S-015', title: 'SWE-bench Verified', org: 'SWE-bench', type: 'benchmark / docs', diff: 'advanced', required: true, why: 'Execution-based benchmark for real-world software issue resolution by coding agents.', url: 'https://www.swebench.com/' },
    { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
    { id: 'S-018', title: 'GAIA', org: 'Meta / Hugging Face / academic contributors', type: 'benchmark / dataset', diff: 'advanced', required: false, why: 'General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion.', url: 'https://huggingface.co/datasets/gaia-benchmark/GAIA' },
  ],
  nextLessonId: 'P1.L3',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P1L3: LessonData = {
  lessonId: 'P1.L3', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 3, lessonOf: 6,
  title: 'Benchmark, Dataset, Task, Metric, Prompt',
  subtitle: 'Build the vocabulary needed to read papers, leaderboards, and evaluation reports without being misled.',
  duration: '60 min', difficulty: 'beginner',
  objective: 'Use core evaluation vocabulary precisely and identify how each term affects validity.',
  videoTitle: 'Stanford CS224U: Evaluation Metrics',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=YygGzfkhtJc',
  videoDuration: 'External lecture — use metrics sections',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Metrics vocabulary', cue: 'How metrics reflect specific assumptions.' },
    { t: '—', title: 'Protocol details', cue: 'Why prompt and aggregation matter.' },
    { t: '—', title: 'Common traps', cue: 'Why benchmark names hide complexity.' },
  ],
  transcriptSummary: 'This lecture covers how to decompose a benchmark into its protocol components: dataset, task, metric, prompt format, sampling, and aggregation. Key insight: a benchmark score is the output of a protocol, not an isolated fact. Two "MMLU" scores may not be comparable if prompt format differs.',
  keyIdeas: [
    { title: 'Benchmark = protocol', body: 'Dataset + task + metric + prompt + aggregation. You cannot interpret a benchmark score without knowing all five.', example: 'Comparing two MMLU scores is only valid if both used the same prompt format, task framing, and aggregation method.' },
    { title: 'Prompt format matters', body: 'Zero-shot, few-shot, and chain-of-thought can change results by 10–30 points on the same model and dataset.', example: 'A model may fail at zero-shot direct-answer MMLU but succeed with four-shot chain-of-thought — the capability claim differs.' },
    { title: 'Contamination is a spectrum', body: 'Exact test leakage, near-duplicate exposure, and related-content exposure are different threats with different severities and mitigations.', example: 'Near-duplicate contamination is harder to detect but can inflate scores by memorizing paraphrase patterns.' },
  ],
  mentalModelTitle: 'Benchmark = Dataset + Task + Prompt + Model + Scorer + Aggregation + Report',
  flowNodes: [
    { label: 'Dataset', color: '#2563EB', desc: 'Items, labels, splits, provenance' },
    { label: 'Task', color: '#0F766E', desc: 'What the model must do' },
    { label: 'Prompt', color: '#6D28D9', desc: 'Format, few-shot, chain-of-thought' },
    { label: 'Model', color: '#B45309', desc: 'Under evaluation with version and config' },
    { label: 'Scorer', color: '#B91C1C', desc: 'Rule-based, LLM-judge, human' },
    { label: 'Aggregation', color: '#15803D', desc: 'Macro/micro, weighting, CIs' },
  ],
  workedExample: {
    weak: '"Model A got 85 on the benchmark, so it is better."',
    weakProblems: ['Missing prompt format', 'Missing model version', 'Missing date', 'Missing sampling/CI info', 'Missing contamination controls'],
    improved: '"Model A scored 85 under zero-shot direct-answer settings; compare only with models using the same setup and contamination controls."',
    improvedStrengths: [['Prompt format', 'zero-shot direct-answer — protocol specified'], ['Comparability rule', 'same setup only — prevents invalid comparisons'], ['Contamination', 'explicit caveat — honesty about limitations']],
  },
  practicePrompt: 'A blog reports a new state-of-the-art score with no prompt details.',
  practiceTask: 'List the missing fields needed to interpret the claim.',
  practiceFields: [
    { key: 'missing1', label: 'Missing field 1', ph: 'e.g. Prompt format (zero-shot / few-shot / CoT)' },
    { key: 'missing2', label: 'Missing field 2', ph: 'e.g. Model version and date' },
    { key: 'missing3', label: 'Missing field 3', ph: 'e.g. Dataset split and contamination check' },
    { key: 'missing4', label: 'Missing field 4', ph: 'e.g. Scorer configuration and confidence interval' },
  ],
  quizQuestion: 'Which item is not usually part of a benchmark protocol?',
  quizOptions: ['Dataset', 'Task format', 'Metric', 'Company valuation'],
  quizCorrect: 3,
  quizExplanation: 'Valuation may matter to business analysis but is not part of the benchmark protocol.',
  artifactType: 'Evaluation Vocabulary Card',
  artifactFields: [
    { key: 'dataset', label: 'Dataset', ph: 'Name, size, splits, provenance' },
    { key: 'task', label: 'Task', ph: 'What must the model do?' },
    { key: 'metric', label: 'Metric', ph: 'How is performance measured?' },
    { key: 'promptFormat', label: 'Prompt format', ph: 'Zero-shot, few-shot, CoT, direct answer?' },
    { key: 'samplingSettings', label: 'Sampling settings', ph: 'Temperature, top-p, number of runs' },
    { key: 'aggregation', label: 'Aggregation', ph: 'Macro/micro, weighting, confidence interval' },
    { key: 'validityThreats', label: 'Known validity threats', ph: 'Contamination, saturation, prompt sensitivity' },
  ],
  commonMistake: 'Using benchmark names as if they were single facts — "MMLU" hides at least five protocol decisions.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What benchmark claim are you trying to interpret or challenge?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-001', title: 'HELM: Holistic Evaluation of Language Models', org: 'Stanford CRFM', type: 'paper / leaderboard', diff: 'intermediate', required: true, why: 'Introduces holistic evaluation across scenarios and metrics.', url: 'https://crfm.stanford.edu/helm/latest/' },
    { id: 'S-002', title: 'LM Evaluation Harness', org: 'EleutherAI', type: 'tool / paper', diff: 'intermediate', required: true, why: 'Open-source framework for repeatable language model benchmark evaluation.', url: 'https://github.com/EleutherAI/lm-evaluation-harness' },
    { id: 'S-012', title: 'MMLU', org: 'Hendrycks et al.', type: 'benchmark / paper', diff: 'intermediate', required: true, why: 'Canonical multitask academic knowledge benchmark and a useful saturation case study.', url: 'https://arxiv.org/abs/2009.03300' },
    { id: 'S-043', title: 'Datasheets for Datasets', org: 'Gebru et al.', type: 'paper', diff: 'intermediate', required: false, why: 'Dataset documentation framework that supports accountability and validity.', url: 'https://arxiv.org/abs/1803.09010' },
  ],
  nextLessonId: 'P1.L4',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P1L4: LessonData = {
  lessonId: 'P1.L4', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 4, lessonOf: 6,
  title: 'Outcome Metrics vs Trajectory Metrics',
  subtitle: 'Learn to evaluate not only what the model answered, but how it got there.',
  duration: '45 min', difficulty: 'intermediate',
  objective: 'Explain when final-answer scores are insufficient and trajectory metrics are needed.',
  videoTitle: 'How METR measures long tasks and experienced open-ended tasks',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=k1t2xyWMUdY',
  videoDuration: 'External talk — confirm timestamp after embedding',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Task completion', cue: 'Outcome measurement.' },
    { t: '—', title: 'Reliability over time', cue: 'Why long tasks need trajectory awareness.' },
    { t: '—', title: 'Capability trend interpretation', cue: 'How time horizon connects to risk.' },
  ],
  transcriptSummary: 'METR\'s framing shows why outcome-only metrics fail for long tasks. The key insight: a coding agent can return a correct answer while making unauthorized tool calls along the way. Trajectory metrics score the path — intermediate reasoning, tool calls, state changes, and constraint handling.',
  keyIdeas: [
    { title: 'Outcome metrics', body: 'Score the final answer or task completion. Necessary but not sufficient for agents.', example: 'Did the model return the correct output? Pass/fail on unit tests.' },
    { title: 'Trajectory metrics', body: 'Score intermediate reasoning, tool calls, state changes, and constraint handling. Essential for multi-step and agentic evaluations.', example: 'Did the agent make only authorized tool calls? Did it handle errors without going off-track?' },
    { title: 'Hybrid evidence', body: 'Serious agent evaluations need both. Outcome pass + trajectory safety fail = the task succeeded unsafely.', example: '"The browser agent retrieved the right company summary but leaked private content into a tool call — outcome passed, trajectory safety failed."' },
  ],
  mentalModelTitle: 'Agent behavior → Outcome track (final answer) + Trajectory track (steps, tools, state, safety)',
  flowNodes: [
    { label: 'Goal', color: '#2563EB', desc: 'What the agent is asked to do' },
    { label: 'Outcome', color: '#15803D', desc: 'Final result — pass/fail, quality score' },
    { label: 'Trajectory', color: '#B91C1C', desc: 'Tool calls, state changes, constraint compliance' },
    { label: 'Joint evaluation', color: '#6D28D9', desc: 'Both signals required for release decisions' },
  ],
  workedExample: {
    weak: '"The agent completed the task, so it passed."',
    weakProblems: ['Ignores tool calls made during execution', 'Ignores state changes (files deleted, messages sent)', 'Ignores constraint violations', 'Cannot detect unauthorized actions'],
    improved: '"The agent completed the task but made two unauthorized tool calls, so outcome passed and trajectory safety failed."',
    improvedStrengths: [['Outcome', 'task completed — honest result'], ['Trajectory safety', 'unauthorized calls — separate signal'], ['Decision clarity', 'not a pass — combined evidence required']],
  },
  practicePrompt: 'A coding agent fixes a bug but modifies unrelated files.',
  practiceTask: 'Classify what is outcome evidence and what is trajectory evidence.',
  practiceFields: [
    { key: 'outcomeEvidence', label: 'Outcome evidence', ph: 'e.g. Unit tests pass, bug resolved' },
    { key: 'trajectoryEvidence', label: 'Trajectory evidence', ph: 'e.g. Unrelated file edits, tool sequence anomalies' },
    { key: 'decision', label: 'Decision implication', ph: 'Does this combination support release or require further review?' },
  ],
  quizQuestion: 'When are trajectory metrics most important?',
  quizOptions: ['Single static multiple-choice tasks.', 'Agent tasks with tools, memory, and environment feedback.', 'Counting words in a generated summary.', 'Manual reading with no tool use.'],
  quizCorrect: 1,
  quizExplanation: 'Tools and state create process-level risks that final-answer metrics can miss.',
  artifactType: 'Outcome-vs-Trajectory Rubric',
  artifactFields: [
    { key: 'outcomeMetric', label: 'Outcome metric', ph: 'How is final result measured?' },
    { key: 'trajectoryMetric', label: 'Trajectory metric', ph: 'What path-level signals matter?' },
    { key: 'failureExamples', label: 'Failure examples', ph: 'Cases where outcome passes but trajectory fails' },
    { key: 'riskRelevance', label: 'Risk relevance', ph: 'Why does trajectory matter for this deployment?' },
    { key: 'decisionImplication', label: 'Decision implication', ph: 'When does a trajectory failure block release?' },
  ],
  commonMistake: 'Scoring only the final answer when the path reveals risk or unreliability.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What agent task are you trying to evaluate safely?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-015', title: 'SWE-bench Verified', org: 'SWE-bench', type: 'benchmark / docs', diff: 'advanced', required: true, why: 'Execution-based benchmark for real-world software issue resolution by coding agents.', url: 'https://www.swebench.com/' },
    { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
    { id: 'S-018', title: 'GAIA', org: 'Meta / Hugging Face / academic contributors', type: 'benchmark / dataset', diff: 'advanced', required: true, why: 'General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion.', url: 'https://huggingface.co/datasets/gaia-benchmark/GAIA' },
    { id: 'S-019', title: 'METR: Measuring AI Ability to Complete Long Tasks', org: 'METR', type: 'paper / report', diff: 'advanced', required: false, why: 'Introduces time-horizon framing for autonomous task completion capability.', url: 'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/' },
  ],
  nextLessonId: 'P1.L5',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P1L5: LessonData = {
  lessonId: 'P1.L5', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 5, lessonOf: 6,
  title: 'Benchmarks, Saturation, and Goodhart\'s Law',
  subtitle: 'Learn to read leaderboards skeptically without becoming cynical.',
  duration: '75 min', difficulty: 'intermediate',
  objective: 'Identify benchmark saturation, Goodhart effects, contamination, and proxy mistakes in frontier evaluation claims.',
  videoTitle: 'Holistic Evaluation of Language Models (HELM) — Yifan Mai, Stanford University',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=fLoYcXLG6ro',
  videoDuration: 'External video — confirm timestamp after embedding',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Benchmark coverage', cue: 'Why broad coverage is not enough.' },
    { t: '—', title: 'Transparency', cue: 'How source and protocol visibility build trust.' },
    { t: '—', title: 'Limitations', cue: 'Why leaderboards need caveats.' },
  ],
  transcriptSummary: 'This lecture covers why benchmark scores can become misleading as models optimize for them. Goodhart\'s Law: when a measure becomes a target, it ceases to be a good measure. Anti-Goodhart design uses private sets, diverse metrics, dynamic tasks, and adversarial construction.',
  keyIdeas: [
    { title: 'Goodhart\'s Law', body: 'A measure loses validity when it becomes the target. Training on benchmark-adjacent data, prompt-optimizing for leaderboards, and selecting checkpoints by test score all erode validity.', example: '"State of the art on 12 benchmarks" may mean the team spent months on benchmark-specific tuning, not genuine capability improvement.' },
    { title: 'Saturation', body: 'A benchmark near ceiling stops separating frontier systems. When every top model scores 85–92%, the benchmark no longer measures what matters.', example: 'MMLU is now saturated — differences between top models fall within noise. New harder benchmarks like GPQA and HLE were created in response.' },
    { title: 'Anti-Goodhart design', body: 'Use private sets, diverse metrics, dynamic tasks, and adversarial construction. The less the model can anticipate the benchmark format, the more valid the measure.', example: 'Keeping a private held-out set that is never released prevents direct optimization pressure.' },
  ],
  mentalModelTitle: 'Measure → Target → Optimization pressure → Proxy breakage → New benchmark',
  flowNodes: [
    { label: 'Good measure', color: '#15803D', desc: 'Tracks real capability' },
    { label: 'Becomes target', color: '#B45309', desc: 'Training and tuning pressure' },
    { label: 'Proxy breaks', color: '#B91C1C', desc: 'Score no longer tracks capability' },
    { label: 'Saturation', color: '#64748B', desc: 'No ceiling resolution remains' },
    { label: 'New benchmark', color: '#2563EB', desc: 'Harder tasks, private sets, dynamic design' },
  ],
  workedExample: {
    weak: '"State of the art on 12 benchmarks proves broad intelligence."',
    weakProblems: ['Saturated benchmarks contribute noise, not signal', 'Benchmark selection bias — pick benchmarks where you win', 'No contamination analysis', 'No private held-out set'],
    improved: '"Strong benchmark performance is evidence, but we need private hard cases, robustness checks, contamination analysis, and task validity review."',
    improvedStrengths: [['Evidence framing', 'benchmark scores as evidence with limits'], ['Private hard cases', 'tests not seen during training'], ['Robustness checks', 'paraphrase, distribution shift'], ['Contamination analysis', 'explicit accountability']],
  },
  practicePrompt: 'A startup claims "human-level reasoning" based on a saturated benchmark.',
  practiceTask: 'Write three due-diligence questions that attack validity, not the team.',
  practiceFields: [
    { key: 'q1', label: 'Due-diligence question 1', ph: 'e.g. Is the benchmark near ceiling for frontier models?' },
    { key: 'q2', label: 'Due-diligence question 2', ph: 'e.g. What contamination controls were applied?' },
    { key: 'q3', label: 'Due-diligence question 3', ph: 'e.g. Was there a private held-out evaluation?' },
  ],
  quizQuestion: 'Which design choice best resists Goodharting?',
  quizOptions: ['Publishing all test answers.', 'Using one public metric for funding decisions.', 'Keeping a private held-out set and rotating hard cases.', 'Removing baselines.'],
  quizCorrect: 2,
  quizExplanation: 'Private held-out and dynamic hard cases reduce direct optimization pressure.',
  artifactType: 'Goodhart Risk Checklist',
  artifactFields: [
    { key: 'benchmarkClaim', label: 'Benchmark claim', ph: 'The score or ranking being scrutinized' },
    { key: 'saturationRisk', label: 'Saturation risk', ph: 'Is the benchmark near ceiling? What is the noise floor?' },
    { key: 'contaminationRisk', label: 'Contamination risk', ph: 'What contamination controls were applied?' },
    { key: 'promptCaveat', label: 'Prompt/elicitation caveat', ph: 'Could prompt optimization explain part of the gain?' },
    { key: 'externalValidity', label: 'External validity caveat', ph: 'Does benchmark performance transfer to deployment?' },
    { key: 'robustnessCheck', label: 'Suggested robustness check', ph: 'What private or adversarial test would strengthen the claim?' },
  ],
  commonMistake: 'Treating benchmark progress as identical to real-world capability progress.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What benchmark claim are you currently evaluating for validity?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-010', title: 'Humanity\'s Last Exam', org: 'Center for AI Safety / Scale AI', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Example of a frontier knowledge benchmark created in response to benchmark saturation.', url: 'https://arxiv.org/abs/2501.14249' },
    { id: 'S-011', title: 'Chatbot Arena / LM Arena', org: 'LMSYS / LM Arena', type: 'leaderboard', diff: 'beginner', required: true, why: 'Crowdsourced preference comparison system useful for understanding public model rankings.', url: 'https://arena.ai/' },
    { id: 'S-012', title: 'MMLU', org: 'Hendrycks et al.', type: 'benchmark / paper', diff: 'intermediate', required: true, why: 'Canonical multitask academic knowledge benchmark and a useful saturation case study.', url: 'https://arxiv.org/abs/2009.03300' },
    { id: 'S-013', title: 'GPQA', org: 'Rein et al.', type: 'benchmark / paper', diff: 'advanced', required: false, why: 'Graduate-level scientific QA benchmark that helps motivate expert-domain evaluation.', url: 'https://arxiv.org/abs/2311.12022' },
    { id: 'S-001', title: 'HELM: Holistic Evaluation of Language Models', org: 'Stanford CRFM', type: 'paper / leaderboard', diff: 'intermediate', required: false, why: 'Introduces holistic evaluation across scenarios and metrics.', url: 'https://crfm.stanford.edu/helm/latest/' },
  ],
  nextLessonId: 'P1.L6',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P1L6: LessonData = {
  lessonId: 'P1.L6', phaseId: 'P1', phaseTitle: 'The Paradigm', lessonNum: 6, lessonOf: 6,
  title: 'From Vague Risk to Evaluation Objective',
  subtitle: 'Turn vague risk worries into testable objectives that can drive benchmark design, evidence, and deployment decisions.',
  duration: '75 min', difficulty: 'intermediate',
  objective: 'Convert a vague AI safety concern into a measurable evaluation objective.',
  videoTitle: 'AI Safety, Ethics, & Society playlist',
  videoProvider: 'YouTube playlist',
  videoUrl: 'https://www.youtube.com/playlist?list=PLXSn3Zz2ayT7ab7I12PBYVt0244369S1q',
  videoDuration: 'External playlist',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Risk framing', cue: 'Why vague risks fail.' },
    { t: '—', title: 'Objective structure', cue: 'Actor / capability / access / task / evidence.' },
    { t: '—', title: 'Governance decision', cue: 'How the objective feeds release gates.' },
  ],
  transcriptSummary: 'This lesson covers the most important translation skill in frontier evaluation: converting a vague safety concern into a precise, measurable objective. The chain is: Threat Model → Capability Hypothesis → Evaluation Objective → Task Design → Evidence → Decision. Starting with a benchmark before a threat model produces data that looks like evidence but cannot support governance.',
  keyIdeas: [
    { title: 'Threat model first', body: 'A benchmark answers a threat-model question. Starting with a benchmark before defining the threat model produces data that cannot support governance.', example: '"Which benchmark should we run?" is the wrong first question. "What risk claim are we testing?" is the right one.' },
    { title: 'Capability hypothesis', body: 'Name the specific capability you think the model may have that would enable the threat pathway.', example: '"This model can provide synthesis-level guidance to a non-expert in a relevant domain." That is a falsifiable hypothesis.' },
    { title: 'Evidence path', body: 'Define what evidence would increase or decrease confidence in the capability hypothesis before running any tests.', example: '"If expert-graded outputs exceed open literature baseline on three independent trials, we consider the capability hypothesis supported."' },
  ],
  mentalModelTitle: 'Threat Model → Capability Hypothesis → Evaluation Objective → Task Design → Evidence → Decision',
  flowNodes: [
    { label: 'Threat Model', color: '#B91C1C', desc: 'Who, capability, pathway, access, harm' },
    { label: 'Capability Hypothesis', color: '#B45309', desc: 'What the model can do that enables the threat' },
    { label: 'Evaluation Objective', color: '#2563EB', desc: 'Precise, measurable, named actor and conditions' },
    { label: 'Task Design', color: '#0F766E', desc: 'Tasks that test the capability hypothesis' },
    { label: 'Evidence', color: '#6D28D9', desc: 'Observations at pre-committed standard' },
    { label: 'Decision', color: '#15803D', desc: 'Deploy, delay, control, or escalate' },
  ],
  workedExample: {
    weak: '"Test whether the model is dangerous."',
    weakProblems: ['Not measurable — "dangerous" is a judgment, not a measurement', 'Names no actor — who is using the model and how?', 'Names no task — what capability are we actually testing?', 'No threshold — what evidence would be sufficient?', 'Cannot produce defensible evidence for governance'],
    improved: '"Evaluate whether the model, when given browser and terminal access in a controlled sandbox, can meaningfully improve a novice user\'s ability to complete multi-step cyber reconnaissance tasks."',
    improvedStrengths: [['Access condition', 'browser and terminal access — what the actor controls'], ['Actor', 'novice user — the threat actor profile'], ['Capability', 'meaningfully improve — uplift framing with a baseline'], ['Task family', 'multi-step cyber reconnaissance tasks'], ['Environment', 'controlled sandbox — safe test framing'], ['Measurable', 'completion rate vs. baseline, expert-rated on rubric']],
  },
  practicePrompt: '"This model might help with biological misuse."',
  practiceTask: 'Convert this vague concern into a precise evaluation objective. Use de-risked, fictional framing throughout — no operational content.',
  practiceFields: [
    { key: 'actor', label: 'Actor', ph: 'Who is using the model? (e.g., motivated non-expert with API access)' },
    { key: 'capability', label: 'Capability', ph: 'What can the model do that matters here? (abstracted)' },
    { key: 'pathway', label: 'Harm pathway', ph: 'How does this capability translate to harm? (fictional framing)' },
    { key: 'access', label: 'Model access level', ph: 'What access does the actor have? (e.g., API without system prompt)' },
    { key: 'environment', label: 'Task environment', ph: 'Under what conditions? (de-risked, fictional, sandboxed)' },
    { key: 'success', label: 'Success condition', ph: 'What observable output demonstrates the capability?' },
    { key: 'evidence', label: 'Evidence needed', ph: 'What constitutes strong evidence? (sample size, grading, confidence)' },
    { key: 'disclosure', label: 'Disclosure sensitivity', ph: 'How should findings be handled?' },
  ],
  quizQuestion: 'What is missing from "test bio risk"?',
  quizOptions: ['A clear actor, capability, access condition, task environment, and decision.', 'A bigger font.', 'A leaderboard link.', 'A generic safety badge.'],
  quizCorrect: 0,
  quizExplanation: 'An evaluation objective needs structure before tasks can be designed safely.',
  artifactType: 'Evaluation Objective Card',
  artifactFields: [
    { key: 'riskConcern', label: 'Risk concern', ph: 'State the original vague concern in plain language' },
    { key: 'threatActor', label: 'Threat actor', ph: 'Who could cause harm, with what access level?' },
    { key: 'capabilityHypothesis', label: 'Capability hypothesis', ph: 'What specific capability, if present, would enable the threat?' },
    { key: 'accessCondition', label: 'Access condition', ph: 'What model access does the actor have?' },
    { key: 'taskEnvironment', label: 'Task environment', ph: 'Under what conditions is the test run?' },
    { key: 'successCondition', label: 'Success condition', ph: 'What observable output demonstrates the capability?' },
    { key: 'evidenceNeeded', label: 'Evidence needed', ph: 'What evidence would confirm or disconfirm the hypothesis?' },
    { key: 'decisionInformed', label: 'Decision informed', ph: 'What deployment or governance decision does this support?' },
    { key: 'confidenceLevel', label: 'Confidence level', ph: 'Low / Medium / High — and the primary reason' },
  ],
  commonMistake: 'Starting with a benchmark before articulating the risk claim and the decision it needs to inform.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What vague concern are you trying to turn into a testable objective?",
  coachPrompts: ['Explain the difference between risk concern and evaluation objective', 'Show me a diagram of the threat model flow', 'Help me make my objective measurable', 'What would count as weak evidence?', 'How does this connect to the capstone?'],
  sources: [
    { id: 'S-026', title: 'Model Evaluation for Extreme Risks', org: 'Shevlane et al.', type: 'paper', diff: 'advanced', required: true, why: 'Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance.', url: 'https://arxiv.org/abs/2305.15324' },
    { id: 'S-027', title: 'Evaluating Frontier Models for Dangerous Capabilities', org: 'Google DeepMind', type: 'paper', diff: 'advanced', required: true, why: 'Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk.', url: 'https://arxiv.org/abs/2403.13793' },
    { id: 'S-032', title: 'Anthropic Responsible Scaling Policy', org: 'Anthropic', type: 'policy framework', diff: 'advanced', required: true, why: 'Public frontier safety policy useful for capability thresholds and governance gates.', url: 'https://www.anthropic.com/responsible-scaling-policy' },
    { id: 'S-033', title: 'OpenAI Preparedness Framework', org: 'OpenAI', type: 'policy framework', diff: 'advanced', required: false, why: 'OpenAI framework for tracking frontier capabilities that could create severe harm.', url: 'https://openai.com/index/updating-our-preparedness-framework/' },
    { id: 'S-034', title: 'Google DeepMind Frontier Safety Framework', org: 'Google DeepMind', type: 'policy framework', diff: 'advanced', required: false, why: 'Framework for severe-risk domains, critical capability levels, and mitigations.', url: 'https://deepmind.google/blog/strengthening-our-frontier-safety-framework/' },
  ],
  nextLessonId: 'P2.L1',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

// ─── Phase 2 ─────────────────────────────────────────────────────────────────

const P2L1: LessonData = {
  lessonId: 'P2.L1', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 1, lessonOf: 6,
  title: 'Evaluation Harness Anatomy',
  subtitle: 'See the harness as the instrument that turns tasks into auditable evidence.',
  duration: '60 min', difficulty: 'intermediate',
  objective: 'Describe the components of a working evaluation harness and how each can fail.',
  videoTitle: 'Course-original screencast: Build an Inspect evaluation task',
  videoProvider: 'Course production',
  videoUrl: null,
  videoDuration: '10–15 min planned recording',
  videoStatus: 'pending',
  chapters: [
    { t: '0:00', title: 'Dataset, solver, scorer', cue: 'Inspect task anatomy.' },
    { t: '—', title: 'Logging', cue: 'What must be saved.' },
    { t: '—', title: 'Evidence', cue: 'From score to report.' },
  ],
  transcriptSummary: 'A harness is not just a script that loops over prompts. It is a layered instrument: dataset → runner → model adapter → solver/scaffold → scorer → evidence log → report. Validity can break at any layer. The key discipline: reproducibility requires versioning every component.',
  keyIdeas: [
    { title: 'Harness components', body: 'Dataset, model adapter, solver, scorer, logger, reporter. Every component introduces potential measurement error.', example: 'A harness missing a scorer version will produce scores that cannot be reproduced — someone changing the judge model silently changes all results.' },
    { title: 'Reproducibility metadata', body: 'Model version, prompt, seed, tool access, and scorer settings must all be recorded. Missing any one makes replication impossible.', example: '"We ran the same harness six months later and got different results" — a seed or scorer version was not pinned.' },
    { title: 'Failure surfaces', body: 'Each component can introduce measurement error: dataset leakage, adapter prompt injection, scorer bias, logger truncation.', example: 'A logger that truncates long outputs will systematically undercount long-answer quality.' },
  ],
  mentalModelTitle: 'Dataset → Runner → Model adapter → Solver/scaffold → Scorer → Evidence log → Report',
  flowNodes: [
    { label: 'Dataset', color: '#2563EB', desc: 'Items, labels, provenance' },
    { label: 'Runner', color: '#0F766E', desc: 'Execution framework' },
    { label: 'Model adapter', color: '#6D28D9', desc: 'API config, version, auth' },
    { label: 'Solver', color: '#B45309', desc: 'Prompt template, scaffold, tools' },
    { label: 'Scorer', color: '#B91C1C', desc: 'Rubric, judge, rule-based' },
    { label: 'Evidence log', color: '#15803D', desc: 'Raw outputs, scores, metadata' },
    { label: 'Report', color: '#64748B', desc: 'Summary, evidence cards, CI' },
  ],
  workedExample: {
    weak: '"We ran the prompts manually and wrote down scores."',
    weakProblems: ['No versioning', 'No reproducibility', 'No raw outputs', 'No scorer calibration', 'Cannot be audited'],
    improved: '"We ran a versioned dataset through a logged model adapter with fixed settings, stored raw outputs, scorer configs, and evidence cards."',
    improvedStrengths: [['Versioned', 'reproducible by anyone with the config'], ['Logged', 'raw outputs available for review'], ['Scorer config', 'pinned — results are comparable']],
  },
  practicePrompt: 'Given a harness output with missing fields, identify what blocks reproducibility.',
  practiceTask: 'Mark missing model version, prompt template, scorer version, seed, and raw outputs.',
  practiceFields: [
    { key: 'missing', label: 'Missing reproducibility fields', ph: 'List each field and explain why it matters' },
    { key: 'impact', label: 'Impact of missing fields', ph: 'What would an auditor be unable to verify?' },
    { key: 'fix', label: 'Fix recommendation', ph: 'What must be added to the harness config?' },
  ],
  quizQuestion: 'Which component turns raw outputs into scores?',
  quizOptions: ['Dataset', 'Scorer', 'Theme toggle', 'Marketing page'],
  quizCorrect: 1,
  quizExplanation: 'The scorer maps model outputs to labels, scores, or judgments.',
  artifactType: 'Harness Stack Map',
  artifactFields: [
    { key: 'datasetPath', label: 'Dataset path', ph: 'Path to JSONL dataset with schema reference' },
    { key: 'runner', label: 'Runner', ph: 'Inspect AI / promptfoo / DeepEval / custom' },
    { key: 'modelAdapter', label: 'Model adapter', ph: 'Model ID, version, API key reference (not value)' },
    { key: 'solver', label: 'Solver/scaffold', ph: 'Prompt template path and tool config' },
    { key: 'scorer', label: 'Scorer', ph: 'Rule-based / LLM-judge with version pinned' },
    { key: 'logger', label: 'Logger', ph: 'Output schema and storage path' },
    { key: 'reportOutput', label: 'Report output', ph: 'Evidence card format and export path' },
  ],
  commonMistake: 'Thinking a harness is only a script that loops over prompts.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What component of your harness are you trying to validate?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks.', url: 'https://inspect.aisi.org.uk/' },
    { id: 'S-002', title: 'LM Evaluation Harness', org: 'EleutherAI', type: 'tool / paper', diff: 'intermediate', required: true, why: 'Open-source framework for repeatable language model benchmark evaluation.', url: 'https://github.com/EleutherAI/lm-evaluation-harness' },
    { id: 'S-003', title: 'Lessons from the Trenches on Reproducible Evaluation of Language Models', org: 'EleutherAI et al.', type: 'paper', diff: 'advanced', required: true, why: 'Practical lessons on reproducibility pitfalls in language model evaluation.', url: 'https://arxiv.org/abs/2405.14782' },
    { id: 'S-040', title: 'Pytest documentation', org: 'Pytest', type: 'tool documentation', diff: 'beginner-intermediate', required: false, why: 'Validation scripts and unit-style tests for course labs.', url: 'https://docs.pytest.org/' },
  ],
  nextLessonId: 'P2.L2',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P2L2: LessonData = {
  lessonId: 'P2.L2', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 2, lessonOf: 6,
  title: 'Golden Datasets and Edge-Case Sampling',
  subtitle: 'Build small but trusted datasets that represent the claim under test.',
  duration: '75 min', difficulty: 'intermediate',
  objective: 'Design a curated golden dataset with labels, rationales, edge cases, and documentation.',
  videoTitle: 'New course with CircleCI: Automated Testing for LLMOps',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=Ep7uaxwN-mQ',
  videoDuration: 'External course announcement — pair with course page',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Why systematic tests matter', cue: 'LLM applications are less predictable than traditional software.' },
    { t: '—', title: 'Rule-based and model-graded evals', cue: 'Different scoring patterns.' },
    { t: '—', title: 'CI connection', cue: 'Datasets become regression gates.' },
  ],
  transcriptSummary: '"Golden" means trusted, curated, and documented — not necessarily large. A 50-item dataset reviewed by domain experts beats 1,000 random prompts from Slack. Edge cases reveal failure modes hidden by average cases. Dataset cards explain provenance, exclusions, and limitations.',
  keyIdeas: [
    { title: 'Golden means trusted', body: 'Golden data is curated, documented, and reviewed; not necessarily large. Trust comes from process, not from scale.', example: '"Here are 80 items sampled by task family, risk tag, user type, and failure mode, with labels and rationales" > "Here are 1,000 random prompts."' },
    { title: 'Edge cases matter', body: 'Hard cases reveal failure modes hidden by average cases. A dataset without edge cases gives inflated average performance metrics.', example: 'A safety classifier that looks 95% accurate may fail on adversarial edge cases — and those are exactly the cases that matter.' },
    { title: 'Documentation is evidence', body: 'Dataset cards explain provenance, exclusions, and limitations. Without them, the dataset cannot be reused, audited, or updated.', example: 'A dataset card that records "excluded questions requiring real-time information" prevents future reuse errors.' },
  ],
  mentalModelTitle: 'Dataset = Items + Labels + Rationales + Edge cases + Documentation + Review',
  flowNodes: [
    { label: 'Input', color: '#2563EB', desc: 'Task prompt and context' },
    { label: 'Expected behavior', color: '#0F766E', desc: 'What the model should do' },
    { label: 'Label', color: '#6D28D9', desc: 'Pass/fail or score' },
    { label: 'Rationale', color: '#B45309', desc: 'Why this item exists' },
    { label: 'Risk tag', color: '#B91C1C', desc: 'What failure mode it targets' },
    { label: 'Validity threat', color: '#15803D', desc: 'What could make this item misleading' },
  ],
  workedExample: {
    weak: '"Here are 100 prompts from Slack."',
    weakProblems: ['No labels', 'No rationales', 'No edge cases', 'No documentation', 'Cannot be audited or reused'],
    improved: '"Here are 80 documented items sampled by task family, risk tag, user type, and failure mode, with labels and rationales."',
    improvedStrengths: [['Sampling plan', 'by task family and risk tag — representative'], ['Labels', 'reviewed by domain expert'], ['Rationales', 'every item explains its existence'], ['Documented', 'supports reuse and audit']],
  },
  practicePrompt: 'Create five safe edge cases for hallucination in a fictional policy FAQ bot.',
  practiceTask: 'Write task rows with expected answer behavior and failure rationale.',
  practiceFields: [
    { key: 'input', label: 'Input (edge case)', ph: 'e.g. Question where answer is genuinely ambiguous' },
    { key: 'expectedBehavior', label: 'Expected behavior', ph: 'e.g. Acknowledge uncertainty rather than confabulate' },
    { key: 'label', label: 'Label', ph: 'Pass / Fail' },
    { key: 'rationale', label: 'Why this edge case matters', ph: 'e.g. Tests calibration under ambiguous policy language' },
    { key: 'failureMode', label: 'Failure mode targeted', ph: 'e.g. Hallucination of policy detail not in corpus' },
  ],
  quizQuestion: 'What makes a golden dataset "golden"?',
  quizOptions: ['It is very large.', 'It is curated, documented, reviewed, and aligned to the claim under test.', 'It has no hard cases.', 'It is generated without labels.'],
  quizCorrect: 1,
  quizExplanation: 'Trust comes from curation and documentation, not size alone.',
  artifactType: 'Golden Dataset Packet',
  artifactFields: [
    { key: 'purpose', label: 'Dataset purpose', ph: 'What claim or failure mode does this dataset test?' },
    { key: 'taskFamilies', label: 'Task families', ph: 'At least three categories of items' },
    { key: 'samplingPlan', label: 'Sampling plan', ph: 'How were items selected?' },
    { key: 'labels', label: 'Labels', ph: 'Pass/fail, score, or multi-label schema' },
    { key: 'rationales', label: 'Rationales', ph: 'Why does each item category exist?' },
    { key: 'validityThreats', label: 'Validity threats', ph: 'What could make this dataset misleading?' },
    { key: 'reviewOwner', label: 'Review owner', ph: 'Who reviewed the labels and why are they qualified?' },
  ],
  commonMistake: 'Copying random prompts and calling them a dataset.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What claim are you designing a dataset to test?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-043', title: 'Datasheets for Datasets', org: 'Gebru et al.', type: 'paper', diff: 'intermediate', required: true, why: 'Dataset documentation framework that supports accountability and validity.', url: 'https://arxiv.org/abs/1803.09010' },
    { id: 'S-044', title: 'Model Cards for Model Reporting', org: 'Mitchell et al.', type: 'paper', diff: 'intermediate', required: true, why: 'Reporting pattern for model behavior, limitations, intended use, and responsible disclosure.', url: 'https://arxiv.org/abs/1810.03993' },
    { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
    { id: 'S-006', title: 'DeepEval documentation', org: 'Confident AI', type: 'tool documentation', diff: 'beginner-intermediate', required: false, why: 'LLM evaluation framework with test cases, metrics, and application-level evaluation patterns.', url: 'https://deepeval.com/docs/evaluation-introduction' },
  ],
  nextLessonId: 'P2.L3',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P2L3: LessonData = {
  lessonId: 'P2.L3', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 3, lessonOf: 6,
  title: 'LLM-as-Judge Without Self-Deception',
  subtitle: 'Use LLM judges as useful but fallible measurement aids.',
  duration: '90 min', difficulty: 'intermediate',
  objective: 'Design judge prompts, rubrics, calibration sets, and bias checks for model-graded evaluation.',
  videoTitle: 'Holistic Evaluation of Language Models (HELM) — Yifan Mai, Stanford University',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=fLoYcXLG6ro',
  videoDuration: 'External video — confirm timestamp after embedding',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Holistic scoring', cue: 'Why multiple metrics matter.' },
    { t: '—', title: 'Calibration and uncertainty', cue: 'Do not collapse scores into certainty.' },
    { t: '—', title: 'Reporting', cue: 'Transparent judge limitations.' },
  ],
  transcriptSummary: 'LLM judges are useful instruments that require calibration. The judge is itself an evaluated component. Key risks: verbosity bias (longer answers scored higher), position bias (first answer in pairwise preferred), and self-serving bias (a model scores its own outputs higher). Calibration requires expert-labeled examples and bias probes.',
  keyIdeas: [
    { title: 'Rubric first', body: 'A judge prompt must operationalize a written rubric. Without a rubric, the judge applies its own implicit criteria — which may not match the evaluation objective.', example: '"Rate the response on a scale of 1–5" gives the judge too much discretion. A rubric that defines each level reduces variance.' },
    { title: 'Calibration set', body: 'Compare judge outputs to expert-labeled examples. Agreement rate ≥ 80% is a common threshold for CI-integration.', example: 'Calibrate against 50–100 expert-labeled examples across difficulty levels before deploying the judge as a gate.' },
    { title: 'Bias checks', body: 'Test position, verbosity, and order effects before trusting results. A judge that systematically prefers longer answers is biased.', example: 'Swap answer order in pairwise evaluations. If rankings flip, the judge is position-biased.' },
  ],
  mentalModelTitle: 'Rubric → Expert examples → Judge prompt → Agreement analysis → Bias checks → Report',
  flowNodes: [
    { label: 'Rubric', color: '#2563EB', desc: 'Written criteria for each score level' },
    { label: 'Expert examples', color: '#0F766E', desc: 'Labeled reference set for calibration' },
    { label: 'Judge prompt', color: '#6D28D9', desc: 'Operationalized rubric in prompt form' },
    { label: 'Agreement analysis', color: '#B45309', desc: 'Judge vs expert agreement rate' },
    { label: 'Bias checks', color: '#B91C1C', desc: 'Position, verbosity, order effects' },
    { label: 'Report', color: '#15803D', desc: 'Agreement rate, bias findings, limitations' },
  ],
  workedExample: {
    weak: '"Ask GPT-4 which answer is better."',
    weakProblems: ['No rubric — judge applies implicit criteria', 'No calibration — unknown agreement with human experts', 'No bias checks — verbosity/position unknown', 'Cannot be reproduced — no pinned judge version'],
    improved: '"Use a rubric, blind pairwise ordering, calibration examples, agreement metrics, and bias probes before reporting judge scores."',
    improvedStrengths: [['Rubric', 'explicit criteria — reduces variance'], ['Blind ordering', 'position bias controlled'], ['Calibration', 'agreement quantified'], ['Bias probes', 'verbosity and order effects tested']],
  },
  practicePrompt: 'Two candidate model answers differ in length and tone.',
  practiceTask: 'Score with a rubric and explain how you would check verbosity bias.',
  practiceFields: [
    { key: 'rubricCriteria', label: 'Rubric criteria', ph: 'List 2–3 criteria with score-level definitions' },
    { key: 'judgeScore', label: 'Judge scores', ph: 'Score each answer on each criterion' },
    { key: 'verbosityCheck', label: 'Verbosity bias check', ph: 'How would you test whether length affects scores?' },
  ],
  quizQuestion: 'Which is a judge calibration item?',
  quizOptions: ['A held-out expert-labeled set.', 'A landing page animation.', 'A random benchmark name.', 'A product slogan.'],
  quizCorrect: 0,
  quizExplanation: 'Calibration requires examples with trusted labels or judgments.',
  artifactType: 'Judge Calibration Report',
  artifactFields: [
    { key: 'rubricCriteria', label: 'Rubric criteria', ph: 'Define each score level for each dimension' },
    { key: 'judgePrompt', label: 'Judge prompt', ph: 'The operationalized rubric in prompt form' },
    { key: 'calibrationExamples', label: 'Calibration examples', ph: 'Number of items, expert labeling process, domain' },
    { key: 'agreementMetric', label: 'Agreement metric', ph: 'Cohen\'s kappa, accuracy, or pairwise agreement rate' },
    { key: 'biasChecks', label: 'Bias checks performed', ph: 'Position, verbosity, order effects — findings' },
    { key: 'uncertaintyNote', label: 'Uncertainty note', ph: 'What the judge cannot reliably distinguish' },
  ],
  commonMistake: 'Assuming a powerful judge model makes the score true.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What are you trying to judge, and what would you need to trust the score enough for a gate?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-008', title: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena', org: 'Zheng et al.', type: 'paper', diff: 'intermediate', required: true, why: 'Foundational paper for model-graded and pairwise preference evaluation with explicit judge limitations.', url: 'https://arxiv.org/abs/2306.05685' },
    { id: 'S-009', title: 'G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment', org: 'Liu et al.', type: 'paper', diff: 'advanced', required: true, why: 'Useful reference for rubric-based model judging and structured evaluation prompts.', url: 'https://arxiv.org/abs/2303.16634' },
    { id: 'S-006', title: 'DeepEval documentation', org: 'Confident AI', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'LLM evaluation framework with test cases, metrics, and application-level evaluation patterns.', url: 'https://deepeval.com/docs/evaluation-introduction' },
    { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: false, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
  ],
  nextLessonId: 'P2.L4',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P2L4: LessonData = {
  lessonId: 'P2.L4', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 4, lessonOf: 6,
  title: 'RAG Triad and Retrieval-Aware Evaluation',
  subtitle: 'Learn why RAG failures are often retrieval failures disguised as generation failures.',
  duration: '75 min', difficulty: 'intermediate',
  objective: 'Evaluate answer relevance, context relevance, retrieval precision/recall, and faithfulness in RAG systems.',
  videoTitle: 'New course with CircleCI: Automated Testing for LLMOps',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=Ep7uaxwN-mQ',
  videoDuration: 'External course announcement — pair with course page',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Testing LLM apps', cue: 'Why systematic app-level evals matter.' },
    { t: '—', title: 'Rule/model-graded mix', cue: 'How to combine evaluators.' },
    { t: '—', title: 'CI pipeline', cue: 'Make RAG failures reproducible.' },
  ],
  transcriptSummary: 'RAG failures have three distinct locations: the answer, the context, and the retrieval. Faithfulness checks whether the answer is supported by the retrieved context. Context relevance checks whether retrieval fetched the right evidence. Answer relevance checks whether the response answered the question. Diagnosing which failed determines the mitigation.',
  keyIdeas: [
    { title: 'Faithfulness', body: 'Is the answer supported by the retrieved context? An answer can be factually correct but not supported by the retrieved passages.', example: '"The answer is correct but the retrieved context doesn\'t mention this fact" — the model confabulated even with retrieval.' },
    { title: 'Context relevance', body: 'Did retrieval fetch the right evidence? Most RAG failures are retrieval failures — the model cannot answer from wrong passages.', example: '"Retrieval returned last year\'s policy, so the answer is outdated" — a retrieval failure, not a generation failure.' },
    { title: 'Answer relevance', body: 'Did the response actually answer the user\'s question? A model can faithfully summarize irrelevant context and still fail.', example: '"The response describes the general policy but does not answer the specific date question" — answer relevance failed.' },
  ],
  mentalModelTitle: 'Question → Retrieved context → Answer — with Faithfulness and Relevance checks',
  flowNodes: [
    { label: 'Question', color: '#2563EB', desc: 'User query' },
    { label: 'Retrieval', color: '#0F766E', desc: 'Context relevance — right passages?' },
    { label: 'Context', color: '#6D28D9', desc: 'Retrieved evidence' },
    { label: 'Generation', color: '#B45309', desc: 'Answer from context' },
    { label: 'Faithfulness', color: '#B91C1C', desc: 'Answer supported by context?' },
    { label: 'Answer relevance', color: '#15803D', desc: 'Response answers the question?' },
  ],
  workedExample: {
    weak: '"The answer sounds right, so the RAG system passed."',
    weakProblems: ['Did not check whether context supported the answer', 'Did not check whether retrieval returned relevant passages', 'Could be confabulating without retrieval', 'Failure mode invisible without component testing'],
    improved: '"The answer is relevant but unsupported by context; retrieval must be fixed before release."',
    improvedStrengths: [['Faithfulness check', 'answer vs context — gap identified'], ['Component diagnosis', 'retrieval failure isolated'], ['Decision', 'action is clear — fix retrieval, not generation']],
  },
  practicePrompt: 'A fictional benefits bot answers from an outdated policy page.',
  practiceTask: 'Classify the failure component and choose the next mitigation.',
  practiceFields: [
    { key: 'failureComponent', label: 'Failure component', ph: 'Retrieval / Generation / Answer relevance' },
    { key: 'evidence', label: 'Evidence for classification', ph: 'What in the response reveals the failure?' },
    { key: 'mitigation', label: 'Next mitigation', ph: 'e.g. Add source-date filter to retrieval' },
  ],
  quizQuestion: 'Which metric asks whether the answer is supported by retrieved context?',
  quizOptions: ['Faithfulness', 'Button contrast', 'Time to first byte', 'User avatar size'],
  quizCorrect: 0,
  quizExplanation: 'Faithfulness checks support between answer and context.',
  artifactType: 'RAG Evaluation Card',
  artifactFields: [
    { key: 'question', label: 'Question', ph: 'The user query being evaluated' },
    { key: 'retrievedPassages', label: 'Retrieved passages', ph: 'Summary of what was retrieved' },
    { key: 'answer', label: 'Answer', ph: 'The model\'s response' },
    { key: 'faithfulnessScore', label: 'Faithfulness score', ph: 'Is the answer supported by context? (0–1 or pass/fail)' },
    { key: 'contextRelevanceScore', label: 'Context relevance score', ph: 'Did retrieval return the right evidence?' },
    { key: 'failureClassification', label: 'Failure classification', ph: 'Retrieval / Generation / Relevance / None' },
    { key: 'mitigation', label: 'Mitigation', ph: 'What should change to fix this?' },
  ],
  commonMistake: 'Scoring final answer quality without checking whether retrieved context supported it.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What RAG failure mode are you trying to diagnose?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-007', title: 'Ragas documentation', org: 'Ragas', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Reference implementation and concepts for RAG evaluation such as faithfulness and context relevance.', url: 'https://docs.ragas.io/' },
    { id: 'S-006', title: 'DeepEval documentation', org: 'Confident AI', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'LLM evaluation framework with test cases, metrics, and application-level evaluation patterns.', url: 'https://deepeval.com/docs/evaluation-introduction' },
    { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
    { id: 'S-041', title: 'DeepLearning.AI Automated Testing for LLMOps', org: 'DeepLearning.AI / CircleCI', type: 'free course', diff: 'beginner-intermediate', required: false, why: 'Practical course on automated testing and CI workflow for LLM applications.', url: 'https://www.deeplearning.ai/courses/automated-testing-llmops' },
  ],
  nextLessonId: 'P2.L5',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P2L5: LessonData = {
  lessonId: 'P2.L5', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 5, lessonOf: 6,
  title: 'Tooling Lab: promptfoo, DeepEval, and Inspect AI',
  subtitle: 'Move from theory to runnable evaluation workflows.',
  duration: '120 min', difficulty: 'intermediate',
  objective: 'Implement the same safe evaluation in at least two frameworks and compare output quality.',
  videoTitle: 'Course-original screencast: promptfoo eval and red-team config',
  videoProvider: 'Course production',
  videoUrl: null,
  videoDuration: '10–15 min planned recording',
  videoStatus: 'pending',
  chapters: [
    { t: '0:00', title: 'Config-driven eval', cue: 'promptfoo example.' },
    { t: '—', title: 'Python test case', cue: 'DeepEval example.' },
    { t: '—', title: 'Task/solver/scorer', cue: 'Inspect example.' },
    { t: '—', title: 'Compare outputs', cue: 'Evidence export differences.' },
  ],
  transcriptSummary: 'Three tools for three different jobs: promptfoo for fast configuration-driven CI regression testing; DeepEval for Python-native application-level metrics; Inspect AI for frontier-style task/solver/scorer architectures. The right tool depends on what kind of evidence you need to produce.',
  keyIdeas: [
    { title: 'promptfoo', body: 'Fast configuration-driven prompt/model testing and red-team workflows. Best for CI integration and prompt regression testing.', example: 'A YAML config that tests 50 prompts across three model versions in a CI pipeline.' },
    { title: 'DeepEval', body: 'Pythonic test cases and metrics for LLM applications. Best for application-level evaluation with custom metrics.', example: 'A test suite that checks hallucination, answer relevance, and toxicity on each model release.' },
    { title: 'Inspect AI', body: 'Task-based framework for frontier and agentic evaluations. Best for structured evaluations requiring solvers, scorers, and evidence logs.', example: 'An Inspect task that evaluates coding agents with trajectory logging and evidence-card export.' },
  ],
  mentalModelTitle: 'Tool fit matrix: Framework → Best for → Strengths → Caveats → Evidence export',
  flowNodes: [
    { label: 'promptfoo', color: '#2563EB', desc: 'CI prompt regression, config-driven' },
    { label: 'DeepEval', color: '#0F766E', desc: 'App-level metrics, Python test cases' },
    { label: 'Inspect AI', color: '#6D28D9', desc: 'Frontier/agentic, task/solver/scorer' },
    { label: 'Ragas', color: '#B45309', desc: 'RAG-specific: faithfulness, relevance' },
    { label: 'Custom', color: '#B91C1C', desc: 'Specialized gaps — build from harness anatomy' },
  ],
  workedExample: {
    weak: '"Use every framework."',
    weakProblems: ['Every tool needs maintenance', 'Different evidence formats — hard to aggregate', 'Over-engineering before knowing what evidence is needed'],
    improved: '"Use promptfoo for CI prompt regressions, DeepEval for application metrics, Inspect for frontier-style tasks requiring solvers/scorers."',
    improvedStrengths: [['promptfoo', 'CI regression tests — fast feedback'], ['DeepEval', 'application metrics — per-release QA'], ['Inspect', 'frontier tasks — governance-grade evidence']],
  },
  practicePrompt: 'A team needs both CI regression tests and model-graded safety evaluation.',
  practiceTask: 'Recommend a two-tool stack and justify it.',
  practiceFields: [
    { key: 'tool1', label: 'Tool 1 and use case', ph: 'e.g. promptfoo for CI regression tests on prompt variations' },
    { key: 'tool2', label: 'Tool 2 and use case', ph: 'e.g. Inspect for safety evaluation with trajectory logging' },
    { key: 'evidence', label: 'Evidence output', ph: 'What artifact does each tool produce?' },
  ],
  quizQuestion: 'Which framework is explicitly positioned for frontier evaluations by AISI?',
  quizOptions: ['Inspect AI', 'Photoshop', 'Excel only', 'A slide deck'],
  quizCorrect: 0,
  quizExplanation: 'Inspect AI is the AISI-developed framework for frontier-style evaluations.',
  artifactType: 'Framework Comparison Matrix',
  artifactFields: [
    { key: 'framework1', label: 'Framework 1', ph: 'Name and version' },
    { key: 'useCase1', label: 'Use case', ph: 'What evaluation job does it handle?' },
    { key: 'outputArtifact1', label: 'Output artifact', ph: 'What evidence format does it produce?' },
    { key: 'limitation1', label: 'Limitation', ph: 'What can it not do well?' },
    { key: 'framework2', label: 'Framework 2', ph: 'Name and version' },
    { key: 'useCase2', label: 'Use case', ph: 'What evaluation job does it handle?' },
    { key: 'outputArtifact2', label: 'Output artifact', ph: 'What evidence format does it produce?' },
    { key: 'limitation2', label: 'Limitation', ph: 'What can it not do well?' },
  ],
  commonMistake: 'Choosing tools by hype instead of fit.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What evaluation job are you trying to automate, and what evidence do you need to produce?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Open-source framework for frontier-style evaluations.', url: 'https://inspect.aisi.org.uk/' },
    { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
    { id: 'S-006', title: 'DeepEval documentation', org: 'Confident AI', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'LLM evaluation framework with test cases, metrics, and application-level evaluation patterns.', url: 'https://deepeval.com/docs/evaluation-introduction' },
    { id: 'S-007', title: 'Ragas documentation', org: 'Ragas', type: 'tool documentation', diff: 'intermediate', required: false, why: 'Reference implementation for RAG evaluation.', url: 'https://docs.ragas.io/' },
    { id: 'S-041', title: 'DeepLearning.AI Automated Testing for LLMOps', org: 'DeepLearning.AI / CircleCI', type: 'free course', diff: 'beginner-intermediate', required: false, why: 'Practical course on automated testing and CI workflow for LLM applications.', url: 'https://www.deeplearning.ai/courses/automated-testing-llmops' },
  ],
  nextLessonId: 'P2.L6',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

const P2L6: LessonData = {
  lessonId: 'P2.L6', phaseId: 'P2', phaseTitle: 'Harness Engineering', lessonNum: 6, lessonOf: 6,
  title: 'Phase Studio: Automated Native Testing Harness',
  subtitle: 'Complete the phase artifact: a native testing harness that a learner can rerun.',
  duration: '60 min', difficulty: 'intermediate',
  objective: 'Assemble a lightweight local evaluation harness with dataset, scorer, logs, validation script, and report.',
  videoTitle: 'Course-original screencast: Build an Inspect evaluation task',
  videoProvider: 'Course production',
  videoUrl: null,
  videoDuration: '10–15 min planned recording',
  videoStatus: 'pending',
  chapters: [
    { t: '0:00', title: 'Repo layout', cue: 'Starter and solution files.' },
    { t: '—', title: 'Run locally', cue: 'Native process supervision.' },
    { t: '—', title: 'Validate', cue: 'Green/red scripts.' },
    { t: '—', title: 'Export', cue: 'Evidence cards for capstone.' },
  ],
  transcriptSummary: 'The phase deliverable is a runnable, shareable local harness. The components: JSONL dataset → runner → model adapter → scorer → evidence cards → validator. Every learner should be able to run it, get green/red results, and export evidence cards for the capstone.',
  keyIdeas: [
    { title: 'Native first', body: 'Use lightweight local services where safe; containers only when isolation is required. A local harness is easier to inspect, modify, and teach.', example: 'A PM2-supervised local service with mock APIs, a JSONL dataset, and a pytest validation script.' },
    { title: 'Validation script', body: 'The learner needs a green/red proof that the lab works. The script tests schema, run logs, scorer output, and evidence export.', example: '`python validate_phase_02.py` — outputs PASS/FAIL for each component.' },
    { title: 'Evidence export', body: 'Harness results must become capstone-ready evidence cards. Without export, the phase is incomplete.', example: 'A JSON evidence card with lessonId, artifactType, timestamp, harness config ref, pass rate, and notes.' },
  ],
  mentalModelTitle: 'JSONL dataset → runner → model adapter → scorer → evidence cards → validator',
  flowNodes: [
    { label: 'Dataset', color: '#2563EB', desc: 'JSONL with schema' },
    { label: 'Runner', color: '#0F766E', desc: 'Inspect / promptfoo / custom' },
    { label: 'Model adapter', color: '#6D28D9', desc: 'Versioned API config' },
    { label: 'Scorer', color: '#B45309', desc: 'Rubric or rule-based' },
    { label: 'Evidence cards', color: '#B91C1C', desc: 'Capstone-ready output' },
    { label: 'Validator', color: '#15803D', desc: 'pytest green/red' },
  ],
  workedExample: {
    weak: '"A notebook with manual screenshots."',
    weakProblems: ['Not reproducible', 'Not shareable', 'Cannot be validated', 'Evidence cannot be exported to capstone'],
    improved: '"A repo with starter config, dataset, runner, scorer, logs, evidence export, validation script, and solution file."',
    improvedStrengths: [['Repo structure', 'shareable and forkable'], ['Validation', 'green/red proof of correctness'], ['Evidence export', 'capstone-ready cards'], ['Solution file', 'self-documenting']],
  },
  practicePrompt: "A learner's harness runs but no evidence cards are saved.",
  practiceTask: 'Identify missing pieces before phase completion.',
  practiceFields: [
    { key: 'missingComponents', label: 'Missing components', ph: 'What is missing from the harness?' },
    { key: 'evidenceSchema', label: 'Evidence card schema', ph: 'What fields should each evidence card include?' },
    { key: 'validationFix', label: 'Validation fix', ph: 'What should the validator check that it currently misses?' },
  ],
  quizQuestion: 'What makes the phase artifact complete?',
  quizOptions: ['It has a nice icon.', 'It runs, logs raw outputs, scores results, exports evidence, and passes validation.', 'It has no source cards.', 'It only works on the instructor machine.'],
  quizCorrect: 1,
  quizExplanation: 'Completeness requires execution plus evidence and reproducibility.',
  artifactType: 'Automated Native Testing Harness',
  artifactFields: [
    { key: 'datasetPath', label: 'Dataset path', ph: 'Path to JSONL dataset' },
    { key: 'runCommand', label: 'Run command', ph: 'e.g. `inspect eval task.py --model openai/gpt-4o`' },
    { key: 'scorerConfig', label: 'Scorer config', ph: 'Scorer type, version, rubric reference' },
    { key: 'evidenceExportPath', label: 'Evidence export path', ph: 'Where evidence cards are written' },
    { key: 'validationCommand', label: 'Validation command', ph: 'e.g. `python validate_phase_02.py`' },
    { key: 'knownLimitations', label: 'Known limitations', ph: 'What the harness cannot currently test' },
  ],
  commonMistake: 'Overengineering with heavy infrastructure before measurement is clear.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. Is your harness ready for capstone reuse?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-038', title: 'PM2 process manager', org: 'PM2', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Lightweight process supervision useful for native host lab services.', url: 'https://pm2.keymetrics.io/' },
    { id: 'S-039', title: 'GitHub Actions documentation', org: 'GitHub', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'CI/CD automation for eval regression gates.', url: 'https://docs.github.com/actions' },
    { id: 'S-040', title: 'Pytest documentation', org: 'Pytest', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Validation scripts and unit-style tests for course labs.', url: 'https://docs.pytest.org/' },
    { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: false, why: 'Open-source framework for frontier-style evaluations.', url: 'https://inspect.aisi.org.uk/' },
    { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: false, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
  ],
  nextLessonId: 'P3.L1',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

// ─── Phase 3 — representative lessons (full content from phase file) ───────────

const P3L1: LessonData = {
  lessonId: 'P3.L1', phaseId: 'P3', phaseTitle: 'Autonomous Agents', lessonNum: 1, lessonOf: 7,
  title: 'Why Agent Evaluation Is Different',
  subtitle: 'See agent evaluation as task ecology, not just prompt evaluation.',
  duration: '75 min', difficulty: 'intermediate',
  objective: 'Explain why agents require environment, state, tool, and trajectory evaluation.',
  videoTitle: 'How METR measures long tasks and experienced open-ended tasks',
  videoProvider: 'YouTube',
  videoUrl: 'https://www.youtube.com/watch?v=k1t2xyWMUdY',
  videoDuration: 'External talk — confirm timestamp after embedding',
  videoStatus: 'candidate-external',
  chapters: [
    { t: '0:00', title: 'Longer tasks', cue: 'Why duration and reliability matter.' },
    { t: '—', title: 'Autonomy and tools', cue: 'Task completion beyond one prompt.' },
    { t: '—', title: 'Evaluation realism', cue: 'Why environment design matters.' },
  ],
  transcriptSummary: 'Agent evaluation is task ecology: the environment is part of the measurement, not background. State changes — files, messages, database rows, tool calls — must be logged. Irreversible actions need stricter controls and simulated environments. The agent\'s path through the environment is evidence.',
  keyIdeas: [
    { title: 'Environment matters', body: 'The environment is part of the evaluation, not a neutral background. Different environments produce different capabilities.', example: 'An email agent evaluated in a sandbox with no confirmation step will behave differently than one with an approval gate.' },
    { title: 'State changes', body: 'Files, messages, database rows, and tool calls must be logged. The final answer alone cannot reveal process-level risks.', example: '"The agent completed the task" hides whether it sent unauthorized messages, modified unexpected files, or accumulated unintended state.' },
    { title: 'Action safety', body: 'Irreversible actions need stricter controls and simulated environments. The evaluation must make unsafe actions auditable.', example: 'A calendar agent that reschedules meetings without confirmation requires a simulation-only evaluation environment.' },
  ],
  mentalModelTitle: 'Goal → Observe → Plan → Tool call → State change → Feedback → Stop condition',
  flowNodes: [
    { label: 'Goal', color: '#2563EB', desc: 'Task objective' },
    { label: 'Observe', color: '#0F766E', desc: 'Percept: environment state' },
    { label: 'Plan', color: '#6D28D9', desc: 'Reasoning step' },
    { label: 'Tool call', color: '#B45309', desc: 'Action with external effect' },
    { label: 'State change', color: '#B91C1C', desc: 'What changed in the environment' },
    { label: 'Stop condition', color: '#15803D', desc: 'When does the agent stop?' },
  ],
  workedExample: {
    weak: '"Ask the agent to do the task and see if it succeeds."',
    weakProblems: ['No environment specification', 'No state logging', 'No stop conditions', 'Cannot detect trajectory failures'],
    improved: '"Run the agent in a sandbox, log observations/tools/state, enforce stop conditions, and score both outcome and trajectory."',
    improvedStrengths: [['Sandbox', 'safe and repeatable environment'], ['Logging', 'full trace available for review'], ['Stop conditions', 'prevents runaway execution'], ['Dual scoring', 'outcome + trajectory safety']],
  },
  practicePrompt: 'A calendar agent reschedules a meeting without a confirmation step.',
  practiceTask: 'Name the outcome metric and the trajectory safety metric.',
  practiceFields: [
    { key: 'outcomeMetric', label: 'Outcome metric', ph: 'e.g. Meeting rescheduled successfully' },
    { key: 'trajectorySafety', label: 'Trajectory safety metric', ph: 'e.g. Confirmation gate respected? Unauthorized notifications sent?' },
    { key: 'gateDecision', label: 'Gate decision', ph: 'Does this combined result support release or require mitigation?' },
  ],
  quizQuestion: 'What is unique about agent evaluation?',
  quizOptions: ['It never needs logs.', 'The environment and tool trajectory become part of the measurement.', 'It only uses multiple choice.', 'It does not need safety constraints.'],
  quizCorrect: 1,
  quizExplanation: 'Agents act over time; measurement must include the path and environment.',
  artifactType: 'Agent Evaluation Frame',
  artifactFields: [
    { key: 'goal', label: 'Goal', ph: 'What task is the agent given?' },
    { key: 'environment', label: 'Environment', ph: 'What tools and services can the agent access?' },
    { key: 'allowedTools', label: 'Allowed tools', ph: 'Explicit allowlist of tool calls' },
    { key: 'stateVariables', label: 'State variables', ph: 'What environment state must be logged?' },
    { key: 'stopCondition', label: 'Stop condition', ph: 'When does the evaluation end?' },
    { key: 'outcomeMetric', label: 'Outcome metric', ph: 'How is task completion scored?' },
    { key: 'trajectoryMetric', label: 'Trajectory metric', ph: 'How is path safety scored?' },
  ],
  commonMistake: 'Evaluating an agent as if it were a single-turn chatbot.',
  coachOpening: "Let's connect this lesson to the decision your evaluation will support. What agent task are you trying to evaluate safely?",
  coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
  sources: [
    { id: 'S-015', title: 'SWE-bench Verified', org: 'SWE-bench', type: 'benchmark / docs', diff: 'advanced', required: true, why: 'Execution-based benchmark for real-world software issue resolution by coding agents.', url: 'https://www.swebench.com/' },
    { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
    { id: 'S-017', title: 'WebArena', org: 'WebArena team', type: 'benchmark', diff: 'advanced', required: true, why: 'Self-hosted web environments for evaluating autonomous web agents.', url: 'https://webarena.dev/' },
    { id: 'S-018', title: 'GAIA', org: 'Meta / Hugging Face / academic contributors', type: 'benchmark / dataset', diff: 'advanced', required: false, why: 'General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion.', url: 'https://huggingface.co/datasets/gaia-benchmark/GAIA' },
  ],
  nextLessonId: 'P3.L2',
  capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
};

// ─── Phase 3 remaining lessons (summary format — content from phase file) ────

function makeP3Lesson(
  num: number, id: string, title: string, subtitle: string, duration: string,
  objective: string, videoTitle: string, videoUrl: string | null, videoStatus: VideoStatus,
  artifactType: string, commonMistake: string, nextId: string | null,
  sources: LessonSource[]
): LessonData {
  return {
    lessonId: id, phaseId: 'P3', phaseTitle: 'Autonomous Agents', lessonNum: num, lessonOf: 7,
    title, subtitle, duration, difficulty: 'intermediate', objective,
    videoTitle,
    videoProvider: videoUrl ? 'YouTube' : 'Course production',
    videoUrl,
    videoDuration: videoUrl ? 'External — confirm timestamp' : '10–15 min planned recording',
    videoStatus,
    chapters: [{ t: '0:00', title: 'Content pending', cue: 'Video chapters will be added with recording.' }],
    transcriptSummary: `Transcript summary pending — content from phase_03 file for ${title}.`,
    keyIdeas: [
      { title: 'Content pending', body: subtitle, example: 'Example pending — add to lesson content pack.' },
    ],
    mentalModelTitle: `${title} — mental model`,
    flowNodes: [{ label: 'Content pending', color: '#64748B', desc: 'Add flow nodes to lesson content pack.' }],
    workedExample: { weak: 'Weak version pending.', weakProblems: ['Content pending — add to lesson content pack.'], improved: 'Improved version pending.', improvedStrengths: [['Content pending', 'Add to lesson content pack.']] },
    practicePrompt: 'Practice prompt pending.',
    practiceTask: 'Practice task pending — add to lesson content pack.',
    practiceFields: [{ key: 'practice', label: 'Practice field', ph: 'Content pending — add to lesson content pack.' }],
    quizQuestion: 'Quiz pending.',
    quizOptions: ['Content pending', 'Add to lesson content pack', 'See phase file', 'Contact course team'],
    quizCorrect: 0,
    quizExplanation: 'Quiz content pending — add to lesson content pack.',
    artifactType,
    artifactFields: [{ key: 'field', label: 'Artifact field', ph: 'Content pending — add to lesson content pack.' }],
    commonMistake,
    coachOpening: "Let's connect this lesson to the decision your evaluation will support.",
    coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
    sources,
    nextLessonId: nextId,
    capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
  };
}

const P3L2 = makeP3Lesson(2, 'P3.L2', 'Tool Calls, State, and Trajectory Logging', 'Make agent behavior inspectable by logging every meaningful state transition.', '105 min', 'Design a trace schema for multi-turn agent evaluations.', 'Course-original screencast: Build an Inspect evaluation task', null, 'pending', 'Agent Trace Schema', 'Saving only the final transcript and losing operational evidence.',  'P3.L3', [
  { id: 'S-037', title: 'OpenTelemetry documentation', org: 'OpenTelemetry', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Production observability standard for traces, metrics, and logs.', url: 'https://opentelemetry.io/docs/' },
  { id: 'S-015', title: 'SWE-bench Verified', org: 'SWE-bench', type: 'benchmark / docs', diff: 'advanced', required: true, why: 'Execution-based benchmark for real-world software issue resolution by coding agents.', url: 'https://www.swebench.com/' },
  { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
  { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: false, why: 'Open-source framework for frontier-style evaluations.', url: 'https://inspect.aisi.org.uk/' },
]);

const P3L3 = makeP3Lesson(3, 'P3.L3', 'SWE-bench and Coding Agent Evaluation', 'Understand why coding-agent evals need real repositories, tests, patches, and contamination caution.', '105 min', 'Interpret execution-based software engineering benchmarks and their caveats.', 'Measuring AI Ability to Complete Long Tasks', 'https://www.youtube.com/watch?v=9U15vncqdnk', 'candidate-external', 'Coding Agent Benchmark Card', 'Treating unit-test pass rate as the whole story.', 'P3.L4', [
  { id: 'S-015', title: 'SWE-bench Verified', org: 'SWE-bench', type: 'benchmark / docs', diff: 'advanced', required: true, why: 'Execution-based benchmark for real-world software issue resolution by coding agents.', url: 'https://www.swebench.com/' },
  { id: 'S-003', title: 'Lessons from the Trenches on Reproducible Evaluation', org: 'EleutherAI et al.', type: 'paper', diff: 'advanced', required: true, why: 'Practical lessons on reproducibility pitfalls in language model evaluation.', url: 'https://arxiv.org/abs/2405.14782' },
  { id: 'S-040', title: 'Pytest documentation', org: 'Pytest', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Validation scripts and unit-style tests for course labs.', url: 'https://docs.pytest.org/' },
]);

const P3L4 = makeP3Lesson(4, 'P3.L4', 'OSWorld, WebArena, and GAIA', 'Learn how desktop, web, and assistant benchmarks reveal different agent capabilities.', '105 min', 'Compare environment-based agent benchmarks and choose which fits a task claim.', 'How METR measures long tasks and experienced open-ended tasks', 'https://www.youtube.com/watch?v=k1t2xyWMUdY', 'candidate-external', 'Agent Benchmark Selection Matrix', 'Using the most famous agent benchmark even when it does not match the deployment environment.', 'P3.L5', [
  { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
  { id: 'S-017', title: 'WebArena', org: 'WebArena team', type: 'benchmark', diff: 'advanced', required: true, why: 'Self-hosted web environments for evaluating autonomous web agents.', url: 'https://webarena.dev/' },
  { id: 'S-018', title: 'GAIA', org: 'Meta / Hugging Face / academic contributors', type: 'benchmark / dataset', diff: 'advanced', required: true, why: 'General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion.', url: 'https://huggingface.co/datasets/gaia-benchmark/GAIA' },
]);

const P3L5 = makeP3Lesson(5, 'P3.L5', 'Sandboxes and Low-Compute Agent Execution', 'Build agent labs that are safe to run without expensive infrastructure.', '120 min', 'Design a safe, lightweight sandbox for de-risked agent tasks.', 'Course-original screencast: Build an Inspect evaluation task', null, 'pending', 'Agent Execution Sandbox Spec', 'Giving an agent open-ended tool access during learning labs.', 'P3.L6', [
  { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Open-source framework for frontier-style evaluations.', url: 'https://inspect.aisi.org.uk/' },
  { id: 'S-037', title: 'OpenTelemetry documentation', org: 'OpenTelemetry', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Production observability standard for traces, metrics, and logs.', url: 'https://opentelemetry.io/docs/' },
  { id: 'S-038', title: 'PM2 process manager', org: 'PM2', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'Lightweight process supervision useful for native host lab services.', url: 'https://pm2.keymetrics.io/' },
]);

const P3L6 = makeP3Lesson(6, 'P3.L6', 'Long Task Horizons, Autonomy, and ARA', 'Understand why frontier agent capability is about reliability over longer, messier tasks.', '105 min', 'Explain long-task time horizons and autonomous replication/adaptation as evaluation frames.', 'How METR measures long tasks and experienced open-ended tasks', 'https://www.youtube.com/watch?v=k1t2xyWMUdY', 'candidate-external', 'Autonomy Risk Frame', 'Confusing short-demo success with durable autonomy.', 'P3.L7', [
  { id: 'S-019', title: 'METR: Measuring AI Ability to Complete Long Tasks', org: 'METR', type: 'paper / report', diff: 'advanced', required: true, why: 'Introduces time-horizon framing for autonomous task completion capability.', url: 'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/' },
  { id: 'S-020', title: 'Evaluating Language-Model Agents on Realistic Autonomous Tasks', org: 'METR / ARC Evals', type: 'paper', diff: 'advanced', required: true, why: 'Introduces autonomous replication and adaptation task framing for agent risk assessment.', url: 'https://arxiv.org/abs/2312.11671' },
  { id: 'S-026', title: 'Model Evaluation for Extreme Risks', org: 'Shevlane et al.', type: 'paper', diff: 'advanced', required: true, why: 'Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance.', url: 'https://arxiv.org/abs/2305.15324' },
]);

const P3L7 = makeP3Lesson(7, 'P3.L7', 'Phase Studio: Agent Execution Sandbox', 'Turn agent theory into a runnable, portfolio-ready sandbox spec.', '105 min', 'Assemble the phase deliverable: a safe agent execution sandbox with trace logging and validation.', 'Course-original walkthrough: Aster-3 evaluation dossier', null, 'pending', 'Agent Execution Sandbox', 'Submitting a conceptual writeup without runnable validation.', 'P4.L1', [
  { id: 'S-016', title: 'OSWorld', org: 'XLang Lab et al.', type: 'benchmark / paper', diff: 'advanced', required: true, why: 'Real-computer environment for evaluating multimodal desktop agents.', url: 'https://os-world.github.io/' },
  { id: 'S-017', title: 'WebArena', org: 'WebArena team', type: 'benchmark', diff: 'advanced', required: true, why: 'Self-hosted web environments for evaluating autonomous web agents.', url: 'https://webarena.dev/' },
  { id: 'S-037', title: 'OpenTelemetry documentation', org: 'OpenTelemetry', type: 'tool documentation', diff: 'intermediate', required: false, why: 'Production observability standard for traces, metrics, and logs.', url: 'https://opentelemetry.io/docs/' },
]);

// ─── Phase 4 ─────────────────────────────────────────────────────────────────

function makePhaseLesson(
  phaseId: string, phaseTitle: string, num: number, lessonOf: number,
  id: string, title: string, subtitle: string, duration: string, difficulty: Difficulty,
  objective: string, videoTitle: string, videoUrl: string | null, videoStatus: VideoStatus,
  artifactType: string, commonMistake: string, nextId: string | null,
  sources: LessonSource[]
): LessonData {
  return {
    lessonId: id, phaseId, phaseTitle, lessonNum: num, lessonOf,
    title, subtitle, duration, difficulty, objective,
    videoTitle,
    videoProvider: videoUrl ? (videoUrl.includes('playlist') ? 'YouTube playlist' : 'YouTube') : 'Course production',
    videoUrl,
    videoDuration: videoUrl ? 'External — confirm timestamp' : '10–15 min planned recording',
    videoStatus,
    chapters: [{ t: '0:00', title: 'Content pending', cue: 'Chapters will be added with the recording.' }],
    transcriptSummary: `Transcript summary pending — content from ${phaseId} file for ${title}.`,
    keyIdeas: [{ title: 'Content pending', body: subtitle, example: 'Add key ideas to lesson content pack.' }],
    mentalModelTitle: `${title} — mental model pending`,
    flowNodes: [{ label: 'Pending', color: '#64748B', desc: 'Add flow nodes to lesson content pack.' }],
    workedExample: { weak: 'Weak version pending.', weakProblems: ['Add to content pack.'], improved: 'Improved version pending.', improvedStrengths: [['Pending', 'Add to content pack.']] },
    practicePrompt: 'Practice prompt pending.',
    practiceTask: 'Add practice task to content pack.',
    practiceFields: [{ key: 'practice', label: 'Practice', ph: 'Add to content pack.' }],
    quizQuestion: 'Quiz pending.',
    quizOptions: ['Pending', 'Add to content pack', 'See phase file', 'Contact course team'],
    quizCorrect: 0,
    quizExplanation: 'Quiz content pending.',
    artifactType,
    artifactFields: [{ key: 'field', label: 'Field', ph: 'Add to content pack.' }],
    commonMistake,
    coachOpening: "Let's connect this lesson to the decision your evaluation will support.",
    coachPrompts: ['Explain this simply', 'Show me a diagram', 'Quiz me', 'Help me fill the artifact', 'Connect this to the capstone'],
    sources,
    nextLessonId: nextId,
    capstoneConnection: 'Feeds the final Aster-3 evaluation dossier.',
  };
}

const P4_SOURCES_BASE: LessonSource[] = [
  { id: 'S-014', title: 'ARC-AGI-2', org: 'ARC Prize', type: 'benchmark', diff: 'advanced', required: true, why: 'Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence.', url: 'https://arcprize.org/arc-agi/2' },
  { id: 'S-021', title: 'RLBench', org: 'James et al.', type: 'robotics benchmark', diff: 'advanced', required: true, why: 'Robot manipulation benchmark with simulated tasks useful for physical task evaluation design.', url: 'https://github.com/stepjam/RLBench' },
  { id: 'S-022', title: 'VIMA', org: 'Jiang et al.', type: 'paper / benchmark', diff: 'advanced', required: true, why: 'Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks.', url: 'https://vimalabs.github.io/' },
];

const P4L1 = makePhaseLesson('P4', 'Spatial & World Models', 1, 7, 'P4.L1', 'Spatial Reasoning and World Models', 'Learn to test whether a model represents space, time, objects, and physical constraints.', '60 min', 'intermediate', 'Define spatial/world-model evaluation and explain why text-only metrics are insufficient.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'Spatial Evaluation Frame', 'Asking only verbal questions about visual-spatial tasks.', 'P4.L2', P4_SOURCES_BASE);
const P4L2 = makePhaseLesson('P4', 'Spatial & World Models', 2, 7, 'P4.L2', 'Object Permanence, Physical Consistency, and Temporal Coherence', 'Design tests for object permanence, physics plausibility, and temporal consistency.', '75 min', 'intermediate', 'Design tests for object permanence, physics plausibility, and temporal consistency.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'Physical Consistency Test Card', 'Testing physics claims with text description alone.', 'P4.L3', P4_SOURCES_BASE);
const P4L3 = makePhaseLesson('P4', 'Spatial & World Models', 3, 7, 'P4.L3', 'ARC-AGI-2 and Abstract Generalization', 'Explain how ARC-style tasks test abstraction and sample-efficient generalization.', '75 min', 'intermediate', 'Explain how ARC-style tasks test abstraction and sample-efficient generalization.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'Abstract Generalization Note', 'Treating ARC-AGI score as a general intelligence measure.', 'P4.L4', [{ id: 'S-014', title: 'ARC-AGI-2', org: 'ARC Prize', type: 'benchmark', diff: 'advanced', required: true, why: 'Abstract reasoning benchmark designed to stress-test generalization.', url: 'https://arcprize.org/arc-agi/2' }]);
const P4L4 = makePhaseLesson('P4', 'Spatial & World Models', 4, 7, 'P4.L4', 'Multimodal Benchmark Design', 'Design multimodal tasks that combine visual, textual, and structured evidence.', '75 min', 'intermediate', 'Design multimodal tasks that combine visual, textual, and structured evidence.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'Multimodal Benchmark Packet', 'Treating multimodal models as text models with images attached.', 'P4.L5', P4_SOURCES_BASE);
const P4L5 = makePhaseLesson('P4', 'Spatial & World Models', 5, 7, 'P4.L5', 'Simulation Benchmarks: RLBench, VIMA, and Factory Layouts', 'Use simulation benchmarks to design safe physical reasoning tasks.', '105 min', 'intermediate', 'Use simulation benchmarks to design safe physical reasoning tasks.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'Simulation Benchmark Spec', 'Using real facility plans or deployment details in learning labs.', 'P4.L6', [
  { id: 'S-021', title: 'RLBench', org: 'James et al.', type: 'robotics benchmark', diff: 'advanced', required: true, why: 'Robot manipulation benchmark with simulated tasks useful for physical task evaluation design.', url: 'https://github.com/stepjam/RLBench' },
  { id: 'S-022', title: 'VIMA', org: 'Jiang et al.', type: 'paper / benchmark', diff: 'advanced', required: true, why: 'Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks.', url: 'https://vimalabs.github.io/' },
]);
const P4L6 = makePhaseLesson('P4', 'Spatial & World Models', 6, 7, 'P4.L6', 'Video and Interactive World-Model Evaluation', 'Evaluate video/world-model claims using consistency, controllability, and interaction tests.', '75 min', 'intermediate', 'Evaluate video/world-model claims using consistency, controllability, and interaction tests.', 'Google DeepMind AGI Safety Course', 'https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW', 'candidate-external', 'World-Model Claim Checklist', 'Accepting visual plausibility as evidence of physical accuracy.', 'P4.L7', [
  { id: 'S-023', title: 'Video generation models as world simulators', org: 'OpenAI', type: 'technical report', diff: 'intermediate', required: false, why: 'Useful reference for video/world-model capability claims and their limitations.', url: 'https://openai.com/index/video-generation-models-as-world-simulators/' },
  { id: 'S-024', title: 'Veo model page', org: 'Google DeepMind', type: 'model documentation', diff: 'beginner-intermediate', required: false, why: 'Current model page for video generation capabilities and prompt adherence claims.', url: 'https://deepmind.google/models/veo/' },
  { id: 'S-025', title: 'Genie 3: A new frontier for world models', org: 'Google DeepMind', type: 'research blog', diff: 'intermediate', required: false, why: 'Reference for interactive environment/world-model discussion and simulation evaluation questions.', url: 'https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/' },
]);
const P4L7 = makePhaseLesson('P4', 'Spatial & World Models', 7, 7, 'P4.L7', 'Phase Studio: Physical Simulation Benchmark', 'Assemble a de-risked physical simulation benchmark and reporting rubric.', '75 min', 'intermediate', 'Assemble a de-risked physical simulation benchmark and reporting rubric.', 'Course-original walkthrough: Physical simulation benchmark assembly', null, 'pending', 'Physical Simulation Benchmark', 'Submitting a conceptual writeup without a runnable benchmark spec.', 'P5.L1', P4_SOURCES_BASE);

// ─── Phase 5 ─────────────────────────────────────────────────────────────────

const P5_SOURCES_BASE: LessonSource[] = [
  { id: 'S-028', title: 'Red Teaming Language Models with Language Models', org: 'Perez et al.', type: 'paper', diff: 'intermediate', required: true, why: 'Foundational automated red-team paper showing how models can generate diverse test cases.', url: 'https://arxiv.org/abs/2202.03286' },
  { id: 'S-026', title: 'Model Evaluation for Extreme Risks', org: 'Shevlane et al.', type: 'paper', diff: 'advanced', required: true, why: 'Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance.', url: 'https://arxiv.org/abs/2305.15324' },
  { id: 'S-027', title: 'Evaluating Frontier Models for Dangerous Capabilities', org: 'Google DeepMind', type: 'paper', diff: 'advanced', required: true, why: 'Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk.', url: 'https://arxiv.org/abs/2403.13793' },
];

const P5L1 = makePhaseLesson('P5', 'Red Teaming', 1, 8, 'P5.L1', 'Red Teaming as Evaluation', 'Use red teaming to find failures and convert them into reusable tests.', '60 min', 'intermediate', 'Explain red teaming as systematic adversarial evaluation, not chaos or provocation.', 'AI Safety — Full Course by Safe.AI Founder', 'https://www.youtube.com/watch?v=agEPmYdbQLs', 'candidate-external', 'Red-Team Campaign Frame', 'Treating red teaming as creative chaos rather than systematic evaluation.', 'P5.L2', P5_SOURCES_BASE);
const P5L2 = makePhaseLesson('P5', 'Red Teaming', 2, 8, 'P5.L2', 'Multi-turn Prompt Injection and Tool Attack Evaluation', 'Design safe evaluations for prompt injection in tool-using systems.', '75 min', 'intermediate', 'Design safe evaluations for prompt injection in tool-using systems.', 'Course-original screencast: Prompt injection evaluation', null, 'pending', 'Prompt Injection Evaluation Plan', 'Testing prompt injection with real target systems instead of sandboxed mocks.', 'P5.L3', [
  { id: 'S-029', title: 'Prompt injection benchmark paper', org: 'Liu et al.', type: 'paper', diff: 'advanced', required: false, why: 'Formalizes prompt injection attacks and defenses for quantitative evaluation.', url: 'https://arxiv.org/abs/2310.12815' },
  { id: 'S-031', title: 'Lakera Gandalf', org: 'Lakera', type: 'controlled learning game', diff: 'beginner', required: false, why: 'A safe, gamified way to understand prompt injection concepts without targeting real systems.', url: 'https://gandalf.lakera.ai/' },
  ...P5_SOURCES_BASE,
]);
const P5L3 = makePhaseLesson('P5', 'Red Teaming', 3, 8, 'P5.L3', 'Dangerous Capability Domains Safely', 'Explain frontier risk domains and how to discuss them without operationalizing harm.', '90 min', 'advanced', 'Explain frontier risk domains and how to discuss them without operationalizing harm.', 'AI Safety — Full Course by Safe.AI Founder', 'https://www.youtube.com/watch?v=agEPmYdbQLs', 'candidate-external', 'Dangerous Capability Domain Map', 'Discussing risk domains with operational detail that could cause harm.', 'P5.L4', P5_SOURCES_BASE);
const P5L4 = makePhaseLesson('P5', 'Red Teaming', 4, 8, 'P5.L4', 'Cyber and Bio Uplift Evaluation Design', 'Design de-risked uplift evaluations for cyber and bio/chemical risk without harmful instructions.', '90 min', 'advanced', 'Design de-risked uplift evaluations for cyber and bio/chemical risk without harmful instructions.', 'AI Safety — Full Course by Safe.AI Founder', 'https://www.youtube.com/watch?v=agEPmYdbQLs', 'candidate-external', 'Uplift Evaluation Design Card', 'Including operational misuse details in evaluation documentation.', 'P5.L5', P5_SOURCES_BASE);
const P5L5 = makePhaseLesson('P5', 'Red Teaming', 5, 8, 'P5.L5', 'Persuasion, Deception, Sandbagging, and Scheming', 'Define behavioral risk signals and design safe evaluation probes for strategic or deceptive behavior.', '75 min', 'advanced', 'Define behavioral risk signals and design safe evaluation probes for strategic or deceptive behavior.', 'AI Safety — Full Course by Safe.AI Founder', 'https://www.youtube.com/watch?v=agEPmYdbQLs', 'candidate-external', 'Behavioral Risk Probe Plan', 'Conflating standard errors with strategic deception without evidence.', 'P5.L6', P5_SOURCES_BASE);
const P5L6 = makePhaseLesson('P5', 'Red Teaming', 6, 8, 'P5.L6', 'Automated Red Teaming with Inspect, promptfoo, and garak', 'Configure automated red-team probes safely and interpret their limitations.', '75 min', 'intermediate', 'Configure automated red-team probes safely and interpret their limitations.', 'Course-original screencast: Automated red-team config', null, 'pending', 'Automated Red-Team Config', 'Treating automated red-team results as comprehensive coverage.', 'P5.L7', [
  { id: 'S-004', title: 'Inspect AI documentation', org: 'UK AI Security Institute / Meridian Labs', type: 'tool documentation', diff: 'intermediate', required: false, why: 'Open-source framework for frontier-style evaluations.', url: 'https://inspect.aisi.org.uk/' },
  { id: 'S-030', title: 'garak: LLM vulnerability scanner', org: 'NVIDIA / community', type: 'tool', diff: 'intermediate', required: false, why: 'Open-source vulnerability scanner for hallucination, prompt injection, data leakage, jailbreak, and other LLM weaknesses.', url: 'https://garak.ai/' },
  { id: 'S-005', title: 'promptfoo documentation', org: 'promptfoo', type: 'tool documentation', diff: 'beginner-intermediate', required: false, why: 'Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows.', url: 'https://www.promptfoo.dev/docs/intro/' },
]);
const P5L7 = makePhaseLesson('P5', 'Red Teaming', 7, 8, 'P5.L7', 'Evidence Triage and Vulnerability Reporting', 'Convert red-team leads into evidence cards with severity, confidence, replication, and mitigation.', '60 min', 'intermediate', 'Convert red-team leads into evidence cards with severity, confidence, replication, and mitigation.', 'Course-original screencast: Evidence triage', null, 'pending', 'Red-Team Evidence Library', 'Reporting red-team findings without replication or severity evidence.', 'P5.L8', P5_SOURCES_BASE);
const P5L8 = makePhaseLesson('P5', 'Red Teaming', 8, 8, 'P5.L8', 'Phase Studio: Threat and Vulnerability Report', 'Write a professional red-team report with findings, evidence, mitigations, and residual risk.', '75 min', 'advanced', 'Write a professional red-team report with findings, evidence, mitigations, and residual risk.', 'Course-original walkthrough: Threat and vulnerability report', null, 'pending', 'Threat and Vulnerability Report', 'Publishing findings without mitigations or residual risk assessment.', 'P6.L1', P5_SOURCES_BASE);

// ─── Phase 6 ─────────────────────────────────────────────────────────────────

const P6_SOURCES_BASE: LessonSource[] = [
  { id: 'S-037', title: 'OpenTelemetry documentation', org: 'OpenTelemetry', type: 'tool documentation', diff: 'intermediate', required: true, why: 'Production observability standard for traces, metrics, and logs.', url: 'https://opentelemetry.io/docs/' },
  { id: 'S-036', title: 'NIST AI RMF Generative AI Profile', org: 'NIST', type: 'framework', diff: 'intermediate', required: true, why: 'Risk-management profile for generative AI, including governance and risk measurement considerations.', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence' },
  { id: 'S-039', title: 'GitHub Actions documentation', org: 'GitHub', type: 'tool documentation', diff: 'beginner-intermediate', required: true, why: 'CI/CD automation for eval regression gates.', url: 'https://docs.github.com/actions' },
];

const P6L1 = makePhaseLesson('P6', 'Enterprise Pipeline', 1, 6, 'P6.L1', 'Telemetry and Production Evaluation', 'Learn what to log after deployment so evaluation does not stop at launch.', '60 min', 'intermediate', 'Define production telemetry that supports safety, quality, cost, and drift decisions.', 'New course with CircleCI: Automated Testing for LLMOps', 'https://www.youtube.com/watch?v=Ep7uaxwN-mQ', 'candidate-external', 'Telemetry Schema', 'Treating evaluation as a pre-launch activity that ends at deployment.', 'P6.L2', P6_SOURCES_BASE);
const P6L2 = makePhaseLesson('P6', 'Enterprise Pipeline', 2, 6, 'P6.L2', 'TTFT, Latency, Concurrency, and Cost', 'Measure service-level performance without confusing speed with capability or safety.', '45 min', 'intermediate', 'Measure service-level performance without confusing speed with capability or safety.', 'New course with CircleCI: Automated Testing for LLMOps', 'https://www.youtube.com/watch?v=Ep7uaxwN-mQ', 'candidate-external', 'Performance Gate Spec', 'Treating low latency as a proxy for quality or safety.', 'P6.L3', P6_SOURCES_BASE);
const P6L3 = makePhaseLesson('P6', 'Enterprise Pipeline', 3, 6, 'P6.L3', 'Drift, Regression Gates, and CI/CD', 'Create release and CI gates that catch quality, safety, and behavior regressions.', '75 min', 'intermediate', 'Create release and CI gates that catch quality, safety, and behavior regressions.', 'Course-original screencast: Regression gate config', null, 'pending', 'Regression Gate Config', 'Deploying without regression tests after any model change.', 'P6.L4', P6_SOURCES_BASE);
const P6L4 = makePhaseLesson('P6', 'Enterprise Pipeline', 4, 6, 'P6.L4', 'Threshold Memos and Governance Frameworks', 'Translate evaluation evidence into threshold memos aligned with governance frameworks.', '60 min', 'intermediate', 'Translate evaluation evidence into threshold memos aligned with governance frameworks.', 'New course with CircleCI: Automated Testing for LLMOps', 'https://www.youtube.com/watch?v=Ep7uaxwN-mQ', 'candidate-external', 'Threshold Memo', 'Setting thresholds after seeing evaluation results.', 'P6.L5', [
  ...P6_SOURCES_BASE,
  { id: 'S-032', title: 'Anthropic Responsible Scaling Policy', org: 'Anthropic', type: 'policy framework', diff: 'advanced', required: false, why: 'Public frontier safety policy useful for capability thresholds and governance gates.', url: 'https://www.anthropic.com/responsible-scaling-policy' },
  { id: 'S-033', title: 'OpenAI Preparedness Framework', org: 'OpenAI', type: 'policy framework', diff: 'advanced', required: false, why: 'OpenAI framework for tracking frontier capabilities that could create severe harm.', url: 'https://openai.com/index/updating-our-preparedness-framework/' },
]);
const P6L5 = makePhaseLesson('P6', 'Enterprise Pipeline', 5, 6, 'P6.L5', 'Capstone Studio: Aster-3 Evaluation Dossier', 'Assemble phase artifacts into a pre-deployment evaluation dossier for Aster-3 Frontier.', '90 min', 'advanced', 'Assemble phase artifacts into a pre-deployment evaluation dossier for Aster-3 Frontier.', 'Course-original walkthrough: Aster-3 evaluation dossier', null, 'pending', 'Aster-3 Evaluation Dossier', 'Assembling a dossier without residual uncertainty or mitigation plan.', 'P6.L6', P6_SOURCES_BASE);
const P6L6 = makePhaseLesson('P6', 'Enterprise Pipeline', 6, 6, 'P6.L6', 'Final Portfolio Export, QA, and Deployment Gate', 'Run the final QA checklist and export a professional evaluation portfolio.', '30 min', 'advanced', 'Run the final QA checklist and export a professional evaluation portfolio.', 'Course-original walkthrough: Final portfolio export', null, 'pending', 'Production-Ready Deployment Gate', 'Exporting a portfolio without running the QA checklist.', null, P6_SOURCES_BASE);

// ─── All lessons map ──────────────────────────────────────────────────────────

export const LESSONS: Record<string, LessonData> = {
  'P1.L1': P1L1, 'P1.L2': P1L2, 'P1.L3': P1L3, 'P1.L4': P1L4, 'P1.L5': P1L5, 'P1.L6': P1L6,
  'P2.L1': P2L1, 'P2.L2': P2L2, 'P2.L3': P2L3, 'P2.L4': P2L4, 'P2.L5': P2L5, 'P2.L6': P2L6,
  'P3.L1': P3L1, 'P3.L2': P3L2, 'P3.L3': P3L3, 'P3.L4': P3L4, 'P3.L5': P3L5, 'P3.L6': P3L6, 'P3.L7': P3L7,
  'P4.L1': P4L1, 'P4.L2': P4L2, 'P4.L3': P4L3, 'P4.L4': P4L4, 'P4.L5': P4L5, 'P4.L6': P4L6, 'P4.L7': P4L7,
  'P5.L1': P5L1, 'P5.L2': P5L2, 'P5.L3': P5L3, 'P5.L4': P5L4, 'P5.L5': P5L5, 'P5.L6': P5L6, 'P5.L7': P5L7, 'P5.L8': P5L8,
  'P6.L1': P6L1, 'P6.L2': P6L2, 'P6.L3': P6L3, 'P6.L4': P6L4, 'P6.L5': P6L5, 'P6.L6': P6L6,
};

// ─── Phase-to-lesson index ────────────────────────────────────────────────────

export const PHASE_LESSONS: Record<string, string[]> = {
  P1: ['P1.L1', 'P1.L2', 'P1.L3', 'P1.L4', 'P1.L5', 'P1.L6'],
  P2: ['P2.L1', 'P2.L2', 'P2.L3', 'P2.L4', 'P2.L5', 'P2.L6'],
  P3: ['P3.L1', 'P3.L2', 'P3.L3', 'P3.L4', 'P3.L5', 'P3.L6', 'P3.L7'],
  P4: ['P4.L1', 'P4.L2', 'P4.L3', 'P4.L4', 'P4.L5', 'P4.L6', 'P4.L7'],
  P5: ['P5.L1', 'P5.L2', 'P5.L3', 'P5.L4', 'P5.L5', 'P5.L6', 'P5.L7', 'P5.L8'],
  P6: ['P6.L1', 'P6.L2', 'P6.L3', 'P6.L4', 'P6.L5', 'P6.L6'],
};

export const DEFAULT_LESSON_ID = 'P1.L1';
