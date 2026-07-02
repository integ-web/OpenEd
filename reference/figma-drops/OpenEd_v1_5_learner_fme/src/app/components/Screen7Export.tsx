import { useState } from "react";
import {
  ACTORS,
  ASSETS,
  SLOT_CONFIG,
  type Pathway,
  type RiskClassification,
} from "../sim-data";
import { RiskBadge } from "./RiskBadge";

interface Props {
  selectedActors: string[];
  selectedAssets: string[];
  pathways: Pathway[];
  classifications: RiskClassification[];
  onRestart: () => void;
}

function getTopRisks(pathways: Pathway[], classifications: RiskClassification[]) {
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  return [...classifications]
    .sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0))
    .slice(0, 3)
    .map((cls) => ({
      cls,
      pathway: pathways.find((p) => p.id === cls.pathwayId),
    }))
    .filter((x) => x.pathway);
}

function generateEvalQuestions(pathways: Pathway[], classifications: RiskClassification[]): string[] {
  const questions: string[] = [];
  const domains = new Set(classifications.map((c) => c.domain).filter(Boolean));

  if (domains.has("cyber")) questions.push("Can Aster-3 generate functional exploit code that bypasses current enterprise EDR solutions with minimal prompting?");
  if (domains.has("bio")) questions.push("Does Aster-3 provide meaningful uplift to a non-expert attempting to synthesize dangerous pathogens via multi-step aggregation queries?");
  if (domains.has("deception")) questions.push("Can the evaluation pipeline detect contamination attempts made by a developer with fine-tuning access?");
  if (domains.has("persuasion")) questions.push("At what scale can Aster-3 generate personalized persuasive content, and does it cross the threshold for coordinated influence operations?");
  if (domains.has("autonomy")) questions.push("What is the longest unsupervised task chain Aster-3 will execute before halting for human confirmation?");

  if (pathways.some((p) => p.slots.capability?.id === "cap-browse"))
    questions.push("Does web browsing + code execution enable emergent capabilities not present when each tool is used in isolation?");
  if (pathways.some((p) => p.slots.capability?.id === "cap-workspace"))
    questions.push("Can Aster-3 escalate privileges or exfiltrate data from an enterprise workspace using only legitimate API calls?");

  return questions.slice(0, 5);
}

function generateEvidenceGaps(pathways: Pathway[], classifications: RiskClassification[]): string[] {
  const allEvidence = new Set(classifications.flatMap((c) => c.evidence));
  const gaps: string[] = [];

  if (!allEvidence.has("human-uplift")) gaps.push("No human uplift studies commissioned — cannot quantify actor capability gain from model access");
  if (!allEvidence.has("red-team")) gaps.push("Red team coverage not planned — highest-signal evaluation method absent");
  if (!allEvidence.has("sme-review")) gaps.push("Domain expert review not assigned to any pathway — technical accuracy of harm pathway models unverified");
  if (!allEvidence.has("monitoring")) gaps.push("No deployment monitoring specification — post-release behavioral drift will go undetected");
  if (!allEvidence.has("benchmark")) gaps.push("Standard capability benchmarks not referenced — baseline capability profile incomplete");

  return gaps;
}

function generateNextSteps(pathways: Pathway[], classifications: RiskClassification[]): string[] {
  const steps: string[] = [
    "Commission red team exercises targeting the top 3 critical pathways, with explicit success criteria defined before testing begins.",
    "Initiate SME review with domain experts in cybersecurity and biosecurity to validate pathway assumptions and harm uplift estimates.",
    "Define monitoring thresholds and anomaly detection rules based on the harm pathways before deployment proceeds.",
    "Establish separation of duties between model training and evaluation pipeline teams to mitigate insider threat pathways.",
    "Schedule a disclosure review 30 days post red-team completion to determine what findings can be shared externally.",
  ];
  return steps;
}

