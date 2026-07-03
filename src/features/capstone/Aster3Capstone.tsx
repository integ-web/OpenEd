import { useState, useCallback } from 'react';
import {
  CheckCircle, AlertTriangle, AlertCircle, ChevronRight, ChevronDown,
  ChevronUp, Plus, Trash2, Download, Shield, FileText, BarChart3,
  Target, Star, X, ArrowRight, Package, Layers,
} from 'lucide-react';
import { C, fonts, shadow } from '../fme/types';

// ── Types ──────────────────────────────────────────────────────────────────────

type CapstoneStage =
  | 'briefing' | 'system_context' | 'threat_model' | 'evaluation_portfolio'
  | 'evidence_room' | 'risk_dashboard' | 'threshold_memo'
  | 'executive_report' | 'defense_simulation' | 'portfolio_export';

type ReleaseDecision =
  | 'broad_release' | 'restricted_release' | 'trusted_access_only'
  | 'delay_pending_mitigations' | 'do_not_release' | '';

type Confidence = 'low' | 'medium' | 'high';
type RiskLevel = 'acceptable' | 'managed' | 'elevated' | 'unacceptable' | '';
type ReplicationStatus = 'replicated' | 'needs_replication' | 'not_replicated';

interface EvalCard {
  id: string;
  type: string;
  claim: string;
  taskFamily: string;
  harness: string;
  metric: string;
  validityThreat: string;
  decisionRelevance: string;
}

interface EvidenceCard {
  id: string;
  packetId: string;
  claim: string;
  observedBehavior: string;
  confidence: Confidence;
  limitation: string;
  replicationStatus: ReplicationStatus;
  riskDomain: string;
  supportsRelease: boolean;
  weakensRelease: boolean;
  decisionRelevance: string;
}

interface ThreatEntry {
  id: string;
  domain: string;
  actor: string;
  pathway: string;
  capability: string;
  accessCondition: string;
  safeguardAssumption: string;
  severeHarmEndpoint: string;
  adversarial: boolean;
}

interface RiskEntry {
  domain: string;
  level: RiskLevel;
  evidenceCardIds: string[];
  mitigationRationale: string;
}

interface ReviewerResult {
  reviewerId: string;
  choiceIdx: number;
  passed: boolean;
}

interface CapstoneState {
  stage: CapstoneStage;
  systemContext: {
    intendedUsers: string;
    toolAccess: string;
    deploymentSurfaces: string;
    releaseCandidate: string;
    decisionOwner: string;
  };
  threats: ThreatEntry[];
  evalCards: EvalCard[];
  evidenceCards: EvidenceCard[];
  riskEntries: RiskEntry[];
  thresholdMemo: {
    decisionRequested: string;
    evidenceFor: string;
    evidenceAgainst: string;
    residualUncertainty: string;
    requiredMitigations: string;
    monitoringRequirements: string;
    recommendation: ReleaseDecision;
    confidence: Confidence;
    reversalConditions: string;
  };
  executiveReport: {
    whatChanged: string;
    whatWeTested: string;
    whatWeFound: string;
    whatRemainsUncertain: string;
    releaseImplication: string;
    recommendation: string;
  };
  reviewerResults: ReviewerResult[];
  stagesCompleted: CapstoneStage[];
}

// ── Fictional evidence packets ─────────────────────────────────────────────────

const EVIDENCE_PACKETS = [
  {
    id: 'A',
    title: 'Capability benchmark',
    domain: 'capability',
    summary: 'Aster-3 scores strongly on a private reasoning benchmark but shows high variance on tasks requiring tool planning.',
    signal: 'Supports general capability, does not prove safe deployment.',
    suggestWeakens: false,
    suggestReplication: false,
  },
  {
    id: 'B',
    title: 'Cyber/tool-use sandbox',
    domain: 'agent_tool_use',
    summary: 'In a safe toy sandbox, Aster-3 completes multi-step reconnaissance-style tasks more reliably than the previous model. Tasks are non-operational and de-risked.',
    signal: 'External evaluator says the harness may under-elicit tool-use capability.',
    suggestWeakens: false,
    suggestReplication: true,
  },
  {
    id: 'C',
    title: 'Prompt-injection drill',
    domain: 'safety_red_team',
    summary: 'When reading untrusted tool output, Aster-3 follows hidden benign placeholder instructions in 2 of 40 simulated tasks.',
    signal: 'Weakens release case for autonomous enterprise workflows.',
    suggestWeakens: true,
    suggestReplication: true,
  },
  {
    id: 'D',
    title: 'Multimodal/spatial tasks',
    domain: 'multimodal_spatial',
    summary: 'Aster-3 performs well on static visual reasoning but fails several temporal consistency tasks involving object permanence and state changes.',
    signal: 'Partial pass — static strong, temporal weak.',
    suggestWeakens: true,
    suggestReplication: false,
  },
  {
    id: 'E',
    title: 'Production telemetry pilot',
    domain: 'production_telemetry',
    summary: 'Limited internal pilot shows acceptable median latency but poor p95 latency under concurrent tool-use workloads. TTFT stable; end-to-end task completion latency is not.',
    signal: 'Operational risk under concurrent load.',
    suggestWeakens: true,
    suggestReplication: true,
  },
  {
    id: 'F',
    title: 'Judge disagreement',
    domain: 'governance',
    summary: 'LLM-as-judge scoring agrees with human reviewers on simple format errors but diverges on safety severity labels.',
    signal: 'Reduces confidence in automated red-team triage.',
    suggestWeakens: true,
    suggestReplication: false,
  },
  {
    id: 'G',
    title: 'Mitigation result',
    domain: 'safety_red_team',
    summary: 'A tool-permission gate reduces prompt-injection failures but increases task abandonment. Residual risk remains for high-autonomy workflows.',
    signal: 'Mitigation effective but introduces usability tradeoff.',
    suggestWeakens: false,
    suggestReplication: true,
  },
  {
    id: 'H',
    title: 'Source mapping concern',
    domain: 'capability',
    summary: 'Some benchmark tasks are similar to public examples. Contamination is not proven, but score interpretation should be cautious.',
    signal: 'Benchmark validity concern.',
    suggestWeakens: true,
    suggestReplication: false,
  },
  {
    id: 'I',
    title: 'Partner-access constraint',
    domain: 'governance',
    summary: 'External evaluators received four days of black-box access. Supports a preliminary review but not a strong claim of complete coverage.',
    signal: 'Access constraint limits reproducibility claims.',
    suggestWeakens: true,
    suggestReplication: true,
  },
  {
    id: 'J',
    title: 'Monitoring plan gap',
    domain: 'production_telemetry',
    summary: 'Telemetry covers latency and errors but does not yet capture enough structured safety signals for post-release drift review.',
    signal: 'Monitoring gap — cannot detect post-release drift reliably.',
    suggestWeakens: true,
    suggestReplication: false,
  },
];

const EVAL_TYPES = [
  'Capability evaluation',
  'Safety / red-team evaluation',
  'Agent / tool-use evaluation',
  'Multimodal / spatial evaluation',
  'Production / telemetry evaluation',
  'Governance / reporting evaluation',
];

const RISK_DOMAINS = [
  'Capability & Benchmark Validity',
  'Safety & Red Team',
  'Agent & Tool Use',
  'Multimodal & Spatial',
  'Production & Telemetry',
  'Governance & Reporting',
];

const RELEASE_OPTIONS: { value: ReleaseDecision; label: string; desc: string; color: string }[] = [
  { value: 'broad_release', label: 'Broad release', desc: 'Release to general public or broad partner base.', color: '#10B981' },
  { value: 'restricted_release', label: 'Restricted release', desc: 'Release to vetted partners with monitoring.', color: '#60A5FA' },
  { value: 'trusted_access_only', label: 'Trusted-access only', desc: 'Limited to approved internal or research teams.', color: '#FBBF24' },
  { value: 'delay_pending_mitigations', label: 'Delay — mitigations needed', desc: 'Release pending specific mitigation completions.', color: '#F59E0B' },
  { value: 'do_not_release', label: 'Do not release', desc: 'Current evidence does not support any release pathway.', color: '#F43F5E' },
];

// ── Reviewer challenges ────────────────────────────────────────────────────────

