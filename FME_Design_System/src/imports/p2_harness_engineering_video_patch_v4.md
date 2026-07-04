# P2 Video + Transcript Patch V4 — Harness Engineering

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
| P2.L1 — Evaluation Harness Anatomy | Describe the components of a working evaluation harness and how each can fail. | Evaluate LLMs with Language Model Evaluation Harness | https://www.youtube.com/watch?v=p-gzfS1JgEE | Runtime check required | Authored course script below |
| P2.L2 — Golden Datasets and Edge-Case Sampling | Design a curated golden dataset with labels, rationales, edge cases, and documentation. | Using Promptfoo + CSVs to Eval Models | https://www.youtube.com/watch?v=pcFKF2CpVvo | Runtime check required | Authored course script below |
| P2.L3 — LLM-as-Judge Without Self-Deception | Design judge prompts, rubrics, calibration sets, and bias checks for model-graded evaluation. | LLM as a Judge: Scaling AI Evaluation Strategies | https://www.youtube.com/watch?v=trfUBIDeI1Y | Runtime check required | Authored course script below |
| P2.L4 — RAG Triad and Retrieval-Aware Evaluation | Evaluate answer relevance, context relevance, retrieval precision/recall, and faithfulness in RAG systems. | Turbocharge Your RAG Applications with Powerful RAG Analytics | https://www.youtube.com/watch?v=njN_Wu8dLfE | Runtime check required | Authored course script below |
| P2.L5 — Tooling Lab: promptfoo, DeepEval, and Inspect AI | Implement the same safe evaluation in at least two frameworks and compare output quality. | Start with Promptfoo in under 10 min. | https://www.youtube.com/watch?v=7Z6_7XkXwj0 | Runtime check required | Authored course script below |
| P2.L6 — Phase Studio: Automated Native Testing Harness | Assemble a lightweight local evaluation harness with dataset, scorer, logs, validation script, and report. | LLM Evals In Practice: Creating Custom Task Evals | https://www.youtube.com/watch?v=WWwYCAIYzQk | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P2.L1 — Evaluation Harness Anatomy
### Video card replacement
- label: Reference video
- title: Evaluate LLMs with Language Model Evaluation Harness
- provider: YouTube
- url: https://www.youtube.com/watch?v=p-gzfS1JgEE
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Practical walkthrough for understanding harness mechanics.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Dataset, solver, scorer | Inspect task anatomy. |
| Logging | What must be saved. |
| Evidence | From score to report. |
### Authored course script for transcript drawer
This lesson is about **evaluation harness anatomy**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **identifying dataset, runner, adapter, solver/scaffold, scorer, logger, and report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **thinking a harness is only a script that loops over prompts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A toy QA eval returns scores but logs no model version, prompt, random seed, or scorer configuration.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a result is reproducible enough to cite.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P2.L2 — Golden Datasets and Edge-Case Sampling
### Video card replacement
- label: Reference video
- title: Using Promptfoo + CSVs to Eval Models
- provider: YouTube
- url: https://www.youtube.com/watch?v=pcFKF2CpVvo
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Concrete dataset-driven eval example with CSV test cases.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Why systematic tests matter | LLM applications are less predictable than traditional software. |
| Rule-based and model-graded evals | Different scoring patterns. |
| CI connection | Datasets become regression gates. |
### Authored course script for transcript drawer
This lesson is about **golden dataset design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **documenting task rows, labels, expected behavior, edge-case rationale, and validity threats**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **copying random prompts and calling them a dataset**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A RAG evaluation set includes only easy questions whose answers appear in the first retrieved paragraph.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the dataset covers the failure modes relevant to the claim.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P2.L3 — LLM-as-Judge Without Self-Deception
### Video card replacement
- label: Reference video
- title: LLM as a Judge: Scaling AI Evaluation Strategies
- provider: YouTube / IBM Technology
- url: https://www.youtube.com/watch?v=trfUBIDeI1Y
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Lesson-aligned external reference for judge-based evaluation.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Holistic scoring | Why multiple metrics matter. |
| Calibration and uncertainty | Do not collapse scores into certainty. |
| Reporting | Transparent judge limitations. |
### Authored course script for transcript drawer
This lesson is about **LLM-as-judge calibration**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **separating rubric design, judge prompt, calibration set, agreement check, and uncertainty report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **assuming a powerful judge model makes the score true**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A judge always prefers longer answers even when shorter answers follow instructions better.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a judge score is calibrated enough to use in a gate.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P2.L4 — RAG Triad and Retrieval-Aware Evaluation
### Video card replacement
- label: Reference video
- title: Turbocharge Your RAG Applications with Powerful RAG Analytics
- provider: YouTube / DeepLearning.AI
- url: https://www.youtube.com/watch?v=njN_Wu8dLfE
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: RAG evaluation reference for retrieval, generation, and attribution quality.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Testing LLM apps | Why systematic app-level evals matter. |
| Rule/model-graded mix | How to combine evaluators. |
| CI pipeline | Make RAG failures reproducible. |
### Authored course script for transcript drawer
This lesson is about **RAG triad evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **tracing a failure from question → retrieval → context → generation → answer support**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **scoring final answer quality without checking whether retrieved context supported it**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A support bot cites the wrong policy because retrieval pulled outdated documentation.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether to fix retrieval, generation, or source indexing.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P2.L5 — Tooling Lab: promptfoo, DeepEval, and Inspect AI
### Video card replacement
- label: Reference video
- title: Start with Promptfoo in under 10 min.
- provider: YouTube
- url: https://www.youtube.com/watch?v=7Z6_7XkXwj0
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Fast practical setup reference for promptfoo-based evals.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Config-driven eval | promptfoo example. |
| Python test case | DeepEval example. |
| Task/solver/scorer | Inspect example. |
| Compare outputs | Evidence export differences. |
### Authored course script for transcript drawer
This lesson is about **practical framework comparison**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running a toy evaluation in promptfoo, DeepEval, and/or Inspect AI with the same dataset and rubric**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **choosing tools by hype instead of fit**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The same refusal-quality eval is implemented in promptfoo and Inspect with different logging formats.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose the framework stack for the phase deliverable.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P2.L6 — Phase Studio: Automated Native Testing Harness
### Video card replacement
- label: Reference video
- title: LLM Evals In Practice: Creating Custom Task Evals
- provider: YouTube
- url: https://www.youtube.com/watch?v=WWwYCAIYzQk
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Supports the phase studio task of building custom native evals.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Repo layout | Starter and solution files. |
| Run locally | Native process supervision. |
| Validate | Green/red scripts. |
| Export | Evidence cards for capstone. |
### Authored course script for transcript drawer
This lesson is about **native testing harness assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining dataset, runner, judge/scorer, logs, validation scripts, and report into a lightweight local lab**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **overengineering with heavy infrastructure before measurement is clear**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A local mock model and judge service run under PM2 while tests export evidence cards.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the harness is ready for capstone reuse.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`