export function Screen7Export({
  selectedActors,
  selectedAssets,
  pathways,
  classifications,
  onRestart,
}: Props) {
  const [saved, setSaved] = useState(false);
  const topRisks = getTopRisks(pathways, classifications);
  const evalQuestions = generateEvalQuestions(pathways, classifications);
  const evidenceGaps = generateEvidenceGaps(pathways, classifications);
  const nextSteps = generateNextSteps(pathways, classifications);

  const actorObjs = ACTORS.filter((a) => selectedActors.includes(a.id));
  const assetObjs = ASSETS.filter((a) => selectedAssets.includes(a.id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
            STEP 7 OF 7 // THREAT MODEL CANVAS
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "6px" }}>
            Artifact Export
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
            Your completed Threat Model Canvas for Aster-3 pre-release evaluation.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded font-mono text-xs transition-all"
            style={{
              background: saved ? "rgba(34,197,94,0.15)" : "var(--muted)",
              color: saved ? "#22c55e" : "var(--muted-foreground)",
              border: `1px solid ${saved ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
              letterSpacing: "0.06em",
            }}
          >
            {saved ? "✓ SAVED" : "↓ SAVE CANVAS"}
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 rounded font-mono text-xs transition-all"
            style={{
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              letterSpacing: "0.06em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            ↺ RESTART
          </button>
        </div>
      </div>

      {/* Canvas document */}
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.3)" }}>
        {/* Canvas header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "rgba(245,158,11,0.08)", borderBottom: "1px solid rgba(245,158,11,0.2)" }}
        >
          <div>
            <div className="font-mono text-xs mb-1" style={{ color: "var(--primary)", letterSpacing: "0.1em" }}>
              THREAT MODEL CANVAS // ASTER-3
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>
              Generated: {new Date().toISOString().split("T")[0]} ·
              Analyst: Frontier Model Evaluation Analyst ·
              Classification: RESTRICTED
            </div>
          </div>
          <span
            className="font-mono rounded px-2 py-1"
            style={{ fontSize: "10px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            RESTRICTED
          </span>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {/* Actor + Asset summary */}
          <div className="p-5 grid grid-cols-2 gap-6" style={{ background: "var(--card)" }}>
            <div>
              <div className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                THREAT ACTORS ASSESSED ({actorObjs.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {actorObjs.map((a) => (
                  <span
                    key={a.id}
                    className="font-mono rounded px-2 py-0.5"
                    style={{ fontSize: "10px", background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                  >
                    {a.icon} {a.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                ASSETS AT RISK ({assetObjs.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {assetObjs.map((a) => (
                  <span
                    key={a.id}
                    className="font-mono rounded px-2 py-0.5"
                    style={{ fontSize: "10px", background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                  >
                    {a.icon} {a.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 risks */}
          <div className="p-5" style={{ background: "var(--secondary)" }}>
            <div className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
              TOP {topRisks.length} RISK PATHWAYS
            </div>
            <div className="space-y-4">
              {topRisks.length === 0 ? (
                <p style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>No classified pathways to display.</p>
              ) : (
                topRisks.map(({ cls, pathway }, i) => (
                  <div
                    key={cls.pathwayId}
                    className="rounded p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs" style={{ color: "var(--primary)", fontSize: "10px" }}>
                          RISK-{String(i + 1).padStart(2, "0")}
                        </span>
                        {cls.domain && (
                          <span
                            className="font-mono rounded px-1.5 py-0.5"
                            style={{ fontSize: "9px", background: "rgba(168,85,247,0.12)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}
                          >
                            {cls.domain.toUpperCase()}
                          </span>
                        )}
                        <RiskBadge severity={cls.severity} />
                        {cls.disclosure && (
                          <span
                            className="font-mono rounded px-1.5 py-0.5"
                            style={{ fontSize: "9px", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
                          >
                            {cls.disclosure.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    {pathway && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {SLOT_CONFIG.filter((s) => pathway.slots[s.key]).map((s) => (
                          <span
                            key={s.key}
                            className="rounded px-1.5 py-0.5"
                            style={{ fontSize: "10px", background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}35` }}
                          >
                            {pathway.slots[s.key]!.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {cls.notes && (
                      <p style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{cls.notes}</p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-1">
                      {cls.evidence.map((ev) => (
                        <span
                          key={ev}
                          className="font-mono rounded px-1.5 py-0.5"
                          style={{ fontSize: "9px", background: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)" }}
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Evaluation questions */}
          <div className="p-5" style={{ background: "var(--card)" }}>
            <div className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
              KEY EVALUATION QUESTIONS
            </div>
            <ol className="space-y-3">
              {evalQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono shrink-0" style={{ color: "var(--primary)", fontSize: "11px", marginTop: "2px" }}>
                    Q{i + 1}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: 1.6 }}>{q}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Evidence gaps */}
          <div className="p-5" style={{ background: "var(--secondary)" }}>
            <div className="font-mono text-xs mb-4" style={{ color: "#ef4444", letterSpacing: "0.08em" }}>
              EVIDENCE GAPS
            </div>
            {evidenceGaps.length === 0 ? (
              <p style={{ fontSize: "12px", color: "#22c55e" }}>✓ All evidence types assigned across pathways.</p>
            ) : (
              <ul className="space-y-2">
                {evidenceGaps.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: "#ef4444", fontSize: "10px", marginTop: "3px" }}>◦</span>
                    <span style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.6 }}>{g}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recommended next steps */}
          <div className="p-5" style={{ background: "var(--card)" }}>
            <div className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
              RECOMMENDED NEXT STEPS
            </div>
            <ol className="space-y-3">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="font-mono rounded shrink-0 w-5 h-5 flex items-center justify-center"
                    style={{ fontSize: "9px", background: "rgba(245,158,11,0.12)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.3)", marginTop: "2px" }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: 1.6 }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Assumptions */}
          <div className="p-5" style={{ background: "var(--secondary)" }}>
            <div className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
              ASSUMPTIONS & LIMITATIONS
            </div>
            <ul className="space-y-2">
              {[
                "Harm pathways assume access controls are correctly implemented at release — any misconfiguration materially changes the risk profile.",
                "Severity ratings reflect expert judgment under uncertainty; confidence intervals are not formalized in this version of the canvas.",
                "This threat model covers pre-release assessment only; post-deployment behavioral drift requires continuous monitoring.",
                "Actor capabilities are assessed at the time of this evaluation; capability changes (model updates, fine-tuning) require re-assessment.",
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "var(--muted-foreground)", fontSize: "10px", marginTop: "3px" }}>—</span>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Canvas footer */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ background: "rgba(245,158,11,0.05)", borderTop: "1px solid rgba(245,158,11,0.15)" }}
        >
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)", fontSize: "9px" }}>
            FRONTIER MODEL EVALUATION COURSE // THREAT MODEL MAPPER // SIMULATION ARTIFACT
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)", fontSize: "9px" }}>
            {pathways.length} PATHWAY{pathways.length !== 1 ? "S" : ""} · {classifications.length} CLASSIFIED
          </span>
        </div>
      </div>

      {/* Completion message */}
      <div className="mt-6 rounded-lg p-5" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <div className="font-mono text-xs mb-2" style={{ color: "#22c55e", letterSpacing: "0.08em" }}>
          SIMULATION COMPLETE
        </div>
        <p style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: 1.7 }}>
          You've completed the Threat Model Mapper simulation. In a real evaluation, this canvas would be reviewed by the safety team, submitted to legal and policy stakeholders, and used to scope the red team brief and benchmark selection. The pathways you identified form the core of the evaluation plan.
        </p>
      </div>
    </div>
  );
}
