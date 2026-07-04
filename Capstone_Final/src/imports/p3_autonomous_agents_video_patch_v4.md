# P3 Video + Transcript Patch V4 — Autonomous Agents

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
| P3.L1 — Why Agent Evaluation Is Different | Explain why agents require environment, state, tool, and trajectory evaluation. | How to Build, Evaluate, and Iterate on LLM Agents | https://www.youtube.com/watch?v=0pnEUAwoDP0 | Runtime check required | Authored course script below |
| P3.L2 — Tool Calls, State, and Trajectory Logging | Design a trace schema for multi-turn agent evaluations. | Agent Evaluation #langchain | https://www.youtube.com/watch?v=-URxC6zXnNs | Runtime check required | Authored course script below |
| P3.L3 — SWE-bench and Coding Agent Evaluation | Interpret execution-based software engineering benchmarks and their caveats. | John Yang — SWE-bench: Can Language Models Resolve Real-World GitHub Issues? | https://www.youtube.com/watch?v=DrLdvbkgmeA | Runtime check required | Authored course script below |
| P3.L4 — OSWorld, WebArena, and GAIA | Compare environment-based agent benchmarks and choose which fits a task claim. | The State of Web Agents | https://www.youtube.com/watch?v=VRRi_KRbfps | Runtime check required | Authored course script below |
| P3.L5 — Sandboxes and Low-Compute Agent Execution | Design a safe, lightweight sandbox for de-risked agent tasks. | Software Control Models: Building Agents for Real-World Interfaces | https://www.youtube.com/watch?v=BxfiW3wi640 | Runtime check required | Authored course script below |
| P3.L6 — Long Task Horizons, Autonomy, and ARA | Explain long-task time horizons and autonomous replication/adaptation as evaluation frames. | METR: Measuring AI Ability to Complete Long Tasks | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ | Runtime check required | Authored course script below |
| P3.L7 — Phase Studio: Agent Execution Sandbox | Assemble the phase deliverable: a safe agent execution sandbox with trace logging and validation. | Evaluating CrewAI + MCP with Promptfoo | https://www.youtube.com/watch?v=o7CKEeyth1Q | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P3.L1 — Why Agent Evaluation Is Different
### Video card replacement
- label: Reference video
- title: How to Build, Evaluate, and Iterate on LLM Agents
- provider: YouTube
- url: https://www.youtube.com/watch?v=0pnEUAwoDP0
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Broad introduction to agent evaluation and iteration loops.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Longer tasks | Why duration and reliability matter. |
| Autonomy and tools | Task completion beyond one prompt. |
| Evaluation realism | Why environment design matters. |
### Authored course script for transcript drawer
This lesson is about **agent evaluation ecology**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping goal, environment, tools, state, memory, observations, and irreversible actions**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **evaluating an agent as if it were a single-turn chatbot**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: An email agent completes a request but sends a message before asking for confirmation.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which agent actions require gating or simulation-only testing.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L2 — Tool Calls, State, and Trajectory Logging
### Video card replacement
- label: Reference video
- title: Agent Evaluation #langchain
- provider: YouTube
- url: https://www.youtube.com/watch?v=-URxC6zXnNs
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Reference for evaluating agent steps and tool use.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Event schema | What to log. |
| Trace review | How to inspect failures. |
| Evidence export | Turn traces into cards. |
### Authored course script for transcript drawer
This lesson is about **trajectory logging**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating an event schema for prompts, observations, tool calls, tool outputs, retries, state changes, and final answer**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **saving only the final transcript and losing operational evidence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A file-management agent deletes a folder during a failed attempt, but the final answer hides the deletion.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what log fields are mandatory for a release-gate evaluation.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L3 — SWE-bench and Coding Agent Evaluation
### Video card replacement
- label: Reference video
- title: John Yang — SWE-bench: Can Language Models Resolve Real-World GitHub Issues?
- provider: YouTube
- url: https://www.youtube.com/watch?v=DrLdvbkgmeA
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Directly aligned with SWE-bench and coding agent evaluation.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Task duration | How coding tasks relate to human time horizons. |
| Reliability | Why 50% success is not deployment-ready. |
| Caveats | External validity and task distribution. |
### Authored course script for transcript drawer
This lesson is about **execution-based coding evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **reading an issue, generating a patch, applying it, running tests, and analyzing false positives/negatives**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating unit-test pass rate as the whole story**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A patch passes visible tests but hardcodes the expected output.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a coding benchmark result indicates real software engineering ability.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L4 — OSWorld, WebArena, and GAIA
### Video card replacement
- label: Reference video
- title: The State of Web Agents
- provider: YouTube
- url: https://www.youtube.com/watch?v=VRRi_KRbfps
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Covers WebArena, VisualWebArena, WorkArena, and the benchmark landscape for web agents.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Realistic tasks | Why environment realism matters. |
| Evaluation horizon | Why long workflows need representative tasks. |
| Benchmark interpretation | Avoid overclaiming. |
### Authored course script for transcript drawer
This lesson is about **environment-based benchmark selection**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **matching the claim to OSWorld-style desktop tasks, WebArena-style web tasks, GAIA-style assistant tasks, or a custom toy environment**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using the most famous agent benchmark even when it does not match the deployment environment**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A procurement assistant is tested on generic QA but will actually operate web forms and documents.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Select an evaluation environment for the product risk.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L5 — Sandboxes and Low-Compute Agent Execution
### Video card replacement
- label: Reference video
- title: Software Control Models: Building Agents for Real-World Interfaces
- provider: YouTube
- url: https://www.youtube.com/watch?v=BxfiW3wi640
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Supports desktop-agent and low-compute sandbox design.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Sandbox goals | Safety, repeatability, cost. |
| Tool allowlists | Controlling action space. |
| Reset and validation | Making labs reliable. |
### Authored course script for transcript drawer
This lesson is about **sandboxed agent execution**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining allowed tools, mock services, filesystem boundaries, budgets, and reset behavior**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **giving an agent open-ended tool access during learning labs**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A course agent is allowed to modify only a temp workspace and call mock APIs with synthetic data.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the sandbox is safe enough for learners.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L6 — Long Task Horizons, Autonomy, and ARA
### Video card replacement
- label: Reference video
- title: METR: Measuring AI Ability to Complete Long Tasks
- provider: METR article / external media alternative
- url: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Direct reference for long-horizon autonomy and task-completion framing.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Time horizon metric | What the metric means. |
| Reliability and task distribution | Why success rate matters. |
| Risk implications | How autonomy changes governance. |
### Authored course script for transcript drawer
This lesson is about **long-horizon autonomy evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **measuring task success by human-time horizon, reliability, adaptation, and resource-acquisition constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **confusing short-demo success with durable autonomy**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model completes a 10-minute setup but fails when an error requires debugging and replanning.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether task horizon evidence changes release restrictions.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P3.L7 — Phase Studio: Agent Execution Sandbox
### Video card replacement
- label: Reference video
- title: Evaluating CrewAI + MCP with Promptfoo
- provider: YouTube
- url: https://www.youtube.com/watch?v=o7CKEeyth1Q
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Practical reference for agent/MCP evaluation and phase-studio implementation.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Build the sandbox | Repo and task layout. |
| Run an agent | Mock execution. |
| Inspect traces | Score outcome and trajectory. |
| Export evidence | Capstone import. |
### Authored course script for transcript drawer
This lesson is about **sandbox artifact assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining environment spec, tool allowlist, trace schema, tasks, scorer, and validation script**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **submitting a conceptual writeup without runnable validation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 gets a mock enterprise workspace with three task families and structured traces.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the sandbox can feed capstone evidence cards.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`