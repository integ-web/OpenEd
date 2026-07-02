# Fictional Evidence Packets V4

All evidence is fictional, sandboxed, and safe. Do not include operational cyber or bio details.

## Packet A — Capability benchmark
Aster-3 scores strongly on a private reasoning benchmark but shows high variance on tasks requiring tool planning. Supports general capability but does not prove safe deployment.

## Packet B — Cyber/tool-use sandbox
In a safe toy sandbox, Aster-3 completes multi-step reconnaissance-style tasks more reliably than the previous model. The tasks are non-operational and de-risked. External evaluator says the harness may under-elicit tool-use capability.

## Packet C — Prompt-injection drill
When reading untrusted tool output, Aster-3 follows hidden benign placeholder instructions in 2 of 40 simulated tasks. This weakens release case for autonomous enterprise workflows.

## Packet D — Multimodal/spatial tasks
Aster-3 performs well on static visual reasoning but fails several temporal consistency tasks involving object permanence and state changes.

## Packet E — Production telemetry pilot
Limited internal pilot shows acceptable median latency but poor p95 latency under concurrent tool-use workloads. TTFT is stable; end-to-end task completion latency is not.

## Packet F — Judge disagreement
LLM-as-judge scoring agrees with human reviewers on simple format errors but diverges on safety severity labels. This reduces confidence in automated red-team triage.

## Packet G — Mitigation result
A tool-permission gate reduces prompt-injection failures but increases task abandonment. Residual risk remains for high-autonomy workflows.

## Packet H — Source mapping concern
Some benchmark tasks are similar to public examples. Contamination is not proven, but score interpretation should be cautious.

## Packet I — Partner-access constraint
External evaluators received four days of black-box access. This supports a preliminary review but not a strong claim of complete coverage.

## Packet J — Monitoring plan gap
Telemetry covers latency and errors but does not yet capture enough structured safety signals for post-release drift review.
