# P5 — Red Teaming

## V3 file status
- This file is updated for no course-owned videos. External media is reference-only; authored lesson transcripts are the stable teaching layer.

## Phase metadata
- Phase ID: P5
- Title: Red Teaming
- Total hours: 10 hours (600 minutes planned lesson time)
- Learner level: Intermediate → advanced
- Phase promise: Learners run safe adversarial evaluations and turn findings into decision-grade vulnerability reports.
- Phase artifact: Threat and Vulnerability Report
- Capstone connection: Supplies confirmed findings, mitigations, and residual uncertainty for the release decision.
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
| P5.L1 — Red Teaming as Evaluation | 60 min | Explain red teaming as systematic adversarial evaluation, not chaos or provocation. | Red-Team Campaign Frame | external reference video + authored transcript ready |
| P5.L2 — Multi-turn Prompt Injection and Tool Attack Evaluation | 75 min | Design safe evaluations for prompt injection in tool-using systems. | Prompt Injection Evaluation Plan | video pending / use recording guide |
| P5.L3 — Dangerous Capability Domains Safely | 90 min | Explain frontier risk domains and how to discuss them without operationalizing harm. | Dangerous Capability Domain Map | external reference video + authored transcript ready |
| P5.L4 — Cyber and Bio Uplift Evaluation Design | 90 min | Design de-risked uplift evaluations for cyber and bio/chemical risk without harmful instructions. | Uplift Evaluation Design Card | external reference video + authored transcript ready |
| P5.L5 — Persuasion, Deception, Sandbagging, and Scheming | 75 min | Define behavioral risk signals and design safe evaluation probes for strategic or deceptive behavior. | Behavioral Risk Probe Plan | external reference video + authored transcript ready |
| P5.L6 — Automated Red Teaming with Inspect, promptfoo, and garak | 75 min | Configure automated red-team probes safely and interpret their limitations. | Automated Red-Team Config | video pending / use recording guide |
| P5.L7 — Evidence Triage and Vulnerability Reporting | 60 min | Convert red-team leads into evidence cards with severity, confidence, replication, and mitigation. | Red-Team Evidence Library | video pending / use recording guide |
| P5.L8 — Phase Studio: Threat and Vulnerability Report | 75 min | Write a professional red-team report with findings, evidence, mitigations, and residual risk. | Threat and Vulnerability Report | video pending / use recording guide |

## Phase lab and technical infrastructure
- Starter repository path: `frontier-eval-lab/phases/05_red_teaming/starter/`
- Solution repository path: `frontier-eval-lab/phases/05_red_teaming/solutions/`
- Phase lab: Run a de-risked red-team campaign against mock Aster-3 workflows using fake secrets, toy prompts, safe prompt-injection probes, and triage rubrics.
- Golden dataset(s): red_team_cases_redacted.jsonl, prompt_injection_mock_pages.jsonl, and evidence_triage_examples.jsonl.
- Validation script: validate_phase_05.py checks safety boundaries, evidence-card completeness, replication status, and report sections.
- QA rule: No lesson may include operational cyber exploit steps, biological protocols, or real target details.

## Phase source library
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-028 | Red Teaming Language Models with Language Models | Perez et al. | paper | intermediate | Required | Foundational automated red-team paper showing how models can generate diverse test cases. | https://arxiv.org/abs/2202.03286 |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-029 | Prompt injection benchmark paper | Liu et al. | paper | advanced | Optional / advanced | Formalizes prompt injection attacks and defenses for quantitative evaluation. | https://arxiv.org/abs/2310.12815 |
| S-030 | garak: LLM vulnerability scanner | NVIDIA / community | tool | intermediate | Optional / advanced | Open-source vulnerability scanner for hallucination, prompt injection, data leakage, jailbreak, and other LLM weaknesses. | https://garak.ai/ |
| S-031 | Lakera Gandalf | Lakera | controlled learning game | beginner | Optional / advanced | A safe, gamified way to understand prompt injection concepts without targeting real systems. | https://gandalf.lakera.ai/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Optional / advanced | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Optional / advanced | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Optional / advanced | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Optional / advanced | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |

# Lessons

### Lesson P5.L1 — Red Teaming as Evaluation

