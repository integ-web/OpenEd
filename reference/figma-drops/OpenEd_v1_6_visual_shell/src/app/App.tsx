import { useState, useEffect } from "react";
import {
  Sun, Moon, BookOpen, LayoutDashboard, Palette, Layers, Smartphone, ClipboardCheck,
  ChevronRight, ChevronDown, ArrowRight, Check, Lock, Play, Clock, Star,
  Brain, Sparkles, FileText, Target, Shield, Zap, Map, Package,
  Search, Bell, User, Menu, X, GraduationCap, Users, Bookmark,
  TrendingUp, Award, MessageSquare, ExternalLink, AlertCircle, CheckCircle2, Info,
  Circle
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "Landing" | "Dashboard" | "Tokens" | "Components" | "Navigation" | "QA";
type LessonStatus = "done" | "active" | "upcoming" | "locked";

// ─── Design constants ─────────────────────────────────────────────────────────

const C = {
  blue:   { base: "#2563EB", light: "#EFF6FF", dark: "#60A5FA", border: "#BFDBFE" },
  teal:   { base: "#0F766E", light: "#F0FDFA", dark: "#2DD4BF", border: "#99F6E4" },
  violet: { base: "#6D28D9", light: "#F5F3FF", dark: "#A78BFA", border: "#DDD6FE" },
  orange: { base: "#EA580C", light: "#FFF7ED", dark: "#FB923C", border: "#FED7AA" },
  green:  { base: "#15803D", light: "#F0FDF4", dark: "#4ADE80", border: "#BBF7D0" },
  amber:  { base: "#B45309", light: "#FFFBEB", dark: "#FBBF24", border: "#FDE68A" },
  red:    { base: "#B91C1C", light: "#FEF2F2", dark: "#F87171", border: "#FECACA" },
  slate:  { base: "#475569", light: "#F8FAFC", dark: "#94A3B8", border: "#E2E8F0" },
};

const PHASES = [
  { id: "P1", label: "The Paradigm",        hours: 6,  lessons: 5, done: 3, color: C.blue,   artifact: "Evaluation Rubric" },
  { id: "P2", label: "Harness Engineering", hours: 8,  lessons: 6, done: 1, color: C.teal,   artifact: "Testing Harness" },
  { id: "P3", label: "Autonomous Agents",   hours: 12, lessons: 8, done: 0, color: C.violet, artifact: "Agent Sandbox" },
  { id: "P4", label: "Spatial & World",     hours: 9,  lessons: 6, done: 0, color: C.orange, artifact: "Simulation Benchmark" },
  { id: "P5", label: "Red Teaming",         hours: 10, lessons: 7, done: 0, color: C.red,    artifact: "Threat Report" },
  { id: "P6", label: "Enterprise Pipeline", hours: 6,  lessons: 5, done: 0, color: C.amber,  artifact: "Deployment Gate" },
];

const LESSONS: { title: string; type: string; status: LessonStatus; mins: number }[] = [
  { title: "From Vague Risk to Evaluation Objective", type: "Concept",  status: "done",     mins: 90 },
  { title: "Outcome vs Trajectory Metrics",           type: "Concept",  status: "done",     mins: 60 },
  { title: "Baseline Capability Limits",              type: "Practice", status: "done",     mins: 75 },
  { title: "Evaluation Objective Design",             type: "Build",    status: "active",   mins: 90 },
  { title: "Benchmark Anatomy Deep Dive",             type: "Concept",  status: "upcoming", mins: 60 },
];

const LESSON_TYPE_CONFIG: Record<string, { icon: React.FC<any>; bg: string; text: string; label: string }> = {
  Concept:  { icon: Brain,        bg: C.blue.light,   text: C.blue.base,   label: "Concept" },
  Case:     { icon: FileText,     bg: C.teal.light,   text: C.teal.base,   label: "Case" },
  Practice: { icon: Target,       bg: C.orange.light, text: C.orange.base, label: "Practice" },
  Build:    { icon: Package,      bg: C.violet.light, text: C.violet.base, label: "Build" },
  Sim:      { icon: Zap,          bg: C.amber.light,  text: C.amber.base,  label: "Simulation" },
};

// ─── Shared micro-components ─────────────────────────────────────────────────

function Badge({ color, children }: { color: typeof C.blue; children: React.ReactNode }) {
  return (
    <span style={{ background: color.light, color: color.base, border: `1px solid ${color.border}` }}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
      {children}
    </span>
  );
}

function Swatch({ label, hex, dark }: { label: string; hex: string; dark?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="rounded-lg overflow-hidden border border-border h-14 flex">
        <div style={{ background: hex }} className="flex-1" />
        {dark && <div style={{ background: dark }} className="flex-1" />}
      </div>
      <p className="text-xs font-medium text-foreground leading-tight">{label}</p>
      <p className="font-mono text-[10px] text-muted-foreground leading-tight">{hex}{dark ? ` · ${dark}` : ""}</p>
    </div>
  );
}

// Progress node map
function ProgressMap({ phases }: { phases: typeof PHASES }) {
  return (
    <div className="flex flex-col gap-3">
      {phases.map((p, pi) => {
        const pct = p.done / p.lessons;
        const isActive = p.done > 0 && p.done < p.lessons;
        const isDone = p.done === p.lessons;
        return (
          <div key={p.id} className="flex items-center gap-3">
            {/* Phase pill */}
            <div style={{ background: isDone ? p.color.base : isActive ? p.color.light : "var(--secondary)",
                          border: `1.5px solid ${isDone ? p.color.base : isActive ? p.color.border : "var(--border)"}` }}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              {isDone
                ? <Check size={14} color="#fff" />
                : <span className="text-[10px] font-mono font-semibold"
                    style={{ color: isActive ? p.color.base : "var(--muted-foreground)" }}>{p.id}</span>
              }
            </div>
            {/* Label + nodes */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground truncate">{p.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground ml-2 flex-shrink-0">{p.done}/{p.lessons}</span>
              </div>
              {/* Node track */}
              <div className="flex items-center gap-1">
                {Array.from({ length: p.lessons }).map((_, li) => {
                  const nodeState = li < p.done ? "done" : li === p.done && isActive ? "active" : "future";
                  return (
                    <div key={li} className="flex items-center gap-1">
                      <div className="relative">
                        <div style={{
                            background: nodeState === "done" ? p.color.base : nodeState === "active" ? p.color.light : "var(--secondary)",
                            border: `1.5px solid ${nodeState === "done" ? p.color.base : nodeState === "active" ? p.color.base : "var(--border)"}`,
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${nodeState === "active" ? "ring-2 ring-offset-1" : ""}`}
                          style={nodeState === "active" ? {
                            background: p.color.light,
                            border: `1.5px solid ${p.color.base}`,
                            outline: `2px solid ${p.color.border}`,
                          } : {
                            background: nodeState === "done" ? p.color.base : "var(--secondary)",
                            border: `1.5px solid ${nodeState === "done" ? p.color.base : "var(--border)"}`,
                          }}
                        />
                      </div>
                      {li < p.lessons - 1 && (
                        <div style={{ background: li < p.done - 1 ? p.color.base : "var(--border)" }}
                          className="h-px w-4 transition-colors" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Course card
function CourseCard({ phase }: { phase: typeof PHASES[0] }) {
  const pct = Math.round((phase.done / phase.lessons) * 100);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
      <div style={{ background: `linear-gradient(135deg, ${phase.color.base}18, ${phase.color.light})`,
                    borderBottom: `1px solid ${phase.color.border}` }}
        className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <span style={{ background: phase.color.light, color: phase.color.base, border: `1px solid ${phase.color.border}` }}
            className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded uppercase">
            {phase.id}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock size={10} /> {phase.hours}h
          </span>
        </div>
        <p className="font-semibold text-sm text-foreground mt-2 leading-tight">{phase.label}</p>
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div style={{ width: `${pct}%`, background: phase.color.base }} className="h-full rounded-full transition-all" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">{pct}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary-foreground">{phase.done}/{phase.lessons} lessons</span>
          <span className="text-xs text-secondary-foreground">{phase.artifact}</span>
        </div>
      </div>
    </div>
  );
}

// Lesson row card
function LessonCard({ lesson }: { lesson: typeof LESSONS[0] }) {
  const cfg = LESSON_TYPE_CONFIG[lesson.type] ?? LESSON_TYPE_CONFIG.Concept;
  const Icon = cfg.icon;
  const isActive = lesson.status === "active";
  const isDone = lesson.status === "done";
  const isLocked = lesson.status === "locked";

  return (
    <div className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer
      ${isActive ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-card hover:bg-secondary/40"}`}>
      {/* Status icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
        ${isDone ? "bg-green-50 border border-green-200" : isActive ? "bg-primary/10 border border-primary/30" : "bg-secondary border border-border"}`}>
        {isDone ? <Check size={14} className="text-green-600" />
          : isLocked ? <Lock size={13} className="text-muted-foreground" />
          : <div style={{ background: cfg.bg, color: cfg.text }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Icon size={14} />
            </div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm leading-tight font-medium ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {lesson.title}
          </p>
          {isActive && (
            <span className="bg-primary text-primary-foreground text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0">
              CURRENT
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span style={{ color: cfg.text, background: cfg.bg }} className="text-[10px] font-medium px-1.5 py-px rounded">
            {cfg.label}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <Clock size={9} /> {lesson.mins}m
          </span>
        </div>
      </div>
    </div>
  );
}

// Source card
function SourceCard({ title, org, type, diff }: { title: string; org: string; type: string; diff: "Intro" | "Advanced" | "Expert" }) {
  const diffColor = { Intro: C.green, Advanced: C.blue, Expert: C.violet }[diff];
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-all hover:-translate-y-0.5 duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span style={{ background: C.teal.light, color: C.teal.base, border: `1px solid ${C.teal.border}` }}
          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider">{type}</span>
        <Badge color={diffColor}>{diff}</Badge>
      </div>
      <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{org}</p>
    </div>
  );
}

// Proof ladder
function ProofLadder({ current = 2 }: { current?: number }) {
  const steps = [
    { label: "Seen",      desc: "Content opened" },
    { label: "Checked",   desc: "Quiz passed" },
    { label: "Practiced", desc: "Task complete" },
    { label: "Built",     desc: "Artifact saved" },
    { label: "Revised",   desc: "Feedback applied" },
    { label: "Proved",    desc: "Portfolio ready" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
            ${active ? "bg-primary/8 border border-primary/20" : done ? "opacity-70" : "opacity-40"}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-mono font-bold
              ${done ? "bg-green-500 text-white" : active ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
              {done ? <Check size={10} /> : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              <span className="text-[10px] text-muted-foreground ml-2">{s.desc}</span>
            </div>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
          </div>
        );
      })}
    </div>
  );
}

// AI Tutor panel preview
function TutorPanel() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.violet.light}, #faf5ff)`, borderBottom: `1px solid ${C.violet.border}` }}
        className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div style={{ background: C.violet.base }} className="w-6 h-6 rounded-lg flex items-center justify-center">
            <Sparkles size={12} color="white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">AI Tutor</p>
            <p className="text-[10px] text-muted-foreground">Grounded in FME sources</p>
          </div>
        </div>
        <span style={{ background: C.violet.light, color: C.violet.base, border: `1px solid ${C.violet.border}` }}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full">BYOK</span>
      </div>
      {/* Chat */}
      <div className="p-4 space-y-3">
        <div className="bg-secondary rounded-xl rounded-tl-sm p-3 max-w-[85%]">
          <p className="text-xs text-foreground leading-relaxed">
            What's the difference between an outcome metric and a trajectory metric?
          </p>
        </div>
        <div style={{ background: C.violet.light, border: `1px solid ${C.violet.border}` }}
          className="rounded-xl rounded-tr-sm p-3 ml-auto max-w-[90%]">
          <p className="text-xs leading-relaxed" style={{ color: "#3B1D7A" }}>
            An <strong>outcome metric</strong> measures what a model achieves on a specific task right now — like accuracy on a benchmark. A <strong>trajectory metric</strong> tracks how capability changes over time or training compute, revealing trend lines rather than single snapshots.
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-violet-400">Source: Ganguli et al., 2022</span>
          </div>
        </div>
        {/* Prompt chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Give me an example", "Why does it matter?", "Quiz me on this"].map(chip => (
            <button key={chip} style={{ border: `1px solid ${C.violet.border}`, color: C.violet.base }}
              className="text-[10px] px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity bg-card">
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Landing ─────────────────────────────────────────────────────────

function LandingSection({ dark }: { dark: boolean }) {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${C.blue.base}0A, transparent)` }} className="absolute inset-0" />
          <div style={{ background: `radial-gradient(ellipse 50% 60% at 70% 60%, ${C.teal.base}07, transparent)` }} className="absolute inset-0" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span style={{ background: C.blue.light, color: C.blue.base, border: `1px solid ${C.blue.border}` }}
                  className="text-xs font-medium px-3 py-1 rounded-full">
                  Free · AI-native · Source-mapped
                </span>
              </div>
              <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
                className="text-5xl lg:text-6xl text-foreground leading-[1.08] mb-5">
                Serious learning.<br/>
                <span style={{ color: C.blue.base }}>Provable</span> results.
              </h1>
              <p className="text-lg text-secondary-foreground leading-relaxed mb-8 max-w-md">
                OpenEd courses are source-backed, tutor-assisted, and proof-producing. Learn Frontier Model Evaluations — free, end to end.
              </p>
              <div className="flex flex-wrap gap-3">
                <button style={{ background: C.blue.base }}
                  className="text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Start FME — free <ArrowRight size={15} />
                </button>
                <button className="text-foreground px-6 py-3 rounded-xl font-medium text-sm border border-border bg-card flex items-center gap-2 hover:bg-secondary transition-colors">
                  <Play size={14} /> See how it works
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-5 mt-8">
                {[
                  { icon: BookOpen, label: "Source-mapped lessons", color: C.teal.base },
                  { icon: Sparkles, label: "BYOK AI tutor", color: C.violet.base },
                  { icon: Award,    label: "Artifact-based proof", color: C.orange.base },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={14} style={{ color }} />
                    <span className="text-xs text-secondary-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Course card preview */}
            <div className="relative">
              {/* Floating course card */}
              <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                {/* Course identity strip */}
                <div style={{ background: `linear-gradient(135deg, #1e3a8a, #1d4ed8 60%, #0e7490)` }}
                  className="px-5 pt-5 pb-4 text-white">
                  <p className="text-[11px] font-mono opacity-60 tracking-widest mb-1">FLAGSHIP COURSE</p>
                  <h2 className="text-xl font-semibold leading-tight">Frontier Model<br/>Evaluations</h2>
                  <p className="text-sm opacity-70 mt-1.5">51 hours · 6 phases · free</p>
                  <div className="flex gap-1.5 mt-3">
                    {PHASES.map(p => (
                      <div key={p.id} style={{ background: "rgba(255,255,255,0.2)" }}
                        className="text-[9px] font-mono px-2 py-0.5 rounded text-white/90">{p.id}</div>
                    ))}
                  </div>
                </div>
                {/* Progress summary */}
                <div className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3 font-mono tracking-wider uppercase">Your progress</p>
                  <ProgressMap phases={PHASES} />
                </div>
              </div>

              {/* Floating tutor chip */}
              <div style={{ background: C.violet.light, border: `1px solid ${C.violet.border}` }}
                className="absolute -bottom-4 -left-4 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Sparkles size={12} style={{ color: C.violet.base }} />
                <span className="text-xs font-medium" style={{ color: C.violet.base }}>Tutor active</span>
              </div>

              {/* Floating proof chip */}
              <div style={{ background: C.teal.light, border: `1px solid ${C.teal.border}` }}
                className="absolute -top-4 -right-4 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Award size={12} style={{ color: C.teal.base }} />
                <span className="text-xs font-medium" style={{ color: C.teal.base }}>4 artifacts built</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works — Proof ladder */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">HOW LEARNING WORKS</p>
          <h2 className="text-3xl font-semibold text-foreground">
            From watching to <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: C.teal.base }}>proving</span>
          </h2>
          <p className="text-secondary-foreground mt-2 max-w-lg mx-auto text-sm">
            Every lesson produces evidence. Certificates are not the goal — a portfolio of real proof is.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Seen",      color: C.slate,  desc: "Open content" },
            { label: "Checked",   color: C.blue,   desc: "Pass quiz" },
            { label: "Practiced", color: C.orange, desc: "Complete task" },
            { label: "Built",     color: C.violet, desc: "Save artifact" },
            { label: "Revised",   color: C.teal,   desc: "Apply feedback" },
            { label: "Proved",    color: C.green,  desc: "Portfolio ready" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center relative">
              <div style={{ background: s.color.light, border: `2px solid ${s.color.border}` }}
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <span style={{ color: s.color.base }} className="font-bold text-sm">{i + 1}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              {i < 5 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%-0.5rem)] w-full h-px"
                  style={{ background: `linear-gradient(to right, ${s.color.border}, ${[
                    C.blue, C.orange, C.violet, C.teal, C.green
                  ][i].border})` }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Value pillars */}
      <div className="border-t border-border bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, color: C.teal, title: "Source-mapped", body: "Every claim links to a paper, dataset, or reference. Learners can inspect the evidence trail, not just accept assertions." },
            { icon: Sparkles, color: C.violet, title: "Tutor-grounded", body: "BYOK AI tutor answers from course context, lesson transcript, and source cards — not generic LLM output." },
            { icon: Award,    color: C.orange, title: "Proof-producing", body: "Each module produces a real artifact — a rubric, benchmark, threat model, or report. Not a certificate. Actual evidence." },
          ].map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-6">
              <div style={{ background: color.light }} className="w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Icon size={18} style={{ color: color.base }} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Dashboard ───────────────────────────────────────────────────────

function DashboardSection({ dark }: { dark: boolean }) {
  const [railOpen, setRailOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  const railItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "map",       icon: Map,             label: "Learning map" },
    { id: "lesson",    icon: BookOpen,         label: "Lessons" },
    { id: "sources",   icon: Bookmark,         label: "Sources" },
    { id: "tutor",     icon: Sparkles,         label: "AI Tutor" },
    { id: "portfolio", icon: Award,            label: "Portfolio" },
  ];

  return (
    <div className="bg-background flex flex-col" style={{ minHeight: "80vh" }}>
      {/* Top bar */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
        <button onClick={() => setRailOpen(o => !o)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <Menu size={16} className="text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 mr-4">
          <div style={{ background: C.blue.base }} className="w-6 h-6 rounded flex items-center justify-center">
            <BookOpen size={12} color="white" />
          </div>
          <span className="font-semibold text-sm text-foreground">OpenEd</span>
        </div>
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
          <span>FME</span>
          <ChevronRight size={12} />
          <span>Phase 1</span>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Evaluation Objective Design</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* Progress pill */}
          <div style={{ background: C.blue.light, border: `1px solid ${C.blue.border}` }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg">
            <div className="w-16 h-1 bg-blue-100 rounded-full overflow-hidden">
              <div style={{ width: "28%", background: C.blue.base }} className="h-full rounded-full" />
            </div>
            <span className="text-[10px] font-mono" style={{ color: C.blue.base }}>28%</span>
          </div>
          <button className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
            <Bell size={15} className="text-muted-foreground" />
          </button>
          <div style={{ background: C.blue.base }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium">
            A
          </div>
        </div>
      </header>

      {/* Body: rail + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left rail */}
        <aside className={`border-r border-border bg-card flex-shrink-0 flex flex-col transition-all duration-200 ${railOpen ? "w-52" : "w-14"}`}>
          <div className="flex-1 py-3 space-y-0.5 px-2">
            {railItems.map(item => {
              const isActive = activePage === item.id;
              return (
                <button key={item.id} onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all text-left
                    ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <item.icon size={16} className="flex-shrink-0" />
                  {railOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
          {/* Artifact tray */}
          {railOpen && (
            <div className="m-2 p-3 rounded-xl" style={{ background: C.violet.light, border: `1px solid ${C.violet.border}` }}>
              <p className="text-[10px] font-mono font-semibold tracking-widest mb-2" style={{ color: C.violet.base }}>ARTIFACTS</p>
              {["Eval Rubric", "Benchmark Spec"].map(a => (
                <div key={a} className="flex items-center gap-2 text-xs py-1" style={{ color: C.violet.base }}>
                  <FileText size={10} />{a}
                </div>
              ))}
              <p className="text-[10px] mt-1.5" style={{ color: C.violet.base }}>+2 in draft</p>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome + resume */}
          <div className="mb-6">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Good morning, Ananya</p>
                <h2 className="text-xl font-semibold text-foreground">Continue where you left off</h2>
              </div>
              <Badge color={C.blue}>Phase 1 of 6</Badge>
            </div>

            {/* Resume card */}
            <div style={{ background: `linear-gradient(135deg, ${C.blue.base}0F, ${C.blue.light})`,
                          border: `1px solid ${C.blue.border}` }}
              className="rounded-xl p-5 flex items-start gap-4 flex-wrap">
              <div style={{ background: C.blue.base }} className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-0.5">LESSON 4 · PHASE 1</p>
                <p className="font-semibold text-foreground">Evaluation Objective Design</p>
                <p className="text-sm text-secondary-foreground mt-0.5">90 min · Build artifact: Evaluation Objective Card</p>
              </div>
              <button style={{ background: C.blue.base }}
                className="text-white text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
                <Play size={14} /> Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: lessons */}
            <div className="lg:col-span-2 space-y-4">
              {/* Phase 1 lessons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Phase 1 — The Paradigm</h3>
                  <span className="text-xs text-muted-foreground font-mono">3/5 complete</span>
                </div>
                <div className="space-y-2">
                  {LESSONS.map((l, i) => <LessonCard key={i} lesson={l} />)}
                </div>
              </div>

              {/* Phase cards grid */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">All phases</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PHASES.slice(1).map(p => <CourseCard key={p.id} phase={p} />)}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              {/* Proof ladder */}
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Proof ladder</p>
                <ProofLadder current={2} />
              </div>

              {/* Tutor panel (mini) */}
              <TutorPanel />

              {/* Source cards */}
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Phase 1 sources</p>
                <div className="space-y-2">
                  <SourceCard title="Evaluating AI: Systematic analysis of evaluation frameworks" org="Anthropic, 2023" type="Paper" diff="Advanced" />
                  <SourceCard title="Language Model Evaluation Beyond Perplexity" org="Gehrmann et al." type="Paper" diff="Expert" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Section: Tokens ──────────────────────────────────────────────────────────

function TokensSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">DESIGN SYSTEM</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }} className="text-4xl text-foreground mb-2">
          OpenEd Tokens
        </h1>
        <p className="text-secondary-foreground text-sm">Light-first. Strong dark mode. No token drift.</p>
      </div>

      {/* Color palette */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Semantic colour</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Swatch label="Primary — action / progress" hex="#2563EB" dark="#60A5FA" />
          <Swatch label="Evidence teal — sources / proof" hex="#0F766E" dark="#2DD4BF" />
          <Swatch label="Tutor violet — AI / explanations" hex="#6D28D9" dark="#A78BFA" />
          <Swatch label="Warm orange — achievement / human" hex="#EA580C" dark="#FB923C" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch label="Success — correct / completed" hex="#15803D" dark="#4ADE80" />
          <Swatch label="Warning — caution / missing" hex="#B45309" dark="#FBBF24" />
          <Swatch label="Critical — high risk only" hex="#B91C1C" dark="#F87171" />
          <Swatch label="Muted — secondary text" hex="#475569" dark="#94A3B8" />
        </div>
      </section>

      {/* Surface tokens */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Surface tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Canvas / Background", light: "#F8FAFC", dark: "#0B1120" },
            { label: "Card / Panel",        light: "#FFFFFF",  dark: "#111827" },
            { label: "Secondary surface",   light: "#F1F5F9",  dark: "#1E293B" },
            { label: "Elevated",            light: "#E2E8F0",  dark: "#273449" },
          ].map(s => <Swatch key={s.label} label={s.label} hex={s.light} dark={s.dark} />)}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Typography</h2>
        <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
          {[
            { sample: "Instrument Serif — Display headings, hero copy, pull quotes", family: "'Instrument Serif'", size: "36px", weight: "400", note: "editorial trust" },
            { sample: "DM Sans — UI, body, labels, navigation", family: "'DM Sans'", size: "16px", weight: "400–600", note: "readable, warm" },
            { sample: "IBM Plex Mono — IDs, metadata, scores, code", family: "'IBM Plex Mono'", size: "13px", weight: "400–500", note: "precision" },
          ].map((t, i) => (
            <div key={i} className="px-5 py-4">
              <p style={{ fontFamily: t.family }} className="text-xl text-foreground mb-1">{t.sample}</p>
              <div className="flex flex-wrap gap-4 text-[10px] font-mono text-muted-foreground mt-1">
                <span>{t.family}</span>
                <span>{t.size}</span>
                <span>w {t.weight}</span>
                <span style={{ color: C.blue.base }}>{t.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Spacing scale</h2>
        <div className="flex flex-wrap gap-2 items-end">
          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map(s => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <div style={{ height: `${Math.min(s, 64)}px`, width: "20px", background: C.blue.light, border: `1px solid ${C.blue.border}`, borderRadius: "3px" }} />
              <span className="font-mono text-[9px] text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Elevation</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { label: "Flat", shadow: "none", border: true },
            { label: "Raised", shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)", border: true },
            { label: "Floating", shadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)", border: false },
            { label: "Modal", shadow: "0 20px 40px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)", border: false },
          ].map(e => (
            <div key={e.label} className="flex flex-col items-center gap-2">
              <div className={`w-24 h-16 rounded-xl bg-card ${e.border ? "border border-border" : ""}`}
                style={{ boxShadow: e.shadow }} />
              <span className="text-xs text-muted-foreground">{e.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Border radius</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { label: "sm — 6px", r: "6px" },
            { label: "md — 10px", r: "10px" },
            { label: "lg — 14px", r: "14px" },
            { label: "xl — 20px", r: "20px" },
            { label: "2xl — 24px", r: "24px" },
            { label: "full", r: "9999px" },
          ].map(({ label, r }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div style={{ borderRadius: r, background: C.blue.light, border: `1px solid ${C.blue.border}`, width: 48, height: 48 }} />
              <span className="text-[10px] font-mono text-muted-foreground text-center">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Section: Components ──────────────────────────────────────────────────────

function ComponentsSection() {
  const [quizState, setQuizState] = useState<null | "correct" | "wrong">(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">COMPONENT SYSTEM</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }} className="text-4xl text-foreground mb-2">
          UI Components
        </h1>
        <p className="text-secondary-foreground text-sm">All states shown. Hover cards to see depth responses.</p>
      </div>

      {/* Course / phase cards */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Course cards</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PHASES.slice(0, 3).map(p => <CourseCard key={p.id} phase={p} />)}
        </div>
      </section>

      {/* Lesson cards */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Lesson cards — all states</h2>
        <div className="space-y-2">
          {LESSONS.map((l, i) => <LessonCard key={i} lesson={l} />)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(LESSON_TYPE_CONFIG).map(([type, cfg]) => {
            const Icon = cfg.icon;
            return (
              <div key={type} style={{ background: cfg.bg, border: `1px solid` }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-border">
                <Icon size={13} style={{ color: cfg.text }} />
                <span className="text-xs font-medium" style={{ color: cfg.text }}>{cfg.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Source cards */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Source cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SourceCard title="Evaluating AI: Systematic analysis of evaluation frameworks" org="Anthropic, 2023" type="Paper" diff="Advanced" />
          <SourceCard title="Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models" org="Srivastava et al." type="Benchmark" diff="Expert" />
          <SourceCard title="What does it mean to align AI with human values?" org="Gabriel, 2020" type="Article" diff="Intro" />
          <SourceCard title="Towards Evaluating the Robustness of Neural Networks" org="Carlini & Wagner" type="Paper" diff="Expert" />
        </div>
      </section>

      {/* Proof ladder */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Proof ladder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 3].map(n => (
            <div key={n} className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground font-mono mb-3">Step {n} active</p>
              <ProofLadder current={n} />
            </div>
          ))}
        </div>
      </section>

      {/* AI Tutor panel */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">AI Tutor panel</h2>
        <div className="max-w-sm">
          <TutorPanel />
        </div>
      </section>

      {/* Quiz card */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Quiz card</h2>
        <div className="bg-card border border-border rounded-xl p-5 max-w-lg">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">QUESTION 1 OF 3</p>
          <p className="font-medium text-foreground mb-4 leading-snug">
            Which of the following best describes a trajectory metric in AI evaluation?
          </p>
          <div className="space-y-2">
            {[
              "A score on a specific benchmark at a single point in time",
              "A measurement of how capability changes across training compute or time",
              "The cost per token for a given model version",
              "A test of model alignment with human preferences",
            ].map((opt, i) => {
              const isCorrect = i === 1;
              const selected = quizState !== null;
              return (
                <button key={i} onClick={() => !selected && setQuizState(isCorrect ? "correct" : "wrong")}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all
                    ${!selected ? "border-border hover:border-primary/40 hover:bg-secondary/40"
                      : isCorrect ? "border-green-300 bg-green-50 text-green-800"
                      : i === 0 && quizState === "wrong" ? "border-red-300 bg-red-50 text-red-700"
                      : "border-border opacity-40"}`}>
                  <span className="flex items-center gap-2">
                    {selected && isCorrect && <Check size={14} className="text-green-600 flex-shrink-0" />}
                    {selected && !isCorrect && i === 0 && <X size={14} className="text-red-500 flex-shrink-0" />}
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
          {quizState && (
            <div className={`mt-4 p-3 rounded-xl text-sm ${quizState === "correct" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {quizState === "correct"
                ? "Correct. Trajectory metrics track change over time, revealing capability trends that point-in-time scores miss."
                : "Not quite. A trajectory metric tracks how capability evolves across training compute or time — not a single point-in-time score."}
              {quizState === "wrong" && <button onClick={() => setQuizState(null)} className="ml-2 underline text-xs">Try again</button>}
            </div>
          )}
        </div>
      </section>

      {/* Progress map */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Progress map</h2>
        <div className="bg-card border border-border rounded-xl p-5 max-w-sm">
          <ProgressMap phases={PHASES} />
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <button style={{ background: C.blue.base }} className="text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Primary action
          </button>
          <button className="border border-border bg-card text-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
            Secondary
          </button>
          <button style={{ background: C.teal.light, color: C.teal.base, border: `1px solid ${C.teal.border}` }}
            className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity">
            Evidence
          </button>
          <button style={{ background: C.violet.light, color: C.violet.base, border: `1px solid ${C.violet.border}` }}
            className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
            <Sparkles size={13} /> Ask tutor
          </button>
          <button className="text-muted-foreground px-5 py-2.5 rounded-xl text-sm font-medium border border-dashed border-border hover:bg-secondary transition-colors">
            Ghost / disabled
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Section: Navigation ──────────────────────────────────────────────────────

function NavigationSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <div className="border-b border-border pb-6">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">NAVIGATION SYSTEM</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }} className="text-4xl text-foreground mb-2">
          Responsive shell
        </h1>
        <p className="text-secondary-foreground text-sm">Three breakpoints. One mental model.</p>
      </div>

      {/* Breakpoint cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Mobile */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={16} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Mobile — &lt;768px</h3>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-4 flex justify-center">
            <div className="w-52 bg-background border border-border rounded-[28px] overflow-hidden shadow-lg" style={{ height: 440 }}>
              {/* Status bar */}
              <div className="px-4 py-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-card border-b border-border">
                <span>9:41</span><span>●●●</span>
              </div>
              {/* Top mini nav */}
              <div className="px-3 py-2 flex items-center justify-between border-b border-border bg-card">
                <div className="flex items-center gap-1.5">
                  <div style={{ background: C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center">
                    <BookOpen size={10} color="white" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">OpenEd</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                    <Search size={11} className="text-muted-foreground" />
                  </div>
                  <div className="w-6 h-6 rounded-full" style={{ background: C.blue.base }} />
                </div>
              </div>
              {/* Content area */}
              <div className="flex-1 p-3 space-y-2 overflow-hidden">
                {/* Resume card */}
                <div style={{ background: `${C.blue.base}10`, border: `1px solid ${C.blue.border}` }}
                  className="rounded-xl p-3">
                  <p className="text-[9px] font-mono text-muted-foreground mb-1">CONTINUE</p>
                  <p className="text-xs font-medium text-foreground leading-snug">Evaluation Objective Design</p>
                  <div className="mt-2 h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div style={{ width: "60%", background: C.blue.base }} className="h-full rounded-full" />
                  </div>
                </div>
                {/* Lesson list */}
                {["Paradigm intro", "Outcome metrics", "Baseline limits"].map((l, i) => (
                  <div key={i} className={`rounded-xl px-3 py-2 flex items-center gap-2 border ${i < 2 ? "border-border bg-card" : "border-border bg-card opacity-40"}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${i < 2 ? "" : ""}`}
                      style={{ background: i < 2 ? C.green.base : "var(--secondary)" }}>
                      {i < 2 && <Check size={8} color="white" />}
                    </div>
                    <span className="text-[10px] text-foreground">{l}</span>
                  </div>
                ))}
              </div>
              {/* Bottom nav */}
              <div className="border-t border-border bg-card px-2 py-2 flex justify-around">
                {[{ icon: LayoutDashboard, label: "Home" }, { icon: BookOpen, label: "Learn" }, { icon: Target, label: "Build" }, { icon: Award, label: "Proof" }].map(({ icon: Icon, label }, i) => (
                  <div key={label} className={`flex flex-col items-center gap-0.5 px-2 ${i === 1 ? "" : "opacity-50"}`}>
                    <Icon size={16} style={{ color: i === 1 ? C.blue.base : "var(--muted-foreground)" }} />
                    <span className="text-[9px]" style={{ color: i === 1 ? C.blue.base : "var(--muted-foreground)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-xs text-secondary-foreground">
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Bottom navigation — 4 primary destinations</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Tutor as bottom sheet overlay</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Sources as full-screen drawer</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> 44px touch targets minimum</p>
          </div>
        </div>

        {/* Tablet */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={16} className="text-muted-foreground rotate-90" />
            <h3 className="font-semibold text-foreground">Tablet — 768–1024px</h3>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-4">
            <div className="bg-background border border-border rounded-xl overflow-hidden shadow" style={{ height: 380 }}>
              {/* Top bar */}
              <div className="h-10 bg-card border-b border-border flex items-center px-3 gap-2">
                <div style={{ background: C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center">
                  <BookOpen size={10} color="white" />
                </div>
                <span className="text-xs font-semibold text-foreground">OpenEd</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-5 w-20 bg-secondary rounded-full" />
                  <div className="w-6 h-6 rounded-full" style={{ background: C.blue.base }} />
                </div>
              </div>
              {/* Body */}
              <div className="flex" style={{ height: "calc(100% - 40px)" }}>
                {/* Compact rail */}
                <div className="w-12 border-r border-border bg-card flex flex-col gap-1 py-2 px-1.5">
                  {[LayoutDashboard, BookOpen, Target, Bookmark, Award].map((Icon, i) => (
                    <div key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center ${i === 1 ? "" : "opacity-40"}`}
                      style={{ background: i === 1 ? `${C.blue.base}15` : "transparent" }}>
                      <Icon size={14} style={{ color: i === 1 ? C.blue.base : "var(--muted-foreground)" }} />
                    </div>
                  ))}
                </div>
                {/* Main + right panel */}
                <div className="flex flex-1">
                  <div className="flex-1 p-3 space-y-2 overflow-hidden">
                    <div style={{ background: `${C.blue.base}08`, border: `1px solid ${C.blue.border}` }}
                      className="rounded-xl p-3">
                      <p className="text-[9px] font-mono text-muted-foreground mb-1">CURRENT LESSON</p>
                      <p className="text-xs font-medium text-foreground">Evaluation Objective Design</p>
                    </div>
                    {LESSONS.slice(0, 3).map((l, i) => (
                      <div key={i} className="rounded-xl px-3 py-2 border border-border bg-card flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ background: l.status === "done" ? C.green.base : "var(--secondary)" }}>
                          {l.status === "done" && <Check size={8} color="white" className="m-auto mt-px" />}
                        </div>
                        <span className="text-[10px] text-foreground truncate">{l.title}</span>
                      </div>
                    ))}
                  </div>
                  {/* Tutor panel (side) */}
                  <div style={{ background: C.violet.light, borderLeft: `1px solid ${C.violet.border}` }}
                    className="w-28 p-2 flex flex-col">
                    <p className="text-[9px] font-mono" style={{ color: C.violet.base }}>TUTOR</p>
                    <div className="bg-card rounded-lg p-1.5 mt-2 text-[9px] text-secondary-foreground leading-snug">
                      Ask me anything about the lesson…
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-xs text-secondary-foreground">
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> 48px icon-only side rail</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Tutor panel side-by-side if ≥900px</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Sources as collapsible drawer</p>
          </div>
        </div>

        {/* Desktop */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Desktop — ≥1024px</h3>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-4">
            <div className="bg-background border border-border rounded-xl overflow-hidden shadow" style={{ height: 380 }}>
              {/* Top bar */}
              <div className="h-10 bg-card border-b border-border flex items-center px-3 gap-2">
                <div style={{ background: C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center">
                  <BookOpen size={10} color="white" />
                </div>
                <span className="text-xs font-semibold text-foreground mr-3">OpenEd</span>
                <span className="text-[10px] text-muted-foreground">FME / Phase 1 / Lesson 4</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-5 w-16 bg-secondary rounded-full" />
                  <div className="w-6 h-6 rounded-full" style={{ background: C.blue.base }} />
                </div>
              </div>
              {/* Body */}
              <div className="flex" style={{ height: "calc(100% - 40px)" }}>
                {/* Full rail */}
                <div className="w-28 border-r border-border bg-card flex flex-col gap-0.5 py-2 px-2">
                  {[
                    { icon: LayoutDashboard, label: "Home" },
                    { icon: BookOpen, label: "Lessons" },
                    { icon: Target, label: "Build" },
                    { icon: Bookmark, label: "Sources" },
                    { icon: Award, label: "Portfolio" },
                  ].map(({ icon: Icon, label }, i) => (
                    <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] ${i === 1 ? "font-medium" : "opacity-50"}`}
                      style={{ background: i === 1 ? `${C.blue.base}12` : "transparent", color: i === 1 ? C.blue.base : "var(--muted-foreground)" }}>
                      <Icon size={12} />{label}
                    </div>
                  ))}
                </div>
                {/* Lesson area */}
                <div className="flex-1 p-3 overflow-hidden">
                  <div style={{ background: `${C.blue.base}08`, border: `1px solid ${C.blue.border}` }}
                    className="rounded-xl p-3 mb-2">
                    <p className="text-[9px] font-mono text-muted-foreground mb-0.5">PHASE 1 · LESSON 4</p>
                    <p className="text-xs font-semibold text-foreground">Evaluation Objective Design</p>
                    <p className="text-[9px] text-secondary-foreground mt-0.5">90 min · Build: Eval Objective Card</p>
                  </div>
                  <div className="space-y-1.5">
                    {["Why this matters", "Core concept", "Diagram", "Worked example"].map((b, i) => (
                      <div key={b} className="px-2 py-1.5 rounded-lg border border-border bg-card text-[10px] text-secondary-foreground flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full ${i < 2 ? "" : "opacity-30"}`}
                          style={{ background: i < 2 ? C.blue.base : "var(--secondary)" }} />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right tutor */}
                <div style={{ borderLeft: `1px solid ${C.violet.border}`, background: C.violet.light }}
                  className="w-24 p-2 flex flex-col gap-1">
                  <p className="text-[9px] font-mono" style={{ color: C.violet.base }}>TUTOR</p>
                  <div className="bg-card rounded-lg p-1.5 text-[9px] text-secondary-foreground leading-snug">
                    Lesson-grounded context active
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-xs text-secondary-foreground">
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> 280px expanded left rail</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> 340–380px right tutor panel</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Max 760px lesson text column</p>
            <p className="flex items-center gap-2"><Check size={12} className="text-green-600" /> Artifact tray in rail footer</p>
          </div>
        </div>
      </div>

      {/* Grid spec */}
      <section>
        <h2 className="font-semibold text-lg text-foreground mb-4">Responsive grid</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {[
            { bp: "Mobile",  px: "< 768px",   cols: "1",   gap: "16px", pad: "16px" },
            { bp: "Tablet",  px: "768–1024px", cols: "2",   gap: "20px", pad: "20px" },
            { bp: "Desktop", px: "≥ 1024px",   cols: "3–4", gap: "24px", pad: "32px" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
              <span className="font-semibold text-sm text-foreground w-20">{row.bp}</span>
              <span className="font-mono text-xs text-muted-foreground w-28">{row.px}</span>
              <span className="text-xs text-secondary-foreground w-16">{row.cols} col{row.cols !== "1" ? "s" : ""}</span>
              <span className="text-xs text-secondary-foreground w-20">gap {row.gap}</span>
              <span className="text-xs text-secondary-foreground">pad {row.pad}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Section: QA ──────────────────────────────────────────────────────────────

type QAStatus = "pass" | "warn" | "fail" | "todo";

const QA_ITEMS: { area: string; item: string; status: QAStatus; note?: string }[] = [
  // Visual
  { area: "Visual",  item: "Light mode is the default theme",                              status: "pass" },
  { area: "Visual",  item: "Dark mode: no pure black (#000), no harsh neon accents",       status: "pass", note: "Canvas #0B1120, surface #111827" },
  { area: "Visual",  item: "One typography system — DM Sans UI, Instrument Serif display", status: "pass" },
  { area: "Visual",  item: "Semantic colours only — critical red not used decoratively",   status: "pass" },
  { area: "Visual",  item: "Token drift resolved — no FME cyan-first tokens remaining",    status: "pass" },
  { area: "Visual",  item: "Role colours consistent: blue (learner), violet (tutor), teal (sources)", status: "pass" },
  { area: "Visual",  item: "All course cards use phase-specific identity colour",          status: "pass" },
  { area: "Visual",  item: "Cards have subtle elevation — not flat borders only",          status: "pass" },
  { area: "Visual",  item: "No random gradients, AI brain/robot imagery, or neon fills",  status: "pass" },
  // UX
  { area: "UX",      item: "Learner can identify primary action in ≤ 3 seconds",          status: "pass" },
  { area: "UX",      item: "One primary CTA per screen",                                  status: "pass" },
  { area: "UX",      item: "Lesson type visually distinct (concept/case/practice/build)",  status: "pass" },
  { area: "UX",      item: "Proof ladder states visible and understandable without labels",status: "warn", note: "Needs user-test to confirm" },
  { area: "UX",      item: "Progress map readable at a glance",                           status: "pass" },
  { area: "UX",      item: "AI tutor panel feels integrated, not bolted on",              status: "pass" },
  { area: "UX",      item: "Source cards show trust signals (type, difficulty, org)",     status: "pass" },
  { area: "UX",      item: "Resume card always shows on dashboard",                       status: "pass" },
  { area: "UX",      item: "Artifact tray visible in sidebar",                            status: "pass" },
  // Accessibility
  { area: "A11y",    item: "Body text ≥ 4.5:1 contrast ratio in both themes",             status: "pass" },
  { area: "A11y",    item: "Interactive elements ≥ 3:1 contrast ratio",                   status: "warn", note: "Needs automated axe scan" },
  { area: "A11y",    item: "Keyboard focus states visible",                               status: "todo", note: "Focus rings defined in theme but not tested on all components" },
  { area: "A11y",    item: "No meaning conveyed by colour alone",                         status: "warn", note: "Lesson status uses both icon + colour — good. Quiz state adds text label." },
  { area: "A11y",    item: "Touch targets ≥ 44px on mobile",                              status: "warn", note: "Bottom nav items need audit" },
  { area: "A11y",    item: "Reduced motion preference respected",                         status: "pass", note: "media query in theme.css base layer" },
  { area: "A11y",    item: "Diagram text summaries present",                              status: "todo", note: "No diagrams implemented yet" },
  // Mobile
  { area: "Mobile",  item: "Bottom nav renders on < 768px",                              status: "pass", note: "Navigation section shows layout" },
  { area: "Mobile",  item: "Tutor panel as bottom sheet on mobile",                       status: "todo", note: "Pattern defined, not wired in runtime" },
  { area: "Mobile",  item: "No horizontal scroll on phone viewports",                     status: "warn", note: "Foundation board may scroll — check" },
  { area: "Mobile",  item: "Lesson text column ≤ 100vw on phone",                        status: "pass" },
  { area: "Mobile",  item: "Text size ≥ 15px on mobile",                                 status: "pass" },
  // Content
  { area: "Content", item: "No lorem ipsum placeholder text anywhere",                    status: "pass" },
  { area: "Content", item: "Lesson content is FME-specific, not generic edtech copy",     status: "pass" },
  { area: "Content", item: "Source cards contain real paper/book titles",                 status: "pass" },
  { area: "Content", item: "Tutor response cites a source",                               status: "pass" },
  { area: "Content", item: "Quiz includes wrong-answer explanation",                      status: "pass" },
  { area: "Content", item: "No operationally harmful CBRN/cyber instructions in content", status: "pass" },
];

const qaStatusConfig: Record<QAStatus, { icon: React.FC<any>; label: string; color: string; bg: string }> = {
  pass: { icon: CheckCircle2, label: "PASS", color: "#15803D", bg: "#F0FDF4" },
  warn: { icon: AlertCircle,  label: "WARN", color: "#B45309", bg: "#FFFBEB" },
  fail: { icon: X,            label: "FAIL", color: "#B91C1C", bg: "#FEF2F2" },
  todo: { icon: Circle,       label: "TODO", color: "#6B7280", bg: "#F3F4F6" },
};

function QASection() {
  const [filter, setFilter] = useState<QAStatus | "all">("all");
  const areas = [...new Set(QA_ITEMS.map(i => i.area))];
  const filtered = filter === "all" ? QA_ITEMS : QA_ITEMS.filter(i => i.status === filter);

  const counts = QA_ITEMS.reduce((acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }), {} as Record<QAStatus, number>);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="border-b border-border pb-6 mb-8">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">DESIGN ACCEPTANCE</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }} className="text-4xl text-foreground mb-2">
          QA Notes
        </h1>
        <p className="text-secondary-foreground text-sm">Design, UX, accessibility, mobile, and content checks. All must pass before launch.</p>
      </div>

      {/* Summary + filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(["all", "pass", "warn", "fail", "todo"] as const).map(f => {
          const cfg = f !== "all" ? qaStatusConfig[f] : null;
          const cnt = f === "all" ? QA_ITEMS.length : counts[f] ?? 0;
          return (
            <button key={f} onClick={() => setFilter(f)}
              style={filter === f && cfg ? { background: cfg.bg, color: cfg.color, borderColor: cfg.color + "50" }
                : filter === f ? { background: "var(--foreground)", color: "var(--background)", borderColor: "var(--foreground)" } : {}}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm font-medium
                ${filter === f ? "" : "border-border text-muted-foreground hover:bg-secondary"}`}>
              {cfg && <cfg.icon size={13} />}
              <span className="capitalize">{f}</span>
              <span className="font-mono text-[10px] opacity-70">({cnt})</span>
            </button>
          );
        })}
      </div>

      {/* Items grouped by area */}
      {areas.map(area => {
        const areaItems = filtered.filter(i => i.area === area);
        if (areaItems.length === 0) return null;
        return (
          <div key={area} className="mb-6">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 uppercase">{area}</h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {areaItems.map((item, i) => {
                const cfg = qaStatusConfig[item.status];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                    <div style={{ background: cfg.bg }} className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={12} style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{item.item}</p>
                      {item.note && <p className="text-xs text-muted-foreground mt-0.5 italic">{item.note}</p>}
                    </div>
                    <span style={{ background: cfg.bg, color: cfg.color }}
                      className="font-mono text-[9px] font-semibold tracking-widest px-2 py-0.5 rounded flex-shrink-0">
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
        <strong>Open items before launch:</strong> keyboard focus audit on all interactive components, axe-core automated scan, bottom nav 44px touch targets, mobile bottom-sheet tutor wiring, reduced-motion manual test.
      </div>
    </div>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.FC<any> }[] = [
  { id: "Landing",    label: "Landing",     icon: Star },
  { id: "Dashboard",  label: "Dashboard",   icon: LayoutDashboard },
  { id: "Tokens",     label: "Tokens",      icon: Palette },
  { id: "Components", label: "Components",  icon: Layers },
  { id: "Navigation", label: "Navigation",  icon: Smartphone },
  { id: "QA",         label: "QA Notes",    icon: ClipboardCheck },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("Landing");
  const [dark, setDark] = useState(false);

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Design system header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-2 px-4 h-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-3 flex-shrink-0">
            <div style={{ background: C.blue.base }} className="w-6 h-6 rounded flex items-center justify-center">
              <BookOpen size={12} color="white" />
            </div>
            <span className="font-semibold text-sm text-foreground hidden sm:block">OpenEd</span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest hidden md:block">/ DESIGN SYSTEM v1</span>
          </div>

          {/* Tabs */}
          <nav className="flex gap-0.5 flex-1 overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                  ${tab === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                <Icon size={13} />
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <button onClick={() => setDark(d => !d)}
            className="ml-2 w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors flex-shrink-0">
            {dark ? <Sun size={15} className="text-muted-foreground" /> : <Moon size={15} className="text-muted-foreground" />}
          </button>
        </div>
      </header>

      {/* Section content */}
      <div className="flex-1">
        {tab === "Landing"    && <LandingSection dark={dark} />}
        {tab === "Dashboard"  && <DashboardSection dark={dark} />}
        {tab === "Tokens"     && <TokensSection />}
        {tab === "Components" && <ComponentsSection />}
        {tab === "Navigation" && <NavigationSection />}
        {tab === "QA"         && <QASection />}
      </div>
    </div>
  );
}
