import { type ReactNode, useState } from 'react';
import {
  ChevronRight, Shield, AlertTriangle, CheckCircle, Clock,
  Lock, RotateCcw, ChevronDown, X, Bell, BookOpen,
  FileText, Activity, Target, ExternalLink,
} from 'lucide-react';
import { type PageProps, C, fonts, shadow } from './types';

/* ── Shared helpers ─────────────────────────────────── */

function PageHeader({ c }: { c: ReturnType<typeof C> }) {
  return (
    <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '32px 64px' }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 8 }}>04 · COMPONENTS</div>
      <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Component Library</h1>
      <p style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textSecondary, margin: 0 }}>
        All reusable UI components with variants for light and dark mode.
      </p>
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

function ComponentLabel({ name, c }: { name: string; c: ReturnType<typeof C> }) {
  return <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 8, letterSpacing: '0.06em' }}>{name}</div>;
}

type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
function RiskBadge({ level, c }: { level: RiskLevel; c: ReturnType<typeof C> }) {
  const map: Record<RiskLevel, { bg: string; color: string; border: string }> = {
    CRITICAL: { bg: c.dangerSoft,  color: c.danger,   border: c.dangerBorder },
    HIGH:     { bg: c.warningSoft, color: c.warning,  border: c.warningBorder },
    MEDIUM:   { bg: c.primarySoft, color: c.primary,  border: c.primaryBorder },
    LOW:      { bg: c.successSoft, color: c.success,  border: c.successBorder },
  };
  const m = map[level];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: m.bg, border: `1px solid ${m.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
      <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: m.color }}>{level}</span>
    </span>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 999, background: `${color}18`, border: `1px solid ${color}38` }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color }}>{label}</span>
    </span>
  );
}

function MetricChip({ label, value, c }: { label: string; value: string; c: ReturnType<typeof C> }) {
  return (
    <div style={{ padding: '6px 12px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{value}</div>
      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 1 }}>{label}</div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────── */

export function ComponentsPage({ dark }: PageProps) {
  const c = C(dark);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sliderVal, setSliderVal] = useState(62);

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>
      <PageHeader c={c} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 64px' }}>

        {/* ── NAVIGATION ───────────────────────────────────── */}
        <Section label="NAVIGATION" c={c}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {['Course', 'Module C', 'Evaluation Science', 'Elicitation Strategies'].map((item, i, arr) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, color: i === arr.length - 1 ? c.textPrimary : c.primary, fontWeight: i === arr.length - 1 ? 500 : 400, cursor: i < arr.length - 1 ? 'pointer' : 'default' }}>{item}</span>
                  {i < arr.length - 1 && <ChevronRight size={13} color={c.textTertiary} />}
                </span>
              ))}
            </div>
            <ComponentLabel name="Breadcrumb" c={c} />
          </div>

          {/* Progress tracker */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: shadow.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>Module C — Evaluation Science</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textSecondary }}>62% complete</span>
            </div>
            <div style={{ height: 6, background: c.elevated, borderRadius: 999 }}>
              <div style={{ height: 6, width: '62%', background: c.primary, borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
              {['L1','L2','L3','L4','L5','L6'].map((l, i) => (
                <div key={l} style={{ flex: 1, height: 4, borderRadius: 2, background: i < 4 ? c.primary : c.elevated }} />
              ))}
            </div>
            <ComponentLabel name="Progress Tracker" c={c} />
          </div>

          {/* Top nav */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: shadow.sm }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, background: '#1D4ED8', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={14} color="white" />
                </div>
                <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>Frontier Model Evaluation</span>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                {['Overview','Modules','Resources','Progress','Dashboard'].map((item, i) => (
                  <span key={item} style={{ fontFamily: fonts.sans, fontSize: 13, color: i === 1 ? c.primary : c.textSecondary, fontWeight: i === 1 ? 600 : 400, cursor: 'pointer' }}>{item}</span>
                ))}
              </div>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: c.primary }}>AE</span>
              </div>
            </div>
            <ComponentLabel name="Top Navigation" c={c} />
          </div>
        </Section>

        {/* ── CARDS ──────────────────────────────────────────── */}
        <Section label="CARDS" c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

            {/* Course card */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
                <div style={{ height: 76, background: 'linear-gradient(135deg,#1D4ED8,#0F766E)', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
                  <BookOpen size={22} color="rgba(255,255,255,0.8)" />
                  <RiskBadge level="HIGH" c={c} />
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 6 }}>MODULE C · 6 LESSONS</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>Evaluation Science</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>From risk question to eval objective, metrics, elicitation, and validity failures.</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>6h 00m</span>
                    <div style={{ height: 4, width: 60, background: c.elevated, borderRadius: 999 }}>
                      <div style={{ height: 4, width: '62%', background: c.primary, borderRadius: 999 }} />
                    </div>
                  </div>
                </div>
              </div>
              <ComponentLabel name="Course Card" c={c} />
            </div>

            {/* Evidence card */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, boxShadow: shadow.sm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.teal, fontWeight: 600 }}>EVD-2024-183</span>
                  <RiskBadge level="CRITICAL" c={c} />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Roleplay framing reduced refusal rate by 67%</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>Bio-adjacent queries bypassed safety training when framed as academic chemistry roleplay.</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Chip label="Internal Red Team" color={c.violet} />
                  <Chip label="Confidence: High" color={c.teal} />
                </div>
              </div>
              <ComponentLabel name="Evidence Card" c={c} />
            </div>

            {/* Source card */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, boxShadow: shadow.sm }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginBottom: 8 }}>SOURCE</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>NIST AI RMF 1.0</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>Govern, Map, Measure, and Manage functions for AI risk management across the system lifecycle.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.primary }}>nist.gov/publications/ai-rmf</span>
                  <ExternalLink size={11} color={c.primary} />
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 8 }}>NIST · Jan 2023 · Primary Source</div>
              </div>
              <ComponentLabel name="Source Card" c={c} />
            </div>

            {/* Case study card */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, boxShadow: shadow.sm }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.violet, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>CASE STUDY</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>AISI / CAISI Joint Evaluation: OpenAI o1</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>First published joint pre-deployment evaluation by US and UK safety institutes on a frontier model.</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Chip label="Cybersecurity" color={c.primary} />
                  <Chip label="CBRN" color={c.danger} />
                  <Chip label="Autonomy" color={c.violet} />
                </div>
              </div>
              <ComponentLabel name="Case Study Card" c={c} />
            </div>

            {/* Reflection card */}
            <div>
              <div style={{ background: c.violetSoft, border: `1px solid ${c.violetBorder}`, borderRadius: 16, padding: 20 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.violet, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 12 }}>✦ REFLECTION PROMPT</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 15, fontStyle: 'italic', color: c.textPrimary, lineHeight: 1.65, marginBottom: 12 }}>
                  "If a model's benchmark score is unchanged but its elicitation sensitivity doubles, has the safety risk increased? How would you document this finding?"
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.violet, cursor: 'pointer' }}>Write your response in the evidence log →</div>
              </div>
              <ComponentLabel name="Reflection Card" c={c} />
            </div>

            {/* Concept card */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, boxShadow: shadow.sm }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, background: c.tealSoft, border: `1px solid ${c.tealBorder}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Target size={16} color={c.teal} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.teal, fontWeight: 600, marginBottom: 5 }}>CONCEPT</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>Elicitation Sensitivity</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>The degree to which a model's apparent capability shifts under different prompting strategies, scaffolding levels, or tool access configurations.</div>
                  </div>
                </div>
              </div>
              <ComponentLabel name="Concept Card" c={c} />
            </div>
          </div>
        </Section>

        {/* ── LEARNING COMPONENTS ──────────────────────────── */}
        <Section label="LEARNING COMPONENTS" c={c}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Learning objectives */}
            <div>
              <div style={{ background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.primary, letterSpacing: '0.08em', marginBottom: 14 }}>LEARNING OBJECTIVES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Distinguish baseline prompting from scaffolded elicitation and explain why the distinction matters for evaluation validity',
                    'Design a structured elicitation protocol with at least three strategies for a given capability domain',
                    'Identify four sources of elicitation sensitivity that could invalidate an evaluation conclusion',
                  ].map((obj, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textPrimary, lineHeight: 1.55 }}>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ComponentLabel name="Learning Objective Block" c={c} />
            </div>

            {/* Mental model */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.teal}`, borderRadius: '0 12px 12px 0', padding: 20, boxShadow: shadow.sm }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.teal, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 10 }}>◈ MENTAL MODEL</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 19, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Elicitation changes conclusions</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, lineHeight: 1.65 }}>
                  A model's apparent capability is not a fixed property — it depends on how it is tested. Results change with prompting strategy, scaffolding depth, tool access, time budget, and the skill of the reviewer. An evaluation that does not specify its elicitation protocol cannot be compared to other evaluations.
                </div>
              </div>
              <ComponentLabel name="Mental Model Block" c={c} />
            </div>

            {/* Why this matters */}
            <div>
              <div style={{ background: c.warningSoft, border: `1px solid ${c.warningBorder}`, borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <AlertTriangle size={18} color={c.warning} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.warning, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>WHY THIS MATTERS</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textPrimary, lineHeight: 1.65 }}>
                      Multiple published evaluations of the same model reached opposite conclusions on cybersecurity capability because they used different elicitation protocols. Without a shared standard, evaluation results cannot be compared across labs, auditors, or time periods — making governance decisions unreliable.
                    </div>
                  </div>
                </div>
              </div>
              <ComponentLabel name="'Why This Matters' Block" c={c} />
            </div>
          </div>
        </Section>

        {/* ── BADGES & CHIPS ───────────────────────────────── */}
        <Section label="BADGES, CHIPS & LABELS" c={c}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {(['CRITICAL','HIGH','MEDIUM','LOW'] as RiskLevel[]).map(level => <RiskBadge key={level} level={level} c={c} />)}
              </div>
              <ComponentLabel name="Risk Badges" c={c} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                {[
                  { label: 'CAL-1', color: c.success },
                  { label: 'CAL-2', color: c.teal },
                  { label: 'CAL-3', color: c.warning },
                  { label: 'CAL-4', color: c.danger },
                  { label: 'CAL-5 CRITICAL', color: c.violet },
                ].map(t => <Chip key={t.label} label={t.label} color={t.color} />)}
              </div>
              <ComponentLabel name="Threshold Badges (Capability Autonomy Limit)" c={c} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                <MetricChip label="Task completion" value="34%" c={c} />
                <MetricChip label="Refusal rate" value="61%" c={c} />
                <MetricChip label="Confidence" value="0.87" c={c} />
                <MetricChip label="Evidence items" value="23" c={c} />
                <MetricChip label="Elicitation rounds" value="5 / 5" c={c} />
              </div>
              <ComponentLabel name="Metric Chips" c={c} />
            </div>
          </div>
        </Section>

        {/* ── INTERACTIVE COMPONENTS ───────────────────────── */}
        <Section label="INTERACTIVE COMPONENTS" c={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>

            {/* Expandable drawer */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden', boxShadow: shadow.sm }}>
                <button
                  onClick={() => setDrawerOpen(o => !o)}
                  style={{ width: '100%', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', borderBottom: drawerOpen ? `1px solid ${c.borderSubtle}` : 'none' }}
                >
                  <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>Red Team Finding #RT-047</span>
                  <ChevronDown size={16} color={c.textSecondary} style={{ transform: drawerOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {drawerOpen && (
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>
                      Model consistently assisted with organophosphate synthesis routes when prompts were framed as academic chemistry questions. Classified HIGH severity with CAL-3 threshold proximity.
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <RiskBadge level="HIGH" c={c} />
                      <Chip label="CBRN Domain" color={c.danger} />
                    </div>
                  </div>
                )}
              </div>
              <ComponentLabel name="Expandable Drawer" c={c} />
            </div>

            {/* Slider */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 20, boxShadow: shadow.sm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>Confidence threshold</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 700, color: sliderVal > 75 ? c.danger : sliderVal > 50 ? c.warning : c.success }}>{sliderVal}%</span>
                </div>
                <div
                  style={{ position: 'relative', height: 6, background: c.elevated, borderRadius: 999, cursor: 'pointer' }}
                  onClick={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setSliderVal(Math.max(0, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100))));
                  }}
                >
                  <div style={{ height: 6, width: `${sliderVal}%`, background: sliderVal > 75 ? c.danger : sliderVal > 50 ? c.warning : c.success, borderRadius: 999 }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${sliderVal}%`, transform: 'translate(-50%,-50%)', width: 16, height: 16, background: c.surface, border: `2px solid ${c.primary}`, borderRadius: '50%', boxShadow: shadow.sm }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.success }}>Conservative</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.danger }}>Aggressive</span>
                </div>
              </div>
              <ComponentLabel name="Slider Control" c={c} />
            </div>

            {/* Completion */}
            <div>
              <div style={{ background: c.successSoft, border: `1px solid ${c.successBorder}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={24} color="white" />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 700, color: c.textPrimary }}>Lesson Complete</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary }}>Elicitation Strategies — Module C, Lesson 3</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.success }}>+120 XP · Evidence log updated</div>
              </div>
              <ComponentLabel name="Completion State" c={c} />
            </div>

            {/* Locked state */}
            <div>
              <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', opacity: 0.72 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={22} color={c.textTertiary} />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 700, color: c.textSecondary }}>Module E Locked</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>Complete Module D to unlock Cyber & Software Evaluations</div>
              </div>
              <ComponentLabel name="Locked State" c={c} />
            </div>

            {/* Toast */}
            <div>
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: shadow.lg }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: c.dangerSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bell size={15} color={c.danger} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>Threshold Alert</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary }}>Model crosses CAL-3 threshold in 3 of 5 elicitation runs</div>
                </div>
                <X size={14} color={c.textTertiary} style={{ cursor: 'pointer' }} />
              </div>
              <ComponentLabel name="Toast Notification" c={c} />
            </div>

            {/* Retry */}
            <div>
              <div style={{ background: c.dangerSoft, border: `1px solid ${c.dangerBorder}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${c.danger}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RotateCcw size={22} color={c.danger} />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 700, color: c.textPrimary }}>2 / 3 Attempts Used</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary }}>Review the elicitation framework before retrying this quiz</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: '8px 20px', background: c.danger, color: 'white', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: fonts.sans, fontSize: 13, fontWeight: 600 }}>Try Again</button>
                  <button style={{ padding: '8px 16px', background: 'none', color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 10, cursor: 'pointer', fontFamily: fonts.sans, fontSize: 13 }}>Review Lesson</button>
                </div>
              </div>
              <ComponentLabel name="Retry State" c={c} />
            </div>
          </div>
        </Section>

        {/* ── DASHBOARD COMPONENTS ─────────────────────────── */}
        <Section label="DASHBOARD COMPONENTS" c={c}>
          {/* KPI tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { icon: <FileText size={18} />, value: '23',   label: 'Evidence Items',      color: c.primary },
              { icon: <AlertTriangle size={18} />, value: '4', label: 'Active Findings',   color: c.danger },
              { icon: <CheckCircle size={18} />,   value: '87%', label: 'Eval. Coverage',  color: c.success },
              { icon: <Activity size={18} />,      value: 'CAL-3', label: 'Threshold',     color: c.warning },
            ].map((kpi, i) => (
              <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 20px', boxShadow: shadow.sm }}>
                <div style={{ color: kpi.color, marginBottom: 10 }}>{kpi.icon}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: c.textPrimary }}>{kpi.value}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, marginTop: 4 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Risk matrix */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 20, boxShadow: shadow.sm }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 16 }}>Risk Matrix — Pre-Deployment Evaluation</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Y-axis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'flex-end' }}>
                {['Catastrophic','Severe','Moderate','Minimal'].map(l => (
                  <div key={l} style={{ height: 36, display: 'flex', alignItems: 'center', fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, width: 72 }}>{l}</div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
                  {[
                    ['#FEE2E2','#FEE2E2','#FEE2E2','#FEE2E2'],
                    ['#FEF3C7','#FEE2E2','#FEE2E2','#FEE2E2'],
                    ['#DCFCE7','#FEF3C7','#FEE2E2','#FEE2E2'],
                    ['#DCFCE7','#DCFCE7','#FEF3C7','#FEF3C7'],
                  ].map((row, ri) => row.map((cell, ci) => (
                    <div key={`${ri}-${ci}`} style={{ height: 36, background: cell, borderRadius: 4, opacity: dark ? 0.55 : 0.9 }} />
                  )))}
                </div>
                <div style={{ display: 'flex', gap: 0, marginTop: 4 }}>
                  {['Unlikely','Possible','Likely','Almost certain'].map(l => (
                    <div key={l} style={{ flex: 1, fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, textAlign: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'flex-end' }}>
              {[{l:'Low',bg:'#DCFCE7'},{l:'Medium',bg:'#FEF3C7'},{l:'High',bg:'#FEE2E2'}].map(e => (
                <div key={e.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, background: e.bg, borderRadius: 2 }} />
                  <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{e.l}</span>
                </div>
              ))}
            </div>
          </div>
          <ComponentLabel name="KPI Tiles + Risk Matrix" c={c} />
        </Section>
      </div>
    </div>
  );
}
