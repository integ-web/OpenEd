import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { mockAuth, type MockUser, type MockSession } from "../../../lib/mockAuth";

// Shape is intentionally compatible with the Supabase User/Session types
// so swapping back to real Supabase later requires only changing this file.
interface AuthContextValue {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const initial = mockAuth.getSession();
    setSession(initial);
    setUser(initial?.user ?? null);
    setLoading(false);

    // Subscribe to auth state changes
    const unsub = mockAuth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return unsub;
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    return mockAuth.signUp(email, password, fullName);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    return mockAuth.signIn(email, password);
  }, []);

  const signOut = useCallback(async () => {
    mockAuth.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    return mockAuth.resetPassword(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
