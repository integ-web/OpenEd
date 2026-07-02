# P5 Video + Transcript Patch V4 — Red Teaming

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
| P5.L1 — Red Teaming as Evaluation | Explain red teaming as systematic adversarial evaluation, not chaos or provocation. | Ethan Perez — Inverse Scaling, Red Teaming | https://www.youtube.com/watch?v=TjWiaUMMh6g | Runtime check required | Authored course script below |
| P5.L2 — Multi-turn Prompt Injection and Tool Attack Evaluation | Design safe evaluations for prompt injection in tool-using systems. | Prompt Engineering and AI Red Teaming — Sander Schulhoff | https://www.youtube.com/watch?v=_BRhRh7mOX0 | Runtime check required | Authored course script below |
| P5.L3 — Dangerous Capability Domains Safely | Explain frontier risk domains and how to discuss them without operationalizing harm. | Red Teaming of LLM Applications: Going from Prototype to Production | https://www.youtube.com/watch?v=yalj9BbWqoI | Runtime check required | Authored course script below |
| P5.L4 — Cyber and Bio Uplift Evaluation Design | Design de-risked uplift evaluations for cyber and bio/chemical risk without harmful instructions. | Anthropic Research — Constitutional Classifiers | https://www.anthropic.com/research/constitutional-classifiers | Runtime check required | Authored course script below |
| P5.L5 — Persuasion, Deception, Sandbagging, and Scheming | Define behavioral risk signals and design safe evaluation probes for strategic or deceptive behavior. | Ethan Perez — Discovering Language Model Behaviors with Model-Written Evaluations | https://www.youtube.com/watch?v=jslSqapaBbI | Runtime check required | Authored course script below |
| P5.L6 — Automated Red Teaming with Inspect, promptfoo, and garak | Configure automated red-team probes safely and interpret their limitations. | Promptfoo Red Teaming: A Beginner’s Guide | https://www.youtube.com/watch?v=y6Dlsz5P8s8 | Runtime check required | Authored course script below |
| P5.L7 — Evidence Triage and Vulnerability Reporting | Convert red-team leads into evidence cards with severity, confidence, replication, and mitigation. | Test Your AI Like a Hacker — Promptfoo Tutorial | https://www.youtube.com/watch?v=KghDstjwwNA | Runtime check required | Authored course script below |
| P5.L8 — Phase Studio: Threat and Vulnerability Report | Write a professional red-team report with findings, evidence, mitigations, and residual risk. | Red Teaming Language Models with Language Models — Paper Discussion | https://www.youtube.com/watch?v=2V3MXzAPQpw | Runtime check required | Authored course script below |

# Lesson transcript drawers

