import { useState } from 'react';
import { fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { Shield, Linkedin, Link, Download, ArrowLeft, LayoutGrid } from 'lucide-react';

const COMPETENCIES = [
  { label: 'Threat Modeling',    color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Evaluation Design',  color: '#0F766E', bg: '#CCFBF1' },
  { label: 'Benchmark Validity', color: '#4338CA', bg: '#E0E7FF' },
  { label: 'Red Team Operations',color: '#15803D', bg: '#DCFCE7' },
  { label: 'Evidence Synthesis', color: '#B45309', bg: '#FEF3C7' },
  { label: 'Executive Reporting', color: '#1D4ED8', bg: '#DBEAFE' },
];

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function CertificateScreen({ state, navigate }: ScreenProps) {
  // Certificate is always light-mode — ignore state.dark
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const issueDate = formatDate(new Date());

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: fonts.sans, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 60px', position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#F8FAFC', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 1000, boxShadow: shadow.lg }}>
          {toast}
        </div>
      )}

      {/* Certificate card */}
      <div style={{ width: '100%', maxWidth: 840, background: '#FFFFFF', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
        {/* Outer decorative border */}
        <div style={{ position: 'absolute', inset: 12, border: '1px solid #1D4ED8', borderRadius: 2, pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 15, border: '0.5px solid rgba(29,78,216,0.3)', borderRadius: 2, pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ padding: '44px 64px 36px', position: 'relative', zIndex: 2 }}>
          {/* Header row: logo + title + issuer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={17} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1D4ED8', fontFamily: fonts.serif }}>Frontier Model Evaluation</div>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Professional Training Program</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 10, color: '#94A3B8', letterSpacing: '0.04em' }}>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Certificate of Completion</div>
              <div>{issueDate}</div>
            </div>
          </div>

          {/* Rule */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #1D4ED8 30%, #1D4ED8 70%, transparent)', opacity: 0.35, marginBottom: 28 }} />

          {/* Name block */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontFamily: fonts.serif, fontSize: 11, fontStyle: 'italic', color: '#64748B', marginBottom: 10, letterSpacing: '0.04em' }}>This certifies that</div>
            <div style={{ fontFamily: fonts.serif, fontSize: 38, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {state.learnerName || 'Learner'}
            </div>
            <div style={{ height: 2, width: 160, background: '#1D4ED8', margin: '12px auto 0', opacity: 0.6, borderRadius: 1 }} />
          </div>

          {/* Body */}
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 22px' }}>
            <p style={{ fontFamily: fonts.sans, fontSize: 13, color: '#475569', lineHeight: 1.65, margin: 0 }}>
              has demonstrated competence in frontier AI model evaluation — capability assessment, benchmark design,
              red-team methodology, evidence synthesis, and evaluation reporting across 51 hours and 9 modules.
            </p>
          </div>

          {/* Rule */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #CBD5E1 30%, #CBD5E1 70%, transparent)', opacity: 0.7, marginBottom: 20 }} />

          {/* Competencies + stats in one row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 10 }}>Competencies</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {COMPETENCIES.map(comp => (
                  <span key={comp.label} style={{ padding: '4px 12px', borderRadius: 20, background: comp.bg, color: comp.color, fontSize: 11, fontWeight: 600, border: `1px solid ${comp.color}22` }}>
                    {comp.label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
              {[
                { label: 'Quiz Mastery',   value: `${state.quizMastery}%` },
                { label: 'Evidence Cards', value: String(state.evidenceCards.length) },
                { label: 'Artifacts',      value: String(state.artifactsCreated.length) },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1D4ED8', fontFamily: fonts.serif }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.04em', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rule */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #CBD5E1 30%, #CBD5E1 70%, transparent)', opacity: 0.7, marginBottom: 20 }} />

          {/* Footer row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              FME-2026-{state.learnerName.toUpperCase().replace(/\s+/g, '').slice(0, 6)}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ height: 1, width: 120, background: '#CBD5E1', marginBottom: 6, marginLeft: 'auto' }} />
              <div style={{ fontSize: 11, color: '#475569', fontFamily: fonts.serif, fontStyle: 'italic' }}>Program Director</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions below certificate */}
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#64748B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Share this certificate</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { icon: <Linkedin size={18} />, label: 'LinkedIn',  msg: 'LinkedIn sharing coming soon.' },
            { icon: <Link size={18} />,     label: 'Copy Link', msg: 'Link sharing coming soon.' },
            { icon: <Download size={18} />, label: 'Download PDF', msg: 'PDF download coming soon in full enrollment.' },
          ].map(a => (
            <button key={a.label} onClick={() => showToast(a.msg)}
              style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: shadow.sm }}>
              {a.icon} {a.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button onClick={() => navigate('dashboard')}
            style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: shadow.sm }}>
            <ArrowLeft size={15} /> Back to Dashboard
          </button>
          <button onClick={() => navigate('portfolio')}
            style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#1D4ED8', color: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: shadow.sm }}>
            <LayoutGrid size={15} /> View your portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
