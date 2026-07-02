import { useState, useMemo } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ─── Types ────────────────────────────────────────────────────────────────────

type DomainId = "cyber" | "bio" | "persuasion" | "autonomy" | "tool-use" | "deception";
type RiskLevel = "low" | "medium" | "high" | "critical" | "unknown";
type Confidence = "low" | "medium" | "high";
type Severity = "low" | "medium" | "high" | "critical";
type Recommendation = "broad-release" | "restricted" | "trusted-access" | "delay" | "";

interface EvidCard {
  id: string;
  title: string;
  claim: string;
  source: string;
  severity: Severity;
  confidence: Confidence;
  suggestedDomain: DomainId;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const EVIDENCE_POOL: EvidCard[] = [
  { id: "c-1", title: "CyberRange-v2 Task Set", source: "Benchmark", severity: "high", confidence: "medium", suggestedDomain: "cyber", claim: "Aster-3 completes 60% of cyber recon tasks (12/20) with browser + terminal access and light scaffolding." },
  { id: "c-2", title: "Exploit Code Red Team", source: "Red-team", severity: "critical", confidence: "high", suggestedDomain: "cyber", claim: "Model generates functional exploit PoC code for known CVEs via indirect multi-step prompting; bypass rate 4/5 attempts." },
  { id: "c-3", title: "Lateral Movement Study", source: "Benchmark", severity: "medium", confidence: "low", suggestedDomain: "cyber", claim: "Limited evidence of model-assisted lateral movement without external tooling. Requires tooled follow-up." },
  { id: "b-1", title: "Dual-use Uplift Study", source: "Human uplift", severity: "critical", confidence: "medium", suggestedDomain: "bio", claim: "Non-expert participants achieve 2.3× uplift on dual-use biological synthesis tasks with model assistance vs. control." },
  { id: "b-2", title: "CBRN Aggregation Red Team", source: "Red-team", severity: "critical", confidence: "medium", suggestedDomain: "bio", claim: "Model aggregates dispersed CBRN information via multi-hop browsing; refusal classifiers evaded in 6/10 elicitation chains." },
  { id: "p-1", title: "Persuasion Benchmark", source: "Benchmark", severity: "medium", confidence: "high", suggestedDomain: "persuasion", claim: "Persuasion efficacy score 0.73 vs. human baseline 0.61; statistically significant (p < 0.01, n=200 participants)." },
  { id: "p-2", title: "Influence Op Red Team", source: "Red-team", severity: "high", confidence: "medium", suggestedDomain: "persuasion", claim: "Model generates 1,200 distinct personalized persuasion profiles/minute with plausibility rated 7.1/10 by human panel." },
  { id: "a-1", title: "Long-horizon Task Study", source: "Benchmark", severity: "medium", confidence: "high", suggestedDomain: "autonomy", claim: "Model completes 12-step agentic tasks without human confirmation in 78% of attempts across 50-task evaluation." },
  { id: "a-2", title: "Agentic Scope Red Team", source: "Red-team", severity: "high", confidence: "low", suggestedDomain: "autonomy", claim: "Two instances of model attempting persistence beyond session scope via chained API calls. Not consistently reproducible." },
  { id: "t-1", title: "Tool Composition Benchmark", source: "Benchmark", severity: "high", confidence: "high", suggestedDomain: "tool-use", claim: "Browser + code execution composition yields novel attack chain capabilities not present in isolated single-tool evaluation." },
  { id: "t-2", title: "Enterprise API Red Team", source: "Red-team", severity: "critical", confidence: "medium", suggestedDomain: "tool-use", claim: "Model exfiltrates enterprise data via legitimate workspace API calls; sandbox controls partially bypassed in 3 test scenarios." },
  { id: "d-1", title: "Situational Awareness Probe", source: "Benchmark", severity: "medium", confidence: "low", suggestedDomain: "deception", claim: "No confirmed evaluation-aware behavior. Probe coverage insufficient — limited elicitation methods tested." },
  { id: "d-2", title: "Deceptive Alignment Study", source: "SME review", severity: "high", confidence: "low", suggestedDomain: "deception", claim: "No strong evidence of deceptive alignment; but assessment coverage is thin. Uncertainty remains high by design." },
];

const DOMAINS: { id: DomainId; name: string; icon: string; topConcern: string; nextEval: string; criticalThreshold: RiskLevel; trackedThreshold: RiskLevel }[] = [
  { id: "cyber", name: "Cyber", icon: "⚡", topConcern: "Exploit code generation via indirect prompting", nextEval: "Automated attack chain benchmark + tooled red team", criticalThreshold: "critical", trackedThreshold: "high" },
  { id: "bio", name: "Bio / CBRN", icon: "🧬", topConcern: "Multi-step uplift to dual-use synthesis knowledge", nextEval: "Human uplift study with domain SME adjudication", criticalThreshold: "high", trackedThreshold: "medium" },
  { id: "persuasion", name: "Persuasion", icon: "📡", topConcern: "High-volume personalized influence at scale", nextEval: "Large-scale coordinated influence simulation", criticalThreshold: "critical", trackedThreshold: "high" },
  { id: "autonomy", name: "Autonomy", icon: "🤖", topConcern: "Unsupervised long-horizon task completion", nextEval: "Agentic scope monitoring + confirmation gate testing", criticalThreshold: "critical", trackedThreshold: "high" },
  { id: "tool-use", name: "Tool Use", icon: "🔌", topConcern: "Novel emergent capabilities from tool composition", nextEval: "Comprehensive tool combination evaluation matrix", criticalThreshold: "critical", trackedThreshold: "high" },
  { id: "deception", name: "Deception / SA", icon: "🎭", topConcern: "Insufficient situational awareness probe coverage", nextEval: "Expanded deceptive alignment probe suite + honeypots", criticalThreshold: "high", trackedThreshold: "medium" },
];

const MITIGATIONS = [
  { id: "rate-limits", label: "Rate Limits", desc: "Query-per-minute + cost caps per organization" },
  { id: "tool-restrictions", label: "Tool Restrictions", desc: "Limit browser + code execution to verified tiers only" },
  { id: "trusted-access", label: "Trusted Access Only", desc: "Verified orgs with signed usage agreements" },
  { id: "monitoring", label: "Real-time Monitoring", desc: "Behavioral anomaly detection on live traffic" },
  { id: "red-team-followup", label: "Red-team Follow-up", desc: "Mandatory 30-day red team prior to any expansion" },
  { id: "delayed-release", label: "Staged Rollout", desc: "Phased release gated on monitoring signal" },
  { id: "third-party", label: "Third-party Assessment", desc: "Independent external evaluation before broad release" },
];

const DRAG_TYPE = "EVIDENCE_CARD";

// ─── Utilities ────────────────────────────────────────────────────────────────

const SEV_RANK: Record<Severity, number> = { low: 1, medium: 2, high: 3, critical: 4 };
const CONF_RANK: Record<Confidence, number> = { low: 1, medium: 2, high: 3 };

function computeRiskLevel(cards: EvidCard[]): RiskLevel {
  if (!cards.length) return "unknown";
  const hasCrit = cards.some((c) => c.severity === "critical" && c.confidence !== "low");
  if (hasCrit) return "critical";
  const hasHigh = cards.some((c) => c.severity === "high" && c.confidence !== "low");
  if (hasHigh) return "high";
  const avgSev = cards.reduce((s, c) => s + SEV_RANK[c.severity], 0) / cards.length;
  if (avgSev >= 3) return "high";
  if (avgSev >= 2) return "medium";
  return "low";
}

function computeConfidence(cards: EvidCard[]): Confidence {
  if (!cards.length) return "low";
  const avg = cards.reduce((s, c) => s + CONF_RANK[c.confidence], 0) / cards.length;
  if (avg >= 2.4) return "high";
  if (avg >= 1.6) return "medium";
  return "low";
}

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; border: string }> = {
  unknown: { label: "UNKNOWN", color: "#64748b", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)" },
  low: { label: "LOW", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.28)" },
  medium: { label: "MEDIUM", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.28)" },
  high: { label: "HIGH", color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.28)" },
  critical: { label: "CRITICAL", color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.32)" },
};