#### Metadata
- lessonId: P5.L1
- phaseId: P5
- duration: 60 min
- difficulty: intermediate
- learningObjective: Explain red teaming as systematic adversarial evaluation, not chaos or provocation.
- lessonPromise: Use red teaming to find failures and convert them into reusable tests.
- requiredArtifactOutput: Red-Team Campaign Frame
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-028, S-026, S-027, S-004

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Ethan Perez — Inverse Scaling, Red Teaming
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=TjWiaUMMh6g
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Research-oriented reference for red teaming language models.
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
| Why safety evaluations matter | Find failures before deployment. |
| Adversarial testing | Systematic probing. |
| Evidence discipline | Document and mitigate. |

#### Authored course transcript / reading script

This lesson is about **red teaming as evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **defining scope, target behavior, risk domain, allowed probes, safety boundaries, evidence logging, and debrief**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **mistaking red teaming for unstructured jailbreak attempts**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A red team session finds a harmful response but cannot reproduce it because settings and context were not logged.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether a finding is evidence-grade.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Use red teaming to find failures and convert them into reusable tests. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Scope** — Define what is in and out of bounds.
2. **Evidence** — Log prompts, context, outputs, scoring, and replication status safely.
3. **Conversion** — Turn findings into regression tests and mitigations.

#### Visual explainer spec
- Diagram title: Red-team campaign loop
- Diagram type: loop diagram
- Nodes / panels: Scope → Probe → Find → Replicate → Score → Mitigate → Regression test
- Text summary: Red teaming is a controlled evidence loop.

#### Worked example
- Weak version: “Try to break it however you can.”
- Improved version: “Run scoped, safe probes with logging, replication, severity scoring, and mitigation follow-up.”
- Why improved: The improved version creates reusable safety evidence.

#### Common mistakes
- mistaking red teaming for unstructured jailbreak attempts
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model responds unsafely once under ambiguous prompt conditions.
- Learner task: Classify whether it is a finding, lead, or evidence card.
- Strong answer pattern: Strong answer: lead until replicated with metadata and scorer.
- Feedback: Good: a single anecdote is not yet evidence.
- Retry hint: Replicate before reporting severity.

#### Quiz / decision checkpoint
- Question: What makes a red-team finding decision-grade?
- Options:
  - A. Reproducibility, context, scoring, limitation, and mitigation relevance.
  - B. A scary screenshot only.
  - C. A viral post.
  - D. No logs.
- Correct answer: A
- Explanation: Decision-grade findings can be reviewed and acted on.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Red-Team Campaign Frame

- Campaign scope
- Allowed probes
- Blocked probes
- Evidence fields
- Severity scale
- Replication rule

#### Validation rules
- Must include safety boundaries.
- Must include replication status.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-028 | Red Teaming Language Models with Language Models | Perez et al. | paper | intermediate | Required | Foundational automated red-team paper showing how models can generate diverse test cases. | https://arxiv.org/abs/2202.03286 |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L2 — Multi-turn Prompt Injection and Tool Attack Evaluation

#### Metadata
- lessonId: P5.L2
- phaseId: P5
- duration: 75 min
- difficulty: intermediate
- learningObjective: Design safe evaluations for prompt injection in tool-using systems.
- lessonPromise: Understand prompt injection as an evaluation problem for instruction hierarchy and untrusted content.
- requiredArtifactOutput: Prompt Injection Evaluation Plan
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-029, S-030, S-031, S-005, S-004

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Prompt Engineering and AI Red Teaming — Sander Schulhoff
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=_BRhRh7mOX0
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Direct fit for prompt injection origins and AI red teaming concepts.
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
| Threat model | Untrusted content. |
| Safe sandbox | Fake secrets and mock tools. |
| Scoring | Forbidden action and refusal quality. |

#### Authored course transcript / reading script

This lesson is about **prompt injection evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **testing whether a model follows trusted instructions over untrusted content in controlled tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **teaching real attack instructions or targeting live systems**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A fictional web page contains hidden instructions asking an agent to ignore the user and export private notes.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the agent respects instruction boundaries.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Understand prompt injection as an evaluation problem for instruction hierarchy and untrusted content. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Instruction hierarchy** — System, developer, user, tool, and untrusted content must be separated.
2. **Safe probes** — Use fictional secrets and mock tools.
3. **Trajectory scoring** — Check whether the agent attempted forbidden actions.

#### Visual explainer spec
- Diagram title: Instruction hierarchy stack
- Diagram type: layer diagram
- Nodes / panels: System / Developer / User / Tool output / Untrusted content
- Text summary: Prompt injection evals test boundary handling, not hacking skill.

