import { type ReactNode } from 'react';
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

function Section({ label, children, c }: { label: string; children: ReactNode; c: ReturnType<typeof C> }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: c.border }} />
      </div>
      {children}
    </div>
  );
}

export function DesignTokensPage({ dark }: PageProps) {
  const c = C(dark);

  const colorTokens = [
    { name: '--fme-bg',            light: '#F8FAFC', dark: '#020617',                group: 'Background' },
    { name: '--fme-surface',       light: '#FFFFFF', dark: '#0F172A',                group: 'Background' },
    { name: '--fme-surface-elev',  light: '#F1F5F9', dark: '#1E293B',                group: 'Background' },
    { name: '--fme-text-primary',  light: '#0F172A', dark: '#F8FAFC',                group: 'Text' },
    { name: '--fme-text-secondary',light: '#334155', dark: '#CBD5E1',                group: 'Text' },
    { name: '--fme-border',        light: '#CBD5E1', dark: '#334155',                group: 'Border' },
    { name: '--fme-primary',       light: '#1D4ED8', dark: '#60A5FA',                group: 'Action' },
    { name: '--fme-primary-soft',  light: '#DBEAFE', dark: 'rgba(96,165,250,.14)',   group: 'Action' },
    { name: '--fme-success',       light: '#15803D', dark: '#4ADE80',                group: 'Semantic' },
    { name: '--fme-success-soft',  light: '#DCFCE7', dark: 'rgba(74,222,128,.12)',   group: 'Semantic' },
    { name: '--fme-warning',       light: '#B45309', dark: '#FBBF24',                group: 'Semantic' },
    { name: '--fme-warning-soft',  light: '#FEF3C7', dark: 'rgba(251,191,36,.12)',   group: 'Semantic' },
    { name: '--fme-danger',        light: '#B91C1C', dark: '#F87171',                group: 'Semantic' },
    { name: '--fme-danger-soft',   light: '#FEE2E2', dark: 'rgba(248,113,113,.12)',  group: 'Semantic' },
    { name: '--fme-teal',          light: '#0F766E', dark: '#2DD4BF',                group: 'Accent' },
    { name: '--fme-violet',        light: '#7C3AED', dark: '#A78BFA',                group: 'Accent' },
  ];

  const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];

  const radii = [
    { name: '--radius-badge',  value: '999px', preview: 999, usage: 'Badges, chips' },
    { name: '--radius-modal',  value: '20px',  preview: 20,  usage: 'Modals' },
    { name: '--radius-card',   value: '16px',  preview: 16,  usage: 'Cards, panels' },
    { name: '--radius-button', value: '10px',  preview: 10,  usage: 'Buttons, inputs' },
    { name: '--radius-sm',     value: '6px',   preview: 6,   usage: 'Small elements' },
    { name: '--radius-xs',     value: '4px',   preview: 4,   usage: 'Inline, tiny' },
  ];

  const elevations = [
    { name: '--shadow-none',  css: 'none',                                             label: 'Flat / inline' },
    { name: '--shadow-sm',    css: '0 1px 3px rgba(0,0,0,.08)',                        label: 'Cards' },
    { name: '--shadow-md',    css: '0 4px 6px rgba(0,0,0,.07)',                        label: 'Dropdowns' },
    { name: '--shadow-lg',    css: '0 10px 15px rgba(0,0,0,.07)',                      label: 'Modals' },
    { name: '--shadow-focus', css: `0 0 0 3px rgba(29,78,216,.35)`,                   label: 'Focus ring' },
  ];

  const motionTokens = [
    { name: '--dur-instant',     value: '80ms',   usage: 'Tooltip appear, tiny state change' },
    { name: '--dur-fast',        value: '150ms',  usage: 'Button press, focus ring' },
    { name: '--dur-normal',      value: '250ms',  usage: 'Panel open, drawer slide' },
    { name: '--dur-slow',        value: '400ms',  usage: 'Page transition, modal' },
    { name: '--dur-deliberate',  value: '600ms',  usage: 'Completion animation' },
    { name: '--ease-standard',   value: 'cubic-bezier(.4,0,.2,1)',   usage: 'Most interactions' },
    { name: '--ease-decelerate', value: 'cubic-bezier(0,0,.2,1)',    usage: 'Enter animations' },
    { name: '--ease-accelerate', value: 'cubic-bezier(.4,0,1,1)',    usage: 'Exit animations' },
  ];

  const grids = [
    { name: 'Desktop', frame: '1440px', cols: 12, gutter: '24px', margin: '80px' },
    { name: 'Tablet',  frame: '1024px', cols: 8,  gutter: '20px', margin: '32px' },
    { name: 'Mobile',  frame: '390px',  cols: 4,  gutter: '16px', margin: '20px' },
  ];

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>
      <PageHeader num="03 · DESIGN TOKENS" title="Design Tokens" subtitle="CSS custom properties for colors, spacing, radii, elevation, and motion." c={c} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 64px' }}>

        {/* Color tokens */}
        <Section label="COLOR TOKENS" c={c}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 80px', padding: '10px 20px', background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
              {['Token', 'Light', 'Dark', 'Group'].map(h => (
                <div key={h} style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            {colorTokens.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 80px', padding: '10px 20px', borderBottom: i < colorTokens.length - 1 ? `1px solid ${c.borderSubtle}` : 'none', alignItems: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.primary }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: t.light, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary }}>{t.light}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: t.dark.startsWith('rgba') ? t.dark.replace(/[\d.]+\)$/, '1)') : t.dark, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.dark}</span>
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{t.group}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing */}
        <Section label="SPACING SCALE" c={c}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '28px 32px', boxShadow: shadow.sm, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {spacingScale.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, width: 100 }}>--space-{s}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 600, color: c.textSecondary, width: 36 }}>{s}px</div>
                <div style={{ height: 20, width: s, background: c.primary, borderRadius: 3, opacity: 0.8, flexShrink: 0 }} />
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}>
                  {s === 4 ? 'micro' : s === 8 ? 'tight' : s === 12 ? 'small' : s === 16 ? 'base' : s === 24 ? 'medium' : s === 32 ? 'large' : s === 40 ? 'section' : s === 48 ? 'block' : 'page-break'}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Radii */}
        <Section label="BORDER RADII" c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {radii.map((r, i) => (
              <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, boxShadow: shadow.sm }}>
                <div style={{ width: 64, height: 38, background: c.primarySoft, border: `2px solid ${c.primary}`, borderRadius: Math.min(r.preview, 19), opacity: 0.85 }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.primary, marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{r.value}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary, marginTop: 3 }}>{r.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Elevation */}
        <Section label="ELEVATION & SHADOW" c={c}>
          <div style={{ display: 'flex', gap: 16 }}>
            {elevations.map((e, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: '100%', height: 56,
                  background: c.surface,
                  borderRadius: 10,
                  boxShadow: e.css === 'none' ? undefined : e.css,
                  border: e.css === 'none' ? `1px solid ${c.border}` : 'none',
                }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.primary, marginBottom: 2 }}>{e.name}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary }}>{e.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Motion */}
        <Section label="MOTION TOKENS" c={c}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 180px 1fr', padding: '10px 20px', background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
              {['Token', 'Value', 'Usage context'].map(h => (
                <div key={h} style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em' }}>{h}</div>
              ))}
            </div>
            {motionTokens.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 180px 1fr', padding: '11px 20px', borderBottom: i < motionTokens.length - 1 ? `1px solid ${c.borderSubtle}` : 'none', alignItems: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.primary }}>{t.name}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textSecondary }}>{t.value}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>{t.usage}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Grid */}
        <Section label="LAYOUT GRID" c={c}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {grids.map((g, i) => (
              <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 24px', boxShadow: shadow.sm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{g.name}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textSecondary }}>{g.frame} frame</div>
                </div>
                {/* Column visualisation */}
                <div style={{ position: 'relative', height: 28, background: c.elevated, borderRadius: 6, overflow: 'hidden', display: 'flex', gap: 2, padding: '4px 6px' }}>
                  {Array.from({ length: g.cols }).map((_, ci) => (
                    <div key={ci} style={{ flex: 1, background: `${c.primary}22`, borderRadius: 3 }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 28, marginTop: 10 }}>
                  {[`${g.cols} columns`, `${g.gutter} gutter`, `${g.margin} margins`].map(item => (
                    <span key={item} style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
