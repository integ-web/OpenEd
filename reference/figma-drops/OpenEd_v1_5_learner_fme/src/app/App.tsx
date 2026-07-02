import { useState, useRef, useEffect } from "react";
import {
  BookOpen, LayoutDashboard, Map, GraduationCap, Award, User,
  ChevronRight, ChevronDown, ArrowRight, ArrowLeft, Check, Lock, Play,
  Clock, Star, Sparkles, FileText, Target, Shield, Zap, Package,
  Search, Bell, Menu, X, Bookmark, MessageSquare, ExternalLink,
  AlertCircle, CheckCircle2, Info, Circle, Sun, Moon, Smartphone,
  Monitor, Tablet, Download, Share2, ThumbsUp, ThumbsDown, RefreshCw,
  Eye, Edit3, Send, Plus, Minus, ChevronLeft
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "preview"|"auth"|"onboard"|"library"|"dashboard"|"path"|"overview"|"lesson"|"artifact"|"progress"|"portfolio"|"certificate";
type Viewport = "mobile"|"tablet"|"desktop";
type AuthMode = "login"|"signup";
type LessonTab = "watch"|"understand"|"practice"|"build"|"sources";
type TutorState = "idle"|"loading"|"replied";

// ─── Design tokens (matching established system) ───────────────────────────────
const C = {
  blue:   { base:"#2563EB", light:"#EFF6FF", dark:"#60A5FA", border:"#BFDBFE", muted:"#DBEAFE" },
  teal:   { base:"#0F766E", light:"#F0FDFA", dark:"#2DD4BF", border:"#99F6E4", muted:"#CCFBF1" },
  violet: { base:"#6D28D9", light:"#F5F3FF", dark:"#A78BFA", border:"#DDD6FE", muted:"#EDE9FE" },
  orange: { base:"#EA580C", light:"#FFF7ED", dark:"#FB923C", border:"#FED7AA", muted:"#FFEDD5" },
  green:  { base:"#15803D", light:"#F0FDF4", dark:"#4ADE80", border:"#BBF7D0", muted:"#DCFCE7" },
  amber:  { base:"#B45309", light:"#FFFBEB", dark:"#FBBF24", border:"#FDE68A", muted:"#FEF3C7" },
  red:    { base:"#B91C1C", light:"#FEF2F2", dark:"#F87171", border:"#FECACA", muted:"#FEE2E2" },
  slate:  { base:"#475569", light:"#F8FAFC", dark:"#94A3B8", border:"#E2E8F0", muted:"#F1F5F9" },
};

// ─── Course data (real FME content) ───────────────────────────────────────────
const PHASES = [
  { id:"P1", title:"The Paradigm",         hours:6,  lessons:6, done:3, color:C.blue,   artifact:"Custom Evaluation Rubric",          promise:"Stop treating evaluation as a score. Start treating it as decision-grade measurement." },
  { id:"P2", title:"Harness Engineering",  hours:8,  lessons:6, done:0, color:C.teal,   artifact:"Automated Native Testing Harness",  promise:"Build runnable evaluation instruments instead of reading about tools." },
  { id:"P3", title:"Autonomous Agents",    hours:12, lessons:7, done:0, color:C.violet, artifact:"Agent Execution Sandbox",           promise:"Evaluate multi-turn tool use, state changes, and failure modes in agentic systems." },
  { id:"P4", title:"Spatial & World Models",hours:9, lessons:6, done:0, color:C.orange, artifact:"Physical Simulation Benchmark",     promise:"Evaluate object permanence, physical accuracy, and visual-spatial reasoning." },
  { id:"P5", title:"Red Teaming",          hours:10, lessons:7, done:0, color:C.red,    artifact:"Threat & Vulnerability Report",     promise:"Design systematic state-based attacks, multi-turn injection, and adversarial campaigns." },
  { id:"P6", title:"Enterprise Pipeline",  hours:6,  lessons:5, done:0, color:C.amber,  artifact:"Production-Ready Deployment Gate",  promise:"Measure TTFT, concurrency latency, drift, and cost-to-capability at scale." },
];

const P1_LESSONS = [
  { id:"P1.L1", title:"What Is Frontier Model Evaluation?",          mins:45, type:"Concept",  status:"done"     as const, artifact:"Evaluation Lifecycle Map" },
  { id:"P1.L2", title:"Model Types and Capability Surfaces",         mins:60, type:"Concept",  status:"done"     as const, artifact:"Model Capability Surface Map" },
  { id:"P1.L3", title:"Benchmark, Dataset, Task, Metric, Prompt",    mins:60, type:"Concept",  status:"done"     as const, artifact:"Evaluation Vocabulary Card" },
  { id:"P1.L4", title:"Outcome Metrics vs Trajectory Metrics",       mins:45, type:"Practice", status:"active"   as const, artifact:"Outcome-vs-Trajectory Rubric" },
  { id:"P1.L5", title:"Benchmarks, Saturation, and Goodhart's Law",  mins:75, type:"Case",     status:"upcoming" as const, artifact:"Goodhart Risk Checklist" },
  { id:"P1.L6", title:"From Vague Risk to Evaluation Objective",     mins:75, type:"Build",    status:"upcoming" as const, artifact:"Evaluation Objective Card" },
];

// Active lesson: P1.L4
const LESSON = {
  id:"P1.L4", phaseId:"P1", phaseTitle:"The Paradigm",
  title:"Outcome Metrics vs Trajectory Metrics",
  objective:"Explain when final-answer scores are insufficient and trajectory metrics are needed.",
  promise:"Learn to evaluate not only what the model answered, but how it got there.",
  mins:45, difficulty:"intermediate",
  artifact:"Outcome-vs-Trajectory Rubric",
  video:{ title:"Evaluation for Large Language Models and Generative AI — Deep Dive", provider:"YouTube", url:"https://www.youtube.com/watch?v=iQl03pQlYWY", label:"Reference video, not course-owned media" },
  transcript:`This lesson is about outcome and trajectory metrics. The practical evaluator's habit is to start with the decision, not the tool. A benchmark, judge prompt, or red-team campaign is only useful when it helps someone decide whether to release, restrict, investigate, or stop.\n\nIn this lesson, learners practice separating final result, intermediate steps, tool use, recovery behavior, and safety constraint handling. The workflow is concrete: name the claim, name the model access condition, name what counts as success or failure.\n\nThe common failure mode is scoring only the final answer when the path reveals risk or unreliability. A serious evaluator leaves behind a trace. Without that trace, evaluation collapses back into anecdote.\n\nA safe example: a browser agent returns a correct company summary after leaking private content into a tool call. The outcome passes; the trajectory safety fails. The decision this lesson supports: decide whether success should count when the path violates constraints.`,
  keyIdeas:[
    { title:"Outcome metrics", body:"Score the final answer or task completion. Fast and easy, but miss process-level risk." },
    { title:"Trajectory metrics", body:"Score intermediate reasoning, tool calls, state changes, and constraint handling along the path." },
    { title:"Hybrid evidence", body:"Serious agent evaluations need both: outcome for capability, trajectory for safety and reliability." },
  ],
  workedExample:{
    weak:"The agent completed the task, so it passed.",
    strong:"The agent completed the task but made two unauthorized tool calls. Outcome passed. Trajectory safety failed.",
    why:"The improved version keeps success and safety signals separate — essential when a correct final answer can mask an unsafe path.",
  },
  commonMistakes:[
    "Scoring only the final answer when the path reveals risk or unreliability",
    "Treating a single-shot benchmark score as equivalent to agentic task safety",
    "Completing the quiz without saving the artifact checkpoint",
  ],
  practice:{
    prompt:"A coding agent fixes a bug but modifies three unrelated files in the process.",
    task:"Classify what counts as outcome evidence and what counts as trajectory evidence. Then decide: does this agent pass?",
    strong:"Outcome: tests pass, bug fixed. Trajectory: unauthorized file edits, unexpected tool sequence, failed constraint check. Decision: outcome passes, trajectory fails safety gate.",
  },
  quiz:{
    question:"When are trajectory metrics most important?",
    options:[
      "Single static multiple-choice tasks",
      "Agent tasks with tools, memory, and environment feedback",
      "Counting words in a generated summary",
      "Manual reading with no tool use",
    ],
    correct:1,
    explanation:"Tools and state create process-level risks that final-answer metrics can miss. An agent that reaches the correct output via an unsafe path fails trajectory evaluation.",
    wrongFeedback:"Ask: does the model take actions in the world? If yes, the path matters as much as the result.",
  },
  artifactFields:[
    { label:"Outcome metric",     placeholder:"What final result are you measuring?",                      value:"" },
    { label:"Trajectory metric",  placeholder:"What intermediate steps, calls, or states matter?",        value:"" },
    { label:"Failure examples",   placeholder:"Give one example where outcome passes but trajectory fails.", value:"" },
    { label:"Risk relevance",     placeholder:"Why does the trajectory matter for this deployment?",       value:"" },
    { label:"Decision implication",placeholder:"What would a trajectory failure trigger?",                value:"" },
  ],
  sources:[
    { id:"S-015", title:"SWE-bench Verified", org:"SWE-bench", type:"Benchmark", diff:"Advanced", required:true,  url:"https://www.swebench.com/",    why:"Execution-based benchmark for real-world software issue resolution by coding agents." },
    { id:"S-016", title:"OSWorld",            org:"XLang Lab et al.", type:"Benchmark", diff:"Advanced", required:true,  url:"https://os-world.github.io/", why:"Real-computer environment for evaluating multimodal desktop agents." },
    { id:"S-018", title:"GAIA",               org:"Meta / HuggingFace", type:"Dataset", diff:"Advanced", required:true,  url:"https://huggingface.co/datasets/gaia-benchmark/GAIA", why:"General AI assistant benchmark requiring reasoning, tool use, and multi-step task completion." },
    { id:"S-019", title:"Measuring AI Ability to Complete Long Tasks", org:"METR", type:"Paper", diff:"Advanced", required:false, url:"https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/", why:"Introduces time-horizon framing for autonomous task completion capability." },
  ],
  tutorOpening:"Let's connect this lesson to the decision your evaluation will support. What deployment context are you evaluating?",
  promptChips:["Explain this simply","Give me a worked example","Quiz me","Help me fill the artifact","Connect to the capstone"],
};

// Tutor mock responses
const TUTOR_REPLIES: Record<string, string> = {
  "Explain this simply": "Think of it this way: **outcome** is whether the pizza arrived. **Trajectory** is whether the driver went through your neighbour's garden to get there. The final result can be good while the process was wrong — and for AI agents that take real-world actions, the path matters as much as the destination.",
  "Give me a worked example": "Imagine a coding agent asked to fix a login bug. **Outcome evidence**: the test suite passes. **Trajectory evidence**: it also deleted a password-reset function it wasn't asked to touch, made 14 API calls instead of 3, and silently overwrote an unrelated config. Outcome: pass. Trajectory: fail. A deployment decision based only on outcome would miss the safety problem.",
  "Quiz me": "Here's a question for you: An agent scores 91% on task completion. It also triggered 23% of runs with at least one unauthorised file write. Based on this lesson — should this agent pass evaluation? Why or why not?",
  "Help me fill the artifact": "For the **Outcome metric** field, name the final result you're measuring — e.g. 'task completed: yes/no' or 'test suite pass rate'. For **Trajectory metric**, think about: tool call sequence, state changes, constraint violations, recovery behavior. Start with what the agent *does*, not just what it *produces*.",
  "Connect to the capstone": "In your Aster-3 capstone dossier, this lesson feeds the evidence card section. When you submit an evidence card for a dangerous capability, you'll need both: the final-answer result *and* the trace of how the model got there. Trajectory evidence is what separates a safety evaluation from a benchmark leaderboard.",
};

// ─── Shared micro-components ─────────────────────────────────────────────────

function Badge({ color, children, small }: { color: typeof C.blue; children: React.ReactNode; small?: boolean }) {
  return (
    <span style={{ background:color.light, color:color.base, border:`1px solid ${color.border}` }}
      className={`inline-flex items-center rounded-full font-medium ${small ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-xs"}`}>
      {children}
    </span>
  );
}

function Pill({ label, color }: { label: string; color: typeof C.blue }) {
  return (
    <span style={{ background:color.light, color:color.base, border:`1px solid ${color.border}` }}
      className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded uppercase">
      {label}
    </span>
  );
}

function DiffBadge({ diff }: { diff: string }) {
  const col = diff === "Beginner" ? C.green : diff === "Intermediate" ? C.blue : diff === "Advanced" ? C.amber : C.red;
  return <Badge color={col}>{diff}</Badge>;
}

function ProofStep({ label, desc, state }: { label: string; desc: string; state: "done"|"active"|"locked" }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${state==="active"?"bg-primary/8 border border-primary/20":""}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold
        ${state==="done"?"bg-green-500 text-white":state==="active"?"bg-primary text-white":"bg-secondary text-muted-foreground"}`}>
        {state==="done" ? <Check size={10}/> : <Circle size={8} fill="currentColor"/>}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-xs font-semibold ${state==="active"?"text-primary":state==="done"?"text-foreground":"text-muted-foreground"}`}>{label}</span>
        <span className="text-[10px] text-muted-foreground ml-2">{desc}</span>
      </div>
      {state==="active" && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>}
    </div>
  );
}

