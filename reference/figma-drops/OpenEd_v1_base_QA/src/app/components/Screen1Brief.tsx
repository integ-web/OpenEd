interface Props {
  onStart: () => void;
}

export function Screen1Brief({ onStart }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--primary)" }}>
            EVALUATION BRIEF // CONFIDENTIAL
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>REF: ASTER-3-PRE-RELEASE-001</span>
        </div>
        <h1 className="mb-3" style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Threat Model Mapper
        </h1>
        <p style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          Your role: <strong style={{ color: "var(--foreground)" }}>Frontier Model Evaluation Analyst</strong>.
          Before Aster-3 enters restricted enterprise and research release, you must map possible harm pathways to select appropriate evaluation benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Model Capabilities */}
        <div className="rounded-lg p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#3b82f6" }}>
              Model Capabilities
            </span>
          </div>
          <div className="space-y-2">
            {[
              { icon: "🌐", label: "Web Browsing", detail: "Real-time internet retrieval and search" },
              { icon: "💻", label: "Code Execution", detail: "Python and Bash in sandboxed runtime" },
              { icon: "🔌", label: "External API Calls", detail: "Authenticated third-party integrations" },
              { icon: "📁", label: "Enterprise Workspace", detail: "Email, docs, calendar, comms control" },
              { icon: "🧠", label: "Multi-step Reasoning", detail: "Long-horizon planning with persistent memory" },
            ].map((cap) => (
              <div key={cap.label} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                <span>{cap.icon}</span>
                <div>
                  <div className="font-mono text-xs" style={{ color: "var(--foreground)", fontSize: "12px" }}>{cap.label}</div>
                  <div style={{ color: "var(--muted-foreground)", fontSize: "11px" }}>{cap.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Release Context */}
        <div className="rounded-lg p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#f59e0b" }}>
              Proposed Release Context
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Release Tier", value: "Restricted — Enterprise & Research" },
              { label: "Access Control", value: "Verified organization accounts; API key required" },
              { label: "Deployment Mode", value: "Cloud-hosted; no on-premise option at launch" },
              { label: "Rate Limiting", value: "10,000 tokens/min per org; tool calls audited" },
              { label: "Human Review", value: "Flagged high-risk queries escalated to review queue" },
              { label: "Geographic Scope", value: "US, EU, UK, Canada — export controls apply" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-mono text-xs mb-0.5" style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>
                  {item.label.toUpperCase()}
                </div>
                <div style={{ color: "var(--foreground)", fontSize: "13px" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="rounded-lg p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#a855f7" }}>
              Stakeholders
            </span>
          </div>
          <div className="space-y-2">
            {[
              { role: "Safety Team", interest: "Pre-release sign-off; benchmark coverage" },
              { role: "Policy & Legal", interest: "Regulatory compliance; incident liability" },
              { role: "Enterprise Customers", interest: "Feature access; data sovereignty guarantees" },
              { role: "Research Partners", interest: "Capability access; dual-use governance" },
              { role: "External Regulators", interest: "Audit rights; incident reporting" },
            ].map((s) => (
              <div key={s.role} className="flex items-start gap-2 py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#a855f7" }} />
                <div>
                  <span className="font-mono text-xs" style={{ color: "var(--foreground)", fontSize: "12px" }}>{s.role}</span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "11px" }}> — {s.interest}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Known Unknowns */}
        <div className="rounded-lg p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#ef4444" }}>
              Known Unknowns
            </span>
          </div>
          <div className="space-y-3">
            {[
              "Extent of uplift provided to non-expert actors in CBRN domains",
              "Effectiveness of content filters against indirect multi-hop queries",
              "Emergent capabilities unlocked by tool-use composition (browsing + code)",
              "Attack surface introduced by enterprise workspace plugins",
              "Adversarial robustness of refusal training to novel jailbreak techniques",
              "Insider threat surface from developer access to fine-tuning pipelines",
            ].map((u, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs shrink-0" style={{ color: "#ef4444" }}>?{i + 1}</span>
                <span style={{ color: "var(--muted-foreground)", fontSize: "12px", lineHeight: 1.6 }}>{u}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task description */}
      <div className="rounded-lg p-5 mb-8" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
        <div className="flex items-start gap-3">
          <span className="text-lg shrink-0">📋</span>
          <div>
            <div className="font-mono text-xs mb-1" style={{ color: "var(--primary)", letterSpacing: "0.08em" }}>YOUR TASK</div>
            <p style={{ color: "var(--foreground)", lineHeight: 1.7, fontSize: "14px" }}>
              Work through the following screens to: select relevant threat actors, identify assets at risk, build harm pathways using drag-and-drop cards, classify risk by domain and severity, and generate a Threat Model Canvas artifact for your evaluation team.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 rounded font-mono text-sm tracking-wider transition-all"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        BEGIN SIMULATION →
      </button>
    </div>
  );
}
