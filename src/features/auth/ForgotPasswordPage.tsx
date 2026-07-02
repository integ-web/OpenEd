import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers";

export function ForgotPasswordPage() {
  const { resetPassword, isMockAuth } = useAuth();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    try {
      await resetPassword(email);
      setSent(true);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not send reset email");
    }
  }

  return (
    <section className="auth-shell">
      <form className="form-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Password Reset</p>
        <h1>Send reset link</h1>
        <label>
          Email
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {sent && (
          <p className="success-text">
            {isMockAuth ? "Mock reset recorded locally." : "Check your email for the reset link."}
          </p>
        )}
        <button className="button" type="submit">
          Send reset link
        </button>
        <Link className="text-button" to="/login">
          Back to login
        </Link>
      </form>
    </section>
  );
}
