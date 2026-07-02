import React, { useState } from "react";
import { SectionHeader, Card, Btn, GateWarning, Badge, FieldLabel, TextInput, TextArea, Select, MonoLabel } from "./ui";
import { useCapstone, Threat } from "./CapstoneContext";

const CATEGORIES = ["Misuse", "Misalignment", "Dual-Use", "Systemic", "Agentic", "Societal"];
const LIKELIHOODS: Threat["likelihood"][] = ["Low", "Medium", "High", "Critical"];
const IMPACTS: Threat["impact"][] = ["Low", "Medium", "High", "Severe"];
const ACTORS = ["Nation-State", "Criminal Organization", "Insider Threat", "Activist", "Researcher", "Accidental", "Automated System"];

function likelihoodColor(l: string) {
  return l === "Critical" ? "red" : l === "High" ? "yellow" : l === "Medium" ? "blue" : "default";
}

function impactColor(i: string) {
  return i === "Severe" ? "red" : i === "High" ? "yellow" : i === "Medium" ? "blue" : "default";
}

export function ThreatModelCanvas() {
  const { state, addThreatDomain, removeThreatDomain, addThreat, removeThreat, DOMAIN_OPTIONS, qualityGates } = useCapstone();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Threat>>({
    domain: "",
    category: "",
    description: "",
    likelihood: "Medium",
    impact: "Medium",
    actor: "",
  });

  const handleAdd = () => {
    if (!form.domain || !form.description || !form.actor || !form.category) return;
    addThreat({
      id: `threat-${Date.now()}`,
      domain: form.domain!,
      category: form.category!,
      description: form.description!,
      likelihood: form.likelihood as Threat["likelihood"],
      impact: form.impact as Threat["impact"],
      actor: form.actor!,
    });
    setForm({ domain: "", category: "", description: "", likelihood: "Medium", impact: "Medium", actor: "" });
    setShowForm(false);
  };

  const grouped: Record<string, Threat[]> = {};
  state.threatModel.threats.forEach((t) => {
    if (!grouped[t.domain]) grouped[t.domain] = [];
    grouped[t.domain].push(t);
  });

  return (
    <div>
      <SectionHeader
        number="SECTION 04"
        title="Threat Model Canvas"
        subtitle="Define risk domains and enumerate adversarial threat scenarios"
      />

      {!qualityGates.hasMinRiskDomains && (
        <GateWarning message="QUALITY GATE: At least 3 risk domains must be selected before the capstone can be completed. Currently selected: " />
      )}

      <div className="grid gap-6">
        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Risk Domain Selection
          </h3>
          <p className="font-mono text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>
            Select all domains relevant to Aster-3's capability surface and deployment context. Minimum 3 required.
          </p>
          <div className="flex flex-wrap gap-2">
            {DOMAIN_OPTIONS.map((domain) => {
              const selected = state.threatModel.domains.includes(domain);
              return (
                <button
                  key={domain}
                  onClick={() => selected ? removeThreatDomain(domain) : addThreatDomain(domain)}
                  className="font-mono text-xs px-3 py-2 border transition-all"
                  style={{
                    borderRadius: "var(--radius-sm)",
                    background: selected ? "rgba(29,78,216,0.15)" : "var(--muted)",
                    borderColor: selected ? "rgba(29,78,216,0.5)" : "var(--border)",
                    color: selected ? "var(--primary)" : "var(--muted-foreground)",
                    cursor: "pointer",
                  }}
                >
                  {selected ? "✓ " : ""}{domain}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
              Selected:
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: state.threatModel.domains.length >= 3 ? "#22c55e" : "#f59e0b" }}
            >
              {state.threatModel.domains.length} / 3 minimum
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Threat Register</h3>
            <Btn size="sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Add Threat"}
            </Btn>
          </div>

          {showForm && (
            <div
              className="mb-6 p-4 border border-border"
              style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}
            >
              <h4 className="font-mono text-sm mb-4" style={{ color: "var(--primary)" }}>
                NEW THREAT ENTRY
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel>Risk Domain</FieldLabel>
                  <Select
                    value={form.domain || ""}
                    onChange={(v) => setForm((f) => ({ ...f, domain: v }))}
                    options={DOMAIN_OPTIONS.map((d) => ({ value: d, label: d }))}
                    placeholder="Select domain..."
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
                  <FieldLabel>Threat Actor</FieldLabel>
                  <Select
                    value={form.actor || ""}
                    onChange={(v) => setForm((f) => ({ ...f, actor: v }))}
                    options={ACTORS.map((a) => ({ value: a, label: a }))}
                    placeholder="Select actor..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FieldLabel>Likelihood</FieldLabel>
                    <Select
                      value={form.likelihood || "Medium"}
                      onChange={(v) => setForm((f) => ({ ...f, likelihood: v as Threat["likelihood"] }))}
                      options={LIKELIHOODS.map((l) => ({ value: l, label: l }))}
                    />
                  </div>
                  <div>
                    <FieldLabel>Impact</FieldLabel>
                    <Select
                      value={form.impact || "Medium"}
                      onChange={(v) => setForm((f) => ({ ...f, impact: v as Threat["impact"] }))}
                      options={IMPACTS.map((i) => ({ value: i, label: i }))}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <FieldLabel>Threat Description</FieldLabel>
                <TextArea
                  value={form.description || ""}
                  onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                  placeholder="Describe the specific threat scenario, attack vector, and potential harm..."
                  rows={3}
                />
              </div>
              <Btn
                onClick={handleAdd}
                disabled={!form.domain || !form.description || !form.actor || !form.category}
              >
                Add to Register
              </Btn>
            </div>
          )}

          {state.threatModel.threats.length === 0 ? (
            <div
              className="text-center py-12 font-mono text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              No threats logged. Add entries to build the threat register.
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(grouped).map(([domain, threats]) => (
                <div key={domain}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="font-mono text-xs tracking-widest uppercase"
                      style={{ color: "var(--primary)" }}
                    >
                      {domain}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      ({threats.length})
                    </span>
                  </div>
                  {threats.map((t) => (
                    <div
                      key={t.id}
                      className="mb-2 p-3 border border-border flex items-start gap-4"
                      style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge color="purple">{t.category}</Badge>
                          <Badge color="blue">{t.actor}</Badge>
                          <Badge color={likelihoodColor(t.likelihood) as any}>L:{t.likelihood}</Badge>
                          <Badge color={impactColor(t.impact) as any}>I:{t.impact}</Badge>
                        </div>
                        <p className="font-mono text-sm" style={{ color: "var(--foreground)" }}>
                          {t.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeThreat(t.id)}
                        className="font-mono text-xs shrink-0 mt-0.5"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Threat Matrix Overview
          </h3>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-1 min-w-96">
              {["", "Low Impact", "Medium Impact", "High Impact", "Severe Impact"].map((h, i) => (
                <div
                  key={i}
                  className="font-mono text-xs p-2 text-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </div>
              ))}
              {LIKELIHOODS.slice().reverse().map((likelihood) =>
                [undefined, "Low", "Medium", "High", "Severe"].map((impact, j) => {
                  if (j === 0) {
                    return (
                      <div
                        key={likelihood + "-label"}
                        className="font-mono text-xs p-2 flex items-center"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {likelihood}
                      </div>
                    );
                  }
                  const count = state.threatModel.threats.filter(
                    (t) => t.likelihood === likelihood && t.impact === impact
                  ).length;
                  const isCritical =
                    (likelihood === "Critical" || likelihood === "High") &&
                    (impact === "Severe" || impact === "High");
                  return (
                    <div
                      key={`${likelihood}-${impact}`}
                      className="font-mono text-xs p-2 h-12 flex items-center justify-center border border-border"
                      style={{
                        background: isCritical
                          ? count > 0
                            ? "rgba(239,68,68,0.2)"
                            : "rgba(239,68,68,0.05)"
                          : count > 0
                          ? "rgba(29,78,216,0.15)"
                          : "var(--muted)",
                        borderRadius: "var(--radius-sm)",
                        color: count > 0 ? "var(--foreground)" : "var(--muted-foreground)",
                      }}
                    >
                      {count > 0 ? count : "—"}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
