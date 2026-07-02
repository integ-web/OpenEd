import { ArrowRight, Play, Target, Sparkles, CheckCircle, ChevronRight } from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES, TOTAL_HOURS, getModule } from '../course-types';

export function DashboardScreen({ state, navigate }: ScreenProps) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const violet = state.dark ? '#A78BFA' : '#6D28D9';
  const teal = state.dark ? '#2DD4BF' : '#0F766E';
  const mod = getModule(state.currentModuleId);
  const pct = Math.round((state.hoursCompleted / TOTAL_HOURS) * 100);
  const currentLesson = mod.lessons[state.currentLessonIndex] ?? mod.lessons[0];

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 36px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>

        {/* Greeting */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Frontier Evaluation Lab
          </p>
          <h1 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: c.textPrimary, margin: '0 0 4px', lineHeight: 1.2 }}>
            Welcome back, {state.learnerName}
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textTertiary, margin: 0 }}>
            Phase {mod.id.slice(1)} of 6 · {state.hoursCompleted.toFixed(1)}h of {TOTAL_HOURS}h completed
          </p>
        </div>

        {/* Row 1: Continue + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, marginBottom: 16 }}>

          {/* Continue learning card */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
            <div style={{ height: 4, background: mod.color }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: mod.color, background: `${mod.color}14`, padding: '2px 8px', borderRadius: 999 }}>{mod.id}</span>
                <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>{mod.title}</span>
                <span style={{ color: c.textTertiary }}>·</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>Lesson {state.currentLessonIndex + 1} of {mod.lessonCount}</span>
              </div>
              <h2 style={{ fontFamily: fonts.display, fontSize: 19, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px', lineHeight: 1.3 }}>
                {currentLesson}
              </h2>
              <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, margin: '0 0 18px', lineHeight: 1.6 }}>
                {mod.subtitle}
              </p>

              {/* Video progress */}
              <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, padding: '11px 14px', marginBottom: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: state.dark ? 'rgba(96,165,250,0.1)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={15} color={blue} style={{ marginLeft: 2 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: c.textPrimary, margin: '0 0 4px' }}>From Vague Risk to Evaluation Objective</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1, height: 3, background: c.border, borderRadius: 999 }}>
                      <div style={{ height: 3, width: '0%', background: blue, borderRadius: 999 }} />
                    </div>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, flexShrink: 0 }}>0 / 22 min</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => navigate('lesson')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Continue lesson <ArrowRight size={14} />
                </button>
                <button onClick={() => navigate('module')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer' }}>
                  Phase overview <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: AI coach + artifact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* AI Coach nudge */}
            <div style={{ background: c.surface, border: `1px solid ${state.dark ? 'rgba(167,139,250,0.22)' : '#DDD6FE'}`, borderRadius: 14, padding: '16px 18px', boxShadow: shadow.sm, flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: state.dark ? 'rgba(167,139,250,0.14)' : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={12} color={violet} />
                </div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, margin: 0 }}>AI Coach</p>
              </div>
              <p style={{ fontFamily: fonts.serif, fontSize: 13, color: c.textSecondary, margin: '0 0 10px', lineHeight: 1.65, fontStyle: 'italic' }}>
                "Before the video, try naming one actor, one capability, and one harm pathway for today's lesson. Then compare with the worked example."
              </p>
              <button onClick={() => navigate('lesson')} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: fonts.sans, fontSize: 12, color: violet, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                Open in lesson <ArrowRight size={12} />
              </button>
            </div>

            {/* Artifact checkpoint */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 18px', boxShadow: shadow.sm }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: state.dark ? 'rgba(96,165,250,0.1)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Target size={12} color={blue} />
                </div>
                <p style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>Next artifact</p>
              </div>
              <p style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, margin: '0 0 4px' }}>Evaluation Objective Card</p>
              <p style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, margin: '0 0 10px', lineHeight: 1.5 }}>Required for Phase 1 rubric and capstone.</p>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div style={{ flex: 1, height: 3, background: c.elevated, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: 3, width: `${(state.artifactsCreated.length / 6) * 100}%`, background: teal, borderRadius: 999 }} />
                </div>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{state.artifactsCreated.length}/6 saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Progress + Capstone readiness */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Course progress */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 14px' }}>Course progress</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 30, fontWeight: 700, color: blue }}>{pct}%</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>of {TOTAL_HOURS} hours</span>
            </div>
            <div style={{ height: 6, background: c.elevated, borderRadius: 999, marginBottom: 14, overflow: 'hidden' }}>
              <div style={{ height: 6, width: `${pct}%`, background: blue, borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {MODULES.map(m => {
                const prog = state.moduleProgress[m.id];
                const isCur = m.id === state.currentModuleId;
                return (
                  <div key={m.id} onClick={() => navigate('module')} title={`${m.id}: ${m.title} (${prog}%)`} style={{ flex: 1, cursor: 'pointer' }}>
                    <div style={{ height: 4, borderRadius: 2, background: isCur ? m.color : prog > 0 ? `${m.color}55` : c.elevated }} />
                    <p style={{ fontFamily: fonts.mono, fontSize: 9, color: isCur ? m.color : c.textTertiary, margin: '4px 0 0', textAlign: 'center' }}>{m.id}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capstone readiness */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', boxShadow: shadow.sm }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 14px' }}>Capstone readiness</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 30, fontWeight: 700, color: c.textTertiary }}>{state.capstoneProgress}%</span>
            </div>
            <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: '0 0 14px', lineHeight: 1.5 }}>Complete all six phases to unlock the Aster-3 capstone decision.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {([
                { label: 'Evidence cards (min. 3)', met: state.evidenceCards.length >= 3 },
                { label: 'Phase 1 artifact saved', met: state.artifactsCreated.length > 0 },
                { label: 'Phase 1 complete', met: state.completedModules.includes('P1') },
              ] as const).map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle size={13} color={g.met ? (state.dark ? '#4ADE80' : '#15803D') : c.textTertiary} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, color: g.met ? c.textPrimary : c.textTertiary }}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Phase path */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '18px 22px', boxShadow: shadow.sm }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0 }}>Six-phase path</p>
            <button onClick={() => navigate('map')} style={{ fontFamily: fonts.sans, fontSize: 12, color: blue, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Full map →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {MODULES.map((m, i) => {
              const prog = state.moduleProgress[m.id];
              const isCur = m.id === state.currentModuleId;
              const done = state.completedModules.includes(m.id);
              return (
                <div key={m.id} onClick={() => navigate('module')} style={{ flexShrink: 0, width: 140, padding: '12px 14px', background: isCur ? `${m.color}0E` : c.elevated, border: `1px solid ${isCur ? `${m.color}30` : c.border}`, borderRadius: 10, cursor: 'pointer', opacity: !done && !isCur && prog === 0 && i > 0 ? 0.55 : 1 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: done ? (state.dark ? '#4ADE80' : '#15803D') : isCur ? m.color : c.textTertiary }}>{done ? '✓' : m.id}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{m.hours}h</span>
                  </div>
                  <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: isCur ? m.color : c.textSecondary, margin: '0 0 6px', lineHeight: 1.3 }}>{m.title}</p>
                  <div style={{ height: 3, background: c.border, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: 3, width: `${prog}%`, background: done ? (state.dark ? '#4ADE80' : '#15803D') : m.color, borderRadius: 999 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
