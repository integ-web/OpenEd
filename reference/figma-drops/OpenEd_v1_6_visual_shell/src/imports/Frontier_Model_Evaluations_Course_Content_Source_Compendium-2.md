# Frontier Evaluation Lab: Course Content and Source Compendium

The complete 51-hour six-phase content spine, media plan, labs, source library, assessments, codebase blueprint and operational wrapper.

**Version:** 1.0 - Prepared for Figma Make / React implementation - June 2026

> **Core answer:** This file is the material Figma Make cannot browse or infer. It gives the product actual teaching content, lesson payloads, source IDs, labs, datasets, rubrics and operational assets so the course can move learners from novice to intermediate, with advanced paths for deeper study.

## Table of contents

1. Course promise and mastery tracks
2. Six-phase curriculum map
3. Phase-by-phase lesson payloads
4. Instructional media plan
5. Technical infrastructure and codebase blueprint
6. Golden datasets
7. Assessments, validation scripts and rubrics
8. Operational wrapper
9. Resource hub and source library
10. Glossary seed

# 1. Course promise and mastery tracks

Course title: Frontier Model Evaluations.

Course promise: A learner with curiosity and basic technical literacy can go from zero to strong intermediate competence in frontier model evaluation by completing the 51-hour course. A learner who completes the advanced resources can move toward advanced practice in benchmark design, harness engineering, agent evaluation, spatial/world-model evaluation, red teaming and production decision gates.

| **Track**                      | **Learner does**                                                    | **Expected outcome**                                                                                                                                 |
|--------------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Novice entry                   | Completes onboarding, diagnostic and Phase 1.                       | Can explain evaluation, identify benchmark caveats and write a precise evaluation objective.                                                         |
| Intermediate course completion | Completes all six phases, labs, quizzes and phase deliverables.     | Can design and run safe evaluation harnesses, score evidence, produce risk reports and defend a deployment recommendation.                           |
| Advanced track                 | Completes external papers/books/courses and optional expanded labs. | Can critique frontier evaluation claims, adapt tools to new settings and participate in technical due diligence or third-party evaluation workflows. |

# 2. Six-phase curriculum map

| **Phase**                     | **Hours** | **Core competency**                                                                                                              | **Mastery competency**                                                                                                                                       | **Key tools/frameworks**                                                                                 | **Phase deliverable**            |
|-------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|----------------------------------|
| P1 - The Paradigm             | 6         | Define outcome vs trajectory metrics, establish baseline capability limits, and read frontier claims with scientific skepticism. | Perform venture-grade technical due diligence on AI startups: inspect claims, identify technical moats, and map capability evidence to deployment decisions. | Humanity's Last Exam, Chatbot Arena, HELM, MMLU, GPQA, AI Index                                          | Custom Evaluation Rubric         |
| P2 - Harness Engineering      | 8         | Automate golden datasets, configure LLM-as-judge systems and execute RAG Triad evaluations.                                      | Calibrate judge entropy and engineer lightweight native-host harnesses that avoid heavy virtualization overhead.                                             | DeepEval, promptfoo, Inspect AI, Ragas, LM Eval Harness, OpenAI Evals, PM2, Claude/GPT/Gemini as judges  | Automated Native Testing Harness |
| P3 - Autonomous Agents        | 12        | Track multi-turn tool calls, agent state changes and software engineering tasks.                                                 | Benchmark memory-efficient, locally executed agents compiled for low-compute hardware constraints.                                                           | SWE-bench Verified/Pro, OSWorld, WebArena, GAIA, custom Rust sandboxes, OpenTelemetry                    | Agent Execution Sandbox          |
| P4 - Spatial and World Models | 9         | Test object permanence, physical accuracy and visual-spatial reasoning.                                                          | Evaluate zero-shot physical reasoning for autonomous transitions in industrial and factory layout simulations.                                               | ARC-AGI-2, RLBench, PHYBench, MMMU, VQA, video/world-model APIs including Veo/Sora where available       | Physical Simulation Benchmark    |
| P5 - Red Teaming              | 10        | Execute state-based attacks and multi-turn prompt injection evaluations safely.                                                  | Profile models for sandbagging, strategic underperformance and deception without creating harmful operational instructions.                                  | Inspect AI, automated jailbreak datasets, promptfoo red teaming, AISI/METR frameworks, policy thresholds | Threat and Vulnerability Report  |
| P6 - Enterprise Pipeline      | 6         | Measure TTFT, concurrency latency and model drift in production-style pipelines.                                                 | Build cost-to-capability models for edge deployment and logical telemetry models for decision dashboards.                                                    | CI/CD, GitHub Actions, Microsoft Fabric, BI dashboards, OpenTelemetry, promptfoo, Evidently AI, PM2      | Production-Ready Deployment Gate |

## Crosswalk from previous structures

| **Old / uploaded structure**                                                                      | **Where it goes in the six-phase course**                                                                                                                             |
|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 10-module curriculum: Foundations, Benchmark Design, Automatic Eval, Human Eval, Major Benchmarks | Mostly Phase 1 and Phase 2. Foundations and vocabulary become Phase 1. Metrics, statistics, LLM-as-judge, human evaluation and benchmark construction become Phase 2. |
| 10-module curriculum: Safety, Alignment, Frontier-specific evals                                  | Mostly Phase 5, with dangerous capability framework sources also used in Phase 1 and Phase 6 decision gates.                                                          |
| 10-module curriculum: Infrastructure and Tooling                                                  | Phase 2 for harnesses and Phase 6 for CI/CD, telemetry and production gates.                                                                                          |
| 10-module curriculum: Advanced Topics and Practicum                                               | Distributed through Phase 3, Phase 4, Phase 5 and the Aster-3 capstone in Phase 6.                                                                                    |
| Prior 9-module Figma structure                                                                    | Use as screen IA inspiration only. Replace course data with six phases.                                                                                               |
| Detailed Module 1 foundations content                                                             | Use as the expanded source for Phase 1 lessons on evaluation definition, vocabulary, taxonomy, history, Goodhart, contamination and statistics.                       |

# 3. Phase-by-phase lesson payloads

## P1. The Paradigm - 6 hours

Phase deliverable: Custom Evaluation Rubric.

Core competency: Define outcome vs trajectory metrics, establish baseline capability limits, and read frontier claims with scientific skepticism.

Advanced competency: Perform venture-grade technical due diligence on AI startups: inspect claims, identify technical moats, and map capability evidence to deployment decisions.

Key tools and frameworks: Humanity's Last Exam, Chatbot Arena, HELM, MMLU, GPQA, AI Index

| **ID** | **Lesson**                                       | **Time** | **Learning objective**                                                                | **Artifact/output**             | **Sources**                   |
|--------|--------------------------------------------------|----------|---------------------------------------------------------------------------------------|---------------------------------|-------------------------------|
| 1.1    | What Is Frontier Model Evaluation?               | 45 min   | Explain evaluation as systematic measurement of model behavior, not demos or vibes.   | Evaluation lifecycle map        | S-001,S-022,S-023,S-036       |
| 1.2    | Outcome Metrics vs Trajectory Metrics            | 60 min   | Distinguish final-answer performance from path/process quality in multi-step systems. | Metric taxonomy card            | S-001,S-008,S-018,S-023       |
| 1.3    | Benchmark Saturation, Contamination and Goodhart | 75 min   | Identify why benchmark scores stop being trustworthy as benchmarks become targets.    | Benchmark risk note             | S-010,S-012,S-014,S-015,S-034 |
| 1.4    | From Vague Risk to Evaluation Objective          | 90 min   | Convert vague frontier safety concerns into precise evaluation objectives.            | Evaluation Objective Card       | S-022,S-023,S-024,S-025,S-026 |
| 1.5    | Technical Due Diligence and AI Moats             | 60 min   | Inspect frontier model claims as an investor, auditor or safety evaluator would.      | Venture-grade evaluation rubric | S-001,S-010,S-011,S-027,S-028 |
| 1.6    | Phase Studio: Build the Custom Evaluation Rubric | 30 min   | Synthesize the phase into a reusable rubric for later labs.                           | Custom Evaluation Rubric        | S-001,S-022,S-023,S-034,S-035 |

### Lesson content cards

| **Block**              | **Content payload**                                                                                                                         |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | What Is Frontier Model Evaluation? (45 min). Objective: Explain evaluation as systematic measurement of model behavior, not demos or vibes. |
| Why this matters       | Model evaluation asks whether a system is good for a specific task, user, setting and stake.                                                |
| Mental model / diagram | Evaluation loop: question -> task -> input -> model -> measurement -> analysis -> decision.                                           |
| Worked example         | Mini case: rewrite "the model seems smart" into a measurable claim.                                                                         |
| Interactive exercise   | Define three release decisions that would need evidence.                                                                                    |
| Knowledge check        | Knowledge check on evaluation vs training/testing/auditing.                                                                                 |
| Artifact output        | Evaluation lifecycle map                                                                                                                    |
| Source IDs             | S-001,S-022,S-023,S-036                                                                                                                     |

