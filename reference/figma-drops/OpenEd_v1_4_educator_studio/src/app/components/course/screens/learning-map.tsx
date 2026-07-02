import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES, TOTAL_HOURS } from '../course-types';
import type { PhaseId } from '../course-types';

export function LearningMapScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const [expanded, setExpanded] = useState<PhaseId | null>(null);

  const pct = Math.round((state.hoursCompleted / TOTAL_HOURS) * 100);

  const getStatus = (id: PhaseId) => {
    if (state.completedModules.includes(id)) return 'done';
    if ((state.moduleProgress[id] ?? 0) > 0) return 'active';
    return 'upcoming';
  };

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 40px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>Learning map</p>
          <h1 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 6px', lineHeight: 1.2 }}>
            Six phases to evaluation competence
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, margin: '0 0 20px' }}>
            51 hours · 6 portfolio artifacts · 1 capstone decision
          </p>
          {/* Overall progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 480 }}>
            <div style={{ flex: 1, height: 6, background: c.elevated, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: 6, width: `${pct}%`, background: blue, borderRadius: 999, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary, flexShrink: 0 }}>{pct}% · {state.hoursCompleted.toFixed(1)}h of {TOTAL_HOURS}h</span>
          </div>
        </div>

        {/* Phase cards — vertical path */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {MODULES.map((phase, idx) => {
            const status = getStatus(phase.id);
            const prog = state.moduleProgress[phase.id] ?? 0;
            const isExpanded = expanded === phase.id;
            const isCurrent = state.currentModuleId === phase.id;

            const statusColor = status === 'done' ? (state.dark ? '#4ADE80' : '#15803D') : status === 'active' ? phase.color : c.textTertiary;
            const statusLabel = status === 'done' ? 'Complete' : status === 'active' ? 'In progress' : 'Upcoming';

            return (
              <div key={phase.id}>
                {/* Connector line */}
                {idx > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'center', height: 24 }}>
                    <div style={{ width: 2, height: '100%', background: idx <= MODULES.findIndex(m => m.id === state.currentModuleId) ? blue : c.border }} />
                  </div>
                )}

                <div style={{ background: c.surface, border: `2px solid ${isCurrent ? phase.color : status === 'done' ? (state.dark ? 'rgba(74,222,128,0.3)' : '#BBF7D0') : c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: isCurrent ? shadow.md : shadow.sm }}>
                  {/* Phase color band */}
                  <div style={{ height: 4, background: phase.color }} />

                  {/* Main card row */}
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>

                      {/* Phase number */}
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${phase.color}14`, border: `2px solid ${phase.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 800, color: phase.color }}>{phase.id}</span>
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                          <div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                              <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: statusColor, background: `${statusColor}14`, padding: '2px 8px', borderRadius: 999, border: `1px solid ${statusColor}28` }}>{statusLabel}</span>
                              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{phase.hours}h · {phase.lessonCount} lessons · {phase.difficulty}</span>
                            </div>
                            <h2 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: c.textPrimary, margin: '0 0 4px', lineHeight: 1.2 }}>{phase.title}</h2>
                            <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.55 }}>{phase.description}</p>
                          </div>

                          {/* CTA */}
                          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                            <button
                              onClick={() => { update({ currentModuleId: phase.id }); navigate('module'); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, background: status === 'upcoming' ? c.elevated : phase.color, color: status === 'upcoming' ? c.textSecondary : '#fff', border: `1px solid ${status === 'upcoming' ? c.border : 'transparent'}`, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                            >
                              {status === 'done' ? 'Review' : status === 'active' ? 'Continue' : 'Preview'} <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        {status !== 'upcoming' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                            <div style={{ flex: 1, height: 4, background: c.elevated, borderRadius: 999, overflow: 'hidden' }}>
                              <div style={{ height: 4, width: `${prog}%`, background: phase.color, borderRadius: 999 }} />
                            </div>
                            <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, flexShrink: 0 }}>{prog}%</span>
                          </div>
                        )}

                        {/* Artifact tag */}
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
                          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: state.dark ? '#2DD4BF' : '#0F766E', background: state.dark ? 'rgba(45,212,191,0.1)' : '#CCFBF1', padding: '2px 8px', borderRadius: 999, border: `1px solid ${state.dark ? 'rgba(45,212,191,0.22)' : '#99F6E4'}` }}>
                            Artifact: {phase.artifact}
                          </span>
                          {/* Expand toggle */}
                          <button
                            onClick={() => setExpanded(isExpanded ? null : phase.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, background: 'none', border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, cursor: 'pointer' }}
                          >
                            {isExpanded ? <><ChevronUp size={11} /> Hide lessons</> : <><ChevronDown size={11} /> {phase.lessonCount} lessons</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lesson list — expandable */}
                  {isExpanded && (
                    <div style={{ borderTop: `1px solid ${c.border}`, padding: '14px 24px 18px', background: c.elevated }}>
                      <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 10px' }}>Lessons</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {phase.lessons.map((lesson, li) => {
                          const done = isCurrent && li < state.currentLessonIndex;
                          const active = isCurrent && li === state.currentLessonIndex;
                          return (
                            <div key={li} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: active ? `${phase.color}10` : 'transparent', border: `1px solid ${active ? `${phase.color}22` : 'transparent'}` }}>
                              <div style={{ width: 20, height: 20, borderRadius: '50%', background: done ? (state.dark ? 'rgba(74,222,128,0.14)' : '#DCFCE7') : active ? `${phase.color}18` : c.surface, border: `1px solid ${done ? (state.dark ? 'rgba(74,222,128,0.28)' : '#BBF7D0') : active ? `${phase.color}35` : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: done ? (state.dark ? '#4ADE80' : '#15803D') : active ? phase.color : c.textTertiary }}>{done ? '✓' : li + 1}</span>
                              </div>
                              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: done ? c.textTertiary : active ? c.textPrimary : c.textSecondary, flex: 1, textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>{lesson}</span>
                              {active && (
                                <button onClick={() => navigate('lesson')} style={{ fontFamily: fonts.sans, fontSize: 12, color: phase.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                                  Continue →
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Capstone node */}
          <div style={{ display: 'flex', justifyContent: 'center', height: 24 }}>
            <div style={{ width: 2, height: '100%', background: c.border }} />
          </div>
          <div style={{ background: c.surface, border: `2px solid ${c.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, opacity: state.completedModules.length < 6 ? 0.55 : 1 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: c.elevated, border: `2px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 800, color: c.textTertiary }}>CAP</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 700, color: c.textPrimary, margin: '0 0 4px' }}>Capstone · Aster-3 Deployment Decision</p>
              <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.5 }}>Complete all six phases to unlock. Produce a governance-ready deployment recommendation with evidence cards, threat analysis, and risk thresholds.</p>
            </div>
            <button
              onClick={() => navigate('capstone')}
              style={{ padding: '9px 18px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: state.completedModules.length < 6 ? 'not-allowed' : 'pointer', flexShrink: 0 }}
            >
              {state.completedModules.length < 6 ? `${6 - state.completedModules.length} phases remaining` : 'Open capstone →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
