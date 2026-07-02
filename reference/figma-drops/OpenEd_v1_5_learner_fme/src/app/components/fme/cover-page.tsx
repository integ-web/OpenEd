import { Shield, BookOpen, Layers, Zap, FileText } from 'lucide-react';
import { type PageProps, fonts } from './types';

export function CoverPage(_: PageProps) {
  // Cover is always dark regardless of the global mode toggle
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(140deg, #020617 0%, #0F172A 45%, #0C1A3E 75%, #040D24 100%)',
      fontFamily: fonts.sans,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(96,165,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Top accent bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #1D4ED8, #60A5FA, #2DD4BF, #A78BFA)' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '64px 80px 80px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 88 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, background: '#1D4ED8', borderRadius: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(29,78,216,0.5)',
            }}>
              <Shield size={21} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.1em' }}>FRONTIER MODEL EVALUATION</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 9, color: '#475569', letterSpacing: '0.1em', marginTop: 2 }}>DESIGN SYSTEM</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#475569', letterSpacing: '0.08em' }}>VERSION 1.0</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: '#475569', letterSpacing: '0.08em', marginTop: 2 }}>JUNE 2026</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: '#2DD4BF' }} />
            <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: '#2DD4BF', letterSpacing: '0.14em' }}>DESIGN SYSTEM SPECIFICATION</span>
          </div>

          <h1 style={{ fontFamily: fonts.serif, fontSize: 68, fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#F8FAFC', margin: '0 0 6px' }}>
            Frontier Model
          </h1>
          <h1 style={{
            fontFamily: fonts.serif, fontSize: 68, fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #60A5FA 0%, #2DD4BF 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 36px',
          }}>
            Evaluation
          </h1>

          <p style={{ fontFamily: fonts.sans, fontSize: 19, lineHeight: 1.65, color: '#94A3B8', maxWidth: 600, margin: 0 }}>
            A mission-critical design system for an interactive learning platform that trains
            evaluators, auditors, and policy teams to assess advanced AI systems for dangerous
            capabilities and misuse risk.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 80 }}>
          {[
            { icon: <BookOpen size={16} />, value: '51', unit: 'Hours', desc: 'Interactive content' },
            { icon: <Layers size={16} />,   value: '9',  unit: 'Modules', desc: 'A – I structured path' },
            { icon: <Zap size={16} />,      value: '100+', unit: 'Components', desc: 'Reusable design library' },
            { icon: <FileText size={16} />, value: '8',  unit: 'Pages', desc: 'Design system document' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '26px 28px',
              background: i === 0 ? 'rgba(29,78,216,0.14)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${i === 0 ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: i === 0 ? '12px 0 0 12px' : i === 3 ? '0 12px 12px 0' : '0',
            }}>
              <div style={{ color: i === 0 ? '#60A5FA' : '#475569', marginBottom: 14 }}>{stat.icon}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 34, fontWeight: 700, color: '#F8FAFC', lineHeight: 1 }}>{stat.value}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 13, color: '#64748B', fontWeight: 500 }}>{stat.unit}</span>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: '#475569' }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Document structure grid */}
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#475569', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 20 }}>DOCUMENT STRUCTURE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {[
              { num: '01', title: 'Cover',                desc: 'This page' },
              { num: '02', title: 'Brand System',         desc: 'Identity, colors, type' },
              { num: '03', title: 'Design Tokens',        desc: 'Variables & scale' },
              { num: '04', title: 'Components',           desc: 'Full UI library' },
              { num: '05', title: 'Course Templates',     desc: 'Lesson & module layouts' },
              { num: '06', title: 'Simulation Templates', desc: 'Red team & scenario UI' },
              { num: '07', title: 'Quiz Templates',       desc: 'Assessment layouts' },
              { num: '08', title: 'Capstone Templates',   desc: 'Evaluation dossier' },
            ].map((p, i) => (
              <div key={i} style={{ padding: '18px 22px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: '#1D4ED8', marginBottom: 8 }}>{p.num}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 3 }}>{p.title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: '#475569' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#475569' }}>For AI safety researchers, auditors, and policy teams</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#334155' }}>Built for a 51-hour interactive certification program</span>
        </div>
      </div>
    </div>
  );
}
