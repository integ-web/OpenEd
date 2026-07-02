import { type ReactNode } from 'react';
import { Shield } from 'lucide-react';
import { type PageProps, C, fonts, shadow } from './types';

function PageHeader({ num, title, subtitle, c }: { num: string; title: string; subtitle: string; c: ReturnType<typeof C> }) {
  return (
    <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '32px 64px' }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 8 }}>{num}</div>
      <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>{title}</h1>
      <p style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textSecondary, margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function SectionHeading({ label, c }: { label: string; c: ReturnType<typeof C> }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: c.border }} />
    </div>
  );
}

function Section({ label, children, c }: { label: string; children: ReactNode; c: ReturnType<typeof C> }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <SectionHeading label={label} c={c} />
      {children}
    </div>
  );
}

export function BrandSystemPage({ dark }: PageProps) {
  const c = C(dark);

  const lightSwatches = [
    { hex: '#F8FAFC', name: 'Background',    token: '--fme-bg' },
    { hex: '#FFFFFF', name: 'Surface',       token: '--fme-surface' },
    { hex: '#0F172A', name: 'Text Primary',  token: '--fme-text-primary' },
    { hex: '#334155', name: 'Text Secondary',token: '--fme-text-secondary' },
    { hex: '#CBD5E1', name: 'Border',        token: '--fme-border' },
    { hex: '#1D4ED8', name: 'Primary Action',token: '--fme-primary' },
    { hex: '#DBEAFE', name: 'Primary Soft',  token: '--fme-primary-soft' },
    { hex: '#15803D', name: 'Success',       token: '--fme-success' },
    { hex: '#DCFCE7', name: 'Success Soft',  token: '--fme-success-soft' },
    { hex: '#B45309', name: 'Warning',       token: '--fme-warning' },
    { hex: '#FEF3C7', name: 'Warning Soft',  token: '--fme-warning-soft' },
    { hex: '#B91C1C', name: 'Danger',        token: '--fme-danger' },
    { hex: '#FEE2E2', name: 'Danger Soft',   token: '--fme-danger-soft' },
    { hex: '#0F766E', name: 'Teal Accent',   token: '--fme-teal' },
    { hex: '#7C3AED', name: 'Violet Accent', token: '--fme-violet' },
  ];

  const darkSwatches = [
    { hex: '#020617', name: 'Background',    token: '--fme-bg' },
    { hex: '#0F172A', name: 'Surface',       token: '--fme-surface' },
    { hex: '#1E293B', name: 'Surf. Elevated',token: '--fme-elevated' },
    { hex: '#F8FAFC', name: 'Text Primary',  token: '--fme-text-primary' },
    { hex: '#CBD5E1', name: 'Text Secondary',token: '--fme-text-secondary' },
    { hex: '#334155', name: 'Border',        token: '--fme-border' },
    { hex: '#60A5FA', name: 'Primary Action',token: '--fme-primary' },
    { hex: '#4ADE80', name: 'Success',       token: '--fme-success' },
    { hex: '#FBBF24', name: 'Warning',       token: '--fme-warning' },
    { hex: '#F87171', name: 'Danger',        token: '--fme-danger' },
    { hex: '#2DD4BF', name: 'Teal Accent',   token: '--fme-teal' },
    { hex: '#A78BFA', name: 'Violet Accent', token: '--fme-violet' },
  ];

  const personality = [
    { word: 'Mission-critical',        dot: '#1D4ED8', desc: 'Every design choice reinforces that this work has real-world consequences for AI deployment decisions.' },
    { word: 'Public-interest tech',    dot: '#0F766E', desc: 'Accessible to researchers, auditors, and policy teams — not just insiders with lab access.' },
    { word: 'Research-grade',          dot: '#7C3AED', desc: 'Precision and rigor in layout, evidence presentation, and information hierarchy.' },
    { word: 'Calm + serious',          dot: '#B45309', desc: 'No alarm-bell aesthetics. Severity is communicated through structure and color, not visual panic.' },
    { word: 'Slightly futuristic',     dot: '#15803D', desc: 'Forward-looking but grounded. Closer to aerospace tooling than sci-fi UI.' },
  ];

  const typeScale = [
    { name: 'Display',    size: 40, lh: 48, weight: 700, fontKey: 'serif' as const, sample: 'Frontier Model Evaluation' },
    { name: 'Heading XL', size: 32, lh: 40, weight: 700, fontKey: 'serif' as const, sample: 'Threat Modeling for CBRN Risk' },
    { name: 'Heading L',  size: 24, lh: 32, weight: 700, fontKey: 'sans'  as const, sample: 'Module C: Evaluation Science' },
    { name: 'Heading M',  size: 20, lh: 28, weight: 600, fontKey: 'sans'  as const, sample: 'Benchmark Validity Assessment' },
    { name: 'Body L',     size: 18, lh: 28, weight: 400, fontKey: 'sans'  as const, sample: 'Frontier model evaluation encompasses both capability assessment and misuse risk analysis.' },
    { name: 'Body',       size: 16, lh: 24, weight: 400, fontKey: 'sans'  as const, sample: 'Evidence must be documented with source, confidence level, and evaluator attribution.' },
    { name: 'Body S',     size: 14, lh: 20, weight: 400, fontKey: 'sans'  as const, sample: 'Red team findings should be cross-validated by at least two independent reviewers.' },
    { name: 'Label',      size: 12, lh: 16, weight: 600, fontKey: 'sans'  as const, sample: 'RISK THRESHOLD · SEVERITY: HIGH · STATUS: ACTIVE' },
    { name: 'Mono',       size: 13, lh: 20, weight: 500, fontKey: 'mono'  as const, sample: 'EVD-2024-183 | confidence: 0.87 | threshold: CAL-3' },
  ];

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>
      <PageHeader num="02 · BRAND SYSTEM" title="Brand System" subtitle="Identity, color palette, typography, and personality guidelines for Frontier Model Evaluation." c={c} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 64px' }}>

        {/* Brand Identity */}
        <Section label="BRAND IDENTITY" c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            {/* Logo demo */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: shadow.sm }}>
              <div style={{ width: 64, height: 64, background: '#1D4ED8', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(29,78,216,0.35)' }}>
                <Shield size={30} color="white" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, color: c.primary, letterSpacing: '0.08em' }}>FME</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, letterSpacing: '0.14em', marginTop: 3 }}>FRONTIER MODEL EVALUATION</div>
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>Primary Lockup</div>
            </div>

            {/* Personality */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {personality.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, boxShadow: shadow.sm, alignItems: 'flex-start' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: p.dot, flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 3 }}>{p.word}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Light mode palette */}
        <Section label="COLOR SYSTEM — LIGHT MODE" c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            {lightSwatches.map((s, i) => (
              <div key={i}>
                <div style={{ width: '100%', aspectRatio: '3/2', background: s.hex, borderRadius: 8, marginBottom: 8, border: '1px solid rgba(0,0,0,0.08)' }} />
                <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{s.name}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{s.hex}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, opacity: 0.7, marginTop: 1 }}>{s.token}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Dark mode palette */}
        <Section label="COLOR SYSTEM — DARK MODE" c={c}>
          <div style={{ background: '#020617', borderRadius: 16, padding: 32, border: '1px solid #1E293B' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
              {darkSwatches.map((s, i) => (
                <div key={i}>
                  <div style={{ width: '100%', aspectRatio: '3/2', background: s.hex, borderRadius: 8, marginBottom: 8, border: '1px solid rgba(255,255,255,0.08)' }} />
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: '#F8FAFC' }}>{s.name}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#64748B' }}>{s.hex}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, color: '#475569', marginTop: 1 }}>{s.token}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Typography scale */}
        <Section label="TYPOGRAPHY SCALE" c={c}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '100px 52px 64px 64px 1fr', gap: 0, background: c.elevated, padding: '10px 20px', borderBottom: `1px solid ${c.border}` }}>
              {['Style', 'Size', 'L.Ht', 'Weight', 'Live sample'].map(h => (
                <div key={h} style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            {typeScale.map((t, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '100px 52px 64px 64px 1fr', gap: 0,
                padding: '14px 20px', alignItems: 'center',
                borderBottom: i < typeScale.length - 1 ? `1px solid ${c.borderSubtle}` : 'none',
              }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary }}>{t.name}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{t.size}px</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{t.lh}px</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{t.weight}</div>
                <div style={{
                  fontFamily: fonts[t.fontKey],
                  fontSize: Math.min(t.size, 22),
                  fontWeight: t.weight,
                  lineHeight: 1.3,
                  color: c.textPrimary,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{t.sample}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
