
export type FmeLesson = {
  id: string;
  uuid: string;
  moduleId: string;
  title: string;
  minutes: number;
  type: "Concept" | "Practice" | "Build";
  objective: string;
  transcript: string;
  practicePrompt: string;
};

export const fmeLessons: FmeLesson[] = [
  {
    "id": "p1-l1",
    "uuid": "906b7aa1-7b1d-44e8-a2b1-f24c0f556ca4",
    "moduleId": "p1",
    "title": "What Is Frontier Model Evaluation?",
    "minutes": 45,
    "type": "Concept",
    "objective": "Explain evaluation as systematic measurement of model behavior, not demos or vibes.",
    "transcript": "Transcript for What Is Frontier Model Evaluation?",
    "practicePrompt": "Practice for What Is Frontier Model Evaluation?"
  },
  {
    "id": "p1-l2",
    "uuid": "63d814b9-b9ea-4cda-a50e-aea53809547e",
    "moduleId": "p1",
    "title": "Outcome Metrics vs Trajectory Metrics",
    "minutes": 60,
    "type": "Concept",
    "objective": "Distinguish final-answer performance from path/process quality in multi-step systems.",
    "transcript": "Transcript for Outcome Metrics vs Trajectory Metrics",
    "practicePrompt": "Practice for Outcome Metrics vs Trajectory Metrics"
  },
  {
    "id": "p1-l3",
    "uuid": "9854afdf-29de-4e2a-a2b6-ad2043f9654a",
    "moduleId": "p1",
    "title": "Benchmark Saturation, Contamination and Goodhart",
    "minutes": 75,
    "type": "Concept",
    "objective": "Identify why benchmark scores stop being trustworthy as benchmarks become targets.",
    "transcript": "Transcript for Benchmark Saturation, Contamination and Goodhart",
    "practicePrompt": "Practice for Benchmark Saturation, Contamination and Goodhart"
  },
  {
    "id": "p1-l4",
    "uuid": "a6d3ca4c-956e-46bd-ae5c-4d591eafd2f5",
    "moduleId": "p1",
    "title": "From Vague Risk to Evaluation Objective",
    "minutes": 90,
    "type": "Concept",
    "objective": "Convert vague frontier safety concerns into precise evaluation objectives.",
    "transcript": "Transcript for From Vague Risk to Evaluation Objective",
    "practicePrompt": "Practice for From Vague Risk to Evaluation Objective"
  },
  {
    "id": "p1-l5",
    "uuid": "aca878ae-c302-4a7c-a4b5-7d48c897b52c",
    "moduleId": "p1",
    "title": "Technical Due Diligence and AI Moats",
    "minutes": 60,
    "type": "Concept",
    "objective": "Inspect frontier model claims as an investor, auditor or safety evaluator would.",
    "transcript": "Transcript for Technical Due Diligence and AI Moats",
    "practicePrompt": "Practice for Technical Due Diligence and AI Moats"
  },
  {
    "id": "p1-l6",
    "uuid": "11d1f05a-0139-4193-a581-c7487be52530",
    "moduleId": "p1",
    "title": "Phase Studio: Build the Custom Evaluation Rubric",
    "minutes": 30,
    "type": "Concept",
    "objective": "Synthesize the phase into a reusable rubric for later labs.",
    "transcript": "Transcript for Phase Studio: Build the Custom Evaluation Rubric",
    "practicePrompt": "Practice for Phase Studio: Build the Custom Evaluation Rubric"
  },
  {
    "id": "p2-l1",
    "uuid": "f459b98c-2873-40b7-a83e-0e72a9402a2f",
    "moduleId": "p2",
    "title": "Evaluation Harness Anatomy",
    "minutes": 60,
    "type": "Concept",
    "objective": "Describe the components of a working evaluation harness.",
    "transcript": "Transcript for Evaluation Harness Anatomy",
    "practicePrompt": "Practice for Evaluation Harness Anatomy"
  },
  {
    "id": "p2-l2",
    "uuid": "365da6c0-0fa2-445a-afde-1bc680cd7593",
    "moduleId": "p2",
    "title": "Golden Datasets and Edge-Case Sampling",
    "minutes": 75,
    "type": "Concept",
    "objective": "Build curated evaluation files that represent risk claims and failure modes.",
    "transcript": "Transcript for Golden Datasets and Edge-Case Sampling",
    "practicePrompt": "Practice for Golden Datasets and Edge-Case Sampling"
  },
  {
    "id": "p2-l3",
    "uuid": "56b81393-1ba1-41f2-ac9f-ce923d8d30a2",
    "moduleId": "p2",
    "title": "LLM-as-Judge Without Self-Deception",
    "minutes": 90,
    "type": "Concept",
    "objective": "Design judge prompts, rubrics and calibration procedures.",
    "transcript": "Transcript for LLM-as-Judge Without Self-Deception",
    "practicePrompt": "Practice for LLM-as-Judge Without Self-Deception"
  },
  {
    "id": "p2-l4",
    "uuid": "347e9b0e-e631-43cc-a779-0a650c37ab6b",
    "moduleId": "p2",
    "title": "RAG Triad and Retrieval-Aware Evaluation",
    "minutes": 75,
    "type": "Concept",
    "objective": "Evaluate answer faithfulness, answer relevance and context relevance.",
    "transcript": "Transcript for RAG Triad and Retrieval-Aware Evaluation",
    "practicePrompt": "Practice for RAG Triad and Retrieval-Aware Evaluation"
  },
  {
    "id": "p2-l5",
    "uuid": "0cf00305-d743-4db6-a5d6-012410aa7a50",
    "moduleId": "p2",
    "title": "Native Host Deployment for Low-Overhead Labs",
    "minutes": 75,
    "type": "Concept",
    "objective": "Run eval services locally without heavy VMs where safe.",
    "transcript": "Transcript for Native Host Deployment for Low-Overhead Labs",
    "practicePrompt": "Practice for Native Host Deployment for Low-Overhead Labs"
  },
  {
    "id": "p2-l6",
    "uuid": "38ecf9ce-cd9c-41c9-a9f0-5ad6e22847d7",
    "moduleId": "p2",
    "title": "Promptfoo, DeepEval and Inspect AI Lab",
    "minutes": 105,
    "type": "Concept",
    "objective": "Compare frameworks and implement the same evaluation in at least two.",
    "transcript": "Transcript for Promptfoo, DeepEval and Inspect AI Lab",
    "practicePrompt": "Practice for Promptfoo, DeepEval and Inspect AI Lab"
  },
  {
    "id": "p3-l1",
    "uuid": "b23e4e1f-a528-4622-a405-c20c8b9cb382",
    "moduleId": "p3",
    "title": "Agent Anatomy: Tools, State and Control",
    "minutes": 75,
    "type": "Concept",
    "objective": "Explain how an agent differs from a single-turn chatbot.",
    "transcript": "Transcript for Agent Anatomy: Tools, State and Control",
    "practicePrompt": "Practice for Agent Anatomy: Tools, State and Control"
  },
  {
    "id": "p3-l2",
    "uuid": "2f6fb28f-5f99-4238-ae54-3b8607a7b737",
    "moduleId": "p3",
    "title": "Software Engineering Benchmarks and Contamination Caveats",
    "minutes": 90,
    "type": "Concept",
    "objective": "Use SWE-style benchmarks while recognizing deprecation and contamination risks.",
    "transcript": "Transcript for Software Engineering Benchmarks and Contamination Caveats",
    "practicePrompt": "Practice for Software Engineering Benchmarks and Contamination Caveats"
  },
  {
    "id": "p3-l3",
    "uuid": "76a0ca86-d8a7-473b-a792-04beb2e5a667",
    "moduleId": "p3",
    "title": "Desktop and Web Agent Evaluation",
    "minutes": 90,
    "type": "Concept",
    "objective": "Design tasks for computer-use and web-use agents safely.",
    "transcript": "Transcript for Desktop and Web Agent Evaluation",
    "practicePrompt": "Practice for Desktop and Web Agent Evaluation"
  },
  {
    "id": "p3-l4",
    "uuid": "538344e6-3a23-4970-af63-de239c85b8af",
    "moduleId": "p3",
    "title": "Rust Sandbox and Low-Compute Execution Pattern",
    "minutes": 120,
    "type": "Concept",
    "objective": "Specify a lightweight sandbox for de-risked agent labs.",
    "transcript": "Transcript for Rust Sandbox and Low-Compute Execution Pattern",
    "practicePrompt": "Practice for Rust Sandbox and Low-Compute Execution Pattern"
  },
  {
    "id": "p3-l5",
    "uuid": "d1ac3118-83d7-4d60-a8e2-702d3bdfdcf7",
    "moduleId": "p3",
    "title": "Memory, Context and Long-Horizon Reliability",
    "minutes": 90,
    "type": "Concept",
    "objective": "Measure whether an agent maintains goals and facts across many turns.",
    "transcript": "Transcript for Memory, Context and Long-Horizon Reliability",
    "practicePrompt": "Practice for Memory, Context and Long-Horizon Reliability"
  },
  {
    "id": "p3-l6",
    "uuid": "6bb3420c-db09-4293-a2e3-6b2da5d65688",
    "moduleId": "p3",
    "title": "Scoring Agent Trajectories",
    "minutes": 105,
    "type": "Concept",
    "objective": "Score both completion and path quality.",
    "transcript": "Transcript for Scoring Agent Trajectories",
    "practicePrompt": "Practice for Scoring Agent Trajectories"
  },
  {
    "id": "p3-l7",
    "uuid": "222c9bbc-87f9-47e2-a89b-f3bbdca4901a",
    "moduleId": "p3",
    "title": "Phase Studio: Agent Sandbox Report",
    "minutes": 150,
    "type": "Concept",
    "objective": "Package environment, task set, logs, results and limitations into an auditable report.",
    "transcript": "Transcript for Phase Studio: Agent Sandbox Report",
    "practicePrompt": "Practice for Phase Studio: Agent Sandbox Report"
  },
  {
    "id": "p4-l1",
    "uuid": "20c9f254-0cc9-496f-a7d2-09f0831fed85",
    "moduleId": "p4",
    "title": "What Counts as Spatial or World-Model Evaluation?",
    "minutes": 60,
    "type": "Concept",
    "objective": "Define spatial reasoning, physical reasoning and world-model claims.",
    "transcript": "Transcript for What Counts as Spatial or World-Model Evaluation?",
    "practicePrompt": "Practice for What Counts as Spatial or World-Model Evaluation?"
  },
  {
    "id": "p4-l2",
    "uuid": "a9ca436c-6143-4e64-aca8-009d465ba061",
    "moduleId": "p4",
    "title": "Object Permanence and Visual-Spatial Reasoning",
    "minutes": 75,
    "type": "Concept",
    "objective": "Design evaluations for hidden objects, relations and transformations.",
    "transcript": "Transcript for Object Permanence and Visual-Spatial Reasoning",
    "practicePrompt": "Practice for Object Permanence and Visual-Spatial Reasoning"
  },
  {
    "id": "p4-l3",
    "uuid": "96874039-69d9-49eb-a338-19780015d72c",
    "moduleId": "p4",
    "title": "ARC-AGI-2 and Generalization Under Novelty",
    "minutes": 90,
    "type": "Concept",
    "objective": "Explain why ARC-style tasks emphasize fluid generalization over memorized knowledge.",
    "transcript": "Transcript for ARC-AGI-2 and Generalization Under Novelty",
    "practicePrompt": "Practice for ARC-AGI-2 and Generalization Under Novelty"
  },
  {
    "id": "p4-l4",
    "uuid": "28c3d66d-cdd2-429a-a836-2fcf39177f7b",
    "moduleId": "p4",
    "title": "Physical Reasoning Benchmarks",
    "minutes": 90,
    "type": "Concept",
    "objective": "Evaluate commonsense physics without overclaiming real-world embodied ability.",
    "transcript": "Transcript for Physical Reasoning Benchmarks",
    "practicePrompt": "Practice for Physical Reasoning Benchmarks"
  },
  {
    "id": "p4-l5",
    "uuid": "6116bbb9-4623-4280-a86a-6789d224c96f",
    "moduleId": "p4",
    "title": "Robotics and Industrial Simulation",
    "minutes": 90,
    "type": "Concept",
    "objective": "Use simulated robotics tasks responsibly.",
    "transcript": "Transcript for Robotics and Industrial Simulation",
    "practicePrompt": "Practice for Robotics and Industrial Simulation"
  },
  {
    "id": "p4-l6",
    "uuid": "4212289e-99b9-413f-a054-61d02d3ccec9",
    "moduleId": "p4",
    "title": "Video and World-Model API Evaluation",
    "minutes": 75,
    "type": "Concept",
    "objective": "Create safe prompts and rubrics for generated video/world dynamics.",
    "transcript": "Transcript for Video and World-Model API Evaluation",
    "practicePrompt": "Practice for Video and World-Model API Evaluation"
  },
  {
    "id": "p4-l7",
    "uuid": "2e958ff0-308b-4c81-af4f-6bd0723beb1b",
    "moduleId": "p4",
    "title": "Phase Studio: Physical Simulation Benchmark",
    "minutes": 60,
    "type": "Concept",
    "objective": "Assemble a benchmark with tasks, rubric, baselines and validity notes.",
    "transcript": "Transcript for Phase Studio: Physical Simulation Benchmark",
    "practicePrompt": "Practice for Phase Studio: Physical Simulation Benchmark"
  },
  {
    "id": "p5-l1",
    "uuid": "c427eb94-f219-4143-a3b9-65c7d7fa9336",
    "moduleId": "p5",
    "title": "Red Teaming as Evaluation, Not Chaos",
    "minutes": 60,
    "type": "Concept",
    "objective": "Design red team campaigns with scope, hypotheses and safety bounds.",
    "transcript": "Transcript for Red Teaming as Evaluation, Not Chaos",
    "practicePrompt": "Practice for Red Teaming as Evaluation, Not Chaos"
  },
  {
    "id": "p5-l2",
    "uuid": "21017709-2f84-46f7-aa70-20278aef996b",
    "moduleId": "p5",
    "title": "State-Based Attacks and Prompt Injection",
    "minutes": 90,
    "type": "Concept",
    "objective": "Evaluate agents that read untrusted content without teaching harmful exploitation.",
    "transcript": "Transcript for State-Based Attacks and Prompt Injection",
    "practicePrompt": "Practice for State-Based Attacks and Prompt Injection"
  },
  {
    "id": "p5-l3",
    "uuid": "724049dd-23ff-48f7-a427-c047495cb482",
    "moduleId": "p5",
    "title": "Automated Red Teaming and Jailbreak Datasets",
    "minutes": 90,
    "type": "Concept",
    "objective": "Use automation to find failures while preserving safe disclosure.",
    "transcript": "Transcript for Automated Red Teaming and Jailbreak Datasets",
    "practicePrompt": "Practice for Automated Red Teaming and Jailbreak Datasets"
  },
  {
    "id": "p5-l4",
    "uuid": "81378fbd-33ca-45ec-af34-f065910b15cd",
    "moduleId": "p5",
    "title": "Sandbagging, Scheming and Strategic Underperformance",
    "minutes": 90,
    "type": "Concept",
    "objective": "Explain how models might behave differently under evaluation pressure.",
    "transcript": "Transcript for Sandbagging, Scheming and Strategic Underperformance",
    "practicePrompt": "Practice for Sandbagging, Scheming and Strategic Underperformance"
  },
  {
    "id": "p5-l5",
    "uuid": "881bde29-ddf0-4ad6-a73b-d3d683d1b70e",
    "moduleId": "p5",
    "title": "Dangerous Capability Domains and Information Hazards",
    "minutes": 90,
    "type": "Concept",
    "objective": "Handle cyber, bio, persuasion and autonomy evidence safely.",
    "transcript": "Transcript for Dangerous Capability Domains and Information Hazards",
    "practicePrompt": "Practice for Dangerous Capability Domains and Information Hazards"
  },
  {
    "id": "p5-l6",
    "uuid": "b0ca8921-ce65-44d4-a916-1fa1f428fcbc",
    "moduleId": "p5",
    "title": "Third-Party Evaluator Access Negotiation Simulation",
    "minutes": 75,
    "type": "Concept",
    "objective": "Determine when access is sufficient to support a safety claim.",
    "transcript": "Transcript for Third-Party Evaluator Access Negotiation Simulation",
    "practicePrompt": "Practice for Third-Party Evaluator Access Negotiation Simulation"
  },
  {
    "id": "p5-l7",
    "uuid": "a11dd886-2150-4297-a3c2-3c3aa9a208a8",
    "moduleId": "p5",
    "title": "Evidence Review, Risk Scoring and Replication",
    "minutes": 75,
    "type": "Concept",
    "objective": "Convert red-team findings into auditable evidence cards.",
    "transcript": "Transcript for Evidence Review, Risk Scoring and Replication",
    "practicePrompt": "Practice for Evidence Review, Risk Scoring and Replication"
  },
  {
    "id": "p5-l8",
    "uuid": "ab5dbbf4-8bc9-4e95-ad24-765baa7207d8",
    "moduleId": "p5",
    "title": "Phase Studio: Threat and Vulnerability Report",
    "minutes": 120,
    "type": "Concept",
    "objective": "Write a professional red-team report with actionable mitigations.",
    "transcript": "Transcript for Phase Studio: Threat and Vulnerability Report",
    "practicePrompt": "Practice for Phase Studio: Threat and Vulnerability Report"
  },
  {
    "id": "p6-l1",
    "uuid": "7c0884fc-25e1-45bf-ae36-1c8fbbaa9d3f",
    "moduleId": "p6",
    "title": "Production Telemetry for Model Evaluation",
    "minutes": 60,
    "type": "Concept",
    "objective": "Define telemetry that supports safety, quality and cost decisions.",
    "transcript": "Transcript for Production Telemetry for Model Evaluation",
    "practicePrompt": "Practice for Production Telemetry for Model Evaluation"
  },
  {
    "id": "p6-l2",
    "uuid": "8316f191-a454-4b68-ae59-0270c4044ac1",
    "moduleId": "p6",
    "title": "Performance Metrics: TTFT, Latency and Concurrency",
    "minutes": 60,
    "type": "Concept",
    "objective": "Measure service-level performance without confusing speed with quality.",
    "transcript": "Transcript for Performance Metrics: TTFT, Latency and Concurrency",
    "practicePrompt": "Practice for Performance Metrics: TTFT, Latency and Concurrency"
  },
  {
    "id": "p6-l3",
    "uuid": "39a429ea-dbab-4b8b-a47d-e4a051060207",
    "moduleId": "p6",
    "title": "Model Drift and Regression Gates",
    "minutes": 75,
    "type": "Concept",
    "objective": "Create CI/CD gates that catch quality and safety regressions.",
    "transcript": "Transcript for Model Drift and Regression Gates",
    "practicePrompt": "Practice for Model Drift and Regression Gates"
  },
  {
    "id": "p6-l4",
    "uuid": "b824b543-06d3-4811-aa04-0b45f3a4879c",
    "moduleId": "p6",
    "title": "Cost-to-Capability and Edge Deployment Models",
    "minutes": 75,
    "type": "Concept",
    "objective": "Compare capability, cost, latency and hardware constraints.",
    "transcript": "Transcript for Cost-to-Capability and Edge Deployment Models",
    "practicePrompt": "Practice for Cost-to-Capability and Edge Deployment Models"
  },
  {
    "id": "p6-l5",
    "uuid": "7159cde4-0f6a-46a0-a408-6a937cb6677e",
    "moduleId": "p6",
    "title": "Dashboards, Threshold Memos and Executive Reports",
    "minutes": 60,
    "type": "Concept",
    "objective": "Translate technical evidence into decision artifacts.",
    "transcript": "Transcript for Dashboards, Threshold Memos and Executive Reports",
    "practicePrompt": "Practice for Dashboards, Threshold Memos and Executive Reports"
  },
  {
    "id": "p6-l6",
    "uuid": "96128935-ecb5-4f93-ac1f-6db3bf97faa1",
    "moduleId": "p6",
    "title": "Capstone: Deployment Gate for Aster-3 Frontier",
    "minutes": 30,
    "type": "Concept",
    "objective": "Complete the final deployment recommendation.",
    "transcript": "Transcript for Capstone: Deployment Gate for Aster-3 Frontier",
    "practicePrompt": "Practice for Capstone: Deployment Gate for Aster-3 Frontier"
  }
];

export function getFmeLesson(lessonId = "p1-l4") {
  return fmeLessons.find((lesson) => lesson.id === lessonId) ?? fmeLessons[0];
}

export function getFmeLessonByUuid(uuid: string) {
  return fmeLessons.find((lesson) => lesson.uuid === uuid) ?? fmeLessons[0];
}
