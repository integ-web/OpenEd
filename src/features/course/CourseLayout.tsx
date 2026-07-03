import { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate as useRouterNavigate } from 'react-router';
import {
  Shield, Moon, Sun, LayoutDashboard, Map, BookOpen,
  FileText, Package, BarChart3, GraduationCap,
  Library, FlaskConical, User, ClipboardCheck, LogOut, Settings, TrendingUp, ChevronDown,
} from 'lucide-react';
import { C, fonts, shadow } from '../fme/types';
import { MODULES, TOTAL_HOURS, type ScreenId, type PhaseId } from './course-types';
import { useCourse, PATH_TO_SCREEN } from './CourseContext';
import { useAuth } from '../../app/providers';

function useActiveScreen(): ScreenId | null {
  const { pathname } = useLocation();
  if (PATH_TO_SCREEN[pathname]) return PATH_TO_SCREEN[pathname];
  for (const [path, screen] of Object.entries(PATH_TO_SCREEN)) {
    if (pathname.startsWith(path + '/')) return screen;
  }
  return null;
}

// ── User Profile Dropdown ──────────────────────────────────────────────────────
function UserProfileMenu({ dark }: { dark: boolean }) {
  const { user, signOut } = useAuth();
  const { navigate } = useCourse();
  const routerNav = useRouterNavigate();
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const email = user?.email ?? '';
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? '';
  const initials = fullName
    ? fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : email.slice(0, 2).toUpperCase();

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    routerNav('/');
  }

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        title={email}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 8px 0 4px',
          borderRadius: 8, border: `1px solid ${open ? c.primaryBorder : c.border}`,
          background: open ? c.primarySoft : c.elevated,
          cursor: 'pointer', transition: 'all 0.12s',
        }}
      >
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: dark ? 'rgba(96,165,250,0.2)' : '#EFF6FF',
          border: `1.5px solid ${dark ? 'rgba(96,165,250,0.35)' : '#BFDBFE'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue }}>{initials}</span>
        </div>
        <ChevronDown size={12} color={c.textTertiary} style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 6,
          background: c.surface, border: `1px solid ${c.border}`,
          borderRadius: 12, padding: '8px 0', minWidth: 220,
          boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 200,
        }}>
          {/* Email header */}
          <div style={{ padding: '8px 16px 12px', borderBottom: `1px solid ${c.border}` }}>
            {fullName && <p style={{ fontFamily: fonts.display, fontSize: 13, fontWeight: 600, color: c.textPrimary, margin: '0 0 2px' }}>{fullName}</p>}
            <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
          </div>

          {/* Menu items */}
          {[
            { icon: <TrendingUp size={14} />, label: 'My progress', action: () => { setOpen(false); navigate('dashboard'); } },
            { icon: <Settings size={14} />, label: 'Settings', action: () => { setOpen(false); } },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: c.textSecondary, fontFamily: fonts.sans,
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : '#F1F5F9')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ color: c.textTertiary }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div style={{ height: 1, background: c.border, margin: '4px 0' }} />

          <button onClick={handleSignOut} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontFamily: fonts.sans,
            color: dark ? '#F43F5E' : '#BE123C',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = dark ? 'rgba(244,63,94,0.1)' : '#FFF1F2')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Top Nav ───────────────────────────────────────────────────────────────────
function TopNav() {
  const { state, update, navigate } = useCourse();
  const c = C(state.dark);
  const pct = Math.round((state.hoursCompleted / TOTAL_HOURS) * 100);
  const currentPhase = MODULES.find(m => m.id === state.currentModuleId);
  const active = useActiveScreen();
  const blue = state.dark ? '#60A5FA' : '#2563EB';

  const crumbTitle = active === 'lesson'
    ? (currentPhase?.lessons[state.currentLessonIndex] ?? 'Lesson')
    : active
      ? active.charAt(0).toUpperCase() + active.slice(1).replace(/-/g, ' ')
      : 'Course';

  return (
    <header style={{
      height: 64, flexShrink: 0,
      background: c.surface, borderBottom: `1px solid ${c.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 20,
      zIndex: 50, position: 'relative',
    }}>
      {/* Logo */}
      <div onClick={() => navigate('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, background: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
          <Shield size={15} color="#fff" />
        </div>
        <span style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: blue, letterSpacing: '-0.01em' }}>
          Frontier Evaluation Lab
        </span>
      </div>

      <div style={{ width: 1, height: 24, background: c.border, flexShrink: 0 }} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
        {currentPhase && (
          <span
            style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary, cursor: 'pointer', flexShrink: 0 }}
            onClick={() => navigate('modules')}
          >
            Phase {currentPhase.id.slice(1)} · {currentPhase.title}
          </span>
        )}
        {active === 'lesson' && currentPhase && (
          <>
            <span style={{ color: c.textTertiary }}>›</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: c.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {crumbTitle}
            </span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 140, height: 4, background: c.elevated, borderRadius: 999 }}>
          <div style={{ height: 4, width: `${pct}%`, background: blue, borderRadius: 999 }} />
        </div>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, whiteSpace: 'nowrap' }}>
          {state.hoursCompleted.toFixed(1)}h / {TOTAL_HOURS}h
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
        <button
          onClick={() => update({ dark: !state.dark })}
          title={state.dark ? 'Light mode' : 'Dark mode'}
          style={{ width: 34, height: 34, borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {state.dark ? <Sun size={14} color={blue} /> : <Moon size={14} color={c.textSecondary} />}
        </button>
        <UserProfileMenu dark={state.dark} />
      </div>
    </header>
  );
}