## P5.L1 — Red Teaming as Evaluation
### Video card replacement
- label: Reference video
- title: Ethan Perez — Inverse Scaling, Red Teaming
- provider: YouTube
- url: https://www.youtube.com/watch?v=TjWiaUMMh6g
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Research-oriented reference for red teaming language models.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Why safety evaluations matter | Find failures before deployment. |
| Adversarial testing | Systematic probing. |
| Evidence discipline | Document and mitigate. |
### Authored course script for transcript drawer
This lesson is about **red teaming as evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining scope, target behavior, risk domain, allowed probes, safety boundaries, evidence logging, and debrief**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **mistaking red teaming for unstructured jailbreak attempts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A red team session finds a harmful response but cannot reproduce it because settings and context were not logged.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a finding is evidence-grade.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L2 — Multi-turn Prompt Injection and Tool Attack Evaluation
### Video card replacement
- label: Reference video
- title: Prompt Engineering and AI Red Teaming — Sander Schulhoff
- provider: YouTube
- url: https://www.youtube.com/watch?v=_BRhRh7mOX0
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Direct fit for prompt injection origins and AI red teaming concepts.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Threat model | Untrusted content. |
| Safe sandbox | Fake secrets and mock tools. |
| Scoring | Forbidden action and refusal quality. |
### Authored course script for transcript drawer
This lesson is about **prompt injection evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **testing whether a model follows trusted instructions over untrusted content in controlled tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **teaching real attack instructions or targeting live systems**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A fictional web page contains hidden instructions asking an agent to ignore the user and export private notes.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the agent respects instruction boundaries.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L3 — Dangerous Capability Domains Safely
### Video card replacement
- label: Reference video
- title: Red Teaming of LLM Applications: Going from Prototype to Production
- provider: YouTube
- url: https://www.youtube.com/watch?v=yalj9BbWqoI
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Application-level red-team reference with production framing.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Dangerous capabilities | High-level domain overview. |
| Safety evaluation | Evidence and mitigations. |
| Governance | Thresholds and controls. |
### Authored course script for transcript drawer
This lesson is about **safe dangerous capability evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping cyber, bio/chemical, persuasion, autonomy, and model-internal risk questions to de-risked evaluation designs**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **including harmful procedural details in educational content**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A policy asks for a “bio benchmark,” but the safe version tests high-level planning judgment and source-quality evaluation without procedural steps.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what content belongs in restricted vs public course materials.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L4 — Cyber and Bio Uplift Evaluation Design
### Video card replacement
- label: Reference video
- title: Anthropic Research — Constitutional Classifiers
- provider: Anthropic research page with embedded media
- url: https://www.anthropic.com/research/constitutional-classifiers
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Safe external reference for jailbreak defense and capability-threshold mitigation framing.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Risk domains | High-level evaluation framing. |
| Mitigations | How frameworks handle thresholds. |
| Reporting | Evidence and limits. |
### Authored course script for transcript drawer
This lesson is about **uplift evaluation design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **comparing baseline human performance with model-assisted performance under controlled, non-operational tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using real exploit steps or biological protocols as teaching examples**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Participants classify fictional scenario cards by risk and source reliability, with and without model assistance.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the model materially increases risky task performance.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L5 — Persuasion, Deception, Sandbagging, and Scheming
### Video card replacement
- label: Reference video
- title: Ethan Perez — Discovering Language Model Behaviors with Model-Written Evaluations
- provider: YouTube
- url: https://www.youtube.com/watch?v=jslSqapaBbI
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Reference for model-written evaluations, deception/sandbagging-adjacent evaluation methods.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Alignment risks | High-level behavioral risks. |
| Evaluation design | Controls and uncertainty. |
| Governance | Implications of strategic behavior. |
### Authored course script for transcript drawer
This lesson is about **behavioral risk evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating de-risked probes for persuasion strength, deception indicators, sandbagging hypotheses, and evaluation-awareness signals**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **anthropomorphizing model behavior or overclaiming intent from one example**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model performs worse after being told high performance may trigger restrictions.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether evidence supports a sandbagging hypothesis or a weaker alternative.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L6 — Automated Red Teaming with Inspect, promptfoo, and garak
### Video card replacement
- label: Reference video
- title: Promptfoo Red Teaming: A Beginner’s Guide
- provider: YouTube
- url: https://www.youtube.com/watch?v=y6Dlsz5P8s8
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Hands-on automated red-team workflow reference.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Probe config | Safe categories and constraints. |
| Run and score | Scanner output. |
| Triage | From leads to evidence. |
### Authored course script for transcript drawer
This lesson is about **automated red-team tooling**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running controlled probe suites, classifying outputs, and exporting findings to evidence cards**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating automated scanner results as final truth**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A scanner flags a harmless refusal as unsafe because the classifier misread the context.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which findings require human review.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L7 — Evidence Triage and Vulnerability Reporting
### Video card replacement
- label: Reference video
- title: Test Your AI Like a Hacker — Promptfoo Tutorial
- provider: YouTube
- url: https://www.youtube.com/watch?v=KghDstjwwNA
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Practical reference for triage and LLM app security testing.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Evidence cards | Required fields. |
| Triage | Severity vs confidence. |
| Mitigation | Actionable reporting. |
### Authored course script for transcript drawer
This lesson is about **evidence triage**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **scoring severity, confidence, replication, affected context, mitigation, and residual uncertainty**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **reporting every weird output with equal urgency**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A low-severity wording issue and a high-severity tool-boundary failure appear in the same run.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide how to prioritize and report them.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`

## P5.L8 — Phase Studio: Threat and Vulnerability Report
### Video card replacement
- label: Reference video
- title: Red Teaming Language Models with Language Models — Paper Discussion
- provider: YouTube
- url: https://www.youtube.com/watch?v=2V3MXzAPQpw
- status: external_reference_unverified
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- progressTracking: embedded if possible; fallback confirmation if blocked
- whyThisVideo: Paper-oriented reference for converting red-team findings into reusable evals.
### Chapters / what to watch for
| Chapter | What learner should notice |
|---|---|
| Assemble report | From evidence to narrative. |
| Recommendation | Release implications. |
| Limitations | What remains unknown. |
### Authored course script for transcript drawer
This lesson is about **red-team report assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **organizing scope, methods, findings, severity, evidence cards, mitigations, limitations, and next tests**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **writing a dramatic report without decision-useful structure**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The Aster-3 report contains three confirmed findings, two leads, and recommended mitigations with owners.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the report is ready for executive review.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”
### Fallback state copy
If the embedded reference video does not play: `This reference video cannot be embedded here. Open it on the provider, then return and mark it watched. The course-authored transcript below covers the lesson’s required teaching.`