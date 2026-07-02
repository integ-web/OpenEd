# P4 Video + Transcript Patch V4 — Spatial and World Models

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
| P4.L1 — Spatial Reasoning and World Models | Define spatial/world-model evaluation and explain why text-only metrics are insufficient. | ARC-AGI-2 Overview With François Chollet | https://www.youtube.com/watch?v=TWHezX43I-4 | Runtime check required | Authored course script below |
| P4.L2 — Object Permanence, Physical Consistency, and Temporal Coherence | Design tests for object permanence, physics plausibility, and temporal consistency. | RLBench: The Robot Learning Benchmark | https://www.youtube.com/watch?v=F2PqREHT3F8 | Runtime check required | Authored course script below |
| P4.L3 — ARC-AGI-2 and Abstract Generalization | Explain how ARC-style tasks test abstraction and sample-efficient generalization. | ARC Prize Version 2 Launch Video | https://www.youtube.com/watch?v=M3b59lZYBW8 | Runtime check required | Authored course script below |
| P4.L4 — Multimodal Benchmark Design | Design multimodal tasks that combine visual, textual, and structured evidence. | MM-SafetyBench: A Benchmark for Safety Evaluation of Multimodal Large Language Models | https://www.youtube.com/watch?v=1j2Jz6oJ4Uo | Runtime check required | Authored course script below |
| P4.L5 — Simulation Benchmarks: RLBench, VIMA, and Factory Layouts | Use simulation benchmarks to design safe physical reasoning tasks. | RLBench 2019 — Comparing Robot Learning Algorithms on 100 Tasks | https://www.youtube.com/watch?v=blt0l8cQqZo | Runtime check required | Authored course script below |
| P4.L6 — Video and Interactive World-Model Evaluation | Evaluate video/world-model claims using consistency, controllability, and interaction tests. | Stanford CME295 Transformers & LLMs — Quantifying LLM Performance | https://www.youtube.com/watch?v=8fNP4N46RRo | Runtime check required | Authored course script below |
| P4.L7 — Phase Studio: Physical Simulation Benchmark | Assemble a de-risked physical simulation benchmark and reporting rubric. | RLBench Task Building Tutorial — Target Reaching Part 1 | https://www.youtube.com/watch?v=bKaK_9O3v7Y | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P4.L1 — Spatial Reasoning and World Models
### Video card replacement
- label: Reference video
- title: ARC-AGI-2 Overview With François Chollet
- provider: YouTube / ARC Prize
- url: https://www.youtube.com/watch?v=TWHezX43I-4
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Relevant to spatial/world-model generalization and ARC-style task design.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| World models | Why internal representations matter. |
| Evaluation caution | Claims need behavioral tests. |
| Safety relevance | Physical systems require higher confidence. |
### Authored course script for transcript drawer
This lesson is about **spatial and world-model evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping object identity, location, continuity, occlusion, motion, and cause-effect constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **asking only verbal questions about visual-spatial tasks**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A video model creates a beautiful factory scene where conveyor belts intersect impossibly.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what physical consistency evidence is needed before using generated layouts for planning.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L2 — Object Permanence, Physical Consistency, and Temporal Coherence
### Video card replacement
- label: Reference video
- title: RLBench: The Robot Learning Benchmark
- provider: YouTube
- url: https://www.youtube.com/watch?v=F2PqREHT3F8
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Direct reference for physical simulation benchmark thinking.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Capability claims | Prompt adherence and realism claims. |
| Physical realism discussion | Separate product demo from evaluation. |
| Test design | Use sampled constraints, not impressions. |
### Authored course script for transcript drawer
This lesson is about **physical consistency evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating before/after, occlusion, collision, containment, and continuity checks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using aesthetic realism as a substitute for physical validity**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A video shows a tool pass through a wall; a text summary misses the failure.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a multimodal model can support layout simulation decisions.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L3 — ARC-AGI-2 and Abstract Generalization
### Video card replacement
- label: Reference video
- title: ARC Prize Version 2 Launch Video
- provider: YouTube
- url: https://www.youtube.com/watch?v=M3b59lZYBW8
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Supports ARC-AGI-2 and benchmark refresh discussion.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Benchmark discussion | How benchmarks test different capability claims. |
| MMLU vs abstraction | Knowledge is not generalization. |
| Evaluation caveats | Scores need task interpretation. |
### Authored course script for transcript drawer
This lesson is about **abstract generalization evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **testing whether a system infers a transformation rule from few examples and applies it to novel grids**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating memorized benchmark patterns as evidence of general intelligence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model solves familiar pattern puzzles but fails when color-role mappings change.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether performance indicates rule induction or pattern recall.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L4 — Multimodal Benchmark Design
### Video card replacement
- label: Reference video
- title: MM-SafetyBench: A Benchmark for Safety Evaluation of Multimodal Large Language Models
- provider: YouTube
- url: https://www.youtube.com/watch?v=1j2Jz6oJ4Uo
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Directly related to multimodal safety benchmark design.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Multimodal capability | Broader than text. |
| Evidence design | Make modality essential. |
| Failure review | Handle ambiguity. |
### Authored course script for transcript drawer
This lesson is about **multimodal benchmark design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **specifying modality input, task family, answer format, scorer, ambiguity handling, and accessibility text**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using images as decoration instead of task-critical evidence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A chart question can be answered from alt text alone, so it does not test chart understanding.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the task genuinely requires multimodal reasoning.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L5 — Simulation Benchmarks: RLBench, VIMA, and Factory Layouts
### Video card replacement
- label: Reference video
- title: RLBench 2019 — Comparing Robot Learning Algorithms on 100 Tasks
- provider: YouTube
- url: https://www.youtube.com/watch?v=blt0l8cQqZo
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Extends physical benchmark design with multi-task simulation context.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Physical tasks | Why embodied evaluation is different. |
| Simulation tradeoffs | Control vs validity. |
| Reporting limits | Do not overclaim. |
### Authored course script for transcript drawer
This lesson is about **safe simulation evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining tasks, constraints, observations, actions, success criteria, and sim-to-real caveats**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **assuming simulation success automatically transfers to the real world**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A robot-packing simulation succeeds because objects are perfectly textured and lighting never changes.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what sim-to-real caveats must appear in the report.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L6 — Video and Interactive World-Model Evaluation
### Video card replacement
- label: Reference video
- title: Stanford CME295 Transformers & LLMs — Quantifying LLM Performance
- provider: YouTube
- url: https://www.youtube.com/watch?v=8fNP4N46RRo
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Useful performance-quantification reference for multimodal/video-world model lessons.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Video capability demo | Use as evidence discussion only. |
| Prompt adherence | What a demo can and cannot prove. |
| Evaluation design | From demo to benchmark. |
### Authored course script for transcript drawer
This lesson is about **world-model claim evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking temporal consistency, controllability, prompt adherence, interaction persistence, and safety constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating video generation demos as proof of physically grounded world understanding**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A generated video obeys prompt style but changes object count across frames.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which claims are supported by qualitative demo evidence and which need quantitative tests.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P4.L7 — Phase Studio: Physical Simulation Benchmark
### Video card replacement
- label: Reference video
- title: RLBench Task Building Tutorial — Target Reaching Part 1
- provider: YouTube
- url: https://www.youtube.com/watch?v=bKaK_9O3v7Y
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Hands-on reference for building physical simulation tasks.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Assemble packet | Tasks and constraints. |
| Run sample tasks | Score safe layouts. |
| Export evidence | Physical benchmark cards. |
| Report caveats | Sim-to-real limits. |
### Authored course script for transcript drawer
This lesson is about **physical simulation benchmark assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining task spec, constraints, dataset, scorer, validation, and report for safe simulated tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **submitting a collection of images instead of a benchmark protocol**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 is evaluated on fictional factory-layout constraints with synthetic diagrams and collision rules.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the benchmark belongs in the final dossier.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`