import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES } from '../course-types';

type Persona = 'safety-researcher' | 'ml-engineer' | 'trust-safety' | 'auditor';

const PERSONA_OPTIONS: { id: Persona; label: string; strength: string; gap: string }[] = [
  {
    id: 'safety-researcher',
    label: 'Safety researcher transitioning from policy',
    strength: 'Strong governance intuition and threat-framing instinct',
    gap: 'Limited hands-on implementation of evaluation protocols',
  },
  {
    id: 'ml-engineer',
    label: 'ML engineer entering safety work',
    strength: 'Strong technical grounding in model internals and benchmarks',
    gap: 'Limited governance framing and safety case reasoning',
  },
  {
    id: 'trust-safety',
    label: 'Product / Trust & Safety lead',
    strength: 'Strong operational judgment and policy escalation instinct',
    gap: 'Not research-native; benefit from evaluation methodology depth',
  },
  {
    id: 'auditor',
    label: 'Public-interest technologist / auditor',
    strength: 'Strong ethics, disclosure, and accountability instinct',
    gap: 'Mixed technical background; needs both theory and practice',
  },
];

const START_MODULE: Record<Persona, string> = {
  'safety-researcher': 'Module A — Frontier AI Foundations',
  'ml-engineer': 'Module A — Frontier AI Foundations',
  'trust-safety': 'Module A — Frontier AI Foundations',
  'auditor': 'Module A — Frontier AI Foundations',
};

const FIRST_ARTIFACT: Record<Persona, string> = {
  'safety-researcher': 'Frontier AI Landscape Map (Module A)',
  'ml-engineer': 'Frontier AI Landscape Map (Module A)',
  'trust-safety': 'Threat Model Document (Module B)',
  'auditor': 'Threat Model Document (Module B)',
};

