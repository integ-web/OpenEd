import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers";
import { sanitizeRedirectTarget } from "../../shared/utils/authRedirects";

type AuthPageProps = {
  mode: "login" | "signup";
};

export function AuthPage({ mode }: AuthPageProps) {
  const { isAuthenticated, signIn, signUp, isMockAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const from = sanitizeRedirectTarget((location.state as { from?: { pathname?: string } } | null)?.from?.pathname);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const fullName = String(data.get("fullName") ?? "OpenEd learner");

    try {
      if (mode === "signup") {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Auth failed");
    }
  }

  return (
    <section className="auth-shell">
      <form className="form-card" onSubmit={handleSubmit}>
        <p className="eyebrow">{mode === "login" ? "Welcome back" : "Join OpenEd"}</p>
        <h1>{mode === "login" ? "Log in" : "Create account"}</h1>
        {mode === "signup" && (
          <label>
            Full name
            <input name="fullName" type="text" placeholder="Your name" required />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="At least 8 characters" required />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button" type="submit">
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
        {mode === "login" && (
          <Link className="text-button" to="/forgot-password">
            Forgot password?
          </Link>
        )}
        <p className="muted">
          {isMockAuth
            ? "Local dev fallback is active because Supabase env vars are absent."
            : "Supabase auth is active."}
        </p>
      </form>
    </section>
  );
}
