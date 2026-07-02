import {
  BookOpen,
  GraduationCap,
  LogOut,
  Menu,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  UserRoundCog,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth, type OpenEdRole } from "./providers";

const roleLabels: Record<OpenEdRole, string> = {
  learner: "Learner",
  educator: "Educator",
  opened_team: "OpenEd Team",
};

const nav = [
  { to: "/courses", label: "Courses", icon: BookOpen, roles: ["learner", "educator", "opened_team"] },
  { to: "/learn", label: "Learn", icon: GraduationCap, roles: ["learner", "educator", "opened_team"] },
  { to: "/educator", label: "Studio", icon: UserRoundCog, roles: ["educator", "opened_team"] },
  { to: "/team", label: "Team", icon: ShieldCheck, roles: ["opened_team"] },
  { to: "/settings/byok", label: "BYOK", icon: Sparkles, roles: ["learner", "educator", "opened_team"] },
] satisfies Array<{ to: string; label: string; icon: typeof BookOpen; roles: OpenEdRole[] }>;

export function AppShell() {
  const { role, setRole, user, signOut, isMockAuth, canUseDevRoleSwitcher } = useAuth();
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const visibleNav = useMemo(() => nav.filter((item) => item.roles.includes(role)), [role]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="topbar">
        <Link to="/" className="brand" aria-label="OpenEd home">
          <span className="brand-mark">O</span>
          <span>
            <strong>OpenEd</strong>
            <small>Source-backed learning</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <item.icon size={16} aria-hidden />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          {canUseDevRoleSwitcher && (
            <select
              aria-label="Preview role"
              value={role}
              onChange={(event) => setRole(event.target.value as OpenEdRole)}
            >
              <option value="learner">Learner</option>
              <option value="educator">Educator</option>
              <option value="opened_team">OpenEd Team</option>
            </select>
          )}
          <button
            type="button"
            className="icon-button"
            aria-label="Toggle theme"
            onClick={() => setDark((value) => !value)}
          >
            {dark ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <button type="button" className="icon-button" aria-label="Sign out" onClick={() => void signOut()}>
              <LogOut size={18} />
            </button>
          ) : (
            <Link className="button small" to="/login">
              Log in
            </Link>
          )}
          <button
            type="button"
            className="icon-button mobile-only"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((value) => !value)}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {navOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setNavOpen(false)}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <item.icon size={16} aria-hidden />
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <main className="main-shell">
        <div className="role-strip">
          <span>{roleLabels[role]}</span>
          <span>{isMockAuth ? `Local mock auth - ${location.pathname}` : location.pathname}</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