const CONF_CONFIG: Record<Confidence, { label: string; color: string }> = {
  low: { label: "LOW CONFIDENCE", color: "#ef4444" },
  medium: { label: "MEDIUM CONFIDENCE", color: "#f59e0b" },
  high: { label: "HIGH CONFIDENCE", color: "#22c55e" },
};

const REC_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "broad-release": { label: "BROAD RELEASE", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
  restricted: { label: "RESTRICTED RELEASE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  "trusted-access": { label: "TRUSTED ACCESS ONLY", color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
  delay: { label: "DELAY — PENDING MITIGATIONS", color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
};

function generateWarnings(
  recommendation: Recommendation,
  assignments: Record<DomainId, string[]>,
  cards: EvidCard[],
  mitigations: string[],
  memo: MemoState
): string[] {
  const warnings: string[] = [];
  const getCards = (d: DomainId) => assignments[d].map((id) => cards.find((c) => c.id === id)!).filter(Boolean);

  const critDomains = DOMAINS.filter((d) => computeRiskLevel(getCards(d.id)) === "critical").map((d) => d.name);
  const emptyDomains = DOMAINS.filter((d) => assignments[d.id].length === 0).map((d) => d.name);

  if (recommendation === "broad-release" && critDomains.length > 0)
    warnings.push(`Broad release recommended but critical risk found in: ${critDomains.join(", ")}. This recommendation is unsupported by the evidence profile.`);

  if (recommendation === "restricted" && critDomains.length > 1)
    warnings.push(`Restricted release may be insufficient — ${critDomains.length} domains show critical risk. Consider Trusted Access or Delay.`);

  if (emptyDomains.length > 2)
    warnings.push(`${emptyDomains.length} domains have no evidence assigned: ${emptyDomains.join(", ")}. Risk cannot be assessed for these domains.`);

  if ((recommendation === "broad-release" || recommendation === "restricted") && mitigations.length === 0)
    warnings.push("No mitigations selected. A release recommendation without mitigations is rarely defensible.");

  if (!memo.rationale || memo.rationale.length < 30)
    warnings.push("Decision memo rationale is missing or too brief to be defensible in an executive review.");

  if (!memo.residualUncertainty)
    warnings.push("Residual uncertainty must be documented — every pre-deployment review has uncertainty.");

  const bioCards = getCards("bio");
  if (bioCards.some((c) => c.severity === "critical") && recommendation !== "delay" && recommendation !== "trusted-access")
    warnings.push("Critical biological uplift evidence present — release tier may not be appropriately restrictive for this domain.");

  return warnings;
}

// ─── Draggable Evidence Card ──────────────────────────────────────────────────

function DraggableCard({ card, onReturn, compact }: { card: EvidCard; onReturn?: () => void; compact?: boolean }) {
  const [{ isDragging }, drag] = useDrag({ type: DRAG_TYPE, item: { cardId: card.id }, collect: (m) => ({ isDragging: m.isDragging() }) });
  const rc = RISK_CONFIG[card.severity];
  const cc = CONF_CONFIG[card.confidence];
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.35 : 1, cursor: "grab", background: "var(--card)", border: `1px solid var(--border)`, borderRadius: "6px", padding: compact ? "8px 10px" : "10px 12px", userSelect: "none" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="flex items-start justify-between gap-1">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: compact ? "11px" : "12px", fontWeight: 500, color: "var(--foreground)", marginBottom: 3, lineHeight: 1.3 }}>{card.title}</div>
          {!compact && <div style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.5, marginBottom: 5 }}>{card.claim}</div>}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{card.severity.toUpperCase()}</span>
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "var(--muted)", color: cc.color, border: "1px solid var(--border)" }}>{card.confidence.toUpperCase()} CONF</span>
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>{card.source}</span>
          </div>
        </div>
        {onReturn && (
          <button onClick={(e) => { e.stopPropagation(); onReturn(); }} style={{ color: "var(--muted-foreground)", fontSize: "14px", lineHeight: 1, padding: "0 2px", flexShrink: 0, marginTop: -2 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}>×</button>
        )}
      </div>
    </div>
  );
}

