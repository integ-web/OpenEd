# P3 — Autonomous Agents

## V3 file status
- This file is updated for no course-owned videos. External media is reference-only; authored lesson transcripts are the stable teaching layer.

## Phase metadata
- Phase ID: P3
- Title: Autonomous Agents
- Total hours: 12 hours (720 minutes planned lesson time)
- Learner level: Intermediate
- Phase promise: Learners evaluate agents through environments, traces, state changes, and safe sandboxes.
- Phase artifact: Agent Execution Sandbox
- Capstone connection: Supplies the capstone with agent evidence and trajectory logs.
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
| P3.L1 — Why Agent Evaluation Is Different | 75 min | Explain why agents require environment, state, tool, and trajectory evaluation. | Agent Evaluation Frame | external reference video + authored transcript ready |
| P3.L2 — Tool Calls, State, and Trajectory Logging | 105 min | Design a trace schema for multi-turn agent evaluations. | Agent Trace Schema | video pending / use recording guide |
| P3.L3 — SWE-bench and Coding Agent Evaluation | 105 min | Interpret execution-based software engineering benchmarks and their caveats. | Coding Agent Benchmark Card | external reference video + authored transcript ready |
| P3.L4 — OSWorld, WebArena, and GAIA | 105 min | Compare environment-based agent benchmarks and choose which fits a task claim. | Agent Benchmark Selection Matrix | external reference video + authored transcript ready |
| P3.L5 — Sandboxes and Low-Compute Agent Execution | 120 min | Design a safe, lightweight sandbox for de-risked agent tasks. | Agent Execution Sandbox Spec | video pending / use recording guide |
| P3.L6 — Long Task Horizons, Autonomy, and ARA | 105 min | Explain long-task time horizons and autonomous replication/adaptation as evaluation frames. | Autonomy Risk Frame | external reference video + authored transcript ready |
| P3.L7 — Phase Studio: Agent Execution Sandbox | 105 min | Assemble the phase deliverable: a safe agent execution sandbox with trace logging and validation. | Agent Execution Sandbox | video pending / use recording guide |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/03_autonomous_agents/starter/`
- Solution repository path: `frontier-eval-lab/phases/03_autonomous_agents/solutions/`
- Phase lab: Build a safe mock enterprise agent sandbox with synthetic docs, fake CRM records, reset scripts, trace logging, and outcome/trajectory scorers.
- Golden dataset(s): agent_trace_sandbox.jsonl with mock tasks, expected outcomes, allowed tools, and safety flags.
- Validation script: validate_phase_03.py checks sandbox reset, trace schema, unauthorized actions, scoring, and evidence export.
- QA rule: No agent task may touch real accounts, real credentials, or real external systems.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-017 | WebArena | WebArena team | benchmark | advanced | Required | Self-hosted web environments for evaluating autonomous web agents. | https://webarena.dev/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Optional / advanced | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Optional / advanced | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-003 | Lessons from the Trenches on Reproducible Evaluation of Language Models | EleutherAI et al. | paper | advanced | Optional / advanced | Practical lessons on reproducibility pitfalls in language model evaluation. | https://arxiv.org/abs/2405.14782 |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Optional / advanced | CI/CD automation for eval regression gates. | https://docs.github.com/actions |
| S-038 | PM2 process manager | PM2 | tool documentation | beginner-intermediate | Optional / advanced | Lightweight process supervision useful for native host lab services. | https://pm2.keymetrics.io/ |
| S-019 | METR: Measuring AI Ability to Complete Long Tasks | METR | paper / report | advanced | Optional / advanced | Introduces time-horizon framing for autonomous task completion capability. | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |
| S-020 | Evaluating Language-Model Agents on Realistic Autonomous Tasks | METR / ARC Evals | paper | advanced | Optional / advanced | Introduces autonomous replication and adaptation task framing for agent risk assessment. | https://arxiv.org/abs/2312.11671 |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Optional / advanced | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Optional / advanced | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |

# Lessons

### Lesson P3.L1 — Why Agent Evaluation Is Different

#### Metadata
- lessonId: P3.L1
- phaseId: P3
- duration: 75 min
- difficulty: intermediate
- learningObjective: Explain why agents require environment, state, tool, and trajectory evaluation.
- lessonPromise: See agent evaluation as task ecology, not just prompt evaluation.
- requiredArtifactOutput: Agent Evaluation Frame
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-015, S-016, S-017, S-018

#### Video card metadata — V3 external reference video

- primaryVideoTitle: How to Build, Evaluate, and Iterate on LLM Agents
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=0pnEUAwoDP0
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Broad introduction to agent evaluation and iteration loops.
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
| Longer tasks | Why duration and reliability matter. |
| Autonomy and tools | Task completion beyond one prompt. |
| Evaluation realism | Why environment design matters. |

#### Authored course transcript / reading script

This lesson is about **agent evaluation ecology**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping goal, environment, tools, state, memory, observations, and irreversible actions**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **evaluating an agent as if it were a single-turn chatbot**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: An email agent completes a request but sends a message before asking for confirmation.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which agent actions require gating or simulation-only testing.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
See agent evaluation as task ecology, not just prompt evaluation. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Environment matters** — The environment is part of the evaluation, not a neutral background.
2. **State changes** — Files, messages, database rows, and tool calls must be logged.
3. **Action safety** — Irreversible actions need stricter controls and simulated environments.

#### Visual explainer spec
- Diagram title: Agent loop
- Diagram type: loop diagram
- Nodes / panels: Goal → Observe → Plan → Tool call → State change → Feedback → Stop condition
- Text summary: Agent evaluation follows the loop, not only the final answer.

#### Worked example
- Weak version: “Ask the agent to do the task and see if it succeeds.”
- Improved version: “Run the agent in a sandbox, log observations/tools/state, enforce stop conditions, and score both outcome and trajectory.”
- Why improved: The improved version measures behavior in context.

#### Common mistakes
- evaluating an agent as if it were a single-turn chatbot
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A calendar agent reschedules a meeting without a confirmation step.
- Learner task: Name the outcome metric and the trajectory safety metric.
- Strong answer pattern: Outcome: task completion; trajectory: confirmation gate respected, tool calls authorized, state changes logged.
- Feedback: Good: success and safety are separate.
- Retry hint: Ask what the agent changed.

#### Quiz / decision checkpoint
- Question: What is unique about agent evaluation?
- Options:
  - A. It never needs logs.
  - B. The environment and tool trajectory become part of the measurement.
  - C. It only uses multiple choice.
  - D. It does not need safety constraints.
- Correct answer: B
- Explanation: Agents act over time; measurement must include the path and environment.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Agent Evaluation Frame

- Goal
- Environment
- Allowed tools
- State variables
- Stop condition
- Outcome metric
- Trajectory metric

#### Validation rules
- Must include at least one state variable.
- Must include one irreversible-action control.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-017 | WebArena | WebArena team | benchmark | advanced | Required | Self-hosted web environments for evaluating autonomous web agents. | https://webarena.dev/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Optional / advanced | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L2 — Tool Calls, State, and Trajectory Logging

#### Metadata
- lessonId: P3.L2
- phaseId: P3
- duration: 105 min
- difficulty: intermediate
- learningObjective: Design a trace schema for multi-turn agent evaluations.
- lessonPromise: Make agent behavior inspectable by logging every meaningful state transition.
- requiredArtifactOutput: Agent Trace Schema
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-037, S-015, S-016, S-004

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Agent Evaluation #langchain
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=-URxC6zXnNs
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Reference for evaluating agent steps and tool use.
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
| Event schema | What to log. |
| Trace review | How to inspect failures. |
| Evidence export | Turn traces into cards. |

#### Authored course transcript / reading script

This lesson is about **trajectory logging**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating an event schema for prompts, observations, tool calls, tool outputs, retries, state changes, and final answer**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **saving only the final transcript and losing operational evidence**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A file-management agent deletes a folder during a failed attempt, but the final answer hides the deletion.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what log fields are mandatory for a release-gate evaluation.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Make agent behavior inspectable by logging every meaningful state transition. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Trace events** — Each step should be a structured event.
2. **Tool boundaries** — Tool name, input class, output class, permission state, and result must be logged.
3. **State delta** — Record what changed, not just what was said.

#### Visual explainer spec
- Diagram title: Agent trace anatomy
- Diagram type: event stream diagram
- Nodes / panels: turn_id / observation / reasoning_summary / tool_call / result / state_delta / safety_check
- Text summary: Trace logs convert agent behavior into evidence.

#### Worked example
- Weak version: “We have chat logs.”
- Improved version: “We have structured events with tool calls, outputs, state deltas, timing, and safety checks.”
- Why improved: The improved version supports analysis and replay.

#### Common mistakes
- saving only the final transcript and losing operational evidence
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A browser agent uses search, calculator, and notes tools over six steps.
- Learner task: Write the minimal event schema.
- Strong answer pattern: Strong answer includes event id, timestamp, tool, input summary, output summary, state change, error, safety flag.
- Feedback: Good: logs must support replay and scoring.
- Retry hint: Log enough to reproduce without exposing sensitive content.

#### Quiz / decision checkpoint
- Question: Which field is most useful for scoring unauthorized actions?
- Options:
  - A. Tool permission status
  - B. Page background color
  - C. Marketing tagline
  - D. Course hero text
- Correct answer: A
- Explanation: Permission status lets the scorer distinguish allowed vs disallowed calls.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Agent Trace Schema

- Event id
- Timestamp
- Turn id
- Observation
- Tool call
- Tool output summary
- State delta
- Safety flag

#### Validation rules
- Must avoid storing sensitive raw secrets.
- Must log state delta for each tool call.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Required | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L3 — SWE-bench and Coding Agent Evaluation

#### Metadata
- lessonId: P3.L3
- phaseId: P3
- duration: 105 min
- difficulty: intermediate
- learningObjective: Interpret execution-based software engineering benchmarks and their caveats.
- lessonPromise: Understand why coding-agent evals need real repositories, tests, patches, and contamination caution.
- requiredArtifactOutput: Coding Agent Benchmark Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-015, S-003, S-040, S-039

#### Video card metadata — V3 external reference video

- primaryVideoTitle: John Yang — SWE-bench: Can Language Models Resolve Real-World GitHub Issues?
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=DrLdvbkgmeA
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Directly aligned with SWE-bench and coding agent evaluation.
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
| Task duration | How coding tasks relate to human time horizons. |
| Reliability | Why 50% success is not deployment-ready. |
| Caveats | External validity and task distribution. |

#### Authored course transcript / reading script

This lesson is about **execution-based coding evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **reading an issue, generating a patch, applying it, running tests, and analyzing false positives/negatives**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating unit-test pass rate as the whole story**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A patch passes visible tests but hardcodes the expected output.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a coding benchmark result indicates real software engineering ability.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Understand why coding-agent evals need real repositories, tests, patches, and contamination caution. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Execution is stronger evidence** — Running code creates an objective signal, but not a complete one.
2. **Patch quality matters** — A patch can pass tests while being unmaintainable or unsafe.
3. **Benchmark caveats** — Repository setup, issue selection, and contamination shape results.

#### Visual explainer spec
- Diagram title: SWE-bench evaluation flow
- Diagram type: pipeline diagram
- Nodes / panels: Issue → repo checkout → patch generation → apply patch → run tests → classify result
- Text summary: Execution tests provide concrete evidence but still need caveats.

#### Worked example
- Weak version: “The model solved 40%, so it is a developer.”
- Improved version: “The model resolved 40% under the benchmark protocol; inspect task distribution, patch quality, test coverage, retries, and contamination risk.”
- Why improved: The improved version avoids overclaiming.

#### Common mistakes
- treating unit-test pass rate as the whole story
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A coding agent changes a function and passes tests by weakening validation.
- Learner task: Identify why outcome pass may not be enough.
- Strong answer pattern: Strong answer flags patch quality and test gaming; add review and hidden tests.
- Feedback: Good: tests are evidence, not absolute truth.
- Retry hint: Check what changed, not just whether tests passed.

#### Quiz / decision checkpoint
- Question: What does execution-based evaluation add?
- Options:
  - A. A real run signal from tests or environment outcomes.
  - B. A nicer UI.
  - C. A subjective vibe check.
  - D. A logo.
- Correct answer: A
- Explanation: Execution produces behavioral evidence by running code or environment tasks.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Coding Agent Benchmark Card

- Issue id
- Repo
- Patch summary
- Tests run
- Pass/fail
- Patch quality note
- Known caveat

#### Validation rules
- Must include test command and patch diff reference.
- Must include at least one caveat.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Required | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |
| S-003 | Lessons from the Trenches on Reproducible Evaluation of Language Models | EleutherAI et al. | paper | advanced | Required | Practical lessons on reproducibility pitfalls in language model evaluation. | https://arxiv.org/abs/2405.14782 |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Required | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |
| S-039 | GitHub Actions documentation | GitHub | tool documentation | beginner-intermediate | Optional / advanced | CI/CD automation for eval regression gates. | https://docs.github.com/actions |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L4 — OSWorld, WebArena, and GAIA

#### Metadata
- lessonId: P3.L4
- phaseId: P3
- duration: 105 min
- difficulty: intermediate
- learningObjective: Compare environment-based agent benchmarks and choose which fits a task claim.
- lessonPromise: Learn how desktop, web, and assistant benchmarks reveal different agent capabilities.
- requiredArtifactOutput: Agent Benchmark Selection Matrix
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-016, S-017, S-018, S-015

#### Video card metadata — V3 external reference video

- primaryVideoTitle: The State of Web Agents
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=VRRi_KRbfps
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Covers WebArena, VisualWebArena, WorkArena, and the benchmark landscape for web agents.
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
| Realistic tasks | Why environment realism matters. |
| Evaluation horizon | Why long workflows need representative tasks. |
| Benchmark interpretation | Avoid overclaiming. |

#### Authored course transcript / reading script

This lesson is about **environment-based benchmark selection**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **matching the claim to OSWorld-style desktop tasks, WebArena-style web tasks, GAIA-style assistant tasks, or a custom toy environment**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using the most famous agent benchmark even when it does not match the deployment environment**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A procurement assistant is tested on generic QA but will actually operate web forms and documents.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Select an evaluation environment for the product risk.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn how desktop, web, and assistant benchmarks reveal different agent capabilities. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **OSWorld** — Open-ended computer tasks with GUI grounding.
2. **WebArena** — Self-hosted web environments for browser agents.
3. **GAIA** — Assistant tasks combining reasoning, search, and tool use.

#### Visual explainer spec
- Diagram title: Agent benchmark map
- Diagram type: map diagram
- Nodes / panels: Desktop / Web / Assistant / Code / Custom sandbox
- Text summary: Match benchmark world to deployment world.

#### Worked example
- Weak version: “Use OSWorld because it is popular.”
- Improved version: “Use WebArena-style tasks for browser workflows, OSWorld for desktop GUI tasks, GAIA-like tasks for general assistant tool use.”
- Why improved: The improved version matches benchmark to environment.

#### Common mistakes
- using the most famous agent benchmark even when it does not match the deployment environment
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model will operate a CRM-style web app.
- Learner task: Choose a benchmark family and justify validity limits.
- Strong answer pattern: Strong answer chooses WebArena-style or custom self-hosted web environment, with CRM-specific tasks and logging.
- Feedback: Good: fit beats fame.
- Retry hint: Ask what world the agent will inhabit.

#### Quiz / decision checkpoint
- Question: Which benchmark type best fits desktop GUI tasks?
- Options:
  - A. OSWorld
  - B. BLEU
  - C. TruthfulQA
  - D. ImageNet only
- Correct answer: A
- Explanation: OSWorld is designed around real computer/desktop environments.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Agent Benchmark Selection Matrix

- Deployment world
- Benchmark family
- Task examples
- Observed tools
- Outcome metric
- Trajectory metric
- Validity caveat

#### Validation rules
- Must state why selected benchmark fits the deployment world.
- Must include one custom-task caveat.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-017 | WebArena | WebArena team | benchmark | advanced | Required | Self-hosted web environments for evaluating autonomous web agents. | https://webarena.dev/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Required | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |
| S-015 | SWE-bench Verified | SWE-bench | benchmark / docs | advanced | Optional / advanced | Execution-based benchmark for real-world software issue resolution by coding agents. | https://www.swebench.com/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L5 — Sandboxes and Low-Compute Agent Execution

#### Metadata
- lessonId: P3.L5
- phaseId: P3
- duration: 120 min
- difficulty: intermediate
- learningObjective: Design a safe, lightweight sandbox for de-risked agent tasks.
- lessonPromise: Build agent labs that are safe to run without expensive infrastructure.
- requiredArtifactOutput: Agent Execution Sandbox Spec
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-004, S-037, S-038, S-040

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Software Control Models: Building Agents for Real-World Interfaces
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=BxfiW3wi640
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Supports desktop-agent and low-compute sandbox design.
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
| Sandbox goals | Safety, repeatability, cost. |
| Tool allowlists | Controlling action space. |
| Reset and validation | Making labs reliable. |

#### Authored course transcript / reading script

This lesson is about **sandboxed agent execution**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining allowed tools, mock services, filesystem boundaries, budgets, and reset behavior**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **giving an agent open-ended tool access during learning labs**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A course agent is allowed to modify only a temp workspace and call mock APIs with synthetic data.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the sandbox is safe enough for learners.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Build agent labs that are safe to run without expensive infrastructure. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Scope reduction** — Use mock services and fictional data.
2. **Resetability** — Every run should restore the environment.
3. **Budget limits** — Token, time, and tool-call budgets make evaluations comparable.

#### Visual explainer spec
- Diagram title: Sandbox boundary diagram
- Diagram type: container/boundary diagram
- Nodes / panels: Agent / allowed tools / mock services / temp workspace / blocked external actions
- Text summary: The sandbox controls what the agent can affect.

#### Worked example
- Weak version: “Let learners run agents on their real machine with broad permissions.”
- Improved version: “Run agents in a resettable workspace with mock APIs, synthetic files, allowlisted tools, and strict budgets.”
- Why improved: The improved version teaches execution without real-world risk.

#### Common mistakes
- giving an agent open-ended tool access during learning labs
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Design a mock enterprise workspace for Aster-3.
- Learner task: List allowed tools, blocked actions, reset rule, and logging fields.
- Strong answer pattern: Strong answer uses synthetic docs, mock email, fake CRM, no external writes, clear reset.
- Feedback: Good: safe tasks can still be meaningful.
- Retry hint: Remove real-world side effects.

#### Quiz / decision checkpoint
- Question: What is the safest default for course agent labs?
- Options:
  - A. Real email account access.
  - B. Mock services with synthetic data and resettable state.
  - C. Unrestricted shell access.
  - D. Production credentials.
- Correct answer: B
- Explanation: Mock and resettable environments keep labs useful and safe.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Agent Execution Sandbox Spec

- Allowed tools
- Blocked tools
- Synthetic data
- Budget limits
- Reset command
- Logs
- Safety notes

#### Validation rules
- Must use synthetic data.
- Must define reset command.
- Must define blocked actions.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Required | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Required | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-038 | PM2 process manager | PM2 | tool documentation | beginner-intermediate | Required | Lightweight process supervision useful for native host lab services. | https://pm2.keymetrics.io/ |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L6 — Long Task Horizons, Autonomy, and ARA

#### Metadata
- lessonId: P3.L6
- phaseId: P3
- duration: 105 min
- difficulty: intermediate
- learningObjective: Explain long-task time horizons and autonomous replication/adaptation as evaluation frames.
- lessonPromise: Understand why frontier agent capability is about reliability over longer, messier tasks.
- requiredArtifactOutput: Autonomy Risk Frame
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-019, S-020, S-026, S-027

#### Video card metadata — V3 external reference video

- primaryVideoTitle: METR: Measuring AI Ability to Complete Long Tasks
- primaryVideoProvider: METR article / external media alternative
- primaryVideoUrl: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Direct reference for long-horizon autonomy and task-completion framing.
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
| Time horizon metric | What the metric means. |
| Reliability and task distribution | Why success rate matters. |
| Risk implications | How autonomy changes governance. |

#### Authored course transcript / reading script

This lesson is about **long-horizon autonomy evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **measuring task success by human-time horizon, reliability, adaptation, and resource-acquisition constraints**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **confusing short-demo success with durable autonomy**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model completes a 10-minute setup but fails when an error requires debugging and replanning.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether task horizon evidence changes release restrictions.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Understand why frontier agent capability is about reliability over longer, messier tasks. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Time horizon** — Measure how long a human task the model can complete with a given reliability.
2. **Adaptation** — Track recovery from errors, not only first-attempt success.
3. **ARA caution** — Discuss autonomous replication/adaptation as a risk frame without operational instructions.

#### Visual explainer spec
- Diagram title: Task horizon ladder
- Diagram type: ladder diagram
- Nodes / panels: 5 min / 30 min / 2 h / 1 day / multi-day with reliability targets
- Text summary: Longer tasks require reliability, memory, and adaptation.

#### Worked example
- Weak version: “It solved one hard task once.”
- Improved version: “It solves 50-minute tasks with 50% reliability under defined tools and budgets; longer tasks fail due to recovery limits.”
- Why improved: The improved version reports reliability and horizon.

#### Common mistakes
- confusing short-demo success with durable autonomy
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model succeeds on short coding tasks but fails on long messy workflows.
- Learner task: Choose the next evaluation to test adaptation safely.
- Strong answer pattern: Strong answer adds staged tasks with injected benign errors and recovery scoring.
- Feedback: Good: capability is reliability under messiness.
- Retry hint: Measure recovery, not only success.

#### Quiz / decision checkpoint
- Question: What does a 50% task-completion time horizon mean?
- Options:
  - A. The clock time the AI takes to respond.
  - B. The human task duration at which the AI succeeds about half the time under the protocol.
  - C. The number of prompts in a chat.
  - D. The video length.
- Correct answer: B
- Explanation: The METR framing compares task difficulty by typical human completion time, not model runtime.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Autonomy Risk Frame

- Task family
- Human-time estimate
- Model success rate
- Failure modes
- Recovery behavior
- Risk implication

#### Validation rules
- Must include reliability level.
- Must avoid operational replication instructions.
- Must include a safe adaptation task.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-019 | METR: Measuring AI Ability to Complete Long Tasks | METR | paper / report | advanced | Required | Introduces time-horizon framing for autonomous task completion capability. | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ |
| S-020 | Evaluating Language-Model Agents on Realistic Autonomous Tasks | METR / ARC Evals | paper | advanced | Required | Introduces autonomous replication and adaptation task framing for agent risk assessment. | https://arxiv.org/abs/2312.11671 |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Optional / advanced | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P3.L7 — Phase Studio: Agent Execution Sandbox

#### Metadata
- lessonId: P3.L7
- phaseId: P3
- duration: 105 min
- difficulty: intermediate
- learningObjective: Assemble the phase deliverable: a safe agent execution sandbox with trace logging and validation.
- lessonPromise: Turn agent theory into a runnable, portfolio-ready sandbox spec.
- requiredArtifactOutput: Agent Execution Sandbox
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-016, S-017, S-018, S-037, S-040

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Evaluating CrewAI + MCP with Promptfoo
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=o7CKEeyth1Q
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Practical reference for agent/MCP evaluation and phase-studio implementation.
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
| Build the sandbox | Repo and task layout. |
| Run an agent | Mock execution. |
| Inspect traces | Score outcome and trajectory. |
| Export evidence | Capstone import. |

#### Authored course transcript / reading script

This lesson is about **sandbox artifact assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **combining environment spec, tool allowlist, trace schema, tasks, scorer, and validation script**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **submitting a conceptual writeup without runnable validation**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Aster-3 gets a mock enterprise workspace with three task families and structured traces.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the sandbox can feed capstone evidence cards.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Turn agent theory into a runnable, portfolio-ready sandbox spec. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Portfolio artifact** — A sandbox spec is a professional deliverable.
2. **Trace-to-evidence** — Logs become evidence cards.
3. **Quality gates** — No sandbox is complete without reset, blocked actions, and validation.

#### Visual explainer spec
- Diagram title: Sandbox to evidence flow
- Diagram type: flow diagram
- Nodes / panels: Task → agent run → trace → scorer → evidence card → capstone
- Text summary: Agent execution becomes reviewable evidence.

#### Worked example
- Weak version: “Here is a description of agent risk.”
- Improved version: “Here is a runnable sandbox with tasks, mock data, allowed tools, trace schema, scorer, validation, and exported evidence cards.”
- Why improved: The improved version proves competence through artifacts.

#### Common mistakes
- submitting a conceptual writeup without runnable validation
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Run a mock task where the agent must summarize a fictional contract and update a fake CRM.
- Learner task: Define success, allowed tools, trajectory checks, and evidence card fields.
- Strong answer pattern: Strong answer covers task completion, unauthorized action check, data handling, and limitation note.
- Feedback: Good: the artifact is safe and auditable.
- Retry hint: Make every action inspectable.

#### Quiz / decision checkpoint
- Question: What must the phase deliverable export?
- Options:
  - A. Evidence cards and validation results.
  - B. Only screenshots.
  - C. A generic badge.
  - D. Production credentials.
- Correct answer: A
- Explanation: The course is artifact-driven; traces must become evidence.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Agent Execution Sandbox

- Sandbox name
- Task families
- Allowed tools
- Trace schema
- Scoring rubric
- Validation command
- Evidence export

#### Validation rules
- Must pass validation.
- Must export at least three evidence cards.
- Must include safety constraints.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-016 | OSWorld | XLang Lab et al. | benchmark / paper | advanced | Required | Real-computer environment for evaluating multimodal desktop agents. | https://os-world.github.io/ |
| S-017 | WebArena | WebArena team | benchmark | advanced | Required | Self-hosted web environments for evaluating autonomous web agents. | https://webarena.dev/ |
| S-018 | GAIA | Meta / Hugging Face / academic contributors | benchmark / dataset | advanced | Required | General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion. | https://huggingface.co/datasets/gaia-benchmark/GAIA |
| S-037 | OpenTelemetry documentation | OpenTelemetry | tool documentation | intermediate | Optional / advanced | Production observability standard for traces, metrics, and logs. | https://opentelemetry.io/docs/ |
| S-040 | Pytest documentation | Pytest | tool documentation | beginner-intermediate | Optional / advanced | Validation scripts and unit-style tests for course labs. | https://docs.pytest.org/ |

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
| P3.L1 | Reference video — Why Agent Evaluation Is Different | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L2 | Reference video — Tool Calls, State, and Trajectory Logging | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L3 | Reference video — SWE-bench and Coding Agent Evaluation | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L4 | Reference video — OSWorld, WebArena, and GAIA | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L5 | Reference video — Sandboxes and Low-Compute Agent Execution | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L6 | Reference video — Long Task Horizons, Autonomy, and ARA | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P3.L7 | Reference video — Phase Studio: Agent Execution Sandbox | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
