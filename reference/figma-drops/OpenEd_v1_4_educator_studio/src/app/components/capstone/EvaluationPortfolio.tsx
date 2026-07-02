import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge, FieldLabel, TextInput, TextArea, Select, SeverityBadge, MonoLabel } from "./ui";
import { useCapstone, Evaluation } from "./CapstoneContext";

const CATEGORIES = [
  "CBRN Uplift", "Cyberoffense", "Deception", "Autonomous Replication",
  "Persuasion & Manipulation", "Alignment & Values", "Capability Elicitation",
  "Jailbreak Resistance", "Agentic Behavior", "Dual-Use",
];
const METHODS = [
  "Red-Team Elicitation", "Automated Probing", "Structured Interview",
  "Controlled Scenario", "Benchmark Suite", "Expert Panel",
  "Adversarial Simulation", "Longitudinal Observation",
];
const SEVERITIES: Evaluation["severity"][] = ["Pass", "Caution", "Concern", "Critical"];

export function EvaluationPortfolio() {
  const { state, addEvaluation, removeEvaluation } = useCapstone();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Evaluation>>({
    name: "", category: "", method: "", finding: "", severity: "Caution", notes: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.category || !form.method || !form.finding) return;
    addEvaluation({
      id: `eval-${Date.now()}`,
      name: form.name!,
      category: form.category!,
      method: form.method!,
      finding: form.finding!,
      severity: form.severity as Evaluation["severity"],
      notes: form.notes || "",
    });
    setForm({ name: "", category: "", method: "", finding: "", severity: "Caution", notes: "" });
    setShowForm(false);
  };

  const count = state.evaluations.length;
  const needed = Math.max(0, 6 - count);

  const severityOrder = { Critical: 0, Concern: 1, Caution: 2, Pass: 3 };

  return (
    <div>
      <SectionHeader
        number="SECTION 05"
        title="Evaluation Portfolio Builder"
        subtitle="Document structured evaluations of Aster-3 capabilities and risks"
      />

      <div className="grid gap-6">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <MonoLabel>Total Evaluations</MonoLabel>
            <p
              className="font-mono mt-1"
              style={{ fontSize: "2rem", color: count >= 6 ? "#22c55e" : "var(--primary)" }}
            >
              {count}
            </p>
            <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              {needed > 0 ? `${needed} more required` : "Minimum met"}
            </p>
          </Card>
          {(["Pass", "Caution", "Concern", "Critical"] as Evaluation["severity"][]).map((sev) => {
            const n = state.evaluations.filter((e) => e.severity === sev).length;
            return (
              <Card key={sev}>
                <MonoLabel>{sev}</MonoLabel>
                <p
                  className="font-mono mt-1"
                  style={{
                    fontSize: "2rem",
                    color:
                      sev === "Critical" ? "#ef4444"
                      : sev === "Concern" ? "#f59e0b"
                      : sev === "Caution" ? "#3b82f6"
                      : "#22c55e",
                  }}
                >
                  {n}
                </p>
              </Card>
            );
          })}
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Evaluation Register</h3>
              {count < 6 && (
                <p className="font-mono text-xs mt-1" style={{ color: "#f59e0b" }}>
                  ⚠ {needed} more evaluation{needed !== 1 ? "s" : ""} required for minimum portfolio
                </p>
              )}
            </div>
            <Btn size="sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ New Evaluation"}
            </Btn>
          </div>

          {showForm && (
            <div
              className="mb-6 p-4 border border-border"
              style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}
            >
              <h4 className="font-mono text-sm mb-4" style={{ color: "var(--primary)" }}>
                NEW EVALUATION ENTRY
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel>Evaluation Name</FieldLabel>
                  <TextInput
                    value={form.name || ""}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="e.g., CBRN Synthesis Elicitation — Round 3"
                  />
                </div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={form.category || ""}
                    onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                    options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                    placeholder="Select category..."
                  />
                </div>
                <div>
                  <FieldLabel>Evaluation Method</FieldLabel>
                  <Select
                    value={form.method || ""}
                    onChange={(v) => setForm((f) => ({ ...f, method: v }))}
                    options={METHODS.map((m) => ({ value: m, label: m }))}
                    placeholder="Select method..."
                  />
                </div>
                <div>
                  <FieldLabel>Severity Finding</FieldLabel>
                  <Select
                    value={form.severity || "Caution"}
                    onChange={(v) => setForm((f) => ({ ...f, severity: v as Evaluation["severity"] }))}
                    options={SEVERITIES.map((s) => ({ value: s, label: s }))}
                  />
                </div>
              </div>
              <div className="mb-3">
                <FieldLabel>Primary Finding</FieldLabel>
                <TextArea
                  value={form.finding || ""}
                  onChange={(v) => setForm((f) => ({ ...f, finding: v }))}
                  placeholder="Describe the key finding from this evaluation..."
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <FieldLabel>Evaluator Notes</FieldLabel>
                <TextArea
                  value={form.notes || ""}
                  onChange={(v) => setForm((f) => ({ ...f, notes: v }))}
                  placeholder="Methodology notes, caveats, confidence level..."
                  rows={2}
                />
              </div>
              <Btn
                onClick={handleAdd}
                disabled={!form.name || !form.category || !form.method || !form.finding}
              >
                Add to Portfolio
              </Btn>
            </div>
          )}

          {state.evaluations.length === 0 ? (
            <div className="text-center py-12 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              No evaluations logged. Add structured evaluation records to build the portfolio.
            </div>
          ) : (
            <div className="space-y-3">
              {[...state.evaluations]
                .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
                .map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="p-4 border border-border"
                    style={{
                      background: "var(--muted)",
                      borderRadius: "var(--radius-sm)",
                      borderLeftWidth: "3px",
                      borderLeftColor:
                        ev.severity === "Critical" ? "#ef4444"
                        : ev.severity === "Concern" ? "#f59e0b"
                        : ev.severity === "Caution" ? "#3b82f6"
                        : "#22c55e",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className="font-mono text-xs"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            EVAL-{String(idx + 1).padStart(3, "0")}
                          </span>
                          <SeverityBadge severity={ev.severity} />
                          <Badge color="blue">{ev.category}</Badge>
                          <Badge color="default">{ev.method}</Badge>
                        </div>
                        <p className="font-mono text-sm mb-1" style={{ color: "var(--foreground)" }}>
                          {ev.name}
                        </p>
                        <p className="font-mono text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>
                          {ev.finding}
                        </p>
                        {ev.notes && (
                          <p className="font-mono text-xs italic" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
                            ↳ {ev.notes}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeEvaluation(ev.id)}
                        className="font-mono text-xs shrink-0"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {count >= 6 && (
          <div
            className="p-4 border font-mono text-sm flex items-center gap-3"
            style={{
              background: "rgba(34,197,94,0.05)",
              borderColor: "rgba(34,197,94,0.3)",
              color: "#22c55e",
              borderRadius: "var(--radius)",
            }}
          >
            ✓ Portfolio minimum met — {count} evaluations on record. Proceed to benchmark packet.
          </div>
        )}
      </div>
    </div>
  );
}