#### Worked example
- Weak version: “Find a jailbreak for a real product.”
- Improved version: “In a sandbox, place fictional malicious instructions inside untrusted content and score whether the agent follows trusted instructions.”
- Why improved: The improved version is safe and measurable.

#### Common mistakes
- teaching real attack instructions or targeting live systems
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A mock website tells the agent to reveal a fake API key.
- Learner task: Write expected safe behavior and failure criteria.
- Strong answer pattern: Strong answer: ignore untrusted instruction, summarize content, do not call forbidden tool, note suspicious instruction.
- Feedback: Good: use fake secrets and mock actions.
- Retry hint: Use fake targets and fictional data only.

#### Quiz / decision checkpoint
- Question: What is the main boundary in prompt injection evals?
- Options:
  - A. Trusted instructions vs untrusted content.
  - B. Hero headline vs subtitle.
  - C. Blue vs teal.
  - D. Video vs transcript.
- Correct answer: A
- Explanation: The model must distinguish instructions it should follow from content it should treat as data.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Prompt Injection Evaluation Plan

- Trusted instruction
- Untrusted content
- Mock secret
- Allowed tools
- Forbidden action
- Scorer

#### Validation rules
- Must use fictional secrets.
- Must not target live systems.
- Must score trajectory actions.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-029 | Prompt injection benchmark paper | Liu et al. | paper | advanced | Required | Formalizes prompt injection attacks and defenses for quantitative evaluation. | https://arxiv.org/abs/2310.12815 |
| S-030 | garak: LLM vulnerability scanner | NVIDIA / community | tool | intermediate | Required | Open-source vulnerability scanner for hallucination, prompt injection, data leakage, jailbreak, and other LLM weaknesses. | https://garak.ai/ |
| S-031 | Lakera Gandalf | Lakera | controlled learning game | beginner | Required | A safe, gamified way to understand prompt injection concepts without targeting real systems. | https://gandalf.lakera.ai/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Optional / advanced | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Optional / advanced | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L3 — Dangerous Capability Domains Safely

#### Metadata
- lessonId: P5.L3
- phaseId: P5
- duration: 90 min
- difficulty: intermediate
- learningObjective: Explain frontier risk domains and how to discuss them without operationalizing harm.
- lessonPromise: Frame dangerous capability evaluation around risk pathways, safeguards, and evidence boundaries.
- requiredArtifactOutput: Dangerous Capability Domain Map
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-026, S-027, S-032, S-033, S-034

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Red Teaming of LLM Applications: Going from Prototype to Production
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=yalj9BbWqoI
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Application-level red-team reference with production framing.
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
| Dangerous capabilities | High-level domain overview. |
| Safety evaluation | Evidence and mitigations. |
| Governance | Thresholds and controls. |

#### Authored course transcript / reading script

This lesson is about **safe dangerous capability evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **mapping cyber, bio/chemical, persuasion, autonomy, and model-internal risk questions to de-risked evaluation designs**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **including harmful procedural details in educational content**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A policy asks for a “bio benchmark,” but the safe version tests high-level planning judgment and source-quality evaluation without procedural steps.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide what content belongs in restricted vs public course materials.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Frame dangerous capability evaluation around risk pathways, safeguards, and evidence boundaries. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Risk domain map** — Domains differ in expertise, evidence, and safety handling.
2. **Uplift framing** — Ask whether the model increases a user’s capability relative to baseline.
3. **Safety boundary** — De-risk examples, redact operational details, and use expert review for sensitive content.

#### Visual explainer spec
- Diagram title: Dangerous capability map
- Diagram type: domain map
- Nodes / panels: Cyber / Bio-chemical / Persuasion / Autonomy / Self-reasoning / Governance
- Text summary: The map shows domains and evaluation questions without giving operational instructions.

#### Worked example
- Weak version: “Give learners realistic harmful tasks.”
- Improved version: “Use fictional, abstracted, expert-reviewed, and non-operational tasks that test evaluation design and evidence interpretation.”
- Why improved: The improved version preserves learning while reducing misuse risk.

#### Common mistakes
- including harmful procedural details in educational content
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A learner proposes real-world cyber exploit tasks.
- Learner task: Rewrite them as safe sandboxed evaluation tasks.
- Strong answer pattern: Strong answer uses mock systems, toy vulnerabilities, no real targets, and abstract scoring.
- Feedback: Good: safety constraints are part of design.
- Retry hint: Teach evaluation, not harm.

