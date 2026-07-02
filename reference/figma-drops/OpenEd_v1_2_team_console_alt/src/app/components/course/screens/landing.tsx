import { Shield, ArrowRight, Play, BookOpen, Sparkles, Target } from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { MODULES, type ScreenProps } from '../course-types';
import { useAuth } from '../../auth/AuthContext';

const PERSONAS = [
  { role: 'Safety Researcher', desc: 'You study capability profiles and design elicitation protocols. This course gives you the evaluation workflow and evidence language to produce defensible findings.' },
  { role: 'ML Engineer', desc: 'You build and fine-tune models. This course gives you evaluation literacy to participate in pre-deployment safety reviews and interpret safety claims about your work.' },
  { role: 'Trust & Safety Lead', desc: 'You own policy and incident response. This course teaches you to interrogate evaluation claims, commission meaningful tests, and communicate risk to decision-makers.' },
  { role: 'Public-Interest Auditor', desc: 'You conduct or oversee third-party assessments. This course gives you the full methodology toolkit: threat models, benchmarks, red teams, and evidence standards.' },
];

const PROMISES = [
  { icon: <Play size={16} />, color: '#2563EB', bg: '#EFF6FF', bdr: '#BFDBFE', label: 'Video-first learning', desc: 'Every lesson anchors on a video, with structured tabs for understanding, practice, and building.' },
  { icon: <Target size={16} />, color: '#0F766E', bg: '#CCFBF1', bdr: '#99F6E4', label: 'Artifact portfolio', desc: 'Each phase produces a portfolio-ready artifact — evaluation rubrics, harnesses, red-team reports.' },
  { icon: <Sparkles size={16} />, color: '#6D28D9', bg: '#F5F3FF', bdr: '#DDD6FE', label: 'AI Coach', desc: 'An in-lesson AI Coach helps you clarify concepts, fill artifacts, and connect lessons to the capstone.' },
  { icon: <BookOpen size={16} />, color: '#B45309', bg: '#FFFBEB', bdr: '#FDE68A', label: 'Source-backed', desc: 'Every lesson cites real papers, frameworks, and tools — no invented citations or vague claims.' },
];

export function LandingScreen({ state, navigate }: ScreenProps) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh' }}>

      {/* Top bar */}
      <header style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
            <Shield size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: c.textPrimary, letterSpacing: '-0.01em' }}>Frontier Evaluation Lab</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {isAuthenticated ? (
            <button onClick={() => navigate('dashboard')} style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: '#fff', background: '#2563EB', border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer' }}>
              Go to dashboard
            </button>
          ) : (
            <>
              <a href="/login" style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>
                Sign in
              </a>
              <a href="/signup" style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: '#fff', background: '#2563EB', border: 'none', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', textDecoration: 'none' }}>
                Start learning
              </a>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '80px 48px 72px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 20 }}>
            Frontier Model Evaluation
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, color: c.textPrimary, lineHeight: 1.12, margin: '0 0 22px', letterSpacing: '-0.015em' }}>
            Learn to prove frontier AI<br />is safe enough to ship
          </h1>
          <p style={{ fontSize: 18, color: c.textSecondary, lineHeight: 1.75, maxWidth: 560, margin: '0 0 36px' }}>
            A 51-hour video-first course on threat models, benchmarks, red teaming, harnesses, evidence, and release decisions for frontier AI systems.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, alignItems: 'center', marginBottom: 44 }}>
            {isAuthenticated ? (
              <button onClick={() => navigate('dashboard')} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '14px 30px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: fonts.sans, display: 'flex', alignItems: 'center', gap: 8 }}>
                Go to dashboard <ArrowRight size={15} />
              </button>
            ) : (
              <a href="/signup" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '14px 30px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: fonts.sans, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                Start learning <ArrowRight size={15} />
              </a>
            )}
            <button onClick={() => navigate('modules')} style={{ background: 'transparent', color: c.textSecondary, border: `1px solid ${c.border}`, padding: '14px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: fonts.sans }}>
              Preview the course
            </button>
          </div>
          {/* Three key facts */}
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' as const, paddingTop: 28, borderTop: `1px solid ${c.border}` }}>
            {[['51 hours', 'Video-first content'], ['6 phases', 'With artifacts'], ['1 capstone', 'Deployment decision']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary, fontFamily: fonts.mono, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 5, fontFamily: fonts.sans }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course promises */}
      <section style={{ padding: '60px 48px', background: c.bg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>What makes this different</p>
          <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 32px' }}>Built for working evaluators</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {PROMISES.map(p => (
              <div key={p.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 22px', boxShadow: shadow.sm }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: p.bg, border: `1px solid ${p.bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: p.color }}>
                  {p.icon}
                </div>
                <p style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: c.textPrimary, margin: '0 0 6px' }}>{p.label}</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six phases */}
      <section style={{ padding: '60px 48px', background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Course structure</p>
          <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>6 phases. 51 hours. One coherent method.</h2>
          <p style={{ fontSize: 14, color: c.textSecondary, margin: '0 0 32px' }}>Each phase builds toward the capstone: a governance-ready deployment recommendation for Aster-3.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {MODULES.map(phase => (
              <div key={phase.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm }}>
                <div style={{ height: 4, background: phase.color }} />
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: phase.color }}>{phase.id}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, background: c.elevated, padding: '2px 7px', borderRadius: 999, border: `1px solid ${c.border}` }}>{phase.hours}h</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{phase.difficulty}</span>
                  </div>
                  <p style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: c.textPrimary, margin: '0 0 6px' }}>{phase.title}</p>
                  <p style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6, margin: '0 0 12px' }}>{phase.description}</p>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#2DD4BF' : '#0F766E' }}>
                    Artifact: {phase.artifact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section style={{ padding: '60px 48px', background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Who this is for</p>
          <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 28px' }}>Built for evaluation practitioners</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
            {PERSONAS.map(p => (
              <div key={p.role} style={{ background: c.surface, border: `1px solid ${c.border}`, borderLeft: `3px solid ${blue}`, borderRadius: 14, padding: '18px 20px' }}>
                <p style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: '0 0 8px' }}>{p.role}</p>
                <p style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '72px 48px', background: c.surface, borderTop: `1px solid ${c.border}`, textAlign: 'center' as const }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>Frontier Evaluation Lab</p>
          <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 14px', lineHeight: 1.2 }}>
            Evaluation is where AI becomes deployable.
          </h2>
          <p style={{ color: c.textSecondary, margin: '0 0 32px', fontSize: 16, lineHeight: 1.75 }}>
            Six phases. Six artifacts. One capstone decision: should Aster-3 ship?
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            {isAuthenticated ? (
              <button onClick={() => navigate('dashboard')} style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: fonts.sans, display: 'flex', alignItems: 'center', gap: 8 }}>
                Go to dashboard <ArrowRight size={15} />
              </button>
            ) : (
              <>
                <a href="/signup" style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: fonts.sans, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  Start learning <ArrowRight size={15} />
                </a>
                <button onClick={() => navigate('diagnostic')} style={{ background: 'transparent', color: c.textSecondary, border: `1px solid ${c.border}`, padding: '14px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: fonts.sans }}>
                  I have experience — take the diagnostic
                </button>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
