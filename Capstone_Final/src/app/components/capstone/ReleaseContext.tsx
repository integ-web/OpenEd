import React from "react";
import { SectionHeader, Card, Badge, MonoLabel, InfoBox } from "./ui";

export function ReleaseContext() {
  return (
    <div>
      <SectionHeader
        number="SECTION 03"
        title="Release Context"
        subtitle="Deployment Environment, Intended Users, and Stakeholder Landscape"
      />

      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              tier: "Research Partners",
              access: "Full API",
              users: "~200 institutions",
              oversight: "Quarterly audits",
              color: "#3b82f6",
            },
            {
              tier: "Enterprise",
              access: "Managed API + Workspace",
              users: "~50 organizations",
              oversight: "Usage monitoring",
              color: "#f59e0b",
            },
            {
              tier: "Government",
              access: "Air-gapped deployment",
              users: "7 agencies",
              oversight: "Full audit trail",
              color: "#a855f7",
            },
          ].map((t) => (
            <Card key={t.tier}>
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ background: t.color }}
              />
              <MonoLabel>Access Tier</MonoLabel>
              <p className="font-mono text-sm mb-3" style={{ color: "var(--foreground)" }}>
                {t.tier}
              </p>
              <div className="space-y-2">
                {[
                  { k: "Access Mode", v: t.access },
                  { k: "User Base", v: t.users },
                  { k: "Oversight", v: t.oversight },
                ].map(({ k, v }) => (
                  <div key={k}>
                    <MonoLabel>{k}</MonoLabel>
                    <p className="font-mono text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Deployment Environment Characteristics
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <MonoLabel>Enabled Capabilities at Release</MonoLabel>
              <ul className="mt-2 space-y-1">
                {[
                  "Web browsing (with logging)",
                  "Code execution (sandboxed)",
                  "Document tooling",
                  "Enterprise workspace (read-write)",
                  "API function calling",
                  "Multi-session memory (opt-in)",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2 font-mono text-sm">
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span style={{ color: "var(--muted-foreground)" }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <MonoLabel>Disabled / Restricted at Release</MonoLabel>
              <ul className="mt-2 space-y-1">
                {[
                  "Unrestricted internet write access",
                  "Financial transaction execution",
                  "Autonomous agent spawning",
                  "Cross-organization data access",
                  "External API credential storage",
                  "Hardware/IoT device control",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2 font-mono text-sm">
                    <span style={{ color: "#ef4444" }}>✗</span>
                    <span style={{ color: "var(--muted-foreground)" }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Regulatory & Compliance Landscape
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Framework", "Jurisdiction", "Applicability", "Status"].map((col) => (
                    <th
                      key={col}
                      className="text-left py-2 pr-6 text-xs tracking-widest uppercase"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "EU AI Act (High Risk)", jur: "European Union", apply: "Full", status: "Under review" },
                  { name: "EO 14110 Safeguards", jur: "United States", apply: "Partial", status: "In compliance" },
                  { name: "NIST AI RMF 1.0", jur: "United States", apply: "Full", status: "Adopted" },
                  { name: "UK AISI Standards", jur: "United Kingdom", apply: "Full", status: "Under review" },
                  { name: "ISO/IEC 42001", jur: "International", apply: "Partial", status: "Certification pending" },
                  { name: "IAEA Dual-Use Guidance", jur: "International", apply: "Partial", status: "Advisory only" },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 pr-6" style={{ color: "var(--foreground)" }}>{r.name}</td>
                    <td className="py-3 pr-6" style={{ color: "var(--muted-foreground)" }}>{r.jur}</td>
                    <td className="py-3 pr-6">
                      <Badge color={r.apply === "Full" ? "yellow" : "blue"}>{r.apply}</Badge>
                    </td>
                    <td className="py-3">
                      <span
                        className="font-mono text-xs"
                        style={{
                          color:
                            r.status === "In compliance" || r.status === "Adopted"
                              ? "#22c55e"
                              : r.status === "Advisory only"
                              ? "var(--muted-foreground)"
                              : "#f59e0b",
                        }}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
              Stakeholder Interests
            </h3>
            <div className="space-y-3">
              {[
                { actor: "Safety Board", concern: "Risk containment, red-line enforcement" },
                { actor: "Legal", concern: "Liability exposure, regulatory posture" },
                { actor: "Research Partners", concern: "Capability access, publication rights" },
                { actor: "Government Clients", concern: "Security clearance, data isolation" },
                { actor: "Civil Society", concern: "Public accountability, misuse potential" },
              ].map((s) => (
                <div key={s.actor} className="flex items-start gap-3">
                  <span
                    className="font-mono text-xs shrink-0 mt-0.5 w-28"
                    style={{ color: "var(--primary)" }}
                  >
                    {s.actor}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {s.concern}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
              Relevant Precedents
            </h3>
            <div className="space-y-3">
              {[
                { model: "GPT-4 (2023)", decision: "Broad release with content filter", outcome: "Jailbreaks within 72h" },
                { model: "Gemini Ultra (2024)", decision: "Staged enterprise rollout", outcome: "No major incidents" },
                { model: "Claude 3 Opus", decision: "Research-first, then broad", outcome: "Incident-free first 90 days" },
                { model: "Aster-2 (prev. gen)", decision: "Trusted-access only", outcome: "2 misuse reports, both contained" },
              ].map((p) => (
                <div key={p.model} className="p-2 border border-border" style={{ borderRadius: "var(--radius-sm)" }}>
                  <p className="font-mono text-xs mb-1" style={{ color: "var(--foreground)" }}>{p.model}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {p.decision}
                  </p>
                  <p className="font-mono text-xs mt-1" style={{ color: "var(--primary)" }}>
                    ↳ {p.outcome}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <InfoBox>
          EVALUATOR NOTE: The release context shapes which risk domains are most salient. A government
          air-gapped deployment has different threat actors than a broad research API. Your threat model
          (Section 04) should account for the specific deployment environment described here.
        </InfoBox>
      </div>
    </div>
  );
}