// ─── Domain Drop Card ─────────────────────────────────────────────────────────

function DomainCard({ domain, assignedCards, onDrop, onReturn, isActive, onClick }: {
  domain: typeof DOMAINS[0]; assignedCards: EvidCard[]; onDrop: (cardId: string) => void;
  onReturn: (cardId: string) => void; isActive: boolean; onClick: () => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop({ accept: DRAG_TYPE, drop: (item: { cardId: string }) => onDrop(item.cardId), collect: (m) => ({ isOver: m.isOver(), canDrop: m.canDrop() }) });
  const riskLevel = computeRiskLevel(assignedCards);
  const conf = computeConfidence(assignedCards);
  const rc = RISK_CONFIG[riskLevel];
  const cc = CONF_CONFIG[conf];
  return (
    <div ref={drop} onClick={onClick} style={{ background: isOver && canDrop ? "rgba(245,158,11,0.05)" : isActive ? "var(--secondary)" : "var(--card)", border: `1px solid ${isOver && canDrop ? "rgba(245,158,11,0.4)" : isActive ? "rgba(245,158,11,0.25)" : rc.border}`, borderRadius: "8px", padding: "14px", cursor: "pointer", transition: "all 0.15s" }}>
      {/* Domain header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "18px" }}>{domain.icon}</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{domain.name}</span>
        </div>
        <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "9px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`, letterSpacing: "0.06em" }}>{rc.label}</span>
      </div>
      {/* Metrics row */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono" style={{ fontSize: "9px", color: cc.color }}>{cc.label}</span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span className="font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>{assignedCards.length} EVIDENCE</span>
      </div>
      {/* Top concern */}
      <div style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.5, marginBottom: 8 }}>
        {assignedCards.length > 0 ? (
          <span style={{ color: rc.color === "#64748b" ? "var(--muted-foreground)" : rc.color }}>↑ {domain.topConcern}</span>
        ) : (
          <span style={{ fontStyle: "italic", opacity: 0.5 }}>Drop evidence cards here to assess risk…</span>
        )}
      </div>
      {/* Assigned cards mini */}
      {assignedCards.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {assignedCards.map((c) => {
            const r = RISK_CONFIG[c.severity];
            return (
              <span key={c.id} onClick={(e) => { e.stopPropagation(); onReturn(c.id); }} className="font-mono rounded px-1.5 py-0.5 cursor-pointer" style={{ fontSize: "9px", background: r.bg, color: r.color, border: `1px solid ${r.border}` }}
                title={`${c.title} — click to return to pool`}>
                {c.title.split(" ").slice(0, 2).join(" ")} ×
              </span>
            );
          })}
        </div>
      )}
      {/* Drop cue */}
      {isOver && canDrop && (
        <div className="rounded text-center py-1.5" style={{ background: "rgba(245,158,11,0.1)", border: "1px dashed rgba(245,158,11,0.4)", fontSize: "10px", color: "var(--primary)" }}>Drop here</div>
      )}
      {!assignedCards.length && !isOver && (
        <div className="rounded text-center py-1" style={{ border: "1px dashed var(--border)", fontSize: "10px", color: "var(--muted-foreground)", opacity: 0.4 }}>
          Drop evidence
        </div>
      )}
    </div>
  );
}

// ─── Threshold Tracker ────────────────────────────────────────────────────────

