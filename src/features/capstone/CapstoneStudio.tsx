import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCapstone } from "./CapstoneContext";
import { CapstoneBrief } from "./CapstoneBrief";
import { ModelProfile } from "./ModelProfile";
import { ReleaseContext } from "./ReleaseContext";
import { ThreatModelCanvas } from "./ThreatModelCanvas";
import { EvaluationPortfolio } from "./EvaluationPortfolio";
import { BenchmarkPacket } from "./BenchmarkPacket";
import { EvidenceCardLibrary } from "./EvidenceCardLibrary";
import { ThresholdMemo } from "./ThresholdMemo";
import { RiskDashboard } from "./RiskDashboard";
import { ExecutiveReport } from "./ExecutiveReport";
import { PeerReview } from "./PeerReview";
import { FinalDefense } from "./FinalDefense";

export const SECTION_SLUGS = [
  "brief",
  "model-profile",
  "release-context",
  "threat-model",
  "evaluations",
  "benchmarks",
  "evidence-cards",
  "threshold-memo",
  "risk-dashboard",
  "executive-report",
  "peer-review",
  "final-defense",
];

export const SECTIONS = [
  { label: "Capstone Brief", short: "Brief" },
  { label: "Model Profile", short: "Profile" },
  { label: "Release Context", short: "Context" },
  { label: "Threat Model Canvas", short: "Threats" },
  { label: "Evaluation Portfolio", short: "Evaluations" },
  { label: "Benchmark Packet", short: "Benchmarks" },
  { label: "Evidence Card Library", short: "Evidence" },
  { label: "Threshold Memo", short: "Threshold" },
  { label: "Risk Dashboard", short: "Risk" },
  { label: "Executive Report", short: "Report" },
  { label: "Peer Review Checklist", short: "Peer Review" },
  { label: "Final Defense", short: "Defense" },
];

const SECTION_COMPONENTS: React.ReactNode[] = [
  <CapstoneBrief key="brief" />,
  <ModelProfile key="profile" />,
  <ReleaseContext key="release" />,
  <ThreatModelCanvas key="threats" />,
  <EvaluationPortfolio key="evals" />,
  <BenchmarkPacket key="benchmarks" />,
  <EvidenceCardLibrary key="evidence" />,
  <ThresholdMemo key="threshold" />,
  <RiskDashboard key="risk" />,
  <ExecutiveReport key="exec" />,
  <PeerReview key="peer" />,
  <FinalDefense key="defense" />,
];

function sectionStatus(
  idx: number,
  state: ReturnType<typeof useCapstone>["state"],
  qualityGates: ReturnType<typeof useCapstone>["qualityGates"]
): "complete" | "partial" | "empty" {
  switch (idx) {
    case 0:
    case 1:
    case 2:
      return "complete";
    case 3:
      if (state.threatModel.domains.length >= 3 && state.threatModel.threats.length >= 1) return "complete";
      if (state.threatModel.domains.length > 0) return "partial";
      return "empty";
    case 4:
      if (state.evaluations.length >= 6) return "complete";
      if (state.evaluations.length > 0) return "partial";
      return "empty";
    case 5:
      if (state.benchmarkPacket.length >= 3) return "complete";
      if (state.benchmarkPacket.length > 0) return "partial";
      return "empty";
    case 6:
      if (state.evidenceCards.length >= 12) return "complete";
      if (state.evidenceCards.length > 0) return "partial";
      return "empty";
    case 7:
      return state.thresholdMemo.written ? "complete" : state.thresholdMemo.acceptableRiskLevel ? "partial" : "empty";
    case 8:
      return state.riskDashboard.complete ? "complete" : state.riskDashboard.mitigations.length > 0 ? "partial" : "empty";
    case 9:
      return state.executiveReport.drafted ? "complete" : state.executiveReport.executiveSummary ? "partial" : "empty";
    case 10: {
      const checked = state.peerReview.items.filter((i) => i.checked).length;
      return checked === 12 ? "complete" : checked > 0 ? "partial" : "empty";
    }
    case 11:
      return state.recommendation.submitted ? "complete" : state.recommendation.decision ? "partial" : "empty";
    default:
      return "empty";
  }
}

