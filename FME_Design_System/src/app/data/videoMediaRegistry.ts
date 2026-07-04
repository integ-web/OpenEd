/* ============================================================================
   Video / Reference Media Registry V4
   Source of truth: video_lesson_media_registry_v4.json + p*_video_patch_v4.md
   Policy: No course-owned videos. External media is reference only.
   Do NOT duplicate URLs across lessons.
   ============================================================================ */

export type MediaStatus =
  | 'external_reference_unverified'
  | 'embed_verified'
  | 'embed_blocked'
  | 'no_external_video_yet';

export type TrackingMode =
  | 'embedded_tracking'
  | 'external_fallback_tracking'
  | 'reading_script_only';

export interface VideoProgressState {
  lessonId: string;
  mediaUrl: string | null;
  trackingMode: TrackingMode;
  currentTimeSeconds: number;
  durationSeconds: number | null;
  watchedPercent: number;
  hasPlayed: boolean;
  completed: boolean;
  lastUpdatedAt: string;
  reflection?: string;
}

export interface MediaChapter {
  title: string;
  cue: string;
}

export interface LessonMediaEntry {
  lessonId: string;
  mediaTitle: string;
  mediaProvider: string;
  mediaUrl: string | null;
  mediaStatus: MediaStatus;
  whyThisVideo: string;
  chapters: MediaChapter[];
  authoredScript: string;
  fallbackCopy: string;
}