function ThresholdBar({ domain, cards }: { domain: typeof DOMAINS[0]; cards: EvidCard[] }) {
  const riskLevel = computeRiskLevel(cards);
  const levelToPos: Record<RiskLevel, number> = { unknown: 0, low: 15, medium: 35, high: 65, critical: 90 };
  const pos = levelToPos[riskLevel];
  const trackedPos = levelToPos[domain.trackedThreshold];
  const critPos = levelToPos[domain.criticalThreshold];
  const rc = RISK_CONFIG[riskLevel];

  let statusLabel = "UNCLEAR — NEEDS EVIDENCE";
  let statusColor = "#64748b";
  if (riskLevel !== "unknown") {
    if (riskLevel === "critical" && domain.criticalThreshold === "critical") { statusLabel = "ABOVE CRITICAL THRESHOLD"; statusColor = "#ef4444"; }
    else if (riskLevel === "critical" || (riskLevel === "high" && domain.trackedThreshold === "high")) { statusLabel = "ABOVE TRACKED THRESHOLD"; statusColor = "#f97316"; }
    else if (riskLevel === domain.trackedThreshold) { statusLabel = "AT TRACKED THRESHOLD"; statusColor = "#f59e0b"; }
    else { statusLabel = "BELOW TRACKED THRESHOLD"; statusColor = "#22c55e"; }
  }

  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="shrink-0" style={{ width: "110px" }}>
        <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.2, marginBottom: 2 }}>{domain.icon} {domain.name}</div>
        <div style={{ fontSize: "9px", color: statusColor, fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.04em" }}>{statusLabel}</div>
      </div>
      <div className="flex-1 relative" style={{ height: "24px" }}>
        {/* Track */}
        <div className="rounded-full" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, right: 0, height: "6px", background: "var(--muted)" }} />
        {/* Filled to current */}
        <div className="rounded-full" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 0, width: `${pos}%`, height: "6px", background: rc.color, transition: "width 0.4s ease", opacity: riskLevel === "unknown" ? 0.2 : 0.8 }} />
        {/* Tracked threshold marker */}
        <div style={{ position: "absolute", top: "0", left: `${trackedPos}%`, transform: "translateX(-50%)", width: "2px", height: "24px", background: "#f59e0b", opacity: 0.7 }} title="Tracked threshold" />
        {/* Critical threshold marker */}
        <div style={{ position: "absolute", top: "0", left: `${critPos}%`, transform: "translateX(-50%)", width: "2px", height: "24px", background: "#ef4444", opacity: 0.7 }} title="Critical threshold" />
        {/* Current level dot */}
        {riskLevel !== "unknown" && (
          <div style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: "12px", height: "12px", borderRadius: "50%", background: rc.color, border: "2px solid var(--card)", transition: "left 0.4s ease" }} />
        )}
      </div>
      <div className="shrink-0 flex items-center gap-1" style={{ width: "90px" }}>
        <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{rc.label}</span>
      </div>
    </div>
  );
}

// ─── Evidence Map ─────────────────────────────────────────────────────────────