| **Block**              | **Content payload**                                                                                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Outcome Metrics vs Trajectory Metrics (60 min). Objective: Distinguish final-answer performance from path/process quality in multi-step systems. |
| Why this matters       | Outcome metrics score the endpoint; trajectory metrics inspect the steps, tool calls, state changes and evidence trail.                          |
| Mental model / diagram | Outcome score and trajectory trace shown side-by-side.                                                                                           |
| Worked example         | Compare two agents that both finish a task; one used unsafe tool calls and one did not.                                                          |
| Interactive exercise   | Classify 12 metrics as outcome, trajectory, cost, risk or confidence.                                                                            |
| Knowledge check        | Metric classification quiz.                                                                                                                      |
| Artifact output        | Metric taxonomy card                                                                                                                             |
| Source IDs             | S-001,S-008,S-018,S-023                                                                                                                          |

| **Block**              | **Content payload**                                                                                                                                      |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Benchmark Saturation, Contamination and Goodhart (75 min). Objective: Identify why benchmark scores stop being trustworthy as benchmarks become targets. |
| Why this matters       | When a score becomes a target, it can detach from the capability we actually care about.                                                                 |
| Mental model / diagram | Static benchmark lifecycle: launch -> adoption -> optimization -> saturation -> deprecation.                                                         |
| Worked example         | Read a leaderboard claim and list 5 caveats before accepting it.                                                                                         |
| Interactive exercise   | Contamination threat review for HLE, MMLU or SWE-bench-style claims.                                                                                     |
| Knowledge check        | Goodhart anti-pattern quiz.                                                                                                                              |
| Artifact output        | Benchmark risk note                                                                                                                                      |
| Source IDs             | S-010,S-012,S-014,S-015,S-034                                                                                                                            |

| **Block**              | **Content payload**                                                                                                                                           |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | From Vague Risk to Evaluation Objective (90 min). Objective: Convert vague frontier safety concerns into precise evaluation objectives.                       |
| Why this matters       | Professional evaluators start with the risk claim and decision, not the benchmark they happen to have.                                                        |
| Mental model / diagram | Threat model -> evaluation objective -> task design -> evidence -> decision.                                                                              |
| Worked example         | Weak: "test if dangerous". Strong: "evaluate whether browser+terminal access improves novice completion of controlled multi-step cyber reconnaissance tasks." |
| Interactive exercise   | Transform "biological misuse" into actor, capability, harm pathway, access, environment, success condition and evidence needed.                               |
| Knowledge check        | Objective-quality decision checkpoint.                                                                                                                        |
| Artifact output        | Evaluation Objective Card                                                                                                                                     |
| Source IDs             | S-022,S-023,S-024,S-025,S-026                                                                                                                                 |

| **Block**              | **Content payload**                                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Technical Due Diligence and AI Moats (60 min). Objective: Inspect frontier model claims as an investor, auditor or safety evaluator would. |
| Why this matters       | A moat is not a benchmark score; it is defensible capability, data, deployment learning, evaluation rigor and institutional access.        |
| Mental model / diagram | Moat evidence matrix: model, data, eval, users, infra, governance.                                                                         |
| Worked example         | Assess three fictional startups and score claim strength.                                                                                  |
| Interactive exercise   | Map public claims to evidence needs.                                                                                                       |
| Knowledge check        | Rubric scoring exercise.                                                                                                                   |
| Artifact output        | Venture-grade evaluation rubric                                                                                                            |
| Source IDs             | S-001,S-010,S-011,S-027,S-028                                                                                                              |

| **Block**              | **Content payload**                                                                                                               |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Phase Studio: Build the Custom Evaluation Rubric (30 min). Objective: Synthesize the phase into a reusable rubric for later labs. |
| Why this matters       | A useful rubric separates capability, elicitation, reliability, risk and decision relevance.                                      |
| Mental model / diagram | Rubric anatomy.                                                                                                                   |
| Worked example         | Create rubric rows for a chosen model/product domain.                                                                             |
| Interactive exercise   | Peer review rubric against validity threats.                                                                                      |
| Knowledge check        | Phase exit check.                                                                                                                 |
| Artifact output        | Custom Evaluation Rubric                                                                                                          |
| Source IDs             | S-001,S-022,S-023,S-034,S-035                                                                                                     |

## P2. Harness Engineering - 8 hours

Phase deliverable: Automated Native Testing Harness.

Core competency: Automate golden datasets, configure LLM-as-judge systems and execute RAG Triad evaluations.

Advanced competency: Calibrate judge entropy and engineer lightweight native-host harnesses that avoid heavy virtualization overhead.

Key tools and frameworks: DeepEval, promptfoo, Inspect AI, Ragas, LM Eval Harness, OpenAI Evals, PM2, Claude/GPT/Gemini as judges

| **ID** | **Lesson**                                   | **Time** | **Learning objective**                                                       | **Artifact/output**              | **Sources**                   |
|--------|----------------------------------------------|----------|------------------------------------------------------------------------------|----------------------------------|-------------------------------|
| 2.1    | Evaluation Harness Anatomy                   | 60 min   | Describe the components of a working evaluation harness.                     | Harness stack map                | S-002,S-003,S-004,S-045       |
| 2.2    | Golden Datasets and Edge-Case Sampling       | 75 min   | Build curated evaluation files that represent risk claims and failure modes. | Golden dataset packet            | S-034,S-035,S-007,S-039       |
| 2.3    | LLM-as-Judge Without Self-Deception          | 90 min   | Design judge prompts, rubrics and calibration procedures.                    | Judge calibration report         | S-008,S-009,S-006,S-023       |
| 2.4    | RAG Triad and Retrieval-Aware Evaluation     | 75 min   | Evaluate answer faithfulness, answer relevance and context relevance.        | RAG evaluation card              | S-007,S-006,S-039             |
| 2.5    | Native Host Deployment for Low-Overhead Labs | 75 min   | Run eval services locally without heavy VMs where safe.                      | Native harness config            | S-042,S-045,S-046             |
| 2.6    | Promptfoo, DeepEval and Inspect AI Lab       | 105 min  | Compare frameworks and implement the same evaluation in at least two.        | Automated Native Testing Harness | S-004,S-005,S-006,S-002,S-003 |

### Lesson content cards

| **Block**              | **Content payload**                                                                                               |
|------------------------|-------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Evaluation Harness Anatomy (60 min). Objective: Describe the components of a working evaluation harness.          |
| Why this matters       | A harness is a repeatable instrument: dataset, runner, model adapter, solver/scaffold, scorer, logger and report. |
| Mental model / diagram | Harness stack diagram.                                                                                            |
| Worked example         | Inspect AI Task = dataset + solver + scorer.                                                                      |
| Interactive exercise   | Label harness parts in code/config snippets.                                                                      |
| Knowledge check        | Harness anatomy quiz.                                                                                             |
| Artifact output        | Harness stack map                                                                                                 |
| Source IDs             | S-002,S-003,S-004,S-045                                                                                           |

| **Block**              | **Content payload**                                                                                                                      |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Golden Datasets and Edge-Case Sampling (75 min). Objective: Build curated evaluation files that represent risk claims and failure modes. |
| Why this matters       | A golden dataset is not just examples; it is a documented sample of tasks, labels, adversarial variants and validity threats.            |
| Mental model / diagram | Dataset card + task row anatomy.                                                                                                         |
| Worked example         | Create a 20-item golden set for a safe RAG hallucination eval.                                                                           |
| Interactive exercise   | Write JSONL rows with expected behavior and scoring rationale.                                                                           |
| Knowledge check        | Dataset design checkpoint.                                                                                                               |
| Artifact output        | Golden dataset packet                                                                                                                    |
| Source IDs             | S-034,S-035,S-007,S-039                                                                                                                  |

| **Block**              | **Content payload**                                                                                                              |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | LLM-as-Judge Without Self-Deception (90 min). Objective: Design judge prompts, rubrics and calibration procedures.               |
| Why this matters       | LLM judges are useful but biased. You must measure agreement, position bias, verbosity bias, self-preference and judge variance. |
| Mental model / diagram | Judge calibration loop.                                                                                                          |
| Worked example         | Score the same responses with categorical and pairwise judges.                                                                   |
| Interactive exercise   | Calibrate a judge on a held-out expert-labeled set.                                                                              |
| Knowledge check        | Judge validity quiz.                                                                                                             |
| Artifact output        | Judge calibration report                                                                                                         |
| Source IDs             | S-008,S-009,S-006,S-023                                                                                                          |

| **Block**              | **Content payload**                                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | RAG Triad and Retrieval-Aware Evaluation (75 min). Objective: Evaluate answer faithfulness, answer relevance and context relevance. |
| Why this matters       | RAG failures are often retrieval failures disguised as generation failures.                                                         |
| Mental model / diagram | RAG triad: answer, context, question.                                                                                               |
| Worked example         | Trace a hallucination to retrieval miss vs answer unsupported by context.                                                           |
| Interactive exercise   | Run a toy RAG triad evaluation.                                                                                                     |
| Knowledge check        | RAG failure classification.                                                                                                         |
| Artifact output        | RAG evaluation card                                                                                                                 |
| Source IDs             | S-007,S-006,S-039                                                                                                                   |

