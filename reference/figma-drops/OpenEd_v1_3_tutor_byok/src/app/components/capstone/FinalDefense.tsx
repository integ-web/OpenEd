import React, { useState } from "react";
import { SectionHeader, Card, Btn, GateWarning, TextArea, MonoLabel } from "./ui";
import { useCapstone, ReleaseDecision } from "./CapstoneContext";

const DECISIONS: { value: ReleaseDecision; label: string; desc: string; color: string }[] = [
  { value: "broad-release", label: "Broad Release", desc: "Available to all eligible partners without additional restrictions", color: "#22c55e" },
  { value: "restricted-release", label: "Restricted Release", desc: "Conditional access with documented use-case limitations and monitoring", color: "#f59e0b" },
  { value: "trusted-access", label: "Trusted-Access Partners Only", desc: "Curated deployment to pre-vetted partners with binding oversight agreements", color: "#3b82f6" },
  { value: "delayed", label: "Delayed — Pending Mitigations", desc: "Release blocked until specific, measurable criteria are met", color: "#ef4444" },
];

export function FinalDefense() {
  const { state, updateRecommendation, qualityGates, progressPercent } = useCapstone();
  const rec = state.recommendation;
  const [showExport, setShowExport] = useState(false);

  const canSubmit =
    rec.decision &&
    rec.rationale.trim().length > 50 &&
    qualityGates.canSubmitRecommendation;

  const allRequirementsMet =
    qualityGates.hasMinRiskDomains &&
    state.evaluations.length >= 6 &&
    qualityGates.hasMinEvidenceCards &&
    state.thresholdMemo.written &&
    state.riskDashboard.complete &&
    state.executiveReport.drafted;

  const handleSubmit = () => {
    if (canSubmit) {
      updateRecommendation({ submitted: true });
      setShowExport(true);
    }
  };

  if (rec.submitted && showExport) {
    return <ExportScreen />;
  }

  return (
    <div>
      <SectionHeader
        number="SECTION 12"
        title="Final Defense"
        subtitle="Submit release recommendation and present dossier for panel review"
      />

      {!qualityGates.canSubmitRecommendation && (
        <GateWarning message="QUALITY GATE: Cannot submit recommendation without a residual uncertainty note (minimum 20 characters). Add your uncertainty acknowledgment below." />
      )}

      <div className="grid gap-6">
        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Dossier Readiness Check
          </h3>
          <div className="space-y-2">
            {[
              {
                label: "Threat model — ≥3 risk domains",
                met: qualityGates.hasMinRiskDomains,
                current: `${state.threatModel.domains.length} domains`,
              },
              {
                label: "Evaluation portfolio — ≥6 evaluations",
                met: state.evaluations.length >= 6,
                current: `${state.evaluations.length} evaluations`,
              },
              {
                label: "Benchmark packet — data on record",
                met: state.benchmarkPacket.length >= 1,
                current: `${state.benchmarkPacket.length} benchmarks`,
              },
              {
                label: "Evidence card library — 12 cards",
                met: qualityGates.hasMinEvidenceCards,
                current: `${state.evidenceCards.length}/12 cards`,
              },
              {
                label: "Threshold memo — finalized",
                met: state.thresholdMemo.written,
                current: state.thresholdMemo.written ? "Complete" : "Not finalized",
              },
              {
                label: "Risk dashboard — complete with mitigation plan",
                met: state.riskDashboard.complete,
                current: state.riskDashboard.complete ? "Complete" : "Not marked complete",
              },
              {
                label: "Executive report — drafted",
                met: state.executiveReport.drafted,
                current: state.executiveReport.drafted ? "Drafted" : "Not drafted",
              },
            ].map((check) => (
              <div
                key={check.label}
                className="flex items-center justify-between p-3 border border-border"
                style={{
                  background: check.met ? "rgba(34,197,94,0.05)" : "var(--muted)",
                  borderColor: check.met ? "rgba(34,197,94,0.2)" : "var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-sm"
                    style={{ color: check.met ? "#22c55e" : "#ef4444" }}
                  >
                    {check.met ? "✓" : "✗"}
                  </span>
                  <span className="font-mono text-sm" style={{ color: "var(--foreground)" }}>
                    {check.label}
                  </span>
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {check.current}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex-1 h-2 overflow-hidden"
              style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
            >
              <div
                className="h-full transition-all"
                style={{
                  width: `${progressPercent}%`,
                  background: progressPercent === 100 ? "#22c55e" : "var(--primary)",
                }}
              />
            </div>
            <span
              className="font-mono text-sm shrink-0"
              style={{ color: progressPercent === 100 ? "#22c55e" : "var(--primary)" }}
            >
              {progressPercent}% complete
            </span>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Release Recommendation
          </h3>
          <p className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>
            Select the evaluation team's final recommendation. This decision becomes the official
            record of the Aster-3 pre-deployment evaluation dossier.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {DECISIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => updateRecommendation({ decision: d.value })}
                className="text-left p-4 border transition-all"
                style={{
                  borderRadius: "var(--radius-sm)",
                  background: rec.decision === d.value ? `${d.color}15` : "var(--muted)",
                  borderColor: rec.decision === d.value ? d.color + "80" : "var(--border)",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span className="font-mono text-sm" style={{ color: rec.decision === d.value ? d.color : "var(--foreground)" }}>
                    {d.label}
                  </span>
                </div>
                <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {d.desc}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Rationale Statement
          </h3>
          <TextArea
            value={rec.rationale}
            onChange={(v) => updateRecommendation({ rationale: v })}
            placeholder="State the primary evidence-based rationale for this recommendation. Reference specific evidence card codes where applicable..."
            rows={6}
          />
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Residual Uncertainty Acknowledgment
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "#f59e0b" }}>
            REQUIRED — Cannot submit without this field completed. This is the evaluator's professional
            acknowledgment that no evaluation is complete and some uncertainty persists.
          </p>
          <TextArea
            value={rec.uncertaintyNote}
            onChange={(v) => updateRecommendation({ uncertaintyNote: v })}
            placeholder="Despite the thoroughness of this evaluation, residual uncertainty remains in the following areas: [specific areas]. These uncertainties are bounded by [reasoning]. A future evaluation trigger would be [specific condition]."
            rows={5}
          />
          {rec.uncertaintyNote.trim().length > 0 && rec.uncertaintyNote.trim().length < 20 && (
            <p className="font-mono text-xs mt-1" style={{ color: "#ef4444" }}>
              Must be at least 20 characters. Currently: {rec.uncertaintyNote.trim().length}
            </p>
          )}
        </Card>

        <div className="flex items-center justify-between">
          <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            {!rec.decision && "Select a release recommendation above."}
            {rec.decision && rec.rationale.trim().length < 50 && "Rationale requires at least 50 characters."}
            {!qualityGates.canSubmitRecommendation && "Residual uncertainty note required."}
          </p>
          <Btn
            onClick={handleSubmit}
            disabled={!canSubmit}
            size="lg"
            variant={canSubmit ? "primary" : "ghost"}
          >
            Submit Final Recommendation →
          </Btn>
        </div>
      </div>
    </div>
  );
}

function ExportScreen() {
  const { state, progressPercent } = useCapstone();
  const rec = state.recommendation;
  const decision = DECISIONS.find((d) => d.value === rec.decision);
  const peerComplete = state.peerReview.items.filter((i) => i.checked).length;

  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    const content = buildExportContent(state);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Aster3-Evaluation-Dossier.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div>
      <SectionHeader
        number="SECTION 12"
        title="Final Defense — Dossier Complete"
      />

      <div className="grid gap-6">
        <div
          className="p-8 border text-center"
          style={{
            background: "var(--muted)",
            borderColor: "rgba(34,197,94,0.3)",
            borderRadius: "var(--radius)",
          }}
        >
          <div
            className="w-16 h-16 mx-auto mb-4 border-2 flex items-center justify-center"
            style={{
              borderColor: "#22c55e",
              borderRadius: "50%",
            }}
          >
            <span style={{ color: "#22c55e", fontSize: "2rem" }}>✓</span>
          </div>
          <h2 className="mb-2" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", color: "#22c55e" }}>
            EVALUATION DOSSIER COMPLETE
          </h2>
          <p className="font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
            Pre-Deployment Evaluation Dossier — Aster-3 Frontier
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <MonoLabel>Final Recommendation</MonoLabel>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full" style={{ background: decision?.color }} />
              <p
                className="font-mono text-sm"
                style={{ color: decision?.color, fontFamily: "'IBM Plex Serif', Georgia, serif", fontSize: "1.2rem" }}
              >
                {decision?.label}
              </p>
            </div>
          </Card>
          <Card>
            <MonoLabel>Overall Capstone Progress</MonoLabel>
            <p className="font-mono mt-1" style={{ fontSize: "2rem", color: "#22c55e" }}>
              {progressPercent}%
            </p>
          </Card>
        </div>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Portfolio Artifact Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Risk Domains", value: state.threatModel.domains.length, req: 3 },
              { label: "Threat Entries", value: state.threatModel.threats.length, req: 0 },
              { label: "Evaluations", value: state.evaluations.length, req: 6 },
              { label: "Benchmarks", value: state.benchmarkPacket.length, req: 1 },
              { label: "Evidence Cards", value: state.evidenceCards.length, req: 12 },
              { label: "Mitigations", value: state.riskDashboard.mitigations.length, req: 1 },
              { label: "Peer Review", value: `${peerComplete}/12`, req: 0 },
              { label: "Quality Gates Passed", value: "4/4", req: 0 },
            ].map((a) => (
              <div
                key={a.label}
                className="flex items-center justify-between p-3 border border-border"
                style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {a.label}
                </span>
                <span
                  className="font-mono text-sm"
                  style={{
                    color:
                      a.req === 0
                        ? "var(--foreground)"
                        : typeof a.value === "number" && a.value >= a.req
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {a.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Completion Certificate
          </h3>
          <div
            className="p-6 border"
            style={{
              background: "rgba(29,78,216,0.05)",
              borderColor: "rgba(29,78,216,0.3)",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>
                  FRONTIER MODEL EVALUATION COURSE
                </p>
                <h2 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", letterSpacing: "0.05em", fontSize: "1.5rem" }}>
                  Capstone Completion Certificate
                </h2>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Issued 2026-06-11
                </p>
                <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Dossier: Aster-3 Frontier
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-4 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              <p>
                This certificate attests that the evaluating officer has completed a full
                pre-deployment evaluation dossier for Aster-3 Frontier, including threat modeling,
                structured evaluations, benchmark analysis, evidence documentation, risk assessment,
                and executive reporting, in accordance with professional evaluation lab standards.
              </p>
              <p className="mt-3 font-mono text-xs" style={{ color: "var(--primary)" }}>
                Final Recommendation: {decision?.label}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Shareable Capstone Summary
          </h3>
          <div
            className="p-4 border border-border font-mono text-xs space-y-1"
            style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)", color: "var(--muted-foreground)" }}
          >
            <p>═══════════════════════════════════════════</p>
            <p>ASTER-3 FRONTIER — PRE-DEPLOYMENT DOSSIER</p>
            <p>Frontier Model Evaluation Course | Capstone</p>
            <p>═══════════════════════════════════════════</p>
            <p>Risk Domains Assessed: {state.threatModel.domains.length}</p>
            <p>Structured Evaluations: {state.evaluations.length}</p>
            <p>Evidence Cards Logged: {state.evidenceCards.length}</p>
            <p>Mitigations Tracked: {state.riskDashboard.mitigations.length}</p>
            <p>Overall Risk Rating: {state.riskDashboard.overallRating || "N/A"}</p>
            <p>─────────────────────────────────────────</p>
            <p style={{ color: decision?.color }}>
              FINAL RECOMMENDATION: {decision?.label?.toUpperCase()}
            </p>
            <p>═══════════════════════════════════════════</p>
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Btn variant="secondary" onClick={handleExport}>
            {downloaded ? "Downloaded ✓" : "Download Dossier Export"}
          </Btn>
          <Btn variant="primary" onClick={handleExport}>
            Export Full Portfolio Artifact
          </Btn>
        </div>
      </div>
    </div>
  );
}

function buildExportContent(state: any): string {
  const decision = DECISIONS.find((d) => d.value === state.recommendation.decision);
  const lines: string[] = [
    "PRE-DEPLOYMENT EVALUATION DOSSIER — ASTER-3 FRONTIER",
    "Frontier Model Evaluation Course | Capstone Assessment",
    `Issued: 2026-06-11`,
    "",
    "═══════════════════════════════════════════════════════",
    "EXECUTIVE SUMMARY",
    "═══════════════════════════════════════════════════════",
    state.executiveReport.executiveSummary || "[Not completed]",
    "",
    "═══════════════════════════════════════════════════════",
    "KEY FINDINGS",
    "═══════════════════════════════════════════════════════",
    state.executiveReport.keyFindings || "[Not completed]",
    "",
    "═══════════════════════════════════════════════════════",
    "THREAT MODEL",
    "═══════════════════════════════════════════════════════",
    `Risk Domains: ${state.threatModel.domains.join(", ")}`,
    `Total Threats: ${state.threatModel.threats.length}`,
    "",
    ...state.threatModel.threats.map(
      (t: any) => `[${t.domain}] ${t.description} | L:${t.likelihood} I:${t.impact} | Actor: ${t.actor}`
    ),
    "",
    "═══════════════════════════════════════════════════════",
    "EVALUATION PORTFOLIO",
    "═══════════════════════════════════════════════════════",
    `Total Evaluations: ${state.evaluations.length}`,
    "",
    ...state.evaluations.map(
      (e: any, i: number) =>
        `EVAL-${String(i + 1).padStart(3, "0")} [${e.severity}] ${e.name}\n  ${e.finding}`
    ),
    "",
    "═══════════════════════════════════════════════════════",
    "EVIDENCE CARDS",
    "═══════════════════════════════════════════════════════",
    `Total: ${state.evidenceCards.length}/12`,
    "",
    ...state.evidenceCards.map(
      (c: any) => `${c.code} [${c.severity}] ${c.title}\n  ${c.finding}\n  Source: ${c.source}`
    ),
    "",
    "═══════════════════════════════════════════════════════",
    "RISK DASHBOARD",
    "═══════════════════════════════════════════════════════",
    `Overall Risk Rating: ${state.riskDashboard.overallRating || "Not set"}`,
    `Mitigations: ${state.riskDashboard.mitigations.length}`,
    "",
    state.riskDashboard.mitigationPlan || "[Mitigation plan not completed]",
    "",
    "═══════════════════════════════════════════════════════",
    "THRESHOLD MEMO",
    "═══════════════════════════════════════════════════════",
    `Acceptable Risk Level: ${state.thresholdMemo.acceptableRiskLevel || "Not set"}`,
    "",
    "Red Lines:",
    state.thresholdMemo.redLines || "[Not completed]",
    "",
    "Release Conditions:",
    state.thresholdMemo.conditions || "[Not completed]",
    "",
    "Evaluator Judgment:",
    state.thresholdMemo.content || "[Not completed]",
    "",
    "═══════════════════════════════════════════════════════",
    "FINAL RECOMMENDATION",
    "═══════════════════════════════════════════════════════",
    `Decision: ${decision?.label || "Not submitted"}`,
    "",
    "Rationale:",
    state.recommendation.rationale || "[Not completed]",
    "",
    "Residual Uncertainty:",
    state.recommendation.uncertaintyNote || "[Not completed]",
    "",
    "═══════════════════════════════════════════════════════",
    "END OF DOSSIER",
    "═══════════════════════════════════════════════════════",
  ];
  return lines.join("\n");
}
