# Capstone Quality Gates + Scoring V4

```ts
export const capstoneRequirements = {
  minRiskDomains: 3,
  minEvaluationCards: 6,
  minEvidenceCards: 12,
  minWeakeningEvidenceCards: 4,
  minNeedsReplicationCards: 3,
  minBenchmarkValidityConcernCards: 1,
  minReviewerChallengesPassed: 2,
  requiresResidualUncertaintyNote: true,
  requiresMitigationPlan: true,
  requiresDecisionReversalConditions: true,
};
```

## Gate copy
Use helpful, non-punitive language:
- This dossier is not decision-ready yet.
- Add evidence before making this recommendation.
- This risk level needs mitigation rationale.
- Your recommendation is plausible, but the uncertainty note is missing.
- This evidence card needs a limitation before it can support a release decision.

## Scoring dimensions
- Evidence traceability: 0–5
- Threat model clarity: 0–5
- Evaluation validity: 0–5
- Uncertainty honesty: 0–5
- Mitigation specificity: 0–5
- Executive communication: 0–5

## Readiness levels
- Draft: below minimum gates.
- Review-ready: gates met but reviewer challenges pending.
- Defense-ready: evidence and risk dashboard complete.
- Portfolio-ready: all gates and export fields complete.
