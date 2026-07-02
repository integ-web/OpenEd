import { DOMAINS, SEVERITIES, EVIDENCE_TYPES, DISCLOSURE_TIERS, SLOT_CONFIG, type Pathway, type RiskClassification } from "../sim-data";
import { RiskBadge } from "./RiskBadge";

interface Props {
  pathways: Pathway[];
  classifications: RiskClassification[];
  onChange: (classifications: RiskClassification[]) => void;
  onNext: () => void;
}

function getOrCreate(classifications: RiskClassification[], pathwayId: string): RiskClassification {
  return (
    classifications.find((c) => c.pathwayId === pathwayId) || {
      pathwayId,
      domain: "",
      severity: "medium" as const,
      evidence: [],
      disclosure: "",
      notes: "",
    }
  );
}

export function Screen5Risk({ pathways, classifications, onChange, onNext }: Props) {
  const updateClassification = (pathwayId: string, updates: Partial<RiskClassification>) => {
    const existing = getOrCreate(classifications, pathwayId);
    const updated = { ...existing, ...updates };
    onChange([...classifications.filter((c) => c.pathwayId !== pathwayId), updated]);
  };

  const toggleEvidence = (pathwayId: string, ev: string) => {
    const existing = getOrCreate(classifications, pathwayId);
    const evidence = existing.evidence.includes(ev)
      ? existing.evidence.filter((e) => e !== ev)
      : [...existing.evidence, ev];
    updateClassification(pathwayId, { evidence });
  };

  const completedCount = classifications.filter(
    (c) => c.domain && c.severity && c.evidence.length > 0 && c.disclosure
  ).length;

  const canProceed = completedCount >= pathways.length && pathways.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
          STEP 5 OF 7 // RISK CLASSIFICATION
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "6px" }}>
          Classify each harm pathway
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
          Assign domain, severity, evidence requirements, and disclosure tier to each pathway you built. Be precise — over- and under-classification both have consequences.
        </p>
      </div>

      <div className="space-y-5">
        {pathways.map((pathway, idx) => {
          const cls = getOrCreate(classifications, pathway.id);
          const isComplete = cls.domain && cls.severity && cls.evidence.length > 0 && cls.disclosure;

          const filledSlots = Object.values(pathway.slots).filter(Boolean);

          return (
            <div
              key={pathway.id}
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${isComplete ? "rgba(34,197,94,0.3)" : "var(--border)"}` }}
            >
              {/* Pathway summary header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    PATHWAY {idx + 1}
                  </span>
                  <div className="flex gap-1">
                    {SLOT_CONFIG.map((slot) => {
                      const val = pathway.slots[slot.key];
                      return (
                        <span
                          key={slot.key}
                          title={val?.label || `No ${slot.label}`}
                          className="font-mono rounded px-1.5 py-0.5"
                          style={{
                            fontSize: "9px",
                            background: val ? `${slot.color}20` : "var(--muted)",
                            color: val ? slot.color : "var(--muted-foreground)",
                            border: `1px solid ${val ? `${slot.color}40` : "var(--border)"}`,
                          }}
                        >
                          {val ? val.label.split(" ")[0] : slot.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isComplete && <span style={{ color: "#22c55e", fontSize: "12px" }}>✓ Classified</span>}
                  {cls.severity && <RiskBadge severity={cls.severity as any} />}
                </div>
              </div>

              {/* Pathway narrative */}
              {filledSlots.length > 0 && (
                <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    {SLOT_CONFIG.filter((s) => pathway.slots[s.key]).map((s, i, arr) => (
                      <span key={s.key}>
                        <strong style={{ color: s.color }}>{pathway.slots[s.key]!.label}</strong>
                        {i < arr.length - 1 ? " → " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {/* Classification form */}
              <div className="p-5 grid grid-cols-2 gap-5" style={{ background: "var(--secondary)" }}>
                {/* Domain */}
                <div>
                  <label className="font-mono text-xs mb-2 block" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                    DOMAIN *
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DOMAINS.map((d) => (
                      <button
                        key={d}
                        onClick={() => updateClassification(pathway.id, { domain: d })}
                        className="font-mono rounded px-2.5 py-1 transition-all"
                        style={{
                          fontSize: "11px",
                          background: cls.domain === d ? "rgba(245,158,11,0.2)" : "var(--muted)",
                          color: cls.domain === d ? "#f59e0b" : "var(--muted-foreground)",
                          border: `1px solid ${cls.domain === d ? "rgba(245,158,11,0.4)" : "var(--border)"}`,
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity */}
                <div>
                  <label className="font-mono text-xs mb-2 block" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                    SEVERITY *
                  </label>
                  <div className="flex gap-2">
                    {SEVERITIES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => updateClassification(pathway.id, { severity: s.value as any })}
                        className="font-mono rounded px-3 py-1.5 flex-1 transition-all"
                        style={{
                          fontSize: "11px",
                          background: cls.severity === s.value ? `${s.color}20` : "var(--muted)",
                          color: cls.severity === s.value ? s.color : "var(--muted-foreground)",
                          border: `1px solid ${cls.severity === s.value ? `${s.color}50` : "var(--border)"}`,
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <label className="font-mono text-xs mb-2 block" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                    EVIDENCE NEEDED * (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {EVIDENCE_TYPES.map((ev) => {
                      const selected = cls.evidence.includes(ev);
                      return (
                        <button
                          key={ev}
                          onClick={() => toggleEvidence(pathway.id, ev)}
                          className="font-mono rounded px-2.5 py-1 transition-all"
                          style={{
                            fontSize: "11px",
                            background: selected ? "rgba(59,130,246,0.2)" : "var(--muted)",
                            color: selected ? "#3b82f6" : "var(--muted-foreground)",
                            border: `1px solid ${selected ? "rgba(59,130,246,0.4)" : "var(--border)"}`,
                          }}
                        >
                          {ev}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Disclosure tier */}
                <div>
                  <label className="font-mono text-xs mb-2 block" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                    DISCLOSURE TIER *
                  </label>
                  <div className="flex gap-2">
                    {DISCLOSURE_TIERS.map((t) => {
                      const colors: Record<string, string> = {
                        public: "#22c55e",
                        partner: "#3b82f6",
                        restricted: "#f97316",
                        internal: "#ef4444",
                      };
                      const color = colors[t];
                      return (
                        <button
                          key={t}
                          onClick={() => updateClassification(pathway.id, { disclosure: t })}
                          className="font-mono rounded px-3 py-1.5 flex-1 transition-all"
                          style={{
                            fontSize: "11px",
                            background: cls.disclosure === t ? `${color}20` : "var(--muted)",
                            color: cls.disclosure === t ? color : "var(--muted-foreground)",
                            border: `1px solid ${cls.disclosure === t ? `${color}50` : "var(--border)"}`,
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Analyst notes */}
                <div className="col-span-2">
                  <label className="font-mono text-xs mb-2 block" style={{ color: "var(--muted-foreground)", letterSpacing: "0.08em" }}>
                    ANALYST NOTES (optional)
                  </label>
                  <textarea
                    value={cls.notes}
                    onChange={(e) => updateClassification(pathway.id, { notes: e.target.value })}
                    rows={2}
                    placeholder="Reasoning, assumptions, or caveats for this classification..."
                    className="w-full rounded px-3 py-2 resize-none"
                    style={{
                      background: "var(--muted)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                      fontSize: "12px",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-8 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          {completedCount}/{pathways.length} pathways fully classified
        </div>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2.5 rounded font-mono text-sm tracking-wider transition-all"
          style={{
            background: canProceed ? "var(--primary)" : "var(--muted)",
            color: canProceed ? "var(--primary-foreground)" : "var(--muted-foreground)",
            cursor: canProceed ? "pointer" : "not-allowed",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          SUBMIT FOR FEEDBACK →
        </button>
      </div>
    </div>
  );
}
