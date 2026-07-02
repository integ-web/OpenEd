import { useState } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router';
import {
  Shield, Moon, Sun, Bell, LayoutDashboard, Map, BookOpen,
  FileText, Package, BarChart3, GraduationCap, ChevronRight,
} from 'lucide-react';
import { C, fonts, shadow } from '../fme/types';
import {
  INITIAL_STATE, MODULES, TOTAL_HOURS,
  type CourseState, type ScreenId, type ScreenProps,
} from './course-types';

// ── Screen imports ────────────────────────────────────────────────────────────
import { LandingScreen }        from './screens/landing';
import { OnboardingScreen }     from './screens/onboarding';
import { DiagnosticScreen }     from './screens/diagnostic';
import { DashboardScreen }      from './screens/dashboard';
import { LearningMapScreen }    from './screens/learning-map';
import { ModuleIndexScreen }    from './screens/module-index';
import { ModuleDetailScreen }   from './screens/module-detail';
import { LessonScreen }         from './screens/lesson';
import { CaseStudyScreen }      from './screens/case-study';
import { SimulationScreen }     from './screens/simulation';
import { QuizScreen }           from './screens/quiz';
import { EvidenceLibraryScreen }from './screens/evidence-library';
import { BenchmarkBuilderScreen }from './screens/benchmark-builder';
import { RiskDashboardScreen }  from './screens/risk-dashboard';
import { CapstoneScreen }       from './screens/capstone';
import { PortfolioScreen }      from './screens/portfolio';
import { CertificateScreen }    from './screens/certificate';

// ── Screen registry ───────────────────────────────────────────────────────────
const SCREENS: Record<ScreenId, React.FC<ScreenProps>> = {
  landing:     LandingScreen,
  onboarding:  OnboardingScreen,
  diagnostic:  DiagnosticScreen,
  dashboard:   DashboardScreen,
  map:         LearningMapScreen,
  modules:     ModuleIndexScreen,
  module:      ModuleDetailScreen,
  lesson:      LessonScreen,
  'case-study': CaseStudyScreen,
  simulation:  SimulationScreen,
  quiz:        QuizScreen,
  evidence:    EvidenceLibraryScreen,
  benchmark:   BenchmarkBuilderScreen,
  risk:        RiskDashboardScreen,
  capstone:    CapstoneScreen,
  portfolio:   PortfolioScreen,
  certificate: CertificateScreen,
};

// Screens that render full-screen without the shell chrome
const FULL_SCREEN: ScreenId[] = ['landing', 'onboarding', 'diagnostic', 'certificate'];

