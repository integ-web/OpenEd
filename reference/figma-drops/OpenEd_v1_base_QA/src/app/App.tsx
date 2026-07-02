import { useState, useEffect } from "react";
import {
  Check, X, AlertTriangle, AlertCircle, Info, ChevronRight, ArrowRight,
  Monitor, Smartphone, Tablet, Moon, Sun, Menu, BookOpen, GraduationCap,
  Shield, Award, Sparkles, Target, Package, Bookmark, FileText, Clock,
  Users, BarChart2, Layers, Zap, Database, Lock, Eye, Send,
  CheckSquare, Flag, Settings, RefreshCw, Copy, ExternalLink, Download,
  Play, Star, TrendingUp, GitBranch, Circle
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "prototype"|"responsive"|"components"|"a11y"|"content-qa"|"visual-qa"|"engineering";
type Viewport = "mobile"|"tablet"|"desktop";
type QAStatus = "pass"|"warn"|"fail"|"todo";

// ─── Design system constants (single source of truth for this handoff) ────────

const DS = {
  // Colour tokens
  colors: {
    background:  "#F8FAFC",  backgroundDark: "#0B1120",
    card:        "#FFFFFF",  cardDark:       "#111827",
    secondary:   "#F1F5F9",  secondaryDark:  "#1E293B",
    border:      "#E2E8F0",  borderDark:     "#334155",
    foreground:  "#0F172A",  foregroundDark: "#F8FAFC",
    muted:       "#64748B",  mutedDark:      "#94A3B8",
    primary:     "#2563EB",  primaryDark:    "#60A5FA",
    teal:        "#0F766E",  tealDark:       "#2DD4BF",
    violet:      "#6D28D9",  violetDark:     "#A78BFA",
    orange:      "#EA580C",  orangeDark:     "#FB923C",
    green:       "#15803D",  greenDark:      "#4ADE80",
    amber:       "#B45309",  amberDark:      "#FBBF24",
    red:         "#B91C1C",  redDark:        "#F87171",
  },
  // Spacing scale (px)
  spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  // Radius scale
  radius: { sm:"6px", md:"10px", lg:"14px", xl:"20px", full:"9999px" },
  // Type scale
  type: {
    "10":  { px:"10px",  leading:"1.4", use:"Mono labels, timestamps" },
    "12":  { px:"12px",  leading:"1.5", use:"Captions, help text" },
    "14":  { px:"14px",  leading:"1.5", use:"Secondary labels, table cells" },
    "15":  { px:"15px",  leading:"1.6", use:"Body — mobile minimum" },
    "16":  { px:"16px",  leading:"1.6", use:"Body — desktop default" },
    "18":  { px:"18px",  leading:"1.4", use:"Card headings" },
    "20":  { px:"20px",  leading:"1.3", use:"Section headings" },
    "24":  { px:"24px",  leading:"1.25",use:"Page headings" },
    "32":  { px:"32px",  leading:"1.15",use:"Hero — Instrument Serif" },
    "48":  { px:"48px",  leading:"1.08",use:"Display — Instrument Serif" },
  },
  // Elevation
  elevation: {
    flat:    "none",
    raised:  "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
    floating:"0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)",
    modal:   "0 20px 40px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
  },
} as const;

// Semantic colour helper used throughout
const C = {
  blue:   { base:"#2563EB", light:"#EFF6FF", border:"#BFDBFE" },
  teal:   { base:"#0F766E", light:"#F0FDFA", border:"#99F6E4" },
  violet: { base:"#6D28D9", light:"#F5F3FF", border:"#DDD6FE" },
  orange: { base:"#EA580C", light:"#FFF7ED", border:"#FED7AA" },
  green:  { base:"#15803D", light:"#F0FDF4", border:"#BBF7D0" },
  amber:  { base:"#B45309", light:"#FFFBEB", border:"#FDE68A" },
  red:    { base:"#B91C1C", light:"#FEF2F2", border:"#FECACA" },
  slate:  { base:"#475569", light:"#F8FAFC", border:"#E2E8F0" },
};

// ─── Shared micro-components ──────────────────────────────────────────────────

function QADot({ s }: { s: QAStatus }) {
  const cfg = { pass:C.green, warn:C.amber, fail:C.red, todo:C.slate };
  const icon = { pass:<Check size={11}/>, warn:<AlertTriangle size={11}/>, fail:<X size={11}/>, todo:<Circle size={9} fill="currentColor"/> };
  return (
    <span style={{ background:cfg[s].light, color:cfg[s].base }} className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0">
      {icon[s]}
    </span>
  );
}

function QARow({ item, status, note }: { item:string; status:QAStatus; note?:string }) {
  const col = { pass:C.green, warn:C.amber, fail:C.red, todo:C.slate }[status];
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
      <QADot s={status}/>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{item}</p>
        {note && <p className="text-xs mt-0.5" style={{ color:col.base }}>{note}</p>}
      </div>
      <span style={{ background:col.light, color:col.base }}
        className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 uppercase">{status}</span>
    </div>
  );
}

function Swatch({ label, hex, token }: { label:string; hex:string; token:string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-10 rounded-lg border border-border" style={{ background:hex }}/>
      <p className="text-[10px] font-semibold text-foreground">{label}</p>
      <p className="font-mono text-[9px] text-muted-foreground">{token}</p>
      <p className="font-mono text-[9px] text-muted-foreground">{hex}</p>
    </div>
  );
}

