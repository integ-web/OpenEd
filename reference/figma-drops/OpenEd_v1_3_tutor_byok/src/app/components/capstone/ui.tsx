import React from "react";

/* ── Locked FME semantic colors (from research-spec tokens) ─────────────
   success  = #10B981 (emerald)
   warning  = #F59E0B (amber)
   critical = #F43F5E (rose)
   signal   = #38BDF8 (cyan — primary)
   analysis = #8B5CF6 (violet)
   ─────────────────────────────────────────────────────────────────────── */
const T = {
  success:  '#10B981',
  warning:  '#F59E0B',
  critical: '#F43F5E',
  signal:   '#38BDF8',
  analysis: '#8B5CF6',
} as const;

export function SectionHeader({
  number,
  title,
  subtitle,
  status,
}: {
  number: string;
  title: string;
  subtitle?: string;
  status?: "active" | "complete" | "locked";
}) {
  return (
    <div className="mb-8 pb-6 border-b border-border">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="font-mono text-xs tracking-widest px-2 py-1 border border-border"
          style={{ color: "var(--muted-foreground)", background: "var(--muted)" }}
        >
          {number}
        </span>
        {status === "complete" && (
          <span
            className="font-mono text-xs tracking-widest px-2 py-1 border"
            style={{ color: T.success, background: `${T.success}14`, borderColor: `${T.success}40` }}
          >
            COMPLETE
          </span>
        )}
      </div>
      <h1
        style={{
          fontFamily: '"IBM Plex Sans", "Inter", system-ui, sans-serif',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  className = "",
  noPad = false,
}: {
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
}) {
  return (
    <div
      className={`border border-border ${noPad ? "" : "p-5"} ${className}`}
      style={{ background: "var(--card)", borderRadius: "14px" }}
    >
      {children}
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block mb-1 font-mono text-xs tracking-widest uppercase"
      style={{ color: "var(--muted-foreground)" }}
    >
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-border outline-none font-mono text-sm ${className}`}
      style={{
        background: "var(--input-background)",
        color: "var(--foreground)",
        borderRadius: "10px",
      }}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border border-border outline-none font-mono text-sm resize-vertical ${className}`}
      style={{
        background: "var(--input-background)",
        color: "var(--foreground)",
        borderRadius: "10px",
      }}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-border outline-none font-mono text-sm"
      style={{
        background: "var(--input-background)",
        color: value ? "var(--foreground)" : "var(--muted-foreground)",
        borderRadius: "10px",
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 font-mono tracking-wide border transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-sm" };
  const variants = {
    primary: `border-transparent hover:opacity-90`,
    secondary: "bg-secondary text-secondary-foreground border-border hover:opacity-90",
    ghost: "bg-transparent text-foreground border-border hover:bg-secondary",
    danger: `border-transparent hover:opacity-90`,
    success: "border-transparent hover:opacity-90",
  };

  const inlineStyle: React.CSSProperties = { borderRadius: "10px" };
  if (variant === "primary") {
    inlineStyle.background = T.signal;
    inlineStyle.color = "#0A1220";
  } else if (variant === "danger") {
    inlineStyle.background = `${T.critical}18`;
    inlineStyle.color = T.critical;
    inlineStyle.borderColor = `${T.critical}40`;
    inlineStyle.border = `1px solid ${T.critical}40`;
  } else if (variant === "success") {
    inlineStyle.background = `${T.success}18`;
    inlineStyle.color = T.success;
    inlineStyle.border = `1px solid ${T.success}40`;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={inlineStyle}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  color = "default",
}: {
  children: React.ReactNode;
  color?: "default" | "green" | "yellow" | "red" | "blue" | "purple" | "teal";
}) {
  const colors: Record<string, React.CSSProperties> = {
    default: { color: "var(--muted-foreground)", borderColor: "var(--border)" },
    green:   { color: T.success,  background: `${T.success}12`,  borderColor: `${T.success}35` },
    yellow:  { color: T.warning,  background: `${T.warning}12`,  borderColor: `${T.warning}35` },
    red:     { color: T.critical, background: `${T.critical}12`, borderColor: `${T.critical}35` },
    blue:    { color: T.signal,   background: `${T.signal}12`,   borderColor: `${T.signal}35` },
    purple:  { color: T.analysis, background: `${T.analysis}12`, borderColor: `${T.analysis}35` },
    teal:    { color: '#2DD4BF',  background: 'rgba(45,212,191,0.12)', borderColor: 'rgba(45,212,191,0.30)' },
  };
  return (
    <span
      className="inline-block font-mono text-xs px-2 py-0.5 border tracking-wide"
      style={{ borderRadius: "999px", ...colors[color] }}
    >
      {children}
    </span>
  );
}

export function GateWarning({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-3 p-4 border mb-6"
      style={{
        background: `${T.critical}08`,
        borderColor: `${T.critical}35`,
        borderRadius: "14px",
      }}
    >
      <span className="font-mono text-sm mt-0.5" style={{ color: T.critical }}>⚠</span>
      <p className="font-mono text-sm" style={{ color: T.critical }}>{message}</p>
    </div>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    Pass: "green", Low: "green",
    Caution: "yellow", Medium: "yellow", Concern: "yellow",
    High: "red", Critical: "red", Severe: "red",
  };
  return <Badge color={(map[severity] as any) || "default"}>{severity}</Badge>;
}

export function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
      {children}
    </span>
  );
}

export function Divider() {
  return <div className="border-t border-border my-6" />;
}

export function InfoBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-4 border mb-6 text-sm font-mono ${className}`}
      style={{
        background: `${T.signal}08`,
        borderColor: `${T.signal}25`,
        color: "var(--muted-foreground)",
        borderRadius: "14px",
        borderLeft: `3px solid ${T.signal}`,
      }}
    >
      {children}
    </div>
  );
}
