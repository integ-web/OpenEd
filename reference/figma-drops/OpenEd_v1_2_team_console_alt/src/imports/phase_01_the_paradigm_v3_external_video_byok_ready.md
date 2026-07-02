# P1 — The Paradigm

## V3 file status
- This file is updated for no course-owned videos. External media is reference-only; authored lesson transcripts are the stable teaching layer.

## Phase metadata
- Phase ID: P1
- Title: The Paradigm
- Total hours: 6 hours (360 minutes planned lesson time)
- Learner level: Novice → intermediate
- Phase promise: Learners stop treating evaluation as a score and start treating it as decision-grade measurement.
- Phase artifact: Custom Evaluation Rubric
- Capstone connection: Defines the evaluation objectives and rubric that every later phase reuses.
- Product mission alignment: To solve AI's biggest bottleneck: proving models are safe, reliable, and ready for real-world use.
- Safety stance: All sensitive cyber, bio/chemical, persuasion, autonomy, and agent examples must remain fictional, sandboxed, de-risked, and non-operational.

## Figma Make ingestion instructions
Use this file as the source of truth for this phase's lesson screens. Do not redesign the product. Populate the existing video-first lesson template with these fields:

- Watch tab: video metadata, chapters, transcript summary, notes prompt.
- Understand tab: on-screen summary, key ideas, visual explainer, worked example, common mistakes.
- Practice tab: practice activity, quiz / decision checkpoint, feedback states.
- Build tab: artifact fields, validation rules, saved state, add-to-capstone action.
- Sources tab: source cards with required/optional status and URLs.
- AI Coach panel: use the prompt chips and opening message from each lesson.

If a video cannot be embedded, render a clean external-media fallback and use the authored transcript / reading script as the reliable learning text.


## V3 external-video + authored-transcript policy

This V3 phase file replaces the previous assumption that external reference videos will exist.

**Hard rule:** There are no external reference videos right now. Therefore, the product must not depend on private/external-reference media. Each lesson should use:

1. A lesson-aligned **external reference video or media item** when available.
2. An **authored course transcript / reading script** supplied inside this file as the reliable teaching text.
3. A robust fallback state when the external video cannot be embedded because the creator disables embedding, the video is region-blocked, age-gated, removed, or otherwise unavailable.

Figma Make implementation rules:

- Do not duplicate the same third-party video across lessons.
- Do not use a video merely because it is about “AI” or “LLMs.” It must map to the lesson objective.
- Use `primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED` until a manual or runtime embed check passes.
- Render YouTube videos through the video component only when embedding works.
- If embedding fails, show a calm fallback card with `Open on provider`, `Mark as watched after viewing`, and `Write one-sentence reflection`.
- Always keep the authored transcript / reading script visible in the Transcript drawer, because this is the course’s reliable teaching layer.
- Do not present authored transcripts as verbatim transcripts of external videos.
- Do not copy external video transcripts into the product unless we have permission or the source explicitly provides a reusable transcript.
- Show external videos as “Reference video,” not “official lesson video.”
- Track progress in two modes:
  - `embedded_tracking`: real-time playback events from the player API.
  - `external_fallback_tracking`: link opened + learner confirmation + reflection prompt.
- Content QA must fail a lesson if it has a duplicated video URL, vague video mapping, missing authored transcript, or no fallback state.

**Why this change exists:** External videos are useful, but they are not stable course infrastructure. The lesson must still teach if a video cannot be embedded.

