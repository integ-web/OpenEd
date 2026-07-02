import { useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type DisclosureTier = "public" | "partner" | "restricted" | "internal" | "";
type Severity = "low" | "medium" | "high" | "unknown" | "";
type Confidence = "low" | "medium" | "high" | "";
type ThresholdRelation = "above" | "below" | "at" | "indeterminate" | "";
type AdjudicationStrength =
  | "single-rater"
  | "dual-rater-agreement"
  | "dual-rater-disagreement"
  | "panel-consensus"
  | "automated"
  | "";

interface FormData {
  evidenceId: string;
  claim: string;
  domain: string;
  sourceType: string;
  evaluationName: string;
  modelVersion: string;
  setup: string;
  toolsAllowed: string[];
  attempts: string;
  metric: string;
  metricCaveat: string;
  result: string;
  confidence: Confidence;
  confidenceRationale: string;
  externalValidity: Severity;
  externalValidityNotes: string;
  contaminationRisk: Severity;
  contaminationNotes: string;
  adjudicationStrength: AdjudicationStrength;
  thresholdRelation: ThresholdRelation;
  thresholdExplanation: string;
  disclosureTier: DisclosureTier;
  followUp: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  suggestion: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TOOLS = [
  "Browser",
  "Terminal",
  "Code executor",
  "External API",
  "File system",
  "Calculator",
  "None",
];

const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string; textBg: string }
> = {
  public: {
    label: "PUBLIC",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    textBg: "rgba(34,197,94,0.08)",
  },
  partner: {
    label: "PARTNER",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    textBg: "rgba(59,130,246,0.08)",
  },
  restricted: {
    label: "RESTRICTED",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.35)",
    textBg: "rgba(249,115,22,0.08)",
  },
  internal: {
    label: "INTERNAL ONLY",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    textBg: "rgba(239,68,68,0.08)",
  },
};

const VAGUE_TERMS = [
  "some",
  "various",
  "may",
  "possibly",
  "perhaps",
  "certain",
  "many",
  "seems",
  "generally",
  "often",
];

// ─── Validation ──────────────────────────────────────────────────────────────

function validate(form: FormData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (form.claim) {
    const lower = form.claim.toLowerCase();
    const foundVague = VAGUE_TERMS.filter((t) => lower.includes(t));
    if (form.claim.length < 30) {
      warnings.push({
        field: "claim",
        message: "Claim is too brief",
        suggestion:
          "Include the model name, task type, performance metric, and conditions. E.g., "Aster-3 completed 60% of cyber range tasks (12/20) when provided browser and terminal access with scaffolding."",
      });
    } else if (foundVague.length > 0) {
      warnings.push({
        field: "claim",
        message: `Claim contains vague language: "${foundVague.join('", "')}"`,
        suggestion:
          "Replace hedged language with quantified statements. Vague claims weaken evidence weight in system cards and regulatory submissions.",
      });
    }
  }

  if (form.metric && !form.metricCaveat) {
    warnings.push({
      field: "metric",
      message: "Metric has no caveat or scope condition",
      suggestion:
        "Add a caveat field explaining conditions, limitations, or scope (e.g., "Scored with partial credit; evaluators disagreed on 3 tasks").",
    });
  }

  if (form.confidence && !form.confidenceRationale) {
    warnings.push({
      field: "confidence",
      message: "Confidence level has no supporting rationale",
      suggestion:
        "Explain why this confidence level was assigned. Reference sample size, evaluator agreement rate, or replication status.",
    });
  }

  if (form.thresholdRelation && !form.thresholdExplanation) {
    warnings.push({
      field: "thresholdRelation",
      message: "Threshold relation has no explanation",
      suggestion:
        "Specify what threshold applies and how this result relates to it. E.g., "Below the 70% threshold defined in the pre-registration as requiring additional mitigation review."",
    });
  }

  if (!form.disclosureTier) {
    warnings.push({
      field: "disclosureTier",
      message: "Disclosure tier is missing",
      suggestion:
        "All evidence cards must have an explicit disclosure tier before submission. Default to "Internal" if unsure.",
    });
  }

  if (
    form.contaminationRisk === "high" &&
    !form.contaminationNotes
  ) {
    warnings.push({
      field: "contaminationRisk",
      message: "High contamination risk flagged without notes",
      suggestion:
        "Document which tasks or items may be contaminated and how this affects interpretability of results.",
    });
  }

  if (form.adjudicationStrength === "dual-rater-disagreement") {
    warnings.push({
      field: "adjudicationStrength",
      message: "Rater disagreement on record",
      suggestion:
        "Specify the disagreement rate, the disputed items, and how the final score was determined (e.g., majority rule, conservative scoring, or senior adjudicator decision).",
    });
  }

  return warnings;
}

// ─── Annotated Raw Result ────────────────────────────────────────────────────

interface Annotation {
  text: string;
  color: string;
  bg: string;
  tooltip: string;
  action?: (set: (f: Partial<FormData>) => void) => void;
}

