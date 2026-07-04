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
import { useMemo, useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth, type OpenEdRole } from "./providers";
import { Button } from "../components/ui/button";

const roleLabels: Record<OpenEdRole, string> = {
  learner: "Learner",
  educator: "Educator",
  opened_team: "OpenEd Team",
};

const nav = [
  { to: "/courses", label: "Courses", icon: BookOpen, roles: ["learner", "educator", "opened_team"] },
  { to: "/learn", label: "Learn", icon: GraduationCap, roles: ["learner", "educator", "opened_team"] },
  { to: "/capstone", label: "Capstone", icon: GraduationCap, roles: ["learner", "educator", "opened_team"] },
  { to: "/educator", label: "Studio", icon: UserRoundCog, roles: ["educator", "opened_team"] },
  { to: "/team", label: "Team", icon: ShieldCheck, roles: ["opened_team"] },
  { to: "/settings/byok", label: "BYOK", icon: Sparkles, roles: ["learner", "educator", "opened_team"] },
] satisfies Array<{ to: string; label: string; icon: typeof BookOpen; roles: OpenEdRole[] }>;

export function AppShell() {
  const { role, setRole, user, profile, signOut, isMockAuth, canUseDevRoleSwitcher } = useAuth();
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const visibleNav = useMemo(() => nav.filter((item) => item.roles.includes(role)), [role]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 mr-6 text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              O
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-bold">OpenEd</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Source-backed learning</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {visibleNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`
                }
              >
                <item.icon className="h-4 w-4" aria-hidden />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {canUseDevRoleSwitcher && (
              <select
                aria-label="Preview role"
                value={role}
                onChange={(event) => setRole(event.target.value as OpenEdRole)}
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="learner">Learner</option>
                <option value="educator">Educator</option>
                <option value="opened_team">OpenEd Team</option>
              </select>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user && (
              <div className="flex flex-col text-right mr-1.5 text-xs">
                <span className="font-semibold text-foreground truncate max-w-[120px]">{profile?.full_name || user.user_metadata?.full_name || ""}</span>
                <span className="text-muted-foreground text-[10px]">{roleLabels[role]}</span>
              </div>
            )}
            {user ? (
              <Button variant="ghost" size="icon" aria-label="Sign out" onClick={() => void signOut()}>
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Button asChild variant="default" size="sm" className="hidden md:flex">
                <Link to="/login">Log in</Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((value) => !value)}
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {navOpen && (
        <nav className="md:hidden border-b bg-background px-4 py-4 space-y-4" aria-label="Mobile navigation">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setNavOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive ? "text-foreground" : "text-foreground/60"
                }`
              }
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </NavLink>
          ))}
          {!user && (
            <Button asChild variant="default" className="w-full justify-start mt-4">
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </nav>
      )}

      <main className="flex-1 flex flex-col">
        <div className="bg-muted px-4 py-1 flex items-center justify-between text-xs text-muted-foreground border-b">
          <span className="font-medium uppercase tracking-wider">{roleLabels[role]} View</span>
          <span className="font-mono truncate ml-4">
            {isMockAuth ? `Local mock auth • ${location.pathname}` : location.pathname}
          </span>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