export function OnboardingScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [step, setStep] = useState(0);
  const [name, setName] = useState(state.learnerName || '');
  const [persona, setPersona] = useState<Persona | null>(null);

  const TOTAL_STEPS = 4;

  const cardStyle: React.CSSProperties = {
    background: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 16,
    padding: '48px 52px',
    boxShadow: shadow.lg,
    maxWidth: 620,
    width: '100%',
  };

  const btnPrimary: React.CSSProperties = {
    background: c.primary, color: '#fff', border: 'none',
    padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
    cursor: 'pointer', fontFamily: fonts.sans,
  };

  const btnGhost: React.CSSProperties = {
    background: 'transparent', color: c.textSecondary,
    border: `1px solid ${c.border}`, padding: '13px 24px',
    borderRadius: 10, fontSize: 15, cursor: 'pointer', fontFamily: fonts.sans,
  };

  const Dots = () => (
    <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} style={{
          width: i === step ? 24 : 8, height: 8, borderRadius: 4,
          background: i <= step ? c.primary : c.border,
          transition: 'all 0.25s',
        }} />
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: c.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', fontFamily: fonts.sans,
    }}>
      {/* Step 0: Welcome */}
      {step === 0 && (
        <div style={cardStyle}>
          <Dots />
          <div style={{
            display: 'inline-block', background: c.primarySoft, border: `1px solid ${c.primaryBorder}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 12, color: c.primary,
            fontWeight: 600, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Welcome
          </div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, marginBottom: 16, lineHeight: 1.2 }}>
            Welcome to Frontier Model Evaluation
          </h1>
          <p style={{ color: c.textSecondary, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
            This course trains you to evaluate advanced AI systems for dangerous capabilities,
            misuse risk, benchmark validity, and evidence quality.
          </p>
          <div style={{ background: c.elevated, borderRadius: 10, padding: '20px 22px', marginBottom: 32, border: `1px solid ${c.borderSubtle}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              What's ahead
            </div>
            {[
              '9 modules from foundations to red teaming and reporting',
              '6 capstone artifacts you produce and keep',
              'Realistic simulations, quizzes, and case studies',
              'A final evaluation dossier for your portfolio',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 3 ? 10 : 0 }}>
                <span style={{ color: c.success, fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <button style={btnPrimary} onClick={() => setStep(1)}>Let's begin →</button>
        </div>
      )}

      {/* Step 1: Name */}
      {step === 1 && (
        <div style={cardStyle}>
          <Dots />
          <div style={{
            display: 'inline-block', background: c.primarySoft, border: `1px solid ${c.primaryBorder}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 12, color: c.primary,
            fontWeight: 600, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Step 1 of 3
          </div>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>
            What should we call you?
          </h2>
          <p style={{ color: c.textSecondary, fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
            We use your name to personalize your evaluation dossier and certificate.
          </p>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSecondary, marginBottom: 8 }}>
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Alex Chen"
            style={{
              width: '100%', padding: '12px 16px', fontSize: 16,
              background: c.elevated, border: `1px solid ${name ? c.primary : c.border}`,
              borderRadius: 10, color: c.textPrimary, fontFamily: fonts.sans,
              outline: 'none', boxSizing: 'border-box', marginBottom: 28,
            }}
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { update({ learnerName: name.trim() }); setStep(2); } }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={btnGhost} onClick={() => setStep(0)}>← Back</button>
            <button
              style={{ ...btnPrimary, opacity: name.trim() ? 1 : 0.4, cursor: name.trim() ? 'pointer' : 'default' }}
              onClick={() => { if (name.trim()) { update({ learnerName: name.trim() }); setStep(2); } }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Persona */}
      {step === 2 && (
        <div style={{ ...cardStyle, maxWidth: 700 }}>
          <Dots />
          <div style={{
            display: 'inline-block', background: c.primarySoft, border: `1px solid ${c.primaryBorder}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 12, color: c.primary,
            fontWeight: 600, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Step 2 of 3
          </div>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>
            Which of these describes you best?
          </h2>
          <p style={{ color: c.textSecondary, fontSize: 15, marginBottom: 24 }}>
            We'll tailor your recommended learning path based on your background.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {PERSONA_OPTIONS.map(opt => {
              const selected = persona === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPersona(opt.id)}
                  style={{
                    background: selected ? c.primarySoft : c.elevated,
                    border: `2px solid ${selected ? c.primary : c.border}`,
                    borderRadius: 12, padding: '18px 20px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 4 }}>{opt.label}</div>
                  <div style={{ fontSize: 13, color: c.textSecondary }}>
                    <span style={{ color: c.success, fontWeight: 600 }}>Strength:</span> {opt.strength}
                  </div>
                  <div style={{ fontSize: 13, color: c.textSecondary, marginTop: 2 }}>
                    <span style={{ color: c.warning, fontWeight: 600 }}>Growth area:</span> {opt.gap}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={btnGhost} onClick={() => setStep(1)}>← Back</button>
            <button
              style={{ ...btnPrimary, opacity: persona ? 1 : 0.4, cursor: persona ? 'pointer' : 'default' }}
              onClick={() => { if (persona) { update({ learnerPersona: persona }); setStep(3); } }}
            >
              This is me →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Starting point */}
      {step === 3 && (
        <div style={cardStyle}>
          <Dots />
          <div style={{
            display: 'inline-block', background: c.successSoft, border: `1px solid ${c.successBorder}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 12, color: c.success,
            fontWeight: 600, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            You're set
          </div>
          <h2 style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>
            Your learning path is ready, {name || 'evaluator'}
          </h2>
          <p style={{ color: c.textSecondary, fontSize: 15, lineHeight: 1.65, marginBottom: 28 }}>
            Based on your background, we've designed your learning path.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            <div style={{
              background: c.elevated, borderRadius: 12, padding: '20px 22px',
              border: `1px solid ${c.borderSubtle}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Recommended starting point
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: c.primary }}>
                {persona ? START_MODULE[persona] : MODULES[0].title}
              </div>
            </div>

            <div style={{
              background: c.elevated, borderRadius: 12, padding: '20px 22px',
              border: `1px solid ${c.borderSubtle}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                First artifact you'll build
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>
                {persona ? FIRST_ARTIFACT[persona] : 'Frontier AI Landscape Map'}
              </div>
            </div>

            <div style={{
              background: c.elevated, borderRadius: 12, padding: '20px 22px',
              border: `1px solid ${c.borderSubtle}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Or — get a head start
              </div>
              <button
                onClick={() => navigate('diagnostic')}
                style={{ ...btnGhost, fontSize: 14, padding: '8px 14px' }}
              >
                Take the diagnostic to find your starting level
              </button>
            </div>
          </div>

          <button
            style={btnPrimary}
            onClick={() => { update({ onboarded: true }); navigate('dashboard'); }}
          >
            Enter the Lab →
          </button>
        </div>
      )}
    </div>
  );
}
