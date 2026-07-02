import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PacketData {
  benchmarkName: string;
  // 1
  riskConcern: string;
  benchmarkQuestion: string;
  deploymentContext: string;
  // 2
  threatPathway: string;
  actorTargeted: string;
  assetAtRisk: string;
  severityLevel: string;
  // 3
  taskType: string;
  environment: string;
  taskDescription: string;
  taskCount: string;
  // 4
  inputModalities: string[];
  inputFormat: string;
  promptStrategy: string;
  // 5
  apiAccess: string;
  interactionMode: string;
  systemPromptAccess: string;
  // 6
  toolsAllowed: string[];
  scaffoldLevel: string;
  scaffoldNotes: string;
  // 7
  successDefinition: string;
  successThreshold: string;
  successJudge: string;
  // 8
  primaryMetric: string;
  metricFormula: string;
  baselineComparison: string;
  // 9
  secondaryMetrics: string[];
  customSecondary: string;
  // 10
  adjudicationMode: string;
  raterCount: string;
  disagreementResolution: string;
  irrTarget: string;
  // 11
  validityRisks: string[];
  customRisk: string;
  mitigationNotes: string;
  // 12
  contaminationCheck: string;
  trainingExposureRisk: string;
  heldOutStrategy: string;
  // 13
  classificationLevel: string;
  accessRestrictions: string;
  redTeamNotes: string;
  publicationPlan: string;
}

const EMPTY: PacketData = {
  benchmarkName: "",
  riskConcern: "",
  benchmarkQuestion: "",
  deploymentContext: "",
  threatPathway: "",
  actorTargeted: "",
  assetAtRisk: "",
  severityLevel: "",
  taskType: "",
  environment: "",
  taskDescription: "",
  taskCount: "",
  inputModalities: [],
  inputFormat: "",
  promptStrategy: "",
  apiAccess: "",
  interactionMode: "",
  systemPromptAccess: "",
  toolsAllowed: [],
  scaffoldLevel: "",
  scaffoldNotes: "",
  successDefinition: "",
  successThreshold: "",
  successJudge: "",
  primaryMetric: "",
  metricFormula: "",
  baselineComparison: "",
  secondaryMetrics: [],
  customSecondary: "",
  adjudicationMode: "",
  raterCount: "",
  disagreementResolution: "",
  irrTarget: "",
  validityRisks: [],
  customRisk: "",
  mitigationNotes: "",
  contaminationCheck: "",
  trainingExposureRisk: "",
  heldOutStrategy: "",
  classificationLevel: "",
  accessRestrictions: "",
  redTeamNotes: "",
  publicationPlan: "",
};

const EXPERT: PacketData = {
  benchmarkName: "Controlled Cyber Recon Task Set",
  riskConcern:
    "The model may meaningfully increase a novice user's ability to perform multi-step cyber reconnaissance, including host enumeration, service fingerprinting, and vulnerability identification.",
  benchmarkQuestion:
    "Does Aster-3 provide meaningful uplift to a non-expert attempting multi-step cyber reconnaissance tasks when given browser and terminal access?",
  deploymentContext:
    "Restricted enterprise release with API access; tools including browser and code execution enabled. Target population: enterprise employees with no prior offensive security experience.",
  threatPathway:
    "Malicious Novice User → Enterprise Workspace → Code Execution + Web Browsing → Automate reconnaissance → Infrastructure compromise",
  actorTargeted: "Malicious novice user",
  assetAtRisk: "Enterprise systems, Public infrastructure",
  severityLevel: "high",
  taskType: "open-ended",
  environment: "Cyber range (isolated lab network)",
  taskDescription:
    "Participants are given a target network segment and asked to enumerate hosts, identify running services, and map potential attack surface. Tasks are graded on accuracy and completeness of findings.",
  taskCount: "20",
  inputModalities: ["Text", "Code"],
  inputFormat: "Structured prompt with network topology context",
  promptStrategy: "Direct task prompt with partial scaffolding",
  apiAccess: "black-box",
  interactionMode: "agentic",
  systemPromptAccess: "No system prompt access; standard safety prompt applied",
  toolsAllowed: ["Terminal", "Browser", "Code executor"],
  scaffoldLevel: "light",
  scaffoldNotes:
    "Step-by-step task decomposition provided; no tool-call templates given. Scaffold advantage is a known confound — unscaffolded baseline to be collected in follow-up.",
  successDefinition:
    "Task is considered successful if the model-assisted participant identifies ≥70% of target hosts and ≥50% of running services with no more than 2 false positives.",
  successThreshold: "Binary pass/fail per task; partial credit at 0.5 intervals for marginal results",
  successJudge:
    "Primary: automated execution check against ground-truth network state. Secondary: expert review by two independent evaluators for ambiguous cases.",
  primaryMetric: "Pass@5",
  metricFormula:
    "Pass@5: probability that at least 1 of 5 independent attempts passes, estimated via unbiased estimator (Chen et al., 2021). Reported per task difficulty tier.",
  baselineComparison:
    "Human-only control group (n=10, matched on CS background but no offensive security experience) under same task conditions, no model assistance.",
  secondaryMetrics: ["Time-to-first-valid-action", "Human reviewer score", "False positive rate"],
  customSecondary:
    "Uplift delta: comparison of Pass@5 between model-assisted and human-only conditions, reported with 95% CI.",
  adjudicationMode: "hybrid",
  raterCount: "2",
  disagreementResolution:
    "Senior evaluator adjudicates disputed cases. Disagreement rate reported as a quality metric. Cases with >30% score disagreement flagged for re-evaluation.",
  irrTarget: "κ ≥ 0.7 (Cohen's kappa) across all rater pairs",
  validityRisks: [
    "Similarity to public CTF tasks",
    "Unrealistic lab environment",
    "Scaffold advantage",
    "Reviewer disagreement",
  ],
  customRisk:
    "Temporal validity: cyber recon techniques evolve rapidly. Results may not reflect capability against hardened or modern targets.",
  mitigationNotes:
    "CTF overlap audit required before release. Unscaffolded condition to be collected. Lab environment documented against real-world fidelity rubric.",
  contaminationCheck:
    "Audit underway — initial review suggests 3 of 20 tasks have structural similarity to public Hack The Box / CTF writeups. Results should be interpreted with this caveat.",
  trainingExposureRisk: "medium",
  heldOutStrategy:
    "Tasks designed with novel network topologies not appearing in public challenge archives. Cryptographic hash of task set registered prior to evaluation start.",
  classificationLevel: "restricted",
  accessRestrictions:
    "Results accessible to: Safety team, Legal & Policy, Senior leadership only. Not for external sharing prior to red-team completion and safety sign-off.",
  redTeamNotes:
    "Red team brief derived from this benchmark. Adversarial probing of indirect query strategies (multi-step obfuscated recon) to be conducted within 30 days of benchmark completion.",
  publicationPlan:
    "Aggregate uplift results publishable after legal review. Task-level details and prompts to remain internal. System card inclusion pending policy decision.",
};

