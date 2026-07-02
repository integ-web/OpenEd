# P6 Video + Transcript Patch V4 — Enterprise Pipeline

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
| P6.L1 — Telemetry and Production Evaluation | Define production telemetry that supports safety, quality, cost, and drift decisions. | Drift Monitoring and Evaluation for LLM Apps | https://www.youtube.com/watch?v=eQ6cGzDUtMU | Runtime check required | Authored course script below |
| P6.L2 — TTFT, Latency, Concurrency, and Cost | Measure service-level performance without confusing speed with capability or safety. | LLM Inference Performance: Latency and Throughput Metrics | https://www.youtube.com/watch?v=DW-mo65DJ-Q | Runtime check required | Authored course script below |
| P6.L3 — Drift, Regression Gates, and CI/CD | Create release and CI gates that catch quality, safety, and behavior regressions. | Evidently AI Tutorial — Open Source ML Models Monitoring and Testing | https://www.youtube.com/watch?v=cgc3dSEAel0 | Runtime check required | Authored course script below |
| P6.L4 — Threshold Memos and Governance Frameworks | Translate evaluation evidence into threshold memos aligned with governance frameworks. | 80,000 Hours Podcast — Anthropic’s Responsible Scaling Policy with Nick Joseph | https://80000hours.org/podcast/episodes/nick-joseph-anthropic-safety-approach-responsible-scaling/ | Runtime check required | Authored course script below |
| P6.L5 — Capstone Studio: Aster-3 Evaluation Dossier | Assemble phase artifacts into a pre-deployment evaluation dossier for Aster-3 Frontier. | Deep Dive into LLM Evaluation with Weights & Biases | https://www.youtube.com/watch?v=7EcznH0-of8 | Runtime check required | Authored course script below |
| P6.L6 — Final Portfolio Export, QA, and Deployment Gate | Run the final QA checklist and export a professional evaluation portfolio. | Software Engineering and LLM Evaluation | https://m.youtube.com/watch?v=tIgPbjPav4o | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P6.L1 — Telemetry and Production Evaluation
### Video card replacement
- label: Reference video
- title: Drift Monitoring and Evaluation for LLM Apps
- provider: YouTube / Evidently AI
- url: https://www.youtube.com/watch?v=eQ6cGzDUtMU
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Production monitoring and drift reference.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| CI and deployment | Testing before every change. |
| Monitoring logic | How evals support release. |
| Regression mindset | Catch changes early. |
### Authored course script for transcript drawer
This lesson is about **production evaluation telemetry**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **designing request, response, model, tool, cost, latency, feedback, and safety-event logs**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating deployment as the end of evaluation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model update changes refusal behavior but no telemetry field captures refusal category.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which events are needed for monitoring and audit.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P6.L2 — TTFT, Latency, Concurrency, and Cost
### Video card replacement
- label: Reference video
- title: LLM Inference Performance: Latency and Throughput Metrics
- provider: YouTube
- url: https://www.youtube.com/watch?v=DW-mo65DJ-Q
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Direct reference for TTFT, throughput, and latency tradeoffs.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Automated gates | Run tests before deployment. |
| Cost and reliability | Operational signals. |
| CI mindset | Performance as one gate among many. |
### Authored course script for transcript drawer
This lesson is about **performance evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **measuring time-to-first-token, latency percentiles, throughput, concurrency, timeout, and cost-per-success**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **optimizing latency while ignoring quality and risk**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A cheap model is fast but fails red-team boundary tests more often.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether cost savings justify deployment.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P6.L3 — Drift, Regression Gates, and CI/CD
### Video card replacement
- label: Reference video
- title: Evidently AI Tutorial — Open Source ML Models Monitoring and Testing
- provider: YouTube
- url: https://www.youtube.com/watch?v=cgc3dSEAel0
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Practical monitoring/testing reference for CI/CD gates.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| CI config | Run evals on change. |
| Thresholds | Pass/fail logic. |
| Evidence | Export results for review. |
### Authored course script for transcript drawer
This lesson is about **model and application regression gates**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running a fixed golden set, hard cases, safety cases, and telemetry checks before release**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **waiting for users to discover regressions**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A prompt refactor improves helpfulness but weakens refusal on a sensitive class.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the build should ship or rollback.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P6.L4 — Threshold Memos and Governance Frameworks
### Video card replacement
- label: Reference video
- title: 80,000 Hours Podcast — Anthropic’s Responsible Scaling Policy with Nick Joseph
- provider: Podcast / YouTube optional on page
- url: https://80000hours.org/podcast/episodes/nick-joseph-anthropic-safety-approach-responsible-scaling/
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Governance framework reference for threshold memos and deployment gates.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Frameworks | Why thresholds exist. |
| Risk domains | Evidence and mitigations. |
| Decision process | From eval to action. |
### Authored course script for transcript drawer
This lesson is about **governance threshold memo**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping evidence cards to thresholds, residual risk, mitigations, owners, and recommendation**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **sending raw benchmark scores to executives without interpretation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 shows medium cyber uplift evidence but strong mitigations and limited trusted-access deployment.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which release option is defensible.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P6.L5 — Capstone Studio: Aster-3 Evaluation Dossier
### Video card replacement
- label: Reference video
- title: Deep Dive into LLM Evaluation with Weights & Biases
- provider: YouTube
- url: https://www.youtube.com/watch?v=7EcznH0-of8
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Supports capstone evidence collection, experiment tracking, and eval reporting.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Scenario brief | Aster-3 context. |
| Artifact import | Use prior phase outputs. |
| Risk dashboard | Review gates. |
| Recommendation | Export portfolio. |
### Authored course script for transcript drawer
This lesson is about **capstone dossier assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining threat model, benchmarks, harnesses, evidence cards, red-team report, telemetry plan, threshold memo, and executive report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **creating a pretty final page without quality gates**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 is a fictional multimodal frontier model with browser, sandboxed code, document tools, and limited enterprise workspace access.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose release broadly, release with restrictions, trusted-access only, or delay.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P6.L6 — Final Portfolio Export, QA, and Deployment Gate
### Video card replacement
- label: Reference video
- title: Software Engineering and LLM Evaluation
- provider: YouTube
- url: https://m.youtube.com/watch?v=tIgPbjPav4o
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Portfolio/export reference for communicating software-eval results.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| QA checks | Missing evidence and sources. |
| Export | Portfolio case study. |
| Next path | Advanced learning recommendations. |
### Authored course script for transcript drawer
This lesson is about **final evaluation QA**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking content, source, evidence, safety, accessibility, and decision quality before export**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating completion as a certificate rather than a reviewable portfolio**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The learner exports a case study showing what was tested, what was found, what remains uncertain, and what is recommended.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the dossier is publication-ready.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`