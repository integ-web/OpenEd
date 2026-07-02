import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { AlertTriangle, Clock, CheckCircle, ChevronRight, FileText, Shield } from 'lucide-react';

const SCENARIO_EVIDENCE = [
  {
    id: 'SIM-EVD-001',
    title: 'CAL-3 boundary crossed — 3 of 5 elicitation runs',
    type: 'Threshold' as const,
    confidence: 'Medium' as const,
    summary: '3 of 5 expert-scaffolded elicitation runs produced outputs scoring at or above the CAL-3 boundary for CBRN-adjacent synthesis guidance. Independent replication has not yet been completed.',
    source: 'Pre-deployment eval run · Day 2',
  },
  {
    id: 'SIM-EVD-002',
    title: 'Baseline refusal rate: 100% on naive prompts',
    type: 'Negative' as const,
    confidence: 'High' as const,
    summary: 'All 12 naive single-turn CBRN-adjacent prompts were refused without scaffolding. Standard safety training appears robust at the surface level.',
    source: 'Pre-deployment eval run · Day 1',
  },
  {
    id: 'SIM-EVD-003',
    title: 'Mitigating: model self-restricts at synthesis Step 4',
    type: 'Mitigating' as const,
    confidence: 'Medium' as const,
    summary: 'Across the 3 CAL-3 runs, the model stopped short of providing actionable synthesis quantities and concentrations. Outputs flagged as CAL-3 reflected route identification only, not operational detail.',
    source: 'Expert adjudication panel · Day 3',
  },
  {
    id: 'SIM-EVD-004',
    title: 'High elicitation sensitivity — protocol-dependent outcome',
    type: 'Positive' as const,
    confidence: 'High' as const,
    summary: 'Under scaffolded multi-turn elicitation with domain-expert framing, the model exhibits meaningfully higher CBRN-adjacent output quality. The gap between naive and scaffolded output constitutes the primary risk signal.',
    source: 'Comparative elicitation study · Day 2–3',
  },
];

const DECISION_OPTIONS = [
  {
    id: 'HALT',
    label: 'HALT deployment',
    risk: 'HIGH CAUTION',
    riskColor: 'danger',
    description: 'Recommend the model not be deployed until CAL-3 findings are independently replicated, root-cause identified, and mitigations validated.',
  },
  {
    id: 'CONTINUE_OVERSIGHT',
    label: 'Continue with enhanced oversight',
    risk: 'MODERATE RISK',
    riskColor: 'warning',
    description: 'Proceed with deployment under strict monitoring, access controls, and a committed re-evaluation timeline of 30 days.',
  },
  {
    id: 'RE_EVALUATE',
    label: 'Pause for re-evaluation',
    risk: 'CONSERVATIVE',
    riskColor: 'teal',
    description: 'Delay the deployment committee decision by 2 weeks to complete independent replication of the 3/5 CAL-3 runs with a second expert team.',
  },
  {
    id: 'ESCALATE',
    label: 'Escalate to governance committee',
    risk: 'PROCEDURAL',
    riskColor: 'violet',
    description: 'Refer the decision to the senior governance body with full evidence package. Do not make a recommendation — let the committee decide.',
  },
];

const SENIOR_RECOMMENDATION_ID = 'RE_EVALUATE';
const SENIOR_REASONING = 'A senior evaluator would most likely recommend a structured pause for independent replication. 3/5 CAL-3 runs is a significant signal, but the mitigating evidence (self-restriction at Step 4, 100% baseline refusal) creates genuine uncertainty. A 2-week re-evaluation with an independent expert team is proportionate, preserves deployment optionality, and follows AISI pre-deployment guidance that ambiguous threshold findings should not be resolved by a single team.';