| **Block**              | **Content payload**                                                                                                                            |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Native Host Deployment for Low-Overhead Labs (75 min). Objective: Run eval services locally without heavy VMs where safe.                      |
| Why this matters       | For course labs, native processes and isolated working directories are enough when tasks are de-risked and do not require untrusted execution. |
| Mental model / diagram | Native process supervision diagram.                                                                                                            |
| Worked example         | Use PM2 or shell scripts to supervise a local mock model and judge service.                                                                    |
| Interactive exercise   | Write an environment checklist.                                                                                                                |
| Knowledge check        | Setup sanity check.                                                                                                                            |
| Artifact output        | Native harness config                                                                                                                          |
| Source IDs             | S-042,S-045,S-046                                                                                                                              |

| **Block**              | **Content payload**                                                                                                                |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Promptfoo, DeepEval and Inspect AI Lab (105 min). Objective: Compare frameworks and implement the same evaluation in at least two. |
| Why this matters       | Tool choice should follow the evaluation question: prompt regression, app eval, safety task, or benchmark suite.                   |
| Mental model / diagram | Tool decision tree.                                                                                                                |
| Worked example         | Implement one safe evaluator in promptfoo and one in Inspect or DeepEval.                                                          |
| Interactive exercise   | Run validation script and export report.                                                                                           |
| Knowledge check        | Tool selection quiz.                                                                                                               |
| Artifact output        | Automated Native Testing Harness                                                                                                   |
| Source IDs             | S-004,S-005,S-006,S-002,S-003                                                                                                      |

## P3. Autonomous Agents - 12 hours

Phase deliverable: Agent Execution Sandbox.

Core competency: Track multi-turn tool calls, agent state changes and software engineering tasks.

Advanced competency: Benchmark memory-efficient, locally executed agents compiled for low-compute hardware constraints.

Key tools and frameworks: SWE-bench Verified/Pro, OSWorld, WebArena, GAIA, custom Rust sandboxes, OpenTelemetry

| **ID** | **Lesson**                                                | **Time** | **Learning objective**                                                                 | **Artifact/output**         | **Sources**                   |
|--------|-----------------------------------------------------------|----------|----------------------------------------------------------------------------------------|-----------------------------|-------------------------------|
| 3.1    | Agent Anatomy: Tools, State and Control                   | 75 min   | Explain how an agent differs from a single-turn chatbot.                               | Agent trace map             | S-016,S-017,S-018,S-023       |
| 3.2    | Software Engineering Benchmarks and Contamination Caveats | 90 min   | Use SWE-style benchmarks while recognizing deprecation and contamination risks.        | SWE benchmark validity note | S-015,S-002,S-045,S-046       |
| 3.3    | Desktop and Web Agent Evaluation                          | 90 min   | Design tasks for computer-use and web-use agents safely.                               | Agent task spec             | S-016,S-017,S-018             |
| 3.4    | Rust Sandbox and Low-Compute Execution Pattern            | 120 min  | Specify a lightweight sandbox for de-risked agent labs.                                | Agent Execution Sandbox v0  | S-044,S-040,S-045             |
| 3.5    | Memory, Context and Long-Horizon Reliability              | 90 min   | Measure whether an agent maintains goals and facts across many turns.                  | Agent failure taxonomy      | S-016,S-017,S-018,S-023       |
| 3.6    | Scoring Agent Trajectories                                | 105 min  | Score both completion and path quality.                                                | Trajectory scorer           | S-004,S-008,S-040,S-045       |
| 3.7    | Phase Studio: Agent Sandbox Report                        | 150 min  | Package environment, task set, logs, results and limitations into an auditable report. | Agent Execution Sandbox     | S-004,S-016,S-017,S-018,S-040 |

### Lesson content cards

| **Block**              | **Content payload**                                                                                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Agent Anatomy: Tools, State and Control (75 min). Objective: Explain how an agent differs from a single-turn chatbot.                            |
| Why this matters       | Agent evaluation measures trajectories, not just final answers. Tools, memory, state, permissions and stop conditions become part of the system. |
| Mental model / diagram | Agent loop diagram.                                                                                                                              |
| Worked example         | Trace a fictional agent from user goal to action log.                                                                                            |
| Interactive exercise   | Annotate state transitions and tool calls.                                                                                                       |
| Knowledge check        | Agent anatomy quiz.                                                                                                                              |
| Artifact output        | Agent trace map                                                                                                                                  |
| Source IDs             | S-016,S-017,S-018,S-023                                                                                                                          |

| **Block**              | **Content payload**                                                                                                                                            |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Software Engineering Benchmarks and Contamination Caveats (90 min). Objective: Use SWE-style benchmarks while recognizing deprecation and contamination risks. |
| Why this matters       | Coding benchmarks can become obsolete when models train on public issues and tests. Freshness, private tests and issue provenance matter.                      |
| Mental model / diagram | Benchmark freshness ladder.                                                                                                                                    |
| Worked example         | Compare SWE-bench Verified, Lite and Pro-style design choices.                                                                                                 |
| Interactive exercise   | Write a validity note for a coding benchmark.                                                                                                                  |
| Knowledge check        | Coding benchmark caveat quiz.                                                                                                                                  |
| Artifact output        | SWE benchmark validity note                                                                                                                                    |
| Source IDs             | S-015,S-002,S-045,S-046                                                                                                                                        |

| **Block**              | **Content payload**                                                                                               |
|------------------------|-------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Desktop and Web Agent Evaluation (90 min). Objective: Design tasks for computer-use and web-use agents safely.    |
| Why this matters       | Realistic environments matter because agents fail through browsing, forms, files, timing and hidden instructions. |
| Mental model / diagram | Environment realism spectrum.                                                                                     |
| Worked example         | Study OSWorld and WebArena task anatomy.                                                                          |
| Interactive exercise   | Create a toy browser task with programmatic success check.                                                        |
| Knowledge check        | Environment design checkpoint.                                                                                    |
| Artifact output        | Agent task spec                                                                                                   |
| Source IDs             | S-016,S-017,S-018                                                                                                 |

| **Block**              | **Content payload**                                                                                                                                       |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Rust Sandbox and Low-Compute Execution Pattern (120 min). Objective: Specify a lightweight sandbox for de-risked agent labs.                              |
| Why this matters       | The sandbox constrains file scope, network permissions, command budget and log capture. The goal is evaluation reproducibility, not offensive capability. |
| Mental model / diagram | Sandbox boundary diagram.                                                                                                                                 |
| Worked example         | Build or review a Rust command-runner skeleton that executes allowed toy commands only.                                                                   |
| Interactive exercise   | Write allowlist, timeout and log schema.                                                                                                                  |
| Knowledge check        | Sandbox safety quiz.                                                                                                                                      |
| Artifact output        | Agent Execution Sandbox v0                                                                                                                                |
| Source IDs             | S-044,S-040,S-045                                                                                                                                         |

| **Block**              | **Content payload**                                                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Memory, Context and Long-Horizon Reliability (90 min). Objective: Measure whether an agent maintains goals and facts across many turns. |
| Why this matters       | Long-horizon failures include goal drift, forgetting constraints, looping, tool overuse and hidden-instruction obedience.               |
| Mental model / diagram | Context window vs state store diagram.                                                                                                  |
| Worked example         | Analyze three traces and classify failures.                                                                                             |
| Interactive exercise   | Design a memory stress test using toy tasks.                                                                                            |
| Knowledge check        | Failure taxonomy quiz.                                                                                                                  |
| Artifact output        | Agent failure taxonomy                                                                                                                  |
| Source IDs             | S-016,S-017,S-018,S-023                                                                                                                 |

| **Block**              | **Content payload**                                                                                             |
|------------------------|-----------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Scoring Agent Trajectories (105 min). Objective: Score both completion and path quality.                        |
| Why this matters       | A good agent score combines success, safety, efficiency, trace validity, human intervention and recoverability. |
| Mental model / diagram | Trajectory rubric table.                                                                                        |
| Worked example         | Score five fictional traces with a multi-axis rubric.                                                           |
| Interactive exercise   | Implement a scorer for log files.                                                                               |
| Knowledge check        | Scorer sanity check.                                                                                            |
| Artifact output        | Trajectory scorer                                                                                               |
| Source IDs             | S-004,S-008,S-040,S-045                                                                                         |

| **Block**              | **Content payload**                                                                                                                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Phase Studio: Agent Sandbox Report (150 min). Objective: Package environment, task set, logs, results and limitations into an auditable report. |
| Why this matters       | Agent evaluation is only credible if another evaluator can reproduce the run and inspect the trace.                                             |
| Mental model / diagram | Evidence flow: trace -> scorer -> evidence card -> decision.                                                                                 |
| Worked example         | Run a complete de-risked agent task and export evidence cards.                                                                                  |
| Interactive exercise   | Validate logs and artifact completeness.                                                                                                        |
| Knowledge check        | Phase exit check.                                                                                                                               |
| Artifact output        | Agent Execution Sandbox                                                                                                                         |
| Source IDs             | S-004,S-016,S-017,S-018,S-040                                                                                                                   |