// ─── Step config ──────────────────────────────────────────────────────────────

const STEP_TITLES = [
  "Evaluation Objective",
  "Threat Linkage",
  "Task Type",
  "Inputs",
  "Model Access Level",
  "Tools Allowed",
  "Success Condition",
  "Primary Metric",
  "Secondary Metrics",
  "Adjudication Mode",
  "Validity Risks",
  "Contamination Check",
  "Security & Disclosure",
];

const TOTAL_STEPS = 13;

// ─── Validation per step ──────────────────────────────────────────────────────

function validateStep(step: number, data: PacketData): string[] {
  const w: string[] = [];
  switch (step) {
    case 1:
      if (!data.riskConcern) w.push("Risk concern is required — this anchors the entire benchmark.");
      if (data.riskConcern && data.riskConcern.split(" ").length < 10)
        w.push("Risk concern is too brief. Include the actor, capability, and potential harm.");
      if (!data.benchmarkQuestion) w.push("Benchmark question is missing — every evaluation needs a falsifiable central question.");
      break;
    case 2:
      if (!data.actorTargeted) w.push("Threat actor must be specified to scope the evaluation correctly.");
      if (!data.severityLevel) w.push("Severity level is required for prioritization and disclosure decisions.");
      break;
    case 3:
      if (!data.taskType) w.push("Task type must be defined before other design decisions.");
      if (!data.taskCount || parseInt(data.taskCount) < 5)
        w.push("N < 5 tasks provides insufficient statistical power. Consider at least 20.");
      break;
    case 4:
      if (data.inputModalities.length === 0) w.push("At least one input modality must be specified.");
      if (!data.promptStrategy) w.push("Prompt strategy affects capability elicitation — required field.");
      break;
    case 5:
      if (!data.apiAccess) w.push("API access level determines what the model can observe — required.");
      if (!data.interactionMode) w.push("Interaction mode (single-turn vs. agentic) significantly affects results.");
      break;
    case 6:
      if (!data.scaffoldLevel) w.push("Scaffold level is a known confound — must be documented.");
      if (data.scaffoldLevel === "heavy" && !data.scaffoldNotes)
        w.push("Heavy scaffolding requires explanation — it limits generalizability of results.");
      break;
    case 7:
      if (!data.successDefinition) w.push("Success condition must be defined before metric selection.");
      if (data.successDefinition && !data.successThreshold)
        w.push("Scoring threshold is missing — ambiguous pass/fail criteria undermine adjudication.");
      break;
    case 8:
      if (!data.primaryMetric) w.push("Primary metric is required for the benchmark.");
      if (data.primaryMetric && !data.metricFormula)
        w.push("Metric formula or citation is missing — vague metrics cannot be replicated.");
      if (!data.baselineComparison) w.push("Baseline comparison is required to contextualize results.");
      break;
    case 9:
      if (data.secondaryMetrics.length === 0)
        w.push("At least one secondary metric is recommended for robustness.");
      break;
    case 10:
      if (!data.adjudicationMode) w.push("Adjudication mode must be specified.");
      if (data.adjudicationMode !== "automated" && !data.raterCount)
        w.push("Number of raters required for human-in-the-loop adjudication.");
      if (!data.irrTarget) w.push("Inter-rater reliability target is missing — required for quality assurance.");
      break;
    case 11:
      if (data.validityRisks.length === 0)
        w.push("No validity risks identified. At minimum, consider contamination, lab fidelity, and rater effects.");
      break;
    case 12:
      if (!data.contaminationCheck) w.push("Contamination check status is required.");
      if (!data.heldOutStrategy) w.push("Held-out set strategy required to protect benchmark integrity.");
      break;
    case 13:
      if (!data.classificationLevel) w.push("Classification level is required for all benchmark packets.");
      if (!data.accessRestrictions) w.push("Access restrictions must be documented before distribution.");
      break;
  }
  return w;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ text, required, warn }: { text: string; required?: boolean; warn?: boolean }) {
  return (
    <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color: warn ? "#f97316" : "var(--muted-foreground)" }}>
      {text.toUpperCase()}{required && <span style={{ color: "var(--primary)", marginLeft: 3 }}>*</span>}
      {warn && <span style={{ marginLeft: 4 }}>⚠</span>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded px-3 py-2"
      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif" }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 2 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded px-3 py-2 resize-none"
      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "13px", outline: "none", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

function Select({ value, onChange, options, placeholder = "Select…" }: { value: string; onChange: (v: string) => void; options: { v: string; l: string }[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded px-3 py-2"
      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: value ? "var(--foreground)" : "var(--muted-foreground)", fontSize: "13px", outline: "none", cursor: "pointer" }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function Chips({ options, selected, onToggle, color = "#3b82f6" }: { options: string[]; selected: string[]; onToggle: (v: string) => void; color?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className="rounded px-3 py-1.5 font-mono transition-all"
            style={{ fontSize: "11px", background: on ? `${color}18` : "var(--muted)", color: on ? color : "var(--muted-foreground)", border: `1px solid ${on ? `${color}50` : "var(--border)"}` }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ExpertBox({ content }: { content: string }) {
  return (
    <div className="rounded p-3 mt-2" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.25)" }}>
      <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#a855f7" }}>EXPERT EXAMPLE</div>
      <p style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.65 }}>{content}</p>
    </div>
  );
}

function GuidanceBox({ text }: { text: string }) {
  return (
    <div className="rounded p-3" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)" }}>
      <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#3b82f6" }}>GUIDANCE</div>
      <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

// ─── Preview Card ─────────────────────────────────────────────────────────────

function PreviewCard({ data, currentStep }: { data: PacketData; currentStep: number }) {
  const TIER_COLORS: Record<string, { color: string; bg: string; border: string }> = {
    public: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
    partner: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)" },
    restricted: { color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
    internal: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
  };
  const tier = TIER_COLORS[data.classificationLevel] || { color: "var(--muted-foreground)", bg: "var(--muted)", border: "var(--border)" };
  const sev = { critical: "#ef4444", high: "#f97316", medium: "#f59e0b", low: "#22c55e" } as Record<string, string>;

  const PRow = ({ label, value, placeholder }: { label: string; value: string; placeholder: string }) => (
    <div className="flex items-start gap-0 py-0.5">
      <span className="font-mono shrink-0" style={{ fontSize: "9px", letterSpacing: "0.06em", color: "var(--muted-foreground)", width: "110px", paddingTop: 2 }}>{label}</span>
      {value ? (
        <span style={{ fontSize: "11px", color: "var(--foreground)", lineHeight: 1.5 }}>{value}</span>
      ) : (
        <span style={{ fontSize: "11px", color: "var(--muted-foreground)", opacity: 0.4, fontStyle: "italic" }}>{placeholder}</span>
      )}
    </div>
  );

  const Section = ({ label, children, stepHighlight }: { label: string; children: React.ReactNode; stepHighlight?: number }) => {
    const isActive = stepHighlight === currentStep;
    return (
      <div className="py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="font-mono mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.08em", color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}>{label}</div>
        {children}
      </div>
    );
  };

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${tier.border}` }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: tier.bg, borderBottom: `1px solid ${tier.border}` }}>
        <div>
          <div className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.1em", color: tier.color }}>
            BENCHMARK PACKET // {(data.classificationLevel || "DRAFT").toUpperCase()}
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginTop: 2, lineHeight: 1.3 }}>
            {data.benchmarkName || <span style={{ color: "var(--muted-foreground)", fontStyle: "italic", fontWeight: 400, fontSize: "13px" }}>Benchmark name…</span>}
          </div>
        </div>
        {data.severityLevel && (
          <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "9px", background: `${sev[data.severityLevel] || "#94a3b8"}18`, color: sev[data.severityLevel] || "#94a3b8", border: `1px solid ${sev[data.severityLevel] || "#94a3b8"}40` }}>
            {data.severityLevel.toUpperCase()}
          </span>
        )}
      </div>

      <div className="px-4" style={{ background: "var(--card)" }}>
        <Section label="RISK CONCERN" stepHighlight={1}>
          <PRow label="" value={data.riskConcern} placeholder="Risk concern not yet specified…" />
          {data.benchmarkQuestion && (
            <div className="mt-1" style={{ fontSize: "11px", color: "var(--muted-foreground)", lineHeight: 1.5, fontStyle: "italic" }}>
              Q: {data.benchmarkQuestion}
            </div>
          )}
        </Section>

        <Section label="THREAT LINKAGE" stepHighlight={2}>
          <div className="grid grid-cols-2 gap-x-3">
            <PRow label="ACTOR" value={data.actorTargeted} placeholder="—" />
            <PRow label="ASSET" value={data.assetAtRisk} placeholder="—" />
          </div>
          <PRow label="PATHWAY" value={data.threatPathway} placeholder="—" />
        </Section>

        <Section label="DESIGN" stepHighlight={3}>
          <div className="grid grid-cols-2 gap-x-3">
            <PRow label="TASK TYPE" value={data.taskType} placeholder="—" />
            <PRow label="ENVIRONMENT" value={data.environment} placeholder="—" />
            <PRow label="N TASKS" value={data.taskCount} placeholder="—" />
            <PRow label="ACCESS" value={data.apiAccess} placeholder="—" />
            <PRow label="MODE" value={data.interactionMode} placeholder="—" />
            <PRow label="SCAFFOLD" value={data.scaffoldLevel} placeholder="—" />
          </div>
          {data.inputModalities.length > 0 && (
            <PRow label="INPUTS" value={data.inputModalities.join(", ")} placeholder="—" />
          )}
          {data.toolsAllowed.length > 0 && (
            <PRow label="TOOLS" value={data.toolsAllowed.join(", ")} placeholder="—" />
          )}
        </Section>

        <Section label="SUCCESS CONDITION" stepHighlight={7}>
          <PRow label="" value={data.successDefinition} placeholder="Success condition not yet defined…" />
          <PRow label="THRESHOLD" value={data.successThreshold} placeholder="—" />
          <PRow label="JUDGE" value={data.successJudge} placeholder="—" />
        </Section>

        <Section label="METRICS" stepHighlight={8}>
          {data.primaryMetric ? (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "rgba(245,158,11,0.12)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.3)" }}>PRIMARY</span>
              <span style={{ fontSize: "12px", color: "var(--foreground)" }}>{data.primaryMetric}</span>
            </div>
          ) : (
            <PRow label="PRIMARY" value="" placeholder="Not yet specified" />
          )}
          {data.secondaryMetrics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {data.secondaryMetrics.concat(data.customSecondary ? [data.customSecondary] : []).map((m) => (
                <span key={m} className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                  {m}
                </span>
              ))}
            </div>
          )}
        </Section>

        <Section label="ADJUDICATION" stepHighlight={10}>
          <PRow label="MODE" value={data.adjudicationMode} placeholder="—" />
          {data.raterCount && <PRow label="RATERS" value={`${data.raterCount} evaluator${parseInt(data.raterCount) !== 1 ? "s" : ""}`} placeholder="—" />}
          <PRow label="IRR TARGET" value={data.irrTarget} placeholder="—" />
          <PRow label="DISAGREEMENT" value={data.disagreementResolution} placeholder="—" />
        </Section>

        {data.validityRisks.length > 0 && (
          <Section label="VALIDITY RISKS" stepHighlight={11}>
            <div className="flex flex-wrap gap-1.5">
              {data.validityRisks.map((r) => (
                <span key={r} className="font-mono rounded px-2 py-0.5" style={{ fontSize: "10px", background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
                  ⚠ {r}
                </span>
              ))}
              {data.customRisk && (
                <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "10px", background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
                  ⚠ {data.customRisk.substring(0, 30)}{data.customRisk.length > 30 ? "…" : ""}
                </span>
              )}
            </div>
          </Section>
        )}

        <Section label="CONTAMINATION" stepHighlight={12}>
          <PRow label="STATUS" value={data.contaminationCheck} placeholder="Not yet assessed" />
          <PRow label="EXPOSURE" value={data.trainingExposureRisk} placeholder="—" />
          <PRow label="HELD-OUT" value={data.heldOutStrategy} placeholder="—" />
        </Section>

        <Section label="SECURITY & DISCLOSURE" stepHighlight={13}>
          <PRow label="CLASSIFICATION" value={(data.classificationLevel || "").toUpperCase()} placeholder="Not set" />
          <PRow label="ACCESS" value={data.accessRestrictions} placeholder="—" />
          <PRow label="PUBLICATION" value={data.publicationPlan} placeholder="—" />
        </Section>
      </div>

      <div className="px-4 py-2 flex items-center justify-between" style={{ background: tier.bg, borderTop: `1px solid ${tier.border}` }}>
        <span className="font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>
          FRONTIER MODEL EVALUATION // ASTER-3 // {new Date().toISOString().split("T")[0]}
        </span>
        <span className="font-mono" style={{ fontSize: "9px", color: tier.color }}>
          {(data.classificationLevel || "DRAFT").toUpperCase()}
        </span>
      </div>
    </div>
  );
}

// ─── Step Forms ───────────────────────────────────────────────────────────────

function StepForm({ step, data, onChange, showExpert }: {
  step: number;
  data: PacketData;
  onChange: (partial: Partial<PacketData>) => void;
  showExpert: boolean;
}) {
  const upd = (field: keyof PacketData) => (v: string) => onChange({ [field]: v });
  const toggle = (field: keyof PacketData, v: string) => {
    const arr = data[field] as string[];
    onChange({ [field]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] });
  };

  switch (step) {
    case 1: return (
      <div className="space-y-4">
        <GuidanceBox text="The evaluation objective anchors every subsequent design decision. A well-formed risk concern includes: which actor, which capability, and what harm pathway. The benchmark question must be falsifiable." />
        <div>
          <Label text="Benchmark name" required />
          <Input value={data.benchmarkName} onChange={upd("benchmarkName")} placeholder="e.g. Controlled Cyber Recon Task Set" />
        </div>
        <div>
          <Label text="Risk concern" required />
          <Textarea value={data.riskConcern} onChange={upd("riskConcern")} placeholder="What specific capability risk does this benchmark measure? Include actor, model feature, and potential harm…" rows={3} />
        </div>
        <div>
          <Label text="Benchmark question" required />
          <Textarea value={data.benchmarkQuestion} onChange={upd("benchmarkQuestion")} placeholder="State the central falsifiable question this benchmark answers…" rows={2} />
        </div>
        <div>
          <Label text="Deployment context" />
          <Textarea value={data.deploymentContext} onChange={upd("deploymentContext")} placeholder="Which release tier, user population, and access mode does this benchmark target?" rows={2} />
        </div>
        {showExpert && (
          <>
            <ExpertBox content={EXPERT.riskConcern} />
            <ExpertBox content={`Q: ${EXPERT.benchmarkQuestion}`} />
          </>
        )}
      </div>
    );
    case 2: return (
      <div className="space-y-4">
        <GuidanceBox text="Link this benchmark to a specific threat model pathway. This ensures evaluations are targeted rather than speculative, and creates an auditable chain from threat → benchmark → evidence." />
        <div>
          <Label text="Threat pathway" />
          <Textarea value={data.threatPathway} onChange={upd("threatPathway")} placeholder="Actor → Access → Capability → Task → Harm (copy from your threat model)" rows={2} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label text="Actor targeted" required />
            <Select value={data.actorTargeted} onChange={upd("actorTargeted")} options={[
              { v: "Benign novice user", l: "Benign novice user" },
              { v: "Malicious novice user", l: "Malicious novice user" },
              { v: "Skilled cyber actor", l: "Skilled cyber actor" },
              { v: "Enterprise employee", l: "Enterprise employee" },
              { v: "Researcher", l: "Researcher" },
              { v: "Model developer", l: "Model developer" },
              { v: "External auditor", l: "External auditor" },
            ]} />
          </div>
          <div>
            <Label text="Asset at risk" required />
            <Select value={data.assetAtRisk} onChange={upd("assetAtRisk")} options={[
              { v: "Individual users", l: "Individual users" },
              { v: "Enterprise systems", l: "Enterprise systems" },
              { v: "Public infrastructure", l: "Public infrastructure" },
              { v: "Biological knowledge", l: "Biological knowledge" },
              { v: "Election ecosystem", l: "Election ecosystem" },
              { v: "Model weights", l: "Model weights" },
              { v: "Evaluation dataset", l: "Evaluation dataset" },
            ]} />
          </div>
        </div>
        <div>
          <Label text="Severity level" required />
          <div className="grid grid-cols-4 gap-2">
            {["low", "medium", "high", "critical"].map((s) => {
              const c = { low: "#22c55e", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" }[s]!;
              const on = data.severityLevel === s;
              return (
                <button key={s} onClick={() => onChange({ severityLevel: s })} className="rounded py-2 font-mono transition-all" style={{ fontSize: "11px", background: on ? `${c}18` : "var(--muted)", color: on ? c : "var(--muted-foreground)", border: `1px solid ${on ? `${c}50` : "var(--border)"}` }}>
                  {s.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
        {showExpert && <ExpertBox content={`Pathway: ${EXPERT.threatPathway}\nActor: ${EXPERT.actorTargeted} | Asset: ${EXPERT.assetAtRisk} | Severity: HIGH`} />}
      </div>
    );
    case 3: return (
      <div className="space-y-4">
        <GuidanceBox text="Task type determines the elicitation strategy and scoring approach. Open-ended tasks maximize capability signal but require expert adjudication. Multiple-choice tasks enable automation but may underestimate capability." />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label text="Task type" required />
            <Select value={data.taskType} onChange={upd("taskType")} options={[
              { v: "open-ended", l: "Open-ended" },
              { v: "multiple-choice", l: "Multiple choice" },
              { v: "completion", l: "Completion" },
              { v: "binary-classification", l: "Binary classification" },
              { v: "interactive-agentic", l: "Interactive agentic" },
              { v: "coding", l: "Coding / execution" },
            ]} />
          </div>
          <div>
            <Label text="N tasks" required />
            <Input value={data.taskCount} onChange={upd("taskCount")} placeholder="e.g. 20" type="number" />
          </div>
        </div>
        <div>
          <Label text="Environment" required />
          <Select value={data.environment} onChange={upd("environment")} options={[
            { v: "Cyber range (isolated lab network)", l: "Cyber range (isolated lab)" },
            { v: "Sandboxed code execution", l: "Sandboxed code execution" },
            { v: "Simulated enterprise workspace", l: "Simulated enterprise workspace" },
            { v: "Live web browsing (controlled)", l: "Live web (controlled)" },
            { v: "Static prompt evaluation", l: "Static prompt evaluation" },
            { v: "Human participant study", l: "Human participant study" },
          ]} />
        </div>
        <div>
          <Label text="Task description" />
          <Textarea value={data.taskDescription} onChange={upd("taskDescription")} placeholder="Describe the task structure, what participants are asked to do, and how tasks are presented…" rows={3} />
        </div>
        {showExpert && <ExpertBox content={`Type: open-ended in isolated cyber range. N=20 tasks covering host enumeration, service fingerprinting, and vulnerability mapping. Tasks graded on accuracy and completeness vs. ground-truth network state.`} />}
      </div>
    );
    case 4: return (
      <div className="space-y-4">
        <GuidanceBox text="Input specification determines what capability is actually being elicited. The same task framed as a direct vs. indirect prompt can yield dramatically different performance. Document the prompt strategy explicitly." />
        <div>
          <Label text="Input modalities" required />
          <Chips options={["Text", "Code", "Image", "Audio", "Document", "Structured data"]} selected={data.inputModalities} onToggle={(v) => toggle("inputModalities", v)} color="#3b82f6" />
        </div>
        <div>
          <Label text="Input format" />
          <Select value={data.inputFormat} onChange={upd("inputFormat")} options={[
            { v: "Structured prompt with context", l: "Structured prompt with context" },
            { v: "Raw task description", l: "Raw task description" },
            { v: "Multi-turn conversation", l: "Multi-turn conversation" },
            { v: "Document + question", l: "Document + question" },
            { v: "Code snippet + task", l: "Code snippet + task" },
            { v: "System prompt + user message", l: "System prompt + user message" },
          ]} />
        </div>
        <div>
          <Label text="Prompt strategy" required />
          <Select value={data.promptStrategy} onChange={upd("promptStrategy")} options={[
            { v: "Direct task prompt", l: "Direct task prompt" },
            { v: "Direct task prompt with partial scaffolding", l: "Direct with partial scaffolding" },
            { v: "Indirect / obfuscated prompt", l: "Indirect / obfuscated" },
            { v: "Multi-step decomposed", l: "Multi-step decomposed" },
            { v: "Jailbreak resilience test", l: "Jailbreak resilience" },
            { v: "Best-of-N elicitation", l: "Best-of-N elicitation" },
          ]} />
        </div>
        {showExpert && <ExpertBox content={`Modalities: Text + Code. Format: structured prompt with network topology context. Strategy: direct task prompt with partial scaffolding — scaffold advantage documented as a known confound.`} />}
      </div>
    );
    case 5: return (
      <div className="space-y-4">
        <GuidanceBox text="Model access level determines what information the evaluator has about the model. Black-box evaluations are more externally valid. White-box enables more targeted capability elicitation but less deployment-realistic." />
        <div>
          <Label text="API access level" required />
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "black-box", l: "Black-box", d: "Output only, no internal access" },
              { v: "gray-box", l: "Gray-box", d: "Log-probs or partial internals" },
              { v: "white-box", l: "White-box", d: "Full weights + activations" },
            ].map(({ v, l, d }) => {
              const on = data.apiAccess === v;
              return (
                <button key={v} onClick={() => onChange({ apiAccess: v })} className="rounded p-2.5 text-left transition-all" style={{ background: on ? "rgba(245,158,11,0.1)" : "var(--muted)", border: `1px solid ${on ? "rgba(245,158,11,0.4)" : "var(--border)"}` }}>
                  <div className="font-mono" style={{ fontSize: "11px", color: on ? "var(--primary)" : "var(--foreground)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{d}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label text="Interaction mode" required />
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "single-turn", l: "Single-turn", d: "One prompt, one response" },
              { v: "multi-turn", l: "Multi-turn", d: "Conversational exchange" },
              { v: "agentic", l: "Agentic", d: "Tool-using, long-horizon" },
            ].map(({ v, l, d }) => {
              const on = data.interactionMode === v;
              return (
                <button key={v} onClick={() => onChange({ interactionMode: v })} className="rounded p-2.5 text-left transition-all" style={{ background: on ? "rgba(59,130,246,0.1)" : "var(--muted)", border: `1px solid ${on ? "rgba(59,130,246,0.4)" : "var(--border)"}` }}>
                  <div className="font-mono" style={{ fontSize: "11px", color: on ? "#3b82f6" : "var(--foreground)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{d}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label text="System prompt access" />
          <Input value={data.systemPromptAccess} onChange={upd("systemPromptAccess")} placeholder="e.g. Standard safety prompt applied; participants cannot view it" />
        </div>
        {showExpert && <ExpertBox content={`Access: black-box API (no internal access). Mode: agentic (multi-step tool-use). System prompt: standard safety prompt applied; not visible to participants.`} />}
      </div>
    );
    case 6: return (
      <div className="space-y-4">
        <GuidanceBox text="Tools and scaffolding are major confounds in agentic evaluations. The scaffolded result and the unscaffolded result measure different things. Always document scaffold level and collect unscaffolded baselines where feasible." />
        <div>
          <Label text="Tools allowed" />
          <Chips options={["Browser", "Terminal", "Code executor", "External APIs", "File system", "Calculator", "None"]} selected={data.toolsAllowed} onToggle={(v) => toggle("toolsAllowed", v)} color="#0891b2" />
        </div>
        <div>
          <Label text="Scaffold level" required />
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "none", l: "None", d: "Raw prompt, no decomposition" },
              { v: "light", l: "Light", d: "Step hints, no tool templates" },
              { v: "heavy", l: "Heavy", d: "Full structured harness" },
            ].map(({ v, l, d }) => {
              const on = data.scaffoldLevel === v;
              const c = { none: "#22c55e", light: "#f59e0b", heavy: "#ef4444" }[v]!;
              return (
                <button key={v} onClick={() => onChange({ scaffoldLevel: v })} className="rounded p-2.5 text-left transition-all" style={{ background: on ? `${c}12` : "var(--muted)", border: `1px solid ${on ? `${c}50` : "var(--border)"}` }}>
                  <div className="font-mono" style={{ fontSize: "11px", color: on ? c : "var(--foreground)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{d}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label text="Scaffold notes" />
          <Textarea value={data.scaffoldNotes} onChange={upd("scaffoldNotes")} placeholder="Document exactly what scaffolding is provided and how it affects interpretability of results…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Tools: Terminal + Browser + Code executor. Scaffold: Light — step-by-step task decomposition provided; no tool-call templates. Unscaffolded baseline to be collected in follow-up evaluation.`} />}
      </div>
    );
    case 7: return (
      <div className="space-y-4">
        <GuidanceBox text="The success condition must be defined before data collection begins. Post-hoc redefinition of success is a major validity threat. Make the threshold explicit and pre-register it." />
        <div>
          <Label text="Success definition" required />
          <Textarea value={data.successDefinition} onChange={upd("successDefinition")} placeholder="What exactly counts as a successful completion of one task? Be specific and quantified…" rows={3} />
        </div>
        <div>
          <Label text="Scoring threshold" required />
          <Select value={data.successThreshold} onChange={upd("successThreshold")} options={[
            { v: "Binary pass/fail", l: "Binary pass/fail" },
            { v: "Binary pass/fail per task; partial credit at 0.5 intervals for marginal results", l: "Binary with partial credit" },
            { v: "0–10 expert rubric score; pass ≥ 7", l: "Rubric score (pass ≥ 7)" },
            { v: "Tiered: 0 (fail) / 0.5 (partial) / 1 (pass)", l: "Tiered 0/0.5/1" },
            { v: "Continuous score (0–100%)", l: "Continuous (0–100%)" },
          ]} />
        </div>
        <div>
          <Label text="Who determines success" required />
          <Select value={data.successJudge} onChange={upd("successJudge")} options={[
            { v: "Automated execution check against ground truth", l: "Automated check" },
            { v: "Single expert evaluator", l: "Single expert evaluator" },
            { v: "Dual expert evaluators + consensus", l: "Dual experts + consensus" },
            { v: "Primary: automated check. Secondary: expert review for ambiguous cases.", l: "Hybrid: automated + expert" },
            { v: "Participant self-report + automated verification", l: "Self-report + auto-verify" },
          ]} />
        </div>
        {showExpert && <ExpertBox content={`Success: ≥70% of hosts identified and ≥50% of services identified with ≤2 false positives. Threshold: binary with 0.5 partial credit. Judge: automated check against ground truth + expert review for ambiguous cases.`} />}
      </div>
    );
    case 8: return (
      <div className="space-y-4">
        <GuidanceBox text="The primary metric should be pre-registered. It must be computable, reproducible, and interpretable by non-experts reading the system card. Avoid composite metrics without clear formulas." />
        <div>
          <Label text="Primary metric" required />
          <Select value={data.primaryMetric} onChange={upd("primaryMetric")} options={[
            { v: "Pass@5", l: "Pass@k (sampling-based)" },
            { v: "Task completion rate", l: "Task completion rate" },
            { v: "Binary accuracy", l: "Binary accuracy" },
            { v: "Mean rubric score", l: "Mean rubric score" },
            { v: "Uplift delta vs. baseline", l: "Uplift delta vs. baseline" },
            { v: "Time-weighted task completion", l: "Time-weighted completion" },
          ]} />
        </div>
        <div>
          <Label text="Metric formula / citation" required />
          <Textarea value={data.metricFormula} onChange={upd("metricFormula")} placeholder="Define the metric precisely — include formula, estimator, and any citations. E.g. 'Pass@k estimated via unbiased estimator (Chen et al., 2021)'…" rows={2} />
        </div>
        <div>
          <Label text="Baseline comparison" required />
          <Textarea value={data.baselineComparison} onChange={upd("baselineComparison")} placeholder="What is the comparison point? Human-only control, random baseline, previous model version, or published benchmark…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Primary: Pass@5 estimated via unbiased estimator (Chen et al., 2021), reported per task difficulty tier. Baseline: human-only control group (n=10, matched on CS background, no offensive security experience) under identical task conditions.`} />}
      </div>
    );
    case 9: return (
      <div className="space-y-4">
        <GuidanceBox text="Secondary metrics provide robustness and enable multi-dimensional interpretation. At minimum include a human assessment metric (for validity) and an efficiency metric (time-to-completion or attempts)." />
        <div>
          <Label text="Secondary metrics" />
          <Chips
            options={["Time-to-first-valid-action", "Human reviewer score", "False positive rate", "Attempt count", "Partial credit rate", "Uplift delta", "Step completion rate"]}
            selected={data.secondaryMetrics}
            onToggle={(v) => toggle("secondaryMetrics", v)}
            color="#a855f7"
          />
        </div>
        <div>
          <Label text="Custom secondary metric" />
          <Input value={data.customSecondary} onChange={upd("customSecondary")} placeholder="Add a metric not in the list above…" />
        </div>
        {showExpert && <ExpertBox content={`Secondary: Time-to-first-valid-action (efficiency proxy), Human reviewer score (validity check), False positive rate. Custom: Uplift delta — Pass@5 difference between model-assisted and human-only conditions, with 95% CI.`} />}
      </div>
    );
    case 10: return (
      <div className="space-y-4">
        <GuidanceBox text="Adjudication mode is a major determinant of result reliability. Single-rater evaluations are fragile. Automated-only evaluations miss nuance. Hybrid approaches require clear rules for when to escalate to human review." />
        <div>
          <Label text="Adjudication mode" required />
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "automated", l: "Automated only", d: "Script/execution-based scoring" },
              { v: "single-expert", l: "Single expert", d: "One human evaluator" },
              { v: "dual-expert", l: "Dual expert", d: "Two raters + consensus" },
              { v: "hybrid", l: "Hybrid", d: "Automated + expert escalation" },
            ].map(({ v, l, d }) => {
              const on = data.adjudicationMode === v;
              return (
                <button key={v} onClick={() => onChange({ adjudicationMode: v })} className="rounded p-2.5 text-left transition-all" style={{ background: on ? "rgba(245,158,11,0.1)" : "var(--muted)", border: `1px solid ${on ? "rgba(245,158,11,0.4)" : "var(--border)"}` }}>
                  <div className="font-mono" style={{ fontSize: "11px", color: on ? "var(--primary)" : "var(--foreground)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{d}</div>
                </button>
              );
            })}
          </div>
        </div>
        {data.adjudicationMode !== "automated" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Number of raters" required />
              <Input value={data.raterCount} onChange={upd("raterCount")} placeholder="e.g. 2" type="number" />
            </div>
            <div>
              <Label text="IRR target" required />
              <Input value={data.irrTarget} onChange={upd("irrTarget")} placeholder="e.g. κ ≥ 0.7 (Cohen's kappa)" />
            </div>
          </div>
        )}
        <div>
          <Label text="Disagreement resolution" />
          <Textarea value={data.disagreementResolution} onChange={upd("disagreementResolution")} placeholder="How are rater disagreements resolved? Senior adjudicator, conservative scoring, majority rule…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Mode: hybrid — automated execution check as primary, expert review escalated for ambiguous cases. Raters: 2 independent evaluators. IRR: κ ≥ 0.7. Disagreements: senior evaluator adjudicates; disagreement rate reported as quality metric.`} />}
      </div>
    );
    case 11: return (
      <div className="space-y-4">
        <GuidanceBox text="Validity risks threaten the interpretability of results. Identify all known risks before data collection — post-hoc risk identification is less credible and may not be actionable. Plan mitigations for each risk." />
        <div>
          <Label text="Known validity risks" />
          <Chips
            options={["Similarity to public CTF tasks", "Unrealistic lab environment", "Scaffold advantage", "Reviewer disagreement", "Small sample size (N < 30)", "Distribution shift from real use", "Temporal validity (techniques evolve)", "Selection bias in task design", "Demand characteristics"]}
            selected={data.validityRisks}
            onToggle={(v) => toggle("validityRisks", v)}
            color="#f97316"
          />
        </div>
        <div>
          <Label text="Custom validity risk" />
          <Input value={data.customRisk} onChange={upd("customRisk")} placeholder="Add a risk not in the list above…" />
        </div>
        <div>
          <Label text="Mitigation notes" />
          <Textarea value={data.mitigationNotes} onChange={upd("mitigationNotes")} placeholder="How will each identified risk be mitigated or documented? Be specific…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Risks: CTF overlap, unrealistic lab environment, scaffold advantage, reviewer disagreement.\nMitigations: CTF overlap audit pre-release; unscaffolded condition planned; lab-vs-real fidelity rubric documented; disagreement rate reported.`} />}
      </div>
    );
    case 12: return (
      <div className="space-y-4">
        <GuidanceBox text="Benchmark contamination can silently inflate capability estimates. Tasks structurally similar to training data yield inflated scores that don't reflect real-world capability. Audit before accepting results as evidence." />
        <div>
          <Label text="Contamination check status" required />
          <Select value={data.contaminationCheck} onChange={upd("contaminationCheck")} options={[
            { v: "Not yet started", l: "Not yet started" },
            { v: "Audit underway", l: "Audit underway" },
            { v: "Audit complete — no overlap found", l: "Complete — no overlap found" },
            { v: "Audit complete — partial overlap identified and documented", l: "Complete — overlap identified" },
            { v: "Structural similarity check only (heuristic)", l: "Heuristic check only" },
          ]} />
        </div>
        <div>
          <Label text="Training data exposure risk" required />
          <div className="grid grid-cols-4 gap-2">
            {["low", "medium", "high", "unknown"].map((v) => {
              const c = { low: "#22c55e", medium: "#f59e0b", high: "#f97316", unknown: "#94a3b8" }[v]!;
              const on = data.trainingExposureRisk === v;
              return (
                <button key={v} onClick={() => onChange({ trainingExposureRisk: v })} className="rounded py-2 font-mono transition-all" style={{ fontSize: "10px", background: on ? `${c}18` : "var(--muted)", color: on ? c : "var(--muted-foreground)", border: `1px solid ${on ? `${c}50` : "var(--border)"}` }}>
                  {v.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label text="Held-out set strategy" required />
          <Textarea value={data.heldOutStrategy} onChange={upd("heldOutStrategy")} placeholder="How is the benchmark protected from contamination? Task design process, hash registration, access controls…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Status: audit underway — 3/20 tasks show structural similarity to Hack The Box / CTF writeups. Exposure risk: medium. Held-out: novel network topologies not in public archives; cryptographic hash registered pre-evaluation.`} />}
      </div>
    );
    case 13: return (
      <div className="space-y-4">
        <GuidanceBox text="Security and disclosure decisions must be made before results are produced. Results that surface significant capability uplift may require restricted handling. Default to more restrictive classification and loosen after legal review." />
        <div>
          <Label text="Classification level" required />
          <div className="grid grid-cols-4 gap-2">
            {(["public", "partner", "restricted", "internal"] as const).map((v) => {
              const c = { public: "#22c55e", partner: "#3b82f6", restricted: "#f97316", internal: "#ef4444" }[v];
              const on = data.classificationLevel === v;
              return (
                <button key={v} onClick={() => onChange({ classificationLevel: v })} className="rounded py-2 font-mono transition-all" style={{ fontSize: "10px", background: on ? `${c}18` : "var(--muted)", color: on ? c : "var(--muted-foreground)", border: `1px solid ${on ? `${c}50` : "var(--border)"}` }}>
                  {v.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label text="Access restrictions" required />
          <Textarea value={data.accessRestrictions} onChange={upd("accessRestrictions")} placeholder="Who can access the benchmark results? Specify by role and organization…" rows={2} />
        </div>
        <div>
          <Label text="Red-team integration notes" />
          <Textarea value={data.redTeamNotes} onChange={upd("redTeamNotes")} placeholder="Does this benchmark inform a red team brief? Are there result-access restrictions for red teamers…" rows={2} />
        </div>
        <div>
          <Label text="Publication plan" />
          <Textarea value={data.publicationPlan} onChange={upd("publicationPlan")} placeholder="What can be published and when? Separate aggregate results from task-level details…" rows={2} />
        </div>
        {showExpert && <ExpertBox content={`Classification: RESTRICTED. Access: Safety team + Legal/Policy + Senior leadership only — not for external distribution pre red-team. Publication: aggregate uplift results publishable after legal review; task-level details remain internal.`} />}
      </div>
    );
    default: return null;
  }
}

// ─── Progress Stepper ─────────────────────────────────────────────────────────

function Stepper({ current, onJump, completedSteps }: { current: number; onJump: (s: number) => void; completedSteps: Set<number> }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto px-4 py-2" style={{ scrollbarWidth: "none" }}>
      {STEP_TITLES.map((title, i) => {
        const step = i + 1;
        const isDone = completedSteps.has(step) && step !== current;
        const isActive = step === current;
        const isReachable = step <= current || completedSteps.has(step - 1);
        return (
          <div key={step} className="flex items-center shrink-0">
            <button
              onClick={() => isReachable && onJump(step)}
              className="flex flex-col items-center gap-1 transition-all"
              style={{ cursor: isReachable ? "pointer" : "default", opacity: isReachable ? 1 : 0.4 }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isActive ? "var(--primary)" : isDone ? "rgba(245,158,11,0.2)" : "var(--muted)",
                  border: isActive ? "none" : isDone ? "1px solid rgba(245,158,11,0.4)" : "1px solid var(--border)",
                }}
              >
                {isDone ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="font-mono" style={{ fontSize: "8px", color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>
                    {step}
                  </span>
                )}
              </div>
              <span className="font-mono text-center" style={{ fontSize: "8px", letterSpacing: "0.04em", color: isActive ? "var(--primary)" : "var(--muted-foreground)", maxWidth: "56px", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                {title.toUpperCase().slice(0, 10)}
              </span>
            </button>
            {step < TOTAL_STEPS && (
              <div className="mx-1" style={{ width: "16px", height: "1px", background: isDone ? "rgba(245,158,11,0.3)" : "var(--border)", flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const STORAGE_KEY = "bpb-draft";

export function BenchmarkPacketBuilder() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PacketData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...EMPTY, ...JSON.parse(saved) } : EMPTY;
    } catch {
      return EMPTY;
    }
  });
  const [showExpert, setShowExpert] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [draftSaved, setDraftSaved] = useState(false);
  const [exported, setExported] = useState(false);

  const warnings = validateStep(step, data);

  const onChange = (partial: Partial<PacketData>) => setData((prev) => ({ ...prev, ...partial }));

  const handleNext = () => {
    setCompletedSteps((prev) => new Set([...prev, step]));
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const handleBack = () => { if (step > 1) setStep((s) => s - 1); };

  const handleSaveDraft = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleExport = () => {
    setExported(true);
  };

  const handleFillExample = () => {
    onChange(EXPERT);
    setCompletedSteps(new Set(Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1)));
  };

  const filledCount = Object.values(data).filter((v) => Array.isArray(v) ? v.length > 0 : v !== "").length;
  const totalFields = Object.keys(data).length;
  const progress = Math.round((filledCount / totalFields) * 100);

  const allStepsComplete = completedSteps.size >= TOTAL_STEPS;

  return (
    <div className="flex flex-col" style={{ height: "100vh", background: "var(--background)", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="shrink-0" style={{ background: "rgba(8,13,24,0.97)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
        <div className="px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
              ASTER-3 // BENCHMARK PACKET BUILDER
            </span>
            <span className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: "rgba(245,158,11,0.1)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.25)" }}>
              FRONTIER MODEL EVALUATION COURSE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full overflow-hidden" style={{ width: "64px", height: "3px", background: "var(--muted)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: progress >= 80 ? "#22c55e" : "var(--primary)" }} />
              </div>
              <span className="font-mono" style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{progress}%</span>
            </div>
            <button onClick={handleFillExample} className="font-mono rounded px-2.5 py-1 transition-all" style={{ fontSize: "9px", letterSpacing: "0.06em", background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>
              FILL EXAMPLE
            </button>
            <button
              onClick={handleSaveDraft}
              className="font-mono rounded px-2.5 py-1 transition-all"
              style={{ fontSize: "9px", letterSpacing: "0.06em", background: draftSaved ? "rgba(34,197,94,0.12)" : "var(--muted)", color: draftSaved ? "#22c55e" : "var(--muted-foreground)", border: `1px solid ${draftSaved ? "rgba(34,197,94,0.3)" : "var(--border)"}` }}
            >
              {draftSaved ? "✓ DRAFT SAVED" : "SAVE DRAFT"}
            </button>
          </div>
        </div>
        {/* Stepper */}
        <Stepper current={step} onJump={setStep} completedSteps={completedSteps} />
      </header>

      {/* Two-column body */}
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Form column */}
        <div className="flex flex-col flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", borderRight: "1px solid var(--border)" }}>
          <div className="p-6 flex-1">
            {/* Step header */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "9px", background: "rgba(245,158,11,0.12)", color: "var(--primary)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    STEP {step} OF {TOTAL_STEPS}
                  </span>
                  {warnings.length > 0 && (
                    <span className="font-mono rounded px-2 py-0.5" style={{ fontSize: "9px", background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}>
                      {warnings.length} warning{warnings.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowExpert((v) => !v)}
                  className="font-mono rounded px-2.5 py-1 transition-all"
                  style={{ fontSize: "10px", background: showExpert ? "rgba(168,85,247,0.15)" : "var(--muted)", color: showExpert ? "#a855f7" : "var(--muted-foreground)", border: `1px solid ${showExpert ? "rgba(168,85,247,0.35)" : "var(--border)"}` }}
                >
                  {showExpert ? "▲ Hide Expert Example" : "▼ Show Expert Example"}
                </button>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--foreground)" }}>
                {STEP_TITLES[step - 1]}
              </h2>
            </div>

            {/* Validation warnings */}
            {warnings.length > 0 && (
              <div className="rounded-lg p-3 mb-4 space-y-2" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.2)" }}>
                {warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span style={{ color: "#f97316", fontSize: "10px", marginTop: "2px" }}>⚠</span>
                    <span style={{ fontSize: "12px", color: "#f97316", lineHeight: 1.5 }}>{w}</span>
                  </div>
                ))}
              </div>
            )}

            <StepForm step={step} data={data} onChange={onChange} showExpert={showExpert} />
          </div>

          {/* Bottom nav */}
          <div className="shrink-0 px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", background: "rgba(8,13,24,0.7)" }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="font-mono rounded px-4 py-2 transition-all"
              style={{ fontSize: "11px", letterSpacing: "0.06em", background: step === 1 ? "transparent" : "var(--muted)", color: step === 1 ? "var(--muted-foreground)" : "var(--foreground)", border: step === 1 ? "none" : "1px solid var(--border)", opacity: step === 1 ? 0.3 : 1 }}
            >
              ← BACK
            </button>
            <div className="flex items-center gap-2">
              {step === TOTAL_STEPS ? (
                <button
                  onClick={handleExport}
                  className="font-mono rounded px-5 py-2 transition-all"
                  style={{ fontSize: "11px", letterSpacing: "0.08em", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  EXPORT TO CAPSTONE →
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="font-mono rounded px-5 py-2 transition-all"
                  style={{ fontSize: "11px", letterSpacing: "0.06em", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  NEXT →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview column */}
        <div className="overflow-y-auto" style={{ width: "380px", minWidth: "300px", scrollbarWidth: "none" }}>
          <div className="p-4">
            <div className="font-mono mb-3 flex items-center justify-between" style={{ fontSize: "9px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
              <span>LIVE PREVIEW — BENCHMARK PACKET</span>
              <span style={{ color: "var(--primary)", fontSize: "8px" }}>STEP {step} ACTIVE</span>
            </div>
            <PreviewCard data={data} currentStep={step} />
          </div>
        </div>
      </div>

      {/* Export overlay */}
      {exported && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "rgba(8,13,24,0.88)", backdropFilter: "blur(10px)", zIndex: 100 }}>
          <div className="rounded-xl p-8 text-center" style={{ background: "var(--card)", border: "1px solid rgba(34,197,94,0.4)", maxWidth: "460px", width: "90%" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 13L10.5 18.5L21 8" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="font-mono mb-2" style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#22c55e" }}>BENCHMARK PACKET EXPORTED</div>
            <h3 style={{ fontSize: "19px", fontWeight: 600, color: "var(--foreground)", marginBottom: "10px", lineHeight: 1.3 }}>
              Benchmark packet added to capstone dossier.
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "8px" }}>
              <span className="font-mono" style={{ color: "var(--foreground)" }}>
                {data.benchmarkName || "Unnamed Benchmark"}
              </span>{" "}
              has been saved as a structured benchmark packet. It will appear in your capstone dossier under the evaluation design section, alongside your threat model and evidence cards.
            </p>
            {data.classificationLevel && (
              <div className="inline-block mb-5">
                <span className="font-mono rounded px-2 py-1" style={{
                  fontSize: "10px",
                  background: { public: "rgba(34,197,94,0.1)", partner: "rgba(59,130,246,0.1)", restricted: "rgba(249,115,22,0.1)", internal: "rgba(239,68,68,0.1)" }[data.classificationLevel],
                  color: { public: "#22c55e", partner: "#3b82f6", restricted: "#f97316", internal: "#ef4444" }[data.classificationLevel],
                  border: `1px solid ${{ public: "rgba(34,197,94,0.3)", partner: "rgba(59,130,246,0.3)", restricted: "rgba(249,115,22,0.3)", internal: "rgba(239,68,68,0.3)" }[data.classificationLevel]}`,
                }}>
                  {data.classificationLevel.toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setData(EMPTY); setStep(1); setCompletedSteps(new Set()); setExported(false); }}
                className="px-5 py-2.5 rounded font-mono transition-all"
                style={{ fontSize: "11px", letterSpacing: "0.06em", background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                NEW PACKET
              </button>
              <button
                onClick={() => setExported(false)}
                className="px-5 py-2.5 rounded font-mono transition-all"
                style={{ fontSize: "11px", letterSpacing: "0.06em", background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                VIEW PACKET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
