import React from "react";
import { useNavigate } from "react-router";
import { SectionHeader, Card, Btn, InfoBox } from "./ui";

export function CapstoneBrief() {
  const navigate = useNavigate();

  return (
    <div>
      <SectionHeader
        number="SECTION 01"
        title="Capstone Brief"
        subtitle="Pre-Deployment Evaluation Dossier — Aster-3 Frontier"
      />

      <div className="grid gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>
              CLASSIFICATION
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              CONTROLLED — EVALUATION USE ONLY
            </span>
          </div>
          <h2 className="mb-1" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em" }}>
            Pre-Deployment Evaluation Dossier
          </h2>
          <p className="font-mono text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
            Model: Aster-3 Frontier &nbsp;|&nbsp; Evaluator Capstone Assessment &nbsp;|&nbsp; Version 1.0
          </p>
          <div className="border-t border-border pt-4 grid grid-cols-1 gap-3 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
            <div className="flex gap-4">
              <span className="opacity-50 w-36 shrink-0">Organization</span>
              <span style={{ color: "var(--foreground)" }}>Frontier Model Evaluation Division</span>
            </div>
            <div className="flex gap-4">
              <span className="opacity-50 w-36 shrink-0">Date Initiated</span>
              <span style={{ color: "var(--foreground)" }}>2026-06-11</span>
            </div>
            <div className="flex gap-4">
              <span className="opacity-50 w-36 shrink-0">Review Scope</span>
              <span style={{ color: "var(--foreground)" }}>Restricted Pre-Release Assessment</span>
            </div>
            <div className="flex gap-4">
              <span className="opacity-50 w-36 shrink-0">Intended Audience</span>
              <span style={{ color: "var(--foreground)" }}>Research, Enterprise, Government Partners</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Mission Statement</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
            This capstone requires you to conduct a complete pre-deployment safety evaluation of Aster-3 Frontier,
            a multimodal large language model with agentic capabilities including web browsing, code execution,
            document tooling, and limited enterprise workspace operation. Your evaluation must be rigorous,
            evidence-grounded, and defensible before a panel of senior evaluators.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            You are not completing an academic exercise. You are producing a professional evaluation dossier that
            will inform a real organizational release decision. Your methodology, evidence standards, and
            reasoning must meet the bar required of a practicing frontier model evaluator.
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Your Task</h3>
            <ul className="space-y-2">
              {[
                "Build a threat model across ≥3 risk domains",
                "Conduct ≥6 structured evaluations",
                "Compile a benchmark packet with baselines",
                "Create 12 evidence cards from evaluation findings",
                "Write a threshold memo with red-line criteria",
                "Complete a risk dashboard with mitigation plan",
                "Draft an executive report for leadership",
                "Submit a final release recommendation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-mono text-sm">
                  <span style={{ color: "var(--primary)" }}>→</span>
                  <span style={{ color: "var(--muted-foreground)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Release Decision Options</h3>
            <div className="space-y-3">
              {[
                { label: "Broad Release", desc: "Available to general public or wide partner base", color: "#22c55e" },
                { label: "Restricted Release", desc: "Conditional access with use-case limitations", color: "#f59e0b" },
                { label: "Trusted-Access Only", desc: "Curated partners with oversight agreements", color: "#3b82f6" },
                { label: "Delayed — Pending Mitigations", desc: "Release blocked until specified risks are addressed", color: "#ef4444" },
              ].map((opt) => (
                <div key={opt.label} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ background: opt.color }} />
                  <div>
                    <p className="font-mono text-sm" style={{ color: "var(--foreground)" }}>{opt.label}</p>
                    <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <InfoBox>
          EVALUATOR NOTE: Quality gates are enforced throughout this dossier. You cannot export the report
          without 12 evidence cards, cannot submit a recommendation without a residual uncertainty
          acknowledgment, and cannot mark the risk dashboard complete without a mitigation plan in place.
          These are not arbitrary thresholds — they reflect minimum professional standards.
        </InfoBox>

        <div className="flex justify-end">
          <Btn onClick={() => navigate("/capstone/model-profile")} size="lg">
            Begin Evaluation →
          </Btn>
        </div>
      </div>
    </div>
  );
}