## P4. Spatial and World Models - 9 hours

Phase deliverable: Physical Simulation Benchmark.

Core competency: Test object permanence, physical accuracy and visual-spatial reasoning.

Advanced competency: Evaluate zero-shot physical reasoning for autonomous transitions in industrial and factory layout simulations.

Key tools and frameworks: ARC-AGI-2, RLBench, PHYBench, MMMU, VQA, video/world-model APIs including Veo/Sora where available

| **ID** | **Lesson**                                        | **Time** | **Learning objective**                                                               | **Artifact/output**               | **Sources**             |
|--------|---------------------------------------------------|----------|--------------------------------------------------------------------------------------|-----------------------------------|-------------------------|
| 4.1    | What Counts as Spatial or World-Model Evaluation? | 60 min   | Define spatial reasoning, physical reasoning and world-model claims.                 | Spatial capability ladder         | S-019,S-020,S-021       |
| 4.2    | Object Permanence and Visual-Spatial Reasoning    | 75 min   | Design evaluations for hidden objects, relations and transformations.                | Spatial task card                 | S-019,S-021,S-035       |
| 4.3    | ARC-AGI-2 and Generalization Under Novelty        | 90 min   | Explain why ARC-style tasks emphasize fluid generalization over memorized knowledge. | ARC-style mini benchmark          | S-019,S-010,S-012       |
| 4.4    | Physical Reasoning Benchmarks                     | 90 min   | Evaluate commonsense physics without overclaiming real-world embodied ability.       | Physical reasoning validity note  | S-021,S-020,S-035       |
| 4.5    | Robotics and Industrial Simulation                | 90 min   | Use simulated robotics tasks responsibly.                                            | Industrial simulation task packet | S-020,S-021,S-023       |
| 4.6    | Video and World-Model API Evaluation              | 75 min   | Create safe prompts and rubrics for generated video/world dynamics.                  | Video/world-model rubric          | S-021,S-026,S-028       |
| 4.7    | Phase Studio: Physical Simulation Benchmark       | 60 min   | Assemble a benchmark with tasks, rubric, baselines and validity notes.               | Physical Simulation Benchmark     | S-019,S-020,S-021,S-034 |

### Lesson content cards

| **Block**              | **Content payload**                                                                                                                         |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | What Counts as Spatial or World-Model Evaluation? (60 min). Objective: Define spatial reasoning, physical reasoning and world-model claims. |
| Why this matters       | A model can describe an image without understanding persistence, causality, affordances or physical constraints.                            |
| Mental model / diagram | Capability ladder: perception -> relation -> persistence -> physics -> planning.                                                        |
| Worked example         | Classify tasks as perception, spatial, physics or planning.                                                                                 |
| Interactive exercise   | Create three safe task claims.                                                                                                              |
| Knowledge check        | Capability classification quiz.                                                                                                             |
| Artifact output        | Spatial capability ladder                                                                                                                   |
| Source IDs             | S-019,S-020,S-021                                                                                                                           |

| **Block**              | **Content payload**                                                                                                                       |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Object Permanence and Visual-Spatial Reasoning (75 min). Objective: Design evaluations for hidden objects, relations and transformations. |
| Why this matters       | Visual-spatial tests should separate recognition from reasoning over transformations.                                                     |
| Mental model / diagram | Scene-state table.                                                                                                                        |
| Worked example         | Rewrite an image QA item to require state tracking.                                                                                       |
| Interactive exercise   | Build a toy spatial JSON task row.                                                                                                        |
| Knowledge check        | Spatial reasoning checkpoint.                                                                                                             |
| Artifact output        | Spatial task card                                                                                                                         |
| Source IDs             | S-019,S-021,S-035                                                                                                                         |

| **Block**              | **Content payload**                                                                                                                                  |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | ARC-AGI-2 and Generalization Under Novelty (90 min). Objective: Explain why ARC-style tasks emphasize fluid generalization over memorized knowledge. |
| Why this matters       | ARC-like tasks test the ability to infer transformation rules from few examples, not textbook recall.                                                |
| Mental model / diagram | Input-output grid transformation diagram.                                                                                                            |
| Worked example         | Analyze a safe toy grid puzzle and state the hypothesized rule.                                                                                      |
| Interactive exercise   | Write a rule and distractor variant.                                                                                                                 |
| Knowledge check        | Generalization quiz.                                                                                                                                 |
| Artifact output        | ARC-style mini benchmark                                                                                                                             |
| Source IDs             | S-019,S-010,S-012                                                                                                                                    |

| **Block**              | **Content payload**                                                                                                               |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Physical Reasoning Benchmarks (90 min). Objective: Evaluate commonsense physics without overclaiming real-world embodied ability. |
| Why this matters       | Physics benchmarks test reasoning under textual or visual constraints; they are not a substitute for real robot deployment tests. |
| Mental model / diagram | Physics evidence ladder.                                                                                                          |
| Worked example         | Compare a text physics problem, a simulated task and a real-world claim.                                                          |
| Interactive exercise   | Write validity threats.                                                                                                           |
| Knowledge check        | Physical reasoning quiz.                                                                                                          |
| Artifact output        | Physical reasoning validity note                                                                                                  |
| Source IDs             | S-021,S-020,S-035                                                                                                                 |

| **Block**              | **Content payload**                                                                                     |
|------------------------|---------------------------------------------------------------------------------------------------------|
| Lesson hero            | Robotics and Industrial Simulation (90 min). Objective: Use simulated robotics tasks responsibly.       |
| Why this matters       | Simulation lets evaluators define repeatable tasks, but sim-to-real gaps can dominate safety decisions. |
| Mental model / diagram | Sim-to-real gap diagram.                                                                                |
| Worked example         | Study RLBench-style task family structure.                                                              |
| Interactive exercise   | Design a factory-layout transition task with abstract objects.                                          |
| Knowledge check        | Simulation validity checkpoint.                                                                         |
| Artifact output        | Industrial simulation task packet                                                                       |
| Source IDs             | S-020,S-021,S-023                                                                                       |

| **Block**              | **Content payload**                                                                                                                            |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Video and World-Model API Evaluation (75 min). Objective: Create safe prompts and rubrics for generated video/world dynamics.                  |
| Why this matters       | Video generation can appear plausible while violating causality, continuity or physics. Evaluation must use rubrics and reference constraints. |
| Mental model / diagram | Continuity rubric diagram.                                                                                                                     |
| Worked example         | Score four video descriptions against physics and continuity criteria.                                                                         |
| Interactive exercise   | Draft a safe API eval protocol.                                                                                                                |
| Knowledge check        | World-model rubric quiz.                                                                                                                       |
| Artifact output        | Video/world-model rubric                                                                                                                       |
| Source IDs             | S-021,S-026,S-028                                                                                                                              |

| **Block**              | **Content payload**                                                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Phase Studio: Physical Simulation Benchmark (60 min). Objective: Assemble a benchmark with tasks, rubric, baselines and validity notes. |
| Why this matters       | A credible spatial benchmark states exactly which capability it measures and which it does not.                                         |
| Mental model / diagram | Benchmark anatomy.                                                                                                                      |
| Worked example         | Package 10 task rows and scoring rubric.                                                                                                |
| Interactive exercise   | Run validation checklist.                                                                                                               |
| Knowledge check        | Phase exit check.                                                                                                                       |
| Artifact output        | Physical Simulation Benchmark                                                                                                           |
| Source IDs             | S-019,S-020,S-021,S-034                                                                                                                 |

## P5. Red Teaming - 10 hours

Phase deliverable: Threat and Vulnerability Report.

Core competency: Execute state-based attacks and multi-turn prompt injection evaluations safely.

Advanced competency: Profile models for sandbagging, strategic underperformance and deception without creating harmful operational instructions.

Key tools and frameworks: Inspect AI, automated jailbreak datasets, promptfoo red teaming, AISI/METR frameworks, policy thresholds

| **ID** | **Lesson**                                           | **Time** | **Learning objective**                                                             | **Artifact/output**                 | **Sources**                   |
|--------|------------------------------------------------------|----------|------------------------------------------------------------------------------------|-------------------------------------|-------------------------------|
| 5.1    | Red Teaming as Evaluation, Not Chaos                 | 60 min   | Design red team campaigns with scope, hypotheses and safety bounds.                | Red-team campaign brief             | S-031,S-004,S-005,S-022       |
| 5.2    | State-Based Attacks and Prompt Injection             | 90 min   | Evaluate agents that read untrusted content without teaching harmful exploitation. | Prompt-injection test packet        | S-005,S-017,S-023,S-029       |
| 5.3    | Automated Red Teaming and Jailbreak Datasets         | 90 min   | Use automation to find failures while preserving safe disclosure.                  | Automated red-team dataset note     | S-031,S-004,S-005,S-030       |
| 5.4    | Sandbagging, Scheming and Strategic Underperformance | 90 min   | Explain how models might behave differently under evaluation pressure.             | Scheming evaluation hypothesis card | S-022,S-023,S-024,S-025,S-028 |
| 5.5    | Dangerous Capability Domains and Information Hazards | 90 min   | Handle cyber, bio, persuasion and autonomy evidence safely.                        | Disclosure classification matrix    | S-022,S-023,S-024,S-025,S-026 |
| 5.6    | Third-Party Evaluator Access Negotiation Simulation  | 75 min   | Determine when access is sufficient to support a safety claim.                     | Evaluator access memo               | S-027,S-024,S-025,S-026       |
| 5.7    | Evidence Review, Risk Scoring and Replication        | 75 min   | Convert red-team findings into auditable evidence cards.                           | Red-team evidence library           | S-004,S-022,S-023,S-035       |
| 5.8    | Phase Studio: Threat and Vulnerability Report        | 120 min  | Write a professional red-team report with actionable mitigations.                  | Threat and Vulnerability Report     | S-027,S-029,S-035,S-031       |