function Sidebar({ currentIdx }: { currentIdx: number }) {
  const navigate = useNavigate();
  const { state, qualityGates, progressPercent } = useCapstone();

  return (
    <aside
      className="w-64 shrink-0 flex flex-col border-r border-border overflow-y-auto"
      style={{ background: "var(--sidebar)", minHeight: "100vh" }}
    >
      <div className="p-5 border-b border-border">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-3 opacity-70 hover:opacity-100 transition-opacity"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            ← Back to Course
          </span>
        </button>
        <div className="flex items-center gap-2 mt-2 mb-1">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--primary)" }}>
            Evaluation Lab
          </span>
        </div>
        <p
          className="leading-tight"
          style={{
            fontFamily: "'IBM Plex Serif', Georgia, serif",
            fontSize: "1.1rem",
            letterSpacing: "0.03em",
            color: "var(--foreground)",
          }}
        >
          Aster-3 Frontier
        </p>
        <p className="font-mono text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Pre-Deployment Dossier
        </p>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
            Progress
          </span>
          <span className="font-mono text-xs" style={{ color: progressPercent === 100 ? "#22c55e" : "var(--primary)" }}>
            {progressPercent}%
          </span>
        </div>
        <div
          className="h-1 w-full overflow-hidden mb-3"
          style={{ background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              background: progressPercent === 100 ? "#22c55e" : "var(--primary)",
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[
            { label: "3 Domains", met: qualityGates.hasMinRiskDomains },
            { label: "12 Cards", met: qualityGates.hasMinEvidenceCards },
            { label: "Uncertainty", met: qualityGates.hasUncertaintyNote },
            { label: "Mitigations", met: qualityGates.hasMitigationPlan },
          ].map((gate) => (
            <div key={gate.label} className="flex items-center gap-1">
              <span className="font-mono text-xs" style={{ color: gate.met ? "#22c55e" : "var(--muted-foreground)" }}>
                {gate.met ? "✓" : "○"}
              </span>
              <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                {gate.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <nav className="flex-1 py-2">
        {SECTIONS.map((section, idx) => {
          const status = sectionStatus(idx, state, qualityGates);
          const isActive = currentIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => navigate(`/capstone/${SECTION_SLUGS[idx]}`)}
              className="w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all"
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                borderLeft: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <span
                className="font-mono text-xs w-5 shrink-0"
                style={{
                  color:
                    status === "complete" ? "#22c55e"
                    : status === "partial" ? "var(--primary)"
                    : "var(--muted-foreground)",
                }}
              >
                {status === "complete" ? "✓" : String(idx + 1).padStart(2, "0")}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {section.short}
              </span>
              {status === "partial" && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div
          className="p-3 font-mono text-xs"
          style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)", color: "var(--muted-foreground)" }}
        >
          <p className="mb-1" style={{ color: "var(--foreground)" }}>Quality Gates</p>
          <p>· Min 3 risk domains</p>
          <p>· 12 evidence cards</p>
          <p>· Uncertainty note</p>
          <p>· Mitigation plan</p>
        </div>
      </div>
    </aside>
  );
}

export function CapstoneStudio() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { progressPercent } = useCapstone();

  const currentIdx = section ? SECTION_SLUGS.indexOf(section) : 0;

  // Redirect invalid slugs to brief
  useEffect(() => {
    if (section && currentIdx === -1) {
      navigate("/capstone/brief", { replace: true });
    }
    if (!section) {
      navigate("/capstone/brief", { replace: true });
    }
  }, [section, currentIdx, navigate]);

  const idx = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}
    >
      <Sidebar currentIdx={idx} />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header
          className="sticky top-0 z-10 px-8 py-3 border-b border-border flex items-center justify-between"
          style={{ background: "var(--background)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
              Section {String(idx + 1).padStart(2, "0")} of 12
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              {SECTIONS[idx]?.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-24 h-1 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${progressPercent}%`,
                    background: progressPercent === 100 ? "#22c55e" : "var(--primary)",
                  }}
                />
              </div>
              <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                {progressPercent}%
              </span>
            </div>
            <span
              className="font-mono text-xs px-2 py-1 border border-border"
              style={{ color: "var(--muted-foreground)", borderRadius: "var(--radius-sm)" }}
            >
              CONTROLLED
            </span>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-5xl w-full">
          {SECTION_COMPONENTS[idx]}
        </div>

        <footer className="px-8 py-3 border-t border-border flex items-center justify-between">
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            Frontier Model Evaluation Division · Aster-3 Frontier · Pre-Deployment Dossier v1.0
          </span>
          <div className="flex items-center gap-4">
            {idx > 0 && (
              <button
                onClick={() => navigate(`/capstone/${SECTION_SLUGS[idx - 1]}`)}
                className="font-mono text-xs"
                style={{ color: "var(--muted-foreground)", cursor: "pointer", background: "none", border: "none" }}
              >
                ← Prev
              </button>
            )}
            {idx < SECTIONS.length - 1 && (
              <button
                onClick={() => navigate(`/capstone/${SECTION_SLUGS[idx + 1]}`)}
                className="font-mono text-xs"
                style={{ color: "var(--primary)", cursor: "pointer", background: "none", border: "none" }}
              >
                Next →
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
