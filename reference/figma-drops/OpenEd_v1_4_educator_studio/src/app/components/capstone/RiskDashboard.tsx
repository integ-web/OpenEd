import React, { useState } from "react";
import { SectionHeader, Card, Btn, GateWarning, Badge, FieldLabel, TextInput, TextArea, Select, MonoLabel } from "./ui";
import { useCapstone, MitigationItem } from "./CapstoneContext";
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from "recharts";

const RISK_RATINGS = ["Low", "Medium", "High", "Critical"] as const;
const STATUSES: MitigationItem["status"][] = ["Open", "In Progress", "Complete"];

function ratingColor(r: string) {
  return r === "Critical" ? "#ef4444" : r === "High" ? "#f59e0b" : r === "Medium" ? "#3b82f6" : "#22c55e";
}

export function RiskDashboard() {
  const { state, updateRiskDashboard, addMitigation, removeMitigation, updateMitigationStatus, qualityGates } = useCapstone();
  const dash = state.riskDashboard;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<MitigationItem>>({
    risk: "", mitigation: "", owner: "", deadline: "", status: "Open",
  });

  const handleAdd = () => {
    if (!form.risk || !form.mitigation || !form.owner) return;
    addMitigation({
      id: `mit-${Date.now()}`,
      risk: form.risk!,
      mitigation: form.mitigation!,
      owner: form.owner!,
      deadline: form.deadline || "TBD",
      status: form.status as MitigationItem["status"],
    });
    setForm({ risk: "", mitigation: "", owner: "", deadline: "", status: "Open" });
    setShowForm(false);
  };

  const canComplete = qualityGates.canCompleteDashboard;

  const completedMits = dash.mitigations.filter((m) => m.status === "Complete").length;
  const inProgressMits = dash.mitigations.filter((m) => m.status === "In Progress").length;
  const openMits = dash.mitigations.filter((m) => m.status === "Open").length;

  const overallRating = dash.overallRating;
  const gaugeData = overallRating
    ? [
        {
          value:
            overallRating === "Critical" ? 95
            : overallRating === "High" ? 72
            : overallRating === "Medium" ? 48
            : 22,
          fill: ratingColor(overallRating),
        },
      ]
    : [{ value: 0, fill: "var(--muted)" }];

  return (
    <div>
      <SectionHeader
        number="SECTION 09"
        title="Risk Dashboard"
        subtitle="Aggregate risk posture, mitigation tracking, and dashboard completion"
      />

      {!qualityGates.canCompleteDashboard && (
        <GateWarning message="QUALITY GATE: Dashboard cannot be marked complete without a mitigation plan. Add at least one mitigation entry and a plan narrative." />
      )}

      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
              Overall Risk Rating
            </h3>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={120}>
                <RadialBarChart
                  cx="50%"
                  cy="100%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={12}
                  data={gaugeData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "var(--muted)" }}>
                    {gaugeData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <p
                className="font-mono -mt-4"
                style={{ fontSize: "1.5rem", color: overallRating ? ratingColor(overallRating) : "var(--muted-foreground)" }}
              >
                {overallRating || "—"}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-1">
              {RISK_RATINGS.map((r) => (
                <button
                  key={r}
                  onClick={() => updateRiskDashboard({ overallRating: r })}
                  className="font-mono text-xs py-1.5 px-2 border transition-all"
                  style={{
                    background: overallRating === r ? `${ratingColor(r)}20` : "var(--muted)",
                    borderColor: overallRating === r ? ratingColor(r) : "var(--border)",
                    color: overallRating === r ? ratingColor(r) : "var(--muted-foreground)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </Card>

          <Card className="col-span-2">
            <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
              Mitigation Status Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Open", count: openMits, color: "#ef4444" },
                { label: "In Progress", count: inProgressMits, color: "#f59e0b" },
                { label: "Complete", count: completedMits, color: "#22c55e" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 border border-border text-center"
                  style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
                >
                  <MonoLabel>{s.label}</MonoLabel>
                  <p className="font-mono mt-1" style={{ fontSize: "2rem", color: s.color }}>
                    {s.count}
                  </p>
                </div>
              ))}
            </div>
            {dash.mitigations.length > 0 && (
              <div
                className="h-2 w-full overflow-hidden"
                style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
              >
                <div
                  className="h-full flex"
                  style={{ width: "100%" }}
                >
                  <div style={{ width: `${(completedMits / dash.mitigations.length) * 100}%`, background: "#22c55e" }} />
                  <div style={{ width: `${(inProgressMits / dash.mitigations.length) * 100}%`, background: "#f59e0b" }} />
                  <div style={{ width: `${(openMits / dash.mitigations.length) * 100}%`, background: "#ef4444" }} />
                </div>
              </div>
            )}
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Mitigation Register</h3>
            <Btn size="sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Add Mitigation"}
            </Btn>
          </div>

          {showForm && (
            <div className="mb-6 p-4 border border-border" style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}>
              <h4 className="font-mono text-sm mb-4" style={{ color: "var(--primary)" }}>NEW MITIGATION ENTRY</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel>Risk Being Addressed</FieldLabel>
                  <TextInput
                    value={form.risk || ""}
                    onChange={(v) => setForm((f) => ({ ...f, risk: v }))}
                    placeholder="e.g., Sandbox escape via tool-chain exploit"
                  />
                </div>
                <div>
                  <FieldLabel>Mitigation Action</FieldLabel>
                  <TextInput
                    value={form.mitigation || ""}
                    onChange={(v) => setForm((f) => ({ ...f, mitigation: v }))}
                    placeholder="e.g., Harden execution environment, add syscall allowlist"
                  />
                </div>
                <div>
                  <FieldLabel>Owner / Team</FieldLabel>
                  <TextInput
                    value={form.owner || ""}
                    onChange={(v) => setForm((f) => ({ ...f, owner: v }))}
                    placeholder="e.g., Security Engineering"
                  />
                </div>
                <div>
                  <FieldLabel>Target Deadline</FieldLabel>
                  <TextInput
                    value={form.deadline || ""}
                    onChange={(v) => setForm((f) => ({ ...f, deadline: v }))}
                    placeholder="e.g., 2026-07-15"
                  />
                </div>
                <div>
                  <FieldLabel>Current Status</FieldLabel>
                  <Select
                    value={form.status || "Open"}
                    onChange={(v) => setForm((f) => ({ ...f, status: v as MitigationItem["status"] }))}
                    options={STATUSES.map((s) => ({ value: s, label: s }))}
                  />
                </div>
              </div>
              <Btn onClick={handleAdd} disabled={!form.risk || !form.mitigation || !form.owner}>
                Add Mitigation
              </Btn>
            </div>
          )}

          {dash.mitigations.length === 0 ? (
            <div className="text-center py-10 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              No mitigations registered. Add entries to build the mitigation plan.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Risk", "Mitigation", "Owner", "Deadline", "Status"].map((col) => (
                      <th
                        key={col}
                        className="text-left py-2 pr-4 text-xs tracking-widest uppercase"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dash.mitigations.map((m) => (
                    <tr key={m.id} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4" style={{ color: "var(--foreground)", maxWidth: "180px" }}>
                        {m.risk}
                      </td>
                      <td className="py-3 pr-4" style={{ color: "var(--muted-foreground)", maxWidth: "200px" }}>
                        {m.mitigation}
                      </td>
                      <td className="py-3 pr-4" style={{ color: "var(--muted-foreground)" }}>{m.owner}</td>
                      <td className="py-3 pr-4" style={{ color: "var(--muted-foreground)" }}>{m.deadline}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={m.status}
                            onChange={(e) => updateMitigationStatus(m.id, e.target.value as MitigationItem["status"])}
                            className="font-mono text-xs px-2 py-1 border border-border"
                            style={{
                              background: "var(--input-background)",
                              color: m.status === "Complete" ? "#22c55e" : m.status === "In Progress" ? "#f59e0b" : "#ef4444",
                              borderRadius: "var(--radius-sm)",
                              cursor: "pointer",
                            }}
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button
                            onClick={() => removeMitigation(m.id)}
                            className="font-mono text-xs"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Mitigation Plan Narrative
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            Summarize the overall mitigation strategy. How do the individual mitigations combine to
            reduce aggregate risk to the acceptable threshold?
          </p>
          <TextArea
            value={dash.mitigationPlan}
            onChange={(v) => updateRiskDashboard({ mitigationPlan: v })}
            placeholder="The aggregate mitigation strategy for Aster-3 prioritizes..."
            rows={6}
          />
        </Card>

        <div className="flex items-center justify-between">
          <div>
            {dash.complete && (
              <span className="font-mono text-xs" style={{ color: "#22c55e" }}>
                ✓ Risk dashboard marked complete
              </span>
            )}
          </div>
          <Btn
            onClick={() => updateRiskDashboard({ complete: true })}
            disabled={!canComplete || dash.complete}
            size="lg"
            variant={canComplete ? "primary" : "ghost"}
          >
            {dash.complete ? "Dashboard Finalized" : canComplete ? "Mark Dashboard Complete" : "Add mitigations to continue"}
          </Btn>
        </div>
      </div>
    </div>
  );
}
