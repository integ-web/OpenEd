# P1 Video + Transcript Patch V4 — The Paradigm

## Scope
Use this file only for the media and transcript pass. Do not redesign lessons, capstone, BYOK, navigation, colors, dashboard, or artifact builders.

## Non-negotiable media policy
- There are no course-owned videos.
- External videos are reference media, not official lesson videos.
- Do not duplicate the same media URL across lessons.
- Do not use a vague AI video; the media must map to the lesson objective.
- Do not copy or generate third-party video transcripts. Use the authored course script below in the transcript drawer.
- When an embed fails, show external fallback: Open on provider → Mark as watched → One-sentence reflection.

## Lesson media registry for this phase

| Lesson | Objective | Reference media | URL | Embed state | Reliable transcript |
|---|---|---|---|---|---|
| P1.L1 — What Is Frontier Model Evaluation? | Explain frontier model evaluation as systematic measurement of model behavior under defined conditions. | Yann Dubois: Scalable Evaluation of Large Language Models | https://www.youtube.com/watch?v=ZaQYM-YF1rM | Runtime check required | Authored course script below |
| P1.L2 — Model Types and Capability Surfaces | Distinguish base, instruction-tuned, RLHF, code, multimodal, agentic, and frontier models by evaluation implications. | Andrej Karpathy: Intro to Large Language Models | https://www.youtube.com/watch?v=zjkBMFhNj_g | Runtime check required | Authored course script below |
| P1.L3 — Benchmark, Dataset, Task, Metric, Prompt | Use core evaluation vocabulary precisely and identify how each term affects validity. | Stanford CS224N Lecture 11 — Benchmarking by Yann Dubois | https://www.youtube.com/watch?v=TO0CqzqiArM | Runtime check required | Authored course script below |
| P1.L4 — Outcome Metrics vs Trajectory Metrics | Explain when final-answer scores are insufficient and trajectory metrics are needed. | Evaluation for Large Language Models and Generative AI — Deep Dive | https://www.youtube.com/watch?v=iQl03pQlYWY | Runtime check required | Authored course script below |
| P1.L5 — Benchmarks, Saturation, and Goodhart’s Law | Identify benchmark saturation, Goodhart effects, contamination, and proxy mistakes in frontier evaluation claims. | François Chollet: How We Get To AGI | https://www.youtube.com/watch?v=5QcCeSsNRks | Runtime check required | Authored course script below |
| P1.L6 — From Vague Risk to Evaluation Objective | Convert a vague AI safety concern into a measurable evaluation objective. | BlueDot AI Governance Resource — Model Evaluation for Extreme Risks | https://bluedot.org/courses/governance-2023/4 | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P1.L1 — What Is Frontier Model Evaluation?
### Video card replacement
- label: Reference video
- title: Yann Dubois: Scalable Evaluation of Large Language Models
- provider: YouTube
- url: https://www.youtube.com/watch?v=ZaQYM-YF1rM
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Best-fit reference for scalable LLM evaluation and why evals require methodology, not vibes.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Evaluation as behavior | Focus on what the system does under defined conditions. |
| Scenarios and metrics | HELM-style matrix of use cases and desiderata. |
| From measurement to decision | Why scores need interpretation. |
### Authored course script for transcript drawer
This lesson is about **systematic frontier model evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **turning an informal model question into question → task → input → model → measurement → analysis → decision**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using demos, anecdotes, or leaderboard screenshots as proof**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A fictional assistant looks impressive in a demo but fails when asked to cite evidence under time pressure.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether current evidence is strong enough to proceed to controlled beta.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P1.L2 — Model Types and Capability Surfaces
### Video card replacement
- label: Reference video
- title: Andrej Karpathy: Intro to Large Language Models
- provider: YouTube
- url: https://www.youtube.com/watch?v=zjkBMFhNj_g
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Useful model-background reference for learners who need a concrete explanation of LLM types and capability surfaces.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Model families | How model training and interface shape evaluation. |
| Benchmark fit | Why model type changes what scores mean. |
| Tool access | How scaffolds alter capability. |
### Authored course script for transcript drawer
This lesson is about **model-type-aware evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping model type to capability surface, failure mode, and evaluation method**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **running one benchmark and assuming it applies to every model architecture or deployment mode**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A code model passes multiple-choice questions but fails execution tests in a repository.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose the right evaluation family for the model and deployment mode.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P1.L3 — Benchmark, Dataset, Task, Metric, Prompt
### Video card replacement
- label: Reference video
- title: Stanford CS224N Lecture 11 — Benchmarking by Yann Dubois
- provider: YouTube
- url: https://www.youtube.com/watch?v=TO0CqzqiArM
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Directly supports benchmark, dataset, task, metric, prompt, and evaluation vocabulary.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Metrics vocabulary | How metrics reflect specific assumptions. |
| Protocol details | Why prompt and aggregation matter. |
| Common traps | Why benchmark names hide complexity. |
### Authored course script for transcript drawer
This lesson is about **evaluation vocabulary precision**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **decomposing a benchmark into dataset, task, metric, prompt format, sampling, and aggregation**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using benchmark names as if they were single facts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Two models are compared on “MMLU,” but one uses chain-of-thought prompting and the other uses direct-answer prompting.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a benchmark comparison is valid enough to cite.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P1.L4 — Outcome Metrics vs Trajectory Metrics
### Video card replacement
- label: Reference video
- title: Evaluation for Large Language Models and Generative AI — Deep Dive
- provider: YouTube
- url: https://www.youtube.com/watch?v=iQl03pQlYWY
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Useful overview of LLM evaluation methods and the limits of single outcome scores.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Task completion | Outcome measurement. |
| Reliability over time | Why long tasks need trajectory awareness. |
| Capability trend interpretation | How time horizon connects to risk. |
### Authored course script for transcript drawer
This lesson is about **outcome and trajectory metrics**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **separating final result, intermediate steps, tool use, recovery behavior, and safety constraint handling**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **scoring only the final answer when the path reveals risk or unreliability**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A browser agent returns a correct company summary after leaking private content into a tool call.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether success should count when the path violates constraints.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P1.L5 — Benchmarks, Saturation, and Goodhart’s Law
### Video card replacement
- label: Reference video
- title: François Chollet: How We Get To AGI
- provider: YouTube
- url: https://www.youtube.com/watch?v=5QcCeSsNRks
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Provides benchmark and generalization context for saturation, ARC-style thinking, and Goodhart-resistant evaluation.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Benchmark coverage | Why broad coverage is not enough. |
| Transparency | How source and protocol visibility build trust. |
| Limitations | Why leaderboards need caveats. |
### Authored course script for transcript drawer
This lesson is about **Goodhart-aware benchmark interpretation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking benchmark claims for saturation, contamination, prompt optimization, baselines, and external validity**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating benchmark progress as identical to real-world capability progress**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model improves 3 points on a public benchmark but fails a private paraphrase set.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what additional evidence is required before claiming real progress.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P1.L6 — From Vague Risk to Evaluation Objective
### Video card replacement
- label: Reference video
- title: BlueDot AI Governance Resource — Model Evaluation for Extreme Risks
- provider: BlueDot / external course resource
- url: https://bluedot.org/courses/governance-2023/4
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Reference for moving from risk claims to evaluation objectives in extreme-risk governance contexts.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Risk framing | Why vague risks fail. |
| Objective structure | Actor / capability / access / task / evidence. |
| Governance decision | How the objective feeds release gates. |
### Authored course script for transcript drawer
This lesson is about **risk-to-objective conversion**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **naming actor, capability, access condition, task environment, success condition, evidence, and decision**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **starting with a benchmark before articulating the risk claim and decision**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: “This model might help with biological misuse” becomes a de-risked evaluation objective about whether model guidance improves a novice’s ability to choose among safe, fictional planning options in a controlled task.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which evaluation objective belongs in the capstone dossier.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`