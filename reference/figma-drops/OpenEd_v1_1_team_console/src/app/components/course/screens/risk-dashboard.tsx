import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { Plus, Trash2, AlertTriangle, Shield, ChevronRight } from 'lucide-react';

type Finding = { domain: string; likelihood: number; severity: number; title: string; badge: string };
type NewFinding = { domain: string; likelihood: number; severity: number; title: string };

const DOMAIN_COLORS: Record<string, string> = {
  CBRN: '#B91C1C',
  Cyber: '#1D4ED8',
  Autonomy: '#7C3AED',
  Custom: '#0F766E',
};

function riskLevel(l: number, s: number): { label: string; color: string; bg: string } {
  const score = l * s;
  if (score >= 16) return { label: 'CRITICAL', color: '#B91C1C', bg: '#FEE2E2' };
  if (score >= 9)  return { label: 'HIGH',     color: '#B45309', bg: '#FEF3C7' };
  if (score >= 4)  return { label: 'MEDIUM',   color: '#1D4ED8', bg: '#DBEAFE' };
  return { label: 'LOW', color: '#15803D', bg: '#DCFCE7' };
}

function cellColor(col: number, row: number): string {
  const score = (col + 1) * (row + 1);
  if (score >= 16) return 'rgba(185,28,28,0.12)';
  if (score >= 9)  return 'rgba(180,83,9,0.12)';
  if (score >= 4)  return 'rgba(29,78,216,0.08)';
  return 'rgba(21,128,61,0.08)';
}

