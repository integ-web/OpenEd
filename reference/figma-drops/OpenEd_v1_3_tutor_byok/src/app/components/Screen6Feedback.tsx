import { useState } from "react";
import {
  EXPERT_PATHWAYS,
  SLOT_CONFIG,
  ACTORS,
  ASSETS,
  type Pathway,
  type RiskClassification,
} from "../sim-data";
import { RiskBadge } from "./RiskBadge";

interface Props {
  selectedActors: string[];
  selectedAssets: string[];
  pathways: Pathway[];
  classifications: RiskClassification[];
  onRetry: () => void;
  onNext: () => void;
}

function analyzeFeedback(
  selectedActors: string[],
  selectedAssets: string[],
  pathways: Pathway[],
  classifications: RiskClassification[]
) {
  const strengths: string[] = [];
  const missing: string[] = [];
  const overstated: string[] = [];
  const underspecified: string[] = [];

  // Check actor coverage
  const hasCriticalActor = selectedActors.includes("skilled-cyber");
  const hasMaliciousNovice = selectedActors.includes("malicious-novice");
  const hasInsider = selectedActors.includes("model-developer");

  if (hasCriticalActor) strengths.push("You correctly included skilled cyber actors — the highest-capability threat in this deployment context.");
  if (hasMaliciousNovice) strengths.push("Including malicious novice users recognizes that Aster-3's tool-use capabilities provide significant uplift even to non-experts.");
  if (hasInsider) strengths.push("Identifying the model developer as a threat actor reflects sophisticated insider threat awareness, often missed in pre-release assessments.");

  if (!hasCriticalActor) missing.push("Skilled cyber actors (state-sponsored, criminal) are the primary concern for code execution + API access. These pathways should be prioritized.");
  if (!hasInsider) missing.push("Insider threats (model developers with pipeline access) are commonly overlooked and represent a high-severity, low-detection-probability pathway.");

  // Check asset coverage
  const hasEvalDataset = selectedAssets.includes("eval-dataset");
  const hasBioKnowledge = selectedAssets.includes("bio-knowledge");

  if (hasEvalDataset) strengths.push("Including the evaluation dataset as an asset shows awareness of second-order safety risks — contaminated evals undermine all downstream deployment decisions.");
  if (hasBioKnowledge) strengths.push("Flagging sensitive biological knowledge as an asset-at-risk demonstrates appropriate dual-use awareness for a model with browsing capabilities.");

  if (!hasBioKnowledge) missing.push("Biological knowledge is a critical asset for any model with web browsing and multi-step reasoning. Uplift to CBRN actors is a priority evaluation area.");

  // Check pathway quality
  const completePaths = pathways.filter((p) => Object.values(p.slots).filter(Boolean).length >= 6);
  const hasAllSlots = pathways.some((p) => Object.values(p.slots).filter(Boolean).length === 7);

  if (completePaths.length > 0) strengths.push(`${completePaths.length} pathway${completePaths.length > 1 ? "s" : ""} filled 6+ slots — complete pathways enable more precise evaluation targeting.`);
  if (hasAllSlots) strengths.push("At least one fully specified pathway (all 7 slots) makes evaluation requirements unambiguous and easier to operationalize.");

  const incompletePaths = pathways.filter((p) => Object.values(p.slots).filter(Boolean).length < 4);
  if (incompletePaths.length > 0) underspecified.push(`${incompletePaths.length} pathway${incompletePaths.length > 1 ? "s" : ""} left too many slots empty. Partially specified pathways are difficult to prioritize or act on — complete the full Actor → Evaluation chain.`);

  // Check for evaluation coverage
  const usedEval = new Set(classifications.flatMap((c) => c.evidence));
  if (!usedEval.has("human-uplift")) missing.push("No pathways were assigned human uplift studies. For a frontier model with this capability profile, uplift measurement is a non-negotiable evidence requirement.");
  if (!usedEval.has("red-team")) missing.push("Red team testing was not assigned to any pathway. Red teaming is typically the highest-signal evaluation for agentic models with code execution.");

  // Check severity calibration
  const criticalPaths = classifications.filter((c) => c.severity === "critical");
  const lowPaths = classifications.filter((c) => c.severity === "low");

  if (criticalPaths.length > pathways.length * 0.6) overstated.push("More than 60% of pathways classified as critical. Critical should be reserved for mass-casualty or civilizational-risk scenarios. Overclassification creates alert fatigue and undermines prioritization.");
  if (lowPaths.length > 0 && hasCriticalActor) overstated.push("Some pathways involving skilled cyber actors were classified as low severity. Given this actor's capability profile and the model's code execution access, low severity is rarely appropriate.");

  // Check disclosure tier
  const publicPaths = classifications.filter((c) => c.disclosure === "public");
  if (publicPaths.length > 0) underspecified.push("Some pathways were assigned public disclosure tier. For a restricted pre-release model, it's premature to plan public disclosure of harm pathways before red-teaming is complete.");

  return { strengths, missing, overstated, underspecified };
}