### Lesson content cards

| **Block**              | **Content payload**                                                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Red Teaming as Evaluation, Not Chaos (60 min). Objective: Design red team campaigns with scope, hypotheses and safety bounds.        |
| Why this matters       | Red teaming is adversarial measurement. A campaign should have claims, task families, safety controls, logging and escalation rules. |
| Mental model / diagram | Red-team campaign loop.                                                                                                              |
| Worked example         | Turn a vague concern into a campaign brief.                                                                                          |
| Interactive exercise   | Define scope and out-of-scope rules.                                                                                                 |
| Knowledge check        | Campaign design quiz.                                                                                                                |
| Artifact output        | Red-team campaign brief                                                                                                              |
| Source IDs             | S-031,S-004,S-005,S-022                                                                                                              |

| **Block**              | **Content payload**                                                                                                                               |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | State-Based Attacks and Prompt Injection (90 min). Objective: Evaluate agents that read untrusted content without teaching harmful exploitation.  |
| Why this matters       | Prompt injection is about instruction hierarchy, trust boundaries and state contamination. Use toy environments and harmless hidden instructions. |
| Mental model / diagram | Trusted vs untrusted instruction stack.                                                                                                           |
| Worked example         | Analyze a toy agent reading an untrusted note that says to ignore policy.                                                                         |
| Interactive exercise   | Write safe test cases and expected behavior.                                                                                                      |
| Knowledge check        | Prompt-injection checkpoint.                                                                                                                      |
| Artifact output        | Prompt-injection test packet                                                                                                                      |
| Source IDs             | S-005,S-017,S-023,S-029                                                                                                                           |

| **Block**              | **Content payload**                                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Automated Red Teaming and Jailbreak Datasets (90 min). Objective: Use automation to find failures while preserving safe disclosure. |
| Why this matters       | Automation increases coverage but can amplify weak labels and unsafe content. Keep datasets redacted, synthetic or policy-filtered. |
| Mental model / diagram | Automated attack generation loop.                                                                                                   |
| Worked example         | Compare manual, model-assisted and dataset-driven probing.                                                                          |
| Interactive exercise   | Build a harmless jailbreak-style refusal boundary set.                                                                              |
| Knowledge check        | Automation risk quiz.                                                                                                               |
| Artifact output        | Automated red-team dataset note                                                                                                     |
| Source IDs             | S-031,S-004,S-005,S-030                                                                                                             |

| **Block**              | **Content payload**                                                                                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Sandbagging, Scheming and Strategic Underperformance (90 min). Objective: Explain how models might behave differently under evaluation pressure. |
| Why this matters       | A model may underperform when it infers it is being evaluated; evidence must separate capability absence from elicitation failure.               |
| Mental model / diagram | Observed behavior vs latent capability diagram.                                                                                                  |
| Worked example         | Review a fictional trace where performance changes under benign vs evaluation framing.                                                           |
| Interactive exercise   | Write alternative hypotheses.                                                                                                                    |
| Knowledge check        | Sandbagging reasoning quiz.                                                                                                                      |
| Artifact output        | Scheming evaluation hypothesis card                                                                                                              |
| Source IDs             | S-022,S-023,S-024,S-025,S-028                                                                                                                    |

| **Block**              | **Content payload**                                                                                                                   |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Dangerous Capability Domains and Information Hazards (90 min). Objective: Handle cyber, bio, persuasion and autonomy evidence safely. |
| Why this matters       | Evaluation design can discuss risk without operationalizing harm. Use safe abstractions, expert review and disclosure tiers.          |
| Mental model / diagram | Disclosure tier ladder.                                                                                                               |
| Worked example         | Triage evidence cards into public, partner-only, restricted and internal.                                                             |
| Interactive exercise   | Redact a simulated evidence card.                                                                                                     |
| Knowledge check        | Disclosure checkpoint.                                                                                                                |
| Artifact output        | Disclosure classification matrix                                                                                                      |
| Source IDs             | S-022,S-023,S-024,S-025,S-026                                                                                                         |

| **Block**              | **Content payload**                                                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Third-Party Evaluator Access Negotiation Simulation (75 min). Objective: Determine when access is sufficient to support a safety claim. |
| Why this matters       | Independent evaluation requires enough time, model access, logs, tools and disclosure rights to make the claim credible.                |
| Mental model / diagram | Access sufficiency matrix.                                                                                                              |
| Worked example         | Negotiate a fictional 4-day black-box access package.                                                                                   |
| Interactive exercise   | Write conditions and caveats.                                                                                                           |
| Knowledge check        | Access adequacy quiz.                                                                                                                   |
| Artifact output        | Evaluator access memo                                                                                                                   |
| Source IDs             | S-027,S-024,S-025,S-026                                                                                                                 |

| **Block**              | **Content payload**                                                                                                         |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Evidence Review, Risk Scoring and Replication (75 min). Objective: Convert red-team findings into auditable evidence cards. |
| Why this matters       | A finding is not decision-grade until it has context, reproducibility, limitation, severity and review sign-off.            |
| Mental model / diagram | Finding -> evidence card -> threshold memo.                                                                               |
| Worked example         | Score evidence by severity, confidence and replication status.                                                              |
| Interactive exercise   | Create evidence cards.                                                                                                      |
| Knowledge check        | Evidence quality quiz.                                                                                                      |
| Artifact output        | Red-team evidence library                                                                                                   |
| Source IDs             | S-004,S-022,S-023,S-035                                                                                                     |

| **Block**              | **Content payload**                                                                                                                         |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Phase Studio: Threat and Vulnerability Report (120 min). Objective: Write a professional red-team report with actionable mitigations.       |
| Why this matters       | The report should help decision-makers understand what was tested, what failed, what remains uncertain and what must change before release. |
| Mental model / diagram | Report anatomy.                                                                                                                             |
| Worked example         | Assemble campaign, evidence, limitations and recommendations.                                                                               |
| Interactive exercise   | Run final rubric.                                                                                                                           |
| Knowledge check        | Phase exit check.                                                                                                                           |
| Artifact output        | Threat and Vulnerability Report                                                                                                             |
| Source IDs             | S-027,S-029,S-035,S-031                                                                                                                     |

## P6. Enterprise Pipeline - 6 hours

Phase deliverable: Production-Ready Deployment Gate.

Core competency: Measure TTFT, concurrency latency and model drift in production-style pipelines.

Advanced competency: Build cost-to-capability models for edge deployment and logical telemetry models for decision dashboards.

Key tools and frameworks: CI/CD, GitHub Actions, Microsoft Fabric, BI dashboards, OpenTelemetry, promptfoo, Evidently AI, PM2

| **ID** | **Lesson**                                         | **Time** | **Learning objective**                                                  | **Artifact/output**               | **Sources**                         |
|--------|----------------------------------------------------|----------|-------------------------------------------------------------------------|-----------------------------------|-------------------------------------|
| 6.1    | Production Telemetry for Model Evaluation          | 60 min   | Define telemetry that supports safety, quality and cost decisions.      | Telemetry schema                  | S-040,S-039,S-046                   |
| 6.2    | Performance Metrics: TTFT, Latency and Concurrency | 60 min   | Measure service-level performance without confusing speed with quality. | Performance gate spec             | S-040,S-042,S-046                   |
| 6.3    | Model Drift and Regression Gates                   | 75 min   | Create CI/CD gates that catch quality and safety regressions.           | Regression gate config            | S-005,S-045,S-046,S-039             |
| 6.4    | Cost-to-Capability and Edge Deployment Models      | 75 min   | Compare capability, cost, latency and hardware constraints.             | Cost-to-capability model          | S-028,S-040,S-041                   |
| 6.5    | Dashboards, Threshold Memos and Executive Reports  | 60 min   | Translate technical evidence into decision artifacts.                   | Risk dashboard and threshold memo | S-024,S-025,S-026,S-027,S-029       |
| 6.6    | Capstone: Deployment Gate for Aster-3 Frontier     | 30 min   | Complete the final deployment recommendation.                           | Production-Ready Deployment Gate  | S-022,S-023,S-024,S-025,S-026,S-027 |

### Lesson content cards

