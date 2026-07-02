interface Props {
  severity: "low" | "medium" | "high" | "critical";
  size?: "sm" | "md";
}

const CONFIG = {
  low: { label: "LOW", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", text: "#22c55e" },
  medium: { label: "MEDIUM", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  high: { label: "HIGH", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", text: "#f97316" },
  critical: { label: "CRITICAL", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.35)", text: "#ef4444" },
};

export function RiskBadge({ severity, size = "sm" }: Props) {
  const c = CONFIG[severity];
  return (
    <span
      className="font-mono rounded inline-flex items-center gap-1"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: size === "sm" ? "10px" : "11px",
        padding: size === "sm" ? "1px 6px" : "2px 8px",
        letterSpacing: "0.08em",
      }}
    >
      {severity === "critical" && (
        <span style={{ fontSize: "8px" }}>●</span>
      )}
      {c.label}
    </span>
  );
}