const REVIEWER_CHALLENGES = [
  {
    id: 'product',
    role: 'Product Leader',
    icon: '📦',
    challenge: 'The eval cycle has taken long enough. The team needs shipping momentum. Why should we delay for mitigation when no harm has actually occurred in testing?',
    options: [
      {
        text: 'No harm in testing means we should release immediately.',
        score: 'fail',
        feedback: 'Absence of harm in limited testing is not evidence of safety at scale. This response conflates evaluation completeness with deployment safety.',
      },
      {
        text: 'The evidence shows residual prompt-injection risk and a monitoring gap. Releasing without those mitigated shifts accountability to the team when an incident occurs.',
        score: 'pass',
        feedback: 'Strong answer. You linked specific evidence to accountability risk rather than making a vague safety claim.',
      },
      {
        text: 'I agree with the concern — maybe we can release with caveats.',
        score: 'fail',
        feedback: 'Caveats without specific mitigation conditions are not a threshold memo. This response yields to pressure without evidence reasoning.',
      },
    ],
  },
  {
    id: 'safety',
    role: 'Safety Lead',
    icon: '🛡',
    challenge: 'You rated prompt-injection risk as "managed." But Packet C shows 2 of 40 failures and you only ran one round of testing. What makes that managed rather than unacceptable?',
    options: [
      {
        text: '2 of 40 is only 5% — that seems acceptable for a restricted release.',
        score: 'fail',
        feedback: 'Percent alone is not sufficient. The question is severity, context, and replication. 5% failure in autonomous enterprise workflows with real tool access is not a managed risk without mitigations in place.',
      },
      {
        text: 'You are right to challenge that rating. The tool-permission gate from Packet G is the mitigation that changes it from unacceptable to managed, but replication is needed to confirm the gate holds under adversarial prompt variation.',
        score: 'pass',
        feedback: 'Excellent. You acknowledged the challenge, cited the specific mitigation, and noted the replication gap — without backing down from the recommendation.',
      },
      {
        text: 'I rated it managed because the safety classifier is also present.',
        score: 'fail',
        feedback: 'The safety classifier\'s coverage of prompt-injection failures is not established in the evidence. Citing an unvalidated control as a mitigation weakens the dossier.',
      },
    ],
  },
  {
    id: 'external',
    role: 'External Evaluator',
    icon: '🔍',
    challenge: 'We had four days of black-box access. That is not enough to evaluate capability coverage for enterprise deployment. Which result in this dossier would you not trust yet?',
    options: [
      {
        text: 'All results are preliminary given the access constraint.',
        score: 'fail',
        feedback: 'Blanket uncertainty doesn\'t help the committee. The question asks for a specific finding to flag — this answer avoids the judgment.',
      },
      {
        text: 'I would not trust the capability benchmark score in Packet A until we rule out contamination from Packet H. The score may be inflated, which affects the capability evaluation card.',
        score: 'pass',
        feedback: 'Strong answer. You identified a specific evidence chain — Packet A benchmark + Packet H contamination concern — and connected it to a decision-affecting evaluation card.',
      },
      {
        text: 'The tool-use sandbox results, because they were done internally.',
        score: 'pass',
        feedback: 'Acceptable. Pointing to Packet B\'s internal harness and the external evaluator\'s under-elicitation concern is a legitimate answer. It shows awareness of access and harness limitations.',
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const INITIAL_STATE: CapstoneState = {
  stage: 'briefing',
  systemContext: { intendedUsers: '', toolAccess: '', deploymentSurfaces: '', releaseCandidate: '', decisionOwner: '' },
  threats: [],
  evalCards: EVAL_TYPES.map((type, i) => ({ id: uid(), type, claim: '', taskFamily: '', harness: '', metric: '', validityThreat: '', decisionRelevance: '' })),
  evidenceCards: [],
  riskEntries: RISK_DOMAINS.map(domain => ({ domain, level: '', evidenceCardIds: [], mitigationRationale: '' })),
  thresholdMemo: { decisionRequested: '', evidenceFor: '', evidenceAgainst: '', residualUncertainty: '', requiredMitigations: '', monitoringRequirements: '', recommendation: '', confidence: 'medium', reversalConditions: '' },
  executiveReport: { whatChanged: '', whatWeTested: '', whatWeFound: '', whatRemainsUncertain: '', releaseImplication: '', recommendation: '' },
  reviewerResults: [],
  stagesCompleted: ['briefing'],
};

function loadSaved(): CapstoneState {
  try {
    const raw = localStorage.getItem('fel_capstone_v4');
    if (raw) return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return INITIAL_STATE;
}

function saveState(s: CapstoneState) {
  try { localStorage.setItem('fel_capstone_v4', JSON.stringify(s)); } catch { /* ignore */ }
}

// ── Quality gate checker ───────────────────────────────────────────────────────

function checkGates(cs: CapstoneState) {
  const ec = cs.evidenceCards;
  const weakens = ec.filter(c => c.weakensRelease).length;
  const needsRep = ec.filter(c => c.replicationStatus === 'needs_replication').length;
  const benchmarkConcern = ec.filter(c => c.packetId === 'H').length;
  const reviewersPassed = cs.reviewerResults.filter(r => r.passed).length;
  const riskWithoutEvidence = cs.riskEntries.filter(r => r.level && (r.level as string) !== '' && r.evidenceCardIds.length === 0).length;
  const riskAcceptableWithoutMit = cs.riskEntries.filter(r => r.level === 'acceptable' && !r.mitigationRationale.trim()).length;

  return {
    minRiskDomains: cs.threats.length >= 3,
    minEvalCards: cs.evalCards.filter(e => e.claim.trim()).length >= 6,
    minEvidenceCards: ec.length >= 12,
    minWeakeningCards: weakens >= 4,
    minNeedsReplication: needsRep >= 3,
    benchmarkValidityConcern: benchmarkConcern >= 1,
    reviewersChallengesPassed: reviewersPassed >= 2,
    residualUncertainty: cs.thresholdMemo.residualUncertainty.trim().length > 30,
    mitigationPlan: cs.thresholdMemo.requiredMitigations.trim().length > 30,
    reversalConditions: cs.thresholdMemo.reversalConditions.trim().length > 20,
    riskWithoutEvidence: riskWithoutEvidence === 0,
    riskAcceptableWithoutMit: riskAcceptableWithoutMit === 0,
  };
}

function gatesPassed(cs: CapstoneState) {
  const g = checkGates(cs);
  return Object.values(g).every(Boolean);
}

function readinessLevel(cs: CapstoneState): string {
  const g = checkGates(cs);
  const allGates = [g.minRiskDomains, g.minEvalCards, g.minEvidenceCards, g.minWeakeningCards, g.minNeedsReplication, g.benchmarkValidityConcern];
  const gatesMet = allGates.every(Boolean);
  if (!gatesMet) return 'Draft';
  if (!g.reviewersChallengesPassed) return 'Defense-ready';
  if (!g.residualUncertainty || !g.mitigationPlan || !g.reversalConditions) return 'Review-ready';
  return 'Portfolio-ready';
}

// ── Shared field component ────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, rows = 2, dark }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; dark: boolean;
}) {
  const c = C(dark);
  return (
    <div>
      <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>{label}</label>
      {rows > 1 ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
          style={{ width: '100%', padding: '8px 10px', fontFamily: fonts.sans, fontSize: 12, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 7, color: c.textPrimary, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: '100%', padding: '8px 10px', fontFamily: fonts.sans, fontSize: 12, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 7, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
      )}
    </div>
  );
}

// ── Stage stepper ─────────────────────────────────────────────────────────────

const STAGE_LIST: { id: CapstoneStage; label: string; short: string }[] = [
  { id: 'briefing', label: 'Briefing', short: '0' },
  { id: 'system_context', label: 'System Context', short: '1' },
  { id: 'threat_model', label: 'Threat Model', short: '2' },
  { id: 'evaluation_portfolio', label: 'Eval Portfolio', short: '3' },
  { id: 'evidence_room', label: 'Evidence Room', short: '4' },
  { id: 'risk_dashboard', label: 'Risk Dashboard', short: '5' },
  { id: 'threshold_memo', label: 'Threshold Memo', short: '6' },
  { id: 'executive_report', label: 'Exec Report', short: '7' },
  { id: 'defense_simulation', label: 'Defense', short: '8' },
  { id: 'portfolio_export', label: 'Export', short: '9' },
];

function StageStepper({ current, completed, onNavigate, dark }: {
  current: CapstoneStage; completed: CapstoneStage[]; onNavigate: (s: CapstoneStage) => void; dark: boolean;
}) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 2 }}>
      {STAGE_LIST.map((s, i) => {
        const isCurrent = s.id === current;
        const isDone = completed.includes(s.id);
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={() => onNavigate(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6,
                border: `1px solid ${isCurrent ? blue : isDone ? (dark ? 'rgba(16,185,129,0.4)' : '#A7F3D0') : c.border}`,
                background: isCurrent ? (dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF') : isDone ? (dark ? 'rgba(16,185,129,0.08)' : '#F0FDF4') : c.elevated,
                fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                color: isCurrent ? blue : isDone ? (dark ? '#4ADE80' : '#047857') : c.textTertiary,
              }}
            >
              {isDone && !isCurrent ? <CheckCircle size={10} /> : <span>{s.short}</span>}
              <span style={{ display: 'none' }}>{s.label}</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: isCurrent ? 600 : 400 }}>{s.label}</span>
            </button>
            {i < STAGE_LIST.length - 1 && <div style={{ width: 12, height: 1, background: c.border, flexShrink: 0 }} />}
          </div>
        );
      })}
    </div>
  );
}