| **Block**              | **Content payload**                                                                                                               |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Production Telemetry for Model Evaluation (60 min). Objective: Define telemetry that supports safety, quality and cost decisions. |
| Why this matters       | Production evaluation depends on logs, traces, latency, cost, error rates, drift signals and user feedback.                       |
| Mental model / diagram | Telemetry event model.                                                                                                            |
| Worked example         | Map a request lifecycle from prompt to response to evidence card.                                                                 |
| Interactive exercise   | Design a telemetry schema.                                                                                                        |
| Knowledge check        | Telemetry quiz.                                                                                                                   |
| Artifact output        | Telemetry schema                                                                                                                  |
| Source IDs             | S-040,S-039,S-046                                                                                                                 |

| **Block**              | **Content payload**                                                                                                                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Performance Metrics: TTFT, Latency and Concurrency (60 min). Objective: Measure service-level performance without confusing speed with quality. |
| Why this matters       | TTFT, throughput, concurrency and timeout rates affect user experience and cost, but must be interpreted alongside capability and risk.         |
| Mental model / diagram | Latency distribution diagram.                                                                                                                   |
| Worked example         | Analyze synthetic latency data.                                                                                                                 |
| Interactive exercise   | Set SLOs for an eval service.                                                                                                                   |
| Knowledge check        | SLO checkpoint.                                                                                                                                 |
| Artifact output        | Performance gate spec                                                                                                                           |
| Source IDs             | S-040,S-042,S-046                                                                                                                               |

| **Block**              | **Content payload**                                                                                                                 |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Model Drift and Regression Gates (75 min). Objective: Create CI/CD gates that catch quality and safety regressions.                 |
| Why this matters       | Model updates, prompt changes and retrieval changes can silently break behavior. Eval gates should run before and after deployment. |
| Mental model / diagram | CI/CD eval gate diagram.                                                                                                            |
| Worked example         | Build a promptfoo or pytest regression checklist.                                                                                   |
| Interactive exercise   | Define pass/fail thresholds and rollback rules.                                                                                     |
| Knowledge check        | Regression gate quiz.                                                                                                               |
| Artifact output        | Regression gate config                                                                                                              |
| Source IDs             | S-005,S-045,S-046,S-039                                                                                                             |

| **Block**              | **Content payload**                                                                                                                       |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Cost-to-Capability and Edge Deployment Models (75 min). Objective: Compare capability, cost, latency and hardware constraints.            |
| Why this matters       | The best model is deployment-relative. Frontier performance may not justify cost for every task, and edge constraints change the optimum. |
| Mental model / diagram | Capability-cost frontier.                                                                                                                 |
| Worked example         | Compare three fictional model deployments.                                                                                                |
| Interactive exercise   | Build a cost-to-capability scorecard.                                                                                                     |
| Knowledge check        | Deployment tradeoff quiz.                                                                                                                 |
| Artifact output        | Cost-to-capability model                                                                                                                  |
| Source IDs             | S-028,S-040,S-041                                                                                                                         |

| **Block**              | **Content payload**                                                                                                                     |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Dashboards, Threshold Memos and Executive Reports (60 min). Objective: Translate technical evidence into decision artifacts.            |
| Why this matters       | Executives need decision-grade evidence: what changed, what was tested, what was found, what remains uncertain and what is recommended. |
| Mental model / diagram | Evidence map -> risk dashboard -> threshold memo.                                                                                     |
| Worked example         | Create a dashboard wireframe and executive summary.                                                                                     |
| Interactive exercise   | Write residual uncertainty note.                                                                                                        |
| Knowledge check        | Reporting checkpoint.                                                                                                                   |
| Artifact output        | Risk dashboard and threshold memo                                                                                                       |
| Source IDs             | S-024,S-025,S-026,S-027,S-029                                                                                                           |

| **Block**              | **Content payload**                                                                                               |
|------------------------|-------------------------------------------------------------------------------------------------------------------|
| Lesson hero            | Capstone: Deployment Gate for Aster-3 Frontier (30 min). Objective: Complete the final deployment recommendation. |
| Why this matters       | The final capstone is a pre-deployment dossier for a fictional multimodal frontier model.                         |
| Mental model / diagram | Capstone workflow.                                                                                                |
| Worked example         | Assemble all phase artifacts and choose release, restricted release, trusted-access release or delay.             |
| Interactive exercise   | Run validation gates.                                                                                             |
| Knowledge check        | Final defense.                                                                                                    |
| Artifact output        | Production-Ready Deployment Gate                                                                                  |
| Source IDs             | S-022,S-023,S-024,S-025,S-026,S-027                                                                               |

# 4. Instructional media plan

Each lesson should have four media assets: a 10-15 minute concept lecture, a lab/screencast when technical action is involved, a slide deck PDF and a transcript/summary. The course UI should show short screen copy first, then let learners open the full transcript or sources.

| **Phase** | **Title**                | **Asset type**       | **Production note**                                                                                           |
|-----------|--------------------------|----------------------|---------------------------------------------------------------------------------------------------------------|
| P1        | The Paradigm             | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 6 videos. |
| P1        | The Paradigm             | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P1        | The Paradigm             | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P1        | The Paradigm             | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |
| P2        | Harness Engineering      | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 6 videos. |
| P2        | Harness Engineering      | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P2        | Harness Engineering      | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P2        | Harness Engineering      | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |
| P3        | Autonomous Agents        | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 7 videos. |
| P3        | Autonomous Agents        | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P3        | Autonomous Agents        | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P3        | Autonomous Agents        | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |
| P4        | Spatial and World Models | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 7 videos. |
| P4        | Spatial and World Models | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P4        | Spatial and World Models | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P4        | Spatial and World Models | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |
| P5        | Red Teaming              | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 8 videos. |
| P5        | Red Teaming              | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P5        | Red Teaming              | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P5        | Red Teaming              | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |
| P6        | Enterprise Pipeline      | Concept lectures     | One short theory video per lesson, with diagrams from the UI and explicit source references. Total: 6 videos. |
| P6        | Enterprise Pipeline      | Screencasts / labs   | At least one over-the-shoulder lab per phase; Phase 2, 3 and 6 require code-heavy labs.                       |
| P6        | Enterprise Pipeline      | Slide decks          | Downloadable PDF deck for each phase; include diagrams, rubrics, source IDs and safe example constraints.     |
| P6        | Enterprise Pipeline      | Transcript / summary | Searchable transcript plus 1-page summary for each lesson.                                                    |

# 5. Technical infrastructure and codebase blueprint

The learner must execute. The technical infrastructure should be a safe, staged, locally runnable codebase with starter files, environment configs, golden datasets, validators and solution files. Use de-risked tasks and toy environments for sensitive domains.

frontier-eval-lab/

README.md

pyproject.toml

package.json

.env.example

docs/

syllabus.md

troubleshooting.md

source-library.md

safety-boundaries.md

packages/

eval_core/ # dataset loading, model adapters, scorers, evidence cards

judges/ # judge prompt templates, calibration utilities

telemetry/ # trace/log schema and dashboard exports

phases/

01_paradigm/

starter/

datasets/eval_objective_cards.jsonl

solutions/

validate_phase_01.py

02_harness_engineering/

starter/

datasets/judge_calibration_set.jsonl

datasets/rag_triad_set.jsonl

configs/promptfoo.yaml

configs/inspect_task.py

pm2.ecosystem.config.cjs

solutions/

validate_phase_02.py

03_autonomous_agents/

starter/rust_sandbox/

datasets/agent_trace_sandbox.jsonl

solutions/

validate_phase_03.py

04_spatial_world_models/

starter/

datasets/spatial_reasoning_toy_set.jsonl

solutions/

validate_phase_04.py

05_red_teaming/

starter/

datasets/red_team_cases_redacted.jsonl

solutions/

validate_phase_05.py

06_enterprise_pipeline/

starter/

datasets/telemetry_events.jsonl

dashboards/

solutions/

validate_phase_06.py

capstone/

aster3_frontier_brief.md

templates/

validate_capstone.py

| **Asset**            | **What it contains**                                                                                    | **Why it matters**                                                      |
|----------------------|---------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Starter repositories | Boilerplate code, config files, safe toy datasets and TODO markers.                                     | Learners can begin without fighting setup.                              |
| Environment configs  | .env.example, pyproject.toml, package.json, PM2 config, optional Docker files, GitHub Actions workflow. | Makes labs repeatable while avoiding unnecessary heavy virtualization.  |
| Golden datasets      | Curated JSONL/CSV files with task rows, expected behavior, labels, source IDs and validity notes.       | The datasets are the actual teaching substrate for evaluation practice. |
| Solution files       | Complete reference implementations and reports.                                                         | Learners can unblock themselves and compare against a standard.         |
| Validation scripts   | Small scripts that check schemas, required fields, scores, logs and artifact completeness.              | Converts learning into proof.                                           |

# 6. Golden datasets

