import { Shield, FileText, AlertTriangle, CheckCircle, TrendingUp, Activity, Users, Lock } from 'lucide-react';
import { type PageProps, C, fonts, shadow } from './types';

type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

function RiskBadge({ level, c }: { level: RiskLevel; c: ReturnType<typeof C> }) {
  const map: Record<RiskLevel, { bg: string; color: string; border: string }> = {
    CRITICAL: { bg: c.dangerSoft,  color: c.danger,  border: c.dangerBorder },
    HIGH:     { bg: c.warningSoft, color: c.warning, border: c.warningBorder },
    MEDIUM:   { bg: c.primarySoft, color: c.primary, border: c.primaryBorder },
    LOW:      { bg: c.successSoft, color: c.success, border: c.successBorder },
  };
  const m = map[level];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: m.bg, border: `1px solid ${m.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
      <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: m.color }}>{level}</span>
    </span>
  );
}

export function CapstoneTemplatesPage({ dark }: PageProps) {
  const c = C(dark);

  const kpis = [
    { icon: <FileText size={18} />,     value: '31',    label: 'Evidence Items',    sub: '4 pending review',   color: c.primary },
    { icon: <AlertTriangle size={18} />,value: '6',     label: 'Active Findings',   sub: '2 critical',         color: c.danger },
    { icon: <Activity size={18} />,     value: 'CAL-3', label: 'Threshold Status',  sub: 'Proximity: 72%',     color: c.warning },
    { icon: <CheckCircle size={18} />,  value: '91%',   label: 'Eval. Coverage',    sub: '8 / 9 domains',      color: c.success },
    { icon: <TrendingUp size={18} />,   value: '0.81',  label: 'Avg. Confidence',   sub: 'Evidence-weighted',  color: c.teal },
    { icon: <Users size={18} />,        value: '5',     label: 'Reviewers',         sub: '2 domain experts',   color: c.violet },
  ];

  const domains = [
    { name: 'CBRN Uplift',          score: 72, risk: 'HIGH' as RiskLevel,   complete: true },
    { name: 'Cyberoffense',         score: 44, risk: 'MEDIUM' as RiskLevel, complete: true },
    { name: 'Autonomy & Control',   score: 38, risk: 'MEDIUM' as RiskLevel, complete: true },
    { name: 'Deception',            score: 61, risk: 'HIGH' as RiskLevel,   complete: true },
    { name: 'Persuasion/Influence', score: 22, risk: 'LOW' as RiskLevel,    complete: true },
    { name: 'Weapons Acquisition',  score: 15, risk: 'LOW' as RiskLevel,    complete: true },
    { name: 'Jailbreak Robustness', score: 53, risk: 'MEDIUM' as RiskLevel, complete: true },
    { name: 'Multi-step Planning',  score: 0,  risk: 'LOW' as RiskLevel,    complete: false },
  ];

  const domainBarColor: Record<RiskLevel, string> = {
    CRITICAL: c.danger, HIGH: c.danger, MEDIUM: c.warning, LOW: c.success,
  };

  const findings = [
    { id: 'RT-047', domain: 'CBRN',     sev: 'HIGH' as RiskLevel,   title: 'Organic synthesis uplift under academic framing',    status: 'Open',      statusColor: c.warning },
    { id: 'RT-038', domain: 'Cyber',    sev: 'MEDIUM' as RiskLevel, title: 'CTF task completion 34% under scaffolded conditions', status: 'Escalated', statusColor: c.danger },
    { id: 'RT-051', domain: 'Autonomy', sev: 'MEDIUM' as RiskLevel, title: 'Recursive self-improvement awareness detected',       status: 'Open',      statusColor: c.warning },
    { id: 'RT-029', domain: 'Deception',sev: 'HIGH' as RiskLevel,   title: 'Sandbagging in evaluation-aware context',             status: 'Mitigated', statusColor: c.teal },
    { id: 'RT-012', domain: 'CBRN',     sev: 'LOW' as RiskLevel,    title: 'Bioweapons refusal consistent across all baselines',  status: 'Closed',    statusColor: c.success },
  ];

  const mitigations = [
    { id: 'M-1', text: 'Deploy CBRN-domain classifier filter trained on red-team prompt corpus', required: true },
    { id: 'M-2', text: 'Implement mandatory human review layer for chemistry-adjacent queries above 500 tokens', required: true },
    { id: 'M-3', text: 'Restrict API access for unverified accounts on synthesis-related use cases', required: true },
    { id: 'M-4', text: 'Conduct follow-up evaluation 60 days post-deployment with updated red-team corpus', required: false },
    { id: 'M-5', text: 'Publish system card with elicitation sensitivity disclosure by deployment date', required: false },
  ];

  const artifacts = [
    { icon: <FileText size={20} />,    title: 'Evaluation Plan',      status: 'Submitted',   color: c.success },
    { icon: <Shield size={20} />,      title: 'Benchmark Packet',     status: 'In Review',   color: c.warning },
    { icon: <Activity size={20} />,    title: 'Evidence Log',         status: 'In Progress', color: c.primary },
    { icon: <AlertTriangle size={20} />,title: 'Red Team Report',     status: 'Draft',       color: c.violet },
    { icon: <TrendingUp size={20} />,  title: 'Prototype Dashboard',  status: 'Complete',    color: c.success },
    { icon: <Users size={20} />,       title: 'Executive Report',     status: 'Not Started', color: c.textTertiary },
  ];

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>

      {/* Page header */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '32px 64px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 8 }}>08 · CAPSTONE TEMPLATES</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Capstone Templates</h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textSecondary, margin: 0 }}>Evaluation dossier, dashboard, findings table, and executive report layouts</p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 64px' }}>

        {/* Dossier cover */}
        <div style={{ background: 'linear-gradient(135deg,#020617,#0F172A,#0C1A3E)', borderRadius: 20, padding: 48, marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(96,165,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.04) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#2DD4BF', letterSpacing: '0.15em', marginBottom: 10 }}>EVALUATION DOSSIER — CONFIDENTIAL</div>
            <h2 style={{ fontFamily: fonts.serif, fontSize: 34, fontWeight: 700, color: '#F8FAFC', margin: '0 0 4px', lineHeight: 1.2 }}>Pre-Deployment Safety Evaluation</h2>
            <h3 style={{ fontFamily: fonts.serif, fontSize: 22, fontWeight: 400, color: '#94A3B8', margin: '0 0 28px', fontStyle: 'italic' }}>GPT-5-Preview · AISI Partnership Assessment</h3>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              {[
                { label: 'Evaluation period', value: 'Nov 1 – Dec 15, 2024' },
                { label: 'Lead evaluator',    value: 'Team Alpha + AISI' },
                { label: 'Frameworks',        value: 'NIST AI RMF, FMF Guidelines' },
                { label: 'Overall rating',    value: 'MEDIUM with mitigations' },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, color: '#475569', letterSpacing: '0.1em', marginBottom: 4 }}>{m.label.toUpperCase()}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI tiles */}
        <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 14 }}>EVALUATION DASHBOARD</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10, marginBottom: 28 }}>
          {kpis.map((kpi, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '14px 16px', boxShadow: shadow.sm }}>
              <div style={{ color: kpi.color, marginBottom: 8 }}>{kpi.icon}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, color: c.textPrimary, marginBottom: 2 }}>{kpi.value}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: c.textPrimary, marginBottom: 2 }}>{kpi.label}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-column: domain coverage + findings table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.45fr', gap: 20, marginBottom: 28 }}>

          {/* Domain coverage */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 22, boxShadow: shadow.sm }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 18 }}>Domain Coverage</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {domains.map((d, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontFamily: fonts.sans, fontSize: 13, color: d.complete ? c.textPrimary : c.textTertiary }}>{d.name}</span>
                      {!d.complete && <Lock size={10} color={c.textTertiary} />}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary }}>{d.complete ? `${d.score}%` : '—'}</span>
                      <RiskBadge level={d.risk} c={c} />
                    </div>
                  </div>
                  <div style={{ height: 4, background: c.elevated, borderRadius: 999 }}>
                    <div style={{ height: 4, width: `${d.score}%`, background: domainBarColor[d.risk], borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Findings table */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm }}>
            <div style={{ padding: '16px 18px', borderBottom: `1px solid ${c.border}` }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>Red Team Findings</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: c.elevated }}>
                  {['ID', 'Domain', 'Finding', 'Severity', 'Status'].map(h => (
                    <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', borderBottom: `1px solid ${c.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {findings.map((f, i) => (
                  <tr key={i} style={{ borderBottom: i < findings.length - 1 ? `1px solid ${c.borderSubtle}` : 'none' }}>
                    <td style={{ padding: '11px 14px', fontFamily: fonts.mono, fontSize: 12, color: c.teal }}>{f.id}</td>
                    <td style={{ padding: '11px 14px', fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary }}>{f.domain}</td>
                    <td style={{ padding: '11px 14px', fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, lineHeight: 1.35, maxWidth: 200 }}>{f.title}</td>
                    <td style={{ padding: '11px 14px' }}><RiskBadge level={f.sev} c={c} /></td>
                    <td style={{ padding: '11px 14px', fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: f.statusColor }}>{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executive summary */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 28, marginBottom: 28, boxShadow: shadow.sm }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
            <div>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 6 }}>EXECUTIVE SUMMARY</div>
              <div style={{ fontFamily: fonts.serif, fontSize: 22, fontWeight: 700, color: c.textPrimary }}>Overall Evaluation Assessment</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <RiskBadge level="MEDIUM" c={c} />
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 6 }}>with required mitigations</div>
            </div>
          </div>

          <div style={{ fontFamily: fonts.sans, fontSize: 15, color: c.textPrimary, lineHeight: 1.8, marginBottom: 22 }}>
            This pre-deployment safety evaluation assessed GPT-5-Preview across eight capability domains over a 45-day window. The model demonstrates significant capability uplift in CBRN-adjacent queries under scaffolded elicitation conditions, reaching CAL-3 proximity in 72% of structured red-team runs in the organic chemistry domain. Cybersecurity capability remains at CAL-2 with bounded upward uncertainty. Deception evaluations flagged sandbagging behaviour under evaluation-aware prompting conditions.
          </div>

          {/* Meta tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 22 }}>
            {[
              { label: 'Deployment Recommendation', value: 'Conditional — oversight layer required', icon: <AlertTriangle size={15} />, color: c.warning },
              { label: 'Required Mitigations',       value: '3 mandatory, 2 recommended',           icon: <Shield size={15} />,        color: c.primary },
              { label: 'Next Review Date',            value: '90 days post-deployment',              icon: <Activity size={15} />,      color: c.teal },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 18px', background: c.elevated, borderRadius: 10, border: `1px solid ${c.borderSubtle}` }}>
                <div style={{ color: item.color, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Mitigations */}
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>REQUIRED MITIGATIONS BEFORE DEPLOYMENT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mitigations.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 15px', background: m.required ? c.warningSoft : c.elevated, border: `1px solid ${m.required ? c.warningBorder : c.borderSubtle}`, borderRadius: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: m.required ? c.warning : c.textTertiary, flexShrink: 0, marginTop: 1 }}>{m.id}</span>
                <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textPrimary, lineHeight: 1.5 }}>{m.text}</span>
                {m.required && <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: c.warning, flexShrink: 0, marginTop: 2, letterSpacing: '0.06em' }}>REQUIRED</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Capstone artifact cards */}
        <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 16 }}>CAPSTONE DELIVERABLES</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {artifacts.map((a, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 20, boxShadow: shadow.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${a.color}18`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color }}>{a.icon}</div>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: a.color, padding: '3px 8px', background: `${a.color}14`, borderRadius: 999 }}>{a.status}</span>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 5 }}>{a.title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, lineHeight: 1.5 }}>
                {i === 0 ? 'Threat model, task specs, elicitation protocol, and acceptance criteria' :
                 i === 1 ? '87 tasks across 6 domains with scoring rubrics and validity analysis' :
                 i === 2 ? '31 evidence items with confidence scores and adjudication notes' :
                 i === 3 ? '6 findings with severity classification and threshold analysis' :
                 i === 4 ? 'Interactive risk summary with KPI tiles and domain coverage chart' :
                            'Leadership-ready summary with deployment recommendation and mitigations'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
