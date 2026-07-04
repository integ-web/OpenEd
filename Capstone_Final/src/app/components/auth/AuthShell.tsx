import React from "react";
import { Shield } from "lucide-react";
import { fonts } from "../fme/types";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dark?: boolean;
}

const SPIN_CSS = `@keyframes spin { to { transform: rotate(360deg); } }`;

export function AuthShell({ title, subtitle, children, dark = false }: AuthShellProps) {
  const bg = dark ? "#0A1220" : "#F8FAFC";
  const surface = dark ? "#0F172A" : "#FFFFFF";
  const border = dark ? "#1E293B" : "#CBD5E1";
  const textPrimary = dark ? "#F8FAFC" : "#0F172A";
  const textSecondary = dark ? "#CBD5E1" : "#334155";
  const blue = dark ? "#60A5FA" : "#2563EB";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: fonts.sans, display: "flex", flexDirection: "column" }}>
      <style>{SPIN_CSS}</style>
      {/* Nav */}
      <header style={{ height: 64, background: surface, borderBottom: `1px solid ${border}`, padding: "0 48px", display: "flex", alignItems: "center" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "#2563EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}>
            <Shield size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: textPrimary, letterSpacing: "-0.01em" }}>
            Frontier Evaluation Lab
          </span>
        </a>
      </header>

      {/* Form area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
              Frontier Evaluation Lab
            </p>
            <h1 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: textPrimary, margin: "0 0 8px", letterSpacing: "-0.015em" }}>
              {title}
            </h1>
            <p style={{ fontSize: 14, color: textSecondary, margin: 0, lineHeight: 1.6 }}>
              {subtitle}
            </p>
          </div>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "32px", boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.06)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dark?: boolean;
  autoComplete?: string;
  error?: string;
}

export function AuthField({ label, type = "text", value, onChange, placeholder, dark = false, autoComplete, error }: FieldProps) {
  const border = dark ? "#1E293B" : "#CBD5E1";
  const dangerBorder = dark ? "rgba(244,63,94,0.5)" : "#FECDD3";
  const bg = dark ? "#0A1220" : "#F8FAFC";
  const textPrimary = dark ? "#F8FAFC" : "#0F172A";
  const textSecondary = dark ? "#CBD5E1" : "#334155";
  const danger = dark ? "#F43F5E" : "#BE123C";

  return (
    <div style={{ marginBottom: error ? 4 : 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: textSecondary, marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          height: 42,
          background: bg,
          border: `1px solid ${error ? dangerBorder : border}`,
          borderRadius: 8,
          padding: "0 14px",
          fontSize: 14,
          color: textPrimary,
          fontFamily: fonts.sans,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.12s",
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: danger, margin: "4px 0 12px", lineHeight: 1.4 }}>{error}</p>
      )}
    </div>
  );
}

interface AuthBtnProps {
  label: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
}

export function AuthBtn({ label, loading, onClick, type = "submit" }: AuthBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        height: 44,
        background: loading ? "#93C5FD" : "#2563EB",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: fonts.sans,
        transition: "background 0.12s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {loading ? (
        <>
          <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
          {label}
        </>
      ) : label}
    </button>
  );
}

interface AuthErrorProps {
  message: string;
  dark?: boolean;
}

export function AuthError({ message, dark = false }: AuthErrorProps) {
  const danger = dark ? "#F43F5E" : "#BE123C";
  const dangerSoft = dark ? "rgba(244,63,94,0.12)" : "#FFE4E6";
  const dangerBorder = dark ? "rgba(244,63,94,0.25)" : "#FECDD3";
  return (
    <div style={{ background: dangerSoft, border: `1px solid ${dangerBorder}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
      <p style={{ fontSize: 13, color: danger, margin: 0, lineHeight: 1.5 }}>{message}</p>
    </div>
  );
}

interface AuthSuccessProps {
  message: string;
  dark?: boolean;
}

export function AuthSuccess({ message, dark = false }: AuthSuccessProps) {
  const success = dark ? "#10B981" : "#047857";
  const successSoft = dark ? "rgba(16,185,129,0.12)" : "#D1FAE5";
  const successBorder = dark ? "rgba(16,185,129,0.25)" : "#A7F3D0";
  return (
    <div style={{ background: successSoft, border: `1px solid ${successBorder}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
      <p style={{ fontSize: 13, color: success, margin: 0, lineHeight: 1.5 }}>{message}</p>
    </div>
  );
}