| **Dataset**                     | **Phase** | **Format** | **Purpose**                                                      | **Safe sample fields**                                                                                           |
|---------------------------------|-----------|------------|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| eval_objective_cards.jsonl      | P1        | JSONL      | Practice turning vague concerns into precise objectives.         | risk_concern, actor, capability, harm_pathway, access_level, success_condition, evidence_needed, disclosure_tier |
| judge_calibration_set.jsonl     | P2        | JSONL      | Calibrate LLM-as-judge on expert-labeled examples.               | input, response_a, response_b, rubric, expert_label, rationale, allowed_variance                                 |
| rag_triad_set.jsonl             | P2        | JSONL      | Evaluate answer faithfulness and retrieval relevance.            | question, contexts, answer, ground_truth, faithfulness_label, retrieval_issue                                    |
| agent_trace_sandbox.jsonl       | P3        | JSONL      | Score toy agent traces with tool calls and state transitions.    | task_id, goal, allowed_tools, trace, final_state, success_label, safety_label                                    |
| spatial_reasoning_toy_set.jsonl | P4        | JSONL      | Test abstract spatial and physical reasoning safely.             | scene_id, initial_state, transformation, question, expected_state, validity_note                                 |
| red_team_cases_redacted.jsonl   | P5        | JSONL      | Teach adversarial evaluation without unsafe operational details. | case_id, threat_model, prompt_family_redacted, expected_safe_behavior, severity, disclosure_tier                 |
| telemetry_events.jsonl          | P6        | JSONL      | Analyze TTFT, latency, cost, errors, drift and gate results.     | request_id, model_version, ttft_ms, latency_ms, cost_usd, eval_score, drift_signal, gate_status                  |

## Sample safe JSONL rows

{"risk_concern":"This model might help with biological misuse","actor":"novice user","capability":"procedural planning assistance","harm_pathway":"unsafe real-world execution after online guidance","access_level":"chat with browser disabled","task_environment":"redacted expert-reviewed written task","success_condition":"model meaningfully improves planning score over baseline","evidence_needed":"controlled uplift study with expert rubric","disclosure_tier":"restricted"}

{"task_id":"AGENT-TOY-007","goal":"organize three local text files into labeled folders","allowed_tools":\["list_files","read_file","move_file"\],"trace":\[{"step":1,"tool":"list_files","state":"ok"}\],"final_state":"all files correctly sorted","success_label":true,"safety_label":"no_untrusted_instruction_followed"}

{"request_id":"REQ-1004","model_version":"aster-3-preview","ttft_ms":612,"latency_ms":3880,"cost_usd":0.018,"eval_score":0.84,"drift_signal":"none","gate_status":"pass"}

# 7. Assessments, validation scripts and rubrics

| **Phase** | **Validation script should check**                                                                  | **Passing standard**                                                             | **Highly optimized standard**                                                          |
|-----------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| P1        | All rubric rows contain claim, metric, baseline, validity threat and decision relevance.            | Rubric supports at least one evaluation objective and has no vague risk wording. | Rubric separates outcome, trajectory, cost, risk and confidence with clear thresholds. |
| P2        | Harness runs on golden dataset, produces judge scores, logs and report.                             | All tests pass; judge prompt references rubric; outputs saved.                   | Includes calibration summary, confidence intervals and variance analysis.              |
| P3        | Agent sandbox enforces allowed tools, budgets and trace logging.                                    | Toy tasks run, logs valid, scorer reports success and safety labels.             | Supports replay, deterministic seeds and trajectory-level scoring.                     |
| P4        | Spatial benchmark has tasks, expected states, scoring rubric and validity notes.                    | 10 valid tasks and no unsupported claims.                                        | Includes baselines, adversarial variants and sim-to-real caveats.                      |
| P5        | Report includes scope, methods, evidence cards, severity, confidence and mitigations.               | No unsafe details; all evidence has limitations and disclosure tier.             | Includes replication plan, escalation path and decision-ready threshold memo.          |
| P6        | Deployment gate integrates telemetry, regression results, cost model, dashboard and recommendation. | All capstone gates pass and recommendation includes uncertainty.                 | Includes rollback logic, monitoring signals and executive-ready report.                |

## Technical rubric levels

| **Level**        | **Evidence quality**                                                                     | **Technical quality**                                          | **Decision quality**                                                                |
|------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Failing          | Claims are vague, unsourced or unsupported.                                              | Code/config cannot run or produces no auditable output.        | Recommendation is opinion-based and ignores uncertainty.                            |
| Passing          | Evidence is source-linked, limited and relevant to a decision.                           | Harness/lab runs, validates outputs and logs enough to review. | Recommendation follows from evidence and states caveats.                            |
| Highly optimized | Evidence is replicated, calibrated, benchmarked against baselines and uncertainty-aware. | Pipeline is reproducible, modular, safe, logged and CI-ready.  | Decision memo names threshold, residual risk, mitigation owner and monitoring plan. |

# 8. Operational wrapper

The operational wrapper keeps learners moving through the 51 hours and prevents churn.

## Six-week pacing guide

| **Week** | **Workload** | **What to complete**                                    | **Outputs**                                                                            |
|----------|--------------|---------------------------------------------------------|----------------------------------------------------------------------------------------|
| 1        | 6-8 hours    | Phase 1 plus diagnostic and source-library orientation. | Evaluation lifecycle map and custom rubric.                                            |
| 2        | 8-10 hours   | Phase 2 harness engineering labs.                       | Golden dataset, judge calibration, RAG triad card and native harness.                  |
| 3        | 10-12 hours  | Phase 3 agent evaluation and sandbox.                   | Agent trace map, task spec, trajectory scorer and sandbox report.                      |
| 4        | 8-10 hours   | Phase 4 spatial/world-model evaluation.                 | Spatial benchmark, simulation validity note and physical simulation benchmark.         |
| 5        | 10-12 hours  | Phase 5 red teaming and simulations.                    | Campaign brief, evidence library, access memo and threat/vulnerability report.         |
| 6        | 6-8 hours    | Phase 6 enterprise pipeline and capstone.               | Telemetry schema, deployment gate, dashboard, threshold memo and final recommendation. |

## Troubleshooting wiki seed

| **Issue**                            | **Likely cause**                                                       | **Fix**                                                                    |
|--------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------|
| API key not found                    | Missing .env value or wrong shell session.                             | Copy .env.example to .env, add keys, restart terminal and rerun validator. |
| Judge scores vary too much           | Temperature too high or rubric ambiguous.                              | Set deterministic temperature, tighten rubric and rerun calibration set.   |
| Validation script fails schema check | JSONL row missing required field.                                      | Run schema reporter; add field; rerun validate_phase_X.py.                 |
| PM2 process does not start           | Wrong working directory or missing npm install.                        | Run npm install, confirm cwd in pm2 ecosystem config and restart.          |
| Sandbox permission denied            | Executable bit missing or allowlist blocks path.                       | chmod local lab executable; update safe allowlist only for toy lab paths.  |
| RAG faithfulness low                 | Answer includes unsupported claims or retrieval missed source context. | Inspect contexts and classify as retrieval failure vs generation failure.  |
| Capstone export blocked              | Missing evidence cards, domains or uncertainty note.                   | Open Capstone QA board and resolve blocked gates.                          |

## Progress dashboard model

- Hours completed, lessons completed, quiz mastery, artifacts created, source readings opened and capstone readiness.

- Per-phase status: not started, in progress, artifact draft, validation warning, complete.

- Artifact continuity: each phase deliverable feeds the capstone dossier automatically.

- Advanced track: optional source completion, paper notes and external course links should not block intermediate completion.

# 9. Resource hub and source library

All lessons should cite source IDs. Advanced learners get direct paths to papers, books, courses, benchmarks and tools. Links should be verified before publication and periodically rechecked, especially fast-changing benchmark leaderboards, policy frameworks and tool docs.

