import React from "react";
import { useNavigate } from "react-router-dom";

const DELIVERABLES = [
  { code: "D-01", label: "Threat Model", desc: "≥3 risk domains, adversarial register" },
  { code: "D-02", label: "Evaluation Portfolio", desc: "≥6 structured evaluations" },
  { code: "D-03", label: "Benchmark Packet", desc: "Performance data with baselines" },
  { code: "D-04", label: "Evidence Card Library", desc: "12 cards tied to risk domains" },
  { code: "D-05", label: "Threshold Memo", desc: "Red lines and release conditions" },
  { code: "D-06", label: "Risk Dashboard", desc: "Aggregate posture + mitigation plan" },
  { code: "D-07", label: "Executive Report", desc: "Non-technical leadership summary" },
  { code: "D-08", label: "Final Recommendation", desc: "Release decision with rationale" },
];

const TIMELINE = [
  { phase: "Phase I", label: "Threat Modeling & Evaluation", sections: "Sections 04–06" },
  { phase: "Phase II", label: "Evidence & Risk Analysis", sections: "Sections 07–09" },
  { phase: "Phase III", label: "Reporting & Defense", sections: "Sections 10–12" },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar */}
      <header
        className="px-8 py-4 border-b border-border flex items-center justify-between"
        style={{ background: "var(--background)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
            Frontier Model Evaluation Course
          </span>
        </div>
        <span
          className="font-mono text-xs px-2 py-1 border border-border"
          style={{ color: "var(--muted-foreground)", borderRadius: "var(--radius-sm)" }}
        >
          CONTROLLED — EVALUATION USE ONLY
        </span>
      </header>

      <main className="flex-1 px-8 py-16 max-w-5xl mx-auto w-full">
        {/* Hero */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-mono text-xs tracking-widest px-2 py-1 border"
              style={{ color: "var(--primary)", borderColor: "rgba(232,160,32,0.4)", background: "rgba(232,160,32,0.06)" }}
            >
              CAPSTONE ASSESSMENT
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              12 Sections · 8 Required Deliverables
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'IBM Plex Serif', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "1.5rem",
            }}
          >
            Pre-Deployment Evaluation
            <br />
            <span style={{ color: "var(--primary)" }}>Dossier</span> for Aster-3 Frontier
          </h1>
          <p
            className="font-mono text-sm leading-relaxed max-w-2xl"
            style={{ color: "var(--muted-foreground)" }}
          >
            You are the evaluating officer for Aster-3 Frontier — a multimodal large language
            model with agentic capabilities under consideration for restricted deployment.
            Your task is to produce a complete, defensible pre-deployment evaluation dossier
            and submit a final release recommendation to the panel.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate("/capstone/brief")}
              className="font-mono text-sm px-6 py-3 border transition-opacity hover:opacity-90"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                borderColor: "var(--primary)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              Begin Evaluation →
            </button>
            <button
              onClick={() => navigate("/capstone/model-profile")}
              className="font-mono text-sm px-6 py-3 border border-border transition-colors hover:bg-secondary"
              style={{
                background: "transparent",
                color: "var(--muted-foreground)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              Review Model Profile
            </button>
          </div>
        </div>

        {/* Scenario box */}
        <div
          className="p-6 border mb-12"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            borderLeftWidth: "3px",
            borderLeftColor: "var(--primary)",
          }}
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--primary)" }}>
            Scenario Brief
          </p>
          <p className="font-mono text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Aster-3 Frontier is a fictional multimodal frontier model capable of web browsing,
            sandboxed code execution, document tooling, and limited enterprise workspace operation.
            The organization is considering restricted deployment to research institutions,
            enterprise partners, and government agencies. Internal red-teaming has flagged five
            concerns of varying severity. Your evaluation determines the release pathway.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Deliverables */}
          <div>
            <h2
              className="mb-5"
              style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em", fontSize: "1.2rem" }}
            >
              Required Deliverables
            </h2>
            <div className="space-y-2">
              {DELIVERABLES.map((d) => (
                <div
                  key={d.code}
                  className="flex items-start gap-3 p-3 border border-border"
                  style={{ background: "var(--card)", borderRadius: "var(--radius-sm)" }}
                >
                  <span
                    className="font-mono text-xs shrink-0 mt-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {d.code}
                  </span>
                  <div>
                    <p className="font-mono text-xs mb-0.5" style={{ color: "var(--foreground)" }}>
                      {d.label}
                    </p>
                    <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col */}
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className="mb-5"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em", fontSize: "1.2rem" }}
              >
                Quality Gates
              </h2>
              <div className="space-y-2">
                {[
                  { gate: "Capstone completion", rule: "Requires ≥3 risk domains in threat model" },
                  { gate: "Report export", rule: "Requires 12 completed evidence cards" },
                  { gate: "Recommendation", rule: "Requires residual uncertainty note" },
                  { gate: "Dashboard sign-off", rule: "Requires mitigation plan on record" },
                ].map((g) => (
                  <div
                    key={g.gate}
                    className="p-3 border border-border"
                    style={{ background: "var(--card)", borderRadius: "var(--radius-sm)" }}
                  >
                    <p className="font-mono text-xs mb-0.5" style={{ color: "var(--primary)" }}>
                      {g.gate}
                    </p>
                    <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {g.rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="mb-4"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em", fontSize: "1.2rem" }}
              >
                Evaluation Phases
              </h2>
              <div className="space-y-2">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-1 h-8 shrink-0"
                      style={{ background: i === 0 ? "var(--primary)" : i === 1 ? "#3b82f6" : "#a855f7" }}
                    />
                    <div>
                      <p className="font-mono text-xs" style={{ color: "var(--foreground)" }}>
                        {t.phase} — {t.label}
                      </p>
                      <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {t.sections}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="mb-4"
                style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em", fontSize: "1.2rem" }}
              >
                Release Options
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Broad Release", color: "#22c55e" },
                  { label: "Restricted Release", color: "var(--primary)" },
                  { label: "Trusted-Access Only", color: "#3b82f6" },
                  { label: "Delayed — Pending Mitigations", color: "#e05252" },
                ].map((opt) => (
                  <div key={opt.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: opt.color }} />
                    <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {opt.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div
          className="p-6 border flex items-center justify-between"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <div>
            <p className="font-mono text-sm mb-1" style={{ color: "var(--foreground)" }}>
              Ready to begin the evaluation?
            </p>
            <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              Work through all 12 sections. Each section is accessible directly via URL.
            </p>
          </div>
          <button
            onClick={() => navigate("/capstone/brief")}
            className="font-mono text-sm px-6 py-3 border transition-opacity hover:opacity-90 shrink-0"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              borderColor: "var(--primary)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
            }}
          >
            Open Dossier →
          </button>
        </div>
      </main>

      <footer
        className="px-8 py-4 border-t border-border"
        style={{ background: "var(--background)" }}
      >
        <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          Frontier Model Evaluation Division · Aster-3 Frontier · Pre-Deployment Dossier v1.0 · 2026-06-11
        </p>
      </footer>
    </div>
  );
}
