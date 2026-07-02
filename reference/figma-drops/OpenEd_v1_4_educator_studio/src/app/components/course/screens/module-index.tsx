import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES } from '../course-types';
import type { ModuleId } from '../course-types';
import { CheckCircle2, Lock, ChevronRight, FileText, Cpu, HelpCircle, Layers } from 'lucide-react';

type FilterTab = 'all' | 'completed' | 'in-progress' | 'locked';

export function ModuleIndexScreen({ state, navigate, update }: ScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [hoveredCard, setHoveredCard] = useState<ModuleId | null>(null);
  const c = C(state.dark);

  const getStatus = (id: ModuleId) => {
    if (state.completedModules.includes(id)) return 'completed';
    if ((state.moduleProgress[id] || 0) > 0) return 'in-progress';
    return 'locked';
  };

  const filteredModules = MODULES.filter(mod => {
    if (activeFilter === 'all') return true;
    return getStatus(mod.id) === activeFilter;
  });

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All Modules' },
    { id: 'completed', label: `Completed (${state.completedModules.length})` },
    { id: 'in-progress', label: `In Progress (${MODULES.filter(m => getStatus(m.id) === 'in-progress').length})` },
    { id: 'locked', label: `Locked (${MODULES.filter(m => getStatus(m.id) === 'locked').length})` },
  ];

  const handleCTA = (id: ModuleId) => {
    const status = getStatus(id);
    if (status === 'locked') return;
    update({ currentModuleId: id });
    navigate('module');
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans, padding: '32px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>
          Frontier Model Evaluation
        </div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: c.textPrimary }}>All Modules</h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: c.textSecondary }}>
          9 modules · 51 hours · 9 evaluation artifacts
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: c.elevated, borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: fonts.sans,
              background: activeFilter === tab.id ? c.surface : 'transparent',
              color: activeFilter === tab.id ? c.textPrimary : c.textSecondary,
              boxShadow: activeFilter === tab.id ? shadow.sm : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {filteredModules.map(mod => {
          const status = getStatus(mod.id);
          const progress = state.moduleProgress[mod.id] || 0;
          const isHovered = hoveredCard === mod.id;
          const isLocked = status === 'locked';

          return (
            <div
              key={mod.id}
              onMouseEnter={() => setHoveredCard(mod.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: c.surface,
                border: `1px solid ${isHovered ? mod.color : c.border}`,
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: isHovered ? shadow.lg : shadow.sm,
                transition: 'all 0.18s ease',
                opacity: isLocked ? 0.65 : 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Colored top band */}
              <div style={{ background: mod.color, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{mod.id}</span>
                  {isLocked && <Lock size={14} color="rgba(255,255,255,0.7)" />}
                  {status === 'completed' && <CheckCircle2 size={14} color="rgba(255,255,255,0.9)" />}
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 20,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.03em',
                }}>
                  {mod.difficulty}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, lineHeight: 1.3, marginBottom: 4 }}>{mod.title}</div>
                  <div style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.4 }}>{mod.subtitle}</div>
                </div>

                {/* Duration + lessons */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: c.textTertiary }}>
                    <span style={{ fontWeight: 700, color: c.textSecondary }}>{mod.hours}h</span> · {mod.lessons.length} lessons
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <FileText size={11} color={c.textTertiary} />
                    <Cpu size={11} color={c.textTertiary} />
                    <HelpCircle size={11} color={c.textTertiary} />
                    <Layers size={11} color={c.textTertiary} />
                  </div>
                </div>

                <p style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.55, margin: '0 0 12px', flex: 0 }}>
                  {mod.description.slice(0, 120)}{mod.description.length > 120 ? '…' : ''}
                </p>

                {/* Skills */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Skills earned</div>
                  {mod.skills.map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 3 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: mod.color, marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: c.textSecondary, lineHeight: 1.4 }}>{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: c.textTertiary }}>Progress</span>
                    <span style={{ color: mod.color, fontWeight: 700 }}>{progress}%</span>
                  </div>
                  <div style={{ height: 5, background: c.borderSubtle, borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: mod.color, borderRadius: 99, transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                {/* Artifact chip */}
                <div style={{ marginBottom: 14 }}>
                  <span style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    background: c.elevated,
                    border: `1px solid ${c.border}`,
                    borderRadius: 5,
                    padding: '3px 8px',
                    color: c.textTertiary,
                  }}>
                    Required: {mod.artifact}
                  </span>
                </div>

                {/* Status badge + CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: status === 'completed' ? c.successSoft : status === 'in-progress' ? c.warningSoft : c.elevated,
                    color: status === 'completed' ? c.success : status === 'in-progress' ? c.warning : c.textTertiary,
                    border: `1px solid ${status === 'completed' ? c.successBorder : status === 'in-progress' ? c.warningBorder : c.border}`,
                  }}>
                    {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Locked'}
                  </div>
                  <button
                    onClick={() => handleCTA(mod.id)}
                    disabled={isLocked}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '7px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      fontFamily: fonts.sans,
                      transition: 'all 0.15s ease',
                      border: status === 'completed' ? `1px solid ${c.border}` : 'none',
                      background: status === 'completed' ? 'transparent' : isLocked ? c.elevated : mod.color,
                      color: status === 'completed' ? c.textSecondary : isLocked ? c.textTertiary : '#fff',
                    }}
                  >
                    {status === 'completed' ? 'Review' : isLocked ? 'Locked' : 'Continue'}
                    {!isLocked && <ChevronRight size={14} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: c.textTertiary, fontSize: 15 }}>
          No modules in this category yet.
        </div>
      )}
    </div>
  );
}
