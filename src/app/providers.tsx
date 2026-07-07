import type { Session, User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase/client";
import { ClerkProvider, useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from "@clerk/clerk-react";


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

function makeMockUser(email: string, fullName: string): User {
  return {
    id: "local-dev-user",
    app_metadata: {},
    user_metadata: { full_name: fullName },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email,
  } as User;
}

function readMockUsers(): OpenEdProfile[] {
  const saved = localStorage.getItem("opened.mockUsers");
  if (saved) {
    try {
      return JSON.parse(saved) as OpenEdProfile[];
    } catch {
      return [];
    }
  }
  return [];
}

function saveMockUser(profile: OpenEdProfile) {
  const users = readMockUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === profile.email.toLowerCase());
  if (index >= 0) {
    users[index] = profile;
  } else {
    users.push(profile);
  }
  localStorage.setItem("opened.mockUsers", JSON.stringify(users));
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

import { CapstoneProvider } from "../features/capstone/CapstoneContext";

function LegacyAppProviders({ children }: PropsWithChildren) {
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
          setUser(makeMockUser(mockProfile.email, mockProfile.full_name));
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
        saveMockUser(nextProfile);
        writeMockProfile(nextProfile);
        setUser(makeMockUser(email, fullName));
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
        const users = readMockUsers();
        let nextProfile = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!nextProfile) {
          nextProfile = {
            id: "local-dev-user",
            email,
            full_name: email.split("@")[0],
            role: "learner" as OpenEdRole,
          };
          saveMockUser(nextProfile);
        }
        writeMockProfile(nextProfile);
        setUser(makeMockUser(email, nextProfile.full_name));
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
      saveMockUser(nextProfile);
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

  return (
    <AuthContext.Provider value={value}>
      <CapstoneProvider>
        {children}
      </CapstoneProvider>
    </AuthContext.Provider>
  );
}

function ClerkAppProviders({ children }: PropsWithChildren) {
  const { user: clerkUser, isLoaded: userLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();
  const { signIn: clerkSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp: clerkSignUp, isLoaded: signUpLoaded } = useSignUp();

  const loading = !userLoaded || !signInLoaded || !signUpLoaded;

  const role = (clerkUser?.unsafeMetadata?.role as OpenEdRole) || (clerkUser?.publicMetadata?.role as OpenEdRole) || "learner";

  const profile = useMemo<OpenEdProfile | null>(() => {
    if (!clerkUser) return null;
    return {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
      full_name: clerkUser.fullName ?? "OpenEd learner",
      role,
    };
  }, [clerkUser, role]);

  const signUp = useCallback(
    async (email: string, password: string, fullName = "OpenEd learner") => {
      if (!clerkSignUp) return;
      const res = await clerkSignUp.create({
        emailAddress: email,
        password,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" "),
      });
      if (res.status === "missing_requirements") {
        await clerkSignUp.prepareEmailAddressVerification({ strategy: "email_code" });
      }
    },
    [clerkSignUp]
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!clerkSignIn) return;
      await clerkSignIn.create({
        identifier: email,
        password,
      });
    },
    [clerkSignIn]
  );

  const signOut = useCallback(async () => {
    await clerkSignOut();
  }, [clerkSignOut]);

  const setRole = useCallback(
    async (newRole: OpenEdRole) => {
      if (!clerkUser) return;
      await clerkUser.update({
        unsafeMetadata: {
          role: newRole,
        },
      });
    },
    [clerkUser]
  );

  const mappedUser = useMemo(() => {
    if (!clerkUser) return null;
    return {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
      user_metadata: {
        full_name: clerkUser.fullName ?? "OpenEd learner",
      },
    } as any;
  }, [clerkUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: mappedUser,
      session: null,
      profile,
      role,
      loading,
      isAuthenticated: Boolean(clerkUser),
      isMockAuth: false,
      canUseDevRoleSwitcher: import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEV_ROLE_SWITCHER === "true",
      signUp,
      signIn,
      signOut,
      resetPassword: async () => {},
      updatePassword: async () => {},
      setRole,
    }),
    [clerkUser, mappedUser, profile, role, loading, signUp, signIn, signOut, setRole]
  );

  return (
    <AuthContext.Provider value={value}>
      <CapstoneProvider>
        {children}
      </CapstoneProvider>
    </AuthContext.Provider>
  );
}

export function AppProviders({ children }: PropsWithChildren) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return <LegacyAppProviders>{children}</LegacyAppProviders>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkAppProviders>{children}</ClerkAppProviders>
    </ClerkProvider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AppProviders");
  }
  return value;
}
