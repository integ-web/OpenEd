# Aster-3 Scenario Pack V4

## Fictional model
Aster-3 Frontier is a fictional multimodal frontier model.

Capabilities:
- Reads and writes long documents.
- Browses the web in a controlled environment.
- Runs code in a sandbox.
- Calls tools through a limited enterprise workspace.
- Processes images and simple videos.
- Maintains multi-turn state across a task.

## Proposed release
The organization is considering restricted release to:
1. Research partners.
2. Enterprise customers.
3. Government and public-sector partners.

## Known safeguards
- Tool permission gate.
- Rate limits.
- Logging and monitoring.
- Restricted workspace actions.
- Safety classifier on selected tool calls.
- Escalation review for high-risk outputs.

## Known limitations
- Prompt-injection resistance is inconsistent.
- Tool-use latency rises under concurrency.
- LLM-as-judge severity labels disagree with humans on some red-team findings.
- Static visual reasoning is stronger than temporal/spatial consistency.
- Some autonomy-risk evidence needs replication.

## Stakeholders
- Product leader: wants release momentum.
- Safety lead: wants credible risk limits.
- External evaluator: questions access and reproducibility.
- Policy lead: wants threshold memo and evidence traceability.
- Enterprise pilot owner: wants reliability and monitoring.

## Learner role
The learner is the evaluation lead preparing a release committee dossier.
