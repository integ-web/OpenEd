# P4 — Spatial and World Models

## Phase metadata
- Phase ID: P4
- Title: Spatial and World Models
- Total hours: 9 hours (540 minutes planned lesson time)
- Learner level: Intermediate
- Phase promise: Learners design multimodal and simulation evaluations that test spatial, temporal, and physical claims safely.
- Phase artifact: Physical Simulation Benchmark
- Capstone connection: Supplies the capstone with multimodal/spatial evidence and simulation caveats.
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
| P4.L1 — Spatial Reasoning and World Models | 60 min | Define spatial/world-model evaluation and explain why text-only metrics are insufficient. | Spatial Evaluation Frame | candidate external |
| P4.L2 — Object Permanence, Physical Consistency, and Temporal Coherence | 75 min | Design tests for object permanence, physics plausibility, and temporal consistency. | Physical Consistency Test Card | candidate external |
| P4.L3 — ARC-AGI-2 and Abstract Generalization | 75 min | Explain how ARC-style tasks test abstraction and sample-efficient generalization. | Abstract Generalization Note | candidate external |
| P4.L4 — Multimodal Benchmark Design | 75 min | Design multimodal tasks that combine visual, textual, and structured evidence. | Multimodal Benchmark Packet | candidate external |
| P4.L5 — Simulation Benchmarks: RLBench, VIMA, and Factory Layouts | 105 min | Use simulation benchmarks to design safe physical reasoning tasks. | Simulation Benchmark Spec | candidate external |
| P4.L6 — Video and Interactive World-Model Evaluation | 75 min | Evaluate video/world-model claims using consistency, controllability, and interaction tests. | World-Model Claim Checklist | candidate external |
| P4.L7 — Phase Studio: Physical Simulation Benchmark | 75 min | Assemble a de-risked physical simulation benchmark and reporting rubric. | Physical Simulation Benchmark | video pending / use recording guide |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/04_spatial_world_models/starter/`
- Solution repository path: `frontier-eval-lab/phases/04_spatial_world_models/solutions/`
- Phase lab: Build a synthetic factory-layout benchmark with fictional diagrams, object constraints, scoring rubrics, and validation rules.
- Golden dataset(s): spatial_reasoning_toy_set.jsonl and factory_layout_synthetic_cases.jsonl.
- Validation script: validate_phase_04.py checks task schema, constraint scoring, evidence export, and safety/de-risking metadata.
- QA rule: No lesson should use real facility plans, real robotics deployment details, or unverified capability claims.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Required | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Required | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Optional / advanced | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |
| S-024 | Veo model page | Google DeepMind | model documentation | beginner-intermediate | Optional / advanced | Current model page for video generation capabilities and prompt adherence claims. | https://deepmind.google/models/veo/ |
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Optional / advanced | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-010 | Humanity's Last Exam | Center for AI Safety / Scale AI | benchmark / paper | advanced | Optional / advanced | Example of a frontier knowledge benchmark created in response to benchmark saturation. | https://arxiv.org/abs/2501.14249 |
| S-025 | Genie 3: A new frontier for world models | Google DeepMind | research blog | intermediate | Optional / advanced | Reference for interactive environment/world-model discussion and simulation evaluation questions. | https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ |

# Lessons

### Lesson P4.L1 — Spatial Reasoning and World Models

#### Metadata
- lessonId: P4.L1
- phaseId: P4
- duration: 60 min
- difficulty: intermediate
- learningObjective: Define spatial/world-model evaluation and explain why text-only metrics are insufficient.
- lessonPromise: Learn to test whether a model represents space, time, objects, and physical constraints.
- requiredArtifactOutput: Spatial Evaluation Frame
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-014, S-021, S-022, S-023

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
| World models | Why internal representations matter. |
| Evaluation caution | Claims need behavioral tests. |
| Safety relevance | Physical systems require higher confidence. |

#### 10–15 minute lecture script / recording guide

This lesson is about **spatial and world-model evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping object identity, location, continuity, occlusion, motion, and cause-effect constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **asking only verbal questions about visual-spatial tasks**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A video model creates a beautiful factory scene where conveyor belts intersect impossibly.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what physical consistency evidence is needed before using generated layouts for planning.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn to test whether a model represents space, time, objects, and physical constraints. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Spatial state** — Objects have identity, position, relation, and persistence.
2. **Temporal coherence** — The same object should remain consistent across frames or steps.
3. **Physical plausibility** — The world should obey constraints relevant to the use case.

#### Visual explainer spec
- Diagram title: Spatial state card
- Diagram type: diagram card
- Nodes / panels: Object / position / relation / motion / constraint / observation
- Text summary: Spatial evals ask whether the model maintains a coherent world state.

#### Worked example
- Weak version: “The video looks realistic.”
- Improved version: “The video preserves object identity, spatial relations, and constraint consistency across sampled frames.”
- Why improved: The improved version names measurable properties.

#### Common mistakes
- asking only verbal questions about visual-spatial tasks
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A robot planning assistant misidentifies which bin is behind another.
- Learner task: Create a spatial claim and one test.
- Strong answer pattern: Strong answer names object relations and expected answer behavior under occlusion.
- Feedback: Good: visual appeal is not physical understanding.
- Retry hint: Name the spatial variable.

#### Quiz / decision checkpoint
- Question: Which is a spatial evaluation signal?
- Options:
  - A. Object permanence across frames.
  - B. Website conversion copy.
  - C. Only BLEU score.
  - D. Profile avatar size.
- Correct answer: A
- Explanation: Object permanence is a spatial/temporal consistency signal.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Spatial Evaluation Frame

- Object set
- Spatial relations
- Temporal relation
- Constraint
- Expected behavior
- Failure mode

#### Validation rules
- Must include at least one relation and one failure mode.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Required | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Required | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Optional / advanced | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L2 — Object Permanence, Physical Consistency, and Temporal Coherence

#### Metadata
- lessonId: P4.L2
- phaseId: P4
- duration: 75 min
- difficulty: intermediate
- learningObjective: Design tests for object permanence, physics plausibility, and temporal consistency.
- lessonPromise: Turn visual intuition into measurable evaluation tasks.
- requiredArtifactOutput: Physical Consistency Test Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-021, S-022, S-023, S-024

#### Video card metadata

- videoTitle: Veo 3.1 — Designed to empower creatives
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=I06Ef8alr2Y
- videoDuration: External product video; use only as capability-claim discussion context
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Capability claims | Prompt adherence and realism claims. |
| Physical realism discussion | Separate product demo from evaluation. |
| Test design | Use sampled constraints, not impressions. |

#### 10–15 minute lecture script / recording guide

This lesson is about **physical consistency evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating before/after, occlusion, collision, containment, and continuity checks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using aesthetic realism as a substitute for physical validity**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A video shows a tool pass through a wall; a text summary misses the failure.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a multimodal model can support layout simulation decisions.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Turn visual intuition into measurable evaluation tasks. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Object permanence** — Objects should persist when briefly occluded.
2. **Contact and support** — Objects should not pass through solid barriers or float without reason.
3. **Temporal identity** — Appearance changes must be explained or flagged.

#### Visual explainer spec
- Diagram title: Consistency checklist
- Diagram type: checklist diagram
- Nodes / panels: Permanence / collision / containment / support / temporal identity
- Text summary: A visual model needs constraint checks, not only image quality ratings.

#### Worked example
- Weak version: “It looks good.”
- Improved version: “Across 30 sampled frames, object identity and support constraints are preserved except in two flagged failures.”
- Why improved: The improved version measures consistency over time.

#### Common mistakes
- using aesthetic realism as a substitute for physical validity
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A factory robot path simulation shows a pallet teleporting.
- Learner task: Write a task and scorer for this failure.
- Strong answer pattern: Strong answer samples frames and scores object identity/position continuity.
- Feedback: Good: make visual failure observable.
- Retry hint: Turn visual intuition into a rubric.

#### Quiz / decision checkpoint
- Question: What is temporal coherence?
- Options:
  - A. Consistent identity and relations across time.
  - B. A color palette.
  - C. A short quiz.
  - D. A source card.
- Correct answer: A
- Explanation: Temporal coherence asks whether the scene remains consistent through time.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Physical Consistency Test Card

- Object id
- Initial state
- Occlusion event
- Expected persistence
- Failure criteria
- Scorer

#### Validation rules
- Must include observable failure criteria.
- Must include frame/time sampling rule.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Required | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Required | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |
| S-024 | Veo model page | Google DeepMind | model documentation | beginner-intermediate | Optional / advanced | Current model page for video generation capabilities and prompt adherence claims. | https://deepmind.google/models/veo/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L3 — ARC-AGI-2 and Abstract Generalization

#### Metadata
- lessonId: P4.L3
- phaseId: P4
- duration: 75 min
- difficulty: intermediate
- learningObjective: Explain how ARC-style tasks test abstraction and sample-efficient generalization.
- lessonPromise: Use abstract tasks to reason about generalization beyond memorized benchmark patterns.
- requiredArtifactOutput: Abstract Generalization Note
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-014, S-001, S-010

#### Video card metadata

- videoTitle: Stanford CS229: Building Large Language Models
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=9vM4p9NN0Ts
- videoDuration: External video; includes evaluation methods and MMLU segment
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Benchmark discussion | How benchmarks test different capability claims. |
| MMLU vs abstraction | Knowledge is not generalization. |
| Evaluation caveats | Scores need task interpretation. |

#### 10–15 minute lecture script / recording guide

This lesson is about **abstract generalization evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **testing whether a system infers a transformation rule from few examples and applies it to novel grids**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating memorized benchmark patterns as evidence of general intelligence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model solves familiar pattern puzzles but fails when color-role mappings change.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether performance indicates rule induction or pattern recall.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Use abstract tasks to reason about generalization beyond memorized benchmark patterns. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Few examples** — ARC-style tasks provide examples and ask for a rule.
2. **Transformation rules** — The learner should describe the latent rule, not just answer.
3. **Generalization difficulty** — Novel tasks test adaptation more than recall.

#### Visual explainer spec
- Diagram title: ARC task anatomy
- Diagram type: grid diagram
- Nodes / panels: Training examples / hidden rule / test input / predicted output
- Text summary: The model must infer a transformation, not retrieve a fact.

#### Worked example
- Weak version: “It solved many grid puzzles, so it understands abstraction.”
- Improved version: “It solved held-out ARC-style tasks under fixed budgets; analyze failure modes by rule type and novelty.”
- Why improved: The improved version includes protocol and failure analysis.

#### Common mistakes
- treating memorized benchmark patterns as evidence of general intelligence
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A grid task changes color semantics between examples.
- Learner task: Identify what the model must infer.
- Strong answer pattern: Strong answer names the transformation rule and distinguishes color from role.
- Feedback: Good: abstraction means role inference.
- Retry hint: Ask what changed and what stayed invariant.

#### Quiz / decision checkpoint
- Question: What does ARC-style evaluation emphasize?
- Options:
  - A. Skill acquisition from few examples.
  - B. Long marketing copy.
  - C. Only production latency.
  - D. Human preference votes.
- Correct answer: A
- Explanation: ARC tasks focus on adapting to novel abstract tasks from limited examples.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Abstract Generalization Note

- Rule hypothesis
- Example count
- Test case
- Expected transformation
- Failure class
- Budget

#### Validation rules
- Must include rule hypothesis.
- Must include failure classification.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Required | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Required | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-010 | Humanity's Last Exam | Center for AI Safety / Scale AI | benchmark / paper | advanced | Required | Example of a frontier knowledge benchmark created in response to benchmark saturation. | https://arxiv.org/abs/2501.14249 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L4 — Multimodal Benchmark Design

#### Metadata
- lessonId: P4.L4
- phaseId: P4
- duration: 75 min
- difficulty: intermediate
- learningObjective: Design multimodal tasks that combine visual, textual, and structured evidence.
- lessonPromise: Learn how to make multimodal evals precise rather than subjective.
- requiredArtifactOutput: Multimodal Benchmark Packet
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-001, S-014, S-021, S-022

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
| Multimodal capability | Broader than text. |
| Evidence design | Make modality essential. |
| Failure review | Handle ambiguity. |

#### 10–15 minute lecture script / recording guide

This lesson is about **multimodal benchmark design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **specifying modality input, task family, answer format, scorer, ambiguity handling, and accessibility text**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using images as decoration instead of task-critical evidence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A chart question can be answered from alt text alone, so it does not test chart understanding.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the task genuinely requires multimodal reasoning.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn how to make multimodal evals precise rather than subjective. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Modality necessity** — The image/video must contain information required for the answer.
2. **Ambiguity handling** — Visual tasks need rules for uncertain or low-resolution evidence.
3. **Accessible summaries** — Diagrams need text summaries for learners and QA.

#### Visual explainer spec
- Diagram title: Multimodal task spec
- Diagram type: form diagram
- Nodes / panels: Input modality / required evidence / answer format / scorer / ambiguity rule
- Text summary: A good multimodal task states exactly what visual information is needed.

#### Worked example
- Weak version: “Look at this image and answer.”
- Improved version: “Given a diagram with labeled components, identify the inconsistent relation using the image and text constraints.”
- Why improved: The improved version makes visual evidence task-critical.

#### Common mistakes
- using images as decoration instead of task-critical evidence
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A learner creates an image-based safety eval.
- Learner task: Check whether text alone can answer the task.
- Strong answer pattern: Strong answer revises task so visual relation is necessary.
- Feedback: Good: multimodal means cross-modal evidence, not just attached images.
- Retry hint: Remove the image; if the task still works, redesign it.

#### Quiz / decision checkpoint
- Question: What makes a task truly multimodal?
- Options:
  - A. The non-text modality is required to answer.
  - B. It has a colorful card.
  - C. It has a long source list.
  - D. It uses a serif font.
- Correct answer: A
- Explanation: The visual/audio/video input must contribute necessary evidence.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Multimodal Benchmark Packet

- Modality
- Task claim
- Required visual evidence
- Answer format
- Scoring rule
- Ambiguity rule

#### Validation rules
- Must include modality necessity check.
- Must include accessible text summary.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-001 | HELM: Holistic Evaluation of Language Models | Stanford CRFM | paper / leaderboard | intermediate | Required | Introduces holistic evaluation across scenarios and metrics; useful as a mental model for broad evaluation coverage. | https://crfm.stanford.edu/helm/latest/ |
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Required | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Optional / advanced | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L5 — Simulation Benchmarks: RLBench, VIMA, and Factory Layouts

#### Metadata
- lessonId: P4.L5
- phaseId: P4
- duration: 105 min
- difficulty: intermediate
- learningObjective: Use simulation benchmarks to design safe physical reasoning tasks.
- lessonPromise: Learn how simulated environments can test embodied reasoning without real-world danger.
- requiredArtifactOutput: Simulation Benchmark Spec
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-021, S-022, S-023, S-024

#### Video card metadata

- videoTitle: Google DeepMind Safety Research channel
- videoProvider: YouTube channel
- videoUrl: https://www.youtube.com/channel/UCrqYIvSGOKD1oYEpSGVpB-w
- videoDuration: Channel / playlist source; select relevant episode
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Physical tasks | Why embodied evaluation is different. |
| Simulation tradeoffs | Control vs validity. |
| Reporting limits | Do not overclaim. |

#### 10–15 minute lecture script / recording guide

This lesson is about **safe simulation evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining tasks, constraints, observations, actions, success criteria, and sim-to-real caveats**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **assuming simulation success automatically transfers to the real world**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A robot-packing simulation succeeds because objects are perfectly textured and lighting never changes.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what sim-to-real caveats must appear in the report.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn how simulated environments can test embodied reasoning without real-world danger. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Task environment** — Simulation defines objects, physics, observations, and actions.
2. **Success criteria** — Task completion must be concrete and measurable.
3. **Validity caveats** — Sim-to-real gaps must be explicit.

#### Visual explainer spec
- Diagram title: Simulation eval stack
- Diagram type: stack diagram
- Nodes / panels: Scenario → environment → observations → actions → success criteria → caveats
- Text summary: Simulation produces controlled evidence with clear limitations.

#### Worked example
- Weak version: “The model works in simulation, so it is ready for the factory.”
- Improved version: “The model succeeds in a simulated layout under fixed lighting and object geometry; real-world transfer needs disturbance, sensor, and edge-case tests.”
- Why improved: The improved version does not overclaim from simulation.

#### Common mistakes
- assuming simulation success automatically transfers to the real world
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A warehouse-layout assistant suggests impossible aisle spacing.
- Learner task: Design a de-risked simulation task and scorer.
- Strong answer pattern: Strong answer uses fictional layout constraints, clearance rules, collision checks, and source-free synthetic geometry.
- Feedback: Good: simulation tasks need constraints.
- Retry hint: Name what simulation leaves out.

#### Quiz / decision checkpoint
- Question: What is a sim-to-real caveat?
- Options:
  - A. A limitation about transferring simulated results to physical deployment.
  - B. A login button.
  - C. A video chapter.
  - D. A font weight.
- Correct answer: A
- Explanation: Simulation evidence must state what physical reality it may not capture.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Simulation Benchmark Spec

- Environment
- Objects
- Actions
- Constraints
- Success criteria
- Failure modes
- Sim-to-real caveats

#### Validation rules
- Must include at least two constraints.
- Must include a transfer limitation.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Required | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Required | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |
| S-024 | Veo model page | Google DeepMind | model documentation | beginner-intermediate | Optional / advanced | Current model page for video generation capabilities and prompt adherence claims. | https://deepmind.google/models/veo/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L6 — Video and Interactive World-Model Evaluation

#### Metadata
- lessonId: P4.L6
- phaseId: P4
- duration: 75 min
- difficulty: intermediate
- learningObjective: Evaluate video/world-model claims using consistency, controllability, and interaction tests.
- lessonPromise: Separate impressive generated media from reliable world simulation.
- requiredArtifactOutput: World-Model Claim Checklist
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-023, S-024, S-025, S-014

#### Video card metadata

- videoTitle: Veo 3.1 — Designed to empower creatives
- videoProvider: YouTube
- videoUrl: https://www.youtube.com/watch?v=I06Ef8alr2Y
- videoDuration: External product video; use only as capability-claim discussion context
- videoStatus: candidate-external-verify-before-publishing
- transcriptButton: show
- captionsButton: show
- askCoachAtMomentButton: show

#### Video chapters

| Chapter | What learner should notice |
|---|---|
| Video capability demo | Use as evidence discussion only. |
| Prompt adherence | What a demo can and cannot prove. |
| Evaluation design | From demo to benchmark. |

#### 10–15 minute lecture script / recording guide

This lesson is about **world-model claim evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **checking temporal consistency, controllability, prompt adherence, interaction persistence, and safety constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating video generation demos as proof of physically grounded world understanding**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A generated video obeys prompt style but changes object count across frames.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which claims are supported by qualitative demo evidence and which need quantitative tests.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Separate impressive generated media from reliable world simulation. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Controllability** — Can the system reliably follow specific constraints?
2. **State persistence** — Does the world remain coherent when extended or interacted with?
3. **Claim discipline** — Demo evidence supports weaker claims than benchmark evidence.

#### Visual explainer spec
- Diagram title: Demo claim ladder
- Diagram type: ladder diagram
- Nodes / panels: Demo → qualitative probe → benchmark task → deployment-relevant simulation
- Text summary: Different evidence levels support different claims.

#### Worked example
- Weak version: “Sora/Veo proves full world understanding.”
- Improved version: “The video model shows promising qualitative consistency, but deployment claims need controlled tasks, failure sampling, and quantitative rubrics.”
- Why improved: The improved version calibrates claim strength.

#### Common mistakes
- treating video generation demos as proof of physically grounded world understanding
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A video model is proposed for industrial planning visualization.
- Learner task: Write three evaluation checks before use.
- Strong answer pattern: Strong answer checks geometry, object count, temporal consistency, and layout constraints under multiple seeds.
- Feedback: Good: demos are inspiration, not release evidence.
- Retry hint: Lower the claim to match the evidence.

#### Quiz / decision checkpoint
- Question: Which claim is best supported by a demo?
- Options:
  - A. The model can sometimes generate plausible examples under curated prompts.
  - B. The model is deployment-safe for factory planning.
  - C. The model understands physics perfectly.
  - D. No evaluation is needed.
- Correct answer: A
- Explanation: Demos are weak evidence for broad reliability.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: World-Model Claim Checklist

- Claim
- Evidence level
- Test needed
- Consistency check
- Prompt adherence check
- Safety caveat

#### Validation rules
- Must include claim/evidence distinction.
- Must include at least one quantitative follow-up.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Required | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |
| S-024 | Veo model page | Google DeepMind | model documentation | beginner-intermediate | Required | Current model page for video generation capabilities and prompt adherence claims. | https://deepmind.google/models/veo/ |
| S-025 | Genie 3: A new frontier for world models | Google DeepMind | research blog | intermediate | Required | Reference for interactive environment/world-model discussion and simulation evaluation questions. | https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ |
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Optional / advanced | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P4.L7 — Phase Studio: Physical Simulation Benchmark

#### Metadata
- lessonId: P4.L7
- phaseId: P4
- duration: 75 min
- difficulty: intermediate
- learningObjective: Assemble a de-risked physical simulation benchmark and reporting rubric.
- lessonPromise: Produce a benchmark packet for spatial/world-model evaluation.
- requiredArtifactOutput: Physical Simulation Benchmark
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-021, S-022, S-014, S-023, S-024

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
| Assemble packet | Tasks and constraints. |
| Run sample tasks | Score safe layouts. |
| Export evidence | Physical benchmark cards. |
| Report caveats | Sim-to-real limits. |

#### 10–15 minute lecture script / recording guide

This lesson is about **physical simulation benchmark assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining task spec, constraints, dataset, scorer, validation, and report for safe simulated tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **submitting a collection of images instead of a benchmark protocol**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 is evaluated on fictional factory-layout constraints with synthetic diagrams and collision rules.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the benchmark belongs in the final dossier.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Produce a benchmark packet for spatial/world-model evaluation. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Benchmark packet** — Task, dataset, metric, scorer, constraints, limitations.
2. **Safety by design** — Use synthetic layouts and avoid real facility details.
3. **Decision relevance** — Connect physical reasoning to deployment constraints.

#### Visual explainer spec
- Diagram title: Physical benchmark packet
- Diagram type: packet diagram
- Nodes / panels: Claim / scenario / task families / constraints / scorer / caveats / evidence export
- Text summary: The benchmark translates spatial claims into safe evidence.

#### Worked example
- Weak version: “Here are generated layouts.”
- Improved version: “Here is a physical simulation benchmark with task families, synthetic layouts, scoring rules, constraints, and validation script.”
- Why improved: The improved version is a benchmark, not a gallery.

#### Common mistakes
- submitting a collection of images instead of a benchmark protocol
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model proposes route transitions between workstations.
- Learner task: Write the benchmark success criteria.
- Strong answer pattern: Strong answer includes collision-free path, clearance constraints, object persistence, and uncertainty note.
- Feedback: Good: physical reasoning needs explicit constraints.
- Retry hint: Use fictional geometry and documented limits.

#### Quiz / decision checkpoint
- Question: What is the required phase artifact?
- Options:
  - A. Physical Simulation Benchmark
  - B. A random video gallery
  - C. A single screenshot
  - D. A logo set
- Correct answer: A
- Explanation: The phase must produce a reusable benchmark packet.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Physical Simulation Benchmark

- Benchmark name
- Claim under test
- Synthetic scenario
- Task families
- Constraints
- Scorer
- Validation command
- Limitations

#### Validation rules
- Must use fictional/synthetic data.
- Must include a scorer.
- Must include a limitation note.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-021 | RLBench | James et al. | robotics benchmark | advanced | Required | Robot manipulation benchmark with simulated tasks useful for physical task evaluation design. | https://github.com/stepjam/RLBench |
| S-022 | VIMA: General Robot Manipulation with Multimodal Prompts | Jiang et al. | paper / benchmark | advanced | Required | Shows how multimodal prompts and systematic generalization protocols can frame robot manipulation tasks. | https://vimalabs.github.io/ |
| S-014 | ARC-AGI-2 | ARC Prize | benchmark | advanced | Required | Abstract reasoning benchmark designed to stress-test generalization and fluid intelligence. | https://arcprize.org/arc-agi/2 |
| S-023 | Video generation models as world simulators | OpenAI | technical report | intermediate | Optional / advanced | Useful reference for discussing video/world-model capability claims and their limitations. | https://openai.com/index/video-generation-models-as-world-simulators/ |
| S-024 | Veo model page | Google DeepMind | model documentation | beginner-intermediate | Optional / advanced | Current model page for video generation capabilities and prompt adherence claims. | https://deepmind.google/models/veo/ |

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