// ── Top Navigation ────────────────────────────────────────────────────────────
function TopNav({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const pct = Math.round((state.hoursCompleted / TOTAL_HOURS) * 100);
  const currentMod = MODULES.find(m => m.id === state.currentModuleId);

  return (
    <header style={{
      height: 52, flexShrink: 0,
      background: c.surface, borderBottom: `1px solid ${c.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 16,
      boxShadow: shadow.sm,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
      >
        <div style={{ width: 28, height: 28, background: '#1D4ED8', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 6px rgba(29,78,216,0.35)' }}>
          <Shield size={14} color="white" />
        </div>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: c.primary, letterSpacing: '0.06em' }}>FME</span>
      </div>

      <div style={{ width: 1, height: 20, background: c.border }} />

      {/* Current context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
        <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, cursor: 'pointer' }} onClick={() => navigate('modules')}>
          Module {currentMod?.id}
        </span>
        <ChevronRight size={12} color={c.textTertiary} />
        <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: c.textPrimary }}>
          {state.screen === 'lesson' ? currentMod?.lessons[state.currentLessonIndex] ?? 'Lesson' : state.screen.charAt(0).toUpperCase() + state.screen.slice(1)}
        </span>
      </div>

      {/* Progress pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 120, height: 5, background: c.elevated, borderRadius: 999 }}>
          <div style={{ height: 5, width: `${pct}%`, background: c.primary, borderRadius: 999 }} />
        </div>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary, whiteSpace: 'nowrap' }}>
          {state.hoursCompleted.toFixed(1)}h / {TOTAL_HOURS}h
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <button
          onClick={() => update({ dark: !state.dark })}
          style={{ width: 30, height: 30, borderRadius: 7, background: c.elevated, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {state.dark ? <Sun size={13} color={c.primary} /> : <Moon size={13} color={c.textSecondary} />}
        </button>

        <button style={{ width: 30, height: 30, borderRadius: 7, background: c.elevated, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <Bell size={13} color={c.textSecondary} />
          <div style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: c.danger, border: `1.5px solid ${c.surface}` }} />
        </button>

        <div
          style={{ width: 30, height: 30, borderRadius: '50%', background: c.primarySoft, border: `2px solid ${c.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          title={state.learnerName}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: c.primary }}>
            {state.learnerName.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}

// ── Left sidebar rail ─────────────────────────────────────────────────────────
function LeftRail({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const routerNav = useRouterNavigate();

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard',    icon: <LayoutDashboard size={14} /> },
    { id: 'map',       label: 'Learning Map', icon: <Map size={14} /> },
    { id: 'modules',   label: 'All Modules',  icon: <BookOpen size={14} /> },
  ];

  const toolItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'evidence',  label: 'Evidence Library',   icon: <FileText size={14} /> },
    { id: 'benchmark', label: 'Benchmark Builder',  icon: <Package size={14} /> },
    { id: 'risk',      label: 'Risk Dashboard',     icon: <BarChart3 size={14} /> },
  ];

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: c.surface, borderRight: `1px solid ${c.border}`,
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Course nav */}
      <div style={{ padding: '14px 10px 6px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.12em', padding: '0 8px', marginBottom: 4 }}>NAVIGATE</div>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', marginBottom: 1,
              background: state.screen === item.id ? c.primarySoft : 'transparent',
              border: 'none',
              borderRadius: 7,
              borderLeft: state.screen === item.id ? `3px solid ${c.primary}` : '3px solid transparent',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: state.screen === item.id ? c.primary : c.textTertiary }}>{item.icon}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: state.screen === item.id ? 600 : 400, color: state.screen === item.id ? c.primary : c.textSecondary }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Module progress */}
      <div style={{ padding: '12px 10px 4px', borderTop: `1px solid ${c.borderSubtle}` }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.12em', padding: '0 8px', marginBottom: 8 }}>MODULES</div>
        {MODULES.map(mod => {
          const prog = state.moduleProgress[mod.id];
          const done = state.completedModules.includes(mod.id);
          const isCurrent = state.currentModuleId === mod.id;
          return (
            <div
              key={mod.id}
              onClick={() => { update({ currentModuleId: mod.id }); navigate('module'); }}

              style={{ padding: '6px 8px', borderRadius: 7, cursor: 'pointer', marginBottom: 2, background: isCurrent ? `${mod.color}12` : 'transparent' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontFamily: fonts.sans, fontSize: 12, color: done ? c.success : isCurrent ? mod.color : c.textTertiary, fontWeight: isCurrent ? 600 : 400 }}>
                  {mod.id}. {mod.title.split(' ').slice(0, 3).join(' ')}…
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{prog}%</span>
              </div>
              <div style={{ height: 3, background: c.elevated, borderRadius: 999 }}>
                <div style={{ height: 3, width: `${prog}%`, background: done ? c.success : isCurrent ? mod.color : c.border, borderRadius: 999 }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tools */}
      <div style={{ padding: '12px 10px', borderTop: `1px solid ${c.borderSubtle}`, marginTop: 'auto' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.12em', padding: '0 8px', marginBottom: 4 }}>TOOLS</div>
        {toolItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 10px', marginBottom: 1,
              background: state.screen === item.id ? c.primarySoft : 'transparent',
              border: 'none', borderRadius: 7,
              borderLeft: state.screen === item.id ? `3px solid ${c.primary}` : '3px solid transparent',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: state.screen === item.id ? c.primary : c.textTertiary }}>{item.icon}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 12, color: state.screen === item.id ? c.primary : c.textSecondary, fontWeight: state.screen === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
        {/* Capstone Studio — routes to the URL-based dossier builder */}
        <button
          onClick={() => routerNav('/capstone/brief')}
          style={{
            width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 10px', marginBottom: 1,
            background: 'transparent',
            border: 'none', borderRadius: 7,
            borderLeft: '3px solid transparent',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: c.textTertiary }}><GraduationCap size={14} /></span>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary }}>Capstone Studio</span>
          <span style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary }}>↗</span>
        </button>
      </div>
    </aside>
  );
}

// ── Main shell ────────────────────────────────────────────────────────────────
export function CourseShell() {
  const [state, setState] = useState<CourseState>(INITIAL_STATE);

  const navigate = (screen: ScreenId) => setState(s => ({ ...s, screen }));
  const update = (updates: Partial<CourseState>) => setState(s => ({ ...s, ...updates }));

  const props: ScreenProps = { state, navigate, update };
  const Screen = SCREENS[state.screen];
  const c = C(state.dark);

  if (FULL_SCREEN.includes(state.screen)) {
    return (
      <div style={{ height: '100vh', background: c.bg, overflowY: 'auto' }}>
        <Screen {...props} />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <TopNav {...props} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftRail {...props} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Screen {...props} />
        </main>
      </div>
    </div>
  );
}