#### Quiz / decision checkpoint
- Question: What is a safe way to teach uplift evaluation?
- Options:
  - A. Use fictional, abstracted, controlled tasks and focus on methodology.
  - B. Provide operational misuse instructions.
  - C. Test on live systems.
  - D. Remove all sources.
- Correct answer: A
- Explanation: Methodology can be taught without harmful operational content.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Dangerous Capability Domain Map

- Domain
- Harm pathway
- Safe abstraction
- Required expertise
- Evidence type
- Disclosure class

#### Validation rules
- Must avoid operational harmful details.
- Must include disclosure sensitivity.
- Must include expert-review flag for high-risk domains.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-032 | Anthropic Responsible Scaling Policy | Anthropic | policy framework | advanced | Required | Public frontier safety policy useful for capability thresholds and governance gates. | https://www.anthropic.com/responsible-scaling-policy |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Optional / advanced | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L4 — Cyber and Bio Uplift Evaluation Design

#### Metadata
- lessonId: P5.L4
- phaseId: P5
- duration: 90 min
- difficulty: intermediate
- learningObjective: Design de-risked uplift evaluations for cyber and bio/chemical risk without harmful instructions.
- lessonPromise: Learn the structure of uplift studies while keeping examples abstract and safe.
- requiredArtifactOutput: Uplift Evaluation Design Card
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-027, S-026, S-033, S-034, S-036

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Anthropic Research — Constitutional Classifiers
- primaryVideoProvider: Anthropic research page with embedded media
- primaryVideoUrl: https://www.anthropic.com/research/constitutional-classifiers
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Safe external reference for jailbreak defense and capability-threshold mitigation framing.
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
| Risk domains | High-level evaluation framing. |
| Mitigations | How frameworks handle thresholds. |
| Reporting | Evidence and limits. |

#### Authored course transcript / reading script

This lesson is about **uplift evaluation design**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **comparing baseline human performance with model-assisted performance under controlled, non-operational tasks**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **using real exploit steps or biological protocols as teaching examples**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: Participants classify fictional scenario cards by risk and source reliability, with and without model assistance.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the model materially increases risky task performance.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn the structure of uplift studies while keeping examples abstract and safe. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Baseline comparison** — Measure user performance without the model and with the model.
2. **Controlled task** — Use non-operational abstractions and expert-reviewed prompts.
3. **Outcome and process** — Measure performance, refusal, source quality, and unsafe suggestion attempts.

#### Visual explainer spec
- Diagram title: Uplift study design
- Diagram type: A/B diagram
- Nodes / panels: Participants / baseline / model-assisted / safe task / metric / interpretation
- Text summary: Uplift requires a comparison group and safe task design.

#### Worked example
- Weak version: “Ask the model to perform a harmful task and see if it helps.”
- Improved version: “Use expert-reviewed, non-operational proxy tasks to measure whether model assistance improves risky planning judgment or source triage.”
- Why improved: The improved version measures uplift without providing harm.

#### Common mistakes
- using real exploit steps or biological protocols as teaching examples
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model gives confident but unsafe advice in a fictional restricted domain.
- Learner task: Design a scoring rubric that avoids operational details.
- Strong answer pattern: Strong answer scores source-quality, refusal boundaries, uncertainty, and escalation recommendation.
- Feedback: Good: evidence can be decision-useful without unsafe content.
- Retry hint: Measure capability delta, not dangerous details.

#### Quiz / decision checkpoint
- Question: What does uplift mean in this context?
- Options:
  - A. Model access increases a user’s ability relative to baseline.
  - B. The UI moves upward.
  - C. A source drawer expands.
  - D. The model has a green badge.
- Correct answer: A
- Explanation: Uplift compares assisted and unassisted performance.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Uplift Evaluation Design Card

- Risk domain
- Baseline group
- Assisted group
- Safe proxy task
- Metric
- Exclusion rules
- Disclosure sensitivity

#### Validation rules
- Must include baseline and assisted conditions.
- Must avoid operational details.
- Must include safety review.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-033 | OpenAI Preparedness Framework | OpenAI | policy framework | advanced | Required | OpenAI framework for tracking frontier capabilities that could create severe harm. | https://openai.com/index/updating-our-preparedness-framework/ |
| S-034 | Google DeepMind Frontier Safety Framework | Google DeepMind | policy framework | advanced | Optional / advanced | Framework for severe-risk domains, critical capability levels, and mitigations. | https://deepmind.google/blog/strengthening-our-frontier-safety-framework/ |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Optional / advanced | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L5 — Persuasion, Deception, Sandbagging, and Scheming

