# Frontier Model Evaluations — V3 External Media Registry

This file replaces duplicated or non-playable lesson videos with lesson-aligned external reference media. Embed status must be checked at runtime or during QA. These are not course-owned videos, and their transcripts must not be copied into the product unless permission/reuse terms allow it.

## Media QA rules

- No duplicate primary URLs across lessons.
- External videos are reference media, not official course videos.
- Every lesson must remain teachable through the authored transcript even if the video is blocked.
- YouTube embeds must use the IFrame Player API only after embed testing.
- If the player emits an embed/playback error, switch to fallback mode.
- The fallback completion condition is: link opened + learner confirms watched + one-sentence reflection saved.

## Registry

| Lesson | Reference title | Provider | URL | Why it fits | Embed status |
|---|---|---|---|---|---|
| P1.L1 | Yann Dubois: Scalable Evaluation of Large Language Models | YouTube | https://www.youtube.com/watch?v=ZaQYM-YF1rM | Best-fit reference for scalable LLM evaluation and why evals require methodology, not vibes. | Unverified — check at runtime / QA |
| P1.L2 | Andrej Karpathy: Intro to Large Language Models | YouTube | https://www.youtube.com/watch?v=zjkBMFhNj_g | Useful model-background reference for learners who need a concrete explanation of LLM types and capability surfaces. | Unverified — check at runtime / QA |
| P1.L3 | Stanford CS224N Lecture 11 — Benchmarking by Yann Dubois | YouTube | https://www.youtube.com/watch?v=TO0CqzqiArM | Directly supports benchmark, dataset, task, metric, prompt, and evaluation vocabulary. | Unverified — check at runtime / QA |
| P1.L4 | Evaluation for Large Language Models and Generative AI — Deep Dive | YouTube | https://www.youtube.com/watch?v=iQl03pQlYWY | Useful overview of LLM evaluation methods and the limits of single outcome scores. | Unverified — check at runtime / QA |
| P1.L5 | François Chollet: How We Get To AGI | YouTube | https://www.youtube.com/watch?v=5QcCeSsNRks | Provides benchmark and generalization context for saturation, ARC-style thinking, and Goodhart-resistant evaluation. | Unverified — check at runtime / QA |
| P1.L6 | BlueDot AI Governance Resource — Model Evaluation for Extreme Risks | BlueDot / external course resource | https://bluedot.org/courses/governance-2023/4 | Reference for moving from risk claims to evaluation objectives in extreme-risk governance contexts. | Unverified — check at runtime / QA |
| P2.L1 | Evaluate LLMs with Language Model Evaluation Harness | YouTube | https://www.youtube.com/watch?v=p-gzfS1JgEE | Practical walkthrough for understanding harness mechanics. | Unverified — check at runtime / QA |
| P2.L2 | Using Promptfoo + CSVs to Eval Models | YouTube | https://www.youtube.com/watch?v=pcFKF2CpVvo | Concrete dataset-driven eval example with CSV test cases. | Unverified — check at runtime / QA |
| P2.L3 | LLM as a Judge: Scaling AI Evaluation Strategies | YouTube / IBM Technology | https://www.youtube.com/watch?v=trfUBIDeI1Y | Lesson-aligned external reference for judge-based evaluation. | Unverified — check at runtime / QA |
| P2.L4 | Turbocharge Your RAG Applications with Powerful RAG Analytics | YouTube / DeepLearning.AI | https://www.youtube.com/watch?v=njN_Wu8dLfE | RAG evaluation reference for retrieval, generation, and attribution quality. | Unverified — check at runtime / QA |
| P2.L5 | Start with Promptfoo in under 10 min. | YouTube | https://www.youtube.com/watch?v=7Z6_7XkXwj0 | Fast practical setup reference for promptfoo-based evals. | Unverified — check at runtime / QA |
| P2.L6 | LLM Evals In Practice: Creating Custom Task Evals | YouTube | https://www.youtube.com/watch?v=WWwYCAIYzQk | Supports the phase studio task of building custom native evals. | Unverified — check at runtime / QA |
| P3.L1 | How to Build, Evaluate, and Iterate on LLM Agents | YouTube | https://www.youtube.com/watch?v=0pnEUAwoDP0 | Broad introduction to agent evaluation and iteration loops. | Unverified — check at runtime / QA |
| P3.L2 | Agent Evaluation #langchain | YouTube | https://www.youtube.com/watch?v=-URxC6zXnNs | Reference for evaluating agent steps and tool use. | Unverified — check at runtime / QA |
| P3.L3 | John Yang — SWE-bench: Can Language Models Resolve Real-World GitHub Issues? | YouTube | https://www.youtube.com/watch?v=DrLdvbkgmeA | Directly aligned with SWE-bench and coding agent evaluation. | Unverified — check at runtime / QA |
| P3.L4 | The State of Web Agents | YouTube | https://www.youtube.com/watch?v=VRRi_KRbfps | Covers WebArena, VisualWebArena, WorkArena, and the benchmark landscape for web agents. | Unverified — check at runtime / QA |
| P3.L5 | Software Control Models: Building Agents for Real-World Interfaces | YouTube | https://www.youtube.com/watch?v=BxfiW3wi640 | Supports desktop-agent and low-compute sandbox design. | Unverified — check at runtime / QA |
| P3.L6 | METR: Measuring AI Ability to Complete Long Tasks | METR article / external media alternative | https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ | Direct reference for long-horizon autonomy and task-completion framing. | Unverified — check at runtime / QA |
| P3.L7 | Evaluating CrewAI + MCP with Promptfoo | YouTube | https://www.youtube.com/watch?v=o7CKEeyth1Q | Practical reference for agent/MCP evaluation and phase-studio implementation. | Unverified — check at runtime / QA |
| P4.L1 | ARC-AGI-2 Overview With François Chollet | YouTube / ARC Prize | https://www.youtube.com/watch?v=TWHezX43I-4 | Relevant to spatial/world-model generalization and ARC-style task design. | Unverified — check at runtime / QA |
| P4.L2 | RLBench: The Robot Learning Benchmark | YouTube | https://www.youtube.com/watch?v=F2PqREHT3F8 | Direct reference for physical simulation benchmark thinking. | Unverified — check at runtime / QA |
| P4.L3 | ARC Prize Version 2 Launch Video | YouTube | https://www.youtube.com/watch?v=M3b59lZYBW8 | Supports ARC-AGI-2 and benchmark refresh discussion. | Unverified — check at runtime / QA |
| P4.L4 | MM-SafetyBench: A Benchmark for Safety Evaluation of Multimodal Large Language Models | YouTube | https://www.youtube.com/watch?v=1j2Jz6oJ4Uo | Directly related to multimodal safety benchmark design. | Unverified — check at runtime / QA |
| P4.L5 | RLBench 2019 — Comparing Robot Learning Algorithms on 100 Tasks | YouTube | https://www.youtube.com/watch?v=blt0l8cQqZo | Extends physical benchmark design with multi-task simulation context. | Unverified — check at runtime / QA |
| P4.L6 | Stanford CME295 Transformers & LLMs — Quantifying LLM Performance | YouTube | https://www.youtube.com/watch?v=8fNP4N46RRo | Useful performance-quantification reference for multimodal/video-world model lessons. | Unverified — check at runtime / QA |
| P4.L7 | RLBench Task Building Tutorial — Target Reaching Part 1 | YouTube | https://www.youtube.com/watch?v=bKaK_9O3v7Y | Hands-on reference for building physical simulation tasks. | Unverified — check at runtime / QA |
| P5.L1 | Ethan Perez — Inverse Scaling, Red Teaming | YouTube | https://www.youtube.com/watch?v=TjWiaUMMh6g | Research-oriented reference for red teaming language models. | Unverified — check at runtime / QA |
| P5.L2 | Prompt Engineering and AI Red Teaming — Sander Schulhoff | YouTube | https://www.youtube.com/watch?v=_BRhRh7mOX0 | Direct fit for prompt injection origins and AI red teaming concepts. | Unverified — check at runtime / QA |
| P5.L3 | Red Teaming of LLM Applications: Going from Prototype to Production | YouTube | https://www.youtube.com/watch?v=yalj9BbWqoI | Application-level red-team reference with production framing. | Unverified — check at runtime / QA |
| P5.L4 | Anthropic Research — Constitutional Classifiers | Anthropic research page with embedded media | https://www.anthropic.com/research/constitutional-classifiers | Safe external reference for jailbreak defense and capability-threshold mitigation framing. | Unverified — check at runtime / QA |
| P5.L5 | Ethan Perez — Discovering Language Model Behaviors with Model-Written Evaluations | YouTube | https://www.youtube.com/watch?v=jslSqapaBbI | Reference for model-written evaluations, deception/sandbagging-adjacent evaluation methods. | Unverified — check at runtime / QA |
| P5.L6 | Promptfoo Red Teaming: A Beginner’s Guide | YouTube | https://www.youtube.com/watch?v=y6Dlsz5P8s8 | Hands-on automated red-team workflow reference. | Unverified — check at runtime / QA |
| P5.L7 | Test Your AI Like a Hacker — Promptfoo Tutorial | YouTube | https://www.youtube.com/watch?v=KghDstjwwNA | Practical reference for triage and LLM app security testing. | Unverified — check at runtime / QA |
| P5.L8 | Red Teaming Language Models with Language Models — Paper Discussion | YouTube | https://www.youtube.com/watch?v=2V3MXzAPQpw | Paper-oriented reference for converting red-team findings into reusable evals. | Unverified — check at runtime / QA |
| P6.L1 | Drift Monitoring and Evaluation for LLM Apps | YouTube / Evidently AI | https://www.youtube.com/watch?v=eQ6cGzDUtMU | Production monitoring and drift reference. | Unverified — check at runtime / QA |
| P6.L2 | LLM Inference Performance: Latency and Throughput Metrics | YouTube | https://www.youtube.com/watch?v=DW-mo65DJ-Q | Direct reference for TTFT, throughput, and latency tradeoffs. | Unverified — check at runtime / QA |
| P6.L3 | Evidently AI Tutorial — Open Source ML Models Monitoring and Testing | YouTube | https://www.youtube.com/watch?v=cgc3dSEAel0 | Practical monitoring/testing reference for CI/CD gates. | Unverified — check at runtime / QA |
| P6.L4 | 80,000 Hours Podcast — Anthropic’s Responsible Scaling Policy with Nick Joseph | Podcast / YouTube optional on page | https://80000hours.org/podcast/episodes/nick-joseph-anthropic-safety-approach-responsible-scaling/ | Governance framework reference for threshold memos and deployment gates. | Unverified — check at runtime / QA |
| P6.L5 | Deep Dive into LLM Evaluation with Weights & Biases | YouTube | https://www.youtube.com/watch?v=7EcznH0-of8 | Supports capstone evidence collection, experiment tracking, and eval reporting. | Unverified — check at runtime / QA |
| P6.L6 | Software Engineering and LLM Evaluation | YouTube | https://m.youtube.com/watch?v=tIgPbjPav4o | Portfolio/export reference for communicating software-eval results. | Unverified — check at runtime / QA |