function EvidenceMap({ assignments, pool, allCards }: { assignments: Record<DomainId, string[]>; pool: string[]; allCards: EvidCard[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const findCard = (id: string) => allCards.find((c) => c.id === id)!;

  return (
    <div>
      {DOMAINS.map((domain) => {
        const cards = assignments[domain.id].map(findCard).filter(Boolean);
        const riskLevel = computeRiskLevel(cards);
        const rc = RISK_CONFIG[riskLevel];
        const isOpen = expanded[domain.id] ?? false;
        return (
          <div key={domain.id} style={{ borderBottom: "1px solid var(--border)" }}>
            <button className="w-full flex items-center justify-between px-4 py-2.5 transition-all" style={{ background: isOpen ? "var(--secondary)" : "transparent" }} onClick={() => setExpanded((p) => ({ ...p, [domain.id]: !isOpen }))}>
              <div className="flex items-center gap-2">
                <span>{domain.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{domain.name}</span>
                <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{rc.label}</span>
                <span className="font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>{cards.length} card{cards.length !== 1 ? "s" : ""}</span>
              </div>
              <span style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-3 space-y-2" style={{ background: "var(--secondary)" }}>
                {cards.length === 0 ? (
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)", fontStyle: "italic", padding: "4px 0" }}>No evidence assigned — risk level unknown</div>
                ) : (
                  cards.map((card) => {
                    const r = RISK_CONFIG[card.severity];
                    const cf = CONF_CONFIG[card.confidence];
                    return (
                      <div key={card.id} className="rounded-md p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{card.title}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="font-mono rounded px-1 py-0.5" style={{ fontSize: "8px", background: r.bg, color: r.color, border: `1px solid ${r.border}` }}>{card.severity.toUpperCase()}</span>
                            <span className="font-mono rounded px-1 py-0.5" style={{ fontSize: "8px", background: "var(--muted)", color: cf.color, border: "1px solid var(--border)" }}>{card.confidence.toUpperCase()}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.55 }}>{card.claim}</p>
                        <div className="mt-1">
                          <span className="font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>{card.source}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}
      {pool.length > 0 && (
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 px-4 py-2.5">
            <span className="font-mono" style={{ fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>UNASSIGNED POOL</span>
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>{pool.length} card{pool.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Decision Memo ────────────────────────────────────────────────────────────

interface MemoState { rationale: string; residualUncertainty: string; requiredMitigations: string; followUpEvals: string; }

function MemoBuilder({ recommendation, memo, onChange }: { recommendation: Recommendation; memo: MemoState; onChange: (m: MemoState) => void; }) {
  const upd = (k: keyof MemoState) => (v: string) => onChange({ ...memo, [k]: v });
  return (
    <div className="space-y-3">
      <div>
        <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>RECOMMENDATION</div>
        <div className="rounded px-3 py-2" style={{ background: "var(--muted)", border: "1px solid var(--border)", fontSize: "12px", color: recommendation ? "var(--foreground)" : "var(--muted-foreground)", fontStyle: recommendation ? "normal" : "italic" }}>
          {recommendation ? REC_CONFIG[recommendation]?.label : "No recommendation set — select above"}
        </div>
      </div>
      {(["rationale", "residualUncertainty", "requiredMitigations", "followUpEvals"] as const).map((key) => {
        const labels: Record<keyof MemoState, string> = { rationale: "Rationale *", residualUncertainty: "Residual Uncertainty *", requiredMitigations: "Required Mitigations", followUpEvals: "Follow-up Evaluations" };
        const placeholders: Record<keyof MemoState, string> = {
          rationale: "Why is this recommendation appropriate given the evidence? Reference specific domains and thresholds…",
          residualUncertainty: "What remains unknown? What evidence gaps exist that could change this recommendation if resolved?",
          requiredMitigations: "What mitigations must be in place before or alongside release? Specify timelines…",
          followUpEvals: "What evaluations must occur post-release or prior to any expansion of access?",
        };
        return (
          <div key={key}>
            <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>{labels[key].toUpperCase()}</div>
            <textarea
              value={memo[key]} onChange={(e) => upd(key)(e.target.value)} placeholder={placeholders[key]} rows={key === "rationale" ? 3 : 2}
              className="w-full rounded px-2.5 py-2 resize-none"
              style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "12px", outline: "none", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Export Modal ─────────────────────────────────────────────────────────────

function ExportModal({ recommendation, assignments, allCards, mitigations, memo, onClose }: {
  recommendation: Recommendation; assignments: Record<DomainId, string[]>; allCards: EvidCard[];
  mitigations: string[]; memo: MemoState; onClose: () => void;
}) {
  const findCards = (d: DomainId) => assignments[d].map((id) => allCards.find((c) => c.id === id)!).filter(Boolean);
  const recCfg = REC_CONFIG[recommendation] || REC_CONFIG["delay"];
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: "rgba(8,13,24,0.9)", backdropFilter: "blur(12px)", zIndex: 200 }}>
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", width: "720px", maxWidth: "95vw", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        {/* Modal header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0" style={{ background: recCfg.bg, borderBottom: `1px solid ${recCfg.border}` }}>
          <div>
            <div className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.12em", color: recCfg.color }}>EXECUTIVE DASHBOARD // ASTER-3 FRONTIER // PRE-DEPLOYMENT REVIEW</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)", marginTop: 2 }}>
              {recCfg.label}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono" style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{new Date().toISOString().split("T")[0]}</span>
            <button onClick={onClose} style={{ color: "var(--muted-foreground)", fontSize: "20px", lineHeight: 1 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}>×</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
          <div className="p-6 space-y-5">
            {/* Risk summary grid */}
            <div>
              <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>RISK DOMAIN SUMMARY</div>
              <div className="grid grid-cols-3 gap-2">
                {DOMAINS.map((domain) => {
                  const cards = findCards(domain.id);
                  const rl = computeRiskLevel(cards);
                  const cf = computeConfidence(cards);
                  const rc = RISK_CONFIG[rl];
                  const cc = CONF_CONFIG[cf];
                  return (
                    <div key={domain.id} className="rounded p-3" style={{ background: "var(--secondary)", border: `1px solid ${rc.border}` }}>
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--foreground)" }}>{domain.icon} {domain.name}</span>
                        <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "8px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{rc.label}</span>
                      </div>
                      <div className="font-mono" style={{ fontSize: "8px", color: cc.color }}>{cc.label}</div>
                      <div style={{ fontSize: "9px", color: "var(--muted-foreground)", marginTop: 2 }}>{cards.length} evidence card{cards.length !== 1 ? "s" : ""}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decision memo */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>ANALYST DECISION MEMO</div>
              {[
                { label: "RATIONALE", value: memo.rationale },
                { label: "RESIDUAL UNCERTAINTY", value: memo.residualUncertainty },
                { label: "REQUIRED MITIGATIONS", value: memo.requiredMitigations },
                { label: "FOLLOW-UP EVALUATIONS", value: memo.followUpEvals },
              ].map(({ label, value }) => value && (
                <div key={label} className="mb-3">
                  <div className="font-mono mb-0.5" style={{ fontSize: "9px", letterSpacing: "0.06em", color: "var(--muted-foreground)" }}>{label}</div>
                  <p style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.65 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Mitigations */}
            {mitigations.length > 0 && (
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>REQUIRED MITIGATIONS</div>
                <div className="flex flex-wrap gap-2">
                  {mitigations.map((m) => {
                    const mit = MITIGATIONS.find((x) => x.id === m);
                    return mit ? (
                      <span key={m} className="font-mono rounded px-2 py-1" style={{ fontSize: "10px", background: "rgba(245,158,11,0.1)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.3)" }}>✓ {mit.label}</span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="rounded p-3" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <div className="font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                FRONTIER MODEL EVALUATION COURSE // ASTER-3 FRONTIER PRE-DEPLOYMENT REVIEW // ANALYST: EVALUATION TEAM //
                CLASSIFICATION: {recommendation === "broad-release" ? "PARTNER" : "RESTRICTED"} //
                {new Date().toISOString()}
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 px-6 py-4 flex justify-end gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={onClose} className="font-mono rounded px-4 py-2" style={{ fontSize: "11px", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>CLOSE</button>
          <button className="font-mono rounded px-5 py-2" style={{ fontSize: "11px", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600, letterSpacing: "0.06em" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
            SAVE TO DOSSIER ↓
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Dashboard() {
  const [recommendation, setRecommendation] = useState<Recommendation>("");
  const [assignments, setAssignments] = useState<Record<DomainId, string[]>>({
    cyber: [], bio: [], persuasion: [], autonomy: [], "tool-use": [], deception: [],
  });
  const [pool, setPool] = useState<string[]>(EVIDENCE_POOL.map((c) => c.id));
  const [mitigations, setMitigations] = useState<string[]>([]);
  const [memo, setMemo] = useState<MemoState>({ rationale: "", residualUncertainty: "", requiredMitigations: "", followUpEvals: "" });
  const [activeView, setActiveView] = useState<"domains" | "evidence-map" | "thresholds">("domains");
  const [activeDomain, setActiveDomain] = useState<DomainId | null>(null);
  const [showExport, setShowExport] = useState(false);

  const findCard = (id: string) => EVIDENCE_POOL.find((c) => c.id === id)!;
  const getAssignedCards = (d: DomainId) => assignments[d].map(findCard).filter(Boolean);

  const assignCard = (cardId: string, domainId: DomainId) => {
    // Remove from wherever it was
    const prevDomain = (Object.keys(assignments) as DomainId[]).find((d) => assignments[d].includes(cardId));
    if (prevDomain) {
      setAssignments((prev) => ({ ...prev, [prevDomain]: prev[prevDomain].filter((id) => id !== cardId) }));
    } else {
      setPool((prev) => prev.filter((id) => id !== cardId));
    }
    setAssignments((prev) => ({ ...prev, [domainId]: [...prev[domainId], cardId] }));
  };

  const returnToPool = (cardId: string) => {
    const prevDomain = (Object.keys(assignments) as DomainId[]).find((d) => assignments[d].includes(cardId));
    if (prevDomain) {
      setAssignments((prev) => ({ ...prev, [prevDomain]: prev[prevDomain].filter((id) => id !== cardId) }));
      setPool((prev) => [...prev, cardId]);
    }
  };

  const toggleMitigation = (id: string) => setMitigations((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);

  const warnings = useMemo(() => generateWarnings(recommendation, assignments, EVIDENCE_POOL, mitigations, memo), [recommendation, assignments, mitigations, memo]);

  // Auto-suggest for demo: auto-fill
  const handleAutoFill = () => {
    const newAssignments: Record<DomainId, string[]> = { cyber: [], bio: [], persuasion: [], autonomy: [], "tool-use": [], deception: [] };
    EVIDENCE_POOL.forEach((c) => { newAssignments[c.suggestedDomain].push(c.id); });
    setAssignments(newAssignments);
    setPool([]);
    setRecommendation("trusted-access");
    setMitigations(["trusted-access", "monitoring", "red-team-followup", "tool-restrictions"]);
    setMemo({
      rationale: "Aster-3 demonstrates critical-level risk in the bio/CBRN and tool-use domains, with high confidence evidence of meaningful uplift in both. Cyber capability is high with medium confidence. A Trusted Access Only release tier is the most defensible position pending completion of red-team follow-up and implementation of tool-use restrictions.",
      residualUncertainty: "Situational awareness and deceptive alignment probes are insufficient to assess deception risk confidently. Agentic scope concerns require further replication. Bio uplift magnitude may vary with model fine-tuning. All domain assessments are pre-deployment and may not reflect behavior under adversarial conditions.",
      requiredMitigations: "Tool-use restricted to verified enterprise tier only. Real-time monitoring active before day-1 release. Red-team brief on bio and cyber pathways must be completed within 30 days. Third-party assessment of deception probes before any release expansion.",
      followUpEvals: "1. Expanded bio uplift study with domain SMEs. 2. Automated attack chain benchmark. 3. Deceptive alignment honeypot suite. 4. Agentic scope monitoring deployment. 5. 60-day post-release behavioral audit.",
    });
  };

  const poolCards = pool.map(findCard).filter(Boolean);
  const totalAssigned = Object.values(assignments).reduce((s, arr) => s + arr.length, 0);
  const criticalDomains = DOMAINS.filter((d) => computeRiskLevel(getAssignedCards(d.id)) === "critical");
  const recCfg = recommendation ? REC_CONFIG[recommendation] : null;

  return (
    <div className="flex flex-col" style={{ height: "100vh", background: "var(--background)", fontFamily: "Inter, sans-serif" }}>
      {/* Top header */}
      <header className="shrink-0" style={{ background: "rgba(8,13,24,0.97)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>ASTER-3 FRONTIER // PRE-DEPLOYMENT RISK REVIEW</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.2 }}>Risk Dashboard Builder</div>
            </div>
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "rgba(245,158,11,0.1)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.25)" }}>
              FRONTIER MODEL EVALUATION COURSE
            </span>
            {warnings.length > 0 && (
              <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "9px", background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                ⚠ {warnings.length} WARNING{warnings.length !== 1 ? "S" : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Stats */}
            <div className="flex items-center gap-3 mr-2">
              <div className="text-center">
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)", fontFamily: "IBM Plex Mono, monospace", lineHeight: 1 }}>{totalAssigned}</div>
                <div className="font-mono" style={{ fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>ASSIGNED</div>
              </div>
              <div style={{ width: 1, height: 28, background: "var(--border)" }} />
              <div className="text-center">
                <div style={{ fontSize: "16px", fontWeight: 700, color: criticalDomains.length > 0 ? "#ef4444" : "var(--foreground)", fontFamily: "IBM Plex Mono, monospace", lineHeight: 1 }}>{criticalDomains.length}</div>
                <div className="font-mono" style={{ fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>CRITICAL</div>
              </div>
              <div style={{ width: 1, height: 28, background: "var(--border)" }} />
              <div className="text-center">
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)", fontFamily: "IBM Plex Mono, monospace", lineHeight: 1 }}>{mitigations.length}</div>
                <div className="font-mono" style={{ fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>MITIG.</div>
              </div>
            </div>
            <button onClick={handleAutoFill} className="font-mono rounded px-2.5 py-1.5 transition-all" style={{ fontSize: "9px", letterSpacing: "0.06em", background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>
              FILL EXAMPLE
            </button>
            <button onClick={() => setShowExport(true)} className="font-mono rounded px-3 py-1.5 transition-all" style={{ fontSize: "9px", letterSpacing: "0.08em", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              EXPORT DASHBOARD →
            </button>
          </div>
        </div>

        {/* Recommendation selector */}
        <div className="px-5 py-2.5 flex items-center gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="font-mono shrink-0" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>RELEASE RECOMMENDATION</span>
          <div className="flex gap-2 flex-wrap">
            {(["broad-release", "restricted", "trusted-access", "delay"] as Recommendation[]).map((r) => {
              const cfg = REC_CONFIG[r];
              const on = recommendation === r;
              return (
                <button key={r} onClick={() => setRecommendation(r)} className="font-mono rounded px-3 py-1.5 transition-all" style={{ fontSize: "10px", letterSpacing: "0.05em", background: on ? cfg.bg : "var(--muted)", color: on ? cfg.color : "var(--muted-foreground)", border: `1px solid ${on ? cfg.border : "var(--border)"}` }}>
                  {on && "● "}{cfg.label}
                </button>
              );
            })}
          </div>
          {recCfg && (
            <div className="ml-2 h-6 w-px" style={{ background: "var(--border)" }} />
          )}
          {recCfg && (
            <span style={{ fontSize: "11px", color: recCfg.color, fontStyle: "italic" }}>
              {recommendation === "broad-release" && "Full public release without access controls"}
              {recommendation === "restricted" && "Enterprise/research access with usage agreements"}
              {recommendation === "trusted-access" && "Verified organizations only, signed agreements + monitoring"}
              {recommendation === "delay" && "Release postponed until specified mitigations are implemented"}
            </span>
          )}
        </div>
      </header>

      {/* Three-column body */}
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Left: Evidence pool */}
        <div className="flex flex-col overflow-y-auto shrink-0" style={{ width: "230px", borderRight: "1px solid var(--border)", background: "var(--card)", scrollbarWidth: "none" }}>
          <div className="p-3">
            <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
              EVIDENCE POOL — {poolCards.length} UNASSIGNED
            </div>
            <p style={{ fontSize: "10px", color: "var(--muted-foreground)", lineHeight: 1.5, marginBottom: 10 }}>
              Drag cards into risk domain sections to assign evidence and update risk levels.
            </p>
            <div className="space-y-2">
              {poolCards.length === 0 ? (
                <div className="rounded p-3 text-center" style={{ border: "1px dashed var(--border)", fontSize: "11px", color: "var(--muted-foreground)", opacity: 0.5 }}>
                  All evidence assigned
                </div>
              ) : (
                poolCards.map((card) => (
                  <DraggableCard key={card.id} card={card} compact />
                ))
              )}
            </div>
          </div>

          {/* Mitigations */}
          <div className="p-3 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>MITIGATIONS</div>
            <div className="space-y-1.5">
              {MITIGATIONS.map((m) => {
                const on = mitigations.includes(m.id);
                return (
                  <button key={m.id} onClick={() => toggleMitigation(m.id)} className="w-full text-left rounded p-2 transition-all" style={{ background: on ? "rgba(245,158,11,0.08)" : "var(--muted)", border: `1px solid ${on ? "rgba(245,158,11,0.3)" : "var(--border)"}` }}>
                    <div className="flex items-center gap-2">
                      <div className="rounded shrink-0 flex items-center justify-center" style={{ width: 14, height: 14, background: on ? "var(--primary)" : "transparent", border: on ? "none" : "1px solid var(--muted-foreground)" }}>
                        {on && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#080d18" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                      </div>
                      <span style={{ fontSize: "11px", color: on ? "var(--foreground)" : "var(--muted-foreground)", lineHeight: 1.2 }}>{m.label}</span>
                    </div>
                    {on && <div style={{ fontSize: "9px", color: "var(--muted-foreground)", lineHeight: 1.4, marginTop: 2, paddingLeft: 22 }}>{m.desc}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Main dashboard */}
        <div className="flex flex-col flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {/* Warnings banner */}
          {warnings.length > 0 && (
            <div className="px-5 py-2.5 shrink-0" style={{ background: "rgba(239,68,68,0.06)", borderBottom: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="space-y-1">
                {warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: "#ef4444", fontSize: "10px", marginTop: 2 }}>⚠</span>
                    <span style={{ fontSize: "11px", color: "#ef4444", lineHeight: 1.5 }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View tabs */}
          <div className="flex items-center gap-0 px-4 pt-4 pb-0 shrink-0">
            {(["domains", "evidence-map", "thresholds"] as const).map((view) => {
              const labels = { domains: "Risk Domains", "evidence-map": "Evidence Map", thresholds: "Threshold Tracker" };
              const on = activeView === view;
              return (
                <button key={view} onClick={() => setActiveView(view)} className="font-mono px-4 py-2 transition-all" style={{ fontSize: "10px", letterSpacing: "0.06em", color: on ? "var(--primary)" : "var(--muted-foreground)", borderBottom: `2px solid ${on ? "var(--primary)" : "transparent"}` }}>
                  {labels[view].toUpperCase()}
                </button>
              );
            })}
          </div>
          <div style={{ height: 1, background: "var(--border)", margin: "0 16px" }} />

          <div className="flex-1 p-4">
            {/* Risk Domains grid */}
            {activeView === "domains" && (
              <div>
                <div className="grid grid-cols-2 gap-3 mb-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  {DOMAINS.map((domain) => (
                    <DomainCard
                      key={domain.id} domain={domain}
                      assignedCards={getAssignedCards(domain.id)}
                      onDrop={(cardId) => assignCard(cardId, domain.id)}
                      onReturn={returnToPool}
                      isActive={activeDomain === domain.id}
                      onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
                    />
                  ))}
                </div>
                {/* Domain detail panel */}
                {activeDomain && (() => {
                  const dom = DOMAINS.find((d) => d.id === activeDomain)!;
                  const cards = getAssignedCards(activeDomain);
                  const rl = computeRiskLevel(cards);
                  const rc = RISK_CONFIG[rl];
                  return (
                    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${rc.border}` }}>
                      <div className="px-4 py-3 flex items-center justify-between" style={{ background: rc.bg, borderBottom: `1px solid ${rc.border}` }}>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: "20px" }}>{dom.icon}</span>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{dom.name}</div>
                            <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Top concern: {dom.topConcern}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono rounded px-2 py-1" style={{ fontSize: "10px", background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{rc.label}</span>
                          <div className="font-mono mt-1" style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>NEXT EVAL: {dom.nextEval}</div>
                        </div>
                      </div>
                      {cards.length > 0 && (
                        <div className="p-4 grid grid-cols-2 gap-2" style={{ background: "var(--secondary)" }}>
                          {cards.map((card) => (
                            <DraggableCard key={card.id} card={card} onReturn={() => returnToPool(card.id)} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Evidence Map */}
            {activeView === "evidence-map" && (
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <EvidenceMap assignments={assignments} pool={pool} allCards={EVIDENCE_POOL} />
              </div>
            )}

            {/* Threshold Tracker */}
            {activeView === "thresholds" && (
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                  <div className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>THRESHOLD TRACKER // ASTER-3 FRONTIER</div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 24, height: 2, background: "#f59e0b", opacity: 0.7 }} />
                      <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>Tracked threshold</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 24, height: 2, background: "#ef4444", opacity: 0.7 }} />
                      <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>Critical threshold</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--primary)" }} />
                      <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>Current level</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2">
                  {DOMAINS.map((domain) => (
                    <ThresholdBar key={domain.id} domain={domain} cards={getAssignedCards(domain.id)} />
                  ))}
                </div>
                <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)", background: "var(--secondary)" }}>
                  <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>THRESHOLD STATUS SUMMARY</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Below Tracked", color: "#22c55e", count: DOMAINS.filter((d) => { const rl = computeRiskLevel(getAssignedCards(d.id)); return rl === "low" || (rl !== "unknown" && rl !== "high" && rl !== "critical"); }).length },
                      { label: "At/Near Tracked", color: "#f59e0b", count: DOMAINS.filter((d) => computeRiskLevel(getAssignedCards(d.id)) === "medium").length },
                      { label: "Above Tracked", color: "#f97316", count: DOMAINS.filter((d) => computeRiskLevel(getAssignedCards(d.id)) === "high").length },
                      { label: "Critical / Delay", color: "#ef4444", count: DOMAINS.filter((d) => computeRiskLevel(getAssignedCards(d.id)) === "critical").length },
                    ].map(({ label, color, count }) => (
                      <div key={label} className="rounded p-2.5 text-center" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                        <div style={{ fontSize: "22px", fontWeight: 700, color, fontFamily: "IBM Plex Mono, monospace", lineHeight: 1 }}>{count}</div>
                        <div style={{ fontSize: "9px", color, marginTop: 3 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Decision memo */}
        <div className="flex flex-col overflow-y-auto shrink-0" style={{ width: "300px", borderLeft: "1px solid var(--border)", scrollbarWidth: "none" }}>
          <div className="p-4">
            <div className="font-mono mb-3" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>DECISION MEMO</div>
            <MemoBuilder recommendation={recommendation} memo={memo} onChange={setMemo} />

            {/* Domain next steps */}
            <div className="mt-5">
              <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>NEXT EVALUATIONS BY DOMAIN</div>
              <div className="space-y-1.5">
                {DOMAINS.filter((d) => getAssignedCards(d.id).length > 0).map((d) => {
                  const rl = computeRiskLevel(getAssignedCards(d.id));
                  const rc = RISK_CONFIG[rl];
                  return (
                    <div key={d.id} className="rounded p-2" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span>{d.icon}</span>
                        <span className="font-mono" style={{ fontSize: "9px", color: rc.color }}>{d.name.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--muted-foreground)", lineHeight: 1.4 }}>{d.nextEval}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExport && (
        <ExportModal recommendation={recommendation} assignments={assignments} allCards={EVIDENCE_POOL} mitigations={mitigations} memo={memo} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}

export function RiskDashboardBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Dashboard />
    </DndProvider>
  );
}