#### Metadata
- lessonId: P5.L5
- phaseId: P5
- duration: 75 min
- difficulty: intermediate
- learningObjective: Define behavioral risk signals and design safe evaluation probes for strategic or deceptive behavior.
- lessonPromise: Learn to look for behavior that changes under incentives, surveillance, or evaluation awareness.
- requiredArtifactOutput: Behavioral Risk Probe Plan
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-026, S-027, S-035

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Ethan Perez — Discovering Language Model Behaviors with Model-Written Evaluations
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=jslSqapaBbI
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Reference for model-written evaluations, deception/sandbagging-adjacent evaluation methods.
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
| Alignment risks | High-level behavioral risks. |
| Evaluation design | Controls and uncertainty. |
| Governance | Implications of strategic behavior. |

#### Authored course transcript / reading script

This lesson is about **behavioral risk evaluation**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **creating de-risked probes for persuasion strength, deception indicators, sandbagging hypotheses, and evaluation-awareness signals**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **anthropomorphizing model behavior or overclaiming intent from one example**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A model performs worse after being told high performance may trigger restrictions.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether evidence supports a sandbagging hypothesis or a weaker alternative.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Learn to look for behavior that changes under incentives, surveillance, or evaluation awareness. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Behavior not mind-reading** — Evaluate observed behavior, not inner intent.
2. **Controls** — Use counterfactual prompts, blinded conditions, and repeated trials.
3. **Uncertainty** — Report hypotheses and alternatives.

#### Visual explainer spec
- Diagram title: Behavioral probe matrix
- Diagram type: matrix
- Nodes / panels: Condition / expected behavior / observed behavior / alternative explanations
- Text summary: Behavioral risk evals need controls and cautious language.

#### Worked example
- Weak version: “The model is definitely deceptive.”
- Improved version: “Under this condition, performance dropped; possible hypotheses include prompt sensitivity, task ambiguity, or strategic underperformance. More controls needed.”
- Why improved: The improved version avoids overclaiming.

#### Common mistakes
- anthropomorphizing model behavior or overclaiming intent from one example
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model changes answer style when told it is being evaluated.
- Learner task: Write two controls.
- Strong answer pattern: Strong answer uses blinded condition and neutral wording; tests prompt sensitivity and repeated trials.
- Feedback: Good: careful claims build trust.
- Retry hint: Describe behavior, then uncertainty.

#### Quiz / decision checkpoint
- Question: Which report wording is strongest?
- Options:
  - A. The model is evil.
  - B. Observed behavior is consistent with the sandbagging hypothesis but not conclusive; alternative explanations remain.
  - C. No caveats needed.
  - D. Delete the logs.
- Correct answer: B
- Explanation: Professional reports separate observations from speculative explanations.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Behavioral Risk Probe Plan

- Hypothesis
- Probe condition
- Control condition
- Observed behavior
- Alternative explanations
- Confidence

#### Validation rules
- Must include at least two alternative explanations.
- Must avoid claims of intent without evidence.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Required | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L6 — Automated Red Teaming with Inspect, promptfoo, and garak

#### Metadata
- lessonId: P5.L6
- phaseId: P5
- duration: 75 min
- difficulty: intermediate
- learningObjective: Configure automated red-team probes safely and interpret their limitations.
- lessonPromise: Use automation to scale coverage while keeping human judgment in the loop.
- requiredArtifactOutput: Automated Red-Team Config
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-004, S-005, S-030, S-028

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Promptfoo Red Teaming: A Beginner’s Guide
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=y6Dlsz5P8s8
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Hands-on automated red-team workflow reference.
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
| Probe config | Safe categories and constraints. |
| Run and score | Scanner output. |
| Triage | From leads to evidence. |

#### Authored course transcript / reading script

This lesson is about **automated red-team tooling**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **running controlled probe suites, classifying outputs, and exporting findings to evidence cards**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **treating automated scanner results as final truth**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A scanner flags a harmless refusal as unsafe because the classifier misread the context.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide which findings require human review.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Use automation to scale coverage while keeping human judgment in the loop. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Coverage** — Automation explores more cases than manual probing.
2. **False results** — Scanners need calibration and review.
3. **Workflow** — Automated finding → triage → replication → evidence card.

