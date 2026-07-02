import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { AuthShell, AuthField, AuthBtn, AuthError, AuthSuccess } from "./AuthShell";

export function SignUpScreen() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!fullName.trim()) { setError("Please enter your full name."); return; }
    if (!email) { setError("Please enter your email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    const { error, needsConfirmation } = await signUp(email, password, fullName.trim());
    setLoading(false);

    if (error) {
      setError(error);
    } else if (needsConfirmation) {
      setSuccess("Account created! Check your email to confirm your address, then sign in.");
    } else {
      navigate("/course/dashboard");
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Join the Frontier Evaluation Lab course.">
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "9px 14px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: "#1D4ED8", margin: 0, lineHeight: 1.5 }}>
            <strong>Demo mode:</strong> no real account is created. Use any email and a password of 8+ characters.
          </p>
        </div>
        {error && <AuthError message={error} />}
        {success && <AuthSuccess message={success} />}
        {!success && (
          <>
            <AuthField label="Full name" value={fullName} onChange={setFullName} placeholder="Jane Smith" autoComplete="name" />
            <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
            <AuthField label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 8 characters" autoComplete="new-password" />
            <div style={{ marginBottom: 20 }} />
            <AuthBtn label="Create account" loading={loading} />
          </>
        )}
        {success && (
          <a href="/login" style={{ display: "block", textAlign: "center", marginTop: 8, color: "#2563EB", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
            Go to sign in →
          </a>
        )}
        {!success && (
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </a>
          </p>
        )}
      </form>
    </AuthShell>
  );
}