export const VIDEO_MEDIA_REGISTRY: Record<string, LessonMediaEntry> = {
  'P1.L1': {
    lessonId: 'P1.L1',
    mediaTitle: 'Yann Dubois: Scalable Evaluation of Large Language Models',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=ZaQYM-YF1rM',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Best-fit reference for scalable LLM evaluation and why evals require methodology, not vibes.',
    chapters: [
      { title: 'Evaluation as behavior', cue: 'Focus on what the system does under defined conditions.' },
      { title: 'Scenarios and metrics', cue: 'HELM-style matrix of use cases and desiderata.' },
      { title: 'From measurement to decision', cue: 'Why scores need interpretation.' },
    ],
    authoredScript: `This lesson is about **systematic frontier model evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not "what can we run?" but "what uncertainty is blocking a responsible decision?"

In this lesson, learners practice the method: **turning an informal model question into question → task → input → model → measurement → analysis → decision**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism.

The common failure mode is **using demos, anecdotes, or leaderboard screenshots as proof**. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P1.L2': {
    lessonId: 'P1.L2',
    mediaTitle: 'Andrej Karpathy: Intro to Large Language Models',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Useful model-background reference for learners who need a concrete explanation of LLM types and capability surfaces.',
    chapters: [
      { title: 'Model families', cue: 'How model training and interface shape evaluation.' },
      { title: 'Benchmark fit', cue: 'Why model type changes what scores mean.' },
      { title: 'Tool access', cue: 'How scaffolds alter capability.' },
    ],
    authoredScript: `This lesson is about **model-type-aware evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **mapping model type to capability surface, failure mode, and evaluation method**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed.

The common failure mode is **running one benchmark and assuming it applies to every model architecture or deployment mode**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P1.L3': {
    lessonId: 'P1.L3',
    mediaTitle: 'Stanford CS224N Lecture 11 — Benchmarking by Yann Dubois',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=TO0CqzqiArM',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Directly supports benchmark, dataset, task, metric, prompt, and evaluation vocabulary.',
    chapters: [
      { title: 'Metrics vocabulary', cue: 'How metrics reflect specific assumptions.' },
      { title: 'Protocol details', cue: 'Why prompt and aggregation matter.' },
      { title: 'Common traps', cue: 'Why benchmark names hide complexity.' },
    ],
    authoredScript: `This lesson is about **evaluation vocabulary precision**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **decomposing a benchmark into dataset, task, metric, prompt format, sampling, and aggregation**. The workflow is deliberately concrete.

The common failure mode is **using benchmark names as if they were single facts**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P1.L4': {
    lessonId: 'P1.L4',
    mediaTitle: 'Evaluation for Large Language Models and Generative AI — Deep Dive',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=iQl03pQlYWY',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Useful overview of LLM evaluation methods and the limits of single outcome scores.',
    chapters: [
      { title: 'Task completion', cue: 'Outcome measurement.' },
      { title: 'Reliability over time', cue: 'Why long tasks need trajectory awareness.' },
      { title: 'Capability trend interpretation', cue: 'How time horizon connects to risk.' },
    ],
    authoredScript: `This lesson is about **outcome and trajectory metrics**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **separating final result, intermediate steps, tool use, recovery behavior, and safety constraint handling**.

The common failure mode is **scoring only the final answer when the path reveals risk or unreliability**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P1.L5': {
    lessonId: 'P1.L5',
    mediaTitle: 'François Chollet: How We Get To AGI',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=5QcCeSsNRks',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Provides benchmark and generalization context for saturation, ARC-style thinking, and Goodhart-resistant evaluation.',
    chapters: [
      { title: 'Benchmark coverage', cue: 'Why broad coverage is not enough.' },
      { title: 'Transparency', cue: 'How source and protocol visibility build trust.' },
      { title: 'Limitations', cue: 'Why leaderboards need caveats.' },
    ],
    authoredScript: `This lesson is about **Goodhart-aware benchmark interpretation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **checking benchmark claims for saturation, contamination, prompt optimization, baselines, and external validity**.

The common failure mode is **treating benchmark progress as identical to real-world capability progress**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P1.L6': {
    lessonId: 'P1.L6',
    mediaTitle: 'BlueDot AI Governance Resource — Model Evaluation for Extreme Risks',
    mediaProvider: 'BlueDot / external course resource',
    mediaUrl: 'https://bluedot.org/courses/governance-2023/4',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Reference for moving from risk claims to evaluation objectives in extreme-risk governance contexts.',
    chapters: [
      { title: 'Risk framing', cue: 'Why vague risks fail.' },
      { title: 'Objective structure', cue: 'Actor / capability / access / task / evidence.' },
      { title: 'Governance decision', cue: 'How the objective feeds release gates.' },
    ],
    authoredScript: `This lesson is about **risk-to-objective conversion**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **naming actor, capability, access condition, task environment, success condition, evidence, and decision**.

The common failure mode is **starting with a benchmark before articulating the risk claim and decision**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },

  // ── Phase 2 ─────────────────────────────────────────────────────────────────

  'P2.L1': {
    lessonId: 'P2.L1',
    mediaTitle: 'Evaluate LLMs with Language Model Evaluation Harness',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=p-gzfS1JgEE',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Practical walkthrough for understanding harness mechanics.',
    chapters: [
      { title: 'Dataset, solver, scorer', cue: 'Inspect task anatomy.' },
      { title: 'Logging', cue: 'What must be saved.' },
      { title: 'Evidence', cue: 'From score to report.' },
    ],
    authoredScript: `This lesson is about **evaluation harness anatomy**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop.

In this lesson, learners practice the method: **identifying dataset, runner, adapter, solver/scaffold, scorer, logger, and report**.

The common failure mode is **thinking a harness is only a script that loops over prompts**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P2.L2': {
    lessonId: 'P2.L2',
    mediaTitle: 'Using Promptfoo + CSVs to Eval Models',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=pcFKF2CpVvo',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Concrete dataset-driven eval example with CSV test cases.',
    chapters: [
      { title: 'Why systematic tests matter', cue: 'LLM applications are less predictable than traditional software.' },
      { title: 'Rule-based and model-graded evals', cue: 'Different scoring patterns.' },
      { title: 'CI connection', cue: 'Datasets become regression gates.' },
    ],
    authoredScript: `This lesson is about **golden dataset design**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **documenting task rows, labels, expected behavior, edge-case rationale, and validity threats**.

The common failure mode is **copying random prompts and calling them a dataset**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P2.L3': {
    lessonId: 'P2.L3',
    mediaTitle: 'LLM as a Judge: Scaling AI Evaluation Strategies',
    mediaProvider: 'YouTube / IBM Technology',
    mediaUrl: 'https://www.youtube.com/watch?v=trfUBIDeI1Y',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Lesson-aligned external reference for judge-based evaluation.',
    chapters: [
      { title: 'Holistic scoring', cue: 'Why multiple metrics matter.' },
      { title: 'Calibration and uncertainty', cue: 'Do not collapse scores into certainty.' },
      { title: 'Reporting', cue: 'Transparent judge limitations.' },
    ],
    authoredScript: `This lesson is about **LLM-as-judge calibration**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **separating rubric design, judge prompt, calibration set, agreement check, and uncertainty report**.

The common failure mode is **assuming a powerful judge model makes the score true**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P2.L4': {
    lessonId: 'P2.L4',
    mediaTitle: 'Turbocharge Your RAG Applications with Powerful RAG Analytics',
    mediaProvider: 'YouTube / DeepLearning.AI',
    mediaUrl: 'https://www.youtube.com/watch?v=njN_Wu8dLfE',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'RAG evaluation reference for retrieval, generation, and attribution quality.',
    chapters: [
      { title: 'Testing LLM apps', cue: 'Why systematic app-level evals matter.' },
      { title: 'Rule/model-graded mix', cue: 'How to combine evaluators.' },
      { title: 'CI pipeline', cue: 'Make RAG failures reproducible.' },
    ],
    authoredScript: `This lesson is about **RAG triad evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **tracing a failure from question → retrieval → context → generation → answer support**.

The common failure mode is **scoring final answer quality without checking whether retrieved context supported it**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P2.L5': {
    lessonId: 'P2.L5',
    mediaTitle: 'Start with Promptfoo in under 10 min.',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=7Z6_7XkXwj0',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Fast practical setup reference for promptfoo-based evals.',
    chapters: [
      { title: 'Config-driven eval', cue: 'promptfoo example.' },
      { title: 'Python test case', cue: 'DeepEval example.' },
      { title: 'Task/solver/scorer', cue: 'Inspect example.' },
      { title: 'Compare outputs', cue: 'Evidence export differences.' },
    ],
    authoredScript: `This lesson is about **practical framework comparison**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **running a toy evaluation in promptfoo, DeepEval, and/or Inspect AI with the same dataset and rubric**.

The common failure mode is **choosing tools by hype instead of fit**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P2.L6': {
    lessonId: 'P2.L6',
    mediaTitle: 'LLM Evals In Practice: Creating Custom Task Evals',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=WWwYCAIYzQk',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Supports the phase studio task of building custom native evals.',
    chapters: [
      { title: 'Repo layout', cue: 'Starter and solution files.' },
      { title: 'Run locally', cue: 'Native process supervision.' },
      { title: 'Validate', cue: 'Green/red scripts.' },
      { title: 'Export', cue: 'Evidence cards for capstone.' },
    ],
    authoredScript: `This lesson is about **native testing harness assembly**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **combining dataset, runner, judge/scorer, logs, validation scripts, and report into a lightweight local lab**.

The common failure mode is **overengineering with heavy infrastructure before measurement is clear**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },

  // ── Phase 3 ─────────────────────────────────────────────────────────────────

  'P3.L1': {
    lessonId: 'P3.L1',
    mediaTitle: 'How to Build, Evaluate, and Iterate on LLM Agents',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=0pnEUAwoDP0',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Broad introduction to agent evaluation and iteration loops.',
    chapters: [
      { title: 'Longer tasks', cue: 'Why duration and reliability matter.' },
      { title: 'Autonomy and tools', cue: 'Task completion beyond one prompt.' },
      { title: 'Evaluation realism', cue: 'Why environment design matters.' },
    ],
    authoredScript: `This lesson is about **agent evaluation ecology**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **mapping goal, environment, tools, state, memory, observations, and irreversible actions**.

The common failure mode is **evaluating an agent as if it were a single-turn chatbot**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L2': {
    lessonId: 'P3.L2',
    mediaTitle: 'Agent Evaluation #langchain',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=-URxC6zXnNs',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Reference for evaluating agent steps and tool use.',
    chapters: [
      { title: 'Event schema', cue: 'What to log.' },
      { title: 'Trace review', cue: 'How to inspect failures.' },
      { title: 'Evidence export', cue: 'Turn traces into cards.' },
    ],
    authoredScript: `This lesson is about **trajectory logging**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **creating an event schema for prompts, observations, tool calls, tool outputs, retries, state changes, and final answer**.

The common failure mode is **saving only the final transcript and losing operational evidence**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L3': {
    lessonId: 'P3.L3',
    mediaTitle: 'John Yang — SWE-bench: Can Language Models Resolve Real-World GitHub Issues?',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=DrLdvbkgmeA',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Directly aligned with SWE-bench and coding agent evaluation.',
    chapters: [
      { title: 'Task duration', cue: 'How coding tasks relate to human time horizons.' },
      { title: 'Reliability', cue: 'Why 50% success is not deployment-ready.' },
      { title: 'Caveats', cue: 'External validity and task distribution.' },
    ],
    authoredScript: `This lesson is about **execution-based coding evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **reading an issue, generating a patch, applying it, running tests, and analyzing false positives/negatives**.

The common failure mode is **treating unit-test pass rate as the whole story**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L4': {
    lessonId: 'P3.L4',
    mediaTitle: 'The State of Web Agents',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=VRRi_KRbfps',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Covers WebArena, VisualWebArena, WorkArena, and the benchmark landscape for web agents.',
    chapters: [
      { title: 'Realistic tasks', cue: 'Why environment realism matters.' },
      { title: 'Evaluation horizon', cue: 'Why long workflows need representative tasks.' },
      { title: 'Benchmark interpretation', cue: 'Avoid overclaiming.' },
    ],
    authoredScript: `This lesson is about **environment-based benchmark selection**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **matching the claim to OSWorld-style desktop tasks, WebArena-style web tasks, GAIA-style assistant tasks, or a custom toy environment**.

The common failure mode is **using the most famous agent benchmark even when it does not match the deployment environment**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L5': {
    lessonId: 'P3.L5',
    mediaTitle: 'Software Control Models: Building Agents for Real-World Interfaces',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=BxfiW3wi640',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Supports desktop-agent and low-compute sandbox design.',
    chapters: [
      { title: 'Sandbox goals', cue: 'Safety, repeatability, cost.' },
      { title: 'Tool allowlists', cue: 'Controlling action space.' },
      { title: 'Reset and validation', cue: 'Making labs reliable.' },
    ],
    authoredScript: `This lesson is about **sandboxed agent execution**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **defining allowed tools, mock services, filesystem boundaries, budgets, and reset behavior**.

The common failure mode is **giving an agent open-ended tool access during learning labs**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L6': {
    lessonId: 'P3.L6',
    mediaTitle: 'METR: Measuring AI Ability to Complete Long Tasks',
    mediaProvider: 'METR article / external media',
    mediaUrl: 'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Direct reference for long-horizon autonomy and task-completion framing.',
    chapters: [
      { title: 'Time horizon metric', cue: 'What the metric means.' },
      { title: 'Reliability and task distribution', cue: 'Why success rate matters.' },
      { title: 'Risk implications', cue: 'How autonomy changes governance.' },
    ],
    authoredScript: `This lesson is about **long-horizon autonomy evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **measuring task success by human-time horizon, reliability, adaptation, and resource-acquisition constraints**.

The common failure mode is **confusing short-demo success with durable autonomy**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference resource cannot be embedded here. Open it on the provider, then return and mark it read. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P3.L7': {
    lessonId: 'P3.L7',
    mediaTitle: 'Evaluating CrewAI + MCP with Promptfoo',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=o7CKEeyth1Q',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Practical reference for agent/MCP evaluation and phase-studio implementation.',
    chapters: [
      { title: 'Build the sandbox', cue: 'Repo and task layout.' },
      { title: 'Run an agent', cue: 'Mock execution.' },
      { title: 'Inspect traces', cue: 'Score outcome and trajectory.' },
      { title: 'Export evidence', cue: 'Capstone import.' },
    ],
    authoredScript: `This lesson is about **sandbox artifact assembly**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **combining environment spec, tool allowlist, trace schema, tasks, scorer, and validation script**.

The common failure mode is **submitting a conceptual writeup without runnable validation**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },

  // ── Phase 4 ─────────────────────────────────────────────────────────────────

  'P4.L1': {
    lessonId: 'P4.L1',
    mediaTitle: 'ARC-AGI-2 Overview With François Chollet',
    mediaProvider: 'YouTube / ARC Prize',
    mediaUrl: 'https://www.youtube.com/watch?v=TWHezX43I-4',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Relevant to spatial/world-model generalization and ARC-style task design.',
    chapters: [
      { title: 'World models', cue: 'Why internal representations matter.' },
      { title: 'Evaluation caution', cue: 'Claims need behavioral tests.' },
      { title: 'Safety relevance', cue: 'Physical systems require higher confidence.' },
    ],
    authoredScript: `This lesson is about **spatial and world-model evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **mapping object identity, location, continuity, occlusion, motion, and cause-effect constraints**.

The common failure mode is **asking only verbal questions about visual-spatial tasks**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L2': {
    lessonId: 'P4.L2',
    mediaTitle: 'RLBench: The Robot Learning Benchmark',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=F2PqREHT3F8',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Direct reference for physical simulation benchmark thinking.',
    chapters: [
      { title: 'Object permanence', cue: 'Tracking across frames.' },
      { title: 'Physical plausibility', cue: 'What violates real constraints.' },
      { title: 'Temporal coherence', cue: 'Consistency over time.' },
    ],
    authoredScript: `This lesson is about **physical consistency evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **designing tasks that probe object permanence, physics plausibility, and temporal consistency**.

The common failure mode is **testing scene description without testing consistency under change**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L3': {
    lessonId: 'P4.L3',
    mediaTitle: 'ARC Prize Version 2 Launch Video',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=M3b59lZYBW8',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Supports ARC-AGI-2 and benchmark refresh discussion.',
    chapters: [
      { title: 'ARC task anatomy', cue: 'Input/output grid pairs.' },
      { title: 'Few-shot generalization', cue: 'Why sample efficiency matters.' },
      { title: 'Goodhart resistance', cue: 'How ARC-2 addresses saturation.' },
    ],
    authoredScript: `This lesson is about **ARC-style abstract generalization**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **interpreting ARC grid tasks as tests of abstraction and sample-efficient generalization rather than memorization**.

The common failure mode is **treating ARC scores as a simple capability ladder**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L4': {
    lessonId: 'P4.L4',
    mediaTitle: 'MM-SafetyBench: A Benchmark for Safety Evaluation of Multimodal Large Language Models',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=1j2Jz6oJ4Uo',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Directly related to multimodal safety benchmark design.',
    chapters: [
      { title: 'Multimodal inputs', cue: 'Combining visual and textual evidence.' },
      { title: 'Task design', cue: 'How to avoid unimodal shortcuts.' },
      { title: 'Safety in multimodal context', cue: 'Cross-modal failure modes.' },
    ],
    authoredScript: `This lesson is about **multimodal benchmark design**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **designing tasks that require combining visual, textual, and structured evidence rather than any modality alone**.

The common failure mode is **testing text-only reasoning with images attached as decoration**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L5': {
    lessonId: 'P4.L5',
    mediaTitle: 'RLBench 2019 — Comparing Robot Learning Algorithms on 100 Tasks',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=blt0l8cQqZo',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Extends physical benchmark design with multi-task simulation context.',
    chapters: [
      { title: 'Task library', cue: 'Breadth of physical scenarios.' },
      { title: 'Reproducibility', cue: 'Simulation reset and determinism.' },
      { title: 'Metrics', cue: 'Success rate and robustness.' },
    ],
    authoredScript: `This lesson is about **simulation benchmark design**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **using RLBench, VIMA, and factory-layout simulations to design safe physical reasoning tasks with reproducible environments**.

The common failure mode is **treating simulation success as real-world capability**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L6': {
    lessonId: 'P4.L6',
    mediaTitle: 'Stanford CME295 Transformers & LLMs — Quantifying LLM Performance',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=8fNP4N46RRo',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Useful performance-quantification reference for multimodal/video-world model lessons.',
    chapters: [
      { title: 'Consistency', cue: 'Same object, different frames.' },
      { title: 'Controllability', cue: 'Does prompt control world state.' },
      { title: 'Interaction tests', cue: 'Human-in-loop feedback.' },
    ],
    authoredScript: `This lesson is about **video and interactive world-model evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **evaluating consistency, controllability, and interaction quality in generated video and world-model outputs**.

The common failure mode is **judging video quality on aesthetics alone without testing physical or temporal consistency**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P4.L7': {
    lessonId: 'P4.L7',
    mediaTitle: 'RLBench Task Building Tutorial — Target Reaching Part 1',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=bKaK_9O3v7Y',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Hands-on reference for building physical simulation tasks.',
    chapters: [
      { title: 'Task spec', cue: 'Define goal, objects, constraints.' },
      { title: 'Simulation setup', cue: 'Reproducible environment.' },
      { title: 'Rubric and report', cue: 'Evidence cards.' },
    ],
    authoredScript: `This lesson is about **physical simulation benchmark assembly**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **assembling a de-risked physical simulation benchmark with task spec, environment, scorer, and reporting rubric**.

The common failure mode is **treating the simulation tool as the deliverable rather than the benchmark evidence**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },

  // ── Phase 5 ─────────────────────────────────────────────────────────────────

  'P5.L1': {
    lessonId: 'P5.L1',
    mediaTitle: 'Ethan Perez — Inverse Scaling, Red Teaming',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=TjWiaUMMh6g',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Research-oriented reference for red teaming language models.',
    chapters: [
      { title: 'Why safety evaluations matter', cue: 'Find failures before deployment.' },
      { title: 'Adversarial testing', cue: 'Systematic probing.' },
      { title: 'Evidence discipline', cue: 'Document and mitigate.' },
    ],
    authoredScript: `This lesson is about **red teaming as evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **defining scope, target behavior, risk domain, allowed probes, safety boundaries, evidence logging, and debrief**.

The common failure mode is **mistaking red teaming for unstructured jailbreak attempts**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L2': {
    lessonId: 'P5.L2',
    mediaTitle: 'Prompt Engineering and AI Red Teaming — Sander Schulhoff',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=_BRhRh7mOX0',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Direct fit for prompt injection origins and AI red teaming concepts.',
    chapters: [
      { title: 'Threat model', cue: 'Untrusted content.' },
      { title: 'Safe sandbox', cue: 'Fake secrets and mock tools.' },
      { title: 'Scoring', cue: 'Forbidden action and refusal quality.' },
    ],
    authoredScript: `This lesson is about **prompt injection evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **testing whether a model follows trusted instructions over untrusted content in controlled tasks**.

The common failure mode is **teaching real attack instructions or targeting live systems**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L3': {
    lessonId: 'P5.L3',
    mediaTitle: 'Red Teaming of LLM Applications: Going from Prototype to Production',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=yalj9BbWqoI',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Application-level red-team reference with production framing.',
    chapters: [
      { title: 'Dangerous capabilities', cue: 'High-level domain overview.' },
      { title: 'Safety evaluation', cue: 'Evidence and mitigations.' },
      { title: 'Governance', cue: 'Thresholds and controls.' },
    ],
    authoredScript: `This lesson is about **safe dangerous capability evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **mapping cyber, bio/chemical, persuasion, autonomy, and model-internal risk questions to de-risked evaluation designs**.

The common failure mode is **including harmful procedural details in educational content**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L4': {
    lessonId: 'P5.L4',
    mediaTitle: 'Anthropic Research — Constitutional Classifiers',
    mediaProvider: 'Anthropic research page',
    mediaUrl: 'https://www.anthropic.com/research/constitutional-classifiers',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Safe external reference for jailbreak defense and capability-threshold mitigation framing.',
    chapters: [
      { title: 'Risk domains', cue: 'High-level evaluation framing.' },
      { title: 'Mitigations', cue: 'How frameworks handle thresholds.' },
      { title: 'Reporting', cue: 'Evidence and limits.' },
    ],
    authoredScript: `This lesson is about **uplift evaluation design**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **comparing baseline human performance with model-assisted performance under controlled, non-operational tasks**.

The common failure mode is **using real exploit steps or biological protocols as teaching examples**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference resource cannot be embedded here. Open it on the provider, then return and mark it read. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L5': {
    lessonId: 'P5.L5',
    mediaTitle: 'Ethan Perez — Discovering Language Model Behaviors with Model-Written Evaluations',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=jslSqapaBbI',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Reference for model-written evaluations, deception/sandbagging-adjacent evaluation methods.',
    chapters: [
      { title: 'Alignment risks', cue: 'High-level behavioral risks.' },
      { title: 'Evaluation design', cue: 'Controls and uncertainty.' },
      { title: 'Governance', cue: 'Implications of strategic behavior.' },
    ],
    authoredScript: `This lesson is about **behavioral risk evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **creating de-risked probes for persuasion strength, deception indicators, sandbagging hypotheses, and evaluation-awareness signals**.

The common failure mode is **anthropomorphizing model behavior or overclaiming intent from one example**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L6': {
    lessonId: 'P5.L6',
    mediaTitle: 'Promptfoo Red Teaming: A Beginner\'s Guide',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=y6Dlsz5P8s8',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Hands-on automated red-team workflow reference.',
    chapters: [
      { title: 'Probe config', cue: 'Safe categories and constraints.' },
      { title: 'Run and score', cue: 'Scanner output.' },
      { title: 'Triage', cue: 'From leads to evidence.' },
    ],
    authoredScript: `This lesson is about **automated red-team tooling**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **running controlled probe suites, classifying outputs, and exporting findings to evidence cards**.

The common failure mode is **treating automated scanner results as final truth**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L7': {
    lessonId: 'P5.L7',
    mediaTitle: 'Test Your AI Like a Hacker — Promptfoo Tutorial',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=KghDstjwwNA',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Practical reference for triage and LLM app security testing.',
    chapters: [
      { title: 'Evidence cards', cue: 'Required fields.' },
      { title: 'Triage', cue: 'Severity vs confidence.' },
      { title: 'Mitigation', cue: 'Actionable reporting.' },
    ],
    authoredScript: `This lesson is about **evidence triage**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **scoring severity, confidence, replication, affected context, mitigation, and residual uncertainty**.

The common failure mode is **reporting every weird output with equal urgency**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P5.L8': {
    lessonId: 'P5.L8',
    mediaTitle: 'Red Teaming Language Models with Language Models — Paper Discussion',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=2V3MXzAPQpw',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Paper-oriented reference for converting red-team findings into reusable evals.',
    chapters: [
      { title: 'Assemble report', cue: 'From evidence to narrative.' },
      { title: 'Recommendation', cue: 'Release implications.' },
      { title: 'Limitations', cue: 'What remains unknown.' },
    ],
    authoredScript: `This lesson is about **red-team report assembly**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **organizing scope, methods, findings, severity, evidence cards, mitigations, limitations, and next tests**.

The common failure mode is **writing a dramatic report without decision-useful structure**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },

  // ── Phase 6 ─────────────────────────────────────────────────────────────────

  'P6.L1': {
    lessonId: 'P6.L1',
    mediaTitle: 'Drift Monitoring and Evaluation for LLM Apps',
    mediaProvider: 'YouTube / Evidently AI',
    mediaUrl: 'https://www.youtube.com/watch?v=eQ6cGzDUtMU',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Production monitoring and drift reference.',
    chapters: [
      { title: 'CI and deployment', cue: 'Testing before every change.' },
      { title: 'Monitoring logic', cue: 'How evals support release.' },
      { title: 'Regression mindset', cue: 'Catch changes early.' },
    ],
    authoredScript: `This lesson is about **production evaluation telemetry**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **designing request, response, model, tool, cost, latency, feedback, and safety-event logs**.

The common failure mode is **treating deployment as the end of evaluation**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P6.L2': {
    lessonId: 'P6.L2',
    mediaTitle: 'LLM Inference Performance: Latency and Throughput Metrics',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=DW-mo65DJ-Q',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Direct reference for TTFT, throughput, and latency tradeoffs.',
    chapters: [
      { title: 'Automated gates', cue: 'Run tests before deployment.' },
      { title: 'Cost and reliability', cue: 'Operational signals.' },
      { title: 'CI mindset', cue: 'Performance as one gate among many.' },
    ],
    authoredScript: `This lesson is about **performance evaluation**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **measuring time-to-first-token, latency percentiles, throughput, concurrency, timeout, and cost-per-success**.

The common failure mode is **optimizing latency while ignoring quality and risk**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P6.L3': {
    lessonId: 'P6.L3',
    mediaTitle: 'Evidently AI Tutorial — Open Source ML Models Monitoring and Testing',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=cgc3dSEAel0',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Practical monitoring/testing reference for CI/CD gates.',
    chapters: [
      { title: 'CI config', cue: 'Run evals on change.' },
      { title: 'Thresholds', cue: 'Pass/fail logic.' },
      { title: 'Evidence', cue: 'Export results for review.' },
    ],
    authoredScript: `This lesson is about **model and application regression gates**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **running a fixed golden set, hard cases, safety cases, and telemetry checks before release**.

The common failure mode is **waiting for users to discover regressions**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P6.L4': {
    lessonId: 'P6.L4',
    mediaTitle: '80,000 Hours Podcast — Anthropic\'s Responsible Scaling Policy with Nick Joseph',
    mediaProvider: 'Podcast / external resource',
    mediaUrl: 'https://80000hours.org/podcast/episodes/nick-joseph-anthropic-safety-approach-responsible-scaling/',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Governance framework reference for threshold memos and deployment gates.',
    chapters: [
      { title: 'Frameworks', cue: 'Why thresholds exist.' },
      { title: 'Risk domains', cue: 'Evidence and mitigations.' },
      { title: 'Decision process', cue: 'From eval to action.' },
    ],
    authoredScript: `This lesson is about **governance threshold memo**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **mapping evidence cards to thresholds, residual risk, mitigations, owners, and recommendation**.

The common failure mode is **sending raw benchmark scores to executives without interpretation**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference resource cannot be embedded here. Open it on the provider, then return and mark it read. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P6.L5': {
    lessonId: 'P6.L5',
    mediaTitle: 'Deep Dive into LLM Evaluation with Weights & Biases',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=7EcznH0-of8',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Supports capstone evidence collection, experiment tracking, and eval reporting.',
    chapters: [
      { title: 'Scenario brief', cue: 'Aster-3 context.' },
      { title: 'Artifact import', cue: 'Use prior phase outputs.' },
      { title: 'Risk dashboard', cue: 'Review gates.' },
      { title: 'Recommendation', cue: 'Export portfolio.' },
    ],
    authoredScript: `This lesson is about **capstone dossier assembly**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **combining threat model, benchmarks, harnesses, evidence cards, red-team report, telemetry plan, threshold memo, and executive report**.

The common failure mode is **creating a pretty final page without quality gates**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
  'P6.L6': {
    lessonId: 'P6.L6',
    mediaTitle: 'Software Engineering and LLM Evaluation',
    mediaProvider: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=tIgPbjPav4o',
    mediaStatus: 'external_reference_unverified',
    whyThisVideo: 'Portfolio/export reference for communicating software-eval results.',
    chapters: [
      { title: 'QA checks', cue: 'Missing evidence and sources.' },
      { title: 'Export', cue: 'Portfolio case study.' },
      { title: 'Next path', cue: 'Advanced learning recommendations.' },
    ],
    authoredScript: `This lesson is about **final evaluation QA**. The practical evaluator's habit is to start with the decision, not the tool.

In this lesson, learners practice the method: **checking content, source, evidence, safety, accessibility, and decision quality before export**.

The common failure mode is **treating completion as a certificate rather than a reviewable portfolio**. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than "is this model good?"`,
    fallbackCopy: 'This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson\'s required teaching.',
  },
};

// ── Progress helpers ──────────────────────────────────────────────────────────

export function saveVideoProgress(state: VideoProgressState): void {
  try {
    localStorage.setItem(`fel_video_progress_${state.lessonId}`, JSON.stringify(state));
  } catch { /* storage unavailable */ }
}

export function loadVideoProgress(lessonId: string): VideoProgressState | null {
  try {
    const raw = localStorage.getItem(`fel_video_progress_${lessonId}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function buildInitialProgress(lessonId: string, mediaUrl: string | null): VideoProgressState {
  return {
    lessonId,
    mediaUrl,
    trackingMode: 'embedded_tracking',
    currentTimeSeconds: 0,
    durationSeconds: null,
    watchedPercent: 0,
    hasPlayed: false,
    completed: false,
    lastUpdatedAt: new Date().toISOString(),
  };
}

// ── URL → embed URL ───────────────────────────────────────────────────────────

export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
    }
    if (u.hostname.includes('youtube')) {
      const list = u.searchParams.get('list');
      if (u.pathname === '/playlist' && list) {
        return `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&rel=0&modestbranding=1`;
      }
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?rel=0&modestbranding=1&enablejsapi=1`;
    }
  } catch { /* ignore */ }
  return null;
}

// ── Duplicate URL detection (for QA) ─────────────────────────────────────────

export function getDuplicateMediaUrls(): Map<string, string[]> {
  const urlToLessons = new Map<string, string[]>();
  for (const entry of Object.values(VIDEO_MEDIA_REGISTRY)) {
    if (!entry.mediaUrl) continue;
    const existing = urlToLessons.get(entry.mediaUrl) ?? [];
    urlToLessons.set(entry.mediaUrl, [...existing, entry.lessonId]);
  }
  const duplicates = new Map<string, string[]>();
  for (const [url, lessons] of urlToLessons) {
    if (lessons.length > 1) duplicates.set(url, lessons);
  }
  return duplicates;
}