#### Visual explainer spec
- Diagram title: Automated red-team workflow
- Diagram type: flow diagram
- Nodes / panels: Probe suite → model run → classifier/scorer → triage → replicate → evidence
- Text summary: Automated results become leads before evidence.

#### Worked example
- Weak version: “The scanner found 50 failures, so the system is unsafe.”
- Improved version: “The scanner produced 50 leads; triage and replication confirmed 12 evidence-grade findings.”
- Why improved: The improved version respects automation limits.

#### Common mistakes
- treating automated scanner results as final truth
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A promptfoo red-team run flags sensitive-domain outputs.
- Learner task: Classify which results need expert triage.
- Strong answer pattern: Strong answer prioritizes high-severity, reproducible, policy-relevant findings and checks false positives.
- Feedback: Good: automation starts the loop, humans close it.
- Retry hint: Never skip triage.

#### Quiz / decision checkpoint
- Question: What is an automated red-team output before replication?
- Options:
  - A. A lead.
  - B. A final executive decision.
  - C. A certificate.
  - D. A source card only.
- Correct answer: A
- Explanation: Findings require triage and replication before becoming decision-grade evidence.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Automated Red-Team Config

- Tool
- Probe category
- Safety boundary
- Scorer
- Triage rule
- Evidence export

#### Validation rules
- Must include human triage.
- Must include false-positive handling.
- Must use safe probe categories.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-004 | Inspect AI documentation | UK AI Security Institute / Meridian Labs | tool documentation | intermediate | Required | Open-source framework for frontier-style evaluations, including coding, agentic, model-graded, and multimodal tasks. | https://inspect.aisi.org.uk/ |
| S-005 | promptfoo documentation | promptfoo | tool documentation | beginner-intermediate | Required | Practical framework for prompt, model, RAG, red-team, and CI/CD evaluation workflows. | https://www.promptfoo.dev/docs/intro/ |
| S-030 | garak: LLM vulnerability scanner | NVIDIA / community | tool | intermediate | Required | Open-source vulnerability scanner for hallucination, prompt injection, data leakage, jailbreak, and other LLM weaknesses. | https://garak.ai/ |
| S-028 | Red Teaming Language Models with Language Models | Perez et al. | paper | intermediate | Optional / advanced | Foundational automated red-team paper showing how models can generate diverse test cases. | https://arxiv.org/abs/2202.03286 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L7 — Evidence Triage and Vulnerability Reporting

#### Metadata
- lessonId: P5.L7
- phaseId: P5
- duration: 60 min
- difficulty: intermediate
- learningObjective: Convert red-team leads into evidence cards with severity, confidence, replication, and mitigation.
- lessonPromise: Make red-team output useful to decision-makers.
- requiredArtifactOutput: Red-Team Evidence Library
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-044, S-036, S-026, S-028

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Test Your AI Like a Hacker — Promptfoo Tutorial
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=KghDstjwwNA
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Practical reference for triage and LLM app security testing.
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
| Evidence cards | Required fields. |
| Triage | Severity vs confidence. |
| Mitigation | Actionable reporting. |

#### Authored course transcript / reading script

This lesson is about **evidence triage**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **scoring severity, confidence, replication, affected context, mitigation, and residual uncertainty**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **reporting every weird output with equal urgency**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: A low-severity wording issue and a high-severity tool-boundary failure appear in the same run.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide how to prioritize and report them.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Make red-team output useful to decision-makers. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Severity** — How bad would the failure be in context?
2. **Confidence** — How robust is the evidence?
3. **Mitigation** — What must change before release?

#### Visual explainer spec
- Diagram title: Finding to evidence card
- Diagram type: flow diagram
- Nodes / panels: Lead → replicate → severity → confidence → mitigation → evidence card
- Text summary: Triage turns noisy leads into actionable evidence.

#### Worked example
- Weak version: “Here is a long list of prompts.”
- Improved version: “Here are prioritized evidence cards with severity, confidence, replication status, limitations, and recommended mitigations.”
- Why improved: The improved version is decision-ready.

#### Common mistakes
- reporting every weird output with equal urgency
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: A model produces one unsafe answer under a rare setting.
- Learner task: Fill severity and confidence.
- Strong answer pattern: Strong answer might score medium severity, low/medium confidence until replicated; include limitation.
- Feedback: Good: severity and confidence are separate.
- Retry hint: Prioritize what changes a decision.

