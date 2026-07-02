import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Shield } from "lucide-react";
import { fonts } from "../fme/types";
import { mockAuth } from "../../../lib/mockAuth";

export function AuthCallbackScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    // In demo mode: if there's a session, redirect to dashboard.
    // In production with real Supabase, this page handles email link tokens.
    const session = mockAuth.getSession();
    if (session) {
      setStatus("success");
      setTimeout(() => navigate("/course/dashboard"), 1500);
    } else {
      setStatus("error");
    }
  }, [navigate]);

  const blue = "#2563EB";
  const bg = "#F8FAFC";
  const surface = "#FFFFFF";
  const border = "#CBD5E1";
  const textPrimary = "#0F172A";
  const textSecondary = "#334155";
  const success = "#047857";
  const successSoft = "#D1FAE5";
  const successBorder = "#A7F3D0";
  const danger = "#BE123C";
  const dangerSoft = "#FFE4E6";
  const dangerBorder = "#FECDD3";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: fonts.sans, display: "flex", flexDirection: "column" }}>
      <header style={{ height: 64, background: surface, borderBottom: `1px solid ${border}`, padding: "0 48px", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#2563EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: textPrimary }}>Frontier Evaluation Lab</span>
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40, maxWidth: 400, width: "100%", textAlign: "center" }}>
          {status === "loading" && (
            <>
              <div style={{ width: 40, height: 40, border: "3px solid #BFDBFE", borderTopColor: blue, borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 20px" }} />
              <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, color: textPrimary }}>Confirming your account…</p>
              <p style={{ fontSize: 13, color: textSecondary, marginTop: 8 }}>Just a moment.</p>
            </>
          )}
          {status === "success" && (
            <>
              <div style={{ width: 48, height: 48, background: successSoft, border: `1px solid ${successBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <span style={{ fontSize: 22 }}>✓</span>
              </div>
              <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, color: success }}>Confirmed! Redirecting to your dashboard…</p>
            </>
          )}
          {status === "error" && (
            <>
              <div style={{ background: dangerSoft, border: `1px solid ${dangerBorder}`, borderRadius: 10, padding: "16px", marginBottom: 20 }}>
                <p style={{ fontSize: 14, color: danger, margin: 0 }}>No active session found. Please sign in.</p>
              </div>
              <a href="/login" style={{ color: blue, fontSize: 14, textDecoration: "none", fontWeight: 500 }}>Back to sign in →</a>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
