import React from "react";
import { SectionHeader, Card, Badge, MonoLabel, Divider } from "./ui";

const capabilities = [
  { name: "Web Browsing", level: "Full", desc: "Live internet access with search, read, and form interaction" },
  { name: "Code Execution", level: "Sandboxed", desc: "Python, JS, bash in isolated container with filesystem access" },
  { name: "Document Tools", level: "Full", desc: "PDF parsing, spreadsheet manipulation, document generation" },
  { name: "Enterprise Workspace", level: "Limited", desc: "Calendar, email drafting, file system navigation (read-write)" },
  { name: "Multimodal Input", level: "Full", desc: "Vision, audio transcription, image generation" },
  { name: "Long-Context Reasoning", level: "Extended", desc: "2M token context window, cross-document synthesis" },
  { name: "Tool Chaining", level: "Autonomous", desc: "Multi-step agentic tasks with minimal human oversight" },
  { name: "Memory Persistence", level: "Session", desc: "In-session memory with optional external retrieval store" },
];

const benchmarks = [
  { name: "MMLU-Pro", score: "84.7%", baseline: "GPT-4o 83.2%" },
  { name: "HumanEval+", score: "91.3%", baseline: "Claude 3.5 88.1%" },
  { name: "MATH-500", score: "87.2%", baseline: "Gemini Ultra 84.6%" },
  { name: "GPQA Diamond", score: "61.4%", baseline: "Human experts 65.0%" },
  { name: "Agentic SWE-Bench", score: "43.1%", baseline: "Best prior 38.7%" },
  { name: "CyberSecEval", score: "FLAGGED", baseline: "Threshold: <0.12" },
];

export function ModelProfile() {
  return (
    <div>
      <SectionHeader
        number="SECTION 02"
        title="Model Profile"
        subtitle="Aster-3 Frontier — Capability Specification & Known Characteristics"
      />

      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Model Family", value: "Aster-3 Frontier" },
            { label: "Architecture", value: "Dense Transformer, MoE Hybrid" },
            { label: "Parameters", value: "~700B (estimated)" },
            { label: "Context Window", value: "2,097,152 tokens" },
            { label: "Modalities", value: "Text, Vision, Audio, Code" },
            { label: "Training Cutoff", value: "Q1 2026" },
          ].map((item) => (
            <Card key={item.label}>
              <MonoLabel>{item.label}</MonoLabel>
              <p className="mt-1 font-mono text-sm" style={{ color: "var(--foreground)" }}>
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Capability Surface
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {capabilities.map((cap) => (
              <div
                key={cap.name}
                className="p-3 border border-border flex items-start gap-3"
                style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm" style={{ color: "var(--foreground)" }}>
                      {cap.name}
                    </span>
                    <Badge
                      color={
                        cap.level === "Full" || cap.level === "Autonomous" || cap.level === "Extended"
                          ? "yellow"
                          : cap.level === "Sandboxed" || cap.level === "Limited" || cap.level === "Session"
                          ? "blue"
                          : "default"
                      }
                    >
                      {cap.level}
                    </Badge>
                  </div>
                  <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Pre-Evaluation Benchmark Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Suite", "Aster-3 Score", "Nearest Baseline", "Status"].map((col) => (
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
                {benchmarks.map((b, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 pr-6" style={{ color: "var(--foreground)" }}>{b.name}</td>
                    <td className="py-3 pr-6" style={{ color: b.score === "FLAGGED" ? "#ef4444" : "#22c55e" }}>
                      {b.score}
                    </td>
                    <td className="py-3 pr-6" style={{ color: "var(--muted-foreground)" }}>{b.baseline}</td>
                    <td className="py-3">
                      {b.score === "FLAGGED" ? (
                        <Badge color="red">Requires Investigation</Badge>
                      ) : (
                        <Badge color="green">Nominal</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Divider />

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Known Concerns from Internal Red-Team (Pre-Release)
          </h3>
          <div className="space-y-3">
            {[
              {
                code: "CONCERN-001",
                desc: "Demonstrated uplift on bioweapon synthesis queries in unconstrained prompting scenarios",
                severity: "Critical",
              },
              {
                code: "CONCERN-002",
                desc: "Tool-chaining exploits: achieves persistent file system access beyond intended scope",
                severity: "High",
              },
              {
                code: "CONCERN-003",
                desc: "Alignment to stated values degrades under extended multi-turn jailbreak sequences",
                severity: "High",
              },
              {
                code: "CONCERN-004",
                desc: "Code execution sandbox escape demonstrated in 2 of 50 trials",
                severity: "Critical",
              },
              {
                code: "CONCERN-005",
                desc: "Persuasion capability: measurable influence on human decision-making in controlled tests",
                severity: "Medium",
              },
            ].map((c) => (
              <div
                key={c.code}
                className="flex items-start gap-4 p-3 border border-border"
                style={{
                  background: c.severity === "Critical" ? "rgba(239,68,68,0.05)" : "var(--muted)",
                  borderColor: c.severity === "Critical" ? "rgba(239,68,68,0.2)" : "var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span
                  className="font-mono text-xs shrink-0 mt-0.5"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {c.code}
                </span>
                <span className="font-mono text-sm flex-1" style={{ color: "var(--foreground)" }}>
                  {c.desc}
                </span>
                <Badge color={c.severity === "Critical" ? "red" : c.severity === "High" ? "yellow" : "blue"}>
                  {c.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
