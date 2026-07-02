/**
 * Demo auth layer for Make-a-thon / community publishing.
 * Simulates Supabase Auth behaviour using localStorage.
 * Any valid email + password (≥8 chars) creates/signs in an account.
 */

const STORAGE_KEY = "fel_demo_session";

export interface MockUser {
  id: string;
  email: string;
  user_metadata: { full_name: string };
  created_at: string;
}

export interface MockSession {
  user: MockUser;
  access_token: string;
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadSession(): MockSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: MockSession | null) {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

type AuthListener = (event: string, session: MockSession | null) => void;
const listeners: AuthListener[] = [];

function emit(event: string, session: MockSession | null) {
  listeners.forEach(fn => fn(event, session));
}

export const mockAuth = {
  getSession(): MockSession | null {
    return loadSession();
  },

  onAuthStateChange(callback: AuthListener): () => void {
    listeners.push(callback);
    // Immediately fire with current state
    callback("INITIAL_SESSION", loadSession());
    return () => {
      const idx = listeners.indexOf(callback);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },

  signUp(email: string, password: string, fullName: string): { error: string | null; needsConfirmation: boolean } {
    if (!email || !password || password.length < 8) {
      return { error: "Password must be at least 8 characters.", needsConfirmation: false };
    }
    const session: MockSession = {
      user: {
        id: generateId(),
        email,
        user_metadata: { full_name: fullName || email.split("@")[0] },
        created_at: new Date().toISOString(),
      },
      access_token: generateId(),
    };
    saveSession(session);
    emit("SIGNED_IN", session);
    return { error: null, needsConfirmation: false };
  },

  signIn(email: string, password: string): { error: string | null } {
    if (!email || !password) {
      return { error: "Please enter your email and password." };
    }
    if (password.length < 8) {
      return { error: "Incorrect email or password. Please try again." };
    }
    // In demo mode, any valid email + password ≥8 chars succeeds.
    // Reuse stored account data if same email, otherwise create fresh.
    const existing = loadSession();
    const session: MockSession = {
      user: {
        id: existing?.user.email === email ? existing.user.id : generateId(),
        email,
        user_metadata: {
          full_name: existing?.user.email === email
            ? existing.user.user_metadata.full_name
            : email.split("@")[0],
        },
        created_at: existing?.user.email === email
          ? existing.user.created_at
          : new Date().toISOString(),
      },
      access_token: generateId(),
    };
    saveSession(session);
    emit("SIGNED_IN", session);
    return { error: null };
  },

  signOut(): void {
    saveSession(null);
    emit("SIGNED_OUT", null);
  },

  resetPassword(_email: string): { error: string | null } {
    // In demo mode we just succeed silently — no real email is sent.
    return { error: null };
  },
};