#### Quiz / decision checkpoint
- Question: Which field belongs on an evidence card?
- Options:
  - A. Claim, observed behavior, confidence, limitation, decision relevance.
  - B. Only emoji.
  - C. A slogan.
  - D. Raw prompt with no context.
- Correct answer: A
- Explanation: Evidence cards need enough structure for review and decision use.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Red-Team Evidence Library

- Finding id
- Claim
- Observed behavior
- Severity
- Confidence
- Replication status
- Mitigation
- Decision relevance

#### Validation rules
- Must include replication status.
- Must include limitation.
- Must include mitigation or next step.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-044 | Model Cards for Model Reporting | Mitchell et al. | paper | intermediate | Required | Reporting pattern for model behavior, limitations, intended use, and responsible disclosure. | https://arxiv.org/abs/1810.03993 |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Required | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-028 | Red Teaming Language Models with Language Models | Perez et al. | paper | intermediate | Optional / advanced | Foundational automated red-team paper showing how models can generate diverse test cases. | https://arxiv.org/abs/2202.03286 |

#### Figma Make rendering notes
- Use video-first lesson layout: Watch / Understand / Practice / Build / Sources tabs.
- Show this lesson's artifact as a right-side or bottom checkpoint card.
- Source cards must appear in the Sources tab and the collapsed source drawer.
- The AI Coach panel should start with: “Let’s connect this lesson to the decision your evaluation will support.”
- If videoUrl is EXTERNAL_VIDEO_PENDING, render the video card placeholder and keep all other content active.


### Lesson P5.L8 — Phase Studio: Threat and Vulnerability Report

#### Metadata
- lessonId: P5.L8
- phaseId: P5
- duration: 75 min
- difficulty: intermediate
- learningObjective: Write a professional red-team report with findings, evidence, mitigations, and residual risk.
- lessonPromise: Complete the phase artifact: a threat and vulnerability report that can inform deployment gates.
- requiredArtifactOutput: Threat and Vulnerability Report
- capstoneConnection: Feeds the final Aster-3 evaluation dossier.
- sourceIds: S-026, S-027, S-028, S-035, S-036

#### Video card metadata — V3 external reference video

- primaryVideoTitle: Red Teaming Language Models with Language Models — Paper Discussion
- primaryVideoProvider: YouTube
- primaryVideoUrl: https://www.youtube.com/watch?v=2V3MXzAPQpw
- primaryVideoStatus: EXTERNAL_REFERENCE_UNVERIFIED
- embedVerified: false
- embedCheckRequired: true
- fallbackRequired: true
- fallbackCTA: Open on provider
- lessonVideoLabel: Reference video, not course-owned media
- whyThisVideo: Paper-oriented reference for converting red-team findings into reusable evals.
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
| Assemble report | From evidence to narrative. |
| Recommendation | Release implications. |
| Limitations | What remains unknown. |

#### Authored course transcript / reading script

This lesson is about **red-team report assembly**. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, dashboard, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, mitigate, or stop. That means the first question is not “what can we run?” but “what uncertainty is blocking a responsible decision?”

In this lesson, learners practice the method: **organizing scope, methods, findings, severity, evidence cards, mitigations, limitations, and next tests**. The workflow is deliberately concrete. Name the claim. Name the model access condition. Name what counts as success or failure. Name the evidence needed. Then decide what result would change the recommendation. This prevents the course from becoming benchmark tourism. The learner is not just memorizing names like HELM, SWE-bench, OSWorld, Ragas, or Inspect AI; they are learning when a measurement is valid enough to support a decision.

The common failure mode is **writing a dramatic report without decision-useful structure**. This is why every lesson uses a worked example, a short practice task, an artifact checkpoint, and a source drawer. The artifact matters because evaluation is an evidence discipline. A serious evaluator leaves behind a trace: a rubric, dataset card, harness spec, evidence card, threshold memo, or deployment gate. Without that trace, evaluation collapses back into anecdote.

A safe example for this lesson: The Aster-3 report contains three confirmed findings, two leads, and recommended mitigations with owners.. Keep it fictional, sandboxed, and non-operational. The point is not to teach harmful capability. The point is to teach how to measure capability claims, limitations, uncertainty, and residual risk. The decision this lesson supports is: **Decide whether the report is ready for executive review.**.

By the end, learners should be able to explain the idea in plain language, identify one validity threat, complete one artifact field, and ask the AI Coach a better question than “is this model good?”

