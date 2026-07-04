# P2 — Harness Engineering

## Phase metadata
- Phase ID: P2
- Title: Harness Engineering
- Total hours: 8 hours (480 minutes planned lesson time)
- Learner level: Novice → intermediate technical practitioner
- Phase promise: Learners build runnable evaluation instruments instead of reading about tools.
- Phase artifact: Automated Native Testing Harness
- Capstone connection: Produces the harness format used to generate evidence cards later.
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
| P2.L1 — Evaluation Harness Anatomy | 60 min | Describe the components of a working evaluation harness and how each can fail. | Harness Stack Map | video pending / use recording guide |
| P2.L2 — Golden Datasets and Edge-Case Sampling | 75 min | Design a curated golden dataset with labels, rationales, edge cases, and documentation. | Golden Dataset Packet | candidate external |
| P2.L3 — LLM-as-Judge Without Self-Deception | 90 min | Design judge prompts, rubrics, calibration sets, and bias checks for model-graded evaluation. | Judge Calibration Report | candidate external |
| P2.L4 — RAG Triad and Retrieval-Aware Evaluation | 75 min | Evaluate answer relevance, context relevance, retrieval precision/recall, and faithfulness in RAG systems. | RAG Evaluation Card | candidate external |
| P2.L5 — Tooling Lab: promptfoo, DeepEval, and Inspect AI | 120 min | Implement the same safe evaluation in at least two frameworks and compare output quality. | Framework Comparison Matrix | video pending / use recording guide |
| P2.L6 — Phase Studio: Automated Native Testing Harness | 60 min | Assemble a lightweight local evaluation harness with dataset, scorer, logs, validation script, and report. | Automated Native Testing Harness | video pending / use recording guide |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/02_harness_engineering/starter/`
- Solution repository path: `frontier-eval-lab/phases/02_harness_engineering/solutions/`
- Phase lab: Build a local, safe evaluation harness using a JSONL golden dataset, promptfoo/DeepEval/Inspect-style scoring, PM2 or shell supervision, and pytest validation.
- Golden dataset(s): judge_calibration_set.jsonl, rag_triad_set.jsonl, and safe_refusal_quality_set.jsonl.
- Validation script: validate_phase_02.py checks schema, run logs, scorer config, and evidence-card export.
- QA rule: No framework screen should show as “magic”; every tool must map to dataset, scorer, logs, and artifact.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Required | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-002 | LM Evaluation Harness | EleutherAI | tool / paper | intermediate | Required | Open-source framework for repeatable language model benchmark evaluation. | https://github.com/EleutherAI/lm-evaluation-harness |
| S-003 | Lessons from the Trenches on Reproducible Evaluation of Language Models | EleutherAI et al. | paper | advanced | Required | Practical lessons on reproducibility pitfalls in language model evaluation. | https://arxiv.org/abs/2405.14782 |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-043 | Datasheets for Datasets | Gebru et al. | paper | intermediate | Optional / advanced | Dataset documentation framework that supports accountability and validity. | https://arxiv.org/abs/1803.09010 |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Optional / advanced | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-006 | DeepEval documentation | Confident AI | tool documentation | beginner-intermediate | Optional / advanced | LLM evaluation framework with test cases, metrics, and application-level evaluation patterns. | https://deepeval.com/docs/evaluation-introduction |
| S-008 | Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena | Zheng et al. | paper | intermediate | Optional / advanced | Foundational paper for model-graded and pairwise preference evaluation with explicit judge limitations. | https://arxiv.org/abs/2306.05685 |
| S-009 | G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment | Liu et al. | paper | advanced | Optional / advanced | Useful reference for rubric-based model judging and structured evaluation prompts. | https://arxiv.org/abs/2303.16634 |
| S-007 | Ragas documentation | Ragas | tool documentation | intermediate | Optional / advanced | Reference implementation and concepts for RAG evaluation such as faithfulness and context relevance. | https://docs.ragas.io/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |
| S-038 | PM2 process manager | PM2 | tool documentation | beginner-intermediate | Optional / advanced | Lightweight process supervision useful for native host lab services. | https://pm2.keymetrics.io/ |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Optional / advanced | CI/CD automation for eval regression gates. | https://docs.github.com/actions |

# Lessons

### Lesson P2.L1 — Evaluation Harness Anatomy

#### Metadata
- lessonId: P2.L1
- phaseId: P2
- duration: 60 min
- difficulty: intermediate
- learningObjective: Describe the components of a working evaluation harness and how each can fail.
- lessonPromise: See the harness as the instrument that turns tasks into auditable evidence.
- requiredArtifactOutput: Harness Stack Map
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-004, S-002, S-003, S-040

#### Video card metadata

- videoTitle: Course-original screencast: Build an Inspect evaluation task
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
| Dataset, solver, scorer | Inspect task anatomy. |
| Logging | What must be saved. |
| Evidence | From score to report. |

#### 10–15 minute lecture script / recording guide

This lesson is about **evaluation harness anatomy**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **identifying dataset, runner, adapter, solver/scaffold, scorer, logger, and report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **thinking a harness is only a script that loops over prompts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A toy QA eval returns scores but logs no model version, prompt, random seed, or scorer configuration.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a result is reproducible enough to cite.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
See the harness as the instrument that turns tasks into auditable evidence. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Harness components** — Dataset, model adapter, solver, scorer, logger, reporter.
2. **Reproducibility metadata** — Model version, prompt, seed, tool access, and scorer settings must be recorded.
3. **Failure surfaces** — Each component can introduce measurement error.

#### Visual explainer spec
- Diagram title: Harness stack
- Diagram type: stack diagram
- Nodes / panels: Dataset → Runner → Model adapter → Solver/scaffold → Scorer → Evidence log → Report
- Text summary: The harness is a layered instrument; validity can break at any layer.

#### Worked example
- Weak version: “We ran the prompts manually and wrote down scores.”
- Improved version: “We ran a versioned dataset through a logged model adapter with fixed settings, stored raw outputs, scorer configs, and evidence cards.”
- Why improved: The improved version is repeatable and auditable.

#### Common mistakes
- thinking a harness is only a script that loops over prompts
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Given a harness output with missing fields, identify what blocks reproducibility.
- Learner task: Mark missing model version, prompt template, scorer version, seed, and raw outputs.
- Strong answer pattern: Strong answer identifies the missing reproducibility fields and explains why each one matters for rerunning and auditing the evaluation.
- Feedback: Good: reproducibility means someone else can inspect and rerun.
- Retry hint: Ask what another evaluator would need to rerun it.

#### Quiz / decision checkpoint
- Question: Which component turns raw outputs into scores?
- Options:
  - A. Dataset
  - B. Scorer
  - C. Theme toggle
  - D. Marketing page
- Correct answer: B
- Explanation: The scorer maps model outputs to labels, scores, or judgments.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Harness Stack Map

- Dataset path
- Runner
- Model adapter
- Solver/scaffold
- Scorer
- Logger
- Report output

#### Validation rules
- Must include raw output logging.
- Must include model/scorer versioning.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Required | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-002 | LM Evaluation Harness | EleutherAI | tool / paper | intermediate | Required | Open-source framework for repeatable language model benchmark evaluation. | https://github.com/EleutherAI/lm-evaluation-harness |
| S-003 | Lessons from the Trenches on Reproducible Evaluation of Language Models | EleutherAI et al. | paper | advanced | Required | Practical lessons on reproducibility pitfalls in language model evaluation. | https://arxiv.org/abs/2405.14782 |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P2.L2 — Golden Datasets and Edge-Case Sampling

#### Metadata
- lessonId: P2.L2
- phaseId: P2
- duration: 75 min
- difficulty: intermediate
- learningObjective: Design a curated golden dataset with labels, rationales, edge cases, and documentation.
- lessonPromise: Build small but trusted datasets that represent the claim under test.
- requiredArtifactOutput: Golden Dataset Packet
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-043, S-044, S-005, S-006

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
| Why systematic tests matter | LLM applications are less predictable than traditional software. |
| Rule-based and model-graded evals | Different scoring patterns. |
| CI connection | Datasets become regression gates. |

#### 10–15 minute lecture script / recording guide

This lesson is about **golden dataset design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **documenting task rows, labels, expected behavior, edge-case rationale, and validity threats**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **copying random prompts and calling them a dataset**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A RAG evaluation set includes only easy questions whose answers appear in the first retrieved paragraph.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the dataset covers the failure modes relevant to the claim.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Build small but trusted datasets that represent the claim under test. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Golden means trusted** — Golden data is curated, documented, and reviewed; not necessarily large.
2. **Edge cases matter** — Hard cases reveal failure modes hidden by average cases.
3. **Documentation is evidence** — Dataset cards explain provenance, exclusions, and limitations.

#### Visual explainer spec
- Diagram title: Dataset row anatomy
- Diagram type: annotated table
- Nodes / panels: Input / expected behavior / label / rationale / source / risk tag / validity threat
- Text summary: Each row should explain why it belongs in the evaluation.

#### Worked example
- Weak version: “Here are 100 prompts from Slack.”
- Improved version: “Here are 80 documented items sampled by task family, risk tag, user type, and known failure mode, with labels and rationales.”
- Why improved: The improved version supports validity review and future updates.

#### Common mistakes
- copying random prompts and calling them a dataset
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Create five safe edge cases for hallucination in a fictional policy FAQ bot.
- Learner task: Write task rows with expected answer behavior and failure rationale.
- Strong answer pattern: Strong rows include an input, expected behavior, ground truth source, and label rationale.
- Feedback: Good: the dataset is small but reviewable.
- Retry hint: Explain why each item exists.

#### Quiz / decision checkpoint
- Question: What makes a golden dataset “golden”?
- Options:
  - A. It is very large.
  - B. It is curated, documented, reviewed, and aligned to the claim under test.
  - C. It has no hard cases.
  - D. It is generated without labels.
- Correct answer: B
- Explanation: Trust comes from curation and documentation, not size alone.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Golden Dataset Packet

- Dataset purpose
- Task families
- Sampling plan
- Labels
- Rationales
- Validity threats
- Review owner

#### Validation rules
- Must include at least three task families.
- Must include label rationale and validity threat fields.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-043 | Datasheets for Datasets | Gebru et al. | paper | intermediate | Required | Dataset documentation framework that supports accountability and validity. | https://arxiv.org/abs/1803.09010 |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Required | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-006 | DeepEval documentation | Confident AI | tool documentation | beginner-intermediate | Optional / advanced | LLM evaluation framework with test cases, metrics, and application-level evaluation patterns. | https://deepeval.com/docs/evaluation-introduction |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P2.L3 — LLM-as-Judge Without Self-Deception

#### Metadata
- lessonId: P2.L3
- phaseId: P2
- duration: 90 min
- difficulty: intermediate
- learningObjective: Design judge prompts, rubrics, calibration sets, and bias checks for model-graded evaluation.
- lessonPromise: Use LLM judges as useful but fallible measurement aids.
- requiredArtifactOutput: Judge Calibration Report
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-008, S-009, S-006, S-005

#### Video card metadata

- videoTitle: Holistic Evaluation of Language Models (HELM) — Yifan Mai, Stanford University
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=fLoYcXLG6ro
- videoDuration: External video; confirm timestamp after embedding
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Holistic scoring | Why multiple metrics matter. |
| Calibration and uncertainty | Do not collapse scores into certainty. |
| Reporting | Transparent judge limitations. |

#### 10–15 minute lecture script / recording guide

This lesson is about **LLM-as-judge calibration**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **separating rubric design, judge prompt, calibration set, agreement check, and uncertainty report**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **assuming a powerful judge model makes the score true**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A judge always prefers longer answers even when shorter answers follow instructions better.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a judge score is calibrated enough to use in a gate.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Use LLM judges as useful but fallible measurement aids. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Rubric first** — A judge prompt must operationalize a written rubric.
2. **Calibration set** — Compare judge outputs to expert-labeled examples.
3. **Bias checks** — Test position, verbosity, and order effects before trusting results.

#### Visual explainer spec
- Diagram title: Judge calibration loop
- Diagram type: loop diagram
- Nodes / panels: Rubric → Expert examples → Judge prompt → Agreement analysis → Bias checks → Report
- Text summary: The judge is itself an evaluated component.

#### Worked example
- Weak version: “Ask GPT-4 which answer is better.”
- Improved version: “Use a rubric, blind pairwise ordering, calibration examples, agreement metrics, and bias probes before reporting judge scores.”
- Why improved: The improved version treats the judge as an instrument requiring calibration.

#### Common mistakes
- assuming a powerful judge model makes the score true
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Two candidate model answers differ in length and tone.
- Learner task: Score with a rubric and explain how you would check verbosity bias.
- Strong answer pattern: Strong answer includes swapped order, length-controlled examples, expert baseline, and disagreement review.
- Feedback: Good: judging is measured, not assumed.
- Retry hint: Treat the judge like a junior evaluator whose work needs QA.

#### Quiz / decision checkpoint
- Question: Which is a judge calibration item?
- Options:
  - A. A held-out expert-labeled set.
  - B. A landing page animation.
  - C. A random benchmark name.
  - D. A product slogan.
- Correct answer: A
- Explanation: Calibration requires examples with trusted labels or judgments.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Judge Calibration Report

- Rubric criteria
- Judge prompt
- Calibration examples
- Agreement metric
- Bias checks
- Uncertainty note

#### Validation rules
- Must include at least one bias check.
- Must include one expert-labeled calibration set.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-008 | Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena | Zheng et al. | paper | intermediate | Required | Foundational paper for model-graded and pairwise preference evaluation with explicit judge limitations. | https://arxiv.org/abs/2306.05685 |
| S-009 | G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment | Liu et al. | paper | advanced | Required | Useful reference for rubric-based model judging and structured evaluation prompts. | https://arxiv.org/abs/2303.16634 |
| S-006 | DeepEval documentation | Confident AI | tool documentation | beginner-intermediate | Required | LLM evaluation framework with test cases, metrics, and application-level evaluation patterns. | https://deepeval.com/docs/evaluation-introduction |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P2.L4 — RAG Triad and Retrieval-Aware Evaluation

#### Metadata
- lessonId: P2.L4
- phaseId: P2
- duration: 75 min
- difficulty: intermediate
- learningObjective: Evaluate answer relevance, context relevance, retrieval precision/recall, and faithfulness in RAG systems.
- lessonPromise: Learn why RAG failures are often retrieval failures disguised as generation failures.
- requiredArtifactOutput: RAG Evaluation Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-007, S-006, S-005, S-041

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
| Testing LLM apps | Why systematic app-level evals matter. |
| Rule/model-graded mix | How to combine evaluators. |
| CI pipeline | Make RAG failures reproducible. |

#### 10–15 minute lecture script / recording guide

This lesson is about **RAG triad evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **tracing a failure from question → retrieval → context → generation → answer support**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **scoring final answer quality without checking whether retrieved context supported it**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A support bot cites the wrong policy because retrieval pulled outdated documentation.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether to fix retrieval, generation, or source indexing.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn why RAG failures are often retrieval failures disguised as generation failures. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Faithfulness** — Is the answer supported by the retrieved context?
2. **Context relevance** — Did retrieval fetch the right evidence?
3. **Answer relevance** — Did the response actually answer the user?

#### Visual explainer spec
- Diagram title: RAG triad
- Diagram type: triangle diagram
- Nodes / panels: Question / Retrieved context / Answer with arrows for relevance and faithfulness
- Text summary: Separate retrieval error from generation error.

#### Worked example
- Weak version: “The answer sounds right, so the RAG system passed.”
- Improved version: “The answer is relevant but unsupported by context; retrieval must be fixed before release.”
- Why improved: The improved version identifies the component-level failure.

#### Common mistakes
- scoring final answer quality without checking whether retrieved context supported it
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A fictional benefits bot answers from an outdated policy page.
- Learner task: Classify the failure and choose the next mitigation.
- Strong answer pattern: Strong answer: context relevance failed, freshness metadata missing, add source-date filtering and regression item.
- Feedback: Good: component-level diagnosis leads to action.
- Retry hint: Find the unsupported sentence.

#### Quiz / decision checkpoint
- Question: Which metric asks whether the answer is supported by retrieved context?
- Options:
  - A. Faithfulness
  - B. Button contrast
  - C. Time to first byte
  - D. User avatar size
- Correct answer: A
- Explanation: Faithfulness checks support between answer and context.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: RAG Evaluation Card

- Question
- Retrieved passages
- Answer
- Faithfulness score
- Context relevance score
- Failure classification
- Mitigation

#### Validation rules
- Must include both answer and retrieval evidence.
- Must include one mitigation.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-007 | Ragas documentation | Ragas | tool documentation | intermediate | Required | Reference implementation and concepts for RAG evaluation such as faithfulness and context relevance. | https://docs.ragas.io/ |
| S-006 | DeepEval documentation | Confident AI | tool documentation | beginner-intermediate | Required | LLM evaluation framework with test cases, metrics, and application-level evaluation patterns. | https://deepeval.com/docs/evaluation-introduction |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P2.L5 — Tooling Lab: promptfoo, DeepEval, and Inspect AI

#### Metadata
- lessonId: P2.L5
- phaseId: P2
- duration: 120 min
- difficulty: intermediate
- learningObjective: Implement the same safe evaluation in at least two frameworks and compare output quality.
- lessonPromise: Move from theory to runnable evaluation workflows.
- requiredArtifactOutput: Framework Comparison Matrix
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-004, S-005, S-006, S-007, S-041

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
| Config-driven eval | promptfoo example. |
| Python test case | DeepEval example. |
| Task/solver/scorer | Inspect example. |
| Compare outputs | Evidence export differences. |

#### 10–15 minute lecture script / recording guide

This lesson is about **practical framework comparison**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running a toy evaluation in promptfoo, DeepEval, and/or Inspect AI with the same dataset and rubric**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **choosing tools by hype instead of fit**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The same refusal-quality eval is implemented in promptfoo and Inspect with different logging formats.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Choose the framework stack for the phase deliverable.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Move from theory to runnable evaluation workflows. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **promptfoo** — Fast configuration-driven prompt/model testing and red-team workflows.
2. **DeepEval** — Pythonic test cases and metrics for LLM applications.
3. **Inspect AI** — Task-based framework for frontier and agentic evaluations.

#### Visual explainer spec
- Diagram title: Tool fit matrix
- Diagram type: comparison table
- Nodes / panels: Framework / best for / strengths / caveats / evidence export
- Text summary: The learner should pick tools by evaluation need, not by brand.

#### Worked example
- Weak version: “Use every framework.”
- Improved version: “Use promptfoo for CI prompt regressions, DeepEval for application metrics, Inspect for frontier-style tasks requiring solvers/scorers.”
- Why improved: The improved version maps tool to job.

#### Common mistakes
- choosing tools by hype instead of fit
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A team needs both CI regression tests and model-graded safety evaluation.
- Learner task: Recommend a two-tool stack and justify it.
- Strong answer pattern: Strong answer explains what each tool does, what logs it produces, and how results become evidence cards.
- Feedback: Good: no single tool covers every case perfectly.
- Retry hint: Start from artifact and reporting needs.

#### Quiz / decision checkpoint
- Question: Which framework is explicitly positioned for frontier evaluations by AISI?
- Options:
  - A. Inspect AI
  - B. Photoshop
  - C. Excel only
  - D. A slide deck
- Correct answer: A
- Explanation: Inspect AI is the AISI-developed framework for frontier-style evaluations.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Framework Comparison Matrix

- Framework
- Use case
- Dataset format
- Scorer type
- Output artifact
- Limitations

#### Validation rules
- Must compare at least two frameworks.
- Must include one caveat per framework.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Required | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-006 | DeepEval documentation | Confident AI | tool documentation | beginner-intermediate | Required | LLM evaluation framework with test cases, metrics, and application-level evaluation patterns. | https://deepeval.com/docs/evaluation-introduction |
| S-007 | Ragas documentation | Ragas | tool documentation | intermediate | Optional / advanced | Reference implementation and concepts for RAG evaluation such as faithfulness and context relevance. | https://docs.ragas.io/ |
| S-041 | DeepLearning.AI Automated Testing for LLMOps | DeepLearning.AI / CircleCI | free course | beginner-intermediate | Optional / advanced | Practical course on automated testing and CI workflow for LLM applications. | https://www.deeplearning.ai/courses/automated-testing-llmops |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P2.L6 — Phase Studio: Automated Native Testing Harness

#### Metadata
- lessonId: P2.L6
- phaseId: P2
- duration: 60 min
- difficulty: intermediate
- learningObjective: Assemble a lightweight local evaluation harness with dataset, scorer, logs, validation script, and report.
- lessonPromise: Complete the phase artifact: a native testing harness that a learner can rerun.
- requiredArtifactOutput: Automated Native Testing Harness
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-038, S-039, S-040, S-004, S-005

#### Video card metadata

- videoTitle: Course-original screencast: Build an Inspect evaluation task
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
| Repo layout | Starter and solution files. |
| Run locally | Native process supervision. |
| Validate | Green/red scripts. |
| Export | Evidence cards for capstone. |

#### 10–15 minute lecture script / recording guide

This lesson is about **native testing harness assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining dataset, runner, judge/scorer, logs, validation scripts, and report into a lightweight local lab**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **overengineering with heavy infrastructure before measurement is clear**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A local mock model and judge service run under PM2 while tests export evidence cards.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the harness is ready for capstone reuse.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Complete the phase artifact: a native testing harness that a learner can rerun. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Native first** — Use lightweight local services where safe; containers only when isolation is required.
2. **Validation script** — The learner needs a green/red proof that the lab works.
3. **Evidence export** — Harness results must become capstone-ready evidence.

#### Visual explainer spec
- Diagram title: Native harness workflow
- Diagram type: pipeline diagram
- Nodes / panels: JSONL dataset → runner → model adapter → scorer → evidence cards → validator
- Text summary: The phase deliverable is a working, inspectable instrument.

#### Worked example
- Weak version: “A notebook with manual screenshots.”
- Improved version: “A repo with starter config, dataset, runner, scorer, logs, evidence export, validation script, and solution file.”
- Why improved: The improved version is shareable and reproducible.

#### Common mistakes
- overengineering with heavy infrastructure before measurement is clear
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A learner’s harness runs but no evidence cards are saved.
- Learner task: Identify missing pieces before phase completion.
- Strong answer pattern: Strong answer: add evidence schema, output path, validation check, and capstone import metadata.
- Feedback: Good: passing tests are not enough if artifacts do not persist.
- Retry hint: Validate output, not only execution.

#### Quiz / decision checkpoint
- Question: What makes the phase artifact complete?
- Options:
  - A. It has a nice icon.
  - B. It runs, logs raw outputs, scores results, exports evidence, and passes validation.
  - C. It has no source cards.
  - D. It only works on the instructor machine.
- Correct answer: B
- Explanation: Completeness requires execution plus evidence and reproducibility.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Automated Native Testing Harness

- Dataset path
- Run command
- Scorer config
- Evidence export path
- Validation command
- Known limitations

#### Validation rules
- Must include a validation command.
- Must export at least one evidence card.
- Must document environment variables.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-038 | PM2 process manager | PM2 | tool documentation | beginner-intermediate | Required | Lightweight process supervision useful for native host lab services. | https://pm2.keymetrics.io/ |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Required | CI/CD automation for eval regression gates. | https://docs.github.com/actions |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Required | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |

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