const RAW_SEGMENTS: (string | Annotation)[] = [
  '"On ',
  {
    text: "20 cyber range tasks",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    tooltip: "Click → fills Attempts: 20, Domain: cyber",
    action: (set) => set({ attempts: "20", domain: "cyber" }),
  },
  ", Aster-3 completed ",
  {
    text: "12 tasks",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    tooltip: "Click → fills Result: 12/20 tasks completed (60%)",
    action: (set) =>
      set({ result: "12/20 tasks completed (60% pass rate)" }),
  },
  " with ",
  {
    text: "browser and terminal access",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    tooltip: "Click → fills Tools: Browser, Terminal",
    action: (set) =>
      set({ toolsAllowed: ["Browser", "Terminal"] }),
  },
  ". It ",
  {
    text: "performed better with a scaffold",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    tooltip:
      "Click → fills Setup caveat (confound: scaffold dependency not isolated)",
    action: (set) =>
      set({
        setup:
          "Scaffolded agentic harness with step-by-step task decomposition. Results reflect scaffolded performance; unscaffolded baseline not collected.",
        metricCaveat:
          "Performance improvement with scaffold was not isolated — scaffold dependency is an uncontrolled confound.",
      }),
  },
  ". ",
  {
    text: "Some tasks may be similar to public CTF tasks",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    tooltip: "Click → sets Contamination risk: Medium",
    action: (set) =>
      set({
        contaminationRisk: "medium",
        contaminationNotes:
          "Subset of cyber range tasks may overlap with publicly released CTF challenges present in training data. Exact overlap not audited.",
      }),
  },
  ". ",
  {
    text: "Two human reviewers disagreed on partial-credit scoring",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    tooltip: "Click → sets Adjudication: dual-rater-disagreement",
    action: (set) =>
      set({
        adjudicationStrength: "dual-rater-disagreement",
        confidenceRationale:
          "Two raters disagreed on partial-credit scoring for approximately 3 tasks. Final scores resolved by conservative (lower) scoring. Inter-rater reliability not formally measured.",
      }),
  },
  '."',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({
  label,
  required,
  hasWarning,
}: {
  label: string;
  required?: boolean;
  hasWarning?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      <label
        className="font-mono"
        style={{
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: hasWarning ? "#f97316" : "var(--muted-foreground)",
        }}
      >
        {label.toUpperCase()}
        {required && (
          <span style={{ color: "var(--primary)", marginLeft: "3px" }}>
            *
          </span>
        )}
      </label>
      {hasWarning && (
        <span style={{ fontSize: "9px", color: "#f97316" }}>⚠</span>
      )}
    </div>
  );
}

function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded px-2.5 py-1.5"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        fontSize: "12px",
        outline: "none",
        fontFamily: "Inter, sans-serif",
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = "var(--primary)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    />
  );
}

function FieldTextarea({
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded px-2.5 py-1.5 resize-none"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        fontSize: "12px",
        outline: "none",
        fontFamily: "Inter, sans-serif",
        lineHeight: 1.5,
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = "var(--primary)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    />
  );
}

function FieldSelect({
  value,
  onChange,
  options,
  placeholder = "Select…",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded px-2.5 py-1.5"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
        color: value ? "var(--foreground)" : "var(--muted-foreground)",
        fontSize: "12px",
        outline: "none",
        fontFamily: "Inter, sans-serif",
        cursor: "pointer",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-1">
      <div
        className="h-px flex-1"
        style={{ background: "var(--border)" }}
      />
      <span
        className="font-mono"
        style={{
          fontSize: "9px",
          letterSpacing: "0.1em",
          color: "var(--muted-foreground)",
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{ background: "var(--border)" }}
      />
    </div>
  );
}

function Warning({
  warning,
}: {
  warning: ValidationWarning;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded px-3 py-2 cursor-pointer"
      style={{
        background: "rgba(249,115,22,0.07)",
        border: "1px solid rgba(249,115,22,0.25)",
        marginBottom: "6px",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-1.5">
          <span style={{ color: "#f97316", fontSize: "10px", marginTop: "1px" }}>
            ⚠
          </span>
          <span
            style={{ fontSize: "11px", color: "#f97316", lineHeight: 1.4 }}
          >
            {warning.message}
          </span>
        </div>
        <span
          style={{ color: "var(--muted-foreground)", fontSize: "10px", flexShrink: 0 }}
        >
          {expanded ? "▲" : "▼"}
        </span>
      </div>
      {expanded && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            marginTop: "6px",
            paddingTop: "6px",
            borderTop: "1px solid rgba(249,115,22,0.15)",
          }}
        >
          {warning.suggestion}
        </p>
      )}
    </div>
  );
}

// ─── Preview Card ─────────────────────────────────────────────────────────────