// ── Expandable Left Rail ───────────────────────────────────────────────────────
function LeftRail() {
  const { state, navigate } = useCourse();
  const routerNav = useRouterNavigate();
  const c = C(state.dark);
  const active = useActiveScreen();
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov] = useState<string | null>(null);

  type NavItem = { id: ScreenId; label: string; icon: React.ReactNode };

  const primary: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard',      icon: <LayoutDashboard size={18} /> },
    { id: 'map',       label: 'Learning Map',   icon: <Map size={18} /> },
    { id: 'modules',   label: 'All Phases',     icon: <BookOpen size={18} /> },
    { id: 'lesson',    label: 'Current Lesson', icon: <FlaskConical size={18} /> },
  ];

  const tools: NavItem[] = [
    { id: 'evidence',   label: 'Evidence Library',  icon: <FileText size={18} /> },
    { id: 'sources',    label: 'Source Library',    icon: <Library size={18} /> },
    { id: 'benchmark',  label: 'Benchmark Builder', icon: <Package size={18} /> },
    { id: 'risk',       label: 'Risk Dashboard',    icon: <BarChart3 size={18} /> },
    { id: 'glossary',   label: 'Glossary',          icon: <BookOpen size={18} /> },
    { id: 'content-qa', label: 'Content QA',        icon: <ClipboardCheck size={18} /> },
  ];

  const btn = (id: string, label: string, icon: React.ReactNode, onClick: () => void) => {
    const isActive = active === id;
    const isHov = hov === id;
    return (
      <button
        key={id}
        onClick={onClick}
        onMouseEnter={() => setHov(id)}
        onMouseLeave={() => setHov(null)}
        title={expanded ? undefined : label}
        style={{
          width: '100%', height: 44,
          display: 'flex', alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          gap: 10, paddingLeft: expanded ? 14 : 0, paddingRight: expanded ? 14 : 0,
          borderRadius: 10, border: 'none', cursor: 'pointer',
          color: isActive ? blue : isHov ? c.textSecondary : c.textTertiary,
          background: isActive
            ? (state.dark ? 'rgba(96,165,250,0.14)' : '#EFF6FF')
            : isHov
            ? (state.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')
            : 'transparent',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 0.12s, color 0.12s',
          whiteSpace: 'nowrap', overflow: 'hidden',
        }}
      >
        {isActive && (
          <div style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: 3, height: 18, background: blue, borderRadius: '0 2px 2px 0',
          }} />
        )}
        <span style={{ flexShrink: 0, display: 'flex' }}>{icon}</span>
        {expanded && (
          <span style={{
            fontFamily: fonts.sans, fontSize: 13, fontWeight: isActive ? 600 : 500,
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {label}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHov(null); }}
      style={{
        width: expanded ? 200 : 72, flexShrink: 0,
        background: c.surface, boxShadow: `inset -1px 0 0 ${c.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'stretch',
        padding: expanded ? '16px 12px' : '16px 14px',
        gap: 2,
        overflowY: 'auto', overflowX: 'hidden',
        transition: 'width 0.18s ease, padding 0.18s ease',
        zIndex: 40,
      }}
    >
      {primary.map(item => btn(item.id, item.label, item.icon, () => navigate(item.id)))}
      <div style={{ height: 1, background: c.border, margin: '8px 0', flexShrink: 0 }} />
      {tools.map(item => btn(item.id, item.label, item.icon, () => navigate(item.id)))}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {btn('capstone', 'Capstone Studio ↗', <GraduationCap size={18} />, () => routerNav('/capstone/brief'))}
        {btn('profile', state.learnerName, <User size={18} />, () => {})}
      </div>
    </aside>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export function CourseLayout() {
  const { state } = useCourse();
  const c = C(state.dark);
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: c.bg }}>
      <TopNav />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftRail />
        <main style={{ flex: 1, overflowY: 'auto' }}><Outlet /></main>
      </div>
    </div>
  );
}
