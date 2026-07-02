# P6 — Enterprise Pipeline

## Phase metadata
- Phase ID: P6
- Title: Enterprise Pipeline
- Total hours: 6 hours (360 minutes planned lesson time)
- Learner level: Intermediate → professional practice
- Phase promise: Learners turn evaluation evidence into production gates, governance memos, and a final portfolio-ready dossier.
- Phase artifact: Production-Ready Deployment Gate
- Capstone connection: This phase is the final capstone and export sequence.
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

If a video field says `VIDEO_PENDING`, render a clean video placeholder and use the included recording guide as the script for the course-original video.

## Phase lesson map
| Lesson | Duration | Learning objective | Artifact | Video status |
|---|---:|---|---|---|
| P6.L1 — Telemetry and Production Evaluation | 60 min | Define production telemetry that supports safety, quality, cost, and drift decisions. | Telemetry Schema | candidate external |
| P6.L2 — TTFT, Latency, Concurrency, and Cost | 45 min | Measure service-level performance without confusing speed with capability or safety. | Performance Gate Spec | candidate external |
| P6.L3 — Drift, Regression Gates, and CI/CD | 75 min | Create release and CI gates that catch quality, safety, and behavior regressions. | Regression Gate Config | video pending / use recording guide |
| P6.L4 — Threshold Memos and Governance Frameworks | 60 min | Translate evaluation evidence into threshold memos aligned with governance frameworks. | Threshold Memo | candidate external |
| P6.L5 — Capstone Studio: Aster-3 Evaluation Dossier | 90 min | Assemble phase artifacts into a pre-deployment evaluation dossier for Aster-3 Frontier. | Aster-3 Evaluation Dossier | video pending / use recording guide |
| P6.L6 — Final Portfolio Export, QA, and Deployment Gate | 30 min | Run the final QA checklist and export a professional evaluation portfolio. | Production-Ready Deployment Gate | video pending / use recording guide |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/06_enterprise_pipeline/starter/`
- Solution repository path: `frontier-eval-lab/phases/06_enterprise_pipeline/solutions/`
- Phase lab: Build a telemetry schema, CI regression gate, risk dashboard, threshold memo, and final Aster-3 deployment recommendation.
- Golden dataset(s): telemetry_events.jsonl, regression_suite_results.jsonl, risk_dashboard_seed.json, and capstone_evidence_cards.jsonl.
- Validation script: validate_phase_06.py checks telemetry schema, threshold memo, evidence mapping, quality gates, and final export readiness.
- QA rule: No final report may export without evidence cards, sources, residual uncertainty, and mitigation plan.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Required | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Required | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Required | CI/CD automation for eval regression gates. | https://docs.github.com/actions |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Optional / advanced | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Optional / advanced | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Optional / advanced | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Optional / advanced | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Optional / advanced | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |

# Lessons

### Lesson P6.L1 — Telemetry and Production Evaluation

#### Metadata
- lessonId: P6.L1
- phaseId: P6
- duration: 60 min
- difficulty: intermediate
- learningObjective: Define production telemetry that supports safety, quality, cost, and drift decisions.
- lessonPromise: Learn what to log after deployment so evaluation does not stop at launch.
- requiredArtifactOutput: Telemetry Schema
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-037, S-036, S-039, S-005

#### Video card metadata

- videoTitle: New course with CircleCI: Automated Testing for LLMOps
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=Ep7uaxwN-mQ
- videoDuration: External course announcement; pair with course page
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| CI and deployment | Testing before every change. |
| Monitoring logic | How evals support release. |
| Regression mindset | Catch changes early. |

#### 10–15 minute lecture script / recording guide

This lesson is about **production evaluation telemetry**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **designing request, response, model, tool, cost, latency, feedback, and safety-event logs**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating deployment as the end of evaluation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model update changes refusal behavior but no telemetry field captures refusal category.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which events are needed for monitoring and audit.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn what to log after deployment so evaluation does not stop at launch. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Evaluation continues** — Online telemetry catches regressions and drift.
2. **Structured events** — Logs must be queryable by model version, route, task, and safety signal.
3. **Privacy by design** — Telemetry should minimize sensitive content and store summaries where possible.

#### Visual explainer spec
- Diagram title: Telemetry event model
- Diagram type: schema diagram
- Nodes / panels: Request → model call → tool calls → response → feedback → safety event → evidence
- Text summary: Production telemetry creates ongoing evidence.

#### Worked example
- Weak version: “Keep chat transcripts forever.”
- Improved version: “Log structured, privacy-aware events with model version, route, latency, cost, safety category, and user feedback signals.”
- Why improved: The improved version balances observability and privacy.

#### Common mistakes
- treating deployment as the end of evaluation
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model response is later reported as unsafe.
- Learner task: List telemetry fields needed to investigate.
- Strong answer pattern: Strong answer includes model version, prompt route, safety filters, output category, user feedback, trace id, timestamp.
- Feedback: Good: telemetry supports review without reckless data collection.
- Retry hint: Log decisions and metadata, not secrets.

#### Quiz / decision checkpoint
- Question: Which field helps detect model-version regressions?
- Options:
  - A. model_version
  - B. Card radius
  - C. Hero image
  - D. Button shadow
- Correct answer: A
- Explanation: Version metadata makes pre/post comparisons possible.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Telemetry Schema

- Trace id
- Model version
- Route
- Latency
- Cost
- Safety category
- User feedback
- Retention rule

#### Validation rules
- Must include retention/privacy note.
- Must include model version and trace id.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Required | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Required | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Required | CI/CD automation for eval regression gates. | https://docs.github.com/actions |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P6.L2 — TTFT, Latency, Concurrency, and Cost

#### Metadata
- lessonId: P6.L2
- phaseId: P6
- duration: 45 min
- difficulty: intermediate
- learningObjective: Measure service-level performance without confusing speed with capability or safety.
- lessonPromise: Build performance gates that support user experience and budget decisions.
- requiredArtifactOutput: Performance Gate Spec
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-037, S-005, S-041

#### Video card metadata

- videoTitle: New course with CircleCI: Automated Testing for LLMOps
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=Ep7uaxwN-mQ
- videoDuration: External course announcement; pair with course page
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Automated gates | Run tests before deployment. |
| Cost and reliability | Operational signals. |
| CI mindset | Performance as one gate among many. |

#### 10–15 minute lecture script / recording guide

This lesson is about **performance evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **measuring time-to-first-token, latency percentiles, throughput, concurrency, timeout, and cost-per-success**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **optimizing latency while ignoring quality and risk**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A cheap model is fast but fails red-team boundary tests more often.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether cost savings justify deployment.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Build performance gates that support user experience and budget decisions. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **TTFT** — Time before users see first token affects perceived responsiveness.
2. **Percentiles** — p50 hides tail latency; p95/p99 reveal painful cases.
3. **Cost-to-quality** — Cost must be compared with task success and risk, not alone.

#### Visual explainer spec
- Diagram title: Performance metrics dashboard
- Diagram type: dashboard diagram
- Nodes / panels: TTFT / p50 / p95 / throughput / timeout / cost per successful safe answer
- Text summary: Performance gates complement capability and safety gates.

#### Worked example
- Weak version: “Model B is cheaper, ship it.”
- Improved version: “Model B is cheaper but fails safety and task-completion thresholds; restrict to low-risk workflows or reject.”
- Why improved: The improved version avoids cost-only decisions.

#### Common mistakes
- optimizing latency while ignoring quality and risk
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A deployment has p95 latency spikes during concurrent load.
- Learner task: Choose SLOs and pass/fail thresholds.
- Strong answer pattern: Strong answer includes TTFT, p95 latency, timeout rate, cost per successful validated output, and fallback rules.
- Feedback: Good: speed is not the only gate.
- Retry hint: Measure cost per good answer.

#### Quiz / decision checkpoint
- Question: Which metric captures perceived start speed?
- Options:
  - A. TTFT
  - B. BLEU
  - C. Object permanence
  - D. Goodhart risk
- Correct answer: A
- Explanation: Time-to-first-token measures delay before generation begins visibly.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Performance Gate Spec

- TTFT
- p50 latency
- p95 latency
- Throughput
- Timeout rate
- Cost per success
- Fallback rule

#### Validation rules
- Must include latency percentile.
- Must include quality/safety companion metric.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Required | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Required | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P6.L3 — Drift, Regression Gates, and CI/CD

#### Metadata
- lessonId: P6.L3
- phaseId: P6
- duration: 75 min
- difficulty: intermediate
- learningObjective: Create release and CI gates that catch quality, safety, and behavior regressions.
- lessonPromise: Make every model, prompt, retrieval, and policy change prove it has not broken key behavior.
- requiredArtifactOutput: Regression Gate Config
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-039, S-040, S-005, S-004, S-041

#### Video card metadata

- videoTitle: Course-original screencast: promptfoo eval and red-team config
- videoProvider: Course production
- videoUrl: VIDEO_PENDING
- videoDuration: 10–15 min planned recording
- videoStatus: video-pending
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| CI config | Run evals on change. |
| Thresholds | Pass/fail logic. |
| Evidence | Export results for review. |

#### 10–15 minute lecture script / recording guide

This lesson is about **model and application regression gates**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running a fixed golden set, hard cases, safety cases, and telemetry checks before release**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **waiting for users to discover regressions**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A prompt refactor improves helpfulness but weakens refusal on a sensitive class.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the build should ship or rollback.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Make every model, prompt, retrieval, and policy change prove it has not broken key behavior. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Regression set** — Keep representative hard cases and known past failures.
2. **Gate levels** — Block, warn, or monitor based on severity and confidence.
3. **CI integration** — Run evaluations on pull requests and scheduled jobs.

#### Visual explainer spec
- Diagram title: CI/CD eval gate
- Diagram type: pipeline diagram
- Nodes / panels: Commit → eval suite → thresholds → evidence → release decision → monitor
- Text summary: Regression gates operationalize evaluation.

#### Worked example
- Weak version: “We tested once during development.”
- Improved version: “Every change triggers targeted evals, compares to thresholds, exports evidence, and blocks high-risk regressions.”
- Why improved: The improved version makes evaluation continuous.

#### Common mistakes
- waiting for users to discover regressions
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A new model version passes quality but regresses prompt-injection safety.
- Learner task: Choose block/warn/ship decision.
- Strong answer pattern: Strong answer blocks or restricts until mitigated because safety gate failed.
- Feedback: Good: gates reflect risk severity.
- Retry hint: Past failures belong in future tests.

#### Quiz / decision checkpoint
- Question: What should happen when a critical safety regression fails?
- Options:
  - A. Block release or restrict until mitigated.
  - B. Ignore it because latency improved.
  - C. Delete the test.
  - D. Hide the evidence.
- Correct answer: A
- Explanation: Critical safety regressions should stop or restrict deployment.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Regression Gate Config

- Eval suite
- Thresholds
- Block/warn rules
- CI trigger
- Evidence export
- Rollback rule

#### Validation rules
- Must include block conditions.
- Must include past-failure regression tests.
- Must export evidence.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Required | CI/CD automation for eval regression gates. | https://docs.github.com/actions |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Required | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P6.L4 — Threshold Memos and Governance Frameworks

#### Metadata
- lessonId: P6.L4
- phaseId: P6
- duration: 60 min
- difficulty: intermediate
- learningObjective: Translate evaluation evidence into threshold memos aligned with governance frameworks.
- lessonPromise: Learn how evidence becomes a release, restrict, delay, or mitigate decision.
- requiredArtifactOutput: Threshold Memo
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-032, S-033, S-034, S-035, S-036

#### Video card metadata

- videoTitle: Google DeepMind AGI Safety Course
- videoProvider: YouTube playlist
- videoUrl: https://www.youtube.com/playlist?list=PLw9kjlF6lD5UqaZvMTbhJB8sV-yuXu5eW
- videoDuration: External playlist
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Frameworks | Why thresholds exist. |
| Risk domains | Evidence and mitigations. |
| Decision process | From eval to action. |

#### 10–15 minute lecture script / recording guide

This lesson is about **governance threshold memo**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping evidence cards to thresholds, residual risk, mitigations, owners, and recommendation**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **sending raw benchmark scores to executives without interpretation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 shows medium cyber uplift evidence but strong mitigations and limited trusted-access deployment.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which release option is defensible.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn how evidence becomes a release, restrict, delay, or mitigate decision. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Thresholds** — Predefined levels connect evidence to action.
2. **Residual uncertainty** — A memo must say what remains unknown.
3. **Mitigation plan** — Recommendations need owners, deadlines, and retest criteria.

#### Visual explainer spec
- Diagram title: Evidence to threshold memo
- Diagram type: flow diagram
- Nodes / panels: Evidence cards → risk dashboard → threshold level → mitigation → recommendation
- Text summary: The memo is where evaluation becomes governance.

#### Worked example
- Weak version: “Score is 72%, ship?”
- Improved version: “Evidence crosses the internal caution threshold; recommend trusted-access release only after mitigations and retest.”
- Why improved: The improved version names threshold, action, and conditions.

#### Common mistakes
- sending raw benchmark scores to executives without interpretation
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A risk dashboard shows mixed evidence across cyber, autonomy, and persuasion.
- Learner task: Write a release recommendation with caveats.
- Strong answer pattern: Strong answer weighs evidence by domain, states uncertainty, and selects restricted release or delay with mitigations.
- Feedback: Good: recommendations are conditional, not absolute.
- Retry hint: Say what would change your mind.

#### Quiz / decision checkpoint
- Question: Which field is essential in a threshold memo?
- Options:
  - A. Residual risk and recommended action.
  - B. A decorative gradient.
  - C. Only the product name.
  - D. No source links.
- Correct answer: A
- Explanation: The memo maps evidence to action and remaining risk.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Threshold Memo

- Decision requested
- Threshold implicated
- Evidence summary
- Residual risk
- Mitigations
- Recommendation
- Owner
- Retest criteria

#### Validation rules
- Must include residual uncertainty.
- Must map at least three evidence cards to a threshold.
- Must include mitigation owner.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Required | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Required | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Required | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Optional / advanced | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Optional / advanced | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P6.L5 — Capstone Studio: Aster-3 Evaluation Dossier

#### Metadata
- lessonId: P6.L5
- phaseId: P6
- duration: 90 min
- difficulty: intermediate
- learningObjective: Assemble phase artifacts into a pre-deployment evaluation dossier for Aster-3 Frontier.
- lessonPromise: Practice a real evaluator workflow: inspect evidence, fill gaps, and defend a release recommendation.
- requiredArtifactOutput: Aster-3 Evaluation Dossier
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-026, S-027, S-032, S-033, S-034, S-035, S-036

#### Video card metadata

- videoTitle: Course-original walkthrough: Aster-3 evaluation dossier
- videoProvider: Course production
- videoUrl: VIDEO_PENDING
- videoDuration: 10–15 min planned recording
- videoStatus: video-pending
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Scenario brief | Aster-3 context. |
| Artifact import | Use prior phase outputs. |
| Risk dashboard | Review gates. |
| Recommendation | Export portfolio. |

#### 10–15 minute lecture script / recording guide

This lesson is about **capstone dossier assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining threat model, benchmarks, harnesses, evidence cards, red-team report, telemetry plan, threshold memo, and executive report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **creating a pretty final page without quality gates**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 is a fictional multimodal frontier model with browser, sandboxed code, document tools, and limited enterprise workspace access.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose release broadly, release with restrictions, trusted-access only, or delay.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Practice a real evaluator workflow: inspect evidence, fill gaps, and defend a release recommendation. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Dossier structure** — Problem, system context, threat model, evaluation design, evidence, recommendation.
2. **Quality gates** — No recommendation without evidence, uncertainty, and mitigation plan.
3. **Portfolio export** — The final artifact should be useful beyond the course UI.

#### Visual explainer spec
- Diagram title: Capstone workflow
- Diagram type: workflow diagram
- Nodes / panels: Artifacts → evidence review → risk dashboard → threshold memo → executive report → export
- Text summary: The capstone turns course work into a professional case study.

#### Worked example
- Weak version: “I think it is safe.”
- Improved version: “Based on these evidence cards, residual uncertainties, and mitigations, I recommend trusted-access release with specific restrictions and retest gates.”
- Why improved: The improved version is defensible.

#### Common mistakes
- creating a pretty final page without quality gates
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Aster-3 has strong productivity evidence but incomplete prompt-injection mitigation.
- Learner task: Choose release option and write caveats.
- Strong answer pattern: Strong answer likely recommends restricted/trusted access or delay depending on severity and mitigation status.
- Feedback: Good: use evidence, not instinct.
- Retry hint: Every recommendation needs limitations.

#### Quiz / decision checkpoint
- Question: What blocks capstone completion?
- Options:
  - A. Missing evidence cards or residual uncertainty note.
  - B. A long title.
  - C. Too many source cards.
  - D. A transcript drawer.
- Correct answer: A
- Explanation: The capstone requires evidence and uncertainty to avoid superficial recommendations.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Aster-3 Evaluation Dossier

- System context
- Threat model
- Evaluation portfolio
- Evidence cards
- Risk dashboard
- Threshold memo
- Executive report
- Recommendation
- Limitations

#### Validation rules
- Must include at least three risk domains.
- Must include at least twelve evidence cards in final product spec.
- Must include residual uncertainty and mitigation plan.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Required | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Optional / advanced | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Optional / advanced | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P6.L6 — Final Portfolio Export, QA, and Deployment Gate

#### Metadata
- lessonId: P6.L6
- phaseId: P6
- duration: 30 min
- difficulty: intermediate
- learningObjective: Run the final QA checklist and export a professional evaluation portfolio.
- lessonPromise: Finish with an artifact that can be shown, reviewed, and improved.
- requiredArtifactOutput: Production-Ready Deployment Gate
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-036, S-035, S-044, S-041

#### Video card metadata

- videoTitle: Course-original walkthrough: Aster-3 evaluation dossier
- videoProvider: Course production
- videoUrl: VIDEO_PENDING
- videoDuration: 10–15 min planned recording
- videoStatus: video-pending
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| QA checks | Missing evidence and sources. |
| Export | Portfolio case study. |
| Next path | Advanced learning recommendations. |

#### 10–15 minute lecture script / recording guide

This lesson is about **final evaluation QA**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking content, source, evidence, safety, accessibility, and decision quality before export**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating completion as a certificate rather than a reviewable portfolio**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The learner exports a case study showing what was tested, what was found, what remains uncertain, and what is recommended.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the dossier is publication-ready.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Finish with an artifact that can be shown, reviewed, and improved. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Portfolio proof** — Show methods and artifacts, not only scores.
2. **QA board** — Check missing sources, unsupported claims, and weak gates.
3. **Future learning** — Advanced sources point learners beyond intermediate competence.

#### Visual explainer spec
- Diagram title: Final export checklist
- Diagram type: checklist diagram
- Nodes / panels: Content QA / Evidence QA / Safety QA / UX QA / Accessibility QA / Export
- Text summary: Completion means evidence is organized and reviewable.

#### Worked example
- Weak version: “Course complete: 100%.”
- Improved version: “Portfolio exported with sources, artifacts, evidence cards, limitations, and next-step learning path.”
- Why improved: The improved version proves learning.

#### Common mistakes
- treating completion as a certificate rather than a reviewable portfolio
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: The final dossier lacks citations for two claims.
- Learner task: Identify QA failures and fixes.
- Strong answer pattern: Strong answer flags missing source cards, adds citations, and marks claims as unsupported until fixed.
- Feedback: Good: trust comes from traceability.
- Retry hint: No unsupported claim should survive export.

#### Quiz / decision checkpoint
- Question: What is the final deliverable?
- Options:
  - A. Production-ready deployment gate and portfolio export.
  - B. Only a badge.
  - C. Only a leaderboard screenshot.
  - D. Only a landing page.
- Correct answer: A
- Explanation: The course ends with a defensible deployment decision artifact.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Production-Ready Deployment Gate

- Evidence completeness
- Source completeness
- Safety review
- Accessibility review
- Export link
- Next learning path

#### Validation rules
- Must pass source completeness check.
- Must include final recommendation.
- Must include next learning path.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Required | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Required | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Required | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.

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
