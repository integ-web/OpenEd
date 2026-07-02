import React, { useState } from "react";
import { SectionHeader, Card, Btn, GateWarning, Badge, FieldLabel, TextInput, TextArea, Select, SeverityBadge, MonoLabel } from "./ui";
import { useCapstone, EvidenceCard } from "./CapstoneContext";

const DOMAINS = [
  "CBRN", "Cyberoffense", "Deception", "Autonomous Replication",
  "Persuasion", "Alignment", "Dual-Use", "Agentic Behavior", "Societal Impact", "Other",
];
const SOURCES = [
  "Red-Team Session", "Benchmark Suite", "Automated Probe", "Expert Review",
  "Literature Review", "Incident Report", "Internal Test", "Third-Party Audit",
];
const SEVERITIES: EvidenceCard["severity"][] = ["Low", "Medium", "High", "Critical"];

function sevColor(s: string) {
  return s === "Critical" ? "#ef4444" : s === "High" ? "#f59e0b" : s === "Medium" ? "#3b82f6" : "#22c55e";
}

export function EvidenceCardLibrary() {
  const { state, addEvidenceCard, removeEvidenceCard, qualityGates } = useCapstone();
  const [showForm, setShowForm] = useState(false);
  const [filterDomain, setFilterDomain] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [form, setForm] = useState<Partial<EvidenceCard>>({
    code: "", title: "", domain: "", finding: "", severity: "Medium", source: "", date: "2026-06-11",
  });

  const handleAdd = () => {
    if (!form.title || !form.domain || !form.finding || !form.source) return;
    const next = state.evidenceCards.length + 1;
    addEvidenceCard({
      id: `ev-${Date.now()}`,
      code: `EC-${String(next).padStart(3, "0")}`,
      title: form.title!,
      domain: form.domain!,
      finding: form.finding!,
      severity: form.severity as EvidenceCard["severity"],
      source: form.source!,
      date: form.date || "2026-06-11",
    });
    setForm({ code: "", title: "", domain: "", finding: "", severity: "Medium", source: "", date: "2026-06-11" });
    setShowForm(false);
  };

  const filtered = state.evidenceCards.filter((c) => {
    if (filterDomain && c.domain !== filterDomain) return false;
    if (filterSeverity && c.severity !== filterSeverity) return false;
    return true;
  });

  const count = state.evidenceCards.length;
  const needed = Math.max(0, 12 - count);

  return (
    <div>
      <SectionHeader
        number="SECTION 07"
        title="Evidence Card Library"
        subtitle="12 evidence cards required — each card documents a discrete finding tied to a risk domain"
      />

      {!qualityGates.hasMinEvidenceCards && (
        <GateWarning
          message={`QUALITY GATE: Export is blocked until 12 evidence cards are complete. Currently: ${count}/12. ${needed} more required.`}
        />
      )}

      <div className="grid gap-6">
        <div className="grid grid-cols-4 gap-3">
          <Card>
            <MonoLabel>Cards Completed</MonoLabel>
            <p
              className="font-mono mt-1"
              style={{ fontSize: "2rem", color: count >= 12 ? "#22c55e" : "var(--primary)" }}
            >
              {count}
              <span className="font-mono" style={{ fontSize: "1.2rem", color: "var(--muted-foreground)" }}>
                {" "}/12
              </span>
            </p>
          </Card>
          {(["Critical", "High", "Medium", "Low"] as EvidenceCard["severity"][]).map((sev) => {
            const n = state.evidenceCards.filter((c) => c.severity === sev).length;
            return (
              <Card key={sev}>
                <MonoLabel>{sev}</MonoLabel>
                <p className="font-mono mt-1" style={{ fontSize: "2rem", color: sevColor(sev) }}>
                  {n}
                </p>
              </Card>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2 h-1.5 w-full rounded overflow-hidden"
          style={{ background: "var(--muted)" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${Math.min(100, (count / 12) * 100)}%`,
              background: count >= 12 ? "#22c55e" : "var(--primary)",
            }}
          />
        </div>

        <Card>
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <h3 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Evidence Card Register</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="font-mono text-xs px-2 py-1.5 border border-border"
                style={{ background: "var(--input-background)", color: "var(--foreground)", borderRadius: "var(--radius-sm)" }}
              >
                <option value="">All Domains</option>
                {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="font-mono text-xs px-2 py-1.5 border border-border"
                style={{ background: "var(--input-background)", color: "var(--foreground)", borderRadius: "var(--radius-sm)" }}
              >
                <option value="">All Severities</option>
                {SEVERITIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Btn size="sm" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "+ New Card"}
              </Btn>
            </div>
          </div>

          {showForm && (
            <div className="mb-6 p-4 border border-border" style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}>
              <h4 className="font-mono text-sm mb-4" style={{ color: "var(--primary)" }}>
                NEW EVIDENCE CARD — EC-{String(count + 1).padStart(3, "0")}
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel>Card Title</FieldLabel>
                  <TextInput
                    value={form.title || ""}
                    onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                    placeholder="e.g., Bioweapon Synthesis Uplift — Unconstrained Prompting"
                  />
                </div>
                <div>
                  <FieldLabel>Risk Domain</FieldLabel>
                  <Select
                    value={form.domain || ""}
                    onChange={(v) => setForm((f) => ({ ...f, domain: v }))}
                    options={DOMAINS.map((d) => ({ value: d, label: d }))}
                    placeholder="Select domain..."
                  />
                </div>
                <div>
                  <FieldLabel>Evidence Source</FieldLabel>
                  <Select
                    value={form.source || ""}
                    onChange={(v) => setForm((f) => ({ ...f, source: v }))}
                    options={SOURCES.map((s) => ({ value: s, label: s }))}
                    placeholder="Select source..."
                  />
                </div>
                <div>
                  <FieldLabel>Severity Rating</FieldLabel>
                  <Select
                    value={form.severity || "Medium"}
                    onChange={(v) => setForm((f) => ({ ...f, severity: v as EvidenceCard["severity"] }))}
                    options={SEVERITIES.map((s) => ({ value: s, label: s }))}
                  />
                </div>
              </div>
              <div className="mb-4">
                <FieldLabel>Finding Summary</FieldLabel>
                <TextArea
                  value={form.finding || ""}
                  onChange={(v) => setForm((f) => ({ ...f, finding: v }))}
                  placeholder="Describe the finding in specific, evidence-grounded terms. What was observed? Under what conditions?"
                  rows={3}
                />
              </div>
              <Btn
                onClick={handleAdd}
                disabled={!form.title || !form.domain || !form.finding || !form.source}
              >
                Log Evidence Card
              </Btn>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-12 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              {count === 0 ? "No evidence cards yet. Begin logging findings." : "No cards match current filters."}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((card) => (
                <div
                  key={card.id}
                  className="p-4 border relative group"
                  style={{
                    background: "var(--muted)",
                    borderRadius: "var(--radius-sm)",
                    borderColor: "var(--border)",
                    borderTopWidth: "3px",
                    borderTopColor: sevColor(card.severity),
                  }}
                >
                  <button
                    onClick={() => removeEvidenceCard(card.id)}
                    className="absolute top-3 right-3 font-mono text-xs opacity-0 group-hover:opacity-100"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {card.code}
                    </span>
                    <Badge
                      color={
                        card.severity === "Critical" ? "red"
                        : card.severity === "High" ? "yellow"
                        : card.severity === "Medium" ? "blue"
                        : "green"
                      }
                    >
                      {card.severity}
                    </Badge>
                    <Badge color="purple">{card.domain}</Badge>
                  </div>
                  <p className="font-mono text-sm mb-2" style={{ color: "var(--foreground)" }}>
                    {card.title}
                  </p>
                  <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    {card.finding}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Source: {card.source}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {card.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {count >= 12 && (
          <div
            className="p-4 border font-mono text-sm flex items-center gap-3"
            style={{
              background: "rgba(34,197,94,0.05)",
              borderColor: "rgba(34,197,94,0.3)",
              color: "#22c55e",
              borderRadius: "var(--radius)",
            }}
          >
            ✓ Evidence card minimum met — {count} cards on record. Report export is now unlocked.
          </div>
        )}
      </div>
    </div>
  );
}
