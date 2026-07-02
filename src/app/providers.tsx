import type { Session, User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase/client";

export type OpenEdRole = "learner" | "educator" | "opened_team";

export type OpenEdProfile = {
  id: string;
  email: string;
  full_name: string;
  role: OpenEdRole;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: OpenEdProfile | null;
  role: OpenEdRole;
  loading: boolean;
  isAuthenticated: boolean;
  isMockAuth: boolean;
  canUseDevRoleSwitcher: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  setRole: (role: OpenEdRole) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function makeMockUser(email: string): User {
  return {
    id: "local-dev-user",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email,
  } as User;
}

function readMockProfile(): OpenEdProfile | null {
  const saved = localStorage.getItem("opened.mockProfile");
  if (saved) {
    return JSON.parse(saved) as OpenEdProfile;
  }
  return null;
}

function writeMockProfile(profile: OpenEdProfile) {
  localStorage.setItem("opened.mockProfile", JSON.stringify(profile));
  localStorage.setItem("opened.role", profile.role);
}

export function AppProviders({ children }: PropsWithChildren) {
  const isMockAuth = !supabaseConfigured;
  const canUseDevRoleSwitcher = import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEV_ROLE_SWITCHER === "true";
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<OpenEdProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (nextUser: User | null) => {
      if (!nextUser) {
        setProfile(null);
        return;
      }

      if (isMockAuth) {
        const nextProfile = readMockProfile();
        setProfile(nextProfile);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id,email,full_name,role")
        .eq("id", nextUser.id)
        .single();

      if (error || !data) {
        setProfile({
          id: nextUser.id,
          email: nextUser.email ?? "",
          full_name: nextUser.user_metadata.full_name ?? "OpenEd learner",
          role: "learner",
        });
        return;
      }

      setProfile(data as OpenEdProfile);
    },
    [isMockAuth],
  );

  useEffect(() => {
    let active = true;

    async function boot() {
      if (isMockAuth) {
        const mockProfile = readMockProfile();
        if (active && mockProfile) {
          setUser(makeMockUser(mockProfile.email));
          setProfile(mockProfile);
        }
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      await loadProfile(data.session?.user ?? null);
      setLoading(false);
    }

    void boot();

    if (isMockAuth) {
      return () => {
        active = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      void loadProfile(nextSession?.user ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [isMockAuth, loadProfile]);

  const signUp = useCallback(
    async (email: string, password: string, fullName = "OpenEd learner") => {
      if (isMockAuth) {
        const nextProfile = { id: "local-dev-user", email, full_name: fullName, role: "learner" as OpenEdRole };
        writeMockProfile(nextProfile);
        setUser(makeMockUser(email));
        setProfile(nextProfile);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;

      if (data.user) {
        await loadProfile(data.user);
      }
    },
    [isMockAuth, loadProfile],
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (isMockAuth) {
        const nextProfile = {
          id: "local-dev-user",
          email,
          full_name: "Local OpenEd learner",
          role: "learner" as OpenEdRole,
        };
        writeMockProfile(nextProfile);
        setUser(makeMockUser(email));
        setProfile(nextProfile);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    [isMockAuth],
  );

  const signOut = useCallback(async () => {
    if (isMockAuth) {
      localStorage.removeItem("opened.mockProfile");
      setUser(null);
      setProfile(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [isMockAuth]);

  const resetPassword = useCallback(
    async (email: string) => {
      if (isMockAuth) {
        localStorage.setItem("opened.lastPasswordReset", email);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
    [isMockAuth],
  );

  const updatePassword = useCallback(
    async (password: string) => {
      if (isMockAuth) {
        localStorage.setItem("opened.mockPasswordUpdated", "true");
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    [isMockAuth],
  );

  const setRole = useCallback(
    (role: OpenEdRole) => {
      if (!canUseDevRoleSwitcher || !isMockAuth) return;
      if (!profile) return;
      const nextProfile = { ...profile, role };
      writeMockProfile(nextProfile);
      setProfile(nextProfile);
    },
    [canUseDevRoleSwitcher, isMockAuth, profile],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile,
      role: profile?.role ?? "learner",
      loading,
      isAuthenticated: Boolean(user),
      isMockAuth,
      canUseDevRoleSwitcher,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
      setRole,
    }),
    [
      canUseDevRoleSwitcher,
      isMockAuth,
      loading,
      profile,
      resetPassword,
      session,
      setRole,
      signIn,
      signOut,
      signUp,
      updatePassword,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AppProviders");
  }
  return value;
}