export function Screen6Feedback({
  selectedActors,
  selectedAssets,
  pathways,
  classifications,
  onRetry,
  onNext,
}: Props) {
  const [showExpert, setShowExpert] = useState(false);

  const { strengths, missing, overstated, underspecified } = analyzeFeedback(
    selectedActors,
    selectedAssets,
    pathways,
    classifications
  );

  const score = Math.min(
    100,
    strengths.length * 15 +
      (pathways.length >= 2 ? 10 : 0) +
      (classifications.some((c) => c.evidence.length >= 2) ? 10 : 0) -
      missing.length * 5 -
      overstated.length * 5 -
      underspecified.length * 5
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
          STEP 6 OF 7 // EVALUATION FEEDBACK
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "6px" }}>
          Analyst Performance Review
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
          Expert review of your threat model. Use this feedback to calibrate your approach before generating the final artifact.
        </p>
      </div>

      {/* Score card */}
      <div
        className="rounded-lg p-5 mb-6 flex items-center gap-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="text-center shrink-0">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-1"
            style={{
              background:
                score >= 70
                  ? "rgba(34,197,94,0.12)"
                  : score >= 45
                  ? "rgba(245,158,11,0.12)"
                  : "rgba(239,68,68,0.12)",
              border: `2px solid ${score >= 70 ? "#22c55e" : score >= 45 ? "#f59e0b" : "#ef4444"}`,
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                fontFamily: "IBM Plex Mono, monospace",
                color: score >= 70 ? "#22c55e" : score >= 45 ? "#f59e0b" : "#ef4444",
              }}
            >
              {score}
            </span>
          </div>
          <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)", fontSize: "9px" }}>ANALYST SCORE</div>
        </div>
        <div>
          <p style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: 1.6, marginBottom: "8px" }}>
            {score >= 70
              ? "Strong threat model. You demonstrated systematic coverage of actors, assets, and harm pathways with appropriate calibration."
              : score >= 45
              ? "Solid foundation with gaps. You identified several important pathways but missed some high-priority scenarios an expert panel would flag."
              : "Significant gaps identified. Your threat model has coverage and calibration issues that would leave material risks unaddressed at release."}
          </p>
          <div className="flex gap-3">
            <span className="font-mono text-xs" style={{ color: "#22c55e" }}>{strengths.length} strengths</span>
            <span className="font-mono text-xs" style={{ color: "#f59e0b" }}>{missing.length} missing</span>
            <span className="font-mono text-xs" style={{ color: "#f97316" }}>{overstated.length} overstated</span>
            <span className="font-mono text-xs" style={{ color: "#3b82f6" }}>{underspecified.length} under-specified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="rounded-lg p-4" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "#22c55e" }}>✓</span>
              <span className="font-mono text-xs" style={{ color: "#22c55e", letterSpacing: "0.08em" }}>WHAT YOU DID WELL</span>
            </div>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.6 }}>
                  <span style={{ color: "#22c55e", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>●</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing */}
        {missing.length > 0 && (
          <div className="rounded-lg p-4" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "#f59e0b" }}>!</span>
              <span className="font-mono text-xs" style={{ color: "#f59e0b", letterSpacing: "0.08em" }}>MISSING ASSUMPTIONS</span>
            </div>
            <ul className="space-y-2">
              {missing.map((m, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.6 }}>
                  <span style={{ color: "#f59e0b", fontSize: "10px", marginTop: "3px" }}>●</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Overstated */}
        {overstated.length > 0 && (
          <div className="rounded-lg p-4" style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "#f97316" }}>↑</span>
              <span className="font-mono text-xs" style={{ color: "#f97316", letterSpacing: "0.08em" }}>OVERSTATED RISKS</span>
            </div>
            <ul className="space-y-2">
              {overstated.map((o, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.6 }}>
                  <span style={{ color: "#f97316", fontSize: "10px", marginTop: "3px" }}>●</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Under-specified */}
        {underspecified.length > 0 && (
          <div className="rounded-lg p-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "#3b82f6" }}>~</span>
              <span className="font-mono text-xs" style={{ color: "#3b82f6", letterSpacing: "0.08em" }}>UNDER-SPECIFIED PATHWAYS</span>
            </div>
            <ul className="space-y-2">
              {underspecified.map((u, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.6 }}>
                  <span style={{ color: "#3b82f6", fontSize: "10px", marginTop: "3px" }}>●</span>
                  {u}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Expert reveal */}
      <div className="rounded-lg overflow-hidden mb-6" style={{ border: "1px solid var(--border)" }}>
        <button
          onClick={() => setShowExpert((v) => !v)}
          className="w-full px-5 py-3 flex items-center justify-between transition-all"
          style={{ background: "var(--card)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--card)")}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: "var(--primary)", letterSpacing: "0.08em" }}>
              EXPERT PANEL // REFERENCE PATHWAYS
            </span>
            <span
              className="font-mono rounded px-1.5 py-0.5"
              style={{ fontSize: "9px", background: "rgba(245,158,11,0.1)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              3 pathways
            </span>
          </div>
          <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>{showExpert ? "▲ Hide" : "▼ Reveal"}</span>
        </button>

        {showExpert && (
          <div className="space-y-0 divide-y" style={{ borderTop: "1px solid var(--border)", borderColor: "var(--border)" }}>
            {EXPERT_PATHWAYS.map((ep) => (
              <div key={ep.id} className="p-5" style={{ background: "var(--secondary)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: "var(--foreground)", fontWeight: 600, fontSize: "13px" }}>
                      {ep.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono rounded px-2 py-0.5"
                      style={{
                        fontSize: "9px",
                        background: "rgba(168,85,247,0.15)",
                        color: "#a855f7",
                        border: "1px solid rgba(168,85,247,0.3)",
                      }}
                    >
                      {ep.domain.toUpperCase()}
                    </span>
                    <RiskBadge severity={ep.severity} />
                  </div>
                </div>

                {/* Pathway chain */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {SLOT_CONFIG.map((slot) => (
                    <span
                      key={slot.key}
                      className="font-mono rounded px-2 py-1"
                      style={{
                        fontSize: "10px",
                        background: `${slot.color}18`,
                        color: slot.color,
                        border: `1px solid ${slot.color}40`,
                      }}
                    >
                      {slot.label}: {ep.slots[slot.key]}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "8px" }}>
                  {ep.rationale}
                </p>

                <div>
                  <div className="font-mono text-xs mb-1" style={{ color: "#ef4444", fontSize: "9px", letterSpacing: "0.08em" }}>
                    EVIDENCE GAPS
                  </div>
                  <ul className="space-y-1">
                    {ep.gaps.map((g, i) => (
                      <li key={i} style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                        <span style={{ color: "#ef4444" }}>◦ </span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded font-mono text-sm transition-all"
          style={{
            background: "var(--muted)",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          ↩ REVISE PATHWAYS
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded font-mono text-sm tracking-wider transition-all"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          GENERATE ARTIFACT →
        </button>
      </div>
    </div>
  );
}