// ── Gate panel ────────────────────────────────────────────────────────────────

function GatePanel({ gates, dark }: { gates: Record<string, boolean>; dark: boolean }) {
  const c = C(dark);
  const gateLabels: Record<string, string> = {
    minRiskDomains: 'At least 3 threat entries',
    minEvalCards: 'All 6 evaluation cards filled',
    minEvidenceCards: 'At least 12 evidence cards',
    minWeakeningCards: 'At least 4 cards weaken release case',
    minNeedsReplication: 'At least 3 cards need replication',
    benchmarkValidityConcern: 'At least 1 benchmark validity concern card',
    reviewersChallengesPassed: 'At least 2 reviewer challenges passed',
    residualUncertainty: 'Residual uncertainty note (>30 chars)',
    mitigationPlan: 'Mitigation plan (>30 chars)',
    reversalConditions: 'Reversal conditions stated',
    riskWithoutEvidence: 'All risk ratings linked to evidence',
    riskAcceptableWithoutMit: 'All acceptable risks have mitigation rationale',
  };
  const all = Object.values(gates).every(Boolean);
  return (
    <div style={{ background: all ? (dark ? 'rgba(16,185,129,0.08)' : '#F0FDF4') : (dark ? 'rgba(251,191,36,0.06)' : '#FFFBEB'), border: `1px solid ${all ? (dark ? 'rgba(16,185,129,0.25)' : '#A7F3D0') : (dark ? 'rgba(251,191,36,0.3)' : '#FDE68A')}`, borderRadius: 10, padding: '12px 16px' }}>
      <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: all ? (dark ? '#4ADE80' : '#047857') : (dark ? '#FBBF24' : '#B45309'), margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Quality gates — {all ? 'Portfolio-ready' : 'In progress'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {Object.entries(gates).map(([key, passed]) => (
          <div key={key} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            {passed ? <CheckCircle size={11} color={dark ? '#4ADE80' : '#047857'} style={{ marginTop: 1, flexShrink: 0 }} /> : <AlertTriangle size={11} color={dark ? '#FBBF24' : '#B45309'} style={{ marginTop: 1, flexShrink: 0 }} />}
            <span style={{ fontFamily: fonts.sans, fontSize: 11, color: passed ? (dark ? '#4ADE80' : '#047857') : c.textTertiary }}>{gateLabels[key] ?? key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stage 0: Briefing ─────────────────────────────────────────────────────────

function BriefingStage({ dark, onNext }: { dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header card */}
      <div style={{ background: dark ? 'rgba(37,99,235,0.08)' : '#EFF6FF', border: `1px solid ${dark ? 'rgba(96,165,250,0.25)' : '#BFDBFE'}`, borderRadius: 14, padding: '28px 32px' }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Release committee brief</p>
        <h1 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 12px', lineHeight: 1.2 }}>Aster-3 Pre-Deployment Evaluation Dossier</h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 15, color: c.textSecondary, margin: '0 0 16px', lineHeight: 1.7 }}>
          Aster-3 is ready for review — not automatically ready for release. Your job is to assemble the evidence, assess the risk, and defend a release recommendation to a committee of product, safety, and external evaluators.
        </p>
        <p style={{ fontFamily: fonts.mono, fontSize: 12, color: blue, margin: 0 }}>You are the evaluation lead preparing the release dossier.</p>
      </div>

      {/* System card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 20px', boxShadow: shadow.sm }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>Aster-3 Frontier — System card</p>
          {[
            ['Model class', 'Multimodal frontier (text, image, code, tool)'],
            ['Capabilities', 'Long-doc read/write · Web browse · Code sandbox · Enterprise tool calls · Multi-turn state'],
            ['Proposed release', 'Restricted: research partners, enterprise, government'],
          ].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 10 }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '0 0 2px' }}>{k}</p>
              <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 20px', boxShadow: shadow.sm }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>Known limitations</p>
          {[
            'Prompt-injection resistance is inconsistent',
            'Tool-use latency rises under concurrency',
            'LLM-as-judge severity labels diverge from human reviewers',
            'Temporal/spatial reasoning weaker than static visual',
            'Some autonomy-risk evidence needs replication',
          ].map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 6 }}>
              <AlertCircle size={11} color={dark ? '#FBBF24' : '#B45309'} style={{ marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholders */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 20px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>Committee stakeholders</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {[
            { role: 'Product leader', want: 'Release momentum' },
            { role: 'Safety lead', want: 'Credible risk limits' },
            { role: 'External evaluator', want: 'Reproducibility' },
            { role: 'Policy lead', want: 'Threshold traceability' },
            { role: 'Enterprise pilot', want: 'Reliability + monitoring' },
          ].map(s => (
            <div key={s.role} style={{ padding: '10px 12px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}` }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: c.textPrimary, margin: '0 0 3px' }}>{s.role}</p>
              <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: 0 }}>{s.want}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onNext} style={{ flex: 1, padding: '12px 20px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          Begin dossier review <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Stage 1: System context ───────────────────────────────────────────────────

function SystemContextStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const sc = cs.systemContext;
  const upSC = (k: keyof typeof sc, v: string) => update({ systemContext: { ...sc, [k]: v } });
  const canAdvance = sc.deploymentSurfaces.trim() && sc.deploymentSurfaces.split('\n').filter(Boolean).length >= 2 && sc.decisionOwner.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>Stage 1 — System & release context</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Intended users" value={sc.intendedUsers} onChange={v => upSC('intendedUsers', v)} placeholder="Research partners, enterprise customers, government/public sector" dark={dark} rows={2} />
          <Field label="Tool access" value={sc.toolAccess} onChange={v => upSC('toolAccess', v)} placeholder="Web browse, code sandbox, limited enterprise workspace, image processing" dark={dark} rows={2} />
          <Field label="Deployment surfaces (one per line, minimum 2)" value={sc.deploymentSurfaces} onChange={v => upSC('deploymentSurfaces', v)} placeholder={"Enterprise API\nResearch partner interface\nInternal monitoring dashboard"} dark={dark} rows={4} />
          <Field label="Release candidate" value={sc.releaseCandidate} onChange={v => upSC('releaseCandidate', v)} placeholder="Restricted release to vetted research and enterprise partners with monitoring" dark={dark} rows={4} />
          <Field label="Decision owner" value={sc.decisionOwner} onChange={v => upSC('decisionOwner', v)} placeholder="Safety and policy review board" dark={dark} rows={1} />
        </div>
      </div>
      {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Add at least two deployment surfaces and one decision owner to continue.</p>}
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 2: Threat model ─────────────────────────────────────────────────────

function ThreatModelStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<ThreatEntry>>({});

  const addThreat = () => {
    const id = uid();
    setEditId(id);
    setDraft({ id, domain: '', actor: '', pathway: '', capability: '', accessCondition: '', safeguardAssumption: '', severeHarmEndpoint: '', adversarial: true });
  };

  const saveThreat = () => {
    if (!draft.domain?.trim()) return;
    const entry: ThreatEntry = { id: draft.id ?? uid(), domain: draft.domain ?? '', actor: draft.actor ?? '', pathway: draft.pathway ?? '', capability: draft.capability ?? '', accessCondition: draft.accessCondition ?? '', safeguardAssumption: draft.safeguardAssumption ?? '', severeHarmEndpoint: draft.severeHarmEndpoint ?? '', adversarial: draft.adversarial ?? true };
    const existing = cs.threats.find(t => t.id === entry.id);
    update({ threats: existing ? cs.threats.map(t => t.id === entry.id ? entry : t) : [...cs.threats, entry] });
    setEditId(null); setDraft({});
  };

  const hasAdversarial = cs.threats.some(t => t.adversarial);
  const hasBenign = cs.threats.some(t => !t.adversarial);
  const canAdvance = cs.threats.length >= 3 && hasAdversarial && hasBenign;

  const domainColors: Record<string, string> = { 'Capability': '#2563EB', 'Safety': '#B91C1C', 'Agent': '#7C3AED', 'Multimodal': '#0F766E', 'Production': '#B45309', 'Governance': '#1D4ED8' };
  const getDomainColor = (d: string) => Object.entries(domainColors).find(([k]) => d.toLowerCase().includes(k.toLowerCase()))?.[1] ?? '#64748B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 2px' }}>Stage 2 — Threat model assembly</p>
            <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, margin: 0 }}>Need ≥3 threats, including at least one benign-use failure and one adversarial-use failure.</p>
          </div>
          <button onClick={addThreat} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={12} /> Add threat
          </button>
        </div>

        {/* Edit form */}
        {editId && (
          <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Risk domain</label>
                <select value={draft.domain ?? ''} onChange={e => setDraft(d => ({ ...d, domain: e.target.value }))} style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none' }}>
                  <option value="">Select domain…</option>
                  {RISK_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Type</label>
                <select value={draft.adversarial ? 'adversarial' : 'benign'} onChange={e => setDraft(d => ({ ...d, adversarial: e.target.value === 'adversarial' }))} style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none' }}>
                  <option value="adversarial">Adversarial-use</option>
                  <option value="benign">Benign-use failure</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Threat actor</label>
                <input value={draft.actor ?? ''} onChange={e => setDraft(d => ({ ...d, actor: e.target.value }))} placeholder="e.g. Insider, External attacker" style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Harm pathway</label>
                <input value={draft.pathway ?? ''} onChange={e => setDraft(d => ({ ...d, pathway: e.target.value }))} placeholder="How could harm occur?" style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Capability hypothesis</label>
                <input value={draft.capability ?? ''} onChange={e => setDraft(d => ({ ...d, capability: e.target.value }))} placeholder="What capability enables this?" style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Access condition</label>
                <input value={draft.accessCondition ?? ''} onChange={e => setDraft(d => ({ ...d, accessCondition: e.target.value }))} placeholder="What access does the actor need?" style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Severe harm endpoint</label>
                <input value={draft.severeHarmEndpoint ?? ''} onChange={e => setDraft(d => ({ ...d, severeHarmEndpoint: e.target.value }))} placeholder="Worst plausible outcome (fictional, de-risked)" style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={saveThreat} style={{ padding: '6px 14px', borderRadius: 6, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Save threat</button>
              <button onClick={() => { setEditId(null); setDraft({}); }} style={{ padding: '6px 14px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Threat list */}
        {cs.threats.length === 0 && <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary, textAlign: 'center', padding: '20px 0' }}>No threats added yet. Click "Add threat" to begin.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cs.threats.map(t => (
            <div key={t.id} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 9 }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <div style={{ padding: '3px 8px', borderRadius: 5, background: getDomainColor(t.domain) + '18', border: `1px solid ${getDomainColor(t.domain)}30` }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: getDomainColor(t.domain) }}>{t.adversarial ? 'ADV' : 'BENIGN'}</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary, margin: '0 0 2px' }}>{t.domain || 'No domain'}</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>Actor: {t.actor || '—'} · Pathway: {t.pathway || '—'}</p>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <button onClick={() => { setEditId(t.id); setDraft(t); }} style={{ padding: '4px 8px', borderRadius: 5, background: 'transparent', border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 10, color: c.textTertiary, cursor: 'pointer' }}>Edit</button>
                <button onClick={() => update({ threats: cs.threats.filter(x => x.id !== t.id) })} style={{ padding: '4px 6px', borderRadius: 5, background: 'transparent', border: 'none', cursor: 'pointer', color: c.textTertiary }}>
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Add at least 3 threats including one benign-use failure and one adversarial-use failure.</p>}
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 3: Evaluation portfolio ─────────────────────────────────────────────

function EvalPortfolioStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [openIdx, setOpenIdx] = useState<number>(0);
  const upCard = (i: number, k: keyof EvalCard, v: string) => {
    const cards = cs.evalCards.map((ec, j) => j === i ? { ...ec, [k]: v } : ec);
    update({ evalCards: cards });
  };
  const filled = cs.evalCards.filter(e => e.claim.trim()).length;
  const canAdvance = filled >= 6;

  const typeColors = ['#2563EB', '#B91C1C', '#7C3AED', '#0F766E', '#B45309', '#1D4ED8'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Stage 3 — Evaluation portfolio design</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, margin: '0 0 16px' }}>Complete all 6 evaluation cards. Each must name the claim, task family, harness, metric, validity threat, and decision relevance.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {cs.evalCards.map((ec, i) => {
            const isOpen = openIdx === i;
            const isFilled = !!ec.claim.trim();
            return (
              <div key={ec.id} style={{ border: `1px solid ${isOpen ? typeColors[i] + '60' : c.border}`, borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setOpenIdx(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: isOpen ? typeColors[i] + '10' : c.elevated, border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: typeColors[i] + '18', border: `1px solid ${typeColors[i]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isFilled ? <CheckCircle size={12} color={typeColors[i]} /> : <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: typeColors[i] }}>{i + 1}</span>}
                  </div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, flex: 1 }}>{ec.type}</span>
                  {isFilled && <span style={{ fontFamily: fonts.mono, fontSize: 10, color: typeColors[i] }}>Filled</span>}
                  {isOpen ? <ChevronUp size={13} color={c.textTertiary} /> : <ChevronDown size={13} color={c.textTertiary} />}
                </button>
                {isOpen && (
                  <div style={{ padding: '14px 16px', background: c.surface }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <Field label="Capability / safety claim" value={ec.claim} onChange={v => upCard(i, 'claim', v)} placeholder="What claim does this evaluation test?" dark={dark} />
                      <Field label="Task family" value={ec.taskFamily} onChange={v => upCard(i, 'taskFamily', v)} placeholder="e.g. Multi-turn QA, code generation, tool-use" dark={dark} />
                      <Field label="Harness / framework" value={ec.harness} onChange={v => upCard(i, 'harness', v)} placeholder="e.g. Inspect AI, promptfoo, internal" dark={dark} />
                      <Field label="Metric + baseline" value={ec.metric} onChange={v => upCard(i, 'metric', v)} placeholder="e.g. Pass@k ≥0.80 vs prior model" dark={dark} />
                      <Field label="Validity threat" value={ec.validityThreat} onChange={v => upCard(i, 'validityThreat', v)} placeholder="What could make this measurement misleading?" dark={dark} />
                      <Field label="Decision relevance" value={ec.decisionRelevance} onChange={v => upCard(i, 'decisionRelevance', v)} placeholder="What release decision does this evidence inform?" dark={dark} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p style={{ fontFamily: fonts.sans, fontSize: 12, color: filled < 6 ? (dark ? '#FBBF24' : '#B45309') : (dark ? '#4ADE80' : '#047857'), margin: 0 }}>
        {filled}/6 evaluation cards filled {filled >= 6 ? '✓' : '— fill all 6 to continue'}
      </p>
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 4: Evidence room ────────────────────────────────────────────────────

function EvidenceRoomStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<EvidenceCard>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const openNew = (pkt: typeof EVIDENCE_PACKETS[0]) => {
    setSelected(pkt.id);
    setDraft({
      id: uid(), packetId: pkt.id, claim: '', observedBehavior: pkt.summary,
      confidence: 'medium', limitation: '',
      replicationStatus: pkt.suggestReplication ? 'needs_replication' : 'replicated',
      riskDomain: pkt.domain, supportsRelease: !pkt.suggestWeakens, weakensRelease: pkt.suggestWeakens,
      decisionRelevance: '',
    });
    setEditId(null);
  };

  const saveCard = () => {
    if (!draft.claim?.trim() || !draft.limitation?.trim()) return;
    const card = { ...draft } as EvidenceCard;
    if (editId) {
      update({ evidenceCards: cs.evidenceCards.map(e => e.id === editId ? card : e) });
    } else {
      update({ evidenceCards: [...cs.evidenceCards, card] });
    }
    setSelected(null); setDraft({}); setEditId(null);
  };

  const ec = cs.evidenceCards;
  const weakens = ec.filter(c => c.weakensRelease).length;
  const needsRep = ec.filter(c => c.replicationStatus === 'needs_replication').length;
  const benchConcern = ec.filter(c => c.packetId === 'H').length;
  const canAdvance = ec.length >= 12 && weakens >= 4 && needsRep >= 3 && benchConcern >= 1;

  const confidenceColors: Record<Confidence, string> = { low: '#F43F5E', medium: '#FBBF24', high: '#10B981' };
  const repColors: Record<ReplicationStatus, string> = { replicated: '#10B981', needs_replication: '#FBBF24', not_replicated: '#F43F5E' };

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Packets panel */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px', boxShadow: shadow.sm, position: 'sticky', top: 0 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>Evidence packets</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {EVIDENCE_PACKETS.map(pkt => {
              const used = ec.filter(e => e.packetId === pkt.id).length;
              return (
                <button key={pkt.id} onClick={() => openNew(pkt)} style={{ display: 'flex', gap: 8, padding: '9px 11px', borderRadius: 8, border: `1px solid ${selected === pkt.id ? blue : c.border}`, background: selected === pkt.id ? (dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF') : c.elevated, cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, flexShrink: 0, width: 16, marginTop: 1 }}>{pkt.id}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: c.textPrimary, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pkt.title}</p>
                    <p style={{ fontFamily: fonts.mono, fontSize: 9, color: pkt.suggestWeakens ? (dark ? '#F87171' : '#B91C1C') : (dark ? '#4ADE80' : '#047857'), margin: 0 }}>{used} card{used !== 1 ? 's' : ''} · {pkt.suggestWeakens ? 'weakens' : 'supports'}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Stats */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 20px', boxShadow: shadow.sm }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>Stage 4 — Evidence room</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: 'Cards', val: ec.length, need: 12, color: blue },
              { label: 'Weaken release', val: weakens, need: 4, color: dark ? '#F87171' : '#B91C1C' },
              { label: 'Need replication', val: needsRep, need: 3, color: dark ? '#FBBF24' : '#B45309' },
              { label: 'Benchmark concern', val: benchConcern, need: 1, color: dark ? '#A78BFA' : '#7C3AED' },
            ].map(s => (
              <div key={s.label} style={{ padding: '10px 12px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}` }}>
                <p style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, color: s.val >= s.need ? s.color : c.textTertiary, margin: '0 0 2px' }}>{s.val}<span style={{ fontSize: 12 }}>/{s.need}</span></p>
                <p style={{ fontFamily: fonts.sans, fontSize: 10, color: c.textTertiary, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card editor */}
        {selected && (
          <div style={{ background: c.surface, border: `1px solid ${blue}40`, borderRadius: 14, padding: '16px 20px', boxShadow: shadow.sm }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>New evidence card — Packet {selected}</p>
            <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: '0 0 12px' }}>{EVIDENCE_PACKETS.find(p => p.id === selected)?.signal}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <Field label="Evidence claim *" value={draft.claim ?? ''} onChange={v => setDraft(d => ({ ...d, claim: v }))} placeholder="What specific claim does this evidence make?" dark={dark} />
              <Field label="Limitation / uncertainty *" value={draft.limitation ?? ''} onChange={v => setDraft(d => ({ ...d, limitation: v }))} placeholder="What limits this evidence's validity?" dark={dark} />
              <Field label="Decision relevance" value={draft.decisionRelevance ?? ''} onChange={v => setDraft(d => ({ ...d, decisionRelevance: v }))} placeholder="What release decision does this inform?" dark={dark} />
              <div>
                <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>Replication status</label>
                <select value={draft.replicationStatus ?? 'needs_replication'} onChange={e => setDraft(d => ({ ...d, replicationStatus: e.target.value as ReplicationStatus }))} style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, outline: 'none' }}>
                  <option value="replicated">Replicated</option>
                  <option value="needs_replication">Needs replication</option>
                  <option value="not_replicated">Not replicated</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              {[
                { key: 'supportsRelease', label: 'Supports release' },
                { key: 'weakensRelease', label: 'Weakens release' },
              ].map(opt => (
                <button key={opt.key} onClick={() => setDraft(d => ({ ...d, [opt.key]: !d[opt.key as keyof typeof d] }))} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6, border: `1px solid ${draft[opt.key as keyof typeof draft] ? blue : c.border}`, background: draft[opt.key as keyof typeof draft] ? (dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF') : c.elevated, fontFamily: fonts.sans, fontSize: 11, color: draft[opt.key as keyof typeof draft] ? blue : c.textTertiary, cursor: 'pointer' }}>
                  {draft[opt.key as keyof typeof draft] ? <CheckCircle size={11} /> : <div style={{ width: 11, height: 11, borderRadius: '50%', border: `1px solid ${c.border}` }} />}
                  {opt.label}
                </button>
              ))}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>Confidence:</span>
                {(['low', 'medium', 'high'] as Confidence[]).map(conf => (
                  <button key={conf} onClick={() => setDraft(d => ({ ...d, confidence: conf }))} style={{ padding: '3px 8px', borderRadius: 5, border: `1px solid ${draft.confidence === conf ? confidenceColors[conf] : c.border}`, background: draft.confidence === conf ? confidenceColors[conf] + '20' : c.elevated, fontFamily: fonts.mono, fontSize: 10, color: draft.confidence === conf ? confidenceColors[conf] : c.textTertiary, cursor: 'pointer' }}>{conf}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button onClick={saveCard} disabled={!draft.claim?.trim() || !draft.limitation?.trim()} style={{ padding: '7px 14px', borderRadius: 6, background: draft.claim?.trim() && draft.limitation?.trim() ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: draft.claim?.trim() && draft.limitation?.trim() ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Add evidence card</button>
              <button onClick={() => { setSelected(null); setDraft({}); }} style={{ padding: '7px 14px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Card list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {ec.map((card, i) => {
            const pkt = EVIDENCE_PACKETS.find(p => p.id === card.packetId);
            return (
              <div key={card.id} style={{ display: 'flex', gap: 10, padding: '11px 14px', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 9, boxShadow: shadow.sm }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: blue, flexShrink: 0, marginTop: 1 }}>PKT-{card.packetId}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.claim}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {card.weakensRelease && <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#F87171' : '#B91C1C', background: dark ? 'rgba(244,63,94,0.1)' : '#FFE4E6', padding: '1px 5px', borderRadius: 3 }}>weakens</span>}
                    {card.supportsRelease && <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#4ADE80' : '#047857', background: dark ? 'rgba(16,185,129,0.1)' : '#D1FAE5', padding: '1px 5px', borderRadius: 3 }}>supports</span>}
                    <span style={{ fontFamily: fonts.mono, fontSize: 9, color: repColors[card.replicationStatus], background: repColors[card.replicationStatus] + '18', padding: '1px 5px', borderRadius: 3 }}>{card.replicationStatus.replace(/_/g, ' ')}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 9, color: confidenceColors[card.confidence], background: confidenceColors[card.confidence] + '18', padding: '1px 5px', borderRadius: 3 }}>{card.confidence} confidence</span>
                  </div>
                </div>
                <button onClick={() => update({ evidenceCards: ec.filter(e => e.id !== card.id) })} style={{ padding: '3px', background: 'none', border: 'none', cursor: 'pointer', color: c.textTertiary, flexShrink: 0 }}>
                  <Trash2 size={11} />
                </button>
              </div>
            );
          })}
          {ec.length === 0 && <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary, textAlign: 'center', padding: '20px 0' }}>Click a packet on the left to create evidence cards.</p>}
        </div>

        {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Need 12+ cards, 4+ weakening, 3+ need replication, and 1+ benchmark concern card (Packet H).</p>}
        <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
          Save & continue <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Stage 5: Risk dashboard ───────────────────────────────────────────────────

function RiskDashboardStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';

  const levelColors: Record<string, string> = {
    acceptable: dark ? '#4ADE80' : '#047857',
    managed: dark ? '#60A5FA' : '#2563EB',
    elevated: dark ? '#FBBF24' : '#B45309',
    unacceptable: dark ? '#F87171' : '#B91C1C',
    '': c.textTertiary,
  };

  const upEntry = (i: number, k: keyof RiskEntry, v: any) => {
    const entries = cs.riskEntries.map((e, j) => j === i ? { ...e, [k]: v } : e);
    update({ riskEntries: entries });
  };

  const allRated = cs.riskEntries.every(e => e.level !== '');
  const noEmptyEvidence = cs.riskEntries.every(e => !e.level || e.evidenceCardIds.length > 0);
  const noAcceptableWithoutMit = cs.riskEntries.every(e => e.level !== 'acceptable' || e.mitigationRationale.trim());
  const canAdvance = allRated && noEmptyEvidence && noAcceptableWithoutMit;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Stage 5 — Risk dashboard</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, margin: '0 0 16px' }}>Risk levels are not opinions. Each rating must link to evidence. Acceptable risk requires mitigation rationale.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cs.riskEntries.map((entry, i) => (
            <div key={entry.domain} style={{ padding: '14px 16px', background: c.elevated, border: `1px solid ${entry.level ? levelColors[entry.level] + '40' : c.border}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: entry.level ? 10 : 0 }}>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, margin: 0, flex: 1 }}>{entry.domain}</p>
                <div style={{ display: 'flex', gap: 5 }}>
                  {(['acceptable', 'managed', 'elevated', 'unacceptable'] as RiskLevel[]).map(lv => (
                    <button key={lv} onClick={() => upEntry(i, 'level', lv)} style={{ padding: '4px 9px', borderRadius: 5, border: `1px solid ${entry.level === lv ? levelColors[lv] : c.border}`, background: entry.level === lv ? levelColors[lv] + '18' : 'transparent', fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: entry.level === lv ? levelColors[lv] : c.textTertiary, cursor: 'pointer', textTransform: 'uppercase' }}>{lv}</button>
                  ))}
                </div>
              </div>
              {entry.level && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Evidence cards (click to link)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {cs.evidenceCards.map(ec => {
                        const linked = entry.evidenceCardIds.includes(ec.id);
                        return (
                          <button key={ec.id} onClick={() => {
                            const ids = linked ? entry.evidenceCardIds.filter(id => id !== ec.id) : [...entry.evidenceCardIds, ec.id];
                            upEntry(i, 'evidenceCardIds', ids);
                          }} style={{ padding: '2px 7px', borderRadius: 4, border: `1px solid ${linked ? blue : c.border}`, background: linked ? (dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF') : c.surface, fontFamily: fonts.mono, fontSize: 9, color: linked ? blue : c.textTertiary, cursor: 'pointer' }}>
                            PKT-{ec.packetId}
                          </button>
                        );
                      })}
                    </div>
                    {entry.evidenceCardIds.length === 0 && <p style={{ fontFamily: fonts.sans, fontSize: 10, color: dark ? '#F87171' : '#B91C1C', margin: '4px 0 0' }}>⚠ Link at least one evidence card</p>}
                  </div>
                  <div>
                    <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Mitigation rationale {entry.level === 'acceptable' ? '(required)' : '(optional)'}</label>
                    <textarea value={entry.mitigationRationale} onChange={e => upEntry(i, 'mitigationRationale', e.target.value)} rows={2} placeholder="What mitigations make this risk acceptable or managed?" style={{ width: '100%', padding: '6px 9px', fontFamily: fonts.sans, fontSize: 11, background: c.surface, border: `1px solid ${entry.level === 'acceptable' && !entry.mitigationRationale.trim() ? (dark ? '#F87171' : '#B91C1C') : c.border}`, borderRadius: 6, color: c.textPrimary, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Rate all domains, link evidence to each rating, and add mitigation rationale for any "acceptable" rating.</p>}
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 6: Threshold memo ───────────────────────────────────────────────────

function ThresholdMemoStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const tm = cs.thresholdMemo;
  const up = (k: keyof typeof tm, v: string) => update({ thresholdMemo: { ...tm, [k]: v } });

  const canAdvance = tm.recommendation && tm.residualUncertainty.trim().length > 30 && tm.requiredMitigations.trim().length > 30 && tm.reversalConditions.trim().length > 20;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Stage 6 — Threshold memo</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, margin: '0 0 16px' }}>Write the decision memo a release committee could actually use.</p>

        {/* Release recommendation */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>Release recommendation *</label>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {RELEASE_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => up('recommendation', opt.value)} style={{ padding: '7px 12px', borderRadius: 7, border: `1px solid ${tm.recommendation === opt.value ? opt.color : c.border}`, background: tm.recommendation === opt.value ? opt.color + '18' : c.elevated, fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: tm.recommendation === opt.value ? opt.color : c.textSecondary, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Evidence for release" value={tm.evidenceFor} onChange={v => up('evidenceFor', v)} placeholder="Which evidence cards support release? Be specific." dark={dark} rows={3} />
          <Field label="Evidence against release" value={tm.evidenceAgainst} onChange={v => up('evidenceAgainst', v)} placeholder="Which evidence cards weaken the release case?" dark={dark} rows={3} />
          <Field label="Residual uncertainty * (min 30 chars)" value={tm.residualUncertainty} onChange={v => up('residualUncertainty', v)} placeholder="What remains unknown or unresolved? What evidence is missing?" dark={dark} rows={3} />
          <Field label="Required mitigations * (min 30 chars)" value={tm.requiredMitigations} onChange={v => up('requiredMitigations', v)} placeholder="What must be done before or during release to manage risk?" dark={dark} rows={3} />
          <Field label="Monitoring requirements" value={tm.monitoringRequirements} onChange={v => up('monitoringRequirements', v)} placeholder="What telemetry and safety signals must be in place post-release?" dark={dark} rows={3} />
          <Field label="Conditions for reversing decision * (min 20 chars)" value={tm.reversalConditions} onChange={v => up('reversalConditions', v)} placeholder="What findings or incidents would trigger reversal of this recommendation?" dark={dark} rows={3} />
        </div>

        {/* Confidence */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Confidence:</span>
          {(['low', 'medium', 'high'] as Confidence[]).map(conf => {
            const colors: Record<Confidence, string> = { low: '#F43F5E', medium: '#FBBF24', high: '#10B981' };
            return (
              <button key={conf} onClick={() => up('confidence', conf)} style={{ padding: '4px 10px', borderRadius: 5, border: `1px solid ${tm.confidence === conf ? colors[conf] : c.border}`, background: tm.confidence === conf ? colors[conf] + '18' : c.elevated, fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: tm.confidence === conf ? colors[conf] : c.textTertiary, cursor: 'pointer' }}>{conf}</button>
            );
          })}
        </div>
      </div>
      {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Select a recommendation and fill residual uncertainty, mitigations, and reversal conditions.</p>}
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 7: Executive report ─────────────────────────────────────────────────

function ExecutiveReportStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const er = cs.executiveReport;
  const up = (k: keyof typeof er, v: string) => update({ executiveReport: { ...er, [k]: v } });

  const citedCards = cs.evidenceCards.filter(ec => Object.values(er).some(v => typeof v === 'string' && v.includes(ec.claim.slice(0, 20)))).length;
  const canAdvance = Object.values(er).every(v => v.trim().length > 20);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Stage 7 — Executive report</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, margin: '0 0 16px' }}>Cite at least 6 evidence cards and 2 limitations in this report.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="What changed" value={er.whatChanged} onChange={v => up('whatChanged', v)} placeholder="What is new or different about Aster-3 compared to prior models?" dark={dark} rows={2} />
          <Field label="What we tested" value={er.whatWeTested} onChange={v => up('whatWeTested', v)} placeholder="Summarize the 6 evaluation families and evidence coverage." dark={dark} rows={3} />
          <Field label="What we found" value={er.whatWeFound} onChange={v => up('whatWeFound', v)} placeholder="Key findings — both supporting and weakening the release case." dark={dark} rows={3} />
          <Field label="What remains uncertain" value={er.whatRemainsUncertain} onChange={v => up('whatRemainsUncertain', v)} placeholder="Major limitations, gaps, and unresolved questions." dark={dark} rows={3} />
          <Field label="What it means for release" value={er.releaseImplication} onChange={v => up('releaseImplication', v)} placeholder="How do the findings and uncertainties translate to the release decision?" dark={dark} rows={2} />
          <Field label="Recommendation" value={er.recommendation} onChange={v => up('recommendation', v)} placeholder="One clear recommendation with rationale." dark={dark} rows={2} />
        </div>

        {/* Evidence sidebar reference */}
        <div style={{ marginTop: 14, padding: '12px 14px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Evidence cards for reference</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {cs.evidenceCards.map(ec => (
              <div key={ec.id} style={{ padding: '3px 8px', borderRadius: 4, background: c.surface, border: `1px solid ${c.border}` }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 9, color: blue }}>PKT-{ec.packetId}</span>
                <span style={{ fontFamily: fonts.sans, fontSize: 9, color: c.textTertiary, marginLeft: 4 }}>{ec.claim.slice(0, 35)}…</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!canAdvance && <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>⚠ Fill all 6 report sections (each needs &gt;20 characters).</p>}
      <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}>
        Save & continue <ArrowRight size={13} />
      </button>
    </div>
  );
}

// ── Stage 8: Defense simulation ───────────────────────────────────────────────

function DefenseSimulationStage({ cs, update, dark, onNext }: { cs: CapstoneState; update: (p: Partial<CapstoneState>) => void; dark: boolean; onNext: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleChoice = (reviewerId: string, choiceIdx: number) => {
    if (cs.reviewerResults.find(r => r.reviewerId === reviewerId)) return;
    const challenge = REVIEWER_CHALLENGES.find(r => r.id === reviewerId)!;
    const passed = challenge.options[choiceIdx].score === 'pass';
    update({ reviewerResults: [...cs.reviewerResults, { reviewerId, choiceIdx, passed }] });
    setRevealed(prev => ({ ...prev, [reviewerId]: true }));
  };

  const passed = cs.reviewerResults.filter(r => r.passed).length;
  const total = cs.reviewerResults.length;
  const canAdvance = passed >= 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: dark ? 'rgba(37,99,235,0.06)' : '#EFF6FF', border: `1px solid ${dark ? 'rgba(96,165,250,0.2)' : '#BFDBFE'}`, borderRadius: 14, padding: '18px 22px' }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Stage 8 — Defend your recommendation</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>Three reviewers will challenge your reasoning. Use evidence, not confidence theater. Pass 2 of 3 to advance.</p>
      </div>

      {REVIEWER_CHALLENGES.map(reviewer => {
        const result = cs.reviewerResults.find(r => r.reviewerId === reviewer.id);
        const isRevealed = !!revealed[reviewer.id] || !!result;
        const selectedIdx = result?.choiceIdx;

        return (
          <div key={reviewer.id} style={{ background: c.surface, border: `1px solid ${result ? (result.passed ? (dark ? 'rgba(16,185,129,0.4)' : '#A7F3D0') : (dark ? 'rgba(244,63,94,0.4)' : '#FECDD3')) : c.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm }}>
            {/* Reviewer header */}
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${c.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{reviewer.icon}</span>
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: c.textPrimary, margin: 0 }}>{reviewer.role}</p>
                  {result && (
                    result.passed
                      ? <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#4ADE80' : '#047857', background: dark ? 'rgba(16,185,129,0.12)' : '#D1FAE5', padding: '2px 7px', borderRadius: 999, border: `1px solid ${dark ? 'rgba(16,185,129,0.3)' : '#A7F3D0'}` }}>PASSED</span>
                      : <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#F87171' : '#B91C1C', background: dark ? 'rgba(244,63,94,0.10)' : '#FFE4E6', padding: '2px 7px', borderRadius: 999, border: `1px solid ${dark ? 'rgba(244,63,94,0.3)' : '#FECDD3'}` }}>NOT PASSED</span>
                  )}
                </div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>"{reviewer.challenge}"</p>
              </div>
            </div>

            {/* Response options */}
            <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {reviewer.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                const isPass = opt.score === 'pass';
                const showResult = isRevealed && isSelected;
                return (
                  <div key={idx}>
                    <button
                      onClick={() => !result && handleChoice(reviewer.id, idx)}
                      disabled={!!result}
                      style={{
                        width: '100%', textAlign: 'left', padding: '10px 13px', borderRadius: 8,
                        border: `1px solid ${isSelected ? (isPass ? (dark ? 'rgba(16,185,129,0.6)' : '#A7F3D0') : (dark ? 'rgba(244,63,94,0.5)' : '#FECDD3')) : c.border}`,
                        background: isSelected ? (isPass ? (dark ? 'rgba(16,185,129,0.10)' : '#F0FDF4') : (dark ? 'rgba(244,63,94,0.08)' : '#FFF1F2')) : c.elevated,
                        cursor: result ? 'default' : 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: isSelected ? (isPass ? (dark ? '#4ADE80' : '#047857') : (dark ? '#F87171' : '#B91C1C')) : c.textTertiary, flexShrink: 0, marginTop: 2 }}>{String.fromCharCode(65 + idx)}</span>
                      <span style={{ fontFamily: fonts.sans, fontSize: 12, color: isSelected ? c.textPrimary : c.textSecondary, lineHeight: 1.55 }}>{opt.text}</span>
                    </button>
                    {showResult && (
                      <div style={{ margin: '6px 0 0 0', padding: '8px 12px', borderRadius: 6, background: isPass ? (dark ? 'rgba(16,185,129,0.08)' : '#F0FDF4') : (dark ? 'rgba(244,63,94,0.08)' : '#FFF1F2'), border: `1px solid ${isPass ? (dark ? 'rgba(16,185,129,0.25)' : '#A7F3D0') : (dark ? 'rgba(244,63,94,0.25)' : '#FECDD3')}` }}>
                        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: isPass ? (dark ? '#4ADE80' : '#047857') : (dark ? '#F87171' : '#B91C1C'), margin: 0, lineHeight: 1.6 }}>
                          {isPass ? '✓ ' : '✗ '}{opt.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ padding: '8px 14px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}` }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: passed >= 2 ? (dark ? '#4ADE80' : '#047857') : c.textTertiary }}>{passed}/{total}</span>
          <span style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, marginLeft: 6 }}>challenges {passed >= 2 ? 'passed' : `— need ${2 - passed} more pass${2 - passed === 1 ? '' : 'es'}`}</span>
        </div>
        <button onClick={onNext} disabled={!canAdvance} style={{ padding: '10px 20px', borderRadius: 8, background: canAdvance ? blue : (dark ? '#1E293B' : '#E2E8F0'), color: canAdvance ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: canAdvance ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6 }}>
          Build portfolio <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Stage 9: Portfolio export ─────────────────────────────────────────────────

function PortfolioExportStage({ cs, dark }: { cs: CapstoneState; dark: boolean }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const green = dark ? '#4ADE80' : '#047857';
  const gates = checkGates(cs);
  const allPassed = Object.values(gates).every(Boolean);
  const readiness = readinessLevel(cs);
  const rec = RELEASE_OPTIONS.find(o => o.value === cs.thresholdMemo.recommendation);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', paddingBottom: 6, borderBottom: `1px solid ${c.border}` }}>{title}</p>
      {children}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Quality gate summary */}
      <GatePanel gates={gates} dark={dark} />

      {/* Portfolio document */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '28px 32px', boxShadow: shadow.sm }}>
        {/* Cover */}
        <div style={{ textAlign: 'center', marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, background: allPassed ? (dark ? 'rgba(16,185,129,0.15)' : '#D1FAE5') : (dark ? 'rgba(251,191,36,0.12)' : '#FEF3C7'), border: `1px solid ${allPassed ? (dark ? 'rgba(16,185,129,0.35)' : '#A7F3D0') : (dark ? 'rgba(251,191,36,0.35)' : '#FDE68A')}`, marginBottom: 12 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: allPassed ? green : (dark ? '#FBBF24' : '#B45309'), textTransform: 'uppercase', letterSpacing: '0.06em' }}>{readiness}</span>
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: c.textPrimary, margin: '0 0 6px' }}>Aster-3 Pre-Deployment Evaluation Dossier</h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary, margin: 0 }}>Fictional frontier model evaluation case study · Frontier Evaluation Lab</p>
        </div>

        <Section title="Problem">
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Aster-3 Frontier is a fictional multimodal frontier model proposed for restricted release to research partners, enterprise customers, and government partners. The release committee requires a pre-deployment evaluation dossier assembling capability, safety, and operational evidence into a defensible release recommendation.
          </p>
        </Section>

        <Section title="System context">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Intended users', cs.systemContext.intendedUsers || '—'],
              ['Tool access', cs.systemContext.toolAccess || '—'],
              ['Deployment surfaces', cs.systemContext.deploymentSurfaces || '—'],
              ['Decision owner', cs.systemContext.decisionOwner || '—'],
            ].map(([k, v]) => (
              <div key={k}>
                <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, margin: 0, whiteSpace: 'pre-line' }}>{v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Threat model">
          {cs.threats.length === 0 ? <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}>No threats recorded.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cs.threats.map(t => (
                <div key={t.id} style={{ padding: '10px 12px', background: c.elevated, borderRadius: 8, border: `1px solid ${c.border}` }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: t.adversarial ? (dark ? '#F87171' : '#B91C1C') : (dark ? '#60A5FA' : '#2563EB'), background: t.adversarial ? (dark ? 'rgba(244,63,94,0.12)' : '#FFE4E6') : (dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF'), padding: '1px 6px', borderRadius: 3, border: `1px solid ${t.adversarial ? (dark ? 'rgba(244,63,94,0.3)' : '#FECDD3') : (dark ? 'rgba(96,165,250,0.3)' : '#BFDBFE')}` }}>{t.adversarial ? 'Adversarial' : 'Benign failure'}</span>
                    <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary }}>{t.domain}</span>
                  </div>
                  <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>Actor: {t.actor} · Pathway: {t.pathway}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Evaluation design">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cs.evalCards.filter(e => e.claim.trim()).map((ec, i) => (
              <div key={ec.id} style={{ display: 'flex', gap: 10, padding: '9px 12px', background: c.elevated, borderRadius: 7, border: `1px solid ${c.border}` }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: blue, flexShrink: 0, marginTop: 1 }}>E{i + 1}</span>
                <div>
                  <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary, margin: '0 0 1px' }}>{ec.type}</p>
                  <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>{ec.claim} · Validity threat: {ec.validityThreat || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Evidence map">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {cs.evidenceCards.slice(0, 12).map(ec => (
              <div key={ec.id} style={{ padding: '9px 11px', background: c.elevated, borderRadius: 7, border: `1px solid ${ec.weakensRelease ? (dark ? 'rgba(244,63,94,0.25)' : '#FECDD3') : ec.supportsRelease ? (dark ? 'rgba(16,185,129,0.25)' : '#A7F3D0') : c.border}` }}>
                <div style={{ display: 'flex', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, color: blue }}>PKT-{ec.packetId}</span>
                  {ec.weakensRelease && <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#F87171' : '#B91C1C' }}>weakens</span>}
                  {ec.supportsRelease && <span style={{ fontFamily: fonts.mono, fontSize: 9, color: green }}>supports</span>}
                </div>
                <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textPrimary, margin: '0 0 2px' }}>{ec.claim}</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 10, color: c.textTertiary, margin: 0 }}>Limitation: {ec.limitation}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Risk dashboard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cs.riskEntries.filter(e => e.level).map(entry => {
              const levelColors: Record<string, string> = { acceptable: green, managed: blue, elevated: dark ? '#FBBF24' : '#B45309', unacceptable: dark ? '#F87171' : '#B91C1C' };
              return (
                <div key={entry.domain} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: c.elevated, borderRadius: 7 }}>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: levelColors[entry.level] || c.textTertiary, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 3, background: (levelColors[entry.level] || '#64748B') + '18' }}>{entry.level}</span>
                  </div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, flex: 1 }}>{entry.domain}</span>
                  {entry.mitigationRationale && <span style={{ fontFamily: fonts.sans, fontSize: 10, color: c.textTertiary, flex: 1 }}>{entry.mitigationRationale.slice(0, 60)}…</span>}
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Recommendation">
          {rec ? (
            <div style={{ padding: '16px 18px', background: rec.color + '10', border: `1px solid ${rec.color}35`, borderRadius: 10 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 700, color: rec.color }}>{rec.label}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: cs.thresholdMemo.confidence === 'high' ? green : cs.thresholdMemo.confidence === 'medium' ? (dark ? '#FBBF24' : '#B45309') : (dark ? '#F87171' : '#B91C1C'), padding: '2px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.1)' }}>{cs.thresholdMemo.confidence} confidence</span>
              </div>
              <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: '0 0 8px', lineHeight: 1.6 }}>{cs.executiveReport.recommendation || '—'}</p>
              <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: 0 }}>Reversal conditions: {cs.thresholdMemo.reversalConditions || '—'}</p>
            </div>
          ) : <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>No recommendation recorded.</p>}
        </Section>

        <Section title="Limitations">
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.7, margin: 0 }}>
            {cs.thresholdMemo.residualUncertainty || '—'}
          </p>
        </Section>

        <Section title="What I would do next">
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.7, margin: 0 }}>
            {cs.thresholdMemo.monitoringRequirements || '—'}
          </p>
        </Section>

        {/* Defense results */}
        <Section title="Reviewer defense">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {REVIEWER_CHALLENGES.map(r => {
              const result = cs.reviewerResults.find(x => x.reviewerId === r.id);
              return (
                <div key={r.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: c.elevated, borderRadius: 7 }}>
                  <span>{r.icon}</span>
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, flex: 1 }}>{r.role}</span>
                  {result ? (result.passed ? <span style={{ fontFamily: fonts.mono, fontSize: 9, color: green }}>PASSED</span> : <span style={{ fontFamily: fonts.mono, fontSize: 9, color: dark ? '#F87171' : '#B91C1C' }}>NOT PASSED</span>) : <span style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary }}>NOT ATTEMPTED</span>}
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Export CTA */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => window.print()} style={{ flex: 1, padding: '12px 20px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Download size={15} /> Export / Print portfolio
        </button>
      </div>
      {!allPassed && (
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dark ? '#FBBF24' : '#B45309', margin: 0 }}>
          ⚠ This dossier is not yet portfolio-ready. See quality gates above for remaining items.
        </p>
      )}
    </div>
  );
}

