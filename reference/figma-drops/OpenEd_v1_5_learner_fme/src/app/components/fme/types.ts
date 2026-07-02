/* ═══════════════════════════════════════════════════════════════════════════
   FME Design System — Locked Token Source
   Derived from deep-research-report spec. Do not deviate.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PageProps {
  dark: boolean;
}

export const C = (dark: boolean) => ({
  /* ── Canvas & surfaces ──────────────────────────────────────────────── */
  bg:            dark ? '#0A1220' : '#F8FAFC',   // bg.canvas
  surface:       dark ? '#0F172A' : '#FFFFFF',   // bg.surface
  elevated:      dark ? '#142033' : '#F1F5F9',   // bg.surface.raised

  /* ── Text ───────────────────────────────────────────────────────────── */
  textPrimary:   dark ? '#F8FAFC' : '#0F172A',   // text.primary
  textSecondary: dark ? '#CBD5E1' : '#334155',   // text.secondary
  textTertiary:  dark ? '#94A3B8' : '#64748B',   // text.tertiary

  /* ── Borders ─────────────────────────────────────────────────────────── */
  border:        dark ? '#1E293B' : '#CBD5E1',   // border
  borderSubtle:  dark ? '#142033' : '#E2E8F0',   // border.subtle

  /* ── Primary Blue #1D4ED8 — locked per master spec ─────────────────── */
  primary:       dark ? '#60A5FA' : '#1D4ED8',
  primarySoft:   dark ? 'rgba(96,165,250,0.14)' : '#DBEAFE',
  primaryBorder: dark ? 'rgba(96,165,250,0.28)' : '#BFDBFE',

  /* ── Signal Blue — progress, links, dark-mode highlights ────────────── */
  signal:        dark ? '#60A5FA' : '#1D4ED8',
  signalSoft:    dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF',

  /* ── Success / emerald (accent.success) ─────────────────────────────── */
  success:       dark ? '#10B981' : '#047857',
  successSoft:   dark ? 'rgba(16,185,129,0.12)' : '#D1FAE5',
  successBorder: dark ? 'rgba(16,185,129,0.25)' : '#A7F3D0',

  /* ── Warning / amber (accent.warning) ───────────────────────────────── */
  warning:       dark ? '#F59E0B' : '#B45309',
  warningSoft:   dark ? 'rgba(245,158,11,0.12)' : '#FEF3C7',
  warningBorder: dark ? 'rgba(245,158,11,0.25)' : '#FDE68A',

  /* ── Critical / rose (accent.critical) ─────────────────────────────── */
  danger:        dark ? '#F43F5E' : '#BE123C',
  dangerSoft:    dark ? 'rgba(244,63,94,0.12)' : '#FFE4E6',
  dangerBorder:  dark ? 'rgba(244,63,94,0.25)' : '#FECDD3',

  /* ── Analysis / violet (accent.analysis) ───────────────────────────── */
  violet:        dark ? '#8B5CF6' : '#7C3AED',
  violetSoft:    dark ? 'rgba(139,92,246,0.12)' : '#EDE9FE',
  violetBorder:  dark ? 'rgba(139,92,246,0.25)' : '#DDD6FE',

  /* ── Teal — evidence / validated ────────────────────────────────────── */
  teal:          dark ? '#2DD4BF' : '#0F766E',
  tealSoft:      dark ? 'rgba(45,212,191,0.12)' : '#CCFBF1',
  tealBorder:    dark ? 'rgba(45,212,191,0.25)' : '#99F6E4',
});

export const fonts = {
  /* font.ui — Inter Variable for all UI and body text */
  sans:    '"Inter", system-ui, sans-serif',
  /* font.display — IBM Plex Sans for headlines and module titles */
  display: '"IBM Plex Sans", "Inter", system-ui, sans-serif',
  /* font.serif — IBM Plex Serif for editorial notes, expert commentary */
  serif:   '"IBM Plex Serif", Georgia, serif',
  /* font.mono — IBM Plex Mono for evidence IDs, scores, logs, metadata */
  mono:    '"IBM Plex Mono", "Courier New", monospace',
};

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,0.20), 0 1px 4px rgba(0,0,0,0.12)',
  md: '0 4px 8px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12)',
  lg: '0 10px 20px rgba(0,0,0,0.20), 0 4px 8px rgba(0,0,0,0.12)',
};

/* Radii from research spec */
export const radii = {
  none:  '0',
  xs:    '6px',   // chips, tags
  sm:    '10px',  // buttons, inputs
  md:    '14px',  // cards
  lg:    '20px',  // panels, modals
  pill:  '999px', // badges
};

/* Motion tokens */
export const motion = {
  fast: '120ms ease',
  base: '180ms ease',
  slow: '240ms ease',
};