const LIKELIHOOD_LABELS = ['Unlikely', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
const SEVERITY_LABELS   = ['Minimal', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

const SEED_FINDINGS: Finding[] = [
  { domain: 'CBRN',     likelihood: 3, severity: 4, title: 'Organophosphate synthesis uplift',    badge: 'EVD-001' },
  { domain: 'CBRN',     likelihood: 2, severity: 4, title: 'CAL-3 boundary proximity (3/5 runs)', badge: 'EVD-003' },
  { domain: 'Cyber',    likelihood: 3, severity: 3, title: 'Prompt injection in tool pipeline',   badge: 'EVD-004' },
  { domain: 'Autonomy', likelihood: 2, severity: 3, title: 'Long-horizon task completion (40%)',  badge: 'EVD-005' },
];

const BLANK: NewFinding = { domain: 'Custom', likelihood: 3, severity: 3, title: '' };

export function RiskDashboardScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [findings, setFindings] = useState<Finding[]>(SEED_FINDINGS);
  const [adding, setAdding] = useState(false);
  const [newFinding, setNewFinding] = useState<NewFinding>(BLANK);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  const addFinding = () => {
    if (!newFinding.title.trim()) return;
    setFindings(f => [...f, { ...newFinding, badge: `EVD-${String(f.length + 10).padStart(3, '0')}` }]);
    setAdding(false);
    setNewFinding(BLANK);
  };

  const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  findings.forEach(f => { counts[riskLevel(f.likelihood, f.severity).label as keyof typeof counts]++; });

  const highest = findings.length
    ? findings.reduce((best, f) => (f.likelihood * f.severity > best.likelihood * best.severity ? f : best))
    : { likelihood: 1, severity: 1, domain: '' } as Finding;
  const overallRisk = findings.length ? riskLevel(highest.likelihood, highest.severity) : { label: 'LOW', color: '#15803D', bg: '#DCFCE7' };

  const deployRec: Record<string, string> = {
    CRITICAL: 'Do not deploy. Critical risks require full mitigation before any deployment.',
    HIGH:     'Conditional deployment only. Implement required mitigations and monitor continuously.',
    MEDIUM:   'Deployment with controls. Address medium-risk findings and document residual risk.',
    LOW:      'Deployment approved. Maintain standard monitoring and review cadence.',
  };

  const mitigations: string[] = [];
  if (counts.CRITICAL > 0 || counts.HIGH > 0) {
    const highDomains = [...new Set(findings.filter(f => f.likelihood * f.severity >= 9).map(f => f.domain))];
    highDomains.forEach(d => {
      if (d === 'CBRN')     mitigations.push('Enhanced CBRN content filters + expert review gating at CAL-3 boundary');
      if (d === 'Cyber')    mitigations.push('Tool-use sandboxing + prompt injection hardening in agentic pipeline');
      if (d === 'Autonomy') mitigations.push('Long-horizon task monitoring + mandatory human-in-the-loop checkpoints');
      if (d === 'Custom')   mitigations.push('Domain-specific controls per evaluation findings');
    });
  }

  const inputSt: React.CSSProperties = { width: '100%', padding: '6px 10px', borderRadius: 6, border: `1px solid ${c.border}`, background: c.surface, color: c.textPrimary, fontFamily: fonts.sans, fontSize: 13, boxSizing: 'border-box' };
  const btn = (primary?: boolean): React.CSSProperties => ({ padding: '7px 14px', borderRadius: 6, border: primary ? 'none' : `1px solid ${c.border}`, background: primary ? c.primary : 'transparent', color: primary ? '#fff' : c.textSecondary, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 5 });

  const riskLabelColors = [
    { label: 'CRITICAL', color: '#B91C1C', bg: '#FEE2E2' },
    { label: 'HIGH',     color: '#B45309', bg: '#FEF3C7' },
    { label: 'MEDIUM',   color: '#1D4ED8', bg: '#DBEAFE' },
    { label: 'LOW',      color: '#15803D', bg: '#DCFCE7' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans, color: c.textPrimary }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: c.textTertiary, textTransform: 'uppercase', marginBottom: 6 }}>Module I · Lesson 2</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, fontFamily: fonts.serif }}>Risk Dashboard Builder</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: c.textSecondary }}>Plot your evaluation findings on a likelihood × severity matrix and generate a deployment recommendation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          {/* LEFT */}
          <div>
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Risk Matrix</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {/* Y axis label */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16 }}>
                  <span style={{ fontSize: 10, color: c.textTertiary, writingMode: 'vertical-lr', transform: 'rotate(180deg)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Severity →</span>
                </div>
                <div style={{ flex: 1 }}>
                  {[4,3,2,1,0].map(row => (
                    <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                      <div style={{ width: 68, fontSize: 10, color: c.textTertiary, textAlign: 'right', paddingRight: 6, flexShrink: 0 }}>{SEVERITY_LABELS[row]}</div>
                      {[0,1,2,3,4].map(col => {
                        const dotsHere = findings.filter(f => f.likelihood - 1 === col && f.severity - 1 === row);
                        return (
                          <div key={col} style={{ position: 'relative', width: 50, height: 42, borderRadius: 4, background: cellColor(col, row), border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 2, padding: 2 }}>
                            {dotsHere.map((f, i) => (
                              <div key={i}
                                onMouseEnter={() => setTooltip(f.title)}
                                onMouseLeave={() => setTooltip(null)}
                                style={{ width: 12, height: 12, borderRadius: '50%', background: DOMAIN_COLORS[f.domain] ?? '#64748B', cursor: 'pointer', border: '1.5px solid white', position: 'relative', flexShrink: 0 }}>
                                {tooltip === f.title && (
                                  <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#F8FAFC', fontSize: 11, padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 20, pointerEvents: 'none' }}>{f.title}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {/* X-axis */}
                  <div style={{ display: 'flex', marginLeft: 74, gap: 2, marginTop: 4 }}>
                    {LIKELIHOOD_LABELS.map((l, i) => (
                      <div key={i} style={{ width: 50, fontSize: 9, color: c.textTertiary, textAlign: 'center' }}>{l}</div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginLeft: 74, fontSize: 10, color: c.textTertiary, marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Likelihood →</div>
                </div>
              </div>

              {/* Domain legend */}
              <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
                {Object.entries(DOMAIN_COLORS).map(([d, col]) => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: c.textSecondary }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: col }} /> {d}
                  </div>
                ))}
              </div>

              {/* Quick add buttons */}
              <div style={{ marginTop: 20, borderTop: `1px solid ${c.borderSubtle}`, paddingTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 10 }}>Quick Add Domain Finding</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(['CBRN','Cyber','Autonomy','Custom'] as const).map(d => (
                    <button key={d} onClick={() => { setNewFinding({ domain: d, likelihood: 3, severity: 3, title: '' }); setAdding(true); }}
                      style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 12, cursor: 'pointer', fontFamily: fonts.sans }}>
                      + {d}
                    </button>
                  ))}
                </div>
              </div>

              {adding && (
                <div style={{ marginTop: 16, padding: 14, borderRadius: 8, background: c.elevated, border: `1px solid ${c.primaryBorder}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>New Finding</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, color: c.textTertiary, display: 'block', marginBottom: 4 }}>Domain</label>
                      <select value={newFinding.domain} onChange={e => setNewFinding(f => ({ ...f, domain: e.target.value }))} style={inputSt}>
                        {['CBRN','Cyber','Autonomy','Custom'].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: c.textTertiary, display: 'block', marginBottom: 4 }}>Title</label>
                      <input value={newFinding.title} onChange={e => setNewFinding(f => ({ ...f, title: e.target.value }))} placeholder="Finding title…" style={inputSt} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: c.textTertiary, display: 'block', marginBottom: 4 }}>Likelihood: {newFinding.likelihood} — {LIKELIHOOD_LABELS[newFinding.likelihood - 1]}</label>
                      <input type="range" min={1} max={5} value={newFinding.likelihood} onChange={e => setNewFinding(f => ({ ...f, likelihood: +e.target.value }))} style={{ width: '100%' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: c.textTertiary, display: 'block', marginBottom: 4 }}>Severity: {newFinding.severity} — {SEVERITY_LABELS[newFinding.severity - 1]}</label>
                      <input type="range" min={1} max={5} value={newFinding.severity} onChange={e => setNewFinding(f => ({ ...f, severity: +e.target.value }))} style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={addFinding} style={btn(true)}><Plus size={13} />Add Finding</button>
                    <button onClick={() => setAdding(false)} style={btn()}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Findings list */}
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Findings ({findings.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {findings.map((f, i) => {
                  const rl = riskLevel(f.likelihood, f.severity);
                  return (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: 8, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: DOMAIN_COLORS[f.domain] ?? '#64748B', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: c.textPrimary, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</div>
                        <div style={{ fontSize: 11, color: c.textTertiary }}>{f.domain} · L{f.likelihood} × S{f.severity} = {f.likelihood * f.severity}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10, background: rl.bg, color: rl.color, letterSpacing: '0.04em', flexShrink: 0 }}>{rl.label}</span>
                      <button onClick={() => setFindings(fs => fs.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textTertiary, padding: 2, display: 'flex', alignItems: 'center' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
              {!adding && (
                <button onClick={() => { setAdding(true); setNewFinding(BLANK); }} style={{ ...btn(true), marginTop: 14 }}>
                  <Plus size={14} /> Add Finding
                </button>
              )}
            </div>

            {/* Report */}
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Risk Summary Report</div>
              {!reportGenerated ? (
                <button onClick={() => setReportGenerated(true)} style={{ ...btn(true), width: '100%', justifyContent: 'center' }}>
                  <AlertTriangle size={14} /> Generate Risk Summary
                </button>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, background: overallRisk.bg, marginBottom: 14 }}>
                    <Shield size={22} color={overallRisk.color} />
                    <div>
                      <div style={{ fontSize: 10, color: overallRisk.color, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Overall Risk Rating</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: overallRisk.color }}>{overallRisk.label}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 14 }}>
                    {riskLabelColors.map(rl => (
                      <div key={rl.label} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 6, background: rl.bg }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: rl.color }}>{counts[rl.label as keyof typeof counts]}</div>
                        <div style={{ fontSize: 10, color: rl.color, fontWeight: 600 }}>{rl.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: c.textSecondary, marginBottom: 14, padding: '10px 12px', borderRadius: 8, background: c.elevated, borderLeft: `3px solid ${overallRisk.color}` }}>
                    <strong style={{ color: c.textPrimary }}>Deployment Recommendation:</strong> {deployRec[overallRisk.label]}
                  </div>
                  {mitigations.length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required Mitigations</div>
                      {mitigations.map((m, i) => (
                        <div key={i} style={{ fontSize: 12, color: c.textSecondary, display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                          <span style={{ color: c.warning, flexShrink: 0, marginTop: 1 }}>›</span> {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                const next = state.artifactsCreated.includes('Risk Dashboard') ? state.artifactsCreated : [...state.artifactsCreated, 'Risk Dashboard'];
                update({ artifactsCreated: next });
                navigate('capstone');
              }}
              style={{ ...btn(true), justifyContent: 'center', padding: '12px 20px', fontSize: 14, borderRadius: 8 }}>
              Save to Capstone <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