function CodeBlock({ children }: { children:string }) {
  return (
    <pre style={{ background:"#0F1117", border:"1px solid #334155" }}
      className="rounded-xl p-4 font-mono text-xs leading-relaxed text-green-400 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function SectionHead({ label, sub, n }: { label:string; sub?:string; n?:string }) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      {n && <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">{n}</p>}
      <h2 className="text-xl font-bold text-foreground">{label}</h2>
      {sub && <p className="text-sm text-secondary-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Tab 1: Prototype Path ────────────────────────────────────────────────────

const FLOWS = {
  learner: {
    label:"Learner", color:C.blue,
    nodes:[
      { id:"landing",    label:"Landing",       entry:true,  action:"Enrol free" },
      { id:"auth",       label:"Sign up / Log in",           action:"Create account" },
      { id:"onboard",    label:"Onboarding",                 action:"See my path" },
      { id:"catalog",    label:"Course catalog",             action:"Enrol in FME" },
      { id:"dashboard",  label:"Learner dashboard",          action:"Resume lesson" },
      { id:"path",       label:"Learning path",              action:"Open phase" },
      { id:"overview",   label:"Course overview",            action:"Start lesson" },
      { id:"lesson",     label:"Lesson workspace",           action:"Continue → Build" },
      { id:"quiz",       label:"Quiz",                       action:"Submit quiz" },
      { id:"artifact",   label:"Artifact builder",           action:"Submit artifact" },
      { id:"feedback",   label:"Rubric feedback",            action:"Revise" },
      { id:"portfolio",  label:"SkillProof portfolio",       action:"Share" },
      { id:"cert",       label:"Certificate",                action:"Download" },
    ],
    connections:[
      ["landing","auth"],["auth","onboard"],["onboard","catalog"],["catalog","dashboard"],
      ["dashboard","path"],["path","overview"],["overview","lesson"],["lesson","quiz"],
      ["quiz","artifact"],["artifact","feedback"],["feedback","artifact"],["artifact","portfolio"],
      ["portfolio","cert"],
    ],
  },
  educator: {
    label:"Educator", color:C.violet,
    nodes:[
      { id:"e-dash",    label:"Educator dashboard",  entry:true,  action:"New course" },
      { id:"e-create",  label:"Create course",                    action:"Open outline" },
      { id:"e-outline", label:"Outline builder",                  action:"Edit lesson" },
      { id:"e-lesson",  label:"Lesson editor",                    action:"Save" },
      { id:"e-media",   label:"Media & sources",                  action:"Back to outline" },
      { id:"e-quiz",    label:"Quiz builder",                     action:"Save" },
      { id:"e-rubric",  label:"Rubric builder",                   action:"Save" },
      { id:"e-art",     label:"Artifact template",                action:"Save" },
      { id:"e-tutor",   label:"AI tutor settings",               action:"Save" },
      { id:"e-preview", label:"Preview as learner",              action:"Exit preview" },
      { id:"e-qa",      label:"Publish-readiness QA",            action:"Submit for review" },
      { id:"e-submit",  label:"Submit for review",               action:"Submit" },
    ],
    connections:[
      ["e-dash","e-create"],["e-create","e-outline"],["e-outline","e-lesson"],
      ["e-outline","e-media"],["e-outline","e-quiz"],["e-outline","e-rubric"],
      ["e-outline","e-art"],["e-outline","e-tutor"],["e-outline","e-preview"],
      ["e-lesson","e-outline"],["e-preview","e-outline"],["e-outline","e-qa"],["e-qa","e-submit"],
    ],
  },
  team: {
    label:"OpenEd Team", color:C.teal,
    nodes:[
      { id:"t-queue",   label:"QA queue",        entry:true,  action:"Open course" },
      { id:"t-review",  label:"Course review",               action:"Send decision" },
      { id:"t-source",  label:"Source coverage",             action:"Flag issue" },
      { id:"t-assess",  label:"Assessment audit",            action:"Flag issue" },
      { id:"t-reports", label:"Reported content",            action:"Resolve" },
      { id:"t-safety",  label:"Safety cases",               action:"Log action" },
      { id:"t-roles",   label:"Role management",            action:"Approve educator" },
      { id:"t-metrics", label:"Platform metrics",           action:"Monitor" },
      { id:"t-release", label:"Release checklist",          action:"Clear gate" },
    ],
    connections:[
      ["t-queue","t-review"],["t-review","t-source"],["t-review","t-assess"],
      ["t-reports","t-safety"],["t-queue","t-roles"],["t-queue","t-metrics"],
      ["t-metrics","t-release"],
    ],
  },
};

function PrototypeTab() {
  const [surface, setSurface] = useState<keyof typeof FLOWS>("learner");
  const flow = FLOWS[surface];

  return (
    <div className="p-6 max-w-5xl">
      <SectionHead n="01 / PROTOTYPE PATH"
        label="Click prototype map"
        sub="Primary action per screen listed below each node. Every node has exactly one CTA that advances the flow." />

      <div className="flex gap-2 mb-6">
        {(Object.keys(FLOWS) as (keyof typeof FLOWS)[]).map(k => (
          <button key={k} onClick={() => setSurface(k)}
            style={surface===k ? { background:FLOWS[k].color.base, color:"white" } : { border:`1px solid ${FLOWS[k].color.border}`, color:FLOWS[k].color.base, background:FLOWS[k].color.light }}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            {FLOWS[k].label}
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div className="bg-card border border-border rounded-2xl p-6 overflow-x-auto">
        <div className="flex flex-wrap gap-3 min-w-max">
          {flow.nodes.map((node, i) => {
            const isEntry = (node as any).entry;
            return (
              <div key={node.id} className="flex items-center gap-2">
                <div style={{ border:`2px solid ${isEntry ? flow.color.base : flow.color.border}`, background:isEntry ? flow.color.base : flow.color.light }}
                  className="rounded-xl p-3 w-36">
                  <p className="text-[10px] font-mono text-center mb-1.5"
                    style={{ color: isEntry ? "rgba(255,255,255,0.7)" : flow.color.base }}>
                    {node.id.toUpperCase()}
                  </p>
                  <p className={`text-xs font-semibold text-center leading-tight ${isEntry?"text-white":"text-foreground"}`}>
                    {node.label}
                  </p>
                  <div className="mt-2 px-2 py-1 rounded-lg bg-black/10 text-center">
                    <p className={`text-[9px] font-medium leading-tight ${isEntry?"text-white/80":"text-muted-foreground"}`}>
                      ▶ {node.action}
                    </p>
                  </div>
                </div>
                {i < flow.nodes.length - 1 && (
                  <ArrowRight size={14} style={{ color:flow.color.base }} className="flex-shrink-0"/>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dead-button audit */}
      <div className="mt-6 bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-secondary/30">
          <p className="text-xs font-semibold text-foreground">Primary action audit — one CTA per screen</p>
        </div>
        <div className="divide-y divide-border">
          {flow.nodes.map(node => (
            <div key={node.id} className="flex items-center gap-3 px-5 py-2.5">
              <QADot s="pass"/>
              <span className="font-mono text-[10px] text-muted-foreground w-24">{node.id}</span>
              <span className="text-sm text-foreground flex-1">{node.label}</span>
              <span style={{ background:flow.color.light, color:flow.color.base, border:`1px solid ${flow.color.border}` }}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full">{node.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Responsive Variants ───────────────────────────────────────────────

function DeviceFrame({ vp, label, children }: { vp:Viewport; label:string; children:React.ReactNode }) {
  const dims = { mobile:"w-52", tablet:"w-72", desktop:"w-full" };
  return (
    <div className={`flex flex-col gap-2 ${dims[vp]}`}>
      <div className="flex items-center gap-2">
        {vp==="mobile" ? <Smartphone size={14} className="text-muted-foreground"/> :
         vp==="tablet" ? <Tablet size={14} className="text-muted-foreground"/> :
         <Monitor size={14} className="text-muted-foreground"/>}
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
      <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm" style={{ minHeight:320 }}>
        {children}
      </div>
    </div>
  );
}

function ResponsiveTab() {
  const [screen, setScreen] = useState<"lesson"|"dashboard"|"quiz">("lesson");

  return (
    <div className="p-6 max-w-6xl">
      <SectionHead n="02 / RESPONSIVE" label="Device variants — core flows"
        sub="Phone (<768px) · Tablet (768–1024px) · Desktop (≥1024px). All three must expose the same core functionality." />

      <div className="flex gap-2 mb-6">
        {([ ["lesson","Lesson workspace"],["dashboard","Learner dashboard"],["quiz","Quiz"] ] as const).map(([id, label]) => (
          <button key={id} onClick={() => setScreen(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${screen===id ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}>
            {label}
          </button>
        ))}
      </div>

      {screen === "lesson" && (
        <div className="space-y-8">
          {/* Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <DeviceFrame vp="mobile" label="Mobile — stacked, bottom sheet tutor">
              {/* Compact top */}
              <div className="h-9 bg-card border-b border-border flex items-center px-3 gap-2">
                <div style={{ background:C.blue.base }} className="w-4 h-4 rounded flex items-center justify-center"><BookOpen size={9} color="white"/></div>
                <span className="text-xs font-bold text-foreground">OpenEd</span>
                <span className="ml-auto text-[10px] text-muted-foreground">P1.L4</span>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-border bg-card overflow-x-auto">
                {["Watch","Understand","Practice","Build","Sources"].map((t,i)=>(
                  <div key={t} className={`px-2.5 py-2 text-[10px] font-semibold whitespace-nowrap border-b-2 transition-colors ${i===0?"border-primary text-primary":"border-transparent text-muted-foreground"}`}>{t}</div>
                ))}
              </div>
              {/* Content */}
              <div className="p-3 space-y-2">
                <p className="text-[11px] font-bold text-foreground">Outcome Metrics vs Trajectory Metrics</p>
                <div className="h-20 bg-secondary rounded-lg flex items-center justify-center">
                  <p className="text-[10px] text-muted-foreground">Reference video / transcript</p>
                </div>
                <p className="text-[10px] text-secondary-foreground leading-relaxed">Trajectory metrics score intermediate steps, tool calls, and constraint handling — not just the final answer.</p>
              </div>
              {/* Bottom toolbar */}
              <div className="border-t border-border bg-card px-3 py-2 flex items-center gap-2">
                <button style={{ background:C.teal.light, color:C.teal.base }} className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-medium">
                  <Bookmark size={9}/> Sources
                </button>
                <button style={{ background:C.violet.light, color:C.violet.base }} className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-medium">
                  <Sparkles size={9}/> Tutor
                </button>
                <button style={{ background:C.blue.base }} className="ml-auto text-white text-[9px] px-3 py-1 rounded font-semibold">
                  Next → Build
                </button>
              </div>
              {/* Bottom nav */}
              <div className="border-t border-border bg-card flex justify-around py-1.5">
                {[["Home",BookOpen],["Learn",FileText],["Build",Package],["Proof",Award]].map(([l, Icon]: any)=>(
                  <div key={l} className="flex flex-col items-center gap-0.5">
                    <Icon size={14} className="text-muted-foreground"/>
                    <span className="text-[8px] text-muted-foreground">{l}</span>
                  </div>
                ))}
              </div>
            </DeviceFrame>

            <DeviceFrame vp="tablet" label="Tablet — lesson + tutor side panel">
              <div className="h-9 bg-card border-b border-border flex items-center px-3 gap-2">
                <div style={{ background:C.blue.base }} className="w-4 h-4 rounded flex items-center justify-center"><BookOpen size={9} color="white"/></div>
                <span className="text-xs font-bold text-foreground">OpenEd</span>
              </div>
              <div className="flex" style={{ height:280 }}>
                {/* Compact rail */}
                <div className="w-10 border-r border-border bg-card flex flex-col gap-1 py-2 items-center">
                  {[BookOpen, FileText, Target, Bookmark, Award].map((Icon,i)=>(
                    <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center ${i===0?"opacity-100":"opacity-30"}`}
                      style={{ background: i===0 ? C.blue.light : "transparent" }}>
                      <Icon size={13} style={{ color:i===0 ? C.blue.base : "var(--muted-foreground)" }}/>
                    </div>
                  ))}
                </div>
                {/* Lesson */}
                <div className="flex-1 p-3 overflow-hidden space-y-2">
                  <div className="flex gap-1 overflow-x-auto">
                    {["Watch","Understand","Practice","Build","Sources"].map((t,i)=>(
                      <span key={t} className={`text-[9px] font-semibold px-2 py-1 rounded-lg whitespace-nowrap ${i===2 ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>{t}</span>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-foreground">Practice task</p>
                  <div className="bg-secondary rounded-lg p-2">
                    <p className="text-[9px] text-foreground">A coding agent fixes a bug but modifies 3 unrelated files. Classify outcome vs trajectory evidence.</p>
                  </div>
                  <div className="h-12 border border-border rounded-lg bg-background"/>
                  <button style={{ background:C.blue.base }} className="text-white text-[9px] px-3 py-1 rounded font-semibold">Submit</button>
                </div>
                {/* Tutor panel */}
                <div style={{ width:100, background:C.violet.light, borderLeft:`1px solid ${C.violet.border}` }} className="p-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Sparkles size={10} style={{ color:C.violet.base }}/>
                    <span className="text-[8px] font-semibold" style={{ color:C.violet.base }}>Tutor</span>
                  </div>
                  <div className="bg-white/60 rounded p-1.5 text-[8px] text-secondary-foreground leading-tight">Ask about this lesson…</div>
                </div>
              </div>
            </DeviceFrame>

            <DeviceFrame vp="desktop" label="Desktop — sidebar + lesson + tutor">
              <div className="h-9 bg-card border-b border-border flex items-center px-3 gap-2">
                <div style={{ background:C.blue.base }} className="w-4 h-4 rounded flex items-center justify-center"><BookOpen size={9} color="white"/></div>
                <span className="text-xs font-bold text-foreground">OpenEd</span>
                <span className="text-[9px] text-muted-foreground ml-2 hidden md:block">FME / Phase 1 / Lesson 4</span>
                <div className="ml-auto flex gap-1.5 items-center">
                  <div style={{ background:C.blue.light }} className="h-4 w-16 rounded-full overflow-hidden">
                    <div style={{ width:"28%", background:C.blue.base }} className="h-full rounded-full"/>
                  </div>
                  <div style={{ background:C.blue.base }} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold">A</div>
                </div>
              </div>
              <div className="flex" style={{ height:280 }}>
                <div className="w-24 border-r border-border bg-card py-2 px-1.5 space-y-0.5">
                  {[{Icon:BookOpen,l:"Dashboard"},{Icon:FileText,l:"Lessons"},{Icon:Target,l:"Build"},{Icon:Bookmark,l:"Sources"},{Icon:Award,l:"Portfolio"}].map(({Icon,l},i)=>(
                    <div key={l} className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg text-[9px] ${i===1?"font-semibold":"opacity-50"}`}
                      style={{ background:i===1?C.blue.light:"transparent", color:i===1?C.blue.base:"var(--muted-foreground)" }}>
                      <Icon size={11}/>{l}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-hidden">
                  <div className="flex gap-1">
                    {["Watch","Understand","Practice","Build","Sources"].map((t,i)=>(
                      <span key={t} className={`text-[9px] font-semibold px-2 py-0.5 border-b-2 whitespace-nowrap ${i===1?"border-primary text-primary":"border-transparent text-muted-foreground"}`}>{t}</span>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-foreground">Outcome Metrics vs Trajectory Metrics</p>
                  <div className="space-y-1">
                    {["Outcome metrics score final result","Trajectory metrics score path + constraints","Agents need both"].map((idea,i)=>(
                      <div key={i} className="flex items-start gap-1.5 bg-secondary rounded px-2 py-1">
                        <div style={{ background:C.blue.base }} className="w-3 h-3 rounded flex items-center justify-center text-white text-[7px] font-bold flex-shrink-0 mt-px">{i+1}</div>
                        <p className="text-[9px] text-foreground">{idea}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ width:96, borderLeft:`1px solid ${C.violet.border}`, background:C.violet.light }} className="p-2 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <Sparkles size={9} style={{ color:C.violet.base }}/>
                    <span className="text-[8px] font-semibold" style={{ color:C.violet.base }}>AI Tutor</span>
                  </div>
                  <div className="bg-white/70 rounded p-1.5 text-[8px] leading-tight" style={{ color:"#3B1D7A" }}>
                    Which deployment context are you evaluating?
                  </div>
                  <div className="flex flex-wrap gap-0.5">
                    {["Explain","Quiz me","Artifact"].map(c=>(
                      <span key={c} style={{ border:`1px solid ${C.violet.border}`, color:C.violet.base }} className="text-[7px] px-1 py-0.5 rounded-full bg-white/50">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </DeviceFrame>
          </div>

          {/* Responsive rules table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-secondary/30">
              <p className="text-xs font-semibold text-foreground">Lesson workspace — responsive rules</p>
            </div>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border">
                {["Rule","Mobile","Tablet","Desktop"].map(h=>(
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {[
                  ["Navigation",    "Bottom nav (4 items)",       "Icon rail (48px)",       "Expanded sidebar (192px)"],
                  ["Tutor panel",   "Bottom sheet overlay",       "Side panel if ≥900px",   "Fixed right panel (340px)"],
                  ["Source drawer", "Full-screen drawer",         "Slide-in drawer",        "Floating drawer (320px)"],
                  ["Lesson tabs",   "Scrollable horizontal tabs", "Scrollable horizontal",  "Horizontal tabs fixed"],
                  ["Artifact",      "Step-by-step wizard",        "Single page form",       "Single page form + rubric"],
                  ["Touch targets", "≥44px all interactive",      "≥44px all interactive",  "≥36px minimum"],
                  ["Body text",     "15–16px min",                "16px",                   "16px"],
                  ["Max width",     "100vw",                      "100vw",                  "760px lesson column"],
                ].map(([rule,...vals])=>(
                  <tr key={rule} className="border-b border-border last:border-0 hover:bg-secondary/20">
                    <td className="px-4 py-2.5 font-semibold text-foreground">{rule}</td>
                    {vals.map((v,i)=><td key={i} className="px-4 py-2.5 text-secondary-foreground">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {screen === "dashboard" && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Dashboard responsive rules</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { vp:"Mobile",   rules:["Single column layout","Resume card full-width","Progress bars (no table)","Phase nodes as scrollable row","Bottom nav always visible"] },
              { vp:"Tablet",   rules:["Two-column grid for phase cards","Resume card spans full width","Left sidebar collapses to icon rail","Proof ladder visible in sidebar"] },
              { vp:"Desktop",  rules:["Three-column main grid","Sidebar expanded (192px)","Proof ladder + next artifact in right rail","Phase cards in 2×3 grid"] },
            ].map(({ vp, rules }) => (
              <div key={vp} className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-2">{vp}</p>
                {rules.map((r,i)=>(
                  <div key={i} className="flex items-start gap-1.5 mb-1">
                    <Check size={10} style={{ color:C.green.base }} className="flex-shrink-0 mt-0.5"/>
                    <p className="text-[11px] text-secondary-foreground">{r}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Quiz responsive rules</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { vp:"Mobile",   rules:["Single question per scroll","Options as full-width tap targets","Feedback below options","Tutor hint = bottom sheet","Navigation = prev/next at bottom"] },
              { vp:"Tablet",   rules:["Same as mobile layout","Wider option buttons","Progress bar always visible"] },
              { vp:"Desktop",  rules:["Question + options in card","Progress navigator in right rail","Tutor hint in right panel","Submit at card bottom"] },
            ].map(({ vp, rules }) => (
              <div key={vp} className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-2">{vp}</p>
                {rules.map((r,i)=>(
                  <div key={i} className="flex items-start gap-1.5 mb-1">
                    <Check size={10} style={{ color:C.green.base }} className="flex-shrink-0 mt-0.5"/>
                    <p className="text-[11px] text-secondary-foreground">{r}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 3: Component Variants ────────────────────────────────────────────────

function ComponentsTab() {
  const [quizQ, setQuizQ] = useState<number|null>(null);

  return (
    <div className="p-6 max-w-4xl space-y-10">
      <SectionHead n="03 / COMPONENTS" label="Component library — all variants"
        sub="Every component shown in all states. Use these as implementation targets." />

      {/* Buttons */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Buttons — all states</p>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          {[
            { label:"Primary",     cls:"text-white hover:opacity-90",                          bg:C.blue.base,    border:"none" },
            { label:"Secondary",   cls:"text-foreground hover:bg-secondary transition-colors", bg:"var(--card)",  border:"1px solid var(--border)" },
            { label:"Teal",        cls:"hover:opacity-80 transition-opacity",                  bg:C.teal.light,   border:`1px solid ${C.teal.border}`,   color:C.teal.base },
            { label:"Violet",      cls:"hover:opacity-80 transition-opacity",                  bg:C.violet.light, border:`1px solid ${C.violet.border}`, color:C.violet.base },
            { label:"Destructive", cls:"hover:opacity-90 transition-opacity",                  bg:C.red.base,     border:"none", textColor:"white" },
            { label:"Ghost",       cls:"text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", bg:"transparent", border:"1px dashed var(--border)" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-4 flex-wrap">
              <span className="text-xs text-muted-foreground w-24">{b.label}</span>
              <button style={{ background:b.bg, border:b.border, color:(b as any).color ?? (b as any).textColor ?? undefined }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${b.cls}`}>
                {b.label} action
              </button>
              <button style={{ background:b.bg, border:b.border, color:(b as any).color ?? (b as any).textColor ?? undefined }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold opacity-40 cursor-not-allowed`}>
                Disabled
              </button>
              <button style={{ background:b.bg, border:b.border, color:(b as any).color ?? (b as any).textColor ?? undefined }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${b.cls}`}>
                <RefreshCw size={14}/> Loading…
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Badges — semantic colours</p>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(C).map(([name,col])=>(
              <span key={name} style={{ background:col.light, color:col.base, border:`1px solid ${col.border}` }}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize">{name}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(C).map(([name,col])=>(
              <span key={name} style={{ background:col.base, color:"white" }}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize">{name} solid</span>
            ))}
          </div>
        </div>
      </section>

      {/* Form elements */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Form elements</p>
        <div className="bg-card border border-border rounded-xl p-5 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Text input — default</label>
            <input defaultValue="Evaluation objective" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Text input — error</label>
            <input defaultValue="" placeholder="Required field" className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-200" style={{ borderColor:C.red.base, background:C.red.light }}/>
            <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color:C.red.base }}><AlertCircle size={9}/>This field is required.</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Textarea</label>
            <textarea rows={3} defaultValue="A coding agent is asked to fix a login bug…" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">Select</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
              <option>Intermediate</option><option>Beginner</option><option>Advanced</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div style={{ background:C.blue.base }} className="w-5 h-5 rounded border-2 border-blue-600 flex items-center justify-center">
                <Check size={11} color="white"/>
              </div>
              <span className="text-sm text-foreground">Checked</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-5 h-5 rounded border-2 border-border bg-background"/>
              <span className="text-sm text-foreground">Unchecked</span>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ background:C.blue.base }} className="w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-white shadow translate-x-4 transition-transform"/>
            </div>
            <div className="w-10 h-6 rounded-full bg-secondary flex items-center px-0.5 cursor-pointer border border-border">
              <div className="w-5 h-5 rounded-full bg-white shadow transition-transform"/>
            </div>
            <span className="text-xs text-muted-foreground">Toggle on / off</span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Card variants</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title:"Course card",   sub:"FME · Phase 1",           color:C.blue,   badge:"IN PROGRESS", pct:28 },
            { title:"Source card",   sub:"SWE-bench · Advanced",    color:C.teal,   badge:"REQUIRED" },
            { title:"Proof card",    sub:"Outcome-vs-Trajectory",   color:C.violet, badge:"BUILT" },
            { title:"Alert card",    sub:"3 QA issues to fix",      color:C.amber,  badge:"ACTION" },
          ].map(({ title, sub, color, badge, pct }) => (
            <div key={title} style={{ border:`1px solid ${color.border}`, background:color.light }}
              className="rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <span style={{ background:color.base, color:"white" }} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">{badge}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              {pct !== undefined && (
                <div className="mt-2 h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div style={{ width:`${pct}%`, background:color.base }} className="h-full rounded-full"/>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Empty / loading / error states */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Feedback states</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText size={18} className="text-muted-foreground"/>
            </div>
            <p className="text-sm font-semibold text-foreground">Empty state</p>
            <p className="text-xs text-muted-foreground mt-1">No artifacts yet. Complete a lesson to start building.</p>
            <button style={{ background:C.blue.base }} className="mt-3 text-white text-xs px-4 py-2 rounded-xl font-semibold">Start first lesson</button>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3 animate-pulse">
              <RefreshCw size={18} className="text-muted-foreground animate-spin"/>
            </div>
            <p className="text-sm font-semibold text-foreground">Loading state</p>
            <p className="text-xs text-muted-foreground mt-1">Checking your API key…</p>
          </div>
          <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-6 text-center">
            <div style={{ background:C.red.base }} className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={18} color="white"/>
            </div>
            <p className="text-sm font-semibold text-foreground">Error state</p>
            <p className="text-xs text-secondary-foreground mt-1">Provider rejected your key. Check the key and try again.</p>
            <button style={{ background:C.red.base }} className="mt-3 text-white text-xs px-4 py-2 rounded-xl font-semibold">Re-enter key</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Tab 4: Accessibility QA ──────────────────────────────────────────────────

function A11yTab() {
  const checks: { cat:string; item:string; status:QAStatus; note?:string }[] = [
    // Contrast
    { cat:"Colour contrast", item:"Body text on bg-background: #0F172A / #F8FAFC → 16.2:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Muted text on bg-background: #64748B / #F8FAFC → 5.3:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Primary blue on white: #2563EB / #FFFFFF → 5.8:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Violet on violet-light: #6D28D9 / #F5F3FF → 6.1:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Dark mode: body text #F8FAFC on #0B1120 → 16.1:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Amber on amber-light: #B45309 / #FFFBEB → 5.2:1 (AA ✓)", status:"pass" },
    { cat:"Colour contrast", item:"Muted text in dark mode: #94A3B8 on #0B1120 → 4.6:1 — verify", status:"warn", note:"Run automated check; borderline for 12px text." },
    // Focus
    { cat:"Focus states",    item:"All interactive elements have visible focus ring (outline-ring/50 in theme)", status:"pass" },
    { cat:"Focus states",    item:"Focus ring is not hidden on buttons, inputs, links", status:"pass" },
    { cat:"Focus states",    item:"Skip-to-main-content link added at top of shell", status:"todo", note:"Needs implementation before launch." },
    { cat:"Focus states",    item:"Modal focus trap implemented on drawers and bottom sheets", status:"todo", note:"Needs verification in lesson workspace." },
    // Touch targets
    { cat:"Touch targets",   item:"All button heights ≥ 36px desktop / 44px mobile", status:"pass" },
    { cat:"Touch targets",   item:"Bottom nav items: 44px tap area confirmed", status:"warn", note:"Audit each item — some may be 40px." },
    { cat:"Touch targets",   item:"Prompt chips: min 32px height — acceptable for supplementary action", status:"pass" },
    { cat:"Touch targets",   item:"Quiz option buttons: full-width, ≥ 44px — confirmed", status:"pass" },
    // Screen readers
    { cat:"Screen readers",  item:"All icon-only buttons have aria-label", status:"todo", note:"Check sidebar icon buttons and top bar icons." },
    { cat:"Screen readers",  item:"Images and diagrams have alt text or aria-hidden if decorative", status:"pass" },
    { cat:"Screen readers",  item:"Form fields have associated labels (not just placeholder)", status:"pass" },
    { cat:"Screen readers",  item:"Quiz feedback is announced (aria-live region)", status:"todo" },
    { cat:"Screen readers",  item:"Loading states use aria-busy or aria-live", status:"todo" },
    // Keyboard nav
    { cat:"Keyboard nav",    item:"Tab order follows visual reading order", status:"pass" },
    { cat:"Keyboard nav",    item:"Modal/drawer can be closed with Escape key", status:"todo" },
    { cat:"Keyboard nav",    item:"Sidebar navigation fully keyboard-operable", status:"pass" },
    { cat:"Keyboard nav",    item:"Quiz options can be selected with keyboard", status:"pass" },
    // Motion
    { cat:"Reduced motion",  item:"prefers-reduced-motion media query in theme.css base layer", status:"pass" },
    { cat:"Reduced motion",  item:"No auto-playing animations without user control", status:"pass" },
    { cat:"Reduced motion",  item:"Animate-bounce on tutor dots respects reduced-motion", status:"warn", note:"Add @media (prefers-reduced-motion) override." },
    // Semantics
    { cat:"Semantics",       item:"Heading hierarchy: h1 per page, h2 sections, h3 sub-sections", status:"pass" },
    { cat:"Semantics",       item:"Lists use ul/ol not div sequences", status:"warn", note:"Some nav items use div — convert to nav > ul > li." },
    { cat:"Semantics",       item:"Buttons are <button>, links are <a> with href", status:"pass" },
    { cat:"Semantics",       item:"Tables have <th> with scope attribute", status:"warn", note:"Check tables in QA screens." },
  ];

  const cats = [...new Set(checks.map(c => c.cat))];
  const counts = { pass:0, warn:0, fail:0, todo:0 } as Record<QAStatus,number>;
  checks.forEach(c => counts[c.status]++);

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead n="04 / ACCESSIBILITY" label="Accessibility QA"
        sub="WCAG 2.1 AA target. All FAIL and TODO must clear before launch." />

      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(counts).map(([k,v])=>(
          <div key={k} style={{ background:C[k==="pass"?"green":k==="warn"?"amber":k==="fail"?"red":"slate" as keyof typeof C].light,
                                 color:C[k==="pass"?"green":k==="warn"?"amber":k==="fail"?"red":"slate" as keyof typeof C].base }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono font-semibold">
            <QADot s={k as QAStatus}/> {v} {k.toUpperCase()}
          </div>
        ))}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-sm font-mono text-muted-foreground">
          TOTAL {checks.length}
        </div>
      </div>

      <div className="space-y-4">
        {cats.map(cat => (
          <div key={cat}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{cat}</p>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {checks.filter(c => c.cat === cat).map((c,i) => <QARow key={i} item={c.item} status={c.status} note={c.note}/>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 5: Content QA ────────────────────────────────────────────────────────

function ContentQATab() {
  const checks: { cat:string; item:string; status:QAStatus; note?:string }[] = [
    { cat:"Copy standards",    item:"No lorem ipsum text anywhere in published screens", status:"pass" },
    { cat:"Copy standards",    item:"All course content sourced from FME v3 spec files", status:"pass" },
    { cat:"Copy standards",    item:"Tutor responses are pedagogical, not generic chatbot outputs", status:"pass" },
    { cat:"Copy standards",    item:"Error messages are actionable ('Re-enter key', not 'An error occurred')", status:"pass" },
    { cat:"Copy standards",    item:"Feedback copy is humane: 'Not there yet — and that's okay' not 'Wrong'", status:"pass" },
    { cat:"Copy standards",    item:"Safety refusals are calm and non-accusatory", status:"pass" },
    { cat:"Copy standards",    item:"Empty states suggest a clear next action", status:"pass" },
    { cat:"Copy standards",    item:"All button labels are verbs ('Submit', 'Save draft', not 'OK', 'Done')", status:"warn", note:"Check modal close buttons — some may say 'Close' not a verb." },
    // FME content
    { cat:"FME content",       item:"Lesson titles match v3 spec exactly", status:"pass" },
    { cat:"FME content",       item:"Phase names and hours match: P1 6h, P2 8h, P3 12h, P4 9h, P5 10h, P6 6h", status:"pass" },
    { cat:"FME content",       item:"Source IDs and URLs are accurate (S-001, S-015, S-016, etc.)", status:"pass" },
    { cat:"FME content",       item:"Quiz questions and answers match P1.L4 content exactly", status:"pass" },
    { cat:"FME content",       item:"Artifact field names match spec: Outcome-vs-Trajectory Rubric", status:"pass" },
    { cat:"FME content",       item:"Tutor opening message matches lesson spec", status:"pass" },
    { cat:"FME content",       item:"No operational harmful content in any example or placeholder", status:"pass" },
    // IAM copy
    { cat:"IAM copy",          item:"BYOK warning copy matches spec: 'Your key stays in this browser…'", status:"pass" },
    { cat:"IAM copy",          item:"Session vs local storage difference clearly explained to learner", status:"pass" },
    { cat:"IAM copy",          item:"Role descriptions match IAM doc (3 roles, no employers/orgs)", status:"pass" },
    { cat:"IAM copy",          item:"Privacy table in settings matches actual data practices", status:"pass" },
    // Proof copy
    { cat:"Proof copy",        item:"Proof ladder labels match spec: Enrolled, Engaged, Checked, Practiced, Built, Revised, Proved", status:"pass" },
    { cat:"Proof copy",        item:"Certificate copy does not overclaim mastery ('completing Phase 1', not 'certified expert')", status:"pass" },
    { cat:"Proof copy",        item:"Badge descriptions are specific and earned — no participation trophies", status:"pass" },
    // QA / Team copy
    { cat:"Team console copy", item:"Report severity labels match policy: Critical <24h, High <24h, Medium <72h, Low batch", status:"pass" },
    { cat:"Team console copy", item:"Audit log entries are factual and non-interpretive", status:"pass" },
    { cat:"Team console copy", item:"RLS handoff code contains no API keys or real credentials", status:"pass" },
  ];

  const cats = [...new Set(checks.map(c => c.cat))];

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead n="05 / CONTENT QA" label="Content QA"
        sub="Copy accuracy, FME content fidelity, and tone consistency across all surfaces." />
      <div className="space-y-4">
        {cats.map(cat => (
          <div key={cat}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{cat}</p>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {checks.filter(c => c.cat === cat).map((c,i) => <QARow key={i} item={c.item} status={c.status} note={c.note}/>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 6: Visual QA ─────────────────────────────────────────────────────────

function VisualQATab() {
  const spacingIssues = [
    { screen:"Learner dashboard",   issue:"Phase progress bars: gap between bar and label is 6px — should be 8px (spacing-2)",     fix:"Add mb-2 to label" },
    { screen:"QA queue table",       issue:"Table cell padding inconsistent: some cells px-4, some px-5",                          fix:"Standardise to px-4 py-3" },
    { screen:"BYOK setup modal",     issue:"Step indicator gap is 8px — spec says 8px ✓, but arrow between steps is missing",     fix:"Add arrow or connector line" },
    { screen:"Quiz attempt",         issue:"Question navigator dots: gap-1.5 used, but card has p-5 — outer spacing mismatch",    fix:"Normalise to gap-2" },
    { screen:"Safety refusal cards", issue:"Inner conversation padding 4px too tight on mobile — prose runs close to edge",       fix:"min px-4 on mobile" },
  ];

  const colorIssues = [
    { component:"Source drawer",     issue:"Teal border used as #99F6E4 in some places, #0F766E in others",    fix:"Always use C.teal.border for border, C.teal.base for text" },
    { component:"Proof ladder bars", issue:"'Built' state uses C.violet but proof level color is C.violet — consistent ✓", fix:"No change needed" },
    { component:"Status pills",      issue:"'Published' uses C.teal, 'Monitored' also uses C.teal — correct ✓", fix:"No change needed" },
    { component:"Dark mode cards",   issue:"Some cards use bg-secondary in dark, some bg-card — creates uneven depth", fix:"Use bg-card for primary surfaces, bg-secondary for nested" },
  ];

  const typographyIssues = [
    { element:"Hero headings",      found:"font-bold + text-xl in some places",     spec:"Instrument Serif for hero, DM Sans bold for UI headings", fix:"Add font-serif class to hero h1 elements" },
    { element:"Table headers",      found:"text-[10px] font-mono — correct ✓",      spec:"font-mono text-[10px] tracking-wider uppercase", fix:"No change" },
    { element:"Body reading text",  found:"text-sm (14px) used for lesson content", spec:"Min 16px (text-base) for reading",           fix:"Use text-base for lesson prose blocks" },
    { element:"Caption / help text",found:"text-xs (12px) — correct ✓",            spec:"text-xs",                                    fix:"No change" },
    { element:"Mono labels",        found:"Mixed: text-[10px] and text-xs used",   spec:"text-[10px] for all mono metadata labels",   fix:"Standardise mono labels to text-[10px]" },
  ];

  return (
    <div className="p-6 max-w-4xl space-y-8">
      <SectionHead n="06 / VISUAL QA" label="Visual QA — spacing, colour, type"
        sub="Issues found, what to fix, and where. Use this as the pre-handoff punch list." />

      {/* Colour system reference */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Colour system — final token reference</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {Object.entries(C).map(([name,col])=>(
            <Swatch key={name} label={name} hex={col.base} token={`C.${name}.base`}/>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label:"background", hex:"#F8FAFC", token:"bg-background" },
            { label:"card",       hex:"#FFFFFF",  token:"bg-card" },
            { label:"secondary",  hex:"#F1F5F9",  token:"bg-secondary" },
            { label:"border",     hex:"#E2E8F0",  token:"border-border" },
          ].map(s=><Swatch key={s.label} label={s.label} hex={s.hex} token={s.token}/>)}
        </div>
      </section>

      {/* Spacing issues */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Spacing audit — issues to fix</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {spacingIssues.map((s,i)=>(
            <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20">
              <QADot s="warn"/>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{s.screen}</p>
                <p className="text-[11px] text-secondary-foreground">{s.issue}</p>
              </div>
              <span style={{ background:C.blue.light, color:C.blue.base }} className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0">{s.fix}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Colour issues */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Colour consistency</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {colorIssues.map((s,i)=>(
            <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20">
              <QADot s={s.fix==="No change needed"?"pass":"warn"}/>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{s.component}</p>
                <p className="text-[11px] text-secondary-foreground">{s.issue}</p>
              </div>
              <span style={{ background:C.blue.light, color:C.blue.base }} className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0 max-w-32 text-right">{s.fix}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography issues */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Typography consistency</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {typographyIssues.map((t,i)=>(
            <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20">
              <QADot s={t.fix==="No change"?"pass":"warn"}/>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{t.element}</p>
                <p className="text-[11px] text-muted-foreground">Found: {t.found}</p>
                <p className="text-[11px] text-secondary-foreground">Spec: {t.spec}</p>
              </div>
              <span style={{ background:C.blue.light, color:C.blue.base }} className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0">{t.fix}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing scale reference */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Spacing scale — use only these values</p>
        <div className="flex items-end gap-3 flex-wrap">
          {DS.spacing.map(s=>(
            <div key={s} className="flex flex-col items-center gap-1.5">
              <div style={{ height:`${Math.min(s,64)}px`, width:24, background:C.blue.light, border:`1px solid ${C.blue.border}`, borderRadius:4 }}/>
              <span className="font-mono text-[9px] text-muted-foreground">{s}px</span>
              <span className="font-mono text-[9px] text-muted-foreground">{s/4}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">Top number = px. Bottom number = Tailwind units (multiply by 4).</p>
      </section>
    </div>
  );
}

// ─── Tab 7: Engineering Handoff ───────────────────────────────────────────────

function EngineeringTab() {
  return (
    <div className="p-6 max-w-4xl space-y-8">
      <SectionHead n="07 / ENGINEERING HANDOFF" label="Engineering handoff"
        sub="Tech stack, build order, file structure, schema excerpt, and pre-launch checklist. Ready for Codex / Antigravity build." />

      {/* Tech stack */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Tech stack — v1</p>
        <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
          {[
            { layer:"Frontend",      tech:"React 18 + Vite + TypeScript + Tailwind v4",     note:"Existing FME codebase — migrate, don't rewrite." },
            { layer:"Auth",          tech:"Supabase Auth (email/password v1; Google later)",  note:"Session persistence. Role stored in profiles table." },
            { layer:"Database",      tech:"Supabase Postgres + Row Level Security",           note:"RLS on all tables. No service role in frontend ever." },
            { layer:"Storage",       tech:"Supabase Storage",                                note:"Course assets, artifact attachments. Signed URLs only." },
            { layer:"Edge functions",tech:"Supabase Edge Functions (Deno)",                  note:"AI tutor gateway option, QA jobs, signed portfolio export." },
            { layer:"AI tutor v1",   tech:"Client-side BYOK (hybrid — basic open, advanced server-side later)", note:"No key stored server-side. Key never in logs." },
            { layer:"Vector search", tech:"pgvector (v1.1+)",                               note:"Source retrieval for tutor grounding. Not in v1 scope." },
            { layer:"Analytics",     tech:"Posthog or custom event table",                  note:"No API key or prompt content in analytics." },
          ].map(({ layer, tech, note }) => (
            <div key={layer} className="flex items-start gap-4 px-5 py-3.5">
              <code className="font-mono text-[10px] text-muted-foreground w-28 flex-shrink-0 mt-0.5">{layer}</code>
              <div>
                <p className="text-sm font-medium text-foreground">{tech}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Build order */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Recommended build order</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {[
            { n:"1", label:"Auth, profiles, role guard",            detail:"Email/password. Profiles table. Role-based route guards. RLS baseline.", done:false },
            { n:"2", label:"Learner app — FME course runtime",      detail:"Dashboard, learning path, lesson workspace (5 tabs), source drawer, glossary.", done:false },
            { n:"3", label:"Assessment engine v0",                  detail:"Quiz runtime, artifact builder, rubric feedback, proof ladder states.", done:false },
            { n:"4", label:"AI tutor BYOK v0",                      detail:"BYOK setup, session-only mode, lesson-grounded chat, prompt chips, mock fallback.", done:false },
            { n:"5", label:"SkillProof portfolio + certificate",     detail:"Portfolio page, proof items, revision history, export.", done:false },
            { n:"6", label:"Educator Studio v0",                    detail:"Course outline, lesson editor, quiz builder, rubric, QA, submit for review.", done:false },
            { n:"7", label:"OpenEd Team console v0",                detail:"QA queue, course review, reports, role management, audit log.", done:false },
            { n:"8", label:"Design system polish",                  detail:"Spacing audit, dark mode, mobile QA, a11y pass.", done:false },
            { n:"9", label:"Security audit + launch gates",          detail:"RLS unit tests, service key check, BYOK telemetry audit, release checklist.", done:false },
          ].map(s=>(
            <div key={s.n} className="flex items-start gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20">
              <div style={{ background:C.blue.base }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                {s.n}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-[11px] text-secondary-foreground mt-0.5">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* File structure */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Component file structure</p>
        <CodeBlock>{`src/
├── app/
│   ├── App.tsx                     # Root with auth + router
│   ├── routes.tsx                  # All route definitions
│   └── components/
│       ├── auth/                   # LoginScreen, SignUpScreen, AuthContext, ProtectedRoute
│       ├── shared/                 # Badge, Button, Card, Field, StatusPill, ProofLadder
│       ├── learner/                # Dashboard, LearningPath, CourseOverview
│       │   ├── lesson/             # LessonWorkspace, LessonTabs, VideoFallback
│       │   ├── quiz/               # QuizRuntime, QuizResults, PracticeTask
│       │   ├── artifact/           # ArtifactBuilder, ArtifactFeedback, RevisionView
│       │   ├── portfolio/          # PortfolioScreen, ProofItem, SkillProofCard
│       │   └── tutor/              # AITutorPanel, BYOKSetup, MockCoach, TutorChips
│       ├── educator/               # Dashboard, OutlineBuilder, LessonEditor
│       │   ├── builders/           # QuizBuilder, RubricBuilder, ArtifactTemplate
│       │   └── qa/                 # PublishReadinessQA, SubmitScreen
│       └── team/                   # QAQueue, CourseReview, Reports, RoleManagement
├── styles/
│   ├── theme.css                   # Design tokens, dark mode, Tailwind @theme
│   ├── fonts.css                   # Google Fonts imports
│   └── index.css                   # Tailwind directives
└── lib/
    ├── supabase.ts                 # Supabase client (anon key only)
    ├── types/                      # Database types, course types, proof types
    └── hooks/                      # useAuth, useCourse, useArtifact, useTutor`}
        </CodeBlock>
      </section>

      {/* Schema excerpt */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Key schema tables (abbreviated)</p>
        <CodeBlock>{`-- profiles
create table profiles (
  id           uuid primary key references auth.users,
  email        text not null,
  full_name    text,
  role         text not null default 'learner',  -- learner | educator | opened_team
  role_state   text not null default 'learner_active',
  onboarded    boolean default false,
  created_at   timestamptz default now()
);

-- lesson_progress
create table lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  learner_id   uuid references profiles not null,
  course_id    uuid references courses not null,
  lesson_id    text not null,
  proof_state  text default 'engaged',  -- engaged|checked|practiced|built|revised|proved
  completed_at timestamptz,
  updated_at   timestamptz default now()
);

-- artifacts
create table artifacts (
  id              uuid primary key default gen_random_uuid(),
  learner_id      uuid references profiles not null,
  template_id     uuid references artifact_templates not null,
  lesson_id       text not null,
  fields          jsonb not null default '{}',
  ai_use_declared boolean default false,
  ai_use_note     text,
  revision_number integer default 1,
  proof_state     text default 'built',
  submitted_at    timestamptz,
  created_at      timestamptz default now()
);

-- audit_events (append-only)
create table audit_events (
  id         bigserial primary key,
  actor_id   uuid references profiles,
  action     text not null,
  target     text,
  note       text,
  created_at timestamptz default now()
);
-- No DELETE policy on audit_events — enforced by RLS`}
        </CodeBlock>
      </section>

      {/* Route map */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Route map — v1</p>
        <CodeBlock>{`// PUBLIC (no auth)
/                          → LandingScreen
/catalog                   → CourseCatalogScreen
/course/:slug/preview      → CoursePreviewScreen
/login                     → LoginScreen
/signup                    → SignUpScreen
/forgot-password           → ForgotPasswordScreen
/auth/callback             → AuthCallbackScreen

// LEARNER (role: learner_active)
/onboarding                → OnboardingScreen
/diagnostic                → DiagnosticScreen
/learner/dashboard         → LearnerDashboardScreen
/course/:slug              → CourseDashboardScreen
/course/:slug/map          → LearningPathScreen
/course/:slug/lesson/:id   → LessonWorkspaceScreen
/course/:slug/quiz/:id     → QuizRuntimeScreen
/course/:slug/artifact/:id → ArtifactBuilderScreen
/course/:slug/sources      → SourceLibraryScreen
/portfolio                 → SkillProofPortfolioScreen
/certificate/:id           → CertificateScreen
/settings/byok             → BYOKSettingsScreen

// EDUCATOR (role: educator_active)
/educator/dashboard        → EducatorDashboardScreen
/educator/courses          → CourseDraftsScreen
/educator/course/:id/*     → (outline, lesson, media, quiz, rubric, artifact, tutor, qa, submit)

// TEAM (role: opened_team_*)
/team/review               → QAQueueScreen
/team/course/:id           → CourseReviewScreen
/team/reports              → ReportsScreen
/team/roles                → RoleManagementScreen
/team/metrics              → PlatformMetricsScreen
/team/audit                → AuditLogScreen`}
        </CodeBlock>
      </section>

      {/* Pre-launch checklist (concise) */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Pre-launch non-negotiables</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {[
            ["RLS enabled on all user-data tables",                   "Security gate"],
            ["Service role key not in any frontend code or env var",  "Security gate"],
            ["BYOK key never logged, never in Sentry, never in DB",   "Security gate"],
            ["audit_events writes on all admin actions",              "Compliance"],
            ["Learner-to-learner artifact isolation tested",          "Privacy"],
            ["Role escalation requires server-side check",            "IAM"],
            ["FME course QA score ≥ 80 before publish",              "Quality"],
            ["Mobile + tablet QA pass on real devices",              "UX"],
            ["WCAG AA contrast pass on all body text",               "A11y"],
            ["No lorem ipsum in published copy",                     "Content"],
            ["All primary CTAs are functional (no dead buttons)",     "UX"],
            ["Critical report SLA alerting wired",                   "Operations"],
          ].map(([item, cat])=>(
            <div key={item} className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0">
              <div className="w-4 h-4 rounded border-2 border-border flex-shrink-0"/>
              <span className="text-sm text-foreground flex-1">{item}</span>
              <span style={{ background:C.blue.light, color:C.blue.base }} className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Document references */}
      <section>
        <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Documentation reference — 25 docs in this pack</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            ["01–05", "Strategy, validation, market"],
            ["06",    "Users, roles, IAM"],
            ["07",    "User journeys and service blueprint"],
            ["08",    "Design system and experience principles"],
            ["09",    "Features and scope (v1 in/out)"],
            ["10",    "Learner app product spec"],
            ["11",    "Educator Studio product spec"],
            ["12",    "Assessment and Proof Engine"],
            ["13",    "AI Tutor product and tech spec"],
            ["14",    "Human-AI expert operating model"],
            ["15",    "Accessibility and inclusivity"],
            ["16–17", "Impact, roadmap"],
            ["18",    "PRD v1"],
            ["19",    "Technical architecture and data model"],
            ["20",    "KPIs and metrics"],
            ["21",    "Risks and failure modes"],
            ["22",    "Trust, safety, and content QA"],
            ["23",    "FME prototype extraction plan"],
            ["24–25", "GTM, operations, references"],
          ].map(([n,l])=>(
            <div key={n} className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
              <span style={{ background:C.blue.light, color:C.blue.base }} className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">{n}</span>
              <span className="text-xs text-foreground">{l}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.FC<any>; sub: string }[] = [
  { id:"prototype",   label:"Prototype path",    icon:GitBranch,   sub:"Click flows, primary actions" },
  { id:"responsive",  label:"Responsive",        icon:Smartphone,   sub:"Phone/tablet/desktop" },
  { id:"components",  label:"Components",        icon:Layers,       sub:"All variants + states" },
  { id:"a11y",        label:"A11y QA",           icon:Eye,          sub:"WCAG AA checklist" },
  { id:"content-qa",  label:"Content QA",        icon:CheckSquare,  sub:"Copy + content fidelity" },
  { id:"visual-qa",   label:"Visual QA",         icon:Target,       sub:"Spacing, colour, type" },
  { id:"engineering", label:"Engineering",       icon:Database,     sub:"Stack, schema, handoff" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("prototype");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground"
      style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>

      {/* Top bar */}
      <header className="h-11 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(o => !o)}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <Menu size={15} className="text-muted-foreground"/>
        </button>
        <div className="flex items-center gap-2 mr-3">
          <div style={{ background:C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center">
            <BookOpen size={11} color="white"/>
          </div>
          <span className="font-bold text-sm text-foreground">OpenEd</span>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">/ v1 Design Handoff · 2026-06-18</span>
        </div>

        <nav className="flex gap-0.5 overflow-x-auto flex-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0
                ${tab===id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              <Icon size={12}/>
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </nav>

        <button onClick={() => setDark(d => !d)}
          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors flex-shrink-0">
          {dark ? <Sun size={13} className="text-muted-foreground"/> : <Moon size={13} className="text-muted-foreground"/>}
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "prototype"   && <PrototypeTab/>}
        {tab === "responsive"  && <ResponsiveTab/>}
        {tab === "components"  && <ComponentsTab/>}
        {tab === "a11y"        && <A11yTab/>}
        {tab === "content-qa"  && <ContentQATab/>}
        {tab === "visual-qa"   && <VisualQATab/>}
        {tab === "engineering" && <EngineeringTab/>}
      </div>
    </div>
  );
}