export function SimulationScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [selectedEvidence, setSelectedEvidence] = useState<Set<string>>(new Set());
  const [rmfFunction, setRmfFunction] = useState('');
  const [aisiAnswer, setAisiAnswer] = useState('');
  const [calLevel, setCalLevel] = useState(3);
  const [decision, setDecision] = useState('');
  const [justification, setJustification] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const typeColor = (type: string) => {
    if (type === 'Positive')   return { bg: c.successSoft,  border: c.successBorder,  text: c.success  };
    if (type === 'Negative')   return { bg: c.dangerSoft,   border: c.dangerBorder,   text: c.danger   };
    if (type === 'Threshold')  return { bg: c.warningSoft,  border: c.warningBorder,  text: c.warning  };
    return                            { bg: c.tealSoft,     border: c.tealBorder,     text: c.teal     };
  };

  const riskPalette: Record<string, { bg: string; text: string; border: string }> = {
    danger: { bg: c.dangerSoft,  text: c.danger,  border: c.dangerBorder  },
    warning:{ bg: c.warningSoft, text: c.warning, border: c.warningBorder },
    teal:   { bg: c.tealSoft,    text: c.teal,    border: c.tealBorder    },
    violet: { bg: c.violetSoft,  text: c.violet,  border: c.violetBorder  },
  };

  const phaseBtn = (p: number) => ({
    flex: 1,
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: phase === p ? 600 : 400,
    background: phase === p ? c.primary : 'transparent',
    color: phase === p ? '#fff' : c.textSecondary,
    transition: 'all 0.15s',
  } as React.CSSProperties);

  const canSubmit = decision && justification.trim().length > 20;

  const handleLogEvidence = () => {
    const cards = SCENARIO_EVIDENCE
      .filter(e => selectedEvidence.has(e.id))
      .map(e => ({
        id: `EVD-SIM-${e.id}-${Date.now()}`,
        title: `[Simulation] ${e.title}`,
        domain: 'CBRN',
        type: e.type,
        confidence: e.confidence,
        summary: e.summary,
        source: `Module B Simulation · ${e.source}`,
        date: new Date().toISOString().split('T')[0],
      }));
    update({ evidenceCards: [...state.evidenceCards, ...cards] });
    navigate('evidence');
  };

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Scenario briefing */}
        <div style={{ background: c.dangerSoft, border: `2px solid ${c.dangerBorder}`, borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: shadow.md }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <AlertTriangle size={22} color={c.danger} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ background: c.danger, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 4, letterSpacing: '0.06em' }}>CRITICAL</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}>MODULE B — SIMULATION EXERCISE</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: c.danger, fontWeight: 600, fontSize: 13 }}>
                  <Clock size={14} /> 6 hours remaining
                </span>
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: c.textPrimary }}>
                Governance Threshold Decision — Module B Simulation
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: c.textSecondary, lineHeight: 1.65 }}>
                You are the lead evaluator on a pre-deployment review of a frontier model. It is Day 3 of evaluation. Three of five elicitation runs have crossed your organisation's CAL-3 boundary for CBRN-adjacent capability. The deployment committee meets in 6 hours. You must decide what to recommend.
              </p>
            </div>
          </div>
        </div>

        {/* Phase tracker */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: c.surface, borderRadius: 10, padding: 5, border: `1px solid ${c.border}` }}>
          {([1, 2, 3] as const).map(p => (
            <button key={p} style={phaseBtn(p)} onClick={() => { if (p <= phase) setPhase(p); }}>
              {p === 1 && '1: Review Evidence'}
              {p === 2 && '2: Apply Framework'}
              {p === 3 && '3: Make Decision'}
            </button>
          ))}
        </div>

        {/* ── Phase 1 ── */}
        {phase === 1 && (
          <div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Review the evaluation evidence package</p>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: c.textSecondary }}>Select the evidence items you will include in your recommendation. You must include at least one.</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {SCENARIO_EVIDENCE.map(ev => {
                const tc = typeColor(ev.type);
                const sel = selectedEvidence.has(ev.id);
                return (
                  <div key={ev.id} style={{ background: c.surface, border: `1.5px solid ${sel ? c.primary : c.border}`, borderRadius: 10, padding: 18, boxShadow: sel ? shadow.md : shadow.sm, transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.teal }}>{ev.id}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}>{ev.type}</span>
                          <span style={{ fontSize: 11, color: c.textTertiary }}>Confidence: {ev.confidence}</span>
                        </div>
                        <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>{ev.title}</p>
                        <p style={{ margin: '0 0 8px', fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{ev.summary}</p>
                        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{ev.source}</span>
                      </div>
                      <button
                        onClick={() => {
                          const next = new Set(selectedEvidence);
                          if (next.has(ev.id)) next.delete(ev.id); else next.add(ev.id);
                          setSelectedEvidence(next);
                        }}
                        style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${sel ? c.primary : c.border}`, background: sel ? c.primarySoft : 'transparent', color: sel ? c.primary : c.textTertiary, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
                      >
                        {sel ? '✓ Included' : 'Include'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button
                disabled={selectedEvidence.size === 0}
                onClick={() => setPhase(2)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: selectedEvidence.size > 0 ? c.primary : c.elevated, color: selectedEvidence.size > 0 ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: selectedEvidence.size > 0 ? 'pointer' : 'not-allowed' }}
              >
                I've reviewed the evidence <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Phase 2 ── */}
        {phase === 2 && (
          <div>
            <p style={{ margin: '0 0 20px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Apply the governance framework</p>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 18 }}>
              <p style={{ margin: '0 0 14px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Under the NIST AI RMF, which function should guide your immediate action?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['Govern', 'Map', 'Measure', 'Manage'].map(fn => (
                  <label key={fn} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, border: `1.5px solid ${rmfFunction === fn ? c.primary : c.border}`, background: rmfFunction === fn ? c.primarySoft : c.elevated, cursor: 'pointer' }}>
                    <input type="radio" name="rmf" value={fn} checked={rmfFunction === fn} onChange={() => setRmfFunction(fn)} style={{ accentColor: c.primary }} />
                    <span style={{ fontSize: 14, fontWeight: rmfFunction === fn ? 600 : 400, color: c.textPrimary }}>{fn}</span>
                  </label>
                ))}
              </div>
              {rmfFunction === 'Manage' && (
                <p style={{ margin: '12px 0 0', fontSize: 13, color: c.success, background: c.successSoft, border: `1px solid ${c.successBorder}`, borderRadius: 6, padding: '8px 12px' }}>
                  Correct. The NIST AI RMF "Manage" function covers responding to identified risks — including deciding whether to deploy, delay, or impose conditions.
                </p>
              )}
              {rmfFunction && rmfFunction !== 'Manage' && (
                <p style={{ margin: '12px 0 0', fontSize: 13, color: c.warning, background: c.warningSoft, border: `1px solid ${c.warningBorder}`, borderRadius: 6, padding: '8px 12px' }}>
                  Consider "Manage" — this is an active risk response situation, not a mapping, measurement, or governance-setting exercise.
                </p>
              )}
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 18 }}>
              <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>What does AISI's guidance say about pre-deployment evaluations at CAL-3?</p>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: c.textSecondary }}>Write your understanding of the threshold logic and recommended action at CAL-3 proximity.</p>
              <textarea
                value={aisiAnswer}
                onChange={e => setAisiAnswer(e.target.value)}
                placeholder="At CAL-3, AISI's framework indicates that..."
                style={{ width: '100%', minHeight: 100, borderRadius: 8, border: `1px solid ${c.border}`, background: c.elevated, color: c.textPrimary, fontFamily: fonts.sans, fontSize: 13, padding: 12, resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 24 }}>
              <p style={{ margin: '0 0 14px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Which Capability Assessment Level (CAL) threshold is most relevant to your recommendation?</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5].map(level => (
                  <button key={level} onClick={() => setCalLevel(level)} style={{ padding: '10px 20px', borderRadius: 8, border: `1.5px solid ${calLevel === level ? c.warning : c.border}`, background: calLevel === level ? c.warningSoft : c.elevated, color: calLevel === level ? c.warning : c.textSecondary, fontWeight: calLevel === level ? 700 : 400, fontSize: 14, cursor: 'pointer' }}>
                    CAL-{level}
                  </button>
                ))}
              </div>
              <p style={{ margin: '12px 0 0', fontSize: 12, color: c.textTertiary, fontFamily: fonts.mono }}>
                CAL-{calLevel}: {[
                  'Negligible capability — standard monitoring sufficient',
                  'Low concern — enhanced logging recommended',
                  'Boundary zone — governance review required before deployment',
                  'High-concern — deployment likely inadvisable without mitigations',
                  'Critical capability — deployment halt recommended',
                ][calLevel - 1]}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setPhase(3)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Apply framework <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Phase 3 ── */}
        {phase === 3 && !submitted && (
          <div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Make your recommendation</p>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: c.textSecondary }}>Select the course of action you would recommend to the deployment committee.</p>
            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              {DECISION_OPTIONS.map(opt => {
                const rc = riskPalette[opt.riskColor];
                const sel = decision === opt.id;
                return (
                  <div key={opt.id} onClick={() => setDecision(opt.id)} style={{ background: c.surface, border: `1.5px solid ${sel ? c.primary : c.border}`, borderRadius: 10, padding: 18, cursor: 'pointer', boxShadow: sel ? shadow.md : shadow.sm, transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${sel ? c.primary : c.border}`, background: sel ? c.primary : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {sel && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 14, color: c.textPrimary }}>{opt.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: rc.bg, border: `1px solid ${rc.border}`, color: rc.text, marginLeft: 'auto' }}>{opt.risk}</span>
                    </div>
                    <p style={{ margin: '0 0 0 30px', fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{opt.description}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Write your justification</p>
              <textarea
                value={justification}
                onChange={e => setJustification(e.target.value)}
                placeholder="My recommendation is based on the following reasoning..."
                style={{ width: '100%', minHeight: 120, borderRadius: 8, border: `1px solid ${c.border}`, background: c.elevated, color: c.textPrimary, fontFamily: fonts.sans, fontSize: 13, padding: 12, resize: 'vertical', boxSizing: 'border-box' }}
              />
              {justification.trim().length > 0 && justification.trim().length <= 20 && (
                <p style={{ margin: '6px 0 0', fontSize: 12, color: c.warning }}>Please write a more detailed justification (at least 20 characters).</p>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={!canSubmit}
                onClick={() => { if (canSubmit) setSubmitted(true); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: canSubmit ? c.primary : c.elevated, color: canSubmit ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
              >
                Submit recommendation <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Outcome ── */}
        {phase === 3 && submitted && (
          <div>
            <div style={{ background: c.successSoft, border: `1.5px solid ${c.successBorder}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <CheckCircle size={18} color={c.success} />
                <span style={{ fontWeight: 700, fontSize: 15, color: c.textPrimary }}>Simulation complete</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: c.textSecondary }}>
                Your recommendation: <strong style={{ color: c.textPrimary }}>{DECISION_OPTIONS.find(d => d.id === decision)?.label}</strong>
              </p>
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 22, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Shield size={16} color={c.teal} />
                <span style={{ fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Senior evaluator perspective</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 14, color: c.textSecondary, lineHeight: 1.7 }}>{SENIOR_REASONING}</p>
              {decision === SENIOR_RECOMMENDATION_ID
                ? <p style={{ margin: 0, color: c.success, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14} /> Your recommendation aligns with senior evaluator guidance.</p>
                : <p style={{ margin: 0, color: c.warning, fontSize: 13 }}>Your recommendation differs. Both approaches have merit — but the re-evaluation option is most consistent with AISI's guidance on ambiguous CAL-3 findings.</p>
              }
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={handleLogEvidence}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1.5px solid ${c.tealBorder}`, background: c.tealSoft, color: c.teal, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                <FileText size={15} /> Log simulation as evidence cards
              </button>
              <button
                onClick={() => navigate('quiz')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Continue to Quiz <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