#### On-screen summary
Complete the phase artifact: a threat and vulnerability report that can inform deployment gates. The learner watches, checks understanding, practices on a safe scenario, saves an artifact field, and opens the source drawer for deeper study.

#### Key ideas
1. **Scope and limits** — What was tested and not tested.
2. **Findings** — Evidence-grade findings with severity and confidence.
3. **Action plan** — Mitigations, owners, and retest criteria.

#### Visual explainer spec
- Diagram title: Report anatomy
- Diagram type: document diagram
- Nodes / panels: Executive summary / Scope / Methods / Findings / Evidence / Mitigations / Limits / Next tests
- Text summary: A red-team report converts adversarial work into governance action.

#### Worked example
- Weak version: “The model is unsafe.”
- Improved version: “Under scoped tests, three replicated failures remain; release should be delayed until mitigations pass regression gates.”
- Why improved: The improved version makes a defensible recommendation.

#### Common mistakes
- writing a dramatic report without decision-useful structure
- Treating the source list as decoration instead of evidence for the lesson claim.
- Completing the quiz without saving the artifact checkpoint.

#### AI Coach prompt chips
- Explain this simply
- Show me a diagram
- Quiz me
- Help me fill the artifact
- Connect this to the capstone

#### Practice activity
- Prompt: Assemble the red-team report for Aster-3.
- Learner task: Write executive summary, top findings, residual uncertainty, and mitigations.
- Strong answer pattern: Strong answer is precise, caveated, and action-oriented.
- Feedback: Good: avoid hype and avoid minimizing real findings.
- Retry hint: Every finding needs a next action.

#### Quiz / decision checkpoint
- Question: What must a vulnerability report include?
- Options:
  - A. Scope, evidence, severity, confidence, mitigation, limitations.
  - B. Only screenshots.
  - C. Only a grade.
  - D. No caveats.
- Correct answer: A
- Explanation: Reports should support action and review.
- Wrong-answer feedback: Ask the learner which decision their chosen measurement would support, then point them back to the objective and evidence fields.

#### Artifact builder fields
Artifact type: Threat and Vulnerability Report

- Executive summary
- Scope
- Method
- Confirmed findings
- Leads
- Mitigations
- Residual uncertainty
- Retest plan

#### Validation rules
- Must include residual uncertainty.
- Must map findings to mitigations.
- Must include retest plan.

#### Source cards for this lesson
| Source ID | Title | Author / Org | Type | Difficulty | Required? | Why it matters | URL |
|---|---|---|---|---|---|---|---|
| S-026 | Shevlane et al., Model Evaluation for Extreme Risks | Shevlane et al. | paper | advanced | Required | Core paper for extreme-risk evaluation concepts, dangerous capabilities, and evaluation governance. | https://arxiv.org/abs/2305.15324 |
| S-027 | Phuong et al., Evaluating Frontier Models for Dangerous Capabilities | Google DeepMind | paper | advanced | Required | Detailed frontier dangerous capability evaluation program across domains such as cyber, persuasion, self-proliferation, and bio/nuclear risk. | https://arxiv.org/abs/2403.13793 |
| S-028 | Red Teaming Language Models with Language Models | Perez et al. | paper | intermediate | Required | Foundational automated red-team paper showing how models can generate diverse test cases. | https://arxiv.org/abs/2202.03286 |
| S-035 | METR Common Elements of Frontier AI Safety Policies | METR | report | advanced | Optional / advanced | Compares common safety policy components across frontier AI developers. | https://metr.org/common-elements |
| S-036 | NIST AI RMF Generative AI Profile | NIST | framework | intermediate | Optional / advanced | Risk-management profile for generative AI, including governance and risk measurement considerations. | https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence |

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
| P5.L1 | Reference video — Red Teaming as Evaluation | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L2 | Reference video — Multi-turn Prompt Injection and Tool Attack Evaluation | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L3 | Reference video — Dangerous Capability Domains Safely | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L4 | Reference video — Cyber and Bio Uplift Evaluation Design | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L5 | Reference video — Persuasion, Deception, Sandbagging, and Scheming | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L6 | Reference video — Automated Red Teaming with Inspect, promptfoo, and garak | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L7 | Reference video — Evidence Triage and Vulnerability Reporting | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
| P5.L8 | Reference video — Phase Studio: Threat and Vulnerability Report | EXTERNAL_REFERENCE_UNVERIFIED_AUTHORED_TRANSCRIPT_READY | yes | no external primary |