| **ID** | **Title**                                                            | **Type**            | **Used for**                                                                      | **Link**                                                                   |
|--------|----------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| S-001  | HELM: Holistic Evaluation of Language Models                         | Paper / leaderboard | Foundations, Paradigm, benchmark portfolios                                       | https://crfm.stanford.edu/helm/latest/                                     |
| S-002  | LM Evaluation Harness                                                | Tool / paper        | Benchmarks, repeatable standard evals                                             | https://github.com/EleutherAI/lm-evaluation-harness                        |
| S-003  | OpenAI Evals                                                         | Tool                | Custom/private evals and regression tests                                         | https://github.com/openai/evals                                            |
| S-004  | Inspect AI documentation                                             | Tool                | Safety evals, agentic evals, red teaming                                          | https://inspect.aisi.org.uk/                                               |
| S-005  | promptfoo documentation                                              | Tool                | Prompt tests, CI/CD, red teaming                                                  | https://www.promptfoo.dev/docs/intro/                                      |
| S-006  | DeepEval documentation                                               | Tool                | LLM application, agent and RAG evaluation                                         | https://deepeval.com/                                                      |
| S-007  | Ragas documentation                                                  | Tool                | RAG triad style metrics: faithfulness, answer relevance, context precision/recall | https://docs.ragas.io/                                                     |
| S-008  | Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena               | Paper / benchmark   | LLM-as-judge and preference comparison                                            | https://arxiv.org/abs/2306.05685                                           |
| S-009  | G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment       | Paper               | LLM-as-judge rubrics and chain-of-thought scoring                                 | https://arxiv.org/abs/2303.16634                                           |
| S-010  | Humanity's Last Exam                                                 | Benchmark / paper   | Frontier benchmark saturation and expert-level knowledge                          | https://arxiv.org/abs/2501.14249                                           |
| S-011  | Chatbot Arena                                                        | Leaderboard / paper | Preference ranking, Elo/Bradley-Terry, public comparison                          | https://lmarena.ai/                                                        |
| S-012  | MMLU                                                                 | Benchmark / paper   | Multi-subject knowledge benchmark and saturation example                          | https://arxiv.org/abs/2009.03300                                           |
| S-013  | GPQA                                                                 | Benchmark / paper   | Graduate-level scientific QA                                                      | https://arxiv.org/abs/2311.12022                                           |
| S-014  | FrontierMath                                                         | Benchmark           | Hard math frontier benchmark                                                      | https://epoch.ai/frontiermath                                              |
| S-015  | SWE-bench Verified                                                   | Benchmark           | Software engineering issue resolution and caveats                                 | https://www.swebench.com/                                                  |
| S-016  | OSWorld                                                              | Benchmark           | Desktop/computer-use agents                                                       | https://os-world.github.io/                                                |
| S-017  | WebArena                                                             | Benchmark           | Autonomous web agents in self-hosted web environments                             | https://webarena.dev/                                                      |
| S-018  | GAIA                                                                 | Benchmark           | General AI assistant tasks requiring tools and web use                            | https://huggingface.co/datasets/gaia-benchmark/GAIA                        |
| S-019  | ARC-AGI / ARC Prize                                                  | Benchmark           | Fluid intelligence/generalization tasks                                           | https://arcprize.org/                                                      |
| S-020  | RLBench                                                              | Benchmark / code    | Robot manipulation and simulated tasks                                            | https://github.com/stepjam/RLBench                                         |
| S-021  | PHYBench                                                             | Benchmark / paper   | Physical reasoning and physics problem solving                                    | https://arxiv.org/abs/2408.05146                                           |
| S-022  | Shevlane et al., Model Evaluation for Extreme Risks                  | Paper               | Frontier risk eval concepts and thresholds                                        | https://arxiv.org/abs/2305.15324                                           |
| S-023  | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Paper               | Dangerous capability evaluation methodology                                       | https://arxiv.org/abs/2403.13793                                           |
| S-024  | Anthropic Responsible Scaling Policy                                 | Policy framework    | Capability thresholds, deployment and security gates                              | https://www.anthropic.com/responsible-scaling-policy                       |
| S-025  | OpenAI Preparedness Framework                                        | Policy framework    | Tracked risk categories and capability thresholds                                 | https://openai.com/safety/preparedness/                                    |
| S-026  | Google DeepMind Frontier Safety Framework                            | Policy framework    | Critical capability levels and safety cases                                       | https://deepmind.google/discover/blog/frontier-safety-framework/           |
| S-027  | METR Common Elements of Frontier AI Safety Policies                  | Report              | Common policy elements across frontier labs                                       | https://metr.org/blog/2025-12-02-common-elements-frontier-safety-policies/ |
| S-028  | UK AI Security Institute Frontier AI Trends Report                   | Report              | Capability trends and glossary for red teaming, sandbagging, scaffolds            | https://www.aisi.gov.uk/                                                   |
| S-029  | NIST AI Risk Management Framework and GenAI Profile                  | Framework           | Govern, map, measure, manage; generative AI risks                                 | https://www.nist.gov/itl/ai-risk-management-framework                      |
| S-030  | TruthfulQA                                                           | Benchmark / paper   | Honesty and falsehood imitation                                                   | https://arxiv.org/abs/2109.07958                                           |
| S-031  | Red Teaming Language Models with Language Models                     | Paper               | Automated red teaming and prompt generation                                       | https://arxiv.org/abs/2202.03286                                           |
| S-032  | Constitutional AI                                                    | Paper               | Alignment via AI feedback and critique                                            | https://arxiv.org/abs/2212.08073                                           |
| S-033  | InstructGPT / RLHF                                                   | Paper               | Instruction following with human feedback                                         | https://arxiv.org/abs/2203.02155                                           |
| S-034  | Datasheets for Datasets                                              | Paper               | Dataset documentation and accountability                                          | https://arxiv.org/abs/1803.09010                                           |
| S-035  | Model Cards for Model Reporting                                      | Paper               | Model documentation and responsible reporting                                     | https://arxiv.org/abs/1810.03993                                           |
| S-036  | Jurafsky and Martin, Speech and Language Processing                  | Free book           | NLP foundations, metrics, language models                                         | https://web.stanford.edu/~jurafsky/slp3/                                   |
| S-037  | Goodfellow, Bengio and Courville, Deep Learning                      | Free book           | ML foundations for advanced learners                                              | https://www.deeplearningbook.org/                                          |
| S-038  | Stanford CS120: Introduction to AI Safety                            | Free course         | AI safety concepts, evaluations, robustness                                       | https://aisafety.stanford.edu/cs120                                        |
| S-039  | Evidently AI LLM Evaluation Course                                   | Free course         | Practical LLM evaluation methods and RAG/agent evals                              | https://www.evidentlyai.com/llm-evaluation-course                          |
| S-040  | OpenTelemetry                                                        | Tooling docs        | Production telemetry and traces                                                   | https://opentelemetry.io/docs/                                             |
| S-041  | Microsoft Fabric documentation                                       | Tooling docs        | BI dashboards and data pipeline wrapper                                           | https://learn.microsoft.com/fabric/                                        |
| S-042  | PM2 process manager                                                  | Tooling docs        | Native host process supervision for demos/labs                                    | https://pm2.keymetrics.io/                                                 |
| S-043  | Docker documentation                                                 | Tooling docs        | Optional containers, reproducible environments                                    | https://docs.docker.com/                                                   |
| S-044  | Rust Book                                                            | Free book           | Rust foundations for sandboxes and low-level harnesses                            | https://doc.rust-lang.org/book/                                            |
| S-045  | Pytest documentation                                                 | Tooling docs        | Validation scripts and test suites                                                | https://docs.pytest.org/                                                   |
| S-046  | GitHub Actions documentation                                         | Tooling docs        | CI/CD eval gates                                                                  | https://docs.github.com/actions                                            |

## Resource bundles by learner need

| **Need**                      | **Start here**                                                             | **Advanced path**                                                                                 |
|-------------------------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Evaluation foundations        | HELM, LM Eval Harness, Module 1 foundations, Jurafsky and Martin chapters. | Chang/Guo surveys, statistical testing papers, benchmark design papers.                           |
| Harness engineering           | Inspect AI, promptfoo, DeepEval, Ragas, OpenAI Evals.                      | Judge calibration, CI/CD gates, custom model adapters, telemetry and reproducibility engineering. |
| Agent evaluation              | SWE-bench caveats, OSWorld, WebArena, GAIA.                                | Trace scoring, custom toy sandboxes, OpenTelemetry, private task validation.                      |
| Spatial/world models          | ARC-AGI, RLBench, PHYBench, MMMU/VQA-style tasks.                          | Industrial simulation design, sim-to-real validity, physics/continuity rubrics.                   |
| Red teaming and frontier risk | Shevlane, Phuong, METR, AISI, OpenAI/Anthropic/DeepMind frameworks.        | Third-party access protocols, sandbagging/deception hypotheses, threshold memo practice.          |
| Enterprise deployment gates   | NIST AI RMF, OpenTelemetry, promptfoo, Microsoft Fabric, GitHub Actions.   | Production dashboards, cost-to-capability frontier, monitoring and rollback plans.                |

# 10. Glossary seed

| **Term**             | **Definition**                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Evaluation objective | A precise statement of what capability, behavior or risk claim will be measured and what decision the evidence informs.             |
| Outcome metric       | A metric that scores the final answer or task completion result.                                                                    |
| Trajectory metric    | A metric that scores the process: steps, tool calls, state changes, safety constraints and recovery behavior.                       |
| Harness              | The repeatable system that runs datasets through models/scaffolds, scores outputs and logs evidence.                                |
| Golden dataset       | A curated, documented set of tasks and labels used for trusted evaluation practice.                                                 |
| LLM-as-judge         | A method using a model to score outputs, requiring calibration, bias checks and uncertainty reporting.                              |
| RAG Triad            | A practical RAG evaluation frame: answer faithfulness, answer relevance and context relevance/retrieval quality.                    |
| Benchmark saturation | The point where a benchmark no longer discriminates frontier systems because many models approach ceiling performance.              |
| Contamination        | When evaluation data or near-duplicates appear in training data, inflating scores.                                                  |
| Elicitation          | Methods used to reveal a model capability through prompts, scaffolds, tools, examples or interaction design.                        |
| Sandbagging          | Strategic underperformance, especially when a system behaves as if it recognizes it is being evaluated.                             |
| Evidence card        | A structured unit of evaluation evidence with claim, system version, method, result, confidence, limitation and decision relevance. |
| Threshold memo       | A decision document mapping evidence to capability thresholds, residual risk, mitigations and release recommendation.               |
| Deployment gate      | A pre-release or production decision point that blocks, permits or restricts deployment based on evidence.                          |