const PROOF_LADDER = [
  { label:"Enrolled",  desc:"Joined course" },
  { label:"Engaged",   desc:"Lesson progress" },
  { label:"Checked",   desc:"Quiz passed" },
  { label:"Practiced", desc:"Task submitted" },
  { label:"Built",     desc:"Artifact saved" },
  { label:"Revised",   desc:"Feedback applied" },
  { label:"Proved",    desc:"Portfolio ready" },
];

// ─── Screen 1: Course Preview (public) ───────────────────────────────────────

function PreviewScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0" style={{ background:`radial-gradient(ellipse 60% 50% at 25% 40%, ${C.blue.base}0A, transparent)` }}/>
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge color={C.blue}>Free · No card required</Badge>
            <Badge color={C.teal}>Source-mapped</Badge>
            <Badge color={C.violet}>BYOK AI Tutor</Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground leading-tight mb-4" style={{ letterSpacing:"-0.02em" }}>
            Frontier Model<br/>Evaluations
          </h1>
          <p className="text-lg text-secondary-foreground max-w-xl mb-6 leading-relaxed">
            A 51-hour structured course covering the science and practice of evaluating frontier AI models. Source-mapped, tutor-assisted, and artifact-driven. Free for all learners.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={()=>go("auth")} style={{ background:C.blue.base }}
              className="text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
              Enrol free <ArrowRight size={15}/>
            </button>
            <button onClick={()=>go("auth")} className="px-6 py-3 rounded-xl font-medium text-sm border border-border bg-card hover:bg-secondary transition-colors text-foreground">
              Sign in
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[{ v:"51 hrs", l:"Structured content" },{ v:"6 phases", l:"Progressive curriculum" },{ v:"30+ sources", l:"Papers & frameworks" },{ v:"6 artifacts", l:"Proof outputs" }]
              .map(({v,l})=>(
              <div key={l}>
                <p className="text-lg font-bold text-foreground">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase overview */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">Course structure</h2>
        <p className="text-secondary-foreground text-sm mb-7">Six phases, each ending with a real artifact that feeds your capstone dossier.</p>
        <div className="space-y-2">
          {PHASES.map((p,i)=>(
            <div key={p.id} className="bg-card border border-border rounded-xl px-5 py-4 flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div style={{ background:p.color.light, border:`1.5px solid ${p.color.border}` }}
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold"
                style={{ color:p.color.base } as any}>
                {p.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <p className="font-semibold text-foreground">{p.title}</p>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1"><Clock size={11}/> {p.hours}h</span>
                </div>
                <p className="text-sm text-secondary-foreground mt-0.5">{p.promise}</p>
                <p className="text-xs text-muted-foreground mt-1">Artifact: <span style={{ color:p.color.base }} className="font-medium">{p.artifact}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-card border border-border rounded-2xl p-8 text-center">
          <p className="text-2xl font-bold text-foreground mb-2">Start learning today — free</p>
          <p className="text-secondary-foreground text-sm mb-6 max-w-md mx-auto">Create a free account to access all course content, the AI tutor, artifact builders, and your SkillProof portfolio.</p>
          <button onClick={()=>go("auth")} style={{ background:C.blue.base }}
            className="text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Create free account
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Auth ────────────────────────────────────────────────────────────

function AuthScreen({ go }: { go:(s:Screen)=>void }) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (pass.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    setSubmitted(true);
    setTimeout(() => go("onboard"), 600);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div style={{ background:C.blue.base }} className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BookOpen size={18} color="white"/>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{mode==="signup" ? "Create your account" : "Welcome back"}</h1>
          <p className="text-secondary-foreground text-sm mt-1">
            {mode==="signup" ? "Free access to all courses and the AI tutor." : "Continue where you left off."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          {mode==="signup" && (
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">Display name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Password</label>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder={mode==="signup"?"At least 8 characters":"Your password"}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"/>
          </div>
          {error && <p className="text-xs text-red-600 flex items-center gap-1.5"><AlertCircle size={12}/>{error}</p>}
          {submitted && <p className="text-xs text-green-600 flex items-center gap-1.5"><CheckCircle2 size={12}/>{mode==="signup"?"Account created! Redirecting…":"Signed in! Redirecting…"}</p>}
          <button type="submit" style={{ background:C.blue.base }}
            className="w-full text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity mt-2">
            {mode==="signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {mode==="signup" ? "Already have an account? " : "No account yet? "}
          <button onClick={()=>{ setMode(m=>m==="signup"?"login":"signup"); setError(""); }}
            className="text-primary font-medium hover:underline">
            {mode==="signup" ? "Sign in" : "Create one free"}
          </button>
        </p>
        <p className="text-center text-[10px] text-muted-foreground mt-3">
          Learners are always free. No card required.
        </p>
      </div>
    </div>
  );
}

// ─── Screen 3: Onboarding diagnostic ──────────────────────────────────────────

function OnboardScreen({ go }: { go:(s:Screen)=>void }) {
  const [step, setStep] = useState(0); // 0=goal, 1=background, 2=result
  const [goal, setGoal] = useState("");
  const [background, setBackground] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<number|null>(null);

  const goals = [
    { id:"practitioner", label:"Become an AI evaluator", sub:"Build hands-on evaluation skills for a role in AI safety or governance" },
    { id:"researcher",   label:"Support research work", sub:"Add rigorous evaluation methodology to ML or AI safety research" },
    { id:"org",          label:"Evaluate AI for my org", sub:"Assess frontier models for enterprise deployment or policy decisions" },
    { id:"curious",      label:"Understand AI limits", sub:"Learn how AI capabilities are measured and where claims break down" },
  ];

  const levels = [
    { id:"none",    label:"None — new to AI evaluation" },
    { id:"some",    label:"Some — I've read about benchmarks" },
    { id:"working", label:"Familiar — I've run or reviewed evals" },
    { id:"expert",  label:"Deep — I design evaluation programs" },
  ];

  if (step===2) {
    const pace = background==="none"||background==="some" ? "Foundational path (start with Phase 1)" : "Accelerated path (Phase 1 fast-track)";
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background:C.green.light }}>
            <CheckCircle2 size={24} style={{ color:C.green.base }}/>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">You're all set</h2>
          <p className="text-secondary-foreground mb-6 text-sm">Based on your answers, here's your recommended learning path:</p>
          <div style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl p-5 mb-6 text-left">
            <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.blue.base }}>RECOMMENDED PATH</p>
            <p className="font-semibold text-foreground mb-1">{pace}</p>
            <p className="text-sm text-secondary-foreground">Phase 1 — The Paradigm → build your first evaluation rubric → continue through all 6 phases at your own pace.</p>
          </div>
          <button onClick={()=>go("dashboard")} style={{ background:C.blue.base }}
            className="text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Start learning <ArrowRight size={15} className="inline ml-1"/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[0,1].map(i=>(
            <div key={i} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors
                ${i<step ? "bg-green-500 text-white" : i===step ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
                {i<step ? <Check size={10}/> : i+1}
              </div>
              {i<1 && <div className={`h-px w-12 transition-colors ${i<step ? "bg-green-400" : "bg-border"}`}/>}
            </div>
          ))}
          <span className="ml-3 text-xs text-muted-foreground">{step===0?"Step 1 of 2":"Step 2 of 2"}</span>
        </div>

        {step===0 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-1">What brings you here?</h2>
            <p className="text-secondary-foreground text-sm mb-6">Choose the goal that fits best. This personalises your learning path.</p>
            <div className="space-y-2">
              {goals.map(g=>(
                <button key={g.id} onClick={()=>setGoal(g.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all
                    ${goal===g.id ? "border-primary/60 bg-primary/5" : "border-border bg-card hover:bg-secondary/40"}`}>
                  <p className={`font-semibold text-sm ${goal===g.id?"text-primary":"text-foreground"}`}>{g.label}</p>
                  <p className="text-xs text-secondary-foreground mt-0.5">{g.sub}</p>
                </button>
              ))}
            </div>
            <button disabled={!goal} onClick={()=>setStep(1)} style={{ background:goal ? C.blue.base : undefined }}
              className={`w-full mt-5 py-3 rounded-xl font-semibold text-sm transition-all ${goal?"text-white hover:opacity-90":"bg-secondary text-muted-foreground cursor-not-allowed"}`}>
              Continue
            </button>
          </>
        )}

        {step===1 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-1">Your evaluation background</h2>
            <p className="text-secondary-foreground text-sm mb-6">No right or wrong answer — this sets pacing and source recommendations.</p>
            <div className="space-y-2">
              {levels.map(l=>(
                <button key={l.id} onClick={()=>setBackground(l.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all
                    ${background===l.id ? "border-primary/60 bg-primary/5" : "border-border bg-card hover:bg-secondary/40"}`}>
                  <p className={`text-sm font-medium ${background===l.id?"text-primary":"text-foreground"}`}>{l.label}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setStep(0)} className="flex-1 py-3 rounded-xl font-medium text-sm border border-border bg-card hover:bg-secondary transition-colors text-foreground">
                Back
              </button>
              <button disabled={!background} onClick={()=>setStep(2)} style={{ background:background ? C.blue.base : undefined }}
                className={`flex-[2] py-3 rounded-xl font-semibold text-sm transition-all ${background?"text-white hover:opacity-90":"bg-secondary text-muted-foreground cursor-not-allowed"}`}>
                See my path
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Screen 4: Course Library ─────────────────────────────────────────────────

function LibraryScreen({ go }: { go:(s:Screen)=>void }) {
  const courses = [
    { title:"Frontier Model Evaluations", level:"Novice → Advanced", hours:51, format:"Self-paced", proof:"Capstone dossier", color:C.blue, available:true },
    { title:"AI Red Teaming Foundations", level:"Intermediate", hours:20, format:"Self-paced", proof:"Red team report", color:C.red, available:false },
    { title:"LLM Evaluation in Production", level:"Advanced", hours:24, format:"Self-paced", proof:"Evaluation pipeline", color:C.teal, available:false },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Course library</h1>
      <p className="text-secondary-foreground text-sm mb-7">All courses are free for learners. Enrollment is open.</p>
      <div className="space-y-4">
        {courses.map(c=>(
          <div key={c.title} className={`bg-card border border-border rounded-2xl overflow-hidden ${c.available ? "hover:shadow-md transition-shadow cursor-pointer" : "opacity-60"}`}
            onClick={c.available ? ()=>go("overview") : undefined}>
            <div style={{ background:`linear-gradient(135deg, ${c.color.base}12, ${c.color.light})`, borderBottom:`1px solid ${c.color.border}` }}
              className="px-6 py-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge color={C.green}>Free</Badge>
                    <Badge color={c.color}>{c.level}</Badge>
                    {!c.available && <Badge color={C.slate}>Coming soon</Badge>}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{c.title}</h2>
                </div>
                {c.available && (
                  <button style={{ background:c.color.base }} className="text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
                    Enrol <ArrowRight size={14}/>
                  </button>
                )}
              </div>
            </div>
            <div className="px-6 py-4 flex flex-wrap gap-5">
              {[{ icon:Clock, v:`${c.hours} hours` },{ icon:FileText, v:`Self-paced` },{ icon:Award, v:c.proof },{ icon:Bookmark, v:"Source-mapped" }].map(({icon:Icon,v})=>(
                <div key={v} className="flex items-center gap-1.5 text-xs text-secondary-foreground"><Icon size={12}/> {v}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 5: Learner Dashboard ──────────────────────────────────────────────

function DashboardScreen({ go }: { go:(s:Screen)=>void }) {
  const totalLessons = PHASES.reduce((s,p)=>s+p.lessons, 0);
  const doneLessons = 3;
  const pct = Math.round((doneLessons/totalLessons)*100);

  return (
    <div className="p-6 max-w-5xl">
      <p className="text-muted-foreground text-sm mb-0.5">Good morning</p>
      <h1 className="text-2xl font-bold text-foreground mb-6">Continue learning</h1>

      {/* Resume card */}
      <div style={{ background:`linear-gradient(135deg, ${C.blue.base}10, ${C.blue.light})`, border:`1px solid ${C.blue.border}` }}
        className="rounded-2xl p-6 mb-6 flex items-start gap-4 flex-wrap cursor-pointer hover:shadow-md transition-shadow"
        onClick={()=>go("lesson")}>
        <div style={{ background:C.blue.base }} className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
          <Target size={20} color="white"/>
        </div>
        <div className="flex-1 min-w-0">
          <Pill label={`Phase 1 · Lesson 4 of 6`} color={C.blue}/>
          <p className="font-bold text-foreground text-lg mt-1.5 leading-tight">Outcome Metrics vs Trajectory Metrics</p>
          <p className="text-sm text-secondary-foreground mt-0.5">45 min · Build artifact: Outcome-vs-Trajectory Rubric</p>
        </div>
        <button style={{ background:C.blue.base }}
          className="text-white text-sm px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
          <Play size={14}/> Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Phases */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress overview */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-foreground text-sm">Course progress</p>
              <span className="font-mono text-xs text-muted-foreground">{doneLessons}/{totalLessons} lessons · {pct}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
              <div style={{ width:`${pct}%`, background:C.blue.base }} className="h-full rounded-full transition-all"/>
            </div>
            <div className="space-y-2">
              {PHASES.map(p=>{
                const phasePct = Math.round((p.done/p.lessons)*100);
                const isActive = p.done>0 && p.done<p.lessons;
                return (
                  <div key={p.id} onClick={()=>go("path")} className="flex items-center gap-3 cursor-pointer group">
                    <div style={{ background:p.done===p.lessons?p.color.base:isActive?p.color.light:"var(--secondary)",
                                  border:`1.5px solid ${p.done===p.lessons?p.color.base:isActive?p.color.border:"var(--border)"}` }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
                      {p.done===p.lessons ? <Check size={13} color="white"/> :
                        <span className="text-[9px] font-mono font-semibold" style={{ color:isActive?p.color.base:"var(--muted-foreground)" }}>{p.id}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{p.title}</p>
                        <span className="font-mono text-[10px] text-muted-foreground">{p.done}/{p.lessons}</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div style={{ width:`${phasePct}%`, background:p.color.base }} className="h-full rounded-full"/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent lessons */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <p className="font-semibold text-sm text-foreground">Phase 1 — The Paradigm</p>
              <button onClick={()=>go("overview")} className="text-xs text-primary hover:underline">View all</button>
            </div>
            {P1_LESSONS.map(l=>{
              const cfg = { Concept:{col:C.blue,icon:Brain}, Practice:{col:C.orange,icon:Target}, Case:{col:C.teal,icon:FileText}, Build:{col:C.violet,icon:Package} } as any;
              const t = cfg[l.type] ?? cfg.Concept;
              return (
                <div key={l.id} onClick={()=>l.status!=="locked"?go("lesson"):null}
                  className={`flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 transition-colors
                    ${l.status!=="locked"?"cursor-pointer hover:bg-secondary/40":""}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${l.status==="done"?"bg-green-50":l.status==="active"?"":"bg-secondary"}`}
                    style={l.status==="done"?{}:l.status==="active"?{ background:t.col.light }:{}}>
                    {l.status==="done" ? <Check size={14} className="text-green-600"/> :
                     l.status==="active" ? <t.icon size={14} style={{ color:t.col.base }}/> :
                     <Lock size={12} className="text-muted-foreground"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-tight ${l.status==="done"?"text-muted-foreground line-through":"text-foreground"}`}>{l.title}</p>
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 mt-0.5"><Clock size={9}/> {l.mins}m</span>
                  </div>
                  {l.status==="active" && <Pill label="CURRENT" color={C.blue}/>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Proof ladder */}
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs font-semibold text-foreground mb-3">Proof ladder — P1.L4</p>
            <div className="space-y-0.5">
              {PROOF_LADDER.map((s,i)=>{
                const state = i<2?"done":i===2?"active":"locked";
                return <ProofStep key={s.label} label={s.label} desc={s.desc} state={state as any}/>;
              })}
            </div>
          </div>

          {/* Next artifact */}
          <div style={{ background:C.violet.light, border:`1px solid ${C.violet.border}` }} className="rounded-xl p-4">
            <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.violet.base }}>NEXT ARTIFACT</p>
            <p className="text-sm font-semibold text-foreground">Outcome-vs-Trajectory Rubric</p>
            <p className="text-xs text-secondary-foreground mt-1">Complete Lesson P1.L4 to unlock the Build tab and save this artifact.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: Learning Path ──────────────────────────────────────────────────

function PathScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-3xl">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">FRONTIER MODEL EVALUATIONS</p>
      <h1 className="text-2xl font-bold text-foreground mb-1">Learning path</h1>
      <p className="text-secondary-foreground text-sm mb-8">51 hours across 6 phases. Each phase ends with an artifact that feeds your capstone dossier.</p>

      <div className="relative">
        {/* Vertical connector */}
        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-border"/>

        <div className="space-y-4">
          {PHASES.map((p,pi)=>{
            const phaseDone = p.done===p.lessons;
            const phaseActive = p.done>0 && p.done<p.lessons;
            return (
              <div key={p.id} className="relative flex gap-5">
                {/* Node */}
                <div style={{ background:phaseDone?p.color.base:phaseActive?p.color.light:"var(--card)",
                               border:`2px solid ${phaseDone?p.color.base:phaseActive?p.color.base:"var(--border)"}`,
                               zIndex:1 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-card">
                  {phaseDone ? <Check size={16} color="white"/> :
                    <span style={{ color:phaseActive?p.color.base:"var(--muted-foreground)" }} className="text-xs font-mono font-bold">{p.id}</span>}
                </div>

                {/* Card */}
                <div onClick={()=>go("overview")} style={{ border:`1px solid ${phaseActive?p.color.border:"var(--border)"}`,
                                                           background:phaseActive?p.color.light:"var(--card)" }}
                  className="flex-1 rounded-xl p-4 cursor-pointer hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-foreground">{p.title}</p>
                        {phaseActive && <Pill label="IN PROGRESS" color={p.color}/>}
                        {phaseDone && <Badge color={C.green}>Complete</Badge>}
                      </div>
                      <p className="text-xs text-secondary-foreground">{p.promise}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1"><Clock size={10}/>{p.hours}h</span>
                  </div>

                  {/* Lesson nodes */}
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {Array.from({length:p.lessons}).map((_,li)=>{
                      const isDone = li<p.done;
                      const isActive = li===p.done && phaseActive;
                      return (
                        <div key={li} style={{ background:isDone?p.color.base:isActive?p.color.light:"var(--secondary)",
                                               border:`1.5px solid ${isDone?p.color.base:isActive?p.color.base:"var(--border)"}` }}
                          className="w-5 h-5 rounded-md flex items-center justify-center">
                          {isDone && <Check size={9} color="white"/>}
                          {isActive && <div className="w-1.5 h-1.5 rounded-full" style={{ background:p.color.base }}/>}
                        </div>
                      );
                    })}
                    <span className="text-[10px] font-mono text-muted-foreground ml-1">{p.done}/{p.lessons}</span>
                  </div>

                  <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Award size={10}/> Artifact: {p.artifact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: Course Overview ────────────────────────────────────────────────

function OverviewScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-4xl">
      <button onClick={()=>go("dashboard")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft size={14}/> Back to dashboard
      </button>
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div style={{ background:`linear-gradient(135deg, #1e3a8a, ${C.blue.base} 60%, #0e7490)` }} className="px-6 py-8 text-white">
          <p className="font-mono text-[11px] opacity-60 tracking-widest mb-1">PHASE 1 OF 6</p>
          <h1 className="text-3xl font-bold mb-2">The Paradigm</h1>
          <p className="opacity-80 text-sm max-w-lg">Stop treating evaluation as a score. Start treating it as decision-grade measurement.</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {[{ v:"6 lessons", l:null },{ v:"6 hours", l:null },{ v:"Custom Evaluation Rubric", l:"Artifact" }].map(({v,l})=>(
              <div key={v}><p className="font-semibold">{v}</p>{l&&<p className="text-xs opacity-60">{l}</p>}</div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
              <div style={{ width:"50%", background:C.blue.base }} className="h-full rounded-full"/>
            </div>
            <span className="text-xs font-mono text-muted-foreground">3/6 complete</span>
          </div>
          <button onClick={()=>go("lesson")} style={{ background:C.blue.base }}
            className="text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
            <Play size={14}/> Continue P1.L4
          </button>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-2">
        {P1_LESSONS.map(l=>{
          const cfg: any = { Concept:{col:C.blue}, Practice:{col:C.orange}, Case:{col:C.teal}, Build:{col:C.violet} };
          const t = cfg[l.type] ?? cfg.Concept;
          return (
            <div key={l.id} onClick={()=>go("lesson")}
              className={`bg-card border rounded-xl px-5 py-4 flex items-center gap-4 transition-all
                ${l.status==="done"?"border-border":l.status==="active"?"border-primary/40 bg-primary/4 cursor-pointer hover:shadow-sm":"border-border opacity-60"}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                ${l.status==="done"?"bg-green-50":""}`}
                style={l.status==="active"?{ background:t.col.light }:{}}>
                {l.status==="done" ? <Check size={15} className="text-green-600"/> :
                 l.status==="active" ? <Target size={15} style={{ color:t.col.base }}/> :
                 <Lock size={13} className="text-muted-foreground"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${l.status==="done"?"text-muted-foreground line-through":"text-foreground"}`}>{l.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span style={{ background:t.col.light, color:t.col.base }} className="text-[10px] px-1.5 py-px rounded font-medium">{l.type}</span>
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Clock size={9}/>{l.mins}m</span>
                  <span className="text-[10px] text-muted-foreground">→ {l.artifact}</span>
                </div>
              </div>
              {l.status==="active" && <Pill label="CURRENT" color={C.blue}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen 8: Lesson Workspace ───────────────────────────────────────────────

function LessonScreen({ go, vp }: { go:(s:Screen)=>void; vp:Viewport }) {
  const [tab, setTab] = useState<LessonTab>("watch");
  const [tutorOpen, setTutorOpen] = useState(vp==="desktop");
  const [tutorState, setTutorState] = useState<TutorState>("idle");
  const [tutorInput, setTutorInput] = useState("");
  const [tutorMessages, setTutorMessages] = useState<{ role:"user"|"tutor"; text:string }[]>([]);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number|null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [watched, setWatched] = useState(false);

  function sendTutor(msg: string) {
    const userMsg = msg || tutorInput;
    if (!userMsg.trim()) return;
    setTutorMessages(m=>[...m, { role:"user", text:userMsg }]);
    setTutorInput("");
    setTutorState("loading");
    setTimeout(()=>{
      const reply = TUTOR_REPLIES[userMsg] ?? "That's a great question. Based on this lesson's content: trajectory metrics capture the *path* the model took, not just the final result. In agentic systems, the path often contains the most important safety signals.";
      setTutorMessages(m=>[...m, { role:"tutor", text:reply }]);
      setTutorState("replied");
    }, 1200);
  }

  const tabs: { id:LessonTab; label:string }[] = [
    { id:"watch", label:"Watch / Read" },
    { id:"understand", label:"Understand" },
    { id:"practice", label:"Practice" },
    { id:"build", label:"Build" },
    { id:"sources", label:"Sources" },
  ];

  const isMobile = vp==="mobile";
  const isDesktop = vp==="desktop";

  const lessonContent = (
    <div className="flex-1 overflow-y-auto">
      {/* Lesson header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
          <button onClick={()=>go("overview")} className="hover:text-foreground transition-colors">Phase 1</button>
          <ChevronRight size={12}/>
          <span className="text-foreground font-medium">Lesson P1.L4</span>
        </div>
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-tight">{LESSON.title}</h1>
            <p className="text-sm text-secondary-foreground mt-1 leading-snug">{LESSON.promise}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge color={C.orange}>Intermediate</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11}/>{LESSON.mins} min</span>
              <span className="text-xs text-muted-foreground">→ {LESSON.artifact}</span>
            </div>
          </div>
          {!isMobile && (
            <button onClick={()=>setTutorOpen(o=>!o)}
              style={{ background:tutorOpen ? C.violet.base : C.violet.light, border:`1px solid ${C.violet.border}` }}
              className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all flex-shrink-0"
              style={{ color:tutorOpen?"white":C.violet.base } as any}>
              <Sparkles size={13}/> Tutor {tutorOpen?"on":"off"}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 mt-4 -mb-px overflow-x-auto">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors
                ${tab===t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-6">

        {/* ── Watch / Read ── */}
        {tab==="watch" && (
          <div className="max-w-2xl space-y-5">
            {/* Video fallback card */}
            <div className="bg-secondary rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center mx-auto mb-3">
                <Play size={20} className="text-muted-foreground"/>
              </div>
              <p className="text-xs font-mono text-muted-foreground mb-1.5">REFERENCE VIDEO — NOT COURSE-OWNED MEDIA</p>
              <p className="font-semibold text-foreground text-sm mb-1">{LESSON.video.title}</p>
              <p className="text-xs text-muted-foreground mb-4">External embed unavailable. Open on provider to watch, then mark as viewed below.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <a href={LESSON.video.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground hover:bg-secondary transition-colors">
                  <ExternalLink size={13}/> Open on provider
                </a>
                <button onClick={()=>setWatched(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${watched?"bg-green-100 text-green-700 border border-green-200":"border border-border bg-card text-muted-foreground hover:bg-secondary"}`}>
                  {watched ? <><Check size={13} className="inline mr-1"/>Marked as viewed</> : "Mark as viewed"}
                </button>
              </div>
            </div>

            {/* Authored transcript */}
            <div className="bg-card border border-border rounded-xl">
              <div className="px-5 py-3.5 border-b border-border">
                <p className="text-xs font-semibold text-foreground">Authored course reading</p>
                <p className="text-[10px] text-muted-foreground">This is the course's reliable teaching text, not a video transcript.</p>
              </div>
              <div className="px-5 py-5 prose prose-sm max-w-none">
                {LESSON.transcript.split("\n\n").map((para,i)=>(
                  <p key={i} className="text-sm text-secondary-foreground leading-relaxed mb-3 last:mb-0">{para}</p>
                ))}
              </div>
            </div>

            {/* Reflection */}
            <div>
              <label className="text-xs font-semibold text-foreground block mb-2">Quick reflection (optional)</label>
              <textarea value={reflectionText} onChange={e=>setReflectionText(e.target.value)} rows={2}
                placeholder="In one sentence: what's the main difference between outcome and trajectory evidence?"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"/>
            </div>
          </div>
        )}

        {/* ── Understand ── */}
        {tab==="understand" && (
          <div className="max-w-2xl space-y-5">
            {/* Key ideas */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3">Key ideas</p>
              <div className="space-y-2">
                {LESSON.keyIdeas.map((k,i)=>(
                  <div key={i} className="bg-card border border-border rounded-xl px-4 py-3.5">
                    <div className="flex items-start gap-3">
                      <div style={{ background:C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold mt-0.5">{i+1}</div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{k.title}</p>
                        <p className="text-sm text-secondary-foreground mt-0.5 leading-relaxed">{k.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual explainer */}
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-foreground mb-4">Visual explainer — Outcome vs trajectory</p>
              <div className="flex gap-3">
                {[
                  { lane:"OUTCOME", color:C.blue, nodes:["Final answer","Task completed","Score reported"] },
                  { lane:"TRAJECTORY", color:C.orange, nodes:["Tool calls","State changes","Safety checks","Recovery"] },
                ].map(l=>(
                  <div key={l.lane} className="flex-1">
                    <p className="font-mono text-[9px] tracking-widest font-bold mb-2" style={{ color:l.color.base }}>{l.lane} LANE</p>
                    <div className="space-y-1.5">
                      {l.nodes.map((n,ni)=>(
                        <div key={ni} className="flex items-center gap-2">
                          <div style={{ background:l.color.light, border:`1px solid ${l.color.border}` }}
                            className="w-full py-1.5 px-2 rounded-lg text-xs text-center font-medium" style={{ color:l.color.base } as any}>
                            {n}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-4 text-center">The final answer can be correct while the trajectory is unsafe or invalid.</p>
            </div>

            {/* Worked example */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3">Worked example</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-4">
                  <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.red.base }}>WEAK</p>
                  <p className="text-sm text-foreground italic">"{LESSON.workedExample.weak}"</p>
                </div>
                <div style={{ background:C.green.light, border:`1px solid ${C.green.border}` }} className="rounded-xl p-4">
                  <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.green.base }}>IMPROVED</p>
                  <p className="text-sm text-foreground italic">"{LESSON.workedExample.strong}"</p>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-3 mt-2">
                <p className="text-xs text-secondary-foreground"><strong className="text-foreground">Why improved: </strong>{LESSON.workedExample.why}</p>
              </div>
            </div>

            {/* Common mistakes */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Common mistakes</p>
              <div className="space-y-1.5">
                {LESSON.commonMistakes.map((m,i)=>(
                  <div key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <AlertCircle size={13} className="text-amber-500 flex-shrink-0 mt-0.5"/>
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Practice ── */}
        {tab==="practice" && <PracticeTab quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} go={go}/>}

        {/* ── Build ── */}
        {tab==="build" && <BuildTab go={go}/>}

        {/* ── Sources ── */}
        {tab==="sources" && <SourcesTab/>}
      </div>
    </div>
  );

  const tutorPanel = (
    <div style={{ borderLeft:`1px solid ${C.violet.border}`, background:C.violet.light, minWidth: isMobile?undefined:300, maxWidth:380 }}
      className={`flex flex-col ${isMobile ? "border-t border-border" : ""}`}>
      {/* Tutor header */}
      <div style={{ borderBottom:`1px solid ${C.violet.border}` }} className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div style={{ background:C.violet.base }} className="w-6 h-6 rounded-lg flex items-center justify-center">
            <Sparkles size={12} color="white"/>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">AI Tutor</p>
            <p className="text-[10px] text-muted-foreground">Grounded in lesson content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ background:C.violet.muted, color:C.violet.base }} className="text-[9px] font-mono px-2 py-0.5 rounded-full">BYOK</span>
          {(isMobile) && <button onClick={()=>setTutorOpen(false)}><X size={14} className="text-muted-foreground"/></button>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: isMobile ? 300 : undefined }}>
        {tutorMessages.length===0 && (
          <div style={{ background:C.violet.muted, border:`1px solid ${C.violet.border}` }}
            className="rounded-xl p-3 text-xs leading-relaxed" style={{ color:"#3B1D7A" } as any}>
            {LESSON.tutorOpening}
          </div>
        )}
        {tutorMessages.map((m,i)=>(
          <div key={i} className={`rounded-xl p-3 text-xs leading-relaxed ${m.role==="user"?"bg-secondary ml-4":"max-w-full"}`}
            style={m.role==="tutor"?{ background:C.violet.muted, border:`1px solid ${C.violet.border}`, color:"#3B1D7A" }:{}}>
            {m.text.split("**").map((part,pi)=>pi%2===1 ? <strong key={pi}>{part}</strong> : part)}
          </div>
        ))}
        {tutorState==="loading" && (
          <div style={{ background:C.violet.muted }} className="rounded-xl p-3 flex gap-1">
            {[0,1,2].map(i=><div key={i} style={{ animationDelay:`${i*200}ms` }}
              className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"/>)}
          </div>
        )}
      </div>

      {/* Prompt chips */}
      <div className="px-3 py-2 flex flex-wrap gap-1.5">
        {LESSON.promptChips.map(chip=>(
          <button key={chip} onClick={()=>sendTutor(chip)}
            style={{ border:`1px solid ${C.violet.border}`, color:C.violet.base }}
            className="text-[10px] px-2.5 py-1 rounded-full bg-card hover:opacity-80 transition-opacity">
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ borderTop:`1px solid ${C.violet.border}` }} className="p-3 flex gap-2">
        <input value={tutorInput} onChange={e=>setTutorInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&sendTutor("")}
          placeholder="Ask about this lesson…"
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200"/>
        <button onClick={()=>sendTutor("")} style={{ background:C.violet.base }}
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity">
          <Send size={13} color="white"/>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Source drawer overlay */}
      {sourceOpen && (
        <div className="absolute inset-0 z-20 flex">
          <div className="flex-1 bg-black/30" onClick={()=>setSourceOpen(false)}/>
          <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <p className="font-semibold text-sm text-foreground">Sources — P1.L4</p>
              <button onClick={()=>setSourceOpen(false)}><X size={16} className="text-muted-foreground"/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {LESSON.sources.map(s=>(
                <div key={s.id} className="bg-secondary rounded-xl p-3 border border-border">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span style={{ background:C.teal.light, color:C.teal.base, border:`1px solid ${C.teal.border}` }}
                      className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase">{s.type}</span>
                    <div className="flex items-center gap-1">
                      {s.required && <Badge color={C.green} small>Required</Badge>}
                      <DiffBadge diff={s.diff}/>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-foreground leading-snug">{s.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.org}</p>
                  <p className="text-[10px] text-secondary-foreground mt-1.5 leading-snug">{s.why}</p>
                  <a href={s.url} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] mt-2 hover:underline" style={{ color:C.teal.base }}>
                    <ExternalLink size={9}/> Open source
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main layout */}
      {isDesktop ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">{lessonContent}</div>
          {tutorOpen && <div className="flex flex-col w-80 overflow-hidden">{tutorPanel}</div>}
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">{lessonContent}</div>
          {tutorOpen && tutorPanel}
        </div>
      )}

      {/* Bottom toolbar (mobile/tablet) */}
      {!isDesktop && (
        <div className="border-t border-border bg-card px-4 py-2 flex items-center gap-2">
          <button onClick={()=>setSourceOpen(true)}
            style={{ background:C.teal.light, border:`1px solid ${C.teal.border}`, color:C.teal.base }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium">
            <Bookmark size={13}/> Sources
          </button>
          <button onClick={()=>setTutorOpen(o=>!o)}
            style={{ background:tutorOpen?C.violet.base:C.violet.light, border:`1px solid ${C.violet.border}` }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ color:tutorOpen?"white":C.violet.base } as any}>
            <Sparkles size={13}/> Tutor
          </button>
          <button onClick={()=>go("artifact")} style={{ background:C.blue.base }}
            className="ml-auto text-white text-xs px-4 py-1.5 rounded-lg font-semibold">
            Next → Build
          </button>
        </div>
      )}
    </div>
  );
}

// Practice tab (extracted for clarity)
function PracticeTab({ quizAnswer, setQuizAnswer, go }: { quizAnswer:number|null; setQuizAnswer:(v:number|null)=>void; go:(s:Screen)=>void }) {
  const [practiceText, setPracticeText] = useState("");
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  return (
    <div className="max-w-2xl space-y-5">
      {/* Practice activity */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">PRACTICE ACTIVITY</p>
        <p className="text-sm font-semibold text-foreground mb-1">Scenario</p>
        <div style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl p-3 mb-4">
          <p className="text-sm text-foreground leading-relaxed">{LESSON.practice.prompt}</p>
        </div>
        <p className="text-sm font-medium text-foreground mb-2">Your task</p>
        <p className="text-sm text-secondary-foreground mb-3">{LESSON.practice.task}</p>
        <textarea value={practiceText} onChange={e=>setPracticeText(e.target.value)} rows={4} disabled={practiceSubmitted}
          placeholder="Write your classification here. Start with 'Outcome evidence:' then 'Trajectory evidence:'"
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50"/>
        {!practiceSubmitted ? (
          <button onClick={()=>practiceText.trim() && setPracticeSubmitted(true)}
            disabled={!practiceText.trim()} style={{ background:practiceText.trim()?C.blue.base:undefined }}
            className={`mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${practiceText.trim()?"text-white hover:opacity-90":"bg-secondary text-muted-foreground cursor-not-allowed"}`}>
            Submit for feedback
          </button>
        ) : (
          <div style={{ background:C.green.light, border:`1px solid ${C.green.border}` }} className="mt-3 rounded-xl p-4">
            <p className="text-xs font-semibold mb-1" style={{ color:C.green.base }}>✓ Strong answer pattern</p>
            <p className="text-sm text-secondary-foreground leading-relaxed">{LESSON.practice.strong}</p>
          </div>
        )}
      </div>

      {/* Quiz */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">QUIZ · DECISION CHECKPOINT</p>
        <p className="text-sm font-semibold text-foreground mb-4">{LESSON.quiz.question}</p>
        <div className="space-y-2">
          {LESSON.quiz.options.map((opt,i)=>{
            const isCorrect = i===LESSON.quiz.correct;
            const selected = quizAnswer!==null;
            const isSelected = quizAnswer===i;
            return (
              <button key={i} onClick={()=>!selected && setQuizAnswer(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all
                  ${!selected?"border-border hover:border-primary/40 hover:bg-secondary/40"
                    :isCorrect?"border-green-300 bg-green-50 text-green-800"
                    :isSelected?"border-red-300 bg-red-50 text-red-700"
                    :"border-border opacity-40"}`}>
                <span className="flex items-center gap-2">
                  {selected && isCorrect && <Check size={14} className="text-green-600 flex-shrink-0"/>}
                  {selected && isSelected && !isCorrect && <X size={14} className="text-red-500 flex-shrink-0"/>}
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
        {quizAnswer!==null && (
          <div className={`mt-4 p-3 rounded-xl text-sm leading-relaxed border ${quizAnswer===LESSON.quiz.correct?"bg-green-50 text-green-800 border-green-200":"bg-amber-50 text-amber-800 border-amber-200"}`}>
            {quizAnswer===LESSON.quiz.correct ? (
              <><strong>Correct.</strong> {LESSON.quiz.explanation}</>
            ) : (
              <><strong>Not quite.</strong> {LESSON.quiz.wrongFeedback} <button onClick={()=>setQuizAnswer(null)} className="underline ml-1 text-xs">Try again</button></>
            )}
          </div>
        )}
        {quizAnswer===LESSON.quiz.correct && (
          <button onClick={()=>go("artifact")} style={{ background:C.blue.base }}
            className="mt-4 w-full text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            Continue to Build tab → Save artifact
          </button>
        )}
      </div>
    </div>
  );
}

// Build tab
function BuildTab({ go }: { go:(s:Screen)=>void }) {
  const [fields, setFields] = useState(() => LESSON.artifactFields.map(f=>({ ...f })));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(()=>go("artifact"), 800);
  }

  const filled = fields.filter(f=>f.value.trim().length>0).length;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div style={{ background:`linear-gradient(135deg, ${C.violet.light}, ${C.violet.muted})`, borderBottom:`1px solid ${C.violet.border}` }}
          className="px-5 py-4">
          <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color:C.violet.base }}>ARTIFACT BUILDER</p>
          <p className="font-bold text-foreground">{LESSON.artifact}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1 bg-violet-100 rounded-full overflow-hidden">
              <div style={{ width:`${(filled/fields.length)*100}%`, background:C.violet.base }} className="h-full rounded-full transition-all"/>
            </div>
            <span className="font-mono text-[10px]" style={{ color:C.violet.base }}>{filled}/{fields.length} fields</span>
          </div>
        </div>
        <div className="p-5 space-y-4">
          {fields.map((f,i)=>(
            <div key={i}>
              <label className="text-xs font-semibold text-foreground block mb-1.5">{f.label}</label>
              <textarea value={f.value} onChange={e=>{
                const next=[...fields]; next[i]={ ...next[i], value:e.target.value }; setFields(next);
              }} rows={2} placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none"/>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5 flex flex-wrap gap-2">
          <button onClick={handleSave} style={{ background:C.violet.base }}
            className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            {saved ? <><Check size={14}/> Saved to portfolio!</> : <><Download size={14}/> Save to portfolio</>}
          </button>
          <button className="px-4 py-2.5 rounded-xl text-sm border border-border bg-card text-muted-foreground hover:bg-secondary transition-colors">
            Save draft
          </button>
        </div>
      </div>

      {/* Validation rules */}
      <div style={{ background:C.amber.light, border:`1px solid ${C.amber.border}` }} className="rounded-xl p-4">
        <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.amber.base }}>VALIDATION RULES</p>
        {["Must include one outcome metric and one trajectory metric.","Must explain why both are needed."].map((r,i)=>(
          <div key={i} className="flex items-center gap-2 text-xs text-secondary-foreground mt-1">
            <Info size={11} style={{ color:C.amber.base }} className="flex-shrink-0"/>{r}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sources tab
function SourcesTab() {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm text-secondary-foreground">Sources for Lesson P1.L4. Open each to read the supporting evidence for this lesson's key claims.</p>
      {LESSON.sources.map(s=>(
        <div key={s.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
            <span style={{ background:C.teal.light, color:C.teal.base, border:`1px solid ${C.teal.border}` }}
              className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase">{s.type}</span>
            <div className="flex items-center gap-1.5">
              {s.required && <Badge color={C.green} small>Required</Badge>}
              <DiffBadge diff={s.diff}/>
            </div>
          </div>
          <p className="font-semibold text-sm text-foreground">{s.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{s.org} · {s.id}</p>
          <p className="text-xs text-secondary-foreground mt-2 leading-relaxed">{s.why}</p>
          <a href={s.url} target="_blank" rel="noreferrer"
            className="mt-2 flex items-center gap-1.5 text-xs font-medium hover:underline" style={{ color:C.teal.base }}>
            <ExternalLink size={11}/> {s.url.replace("https://","")}
          </a>
        </div>
      ))}
    </div>
  );
}

// ─── Screen 9: Artifact Checkpoint ────────────────────────────────────────────

function ArtifactScreen({ go }: { go:(s:Screen)=>void }) {
  const completedArtifacts = [
    { title:"Evaluation Lifecycle Map", lesson:"P1.L1", status:"proved", date:"2026-06-14" },
    { title:"Model Capability Surface Map", lesson:"P1.L2", status:"revised", date:"2026-06-15" },
    { title:"Evaluation Vocabulary Card", lesson:"P1.L3", status:"built", date:"2026-06-16" },
  ];

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Artifact checkpoints</h1>
      <p className="text-secondary-foreground text-sm mb-6">Each artifact you save becomes evidence in your SkillProof portfolio.</p>

      {/* Active artifact */}
      <div style={{ border:`2px solid ${C.violet.border}`, background:C.violet.light }} className="rounded-2xl p-5 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div>
            <Pill label="IN PROGRESS" color={C.violet}/>
            <p className="font-bold text-foreground text-lg mt-2">Outcome-vs-Trajectory Rubric</p>
            <p className="text-sm text-secondary-foreground">Lesson P1.L4 · Phase 1 — The Paradigm</p>
          </div>
          <button onClick={()=>go("lesson")} style={{ background:C.violet.base }}
            className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
            <Edit3 size={13}/> Continue
          </button>
        </div>
        <div className="space-y-1">
          {LESSON.artifactFields.map((f,i)=>(
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${i<2?"bg-violet-500 border-violet-500":"border-violet-300"}`}>
                {i<2 && <Check size={8} color="white"/>}
              </div>
              <span style={{ color:i<2?C.violet.base:"var(--muted-foreground)" }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed artifacts */}
      <p className="text-sm font-semibold text-foreground mb-3">Completed artifacts</p>
      <div className="space-y-3">
        {completedArtifacts.map(a=>{
          const stateColor = a.status==="proved"?C.green:a.status==="revised"?C.teal:C.blue;
          return (
            <div key={a.title} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
              <div style={{ background:stateColor.light }} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award size={16} style={{ color:stateColor.base }}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.lesson} · Saved {a.date}</p>
              </div>
              <Badge color={stateColor}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen 10: Progress ──────────────────────────────────────────────────────

function ProgressScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Your progress</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[{ v:"3", l:"Lessons done" },{ v:"3", l:"Artifacts built" },{ v:"28%", l:"Overall progress" },{ v:"1", l:"Phase active" }].map(({v,l})=>(
          <div key={l} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      {/* Proof ladder for each phase lesson */}
      <div className="bg-card border border-border rounded-xl p-5 mb-5">
        <p className="text-sm font-semibold text-foreground mb-1">Current lesson proof state — P1.L4</p>
        <p className="text-xs text-muted-foreground mb-4">Outcome Metrics vs Trajectory Metrics</p>
        <div className="space-y-0.5">
          {PROOF_LADDER.map((s,i)=>{
            const state = i<2?"done":i===2?"active":"locked";
            return <ProofStep key={s.label} label={s.label} desc={s.desc} state={state as any}/>;
          })}
        </div>
      </div>

      {/* Phase progress */}
      <div className="space-y-3">
        {PHASES.map(p=>{
          const pct = Math.round((p.done/p.lessons)*100);
          return (
            <div key={p.id} className="bg-card border border-border rounded-xl px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{p.id} — {p.title}</p>
                <span className="font-mono text-xs text-muted-foreground">{p.done}/{p.lessons}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div style={{ width:`${pct}%`, background:p.color.base }} className="h-full rounded-full transition-all"/>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">Artifact: {p.artifact}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen 11: Portfolio ─────────────────────────────────────────────────────

function PortfolioScreen({ go }: { go:(s:Screen)=>void }) {
  const artifacts = [
    { title:"Evaluation Lifecycle Map", lesson:"P1.L1", skill:"Evaluation design", state:"Proved", color:C.green,
      preview:"Documents a complete evaluation lifecycle from question through decision, with named validity threats at each stage." },
    { title:"Model Capability Surface Map", lesson:"P1.L2", skill:"Model typology", state:"Revised", color:C.teal,
      preview:"Maps base, instruction-tuned, code, multimodal, and agentic model types to capability surfaces, metrics, and safety concerns." },
    { title:"Evaluation Vocabulary Card", lesson:"P1.L3", skill:"Benchmark literacy", state:"Built", color:C.blue,
      preview:"Decomposes a benchmark into dataset, task, metric, prompt format, sampling, aggregation, and known validity threats." },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-0.5">SKILLPROOF PORTFOLIO</p>
          <h1 className="text-2xl font-bold text-foreground">Frontier Model Evaluations</h1>
          <p className="text-secondary-foreground text-sm mt-0.5">3 artifacts · Phase 1 of 6 · 28% complete</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground hover:bg-secondary transition-colors">
            <Share2 size={14}/> Share
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground hover:bg-secondary transition-colors">
            <Download size={14}/> Export
          </button>
        </div>
      </div>

      {/* Proof summary */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-foreground mb-3">Skills demonstrated</p>
        <div className="flex flex-wrap gap-2">
          {["Evaluation lifecycle design","Model typology","Benchmark decomposition","Validity analysis","Source-backed reasoning"].map(s=>(
            <Badge key={s} color={C.blue}>{s}</Badge>
          ))}
        </div>
      </div>

      {/* Artifacts */}
      <div className="space-y-4">
        {artifacts.map(a=>(
          <div key={a.title} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div style={{ background:`linear-gradient(135deg, ${a.color.light}, ${a.color.muted})`, borderBottom:`1px solid ${a.color.border}` }}
              className="px-5 py-4">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge color={a.color}>{a.state}</Badge>
                    <span className="text-xs font-mono text-muted-foreground">{a.lesson}</span>
                  </div>
                  <p className="font-bold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Skill: {a.skill}</p>
                </div>
                <Award size={20} style={{ color:a.color.base }}/>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-secondary-foreground leading-relaxed">{a.preview}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-border transition-colors text-foreground">
                  View artifact
                </button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-border transition-colors text-foreground">
                  Revision history
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl border border-dashed border-border bg-secondary/30 text-center">
        <p className="text-sm text-muted-foreground">Complete Phase 1 to unlock your evaluation rubric and full capstone dossier.</p>
        <button onClick={()=>go("lesson")} className="mt-2 text-sm font-medium text-primary hover:underline flex items-center gap-1 mx-auto">
          Continue learning <ArrowRight size={13}/>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 12: Certificate ───────────────────────────────────────────────────

function CertificateScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
        {/* Header band */}
        <div style={{ background:`linear-gradient(135deg, #1e3a8a, ${C.blue.base}, #0e7490)` }} className="px-8 py-10 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={30} className="text-white"/>
          </div>
          <p className="font-mono text-xs opacity-60 tracking-widest mb-2">SKILLPROOF CERTIFICATE</p>
          <h1 className="text-2xl font-bold mb-1">Frontier Model Evaluations</h1>
          <p className="opacity-70 text-sm">Phase 1 — The Paradigm</p>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <p className="text-muted-foreground text-sm mb-2">Awarded to</p>
          <p className="text-2xl font-bold text-foreground mb-1">Ananya Krishnan</p>
          <p className="text-sm text-muted-foreground mb-6">for completing Phase 1 of the Frontier Model Evaluations course on OpenEd</p>

          <div className="grid grid-cols-3 gap-4 mb-7">
            {[{ v:"6", l:"Lessons" },{ v:"3", l:"Artifacts" },{ v:"6 hrs", l:"Learning" }].map(({v,l})=>(
              <div key={l} style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl py-3">
                <p className="text-lg font-bold" style={{ color:C.blue.base }}>{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mb-6">Skills demonstrated: Evaluation lifecycle design · Model typology · Benchmark decomposition · Validity analysis</p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button style={{ background:C.blue.base }} className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Download size={14}/> Download PDF
            </button>
            <button className="px-6 py-2.5 rounded-xl text-sm border border-border bg-card hover:bg-secondary transition-colors text-foreground flex items-center gap-2">
              <Share2 size={14}/> Share portfolio
            </button>
          </div>

          <button onClick={()=>go("path")} className="mt-5 text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
            Continue to Phase 2 — Harness Engineering <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Screen; label: string; Icon: React.FC<any>; auth: boolean }[] = [
  { id:"preview",     label:"Course preview", Icon:Eye,            auth:false },
  { id:"dashboard",   label:"Dashboard",      Icon:LayoutDashboard,auth:true  },
  { id:"path",        label:"Learning path",  Icon:Map,            auth:true  },
  { id:"overview",    label:"Phase overview", Icon:GraduationCap,  auth:true  },
  { id:"lesson",      label:"Lesson",         Icon:BookOpen,       auth:true  },
  { id:"artifact",    label:"Artifacts",      Icon:Package,        auth:true  },
  { id:"progress",    label:"Progress",       Icon:Target,         auth:true  },
  { id:"portfolio",   label:"Portfolio",      Icon:Award,          auth:true  },
  { id:"certificate", label:"Certificate",    Icon:Star,           auth:true  },
];

const BOTTOM_NAV: { id: Screen; label: string; Icon: React.FC<any> }[] = [
  { id:"dashboard", label:"Home",    Icon:LayoutDashboard },
  { id:"lesson",    label:"Learn",   Icon:BookOpen },
  { id:"artifact",  label:"Build",   Icon:Package },
  { id:"portfolio", label:"Proof",   Icon:Award },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("preview");
  const [dark, setDark] = useState(false);
  const [vp, setVp] = useState<Viewport>("desktop");
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function go(s: Screen) {
    if (s!=="preview" && s!=="auth" && !authed) { setScreen("auth"); return; }
    if (s==="dashboard"||s==="path"||s==="overview"||s==="lesson"||s==="artifact"||s==="progress"||s==="portfolio"||s==="certificate") setAuthed(true);
    setScreen(s);
  }

  const isMobile = vp==="mobile";
  const isDesktop = vp==="desktop";
  const isAuth = screen==="auth"||screen==="onboard";
  const showShell = authed && !isAuth && screen!=="preview";

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground" style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      {/* ── Global header ── */}
      <header className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-40">
        {showShell && !isMobile && (
          <button onClick={()=>setSidebarOpen(o=>!o)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors mr-1">
            <Menu size={16} className="text-muted-foreground"/>
          </button>
        )}
        <div className="flex items-center gap-2 mr-2">
          <div style={{ background:C.blue.base }} className="w-6 h-6 rounded flex items-center justify-center">
            <BookOpen size={12} color="white"/>
          </div>
          <span className="font-bold text-sm text-foreground">OpenEd</span>
        </div>

        {/* Screen nav — scrollable */}
        {!showShell && (
          <nav className="flex gap-0.5 overflow-x-auto flex-1">
            {[{ id:"preview" as Screen, l:"Preview" },{ id:"auth" as Screen, l:"Auth" },{ id:"onboard" as Screen, l:"Onboard" },{ id:"library" as Screen, l:"Library" }].map(({ id,l })=>(
              <button key={id} onClick={()=>setScreen(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0
                  ${screen===id?"bg-foreground text-background":"text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {l}
              </button>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          {/* Viewport toggle */}
          <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
            {([["mobile",Smartphone],["tablet",Tablet],["desktop",Monitor]] as [Viewport, React.FC<any>][]).map(([v,Icon])=>(
              <button key={v} onClick={()=>setVp(v)}
                className={`px-2.5 py-1.5 transition-colors ${vp===v?"bg-foreground text-background":"hover:bg-secondary text-muted-foreground"}`}>
                <Icon size={13}/>
              </button>
            ))}
          </div>
          {/* Dark toggle */}
          <button onClick={()=>setDark(d=>!d)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            {dark ? <Sun size={14} className="text-muted-foreground"/> : <Moon size={14} className="text-muted-foreground"/>}
          </button>
          {authed && (
            <div style={{ background:C.blue.base }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          )}
        </div>
      </header>

      {/* ── Main body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar — shell screens only, desktop/tablet */}
        {showShell && !isMobile && (
          <aside className={`border-r border-border bg-card flex-shrink-0 flex flex-col transition-all duration-200 ${sidebarOpen ? "w-48" : "w-14"}`}>
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.filter(n=>n.auth).map(({ id, label, Icon })=>(
                <button key={id} onClick={()=>go(id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all
                    ${screen===id?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <Icon size={16} className="flex-shrink-0"/>
                  {sidebarOpen && <span className="text-sm font-medium truncate">{label}</span>}
                </button>
              ))}
            </nav>
            {/* Course progress mini */}
            {sidebarOpen && (
              <div className="m-2 p-3 rounded-xl border border-border bg-background">
                <p className="font-mono text-[9px] tracking-widest text-muted-foreground mb-1.5">FME PROGRESS</p>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-1">
                  <div style={{ width:"28%", background:C.blue.base }} className="h-full rounded-full"/>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">28% · Phase 1</p>
              </div>
            )}
          </aside>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          {screen==="preview"     && <PreviewScreen go={go}/>}
          {screen==="auth"        && <AuthScreen go={s=>{ setAuthed(true); go(s); }}/>}
          {screen==="onboard"     && <OnboardScreen go={go}/>}
          {screen==="library"     && <LibraryScreen go={go}/>}
          {screen==="dashboard"   && <DashboardScreen go={go}/>}
          {screen==="path"        && <PathScreen go={go}/>}
          {screen==="overview"    && <OverviewScreen go={go}/>}
          {screen==="lesson"      && <LessonScreen go={go} vp={vp}/>}
          {screen==="artifact"    && <ArtifactScreen go={go}/>}
          {screen==="progress"    && <ProgressScreen go={go}/>}
          {screen==="portfolio"   && <PortfolioScreen go={go}/>}
          {screen==="certificate" && <CertificateScreen go={go}/>}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {showShell && isMobile && (
        <nav className="border-t border-border bg-card flex justify-around px-2 py-2 flex-shrink-0">
          {BOTTOM_NAV.map(({ id, label, Icon })=>(
            <button key={id} onClick={()=>go(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${screen===id?"":""}`}>
              <Icon size={20} style={{ color:screen===id?C.blue.base:"var(--muted-foreground)" }}/>
              <span className="text-[9px] font-medium" style={{ color:screen===id?C.blue.base:"var(--muted-foreground)" }}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
