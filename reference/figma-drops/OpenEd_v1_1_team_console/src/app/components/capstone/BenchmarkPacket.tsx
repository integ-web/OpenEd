import React, { useState } from "react";
import { SectionHeader, Card, Btn, FieldLabel, TextInput, Select, MonoLabel } from "./ui";
import { useCapstone, Benchmark } from "./CapstoneContext";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SUITES = [
  "MMLU-Pro", "HumanEval+", "MATH-500", "GPQA Diamond",
  "SWE-Bench", "CyberSecEval", "BioHazard-200", "TruthfulQA",
  "WinoBias", "BOLD", "Persuasion-Bench", "AgentBench",
  "Custom Red-Team Suite", "Internal Safety Eval",
];

export function BenchmarkPacket() {
  const { state, addBenchmark, removeBenchmark } = useCapstone();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Benchmark & { baselineNum: string; scoreNum: string }>>({
    suite: "", metric: "", flag: "yellow", baselineNum: "", scoreNum: "",
  });

  const handleAdd = () => {
    if (!form.suite || !form.metric || !form.scoreNum) return;
    const scoreVal = parseFloat(form.scoreNum || "0");
    const baseVal = parseFloat(form.baselineNum || "0");
    const delta = baseVal ? ((scoreVal - baseVal) / baseVal * 100).toFixed(1) + "%" : "N/A";
    addBenchmark({
      id: `bench-${Date.now()}`,
      suite: form.suite!,
      metric: form.metric!,
      score: scoreVal,
      baseline: baseVal,
      delta,
      flag: form.flag as Benchmark["flag"],
    });
    setForm({ suite: "", metric: "", flag: "yellow", baselineNum: "", scoreNum: "" });
    setShowForm(false);
  };

  const radarData = state.benchmarkPacket.slice(0, 6).map((b) => ({
    subject: b.suite.split(" ")[0],
    score: b.score,
    baseline: b.baseline,
  }));

  const barData = state.benchmarkPacket.map((b) => ({
    name: b.suite.length > 12 ? b.suite.slice(0, 12) + "…" : b.suite,
    score: b.score,
    baseline: b.baseline,
  }));

  const flagColor = (f: Benchmark["flag"]) =>
    f === "green" ? "#22c55e" : f === "yellow" ? "#f59e0b" : "#ef4444";

  return (
    <div>
      <SectionHeader
        number="SECTION 06"
        title="Benchmark Packet Builder"
        subtitle="Compile performance metrics with comparative baselines and flag anomalies"
      />

      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <MonoLabel>Total Benchmarks</MonoLabel>
            <p className="font-mono mt-1" style={{ fontSize: "2rem", color: "var(--primary)" }}>
              {state.benchmarkPacket.length}
            </p>
          </Card>
          {(["green", "yellow", "red"] as const).map((flag) => {
            const n = state.benchmarkPacket.filter((b) => b.flag === flag).length;
            return (
              <Card key={flag}>
                <MonoLabel>{flag === "green" ? "Clear" : flag === "yellow" ? "Caution" : "Flagged"}</MonoLabel>
                <p className="font-mono mt-1" style={{ fontSize: "2rem", color: flagColor(flag) }}>
                  {n}
                </p>
              </Card>
            );
          })}
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Benchmark Register</h3>
            <Btn size="sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Add Benchmark"}
            </Btn>
          </div>

          {showForm && (
            <div className="mb-6 p-4 border border-border" style={{ background: "var(--muted)", borderRadius: "var(--radius)" }}>
              <h4 className="font-mono text-sm mb-4" style={{ color: "var(--primary)" }}>NEW BENCHMARK ENTRY</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel>Benchmark Suite</FieldLabel>
                  <Select
                    value={form.suite || ""}
                    onChange={(v) => setForm((f) => ({ ...f, suite: v }))}
                    options={SUITES.map((s) => ({ value: s, label: s }))}
                    placeholder="Select suite..."
                  />
                </div>
                <div>
                  <FieldLabel>Primary Metric</FieldLabel>
                  <TextInput
                    value={form.metric || ""}
                    onChange={(v) => setForm((f) => ({ ...f, metric: v }))}
                    placeholder="e.g., Accuracy %, Pass Rate, Score"
                  />
                </div>
                <div>
                  <FieldLabel>Aster-3 Score</FieldLabel>
                  <TextInput
                    value={form.scoreNum || ""}
                    onChange={(v) => setForm((f) => ({ ...f, scoreNum: v }))}
                    placeholder="e.g., 87.4"
                  />
                </div>
                <div>
                  <FieldLabel>Baseline Score</FieldLabel>
                  <TextInput
                    value={form.baselineNum || ""}
                    onChange={(v) => setForm((f) => ({ ...f, baselineNum: v }))}
                    placeholder="e.g., 82.1"
                  />
                </div>
                <div>
                  <FieldLabel>Risk Flag</FieldLabel>
                  <Select
                    value={form.flag || "yellow"}
                    onChange={(v) => setForm((f) => ({ ...f, flag: v as Benchmark["flag"] }))}
                    options={[
                      { value: "green", label: "Green — No concern" },
                      { value: "yellow", label: "Yellow — Monitor" },
                      { value: "red", label: "Red — Investigate" },
                    ]}
                  />
                </div>
              </div>
              <Btn onClick={handleAdd} disabled={!form.suite || !form.metric || !form.scoreNum}>
                Add to Packet
              </Btn>
            </div>
          )}

          {state.benchmarkPacket.length === 0 ? (
            <div className="text-center py-12 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              No benchmarks recorded. Add performance data to build the packet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Suite", "Metric", "Aster-3", "Baseline", "Delta", "Flag"].map((col) => (
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
                  {state.benchmarkPacket.map((b) => {
                    const deltaNum = parseFloat(b.delta);
                    return (
                      <tr key={b.id} className="border-b border-border last:border-0 group">
                        <td className="py-3 pr-4" style={{ color: "var(--foreground)" }}>{b.suite}</td>
                        <td className="py-3 pr-4" style={{ color: "var(--muted-foreground)" }}>{b.metric}</td>
                        <td className="py-3 pr-4" style={{ color: "var(--foreground)" }}>{b.score}</td>
                        <td className="py-3 pr-4" style={{ color: "var(--muted-foreground)" }}>{b.baseline || "—"}</td>
                        <td className="py-3 pr-4" style={{ color: !isNaN(deltaNum) ? (deltaNum >= 0 ? "#22c55e" : "#ef4444") : "var(--muted-foreground)" }}>
                          {b.delta !== "N/A" && !isNaN(deltaNum) ? (deltaNum >= 0 ? "+" : "") + b.delta : b.delta}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: flagColor(b.flag) }} />
                            <span style={{ color: flagColor(b.flag) }}>
                              {b.flag === "green" ? "Clear" : b.flag === "yellow" ? "Caution" : "Flagged"}
                            </span>
                            <button
                              onClick={() => removeBenchmark(b.id)}
                              className="ml-2 opacity-0 group-hover:opacity-100 font-mono text-xs"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {state.benchmarkPacket.length >= 2 && (
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Score Comparison</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "DM Mono, monospace" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "DM Mono, monospace" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "DM Mono, monospace",
                      fontSize: "12px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar dataKey="baseline" fill="rgba(255,255,255,0.1)" name="Baseline" />
                  <Bar dataKey="score" fill="var(--primary)" name="Aster-3" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {radarData.length >= 3 && (
              <Card>
                <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>Capability Radar</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "DM Mono, monospace" }}
                    />
                    <Radar name="Baseline" dataKey="baseline" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.05)" />
                    <Radar name="Aster-3" dataKey="score" stroke="var(--primary)" fill="rgba(245,158,11,0.15)" />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
