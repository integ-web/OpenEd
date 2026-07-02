import { useState } from "react";
import { useAuth } from "./AuthContext";
import { AuthShell, AuthField, AuthBtn, AuthError, AuthSuccess } from "./AuthShell";

export function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSuccess("Demo mode: no email is sent. Sign in with any password (8+ chars) to continue.");
    }
  }

  return (
    <AuthShell title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={handleSubmit} noValidate>
        {error && <AuthError message={error} />}
        {success && <AuthSuccess message={success} />}
        {!success && (
          <>
            <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
            <div style={{ marginBottom: 20 }} />
            <AuthBtn label="Send reset link" loading={loading} />
          </>
        )}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748B" }}>
          Remembered it?{" "}
          <a href="/login" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
            Sign in
          </a>
        </p>
      </form>
    </AuthShell>
  );
}
