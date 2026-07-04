import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { AuthShell, AuthField, AuthBtn, AuthError } from "./AuthShell";

export function LoginScreen() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate("/course/dashboard");
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your evaluation training.">
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "9px 14px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: "#1D4ED8", margin: 0, lineHeight: 1.5 }}>
            <strong>Demo mode:</strong> enter any email and a password of 8+ characters.
          </p>
        </div>
        {error && <AuthError message={error} />}
        <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="current-password" />

        <div style={{ textAlign: "right", marginBottom: 20, marginTop: -8 }}>
          <a href="/forgot-password" style={{ fontSize: 12, color: "#2563EB", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        <AuthBtn label="Sign in" loading={loading} />

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" }}>
          No account?{" "}
          <a href="/signup" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
            Create one
          </a>
        </p>
      </form>
    </AuthShell>
  );
}
