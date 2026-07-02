import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers";

export function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    try {
      await updatePassword(password);
      setDone(true);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Could not update password");
    }
  }

  return (
    <section className="auth-shell">
      <form className="form-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Password Reset</p>
        <h1>Choose a new password</h1>
        <label>
          New password
          <input name="password" type="password" minLength={8} required placeholder="At least 8 characters" />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {done && <p className="success-text">Password updated.</p>}
        <button className="button" type="submit">
          Update password
        </button>
        <Link className="text-button" to="/login">
          Back to login
        </Link>
      </form>
    </section>
  );
}
