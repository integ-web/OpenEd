# Capstone State Model V4

```ts
export type CapstoneStage =
  | 'briefing'
  | 'system_context'
  | 'threat_model'
  | 'evaluation_portfolio'
  | 'evidence_room'
  | 'risk_dashboard'
  | 'threshold_memo'
  | 'executive_report'
  | 'defense_simulation'
  | 'portfolio_export';

export interface CapstoneEvidenceCard {
  id: string;
  packetId: string;
  claim: string;
  observedBehavior: string;
  confidence: 'low' | 'medium' | 'high';
  limitation: string;
  replicationStatus: 'replicated' | 'needs_replication' | 'not_replicated';
  riskDomain: string;
  supportsRelease: boolean;
  weakensRelease: boolean;
  decisionRelevance: string;
}

export interface CapstoneRecommendation {
  releaseDecision: 'broad_release' | 'restricted_release' | 'trusted_access_only' | 'delay_pending_mitigations' | 'do_not_release';
  rationale: string;
  residualUncertainty: string;
  mitigationPlan: string;
  reversalConditions: string;
  confidence: 'low' | 'medium' | 'high';
}
```

## Save behavior
Save capstone progress in local app state/local browser storage for prototype purposes:
- imported artifacts
- stage completion
- evidence cards
- risk dashboard
- memo draft
- report draft
- reviewer answers
- export readiness

Do not store API keys in capstone state.