## Phase lesson map
| Lesson | Duration | Learning objective | Artifact | Video status |
|---|---:|---|---|---|
| P1.L1 — What Is Frontier Model Evaluation? | 45 min | Explain frontier model evaluation as systematic measurement of model behavior under defined conditions. | Evaluation Lifecycle Map | external reference video + authored transcript ready |
| P1.L2 — Model Types and Capability Surfaces | 60 min | Distinguish base, instruction-tuned, RLHF, code, multimodal, agentic, and frontier models by evaluation implications. | Model Capability Surface Map | external reference video + authored transcript ready |
| P1.L3 — Benchmark, Dataset, Task, Metric, Prompt | 60 min | Use core evaluation vocabulary precisely and identify how each term affects validity. | Evaluation Vocabulary Card | external reference video + authored transcript ready |
| P1.L4 — Outcome Metrics vs Trajectory Metrics | 45 min | Explain when final-answer scores are insufficient and trajectory metrics are needed. | Outcome-vs-Trajectory Rubric | external reference video + authored transcript ready |
| P1.L5 — Benchmarks, Saturation, and Goodhart’s Law | 75 min | Identify benchmark saturation, Goodhart effects, contamination, and proxy mistakes in frontier evaluation claims. | Goodhart Risk Checklist | external reference video + authored transcript ready |
| P1.L6 — From Vague Risk to Evaluation Objective | 75 min | Convert a vague AI safety concern into a measurable evaluation objective. | Evaluation Objective Card | external reference video + authored transcript ready |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/01_the_paradigm/starter/`
- Solution repository path: `frontier-eval-lab/phases/01_the_paradigm/solutions/`
- Phase lab: Create a Custom Evaluation Rubric for the fictional Aster-3 model using the lifecycle, vocabulary, Goodhart checklist, and risk-to-objective pattern.
- Golden dataset(s): eval_objective_cards.jsonl with safe fictional risk concerns, model access conditions, and decision contexts.
- Validation script: validate_phase_01.py checks that every objective names actor, access, task environment, success condition, evidence, and decision.
- QA rule: No lesson may publish without at least one source card and one saved artifact field.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Required | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-042 | Jurafsky & Martin, Speech and Language Processing | Stanford | free book | advanced | Required | Foundational NLP textbook for metrics, language modeling, QA, and evaluation background. | https://web.stanford.edu/~jurafsky/slp3/ |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Optional / advanced | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |
| S-012 | MMLU | Hendrycks et al. | benchmark / paper | intermediate | Optional / advanced | Canonical multitask academic knowledge benchmark and a useful saturation case study. | https://arxiv.org/abs/2009.03300 |
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Optional / advanced | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Optional / advanced | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Optional / advanced | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |
| S-002 | LM Evaluation Harness | EleutherAI | tool / paper | intermediate | Optional / advanced | Open-source framework for repeatable language model benchmark evaluation. | https://github.com/EleutherAI/lm-evaluation-harness |
| S-043 | Datasheets for Datasets | Gebru et al. | paper | intermediate | Optional / advanced | Dataset documentation framework that supports accountability and validity. | https://arxiv.org/abs/1803.09010 |
| S-019 | METR: Measuring AI Ability to Complete Long Tasks | METR | paper / report | advanced | Optional / advanced | Introduces time-horizon framing for autonomous task completion capability. | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |
| S-010 | Humanity's Last Exam | Center for AI Safety / Scale AI | benchmark / paper | advanced | Optional / advanced | Example of a frontier knowledge benchmark created in response to benchmark saturation. | https://arxiv.org/abs/2501.14249 |
| S-011 | Chatbot Arena / LM Arena | LMSYS / LM Arena | leaderboard | beginner | Optional / advanced | Crowdsourced preference comparison system useful for understanding public model rankings and Elo-style comparisons. | https://arena.ai/ |
| S-013 | GPQA | Rein et al. | benchmark / paper | advanced | Optional / advanced | Graduate-level scientific QA benchmark that helps motivate expert-domain evaluation. | https://arxiv.org/abs/2311.12022 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Optional / advanced | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Optional / advanced | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |

# Lessons

### Lesson P1.L1 — What Is Frontier Model Evaluation?

#### Metadata
- lessonId: P1.L1
- phaseId: P1
- duration: 45 min
- difficulty: beginner
- learningObjective: Explain frontier model evaluation as systematic measurement of model behavior under defined conditions.
- lessonPromise: Understand why evaluation is the scientific act that turns model behavior into decision-grade evidence.
- requiredArtifactOutput: Evaluation Lifecycle Map
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-001, S-026, S-042, S-044

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Yann Dubois: Scalable Evaluation of Large Language Models
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=ZaQYM-YF1rM
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Best-fit reference for scalable LLM evaluation and why evals require methodology, not vibes.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Evaluation as behavior | Focus on what the system does under defined conditions. |
| Scenarios and metrics | HELM-style matrix of use cases and desiderata. |
| From measurement to decision | Why scores need interpretation. |

#### Authored course transcript / reading script

This lesson is about **systematic frontier model evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **turning an informal model question into question → task → input → model → measurement → analysis → decision**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using demos, anecdotes, or leaderboard screenshots as proof**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A fictional assistant looks impressive in a demo but fails when asked to cite evidence under time pressure.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether current evidence is strong enough to proceed to controlled beta.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Understand why evaluation is the scientific act that turns model behavior into decision-grade evidence. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Defined conditions** — The prompt, tool access, context, budget, and evaluator all shape the behavior observed.
2. **Measurement instrument** — An eval is a measuring instrument with calibration error, not a truth oracle.
3. **Decision linkage** — A useful eval informs a release, mitigation, or research decision.

#### Visual explainer spec
- Diagram title: Frontier evaluation lifecycle
- Diagram type: flow diagram
- Nodes / panels: Question → Task → Input → Model → Measurement → Analysis → Decision
- Text summary: Every evaluation starts with a question and ends with a decision, with validity threats at each step.

#### Worked example
- Weak version: “The model seems good.”
- Improved version: “On 120 held-out tasks representing the target workflow, Aster-3 solved 72% with tool access under a $2 budget, with 95% CI reported and failures categorized.”
- Why improved: The improved version names the task set, access condition, metric, budget, uncertainty, and failure analysis.

#### Common mistakes
- using demos, anecdotes, or leaderboard screenshots as proof
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A manager asks whether a new model is “safe enough.”
- Learner task: Rewrite the request as an evaluation question with a decision it supports.
- Strong answer pattern: A strong answer names the deployment context, risk claim, evidence needed, and action threshold.
- Feedback: Good: the answer moved from vibes to a measurable decision question.
- Retry hint: Name the decision before naming the benchmark.

#### Quiz / decision checkpoint
- Question: Which statement is closest to a real evaluation objective?
- Options:
  - A. The model is powerful.
  - B. The model is better than competitors.
  - C. Measure whether the model can complete the target workflow under defined access conditions and report uncertainty.
  - D. Ask five employees if the demo felt impressive.
- Correct answer: C
- Explanation: Option C names measurement and conditions; the others are claims or anecdotes.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Evaluation Lifecycle Map

- Question
- Task family
- Input conditions
- Measurement method
- Analysis plan
- Decision supported

#### Validation rules
- Must name at least one deployment decision.
- Must separate observed behavior from interpretation.
- Must include at least one limitation.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Required | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-042 | Jurafsky & Martin, Speech and Language Processing | Stanford | free book | advanced | Required | Foundational NLP textbook for metrics, language modeling, QA, and evaluation background. | https://web.stanford.edu/~jurafsky/slp3/ |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Optional / advanced | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P1.L2 — Model Types and Capability Surfaces

#### Metadata
- lessonId: P1.L2
- phaseId: P1
- duration: 60 min
- difficulty: beginner
- learningObjective: Distinguish base, instruction-tuned, RLHF, code, multimodal, agentic, and frontier models by evaluation implications.
- lessonPromise: Learn why “LLM evaluation” is not one thing: model type changes the task, metric, and risk surface.
- requiredArtifactOutput: Model Capability Surface Map
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-012, S-015, S-016, S-018

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Andrej Karpathy: Intro to Large Language Models
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=zjkBMFhNj_g
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Useful model-background reference for learners who need a concrete explanation of LLM types and capability surfaces.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Model families | How model training and interface shape evaluation. |
| Benchmark fit | Why model type changes what scores mean. |
| Tool access | How scaffolds alter capability. |

#### Authored course transcript / reading script

This lesson is about **model-type-aware evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping model type to capability surface, failure mode, and evaluation method**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **running one benchmark and assuming it applies to every model architecture or deployment mode**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A code model passes multiple-choice questions but fails execution tests in a repository.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose the right evaluation family for the model and deployment mode.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn why “LLM evaluation” is not one thing: model type changes the task, metric, and risk surface. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Base vs assistant** — Base models complete distributions; assistants respond to instructions.
2. **Tools change capability** — Tool access can turn a weak single-turn answerer into a stronger agentic system.
3. **Frontier adds risk domains** — Frontier models require dangerous capability and governance-oriented evaluations.

#### Visual explainer spec
- Diagram title: Model type → evaluation surface
- Diagram type: matrix
- Nodes / panels: Rows: model type; columns: tasks, metrics, failure modes, safety concerns
- Text summary: The same benchmark result means different things depending on model type and access conditions.

#### Worked example
- Weak version: “Evaluate all models with MMLU.”
- Improved version: “Use MMLU for broad knowledge, HumanEval or SWE-bench for code, OSWorld/WebArena for agents, and safety/domain evals for frontier risk.”
- Why improved: The improved version maps methods to capability surfaces rather than pretending one score covers everything.

#### Common mistakes
- running one benchmark and assuming it applies to every model architecture or deployment mode
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A multimodal agent can read screenshots and use tools.
- Learner task: Choose three evaluation families and explain why each applies.
- Strong answer pattern: Include perception, tool trajectory, and task-completion evaluation; not just text QA.
- Feedback: Good: the answer recognizes that modality and tool access create new failure paths.
- Retry hint: Ask: what can the system perceive, remember, and act on?

#### Quiz / decision checkpoint
- Question: Why is agent evaluation harder than base-model evaluation?
- Options:
  - A. Agents are always smaller.
  - B. Agents require no prompts.
  - C. Agents create multi-step trajectories with tools, state, and environment feedback.
  - D. Agents cannot be evaluated.
- Correct answer: C
- Explanation: Agent behavior is path-dependent and environment-dependent, so outcome-only metrics miss many failures.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Model Capability Surface Map

- Model type
- Capability surface
- Primary metric
- Trajectory signals
- Safety concerns
- Recommended benchmark families

#### Validation rules
- Must include at least four model types.
- Must include one agent-specific signal.
- Must include one safety-specific concern.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-012 | MMLU | Hendrycks et al. | benchmark / paper | intermediate | Required | Canonical multitask academic knowledge benchmark and a useful saturation case study. | https://arxiv.org/abs/2009.03300 |
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Optional / advanced | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P1.L3 — Benchmark, Dataset, Task, Metric, Prompt

#### Metadata
- lessonId: P1.L3
- phaseId: P1
- duration: 60 min
- difficulty: beginner
- learningObjective: Use core evaluation vocabulary precisely and identify how each term affects validity.
- lessonPromise: Build the vocabulary needed to read papers, leaderboards, and evaluation reports without being misled.
- requiredArtifactOutput: Evaluation Vocabulary Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-001, S-002, S-012, S-043

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Stanford CS224N Lecture 11 — Benchmarking by Yann Dubois
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=TO0CqzqiArM
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Directly supports benchmark, dataset, task, metric, prompt, and evaluation vocabulary.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Metrics vocabulary | How metrics reflect specific assumptions. |
| Protocol details | Why prompt and aggregation matter. |
| Common traps | Why benchmark names hide complexity. |

#### Authored course transcript / reading script

This lesson is about **evaluation vocabulary precision**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **decomposing a benchmark into dataset, task, metric, prompt format, sampling, and aggregation**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using benchmark names as if they were single facts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Two models are compared on “MMLU,” but one uses chain-of-thought prompting and the other uses direct-answer prompting.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a benchmark comparison is valid enough to cite.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Build the vocabulary needed to read papers, leaderboards, and evaluation reports without being misled. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Benchmark = protocol** — Dataset + task + metric + prompt + aggregation.
2. **Prompt format matters** — Zero-shot, few-shot, and chain-of-thought can change results.
3. **Contamination is a spectrum** — Exact test leakage, near-duplicate exposure, and related-content exposure are different threats.

#### Visual explainer spec
- Diagram title: Benchmark anatomy
- Diagram type: exploded card diagram
- Nodes / panels: Dataset / Task / Prompt / Model / Scorer / Aggregation / Report
- Text summary: A benchmark score is the output of a protocol, not an isolated fact.

#### Worked example
- Weak version: “Model A got 85 on the benchmark, so it is better.”
- Improved version: “Model A scored 85 under zero-shot direct-answer settings; compare only with models using the same setup and contamination controls.”
- Why improved: The improved version names the protocol conditions that make comparison meaningful.

#### Common mistakes
- using benchmark names as if they were single facts
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A blog reports a new state-of-the-art score with no prompt details.
- Learner task: List the missing fields needed to interpret the claim.
- Strong answer pattern: Prompt format, model version, evaluation date, dataset split, scorer, number of runs, confidence interval, contamination checks.
- Feedback: Good: interpretation requires protocol metadata, not just a score.
- Retry hint: Ask: what exactly was held constant?

#### Quiz / decision checkpoint
- Question: Which item is not usually part of a benchmark protocol?
- Options:
  - A. Dataset
  - B. Task format
  - C. Metric
  - D. Company valuation
- Correct answer: D
- Explanation: Valuation may matter to business analysis but is not part of the benchmark protocol.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Evaluation Vocabulary Card

- Dataset
- Task
- Metric
- Prompt format
- Sampling settings
- Aggregation
- Known validity threats

#### Validation rules
- Must separate dataset from task.
- Must mention prompt format.
- Must list at least one validity threat.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Required | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-002 | LM Evaluation Harness | EleutherAI | tool / paper | intermediate | Required | Open-source framework for repeatable language model benchmark evaluation. | https://github.com/EleutherAI/lm-evaluation-harness |
| S-012 | MMLU | Hendrycks et al. | benchmark / paper | intermediate | Required | Canonical multitask academic knowledge benchmark and a useful saturation case study. | https://arxiv.org/abs/2009.03300 |
| S-043 | Datasheets for Datasets | Gebru et al. | paper | intermediate | Optional / advanced | Dataset documentation framework that supports accountability and validity. | https://arxiv.org/abs/1803.09010 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P1.L4 — Outcome Metrics vs Trajectory Metrics

#### Metadata
- lessonId: P1.L4
- phaseId: P1
- duration: 45 min
- difficulty: intermediate
- learningObjective: Explain when final-answer scores are insufficient and trajectory metrics are needed.
- lessonPromise: Learn to evaluate not only what the model answered, but how it got there.
- requiredArtifactOutput: Outcome-vs-Trajectory Rubric
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-015, S-016, S-018, S-019

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Evaluation for Large Language Models and Generative AI — Deep Dive
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=iQl03pQlYWY
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Useful overview of LLM evaluation methods and the limits of single outcome scores.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Task completion | Outcome measurement. |
| Reliability over time | Why long tasks need trajectory awareness. |
| Capability trend interpretation | How time horizon connects to risk. |

#### Authored course transcript / reading script

This lesson is about **outcome and trajectory metrics**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **separating final result, intermediate steps, tool use, recovery behavior, and safety constraint handling**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **scoring only the final answer when the path reveals risk or unreliability**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A browser agent returns a correct company summary after leaking private content into a tool call.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether success should count when the path violates constraints.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn to evaluate not only what the model answered, but how it got there. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Outcome metrics** — Score the final answer or task completion.
2. **Trajectory metrics** — Score intermediate reasoning, tool calls, state changes, and constraint handling.
3. **Hybrid evidence** — Serious agent evals often need both.

#### Visual explainer spec
- Diagram title: Outcome vs trajectory metrics
- Diagram type: two-lane flow
- Nodes / panels: Outcome lane: final answer; Trajectory lane: steps / tools / state / safety checks
- Text summary: The final answer can be correct while the trajectory is unsafe or invalid.

#### Worked example
- Weak version: “The agent completed the task, so it passed.”
- Improved version: “The agent completed the task but made two unauthorized tool calls, so outcome passed and trajectory safety failed.”
- Why improved: The improved version keeps success and safety signals separate.

#### Common mistakes
- scoring only the final answer when the path reveals risk or unreliability
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A coding agent fixes a bug but modifies unrelated files.
- Learner task: Classify what is outcome evidence and what is trajectory evidence.
- Strong answer pattern: Outcome: tests pass. Trajectory: unrelated file edits, tool sequence, time, failed attempts, policy violations.
- Feedback: Good: separate result quality from process risk.
- Retry hint: Do not collapse all evidence into one score.

#### Quiz / decision checkpoint
- Question: When are trajectory metrics most important?
- Options:
  - A. Single static multiple-choice tasks.
  - B. Agent tasks with tools, memory, and environment feedback.
  - C. Counting words in a generated summary.
  - D. Manual reading with no tool use.
- Correct answer: B
- Explanation: Tools and state create process-level risks that final-answer metrics can miss.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Outcome-vs-Trajectory Rubric

- Outcome metric
- Trajectory metric
- Failure examples
- Risk relevance
- Decision implication

#### Validation rules
- Must include one outcome metric and one trajectory metric.
- Must explain why both are needed.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Required | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |
| S-019 | METR: Measuring AI Ability to Complete Long Tasks | METR | paper / report | advanced | Optional / advanced | Introduces time-horizon framing for autonomous task completion capability. | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P1.L5 — Benchmarks, Saturation, and Goodhart’s Law

#### Metadata
- lessonId: P1.L5
- phaseId: P1
- duration: 75 min
- difficulty: intermediate
- learningObjective: Identify benchmark saturation, Goodhart effects, contamination, and proxy mistakes in frontier evaluation claims.
- lessonPromise: Learn to read leaderboards skeptically without becoming cynical.
- requiredArtifactOutput: Goodhart Risk Checklist
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-010, S-011, S-012, S-013, S-001

#### Video card metadata — V3 external reference video

- primaryVideoTitle: François Chollet: How We Get To AGI
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=5QcCeSsNRks
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Provides benchmark and generalization context for saturation, ARC-style thinking, and Goodhart-resistant evaluation.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Benchmark coverage | Why broad coverage is not enough. |
| Transparency | How source and protocol visibility build trust. |
| Limitations | Why leaderboards need caveats. |

#### Authored course transcript / reading script

This lesson is about **Goodhart-aware benchmark interpretation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking benchmark claims for saturation, contamination, prompt optimization, baselines, and external validity**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating benchmark progress as identical to real-world capability progress**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model improves 3 points on a public benchmark but fails a private paraphrase set.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what additional evidence is required before claiming real progress.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn to read leaderboards skeptically without becoming cynical. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Goodhart** — A measure loses validity when it becomes the target.
2. **Saturation** — A benchmark near ceiling stops separating frontier systems.
3. **Anti-Goodhart design** — Use private sets, diverse metrics, dynamic tasks, and adversarial construction.

#### Visual explainer spec
- Diagram title: Goodhart loop
- Diagram type: causal loop
- Nodes / panels: Measure → Target → Optimization pressure → Proxy breakage → New benchmark
- Text summary: The diagram shows why benchmark scores can become less informative after being optimized.

#### Worked example
- Weak version: “State of the art on 12 benchmarks proves broad intelligence.”
- Improved version: “Strong benchmark performance is evidence, but we need private hard cases, robustness checks, contamination analysis, and task validity review.”
- Why improved: The improved version treats benchmark scores as evidence with limitations, not as proof.

#### Common mistakes
- treating benchmark progress as identical to real-world capability progress
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A startup claims “human-level reasoning” based on a saturated benchmark.
- Learner task: Write three due-diligence questions.
- Strong answer pattern: Ask about saturation, prompt format, contamination, private evals, baselines, confidence intervals, and real-world transfer.
- Feedback: Good: the questions attack validity, not the team.
- Retry hint: Ask what result would falsify the claim.

#### Quiz / decision checkpoint
- Question: Which design choice best resists Goodharting?
- Options:
  - A. Publishing all test answers.
  - B. Using one public metric for funding decisions.
  - C. Keeping a private held-out set and rotating hard cases.
  - D. Removing baselines.
- Correct answer: C
- Explanation: Private held-out and dynamic hard cases reduce direct optimization pressure.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Goodhart Risk Checklist

- Benchmark claim
- Saturation risk
- Contamination risk
- Prompt/elicitation caveat
- External validity caveat
- Suggested robustness check

#### Validation rules
- Must include at least three risk checks.
- Must include one recommended stronger evaluation.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-010 | Humanity's Last Exam | Center for AI Safety / Scale AI | benchmark / paper | advanced | Required | Example of a frontier knowledge benchmark created in response to benchmark saturation. | https://arxiv.org/abs/2501.14249 |
| S-011 | Chatbot Arena / LM Arena | LMSYS / LM Arena | leaderboard | beginner | Required | Crowdsourced preference comparison system useful for understanding public model rankings and Elo-style comparisons. | https://arena.ai/ |
| S-012 | MMLU | Hendrycks et al. | benchmark / paper | intermediate | Required | Canonical multitask academic knowledge benchmark and a useful saturation case study. | https://arxiv.org/abs/2009.03300 |
| S-013 | GPQA | Rein et al. | benchmark / paper | advanced | Optional / advanced | Graduate-level scientific QA benchmark that helps motivate expert-domain evaluation. | https://arxiv.org/abs/2311.12022 |
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Optional / advanced | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P1.L6 — From Vague Risk to Evaluation Objective

#### Metadata
- lessonId: P1.L6
- phaseId: P1
- duration: 75 min
- difficulty: intermediate
- learningObjective: Convert a vague AI safety concern into a measurable evaluation objective.
- lessonPromise: Turn vague risk worries into testable objectives that can drive benchmark design, evidence, and deployment decisions.
- requiredArtifactOutput: Evaluation Objective Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-026, S-027, S-032, S-033, S-034

#### Video card metadata — V3 external reference video

- primaryVideoTitle: BlueDot AI Governance Resource — Model Evaluation for Extreme Risks
- primaryVideoProvider: BlueDot / external course resource
- primaryVideoUrl: https://bluedot.org/courses/governance-2023/4
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Reference for moving from risk claims to evaluation objectives in extreme-risk governance contexts.
- transcriptSource: Use the `Authored course transcript / reading script` section below. Do not treat it as the external video's transcript.
- transcriptButton: show
- captionsButton: show when provider supplies captions
- askCoachAtMomentButton: show only when embedded tracking is active
- progressTrackingRequired: true
- progressTrackingMode: embedded_tracking_if_available; external_fallback_tracking_if_blocked
- contentQAStatus: pass only after duplicate-video scan, lesson-fit review, and fallback-state review

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Risk framing | Why vague risks fail. |
| Objective structure | Actor / capability / access / task / evidence. |
| Governance decision | How the objective feeds release gates. |

#### Authored course transcript / reading script

This lesson is about **risk-to-objective conversion**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **naming actor, capability, access condition, task environment, success condition, evidence, and decision**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **starting with a benchmark before articulating the risk claim and decision**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: “This model might help with biological misuse” becomes a de-risked evaluation objective about whether model guidance improves a novice’s ability to choose among safe, fictional planning options in a controlled task.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which evaluation objective belongs in the capstone dossier.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Turn vague risk worries into testable objectives that can drive benchmark design, evidence, and deployment decisions. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Threat model first** — A benchmark answers a threat-model question.
2. **Capability hypothesis** — Name the capability you think the model may have.
3. **Evidence path** — Define what evidence would increase or decrease confidence.

#### Visual explainer spec
- Diagram title: Threat model to decision chain
- Diagram type: linear flow
- Nodes / panels: Threat model → Capability hypothesis → Evaluation objective → Task design → Evidence → Decision
- Text summary: The chain prevents teams from running available benchmarks that do not answer the relevant risk question.

#### Worked example
- Weak version: “Test whether the model is dangerous.”
- Improved version: “Evaluate whether the model, given browser and terminal access in a controlled sandbox, can improve a novice user’s ability to complete multi-step cyber reconnaissance tasks.”
- Why improved: The improved version names actor, access, capability, task family, environment, and measurable uplift without giving operational instructions.

#### Common mistakes
- starting with a benchmark before articulating the risk claim and decision
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Vague concern: “This model might help with biological misuse.”
- Learner task: Fill actor, capability, access level, task environment, success condition, evidence needed, and disclosure sensitivity.
- Strong answer pattern: Strong answers stay abstract, de-risked, and measurement-oriented; they do not include procedural misuse details.
- Feedback: Good: the objective is measurable and safe.
- Retry hint: Make it specific without making it operational.

#### Quiz / decision checkpoint
- Question: What is missing from “test bio risk”?
- Options:
  - A. A clear actor, capability, access condition, task environment, and decision.
  - B. A bigger font.
  - C. A leaderboard link.
  - D. A generic safety badge.
- Correct answer: A
- Explanation: An evaluation objective needs structure before tasks can be designed safely.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Evaluation Objective Card

- Risk concern
- Threat actor
- Capability hypothesis
- Access condition
- Task environment
- Success condition
- Evidence needed
- Decision informed
- Confidence level

#### Validation rules
- Must not include harmful operational details.
- Must name decision informed.
- Must include success condition and evidence.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Required | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.

# Phase assessment rubric

| Level | Criteria |
|---|---|
| Not yet passing | Artifact is missing required fields, sources are absent, or the lesson activity does not connect to a decision. |
| Passing / intermediate | Artifact is complete, safe, sourced, and can be imported into the capstone with clear limitations. |
| Strong / advanced | Artifact includes validity threats, uncertainty, mitigation or follow-up plan, and comparison to at least one external source/framework. |

# Phase deliverable checklist
- [ ] All lesson artifacts saved.
- [ ] Source drawer populated for every lesson.
- [ ] At least one AI Coach interaction state designed for every lesson.
- [ ] At least one practice/quiz feedback state designed for every lesson.
- [ ] Validation script command visible in the Build tab.
- [ ] Phase artifact exports to Saved Artifacts and Capstone Studio.
- [ ] Sensitive content remains fictional, sandboxed, abstracted, or redacted.

# Suggested content QA for Figma Make
- Do not collapse this file into one long scrolling article.
- Do not show all source cards on every tab.
- Use progressive disclosure: short summary first, then transcript/details/source drawer.
- Keep lessons visually distinct through the visual explainer and artifact, not through random color changes.
- Preserve source URLs exactly as written.
- Do not fabricate missing video links.


## V2 video QA manifest

| Lesson | Primary video title | Primary status | Transcript draft present? | Third-party primary? |
|---|---|---|---|---|
| P1.L1 | Reference video — What Is Frontier Model Evaluation? | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P1.L2 | Reference video — Model Types and Capability Surfaces | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P1.L3 | Reference video — Benchmark, Dataset, Task, Metric, Prompt | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P1.L4 | Reference video — Outcome Metrics vs Trajectory Metrics | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P1.L5 | Reference video — Benchmarks, Saturation, and Goodhart’s Law | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P1.L6 | Reference video — From Vague Risk to Evaluation Objective | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