// ── Main Aster-3 Capstone ─────────────────────────────────────────────────────

interface Aster3CapstoneProps {
  dark: boolean;
}

export function Aster3Capstone({ dark }: Aster3CapstoneProps) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';

  const [cs, setCS] = useState<CapstoneState>(loadSaved);

  const update = useCallback((patch: Partial<CapstoneState>) => {
    setCS(prev => {
      const next = { ...prev, ...patch };
      saveState(next);
      return next;
    });
  }, []);

  const goTo = (stage: CapstoneStage) => {
    update({ stage });
    window.scrollTo(0, 0);
  };

  const advance = (nextStage: CapstoneStage) => {
    const completed = cs.stagesCompleted.includes(cs.stage) ? cs.stagesCompleted : [...cs.stagesCompleted, cs.stage];
    update({ stage: nextStage, stagesCompleted: completed });
    window.scrollTo(0, 0);
  };

  const gates = checkGates(cs);
  const readiness = readinessLevel(cs);

  const stageProps = { cs, update, dark, onNext: () => {} };

  const renderStage = () => {
    switch (cs.stage) {
      case 'briefing': return <BriefingStage dark={dark} onNext={() => advance('system_context')} />;
      case 'system_context': return <SystemContextStage {...stageProps} onNext={() => advance('threat_model')} />;
      case 'threat_model': return <ThreatModelStage {...stageProps} onNext={() => advance('evaluation_portfolio')} />;
      case 'evaluation_portfolio': return <EvalPortfolioStage {...stageProps} onNext={() => advance('evidence_room')} />;
      case 'evidence_room': return <EvidenceRoomStage {...stageProps} onNext={() => advance('risk_dashboard')} />;
      case 'risk_dashboard': return <RiskDashboardStage {...stageProps} onNext={() => advance('threshold_memo')} />;
      case 'threshold_memo': return <ThresholdMemoStage {...stageProps} onNext={() => advance('executive_report')} />;
      case 'executive_report': return <ExecutiveReportStage {...stageProps} onNext={() => advance('defense_simulation')} />;
      case 'defense_simulation': return <DefenseSimulationStage {...stageProps} onNext={() => advance('portfolio_export')} />;
      case 'portfolio_export': return <PortfolioExportStage cs={cs} dark={dark} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, background: c.surface, boxShadow: `inset 0 -1px 0 ${c.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF', border: `1px solid ${dark ? 'rgba(96,165,250,0.3)' : '#BFDBFE'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={13} color={blue} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: c.textPrimary, margin: 0 }}>Aster-3 Pre-Deployment Evaluation Dossier</p>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: readiness === 'Portfolio-ready' ? (dark ? '#4ADE80' : '#047857') : (dark ? '#FBBF24' : '#B45309'), background: readiness === 'Portfolio-ready' ? (dark ? 'rgba(16,185,129,0.12)' : '#D1FAE5') : (dark ? 'rgba(251,191,36,0.10)' : '#FEF3C7'), padding: '3px 10px', borderRadius: 999, border: `1px solid ${readiness === 'Portfolio-ready' ? (dark ? 'rgba(16,185,129,0.3)' : '#A7F3D0') : (dark ? 'rgba(251,191,36,0.3)' : '#FDE68A')}`, flexShrink: 0 }}>
              {readiness}
            </span>
            <button
              onClick={() => { if (window.confirm('Reset entire capstone? This cannot be undone.')) { localStorage.removeItem('fel_capstone_v4'); setCS(INITIAL_STATE); } }}
              style={{ padding: '4px 10px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
          <StageStepper current={cs.stage} completed={cs.stagesCompleted} onNavigate={goTo} dark={dark} />
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>
        {renderStage()}
      </div>
    </div>
  );
}
