import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES } from '../course-types';
import { CheckCircle, XCircle, Award, Download, ExternalLink } from 'lucide-react';

export function PortfolioScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  // Criteria evaluation
  const modulesDone = MODULES.map(m => ({
    module: m,
    done: state.completedModules.includes(m.id),
  }));
  const allModulesDone = state.completedModules.length >= 9;
  const evidenceOk   = state.evidenceCards.length >= 3;
  const benchmarkOk  = state.benchmarks.length >= 1;
  const riskDone     = state.artifactsCreated.includes('Risk Dashboard');
  const capstoneDone = state.capstoneProgress >= 100;

  const CHECKLIST = [
    ...MODULES.map(m => ({ label: `Module ${m.id}: ${m.title}`, done: state.completedModules.includes(m.id) })),
    { label: `Evidence Library: ${state.evidenceCards.length} cards (need ≥ 3)`, done: evidenceOk },
    { label: `Benchmark Packet built (${state.benchmarks.length} benchmark${state.benchmarks.length !== 1 ? 's' : ''})`, done: benchmarkOk },
    { label: 'Risk Dashboard generated', done: riskDone },
    { label: 'Capstone dossier submitted', done: capstoneDone },
  ];

  const metCount = CHECKLIST.filter(c => c.done).length;
  const totalCriteria = CHECKLIST.length;
  const allMet = metCount >= totalCriteria;
  const partial = !allMet && metCount >= 5;

  // Artifact cards
  const artifacts = [
    { label: 'Frontier AI Landscape Map',  module: 'A', nav: 'map' as const,       done: state.completedModules.includes('' as any),           desc: 'Visual map of frontier models, capability profiles, and evaluation institutions.' },
    { label: 'Threat Model Document',       module: 'B', nav: 'modules' as const,   done: state.completedModules.includes('' as any),           desc: 'Formal threat model covering actors, pathways, assumptions, and consequence severity.' },
    { label: 'Evaluation Design Document',  module: 'C', nav: 'modules' as const,   done: state.completedModules.includes('' as any),           desc: 'Evaluation objectives, elicitation protocol, metrics, and validity analysis.' },
    { label: 'Benchmark Packet',            module: 'D', nav: 'benchmark' as const, done: state.benchmarks.length >= 1,                  desc: `${state.benchmarks.length} benchmark${state.benchmarks.length !== 1 ? 's' : ''} with validity analysis and scoring rubrics.` },
    { label: `Evidence Log (${state.evidenceCards.length} cards)`, module: 'H', nav: 'evidence' as const, done: state.evidenceCards.length >= 1, desc: 'Structured evidence records from elicitation exercises and case studies.' },
    { label: 'Red Team Report',             module: 'H', nav: 'modules' as const,   done: state.completedModules.includes('' as any),           desc: state.completedModules.includes('' as any) ? 'Red team program design, findings log, and escalation decisions.' : 'Complete Module H to generate this artifact.' },
    { label: 'Risk Dashboard',              module: 'I', nav: 'risk' as const,      done: riskDone,                                       desc: riskDone ? 'Risk matrix, finding set, and deployment recommendation.' : 'Build the risk dashboard to include this artifact.' },
    { label: 'Executive Report',            module: 'I', nav: 'capstone' as const,  done: capstoneDone,                                   desc: capstoneDone ? 'Leadership-ready evaluation summary from your capstone dossier.' : 'Submit your capstone dossier to generate this artifact.' },
  ];

  const moduleColor: Record<string, string> = { A: '#1D4ED8', B: '#7C3AED', C: '#0F766E', D: '#4338CA', E: '#334155', F: '#B91C1C', G: '#B45309', H: '#15803D', I: '#7C3AED' };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans, color: c.textPrimary, position: 'relative' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: c.textPrimary, color: c.bg, padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 1000, boxShadow: shadow.lg }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '36px 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: c.textTertiary, textTransform: 'uppercase', marginBottom: 8 }}>Frontier Model Evaluation · Final Review</div>
          <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 700, fontFamily: fonts.serif }}>Your Evaluation Portfolio</h1>
          <p style={{ margin: 0, fontSize: 15, color: c.textSecondary }}>{state.learnerName} · Safety Researcher Track</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 28, alignItems: 'start' }}>
          {/* Left: Checklist */}
          <div>
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Completion Checklist</div>
              <div style={{ fontSize: 13, color: c.textSecondary, marginBottom: 16 }}>{metCount} / {totalCriteria} criteria met</div>

              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 3, background: c.elevated, marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(metCount / totalCriteria) * 100}%`, background: allMet ? c.success : c.primary, borderRadius: 3, transition: 'width 0.4s' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {CHECKLIST.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: i < CHECKLIST.length - 1 ? `1px solid ${c.borderSubtle}` : 'none' }}>
                    {item.done
                      ? <CheckCircle size={15} color={c.success} style={{ flexShrink: 0, marginTop: 2 }} />
                      : <XCircle    size={15} color={c.textTertiary} style={{ flexShrink: 0, marginTop: 2 }} />}
                    <span style={{ fontSize: 12, color: item.done ? c.textPrimary : c.textTertiary, lineHeight: 1.4 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion summary */}
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Course Summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Hours', value: `${state.hoursCompleted} / 51`, ok: state.hoursCompleted >= 40 },
                  { label: 'Quiz Mastery', value: `${state.quizMastery}%`, ok: state.quizMastery >= 70 },
                  { label: 'Artifacts', value: String(state.artifactsCreated.length), ok: state.artifactsCreated.length >= 4 },
                  { label: 'Evidence Cards', value: String(state.evidenceCards.length), ok: state.evidenceCards.length >= 3 },
                ].map(stat => (
                  <div key={stat.label} style={{ padding: '12px 14px', borderRadius: 8, background: stat.ok ? c.successSoft : c.elevated, border: `1px solid ${stat.ok ? c.successBorder : c.border}` }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: stat.ok ? c.success : c.textPrimary }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: stat.ok ? c.success : c.textTertiary, marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Artifacts + CTA */}
          <div>
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 20, boxShadow: shadow.sm, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Portfolio Artifacts</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {artifacts.map((art, i) => (
                  <div key={i} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${art.done ? c.border : c.borderSubtle}`, background: art.done ? c.surface : c.elevated, opacity: art.done ? 1 : 0.7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: moduleColor[art.module] ?? c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{art.module}</span>
                      </div>
                      {art.done
                        ? <CheckCircle size={13} color={c.success} />
                        : <div style={{ width: 13, height: 13, borderRadius: '50%', border: `2px solid ${c.textTertiary}` }} />}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 5, color: c.textPrimary }}>{art.label}</div>
                    <div style={{ fontSize: 11, color: c.textTertiary, lineHeight: 1.5, marginBottom: art.done ? 10 : 0 }}>{art.desc}</div>
                    {art.done && (
                      <button onClick={() => navigate(art.nav)} style={{ fontSize: 11, color: c.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: fonts.sans, display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                        <ExternalLink size={11} /> View
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: c.surface, borderRadius: 12, border: `1px solid ${c.border}`, padding: 24, boxShadow: shadow.sm }}>
              <div style={{ fontWeight: 700, fontSize: 16, fontFamily: fonts.serif, marginBottom: 8 }}>
                {allMet ? 'All criteria met — ready for certification.' : partial ? 'Partial completion available.' : 'Complete more criteria to unlock your certificate.'}
              </div>
              <p style={{ fontSize: 13, color: c.textSecondary, margin: '0 0 18px' }}>
                {allMet
                  ? 'You have met all 13 completion criteria. Generate your Certificate of Completion.'
                  : partial
                  ? `You have met ${metCount} of ${totalCriteria} criteria. A Certificate of Participation is available for partial completion.`
                  : `Complete at least 5 criteria to unlock partial completion options.`}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('certificate')}
                  disabled={!allMet && !partial}
                  style={{ padding: '11px 22px', borderRadius: 8, border: 'none', background: (allMet || partial) ? c.primary : c.elevated, color: (allMet || partial) ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: (allMet || partial) ? 'pointer' : 'not-allowed', fontFamily: fonts.sans, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Award size={16} />
                  {allMet ? 'Generate Certificate of Completion' : 'Certificate of Participation'}
                </button>
                <button
                  onClick={() => showToast('PDF export available in full course enrollment.')}
                  style={{ padding: '11px 18px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 14, cursor: 'pointer', fontFamily: fonts.sans, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Download size={15} /> Download Portfolio PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