function PreviewCard({
  form,
  variant,
}: {
  form: FormData;
  variant: DisclosureTier;
}) {
  const tier = variant || form.disclosureTier || "internal";
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.internal;

  const isEmpty = (v: string | string[]) =>
    !v || (Array.isArray(v) ? v.length === 0 : v.trim() === "");

  const Placeholder = ({
    text,
    wide,
  }: {
    text: string;
    wide?: boolean;
  }) => (
    <span
      style={{
        color: "var(--muted-foreground)",
        fontStyle: "italic",
        fontSize: wide ? "12px" : "11px",
        opacity: 0.5,
      }}
    >
      {text}
    </span>
  );

  const Row = ({
    label,
    value,
    placeholder,
    color,
  }: {
    label: string;
    value: string;
    placeholder: string;
    color?: string;
  }) => (
    <div className="flex items-start gap-0">
      <span
        className="font-mono shrink-0"
        style={{
          fontSize: "9px",
          letterSpacing: "0.07em",
          color: "var(--muted-foreground)",
          width: "120px",
          paddingTop: "2px",
        }}
      >
        {label}
      </span>
      {isEmpty(value) ? (
        <Placeholder text={placeholder} />
      ) : (
        <span style={{ fontSize: "12px", color: color || "var(--foreground)", lineHeight: 1.5 }}>
          {value}
        </span>
      )}
    </div>
  );

  const confidenceColor =
    form.confidence === "high"
      ? "#22c55e"
      : form.confidence === "medium"
      ? "#f59e0b"
      : form.confidence === "low"
      ? "#ef4444"
      : "var(--muted-foreground)";

  const contaminationColor =
    form.contaminationRisk === "high"
      ? "#ef4444"
      : form.contaminationRisk === "medium"
      ? "#f97316"
      : form.contaminationRisk === "low"
      ? "#22c55e"
      : "var(--muted-foreground)";

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${cfg.border}` }}
    >
      {/* Header */}
      <div
        className="px-4 py-3"
        style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: cfg.color }}
            />
            <span
              className="font-mono"
              style={{ fontSize: "10px", letterSpacing: "0.1em", color: cfg.color }}
            >
              {cfg.label} // EVIDENCE CARD
            </span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "10px", color: "var(--muted-foreground)" }}
          >
            {form.evidenceId || "EVD-????"}
          </span>
        </div>
      </div>

      <div
        className="p-4 space-y-4"
        style={{ background: "var(--card)" }}
      >
        {/* Claim */}
        <div>
          <div
            className="font-mono mb-1"
            style={{
              fontSize: "9px",
              letterSpacing: "0.08em",
              color: cfg.color,
            }}
          >
            CLAIM
          </div>
          {isEmpty(form.claim) ? (
            <Placeholder
              text="Fill in the Claim field…"
              wide
            />
          ) : (
            <p
              style={{
                fontSize: "13px",
                color: "var(--foreground)",
                lineHeight: 1.65,
                fontStyle: "normal",
              }}
            >
              "{form.claim}"
            </p>
          )}
        </div>

        {/* Identity grid */}
        <div
          className="rounded p-3 space-y-1.5"
          style={{ background: cfg.textBg, border: `1px solid ${cfg.border}` }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <Row label="DOMAIN" value={form.domain} placeholder="—" color={cfg.color} />
            <Row label="SOURCE TYPE" value={form.sourceType} placeholder="—" />
            <Row label="EVAL NAME" value={form.evaluationName} placeholder="—" />
            <Row label="MODEL VERSION" value={form.modelVersion} placeholder="—" />
          </div>
        </div>

        {/* Protocol */}
        <div>
          <div
            className="font-mono mb-2"
            style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}
          >
            PROTOCOL
          </div>
          <div className="space-y-1.5">
            <Row
              label="SETUP"
              value={form.setup}
              placeholder="Not specified"
            />
            <Row
              label="TOOLS ALLOWED"
              value={form.toolsAllowed.join(", ")}
              placeholder="Not specified"
            />
            <Row
              label="ATTEMPTS"
              value={form.attempts}
              placeholder="—"
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* Results */}
        <div>
          <div
            className="font-mono mb-2"
            style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}
          >
            MEASUREMENT
          </div>
          <div className="space-y-1.5">
            <Row
              label="METRIC"
              value={
                form.metric +
                (form.metricCaveat ? ` [Caveat: ${form.metricCaveat}]` : "")
              }
              placeholder="Not specified"
            />
            <Row
              label="RESULT"
              value={form.result}
              placeholder="Not specified"
            />
            <div className="flex items-start gap-0">
              <span
                className="font-mono shrink-0"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.07em",
                  color: "var(--muted-foreground)",
                  width: "120px",
                  paddingTop: "2px",
                }}
              >
                CONFIDENCE
              </span>
              {form.confidence ? (
                <div>
                  <span
                    className="font-mono rounded px-1.5 py-0.5 mr-2"
                    style={{
                      fontSize: "9px",
                      background: `${confidenceColor}18`,
                      color: confidenceColor,
                      border: `1px solid ${confidenceColor}40`,
                    }}
                  >
                    {form.confidence.toUpperCase()}
                  </span>
                  {form.confidenceRationale && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--muted-foreground)",
                        lineHeight: 1.5,
                      }}
                    >
                      {form.confidenceRationale}
                    </span>
                  )}
                </div>
              ) : (
                <Placeholder text="Not set" />
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* Risk flags */}
        <div>
          <div
            className="font-mono mb-2"
            style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}
          >
            VALIDITY & RISK
          </div>
          <div className="space-y-1.5">
            <Row
              label="EXTERNAL VALIDITY"
              value={
                form.externalValidity
                  ? `${form.externalValidity.toUpperCase()}${form.externalValidityNotes ? ` — ${form.externalValidityNotes}` : ""}`
                  : ""
              }
              placeholder="Not assessed"
            />
            <div className="flex items-start gap-0">
              <span
                className="font-mono shrink-0"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.07em",
                  color: "var(--muted-foreground)",
                  width: "120px",
                  paddingTop: "2px",
                }}
              >
                CONTAMINATION
              </span>
              {form.contaminationRisk ? (
                <div>
                  <span
                    className="font-mono rounded px-1.5 py-0.5 mr-2"
                    style={{
                      fontSize: "9px",
                      background: `${contaminationColor}18`,
                      color: contaminationColor,
                      border: `1px solid ${contaminationColor}40`,
                    }}
                  >
                    {form.contaminationRisk.toUpperCase()}
                  </span>
                  {form.contaminationNotes && (
                    <span
                      style={{ fontSize: "11px", color: "var(--muted-foreground)" }}
                    >
                      {form.contaminationNotes}
                    </span>
                  )}
                </div>
              ) : (
                <Placeholder text="Not assessed" />
              )}
            </div>
            <Row
              label="ADJUDICATION"
              value={
                form.adjudicationStrength
                  ? form.adjudicationStrength.replace(/-/g, " ")
                  : ""
              }
              placeholder="Not specified"
              color={
                form.adjudicationStrength === "dual-rater-disagreement"
                  ? "#ef4444"
                  : undefined
              }
            />
          </div>
        </div>

        {/* Threshold */}
        {(form.thresholdRelation || form.thresholdExplanation) && (
          <>
            <div style={{ height: "1px", background: "var(--border)" }} />
            <div>
              <div
                className="font-mono mb-1.5"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                THRESHOLD
              </div>
              <div className="flex items-start gap-2">
                {form.thresholdRelation && (
                  <span
                    className="font-mono rounded px-2 py-0.5 shrink-0"
                    style={{
                      fontSize: "10px",
                      background:
                        form.thresholdRelation === "above"
                          ? "rgba(239,68,68,0.12)"
                          : form.thresholdRelation === "below"
                          ? "rgba(34,197,94,0.12)"
                          : "rgba(245,158,11,0.12)",
                      color:
                        form.thresholdRelation === "above"
                          ? "#ef4444"
                          : form.thresholdRelation === "below"
                          ? "#22c55e"
                          : "#f59e0b",
                      border: `1px solid ${
                        form.thresholdRelation === "above"
                          ? "rgba(239,68,68,0.3)"
                          : form.thresholdRelation === "below"
                          ? "rgba(34,197,94,0.3)"
                          : "rgba(245,158,11,0.3)"
                      }`,
                    }}
                  >
                    {form.thresholdRelation.toUpperCase()}
                  </span>
                )}
                {form.thresholdExplanation && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--foreground)",
                      lineHeight: 1.55,
                    }}
                  >
                    {form.thresholdExplanation}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Follow-up */}
        {form.followUp && (
          <>
            <div style={{ height: "1px", background: "var(--border)" }} />
            <div>
              <div
                className="font-mono mb-1"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                FOLLOW-UP REQUIRED
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--foreground)",
                  lineHeight: 1.6,
                }}
              >
                {form.followUp}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{
          background: cfg.textBg,
          borderTop: `1px solid ${cfg.border}`,
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "9px", color: "var(--muted-foreground)" }}
        >
          FRONTIER MODEL EVALUATION // ASTER-3 // {new Date().toISOString().split("T")[0]}
        </span>
        <span
          className="font-mono rounded px-1.5 py-0.5"
          style={{
            fontSize: "9px",
            background: cfg.bg,
            color: cfg.color,
            border: `1px solid ${cfg.border}`,
          }}
        >
          {cfg.label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  evidenceId: "EVD-2024-CYBER-001",
  claim: "",
  domain: "",
  sourceType: "",
  evaluationName: "",
  modelVersion: "",
  setup: "",
  toolsAllowed: [],
  attempts: "",
  metric: "",
  metricCaveat: "",
  result: "",
  confidence: "",
  confidenceRationale: "",
  externalValidity: "",
  externalValidityNotes: "",
  contaminationRisk: "",
  contaminationNotes: "",
  adjudicationStrength: "",
  thresholdRelation: "",
  thresholdExplanation: "",
  disclosureTier: "",
  followUp: "",
};

export function EvidenceCardBuilder() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [previewVariant, setPreviewVariant] = useState<DisclosureTier>("");
  const [saved, setSaved] = useState(false);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<number | null>(
    null
  );

  const update = useCallback(
    (field: keyof FormData, value: string | string[]) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const applyPartial = useCallback(
    (partial: Partial<FormData>) =>
      setForm((prev) => ({ ...prev, ...partial })),
    []
  );

  const toggleTool = (tool: string) => {
    setForm((prev) => ({
      ...prev,
      toolsAllowed: prev.toolsAllowed.includes(tool)
        ? prev.toolsAllowed.filter((t) => t !== tool)
        : [...prev.toolsAllowed, tool],
    }));
  };

  const warnings = validate(form);
  const fieldWarnings = new Set(warnings.map((w) => w.field));

  const filledFields = Object.values(form).filter((v) =>
    Array.isArray(v) ? v.length > 0 : v !== ""
  ).length;
  const totalFields = Object.keys(form).length;
  const completeness = Math.round((filledFields / totalFields) * 100);

  const effectiveVariant: DisclosureTier =
    (previewVariant || form.disclosureTier || "internal") as DisclosureTier;

  const handleSave = () => {
    setSaved(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setSaved(false);
    setPreviewVariant("");
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "100vh", background: "var(--background)" }}
    >
      {/* Top bar */}
      <header
        className="shrink-0 px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(8,13,24,0.97)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono"
            style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--muted-foreground)",
            }}
          >
            ASTER-3 // EVIDENCE CARD BUILDER
          </span>
          <span
            className="font-mono rounded px-1.5 py-0.5"
            style={{
              fontSize: "9px",
              background: "rgba(245,158,11,0.1)",
              color: "var(--primary)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            FRONTIER MODEL EVALUATION COURSE
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Completeness */}
          <div className="flex items-center gap-2">
            <div
              className="rounded-full overflow-hidden"
              style={{ width: "80px", height: "4px", background: "var(--muted)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${completeness}%`,
                  background:
                    completeness >= 80
                      ? "#22c55e"
                      : completeness >= 50
                      ? "#f59e0b"
                      : "var(--primary)",
                }}
              />
            </div>
            <span
              className="font-mono"
              style={{
                fontSize: "10px",
                color: "var(--muted-foreground)",
                minWidth: "30px",
              }}
            >
              {completeness}%
            </span>
          </div>
          {warnings.length > 0 && (
            <span
              className="font-mono rounded px-2 py-0.5"
              style={{
                fontSize: "9px",
                background: "rgba(249,115,22,0.12)",
                color: "#f97316",
                border: "1px solid rgba(249,115,22,0.25)",
              }}
            >
              {warnings.length} warning{warnings.length !== 1 ? "s" : ""}
            </span>
          )}
          <button
            onClick={handleReset}
            className="font-mono rounded px-3 py-1.5 transition-all"
            style={{
              fontSize: "10px",
              letterSpacing: "0.06em",
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            RESET
          </button>
        </div>
      </header>

      {/* Three-column body */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        {/* ── Column 1: Raw Result ── */}
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            width: "260px",
            minWidth: "220px",
            borderRight: "1px solid var(--border)",
            background: "var(--card)",
            scrollbarWidth: "none",
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--muted-foreground)",
                }}
              >
                RAW EVALUATION RESULT
              </span>
            </div>

            {/* Raw messy text with annotations */}
            <div
              className="rounded-lg p-3 mb-4"
              style={{
                background: "var(--secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                SOURCE: Slack thread, 2024-11-14
              </div>
              <p style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.75 }}>
                {RAW_SEGMENTS.map((seg, i) => {
                  if (typeof seg === "string") {
                    return <span key={i}>{seg}</span>;
                  }
                  return (
                    <span
                      key={i}
                      className="cursor-pointer rounded transition-all"
                      style={{
                        background:
                          hoveredAnnotation === i ? seg.bg : "transparent",
                        color: hoveredAnnotation === i ? seg.color : "inherit",
                        padding: "1px 2px",
                        borderBottom: `1px dashed ${seg.color}`,
                        textDecoration: "none",
                      }}
                      onMouseEnter={() => setHoveredAnnotation(i)}
                      onMouseLeave={() => setHoveredAnnotation(null)}
                      onClick={() => seg.action?.(applyPartial)}
                    >
                      {seg.text}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Tooltip for hovered annotation */}
            {hoveredAnnotation !== null &&
              typeof RAW_SEGMENTS[hoveredAnnotation] !== "string" && (
                <div
                  className="rounded p-2.5 mb-4"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  <div
                    className="font-mono mb-1"
                    style={{
                      fontSize: "9px",
                      color: "var(--primary)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CLICK TO AUTO-FILL
                  </div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--foreground)",
                      lineHeight: 1.5,
                    }}
                  >
                    {(RAW_SEGMENTS[hoveredAnnotation] as Annotation).tooltip}
                  </p>
                </div>
              )}

            {/* Issue annotations legend */}
            <div className="space-y-2">
              <div
                className="font-mono mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                IDENTIFIED ISSUES
              </div>
              {[
                {
                  color: "#f97316",
                  label: "Contamination flag",
                  detail: "CTF overlap unverified",
                },
                {
                  color: "#ef4444",
                  label: "Weak adjudication",
                  detail: "Rater disagreement unresolved",
                },
                {
                  color: "#a855f7",
                  label: "Confound present",
                  detail: "Scaffold effect not isolated",
                },
                {
                  color: "#f59e0b",
                  label: "Imprecise result",
                  detail: "N=20 not specified upfront",
                },
                {
                  color: "#3b82f6",
                  label: "Missing setup detail",
                  detail: "Tool access not formalized",
                },
              ].map((issue) => (
                <div key={issue.label} className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-1"
                    style={{ background: issue.color }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--foreground)",
                        lineHeight: 1.3,
                      }}
                    >
                      {issue.label}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {issue.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guidance box */}
            <div
              className="rounded p-3 mt-4"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.2)",
                marginTop: "16px",
              }}
            >
              <div
                className="font-mono mb-1"
                style={{
                  fontSize: "9px",
                  color: "#3b82f6",
                  letterSpacing: "0.06em",
                }}
              >
                TASK
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--foreground)",
                  lineHeight: 1.6,
                }}
              >
                Hover highlighted text to identify issues. Click to auto-fill
                fields. Then refine and complete the form manually.
              </p>
            </div>
          </div>
        </div>

        {/* ── Column 2: Form ── */}
        <div
          className="flex flex-col overflow-y-auto flex-1"
          style={{
            borderRight: "1px solid var(--border)",
            scrollbarWidth: "none",
          }}
        >
          <div className="p-5 space-y-3">
            {/* Warnings panel */}
            {warnings.length > 0 && (
              <div
                className="rounded-lg p-3"
                style={{
                  background: "rgba(249,115,22,0.05)",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                <div
                  className="font-mono mb-2"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    color: "#f97316",
                  }}
                >
                  VALIDATION WARNINGS ({warnings.length})
                </div>
                {warnings.map((w, i) => (
                  <Warning key={i} warning={w} />
                ))}
              </div>
            )}

            <SectionDivider label="IDENTITY" />

            {/* Evidence ID */}
            <div>
              <FieldLabel label="Evidence ID" required />
              <FieldInput
                value={form.evidenceId}
                onChange={(v) => update("evidenceId", v)}
                placeholder="EVD-2024-CYBER-001"
              />
            </div>

            {/* Claim */}
            <div>
              <FieldLabel
                label="Claim"
                required
                hasWarning={fieldWarnings.has("claim")}
              />
              <FieldTextarea
                value={form.claim}
                onChange={(v) => update("claim", v)}
                placeholder="State a precise, falsifiable claim about model capability or behavior…"
                rows={3}
              />
            </div>

            {/* Domain + Source type */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel label="Domain" required />
                <FieldSelect
                  value={form.domain}
                  onChange={(v) => update("domain", v)}
                  options={[
                    { value: "cyber", label: "Cyber" },
                    { value: "bio", label: "Biological" },
                    { value: "persuasion", label: "Persuasion" },
                    { value: "autonomy", label: "Autonomy" },
                    { value: "tool-use", label: "Tool Use" },
                    { value: "deception", label: "Deception" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel label="Source type" required />
                <FieldSelect
                  value={form.sourceType}
                  onChange={(v) => update("sourceType", v)}
                  options={[
                    { value: "Capability benchmark", label: "Capability benchmark" },
                    { value: "Red-team exercise", label: "Red-team exercise" },
                    { value: "Human evaluation", label: "Human evaluation" },
                    { value: "Automated testing", label: "Automated testing" },
                    { value: "Field study", label: "Field study" },
                    { value: "Structured interview", label: "Structured interview" },
                  ]}
                />
              </div>
            </div>

            <SectionDivider label="PROTOCOL" />

            {/* Eval name + Model version */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel label="Evaluation name" />
                <FieldInput
                  value={form.evaluationName}
                  onChange={(v) => update("evaluationName", v)}
                  placeholder="e.g. CyberRange-v2"
                />
              </div>
              <div>
                <FieldLabel label="Model version" required />
                <FieldInput
                  value={form.modelVersion}
                  onChange={(v) => update("modelVersion", v)}
                  placeholder="e.g. Aster-3-preview"
                />
              </div>
            </div>

            {/* Setup */}
            <div>
              <FieldLabel label="Setup" required />
              <FieldTextarea
                value={form.setup}
                onChange={(v) => update("setup", v)}
                placeholder="Describe the evaluation environment, harness, scaffolding, and any deviations from standard protocol…"
                rows={2}
              />
            </div>

            {/* Tools allowed */}
            <div>
              <FieldLabel label="Tools allowed" />
              <div className="flex flex-wrap gap-1.5 mt-1">
                {TOOLS.map((tool) => {
                  const selected = form.toolsAllowed.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className="font-mono rounded px-2.5 py-1 transition-all"
                      style={{
                        fontSize: "11px",
                        background: selected
                          ? "rgba(59,130,246,0.18)"
                          : "var(--muted)",
                        color: selected
                          ? "#3b82f6"
                          : "var(--muted-foreground)",
                        border: `1px solid ${selected ? "rgba(59,130,246,0.4)" : "var(--border)"}`,
                      }}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Attempts */}
            <div>
              <FieldLabel label="Attempts / N" />
              <FieldInput
                value={form.attempts}
                onChange={(v) => update("attempts", v)}
                placeholder="e.g. 20"
                type="number"
              />
            </div>

            <SectionDivider label="MEASUREMENT" />

            {/* Metric + caveat */}
            <div>
              <FieldLabel
                label="Metric"
                required
                hasWarning={fieldWarnings.has("metric")}
              />
              <FieldInput
                value={form.metric}
                onChange={(v) => update("metric", v)}
                placeholder="e.g. Binary task completion rate"
              />
            </div>
            <div>
              <FieldLabel
                label="Metric caveat / scope condition"
                hasWarning={fieldWarnings.has("metric")}
              />
              <FieldInput
                value={form.metricCaveat}
                onChange={(v) => update("metricCaveat", v)}
                placeholder="Limitations, scoring conditions, or anomalies…"
              />
            </div>

            {/* Result */}
            <div>
              <FieldLabel label="Result" required />
              <FieldInput
                value={form.result}
                onChange={(v) => update("result", v)}
                placeholder="e.g. 12/20 tasks completed (60%)"
              />
            </div>

            {/* Confidence + rationale */}
            <div>
              <FieldLabel
                label="Confidence"
                required
                hasWarning={fieldWarnings.has("confidence")}
              />
              <FieldSelect
                value={form.confidence}
                onChange={(v) => update("confidence", v as Confidence)}
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />
            </div>
            <div>
              <FieldLabel
                label="Confidence rationale"
                hasWarning={fieldWarnings.has("confidence")}
              />
              <FieldTextarea
                value={form.confidenceRationale}
                onChange={(v) => update("confidenceRationale", v)}
                placeholder="Why this confidence level? Reference sample size, replication, evaluator agreement…"
                rows={2}
              />
            </div>

            <SectionDivider label="VALIDITY & RISK" />

            {/* External validity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel label="External validity" />
                <FieldSelect
                  value={form.externalValidity}
                  onChange={(v) => update("externalValidity", v as Severity)}
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel label="Validity notes" />
                <FieldInput
                  value={form.externalValidityNotes}
                  onChange={(v) => update("externalValidityNotes", v)}
                  placeholder="Scope limits, distributional shift…"
                />
              </div>
            </div>

            {/* Contamination */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel
                  label="Contamination risk"
                  hasWarning={fieldWarnings.has("contaminationRisk")}
                />
                <FieldSelect
                  value={form.contaminationRisk}
                  onChange={(v) =>
                    update("contaminationRisk", v as Severity)
                  }
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
              </div>
              <div>
                <FieldLabel label="Contamination notes" />
                <FieldInput
                  value={form.contaminationNotes}
                  onChange={(v) => update("contaminationNotes", v)}
                  placeholder="What may be contaminated and why…"
                />
              </div>
            </div>

            {/* Adjudication */}
            <div>
              <FieldLabel
                label="Adjudication strength"
                hasWarning={fieldWarnings.has("adjudicationStrength")}
              />
              <FieldSelect
                value={form.adjudicationStrength}
                onChange={(v) =>
                  update("adjudicationStrength", v as AdjudicationStrength)
                }
                options={[
                  { value: "single-rater", label: "Single rater" },
                  {
                    value: "dual-rater-agreement",
                    label: "Dual rater — agreement",
                  },
                  {
                    value: "dual-rater-disagreement",
                    label: "Dual rater — disagreement ⚠",
                  },
                  { value: "panel-consensus", label: "Panel consensus" },
                  { value: "automated", label: "Automated (no human)" },
                ]}
              />
            </div>

            <SectionDivider label="GOVERNANCE" />

            {/* Threshold relation */}
            <div>
              <FieldLabel
                label="Threshold relation"
                hasWarning={fieldWarnings.has("thresholdRelation")}
              />
              <FieldSelect
                value={form.thresholdRelation}
                onChange={(v) =>
                  update("thresholdRelation", v as ThresholdRelation)
                }
                options={[
                  { value: "above", label: "Above threshold ↑" },
                  { value: "below", label: "Below threshold ↓" },
                  { value: "at", label: "At threshold" },
                  { value: "indeterminate", label: "Indeterminate" },
                ]}
              />
            </div>
            <div>
              <FieldLabel
                label="Threshold explanation"
                hasWarning={fieldWarnings.has("thresholdRelation")}
              />
              <FieldTextarea
                value={form.thresholdExplanation}
                onChange={(v) => update("thresholdExplanation", v)}
                placeholder="Which threshold? Pre-registered or post-hoc? What action does crossing it trigger?"
                rows={2}
              />
            </div>

            {/* Disclosure tier */}
            <div>
              <FieldLabel
                label="Disclosure tier"
                required
                hasWarning={fieldWarnings.has("disclosureTier")}
              />
              <div className="grid grid-cols-4 gap-2">
                {(["public", "partner", "restricted", "internal"] as DisclosureTier[]).map(
                  (tier) => {
                    const cfg = TIER_CONFIG[tier];
                    const selected = form.disclosureTier === tier;
                    return (
                      <button
                        key={tier}
                        onClick={() => {
                          update("disclosureTier", tier);
                          setPreviewVariant(tier);
                        }}
                        className="rounded py-2 font-mono transition-all"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          background: selected ? cfg.bg : "var(--muted)",
                          color: selected ? cfg.color : "var(--muted-foreground)",
                          border: `1px solid ${selected ? cfg.border : "var(--border)"}`,
                        }}
                      >
                        {cfg.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Follow-up */}
            <div>
              <FieldLabel label="Follow-up needed" />
              <FieldTextarea
                value={form.followUp}
                onChange={(v) => update("followUp", v)}
                placeholder="Required next steps, open questions, or additional evaluations before this evidence can be finalized…"
                rows={2}
              />
            </div>

            {/* Save button */}
            <div className="pt-2 pb-4">
              <button
                onClick={handleSave}
                disabled={warnings.length > 2 || !form.disclosureTier || !form.claim || !form.result}
                className="w-full rounded py-3 font-mono transition-all"
                style={{
                  background:
                    warnings.length > 2 || !form.disclosureTier || !form.claim || !form.result
                      ? "var(--muted)"
                      : "var(--primary)",
                  color:
                    warnings.length > 2 || !form.disclosureTier || !form.claim || !form.result
                      ? "var(--muted-foreground)"
                      : "var(--primary-foreground)",
                  cursor:
                    warnings.length > 2 || !form.disclosureTier || !form.claim || !form.result
                      ? "not-allowed"
                      : "pointer",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {warnings.length > 2 || !form.disclosureTier || !form.claim || !form.result
                  ? "RESOLVE WARNINGS BEFORE SAVING"
                  : "SAVE TO CAPSTONE DOSSIER →"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Column 3: Live Preview ── */}
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            width: "340px",
            minWidth: "280px",
            scrollbarWidth: "none",
          }}
        >
          <div className="p-4">
            {/* Variant selector */}
            <div className="flex items-center gap-1.5 mb-4">
              <span
                className="font-mono shrink-0"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                VARIANT
              </span>
              <div className="flex gap-1 flex-1">
                {(["", "public", "partner", "restricted", "internal"] as DisclosureTier[]).map(
                  (v) => {
                    const label = v === "" ? "AUTO" : v.toUpperCase();
                    const cfg = v ? TIER_CONFIG[v] : null;
                    const isActive = previewVariant === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setPreviewVariant(v)}
                        className="font-mono rounded px-2 py-1 flex-1 transition-all"
                        style={{
                          fontSize: "9px",
                          background: isActive
                            ? cfg
                              ? cfg.bg
                              : "rgba(245,158,11,0.12)"
                            : "var(--muted)",
                          color: isActive
                            ? cfg
                              ? cfg.color
                              : "var(--primary)"
                            : "var(--muted-foreground)",
                          border: `1px solid ${isActive ? (cfg ? cfg.border : "rgba(245,158,11,0.3)") : "var(--border)"}`,
                        }}
                      >
                        {label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <PreviewCard form={form} variant={effectiveVariant} />

            {/* Disclosure tier guidance */}
            <div className="mt-4 space-y-2">
              <div
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--muted-foreground)",
                }}
              >
                TIER GUIDANCE
              </div>
              {[
                {
                  tier: "public",
                  desc: "Safe for policy papers, academic publications, system cards",
                },
                {
                  tier: "partner",
                  desc: "Shared with enterprise clients, research partners, auditors",
                },
                {
                  tier: "restricted",
                  desc: "Safety team + legal + senior leadership only",
                },
                {
                  tier: "internal",
                  desc: "Evaluation team only — not for external distribution",
                },
              ].map(({ tier, desc }) => {
                const cfg = TIER_CONFIG[tier];
                return (
                  <div key={tier} className="flex items-start gap-2">
                    <span
                      className="font-mono rounded px-1.5 py-0.5 shrink-0"
                      style={{
                        fontSize: "8px",
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                        marginTop: "1px",
                      }}
                    >
                      {cfg.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--muted-foreground)",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Saved overlay ── */}
      {saved && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            background: "rgba(8,13,24,0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
          <div
            className="rounded-xl p-8 text-center"
            style={{
              background: "var(--card)",
              border: "1px solid rgba(34,197,94,0.4)",
              maxWidth: "420px",
              width: "90%",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12L10 17L20 7"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="font-mono mb-2"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "#22c55e",
              }}
            >
              EVIDENCE CARD SAVED
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              Evidence card saved to capstone dossier.
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted-foreground)",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              <span
                className="font-mono"
                style={{ color: "var(--foreground)" }}
              >
                {form.evidenceId}
              </span>{" "}
              has been added to your evaluation record. It will appear in your
              system card under the{" "}
              <span
                className="font-mono"
                style={{
                  color: TIER_CONFIG[form.disclosureTier || "internal"]?.color,
                }}
              >
                {TIER_CONFIG[form.disclosureTier || "internal"]?.label}
              </span>{" "}
              tier.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded font-mono transition-all"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.07em",
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                NEW CARD
              </button>
              <button
                onClick={() => setSaved(false)}
                className="px-5 py-2.5 rounded font-mono transition-all"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.07em",
                  background: "rgba(34,197,94,0.12)",
                  color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                VIEW CARD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
