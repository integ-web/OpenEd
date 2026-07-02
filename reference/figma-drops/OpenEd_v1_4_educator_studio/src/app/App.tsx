import { useState, useRef, useEffect } from "react";
import {
  BookOpen, LayoutDashboard, FileText, Plus, ChevronRight, ChevronDown,
  Check, AlertCircle, AlertTriangle, Info, X, ArrowRight, ArrowLeft,
  Edit3, Trash2, GripVertical, Eye, Send, CheckCircle2, Clock,
  Users, BarChart2, Star, Settings, Sparkles, Shield, Package,
  Target, Bookmark, ExternalLink, RefreshCw, Lock, Unlock,
  Play, Image, Film, Link, HelpCircle, Award, Moon, Sun,
  Smartphone, Monitor, Tablet, ChevronLeft, Save, Copy, Menu
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "dashboard" | "create" | "outline" | "lesson"
  | "media" | "quiz" | "rubric" | "artifact"
  | "tutor" | "preview" | "qa" | "submit";

type CourseStatus = "draft"|"qa_ready"|"submitted"|"in_review"|"changes_requested"|"approved"|"published";
type QAResult = "pass"|"fail"|"warn"|"skip";

// ─── Design tokens (same system as learner app) ───────────────────────────────

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

// ─── Course status config ─────────────────────────────────────────────────────

const STATUS_CFG: Record<CourseStatus, { label:string; color: typeof C.blue; icon: React.FC<any> }> = {
  draft:              { label:"Draft",               color:C.slate,  icon:Edit3 },
  qa_ready:           { label:"QA ready",            color:C.blue,   icon:CheckCircle2 },
  submitted:          { label:"Submitted",           color:C.violet, icon:Send },
  in_review:          { label:"In review",           color:C.violet, icon:Eye },
  changes_requested:  { label:"Changes requested",  color:C.amber,  icon:AlertTriangle },
  approved:           { label:"Approved",            color:C.green,  icon:CheckCircle2 },
  published:          { label:"Published",           color:C.teal,   icon:Star },
};

// ─── Sample course data ───────────────────────────────────────────────────────

const SAMPLE_MODULES = [
  {
    id:"M1", title:"Understanding the Threat Landscape", lessons:[
      { id:"M1.L1", title:"What is AI Red Teaming?",               type:"Concept",  mins:45, complete:true  },
      { id:"M1.L2", title:"Threat Actor Taxonomy for AI Systems",  type:"Concept",  mins:60, complete:true  },
      { id:"M1.L3", title:"Scoping a Red Team Campaign",           type:"Practice", mins:60, complete:false },
    ]
  },
  {
    id:"M2", title:"Designing Safe Evaluation Scenarios", lessons:[
      { id:"M2.L1", title:"Safe Task Design Principles",           type:"Concept",  mins:45, complete:false },
      { id:"M2.L2", title:"Writing De-risked Evaluation Prompts",  type:"Build",    mins:75, complete:false },
    ]
  },
  {
    id:"M3", title:"Reporting and Governance", lessons:[
      { id:"M3.L1", title:"Structuring a Red Team Report",         type:"Build",    mins:60, complete:false },
    ]
  },
];

const SAMPLE_SOURCES = [
  { id:"S1", title:"Anthropic Responsible Scaling Policy", org:"Anthropic", type:"Policy", diff:"Advanced", required:true,  url:"https://www.anthropic.com/responsible-scaling-policy" },
  { id:"S2", title:"Evaluating Frontier Models for Dangerous Capabilities", org:"Google DeepMind", type:"Paper", diff:"Advanced", required:true, url:"https://arxiv.org/abs/2403.13793" },
  { id:"S3", title:"Red Teaming Language Models with Language Models", org:"Perez et al.", type:"Paper", diff:"Advanced", required:false, url:"https://arxiv.org/abs/2202.03286" },
];

const QA_CHECKS: { category:string; item:string; result:QAResult; fix?:string }[] = [
  // Content
  { category:"Content",    item:"Course has defined audience",                 result:"pass" },
  { category:"Content",    item:"Course has listed prerequisites",             result:"pass" },
  { category:"Content",    item:"Course has 3+ learning outcomes",            result:"pass" },
  { category:"Content",    item:"All lessons have learning objectives",        result:"fail", fix:"M1.L3 and M2.L2 are missing objectives." },
  { category:"Content",    item:"All lessons have summary text",               result:"pass" },
  { category:"Content",    item:"All lessons have practice or knowledge check",result:"fail", fix:"M2.L1 and M3.L1 have no practice activity." },
  { category:"Content",    item:"Every module has an artifact or assessment",  result:"warn", fix:"M3 has no artifact template. Add one or explain why not needed." },
  // Sources
  { category:"Sources",    item:"All claim-heavy lessons have source cards",   result:"fail", fix:"M2.L2 has 2 unsupported claims. Add source or reframe." },
  { category:"Sources",    item:"Sources marked required / optional",          result:"pass" },
  { category:"Sources",    item:"No broken or unreachable links",              result:"pass" },
  { category:"Sources",    item:"Advanced resources separated from required",  result:"warn", fix:"Consider marking S3 as advanced in the source library." },
  // Assessment
  { category:"Assessment", item:"All quiz questions have explanations",        result:"pass" },
  { category:"Assessment", item:"Wrong answers have specific feedback",        result:"fail", fix:"Q2 and Q3 use generic wrong-answer feedback. Make it specific." },
  { category:"Assessment", item:"Artifacts have rubric with criteria",        result:"pass" },
  { category:"Assessment", item:"Artifacts have worked example",              result:"warn", fix:"Add a non-example to the Red Team Report artifact." },
  // AI Tutor
  { category:"AI Tutor",   item:"Lessons have tutor context summary",         result:"fail", fix:"M2.L1 and M2.L2 have no tutor context. Add lesson summary for grounding." },
  { category:"AI Tutor",   item:"Suggested prompt chips present",             result:"fail", fix:"No prompt chips defined. Add at least 3 per lesson." },
  { category:"AI Tutor",   item:"Restricted topics declared",                 result:"pass" },
  // Accessibility
  { category:"Accessibility", item:"External videos have authored transcript or summary", result:"fail", fix:"M1.L2 reference video has no authored summary." },
  { category:"Accessibility", item:"Diagrams have text summaries",            result:"skip" },
  { category:"Accessibility", item:"Language complexity is appropriate",      result:"warn", fix:"3 sentences in M1.L1 score above Grade 14. Simplify or add glossary links." },
  // Safety
  { category:"Safety",     item:"No harmful operational instructions",         result:"pass" },
  { category:"Safety",     item:"Sensitive topics use sandboxed examples",     result:"pass" },
  { category:"Safety",     item:"No unsupported safety claims",               result:"warn", fix:"M1.L2 makes an unqualified claim about model risk. Add uncertainty language." },
];

// ─── Shared micro-components ─────────────────────────────────────────────────

function Badge({ color, children }: { color:typeof C.blue; children:React.ReactNode }) {
  return (
    <span style={{ background:color.light, color:color.base, border:`1px solid ${color.border}` }}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status:CourseStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span style={{ background:cfg.color.light, color:cfg.color.base, border:`1px solid ${cfg.color.border}` }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
      <cfg.icon size={11}/>
      {cfg.label}
    </span>
  );
}

function QARIcon({ r }: { r:QAResult }) {
  if (r==="pass") return <CheckCircle2 size={15} style={{ color:C.green.base }}/>;
  if (r==="fail") return <X size={15} style={{ color:C.red.base }}/>;
  if (r==="warn") return <AlertTriangle size={15} style={{ color:C.amber.base }}/>;
  return <span className="w-4 h-4 flex items-center justify-center text-muted-foreground text-xs">—</span>;
}

function SectionHead({ label, sub }: { label:string; sub?:string }) {
  return (
    <div className="mb-5 pb-4 border-b border-border">
      <h2 className="text-xl font-bold text-foreground">{label}</h2>
      {sub && <p className="text-sm text-secondary-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function Field({ label, hint, children, required }: { label:string; hint?:string; children:React.ReactNode; required?:boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <label className="text-xs font-semibold text-foreground">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function TextInput({ placeholder, value, onChange, mono }: { placeholder?:string; value?:string; onChange?:(v:string)=>void; mono?:boolean }) {
  return (
    <input defaultValue={value} onChange={e=>onChange?.(e.target.value)} placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition ${mono?"font-mono":""}`}/>
  );
}

function Textarea({ placeholder, rows=3, value }: { placeholder?:string; rows?:number; value?:string }) {
  return (
    <textarea defaultValue={value} rows={rows} placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition resize-none"/>
  );
}

function Select({ options, value }: { options:string[]; value?:string }) {
  return (
    <select defaultValue={value}
      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition appearance-none">
      {options.map(o=><option key={o}>{o}</option>)}
    </select>
  );
}

function AIAssistButton({ label }: { label:string }) {
  return (
    <button style={{ background:C.violet.light, color:C.violet.base, border:`1px solid ${C.violet.border}` }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-opacity">
      <Sparkles size={11}/> {label}
    </button>
  );
}

function SaveBar({ saved, onSave }: { saved?:boolean; onSave?:()=>void }) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-card px-5 py-3 flex-shrink-0">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        {saved ? <><CheckCircle2 size={12} className="text-green-600"/> Saved</> : <><RefreshCw size={12}/> Unsaved changes</>}
      </span>
      <div className="ml-auto flex gap-2">
        <button className="px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">Discard</button>
        <button onClick={onSave} style={{ background:C.blue.base }}
          className="px-5 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
          <Save size={13}/> Save
        </button>
      </div>
    </div>
  );
}

// Lesson type badge
const LESSON_TYPES = ["Concept","Case","Practice","Build","Simulation"];
const TYPE_COLOR: Record<string,typeof C.blue> = {
  Concept:C.blue, Case:C.teal, Practice:C.orange, Build:C.violet, Simulation:C.amber
};

// ─── Screen 1: Educator Dashboard ────────────────────────────────────────────

function DashboardScreen({ go }: { go:(s:Screen)=>void }) {
  const courses = [
    { title:"AI Red Teaming Foundations", status:"changes_requested" as CourseStatus, lessons:6, learners:0,  updated:"2026-06-16" },
    { title:"Frontier Model Evaluations", status:"published"         as CourseStatus, lessons:37,learners:142,updated:"2026-06-12" },
    { title:"LLM Evaluation in Production",status:"draft"           as CourseStatus, lessons:2, learners:0,  updated:"2026-06-18" },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Educator Studio</h1>
          <p className="text-secondary-foreground text-sm mt-0.5">Build source-mapped, tutor-assisted courses.</p>
        </div>
        <button onClick={()=>go("create")} style={{ background:C.blue.base }}
          className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={15}/> New course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { v:"3",    l:"Courses",         sub:"1 published",  color:C.blue   },
          { v:"142",  l:"Learners",        sub:"FME only",     color:C.teal   },
          { v:"87%",  l:"Completion rate", sub:"Published",    color:C.green  },
          { v:"2",    l:"QA issues",       sub:"Needs action", color:C.amber  },
        ].map(({ v,l,sub,color })=>(
          <div key={l} className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-bold text-foreground">{v}</p>
            <p className="text-xs font-medium text-foreground mt-0.5">{l}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* Changes-requested alert */}
      <div style={{ background:C.amber.light, border:`1px solid ${C.amber.border}` }} className="rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={16} style={{ color:C.amber.base }} className="flex-shrink-0 mt-0.5"/>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">OpenEd Team requested changes</p>
          <p className="text-xs text-secondary-foreground mt-0.5">AI Red Teaming Foundations — 3 issues to address before resubmitting.</p>
        </div>
        <button onClick={()=>go("qa")} style={{ background:C.amber.base }}
          className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 flex-shrink-0">
          Review
        </button>
      </div>

      {/* Courses table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Your courses</p>
        </div>
        {courses.map((c,i)=>{
          const cfg = STATUS_CFG[c.status];
          return (
            <div key={i} onClick={()=>go("outline")}
              className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
              <div style={{ background:cfg.color.light }} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={16} style={{ color:cfg.color.base }}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.lessons} lessons · Updated {c.updated}</p>
              </div>
              <StatusBadge status={c.status}/>
              <span className="text-xs text-muted-foreground flex items-center gap-1 hidden sm:flex">
                <Users size={11}/> {c.learners}
              </span>
              <ChevronRight size={15} className="text-muted-foreground flex-shrink-0"/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen 2: Create Course ──────────────────────────────────────────────────

function CreateScreen({ go }: { go:(s:Screen)=>void }) {
  const [step, setStep] = useState(0);
  const steps = ["Course metadata","Audience & prerequisites","Learning outcomes"];
  const [outcomes, setOutcomes] = useState(["","",""]);

  return (
    <div className="p-6 max-w-2xl">
      <button onClick={()=>go("dashboard")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5">
        <ArrowLeft size={14}/> Back to dashboard
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-1">Create a new course</h1>
      <p className="text-secondary-foreground text-sm mb-6">A course needs clear structure before content. Fill these fields to unlock the outline builder.</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-7">
        {steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors
              ${i<step?"bg-green-500 text-white":i===step?"bg-primary text-white":"bg-secondary text-muted-foreground"}`}>
              {i<step ? <Check size={10}/> : i+1}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{s}</span>
            {i<steps.length-1 && <div className={`h-px w-8 ${i<step?"bg-green-400":"bg-border"}`}/>}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        {step===0 && (
          <>
            <Field label="Course title" required><TextInput placeholder="e.g. AI Red Teaming Foundations"/></Field>
            <Field label="Subtitle" hint="One sentence promise"><TextInput placeholder="Systematic red teaming for safe AI evaluation"/></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Level"><Select options={["Beginner","Intermediate","Advanced","Mixed"]} value="Intermediate"/></Field>
              <Field label="Estimated hours"><TextInput placeholder="20" value="20"/></Field>
            </div>
            <Field label="Course format"><Select options={["Self-paced","Live cohort","Hybrid"]} value="Self-paced"/></Field>
            <Field label="Proof output" hint="What artifact does this course produce?"><TextInput placeholder="Red team report and campaign design"/></Field>
          </>
        )}

        {step===1 && (
          <>
            <Field label="Target audience" required hint="Be specific"><Textarea rows={3} placeholder="ML engineers and AI safety researchers who run evaluations, product teams deploying frontier models, governance professionals assessing AI risk."/></Field>
            <Field label="Prerequisites" required hint="What should learners already know?"><Textarea rows={3} placeholder="Familiarity with LLM prompting and basic ML concepts. Completed Frontier Model Evaluations Phase 1 or equivalent background."/></Field>
            <Field label="Not suitable for" hint="Optional but recommended"><Textarea rows={2} placeholder="Learners with no ML background. This course does not cover foundational AI concepts."/></Field>
          </>
        )}

        {step===2 && (
          <>
            <p className="text-xs text-muted-foreground">Define 3–5 measurable learning outcomes. Start each with an action verb.</p>
            {outcomes.map((o,i)=>(
              <Field key={i} label={`Outcome ${i+1}`} required={i<3}>
                <div className="flex gap-2">
                  <TextInput value={o} placeholder={["Design a scoped red team campaign with threat actors, access levels, and harm pathways.","Write safe evaluation prompts that test capability without enabling misuse.","Structure a red team report with evidence, risk levels, and mitigation suggestions."][i]||""}/>
                  {i===outcomes.length-1 && outcomes.length<5 && (
                    <button onClick={()=>setOutcomes([...outcomes,""])}
                      className="w-9 h-[42px] rounded-xl border border-border bg-secondary flex items-center justify-center flex-shrink-0 hover:bg-border transition-colors">
                      <Plus size={14} className="text-muted-foreground"/>
                    </button>
                  )}
                </div>
              </Field>
            ))}
            <AIAssistButton label="Draft outcomes from course title"/>
          </>
        )}

        {/* Nav */}
        <div className="flex gap-3 pt-2">
          {step>0 && (
            <button onClick={()=>setStep(s=>s-1)} className="flex-1 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Back
            </button>
          )}
          {step<steps.length-1 ? (
            <button onClick={()=>setStep(s=>s+1)} style={{ background:C.blue.base }}
              className="flex-[2] py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Continue
            </button>
          ) : (
            <button onClick={()=>go("outline")} style={{ background:C.green.base }}
              className="flex-[2] py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Check size={14}/> Create course &amp; open outline builder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Course Outline Builder ────────────────────────────────────────

function OutlineScreen({ go }: { go:(s:Screen)=>void }) {
  const [modules, setModules] = useState(SAMPLE_MODULES);
  const [expanded, setExpanded] = useState<string[]>(["M1","M2","M3"]);

  const total = modules.reduce((s,m)=>s+m.lessons.length,0);
  const done  = modules.reduce((s,m)=>s+m.lessons.filter(l=>l.complete).length,0);

  function toggle(id:string) {
    setExpanded(e=>e.includes(id)?e.filter(x=>x!==id):[...e,id]);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground">AI Red Teaming Foundations</h1>
          <div className="flex items-center gap-3 mt-0.5">
            <StatusBadge status="changes_requested"/>
            <span className="text-xs text-muted-foreground font-mono">{done}/{total} lessons complete</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>go("qa")} style={{ background:C.amber.light, color:C.amber.base, border:`1px solid ${C.amber.border}` }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity">
            <AlertTriangle size={13}/> 3 QA issues
          </button>
          <button onClick={()=>go("preview")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-border bg-card hover:bg-secondary transition-colors">
            <Eye size={13}/> Preview
          </button>
        </div>
      </div>

      {/* Outline */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl space-y-3">
          {modules.map((m,mi)=>{
            const isExp = expanded.includes(m.id);
            return (
              <div key={m.id} className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Module header */}
                <div onClick={()=>toggle(m.id)}
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-secondary/40 transition-colors">
                  <GripVertical size={14} className="text-muted-foreground flex-shrink-0"/>
                  <ChevronRight size={14} className={`text-muted-foreground transition-transform flex-shrink-0 ${isExp?"rotate-90":""}`}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.id} · {m.lessons.length} lessons</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {m.lessons.filter(l=>l.complete).length}/{m.lessons.length}
                    </span>
                    <button onClick={e=>{e.stopPropagation(); go("lesson")}}
                      className="px-2.5 py-1 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                {/* Lessons */}
                {isExp && (
                  <div className="border-t border-border">
                    {m.lessons.map((l,li)=>{
                      const tc = TYPE_COLOR[l.type] ?? C.blue;
                      return (
                        <div key={l.id} onClick={()=>go("lesson")}
                          className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 cursor-pointer hover:bg-secondary/30 transition-colors pl-10">
                          <GripVertical size={12} className="text-muted-foreground flex-shrink-0"/>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${l.complete?"bg-green-500":"bg-border"}`}/>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${l.complete?"text-muted-foreground":""}`}>{l.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span style={{ background:tc.light, color:tc.base }} className="text-[10px] px-1.5 py-px rounded font-medium">{l.type}</span>
                              <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-0.5"><Clock size={8}/> {l.mins}m</span>
                            </div>
                          </div>
                          {!l.complete && (
                            <span style={{ background:C.amber.light, color:C.amber.base, border:`1px solid ${C.amber.border}` }}
                              className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0">INCOMPLETE</span>
                          )}
                          <ChevronRight size={13} className="text-muted-foreground flex-shrink-0"/>
                        </div>
                      );
                    })}
                    {/* Add lesson */}
                    <button className="w-full flex items-center gap-2 px-10 py-3 text-xs text-muted-foreground hover:bg-secondary/40 transition-colors border-t border-dashed border-border">
                      <Plus size={12}/> Add lesson to {m.id}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add module */}
          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-secondary/30 transition-colors hover:text-foreground">
            <Plus size={15}/> Add module
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-border bg-card px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {(["lesson","media","quiz","rubric","artifact","tutor"] as Screen[]).map(s=>(
            <button key={s} onClick={()=>go(s)}
              className="px-3 py-1.5 rounded-lg border border-border bg-secondary text-xs font-medium text-foreground hover:bg-border transition-colors capitalize">
              {s==="media" ? "Media / Sources" : s==="tutor" ? "AI Tutor" : s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={()=>go("qa")} style={{ background:C.blue.base }}
          className="text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          Run QA check <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 4: Lesson Editor ──────────────────────────────────────────────────

function LessonScreen({ go }: { go:(s:Screen)=>void }) {
  const [tab, setTab] = useState<"content"|"practice"|"build"|"access">("content");
  const [saved, setSaved] = useState(false);
  const tabs = [{ id:"content", l:"Content" },{ id:"practice", l:"Practice & Quiz" },{ id:"build", l:"Artifact & Rubric" },{ id:"access", l:"Accessibility" }] as const;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Lesson header */}
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground flex-shrink-0">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">M1.L3 — Scoping a Red Team Campaign</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span style={{ background:C.amber.light, color:C.amber.base }} className="text-[10px] font-mono px-2 py-0.5 rounded">INCOMPLETE</span>
          <AIAssistButton label="AI assist"/>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 px-6 pt-3 pb-0 border-b border-border bg-card overflow-x-auto">
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors
              ${tab===t.id?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.l}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-5">

          {tab==="content" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Lesson title" required><TextInput value="Scoping a Red Team Campaign"/></Field>
                <Field label="Lesson type"><Select options={LESSON_TYPES} value="Practice"/></Field>
              </div>
              <Field label="Duration (minutes)"><TextInput value="60" placeholder="60"/></Field>
              <Field label="Learning objective" required hint="Measurable, one sentence">
                <Textarea rows={2} placeholder="Learner can define scope, select threat actors, and map harm pathways for a safe evaluation campaign."/>
              </Field>
              <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={13} style={{ color:C.red.base }} className="flex-shrink-0 mt-0.5"/>
                <p className="text-xs" style={{ color:C.red.base }}>Learning objective is missing. Add a measurable one-sentence objective before this lesson can pass QA.</p>
              </div>
              <Field label="Lesson promise" hint="What learner gains from this lesson">
                <TextInput placeholder="Design a scoped campaign that is both effective and safe."/>
              </Field>
              <Field label="Concept explanation" required hint="Core content — aim for 150–300 words">
                <Textarea rows={6} placeholder="Explain the key concept here. Use plain language. Avoid jargon without definition."/>
              </Field>
              <Field label="Worked example">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground mb-1.5">WEAK VERSION</p>
                    <Textarea rows={3} placeholder='"Test whether the model is dangerous."'/>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground mb-1.5">STRONG VERSION</p>
                    <Textarea rows={3} placeholder="&quot;Evaluate whether the model, with browser access in a sandboxed environment, can improve a novice&apos;s ability to complete multi-step reconnaissance tasks.&quot;"/>
                  </div>
                </div>
              </Field>
              <Field label="Common mistake" hint="Most frequent learner error">
                <Textarea rows={2} placeholder="Starting with a benchmark before articulating the threat model and decision."/>
              </Field>
              <Field label="AI Tutor prompt chips" hint="3–5 prompts learners can tap">
                <div className="space-y-2">
                  {["Explain this simply","Give me a worked example","Quiz me","Help me fill the artifact"].map(chip=>(
                    <div key={chip} className="flex items-center gap-2">
                      <input defaultValue={chip} className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"/>
                      <button className="w-8 h-9 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
                        <X size={13} className="text-muted-foreground"/>
                      </button>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 text-xs text-primary hover:underline">
                    <Plus size={12}/> Add chip
                  </button>
                </div>
              </Field>
            </>
          )}

          {tab==="practice" && (
            <>
              <Field label="Practice activity" required>
                <Textarea rows={3} placeholder="Provide a short scenario or task. Learner submits a written response before seeing the strong answer."/>
              </Field>
              <Field label="Strong answer pattern" hint="Shown after submission">
                <Textarea rows={3} placeholder="Describe what a correct answer looks like, without giving it verbatim."/>
              </Field>
              <div style={{ background:C.amber.light, border:`1px solid ${C.amber.border}` }} className="rounded-xl p-3 flex items-center gap-2">
                <AlertTriangle size={13} style={{ color:C.amber.base }}/>
                <p className="text-xs" style={{ color:C.amber.base }}>No practice activity added. This lesson cannot reach Practiced state in the proof ladder without one.</p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="text-sm font-semibold text-foreground mb-4">Quiz / decision checkpoint</p>
                <Field label="Question" required>
                  <Textarea rows={2} placeholder="Write a clear, specific question that tests the lesson objective."/>
                </Field>
                <Field label="Question type"><Select options={["Multiple choice","Multiple select","Short answer","Scenario decision"]} value="Multiple choice"/></Field>
                <div className="space-y-2 mt-4">
                  {["Option A","Option B","Option C","Option D"].map((opt,i)=>(
                    <div key={opt} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${i===1?"border-green-500 bg-green-50":"border-border"}`}>
                        {i===1 && <div className="w-2 h-2 rounded-full bg-green-500"/>}
                      </div>
                      <input defaultValue={i===0?"Broader scope catches more threats.":i===1?"A clearly scoped threat model prevents invalid evidence and unsafe prompts.":i===2?"Random scope allows unexpected findings.":""} placeholder={opt}
                        className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"/>
                      {i===1 && <span style={{ color:C.green.base }} className="text-[10px] font-mono font-semibold flex-shrink-0">CORRECT</span>}
                    </div>
                  ))}
                </div>
                <Field label="Correct answer explanation" required hint="Shown after any answer">
                  <Textarea rows={2} placeholder="A scoped threat model ensures the task family is valid and evidence can support a specific decision."/>
                </Field>
                <Field label="Wrong-answer feedback" hint="Specific to incorrect choices — shown per option">
                  <Textarea rows={2} placeholder="Ask the learner which decision their chosen answer would support."/>
                </Field>
                <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-3 flex items-start gap-2 mt-3">
                  <X size={13} style={{ color:C.red.base }} className="flex-shrink-0 mt-0.5"/>
                  <p className="text-xs" style={{ color:C.red.base }}>Wrong-answer feedback is generic. QA requires specific per-option feedback.</p>
                </div>
              </div>
            </>
          )}

          {tab==="build" && (
            <>
              <p className="text-xs text-muted-foreground">Link this lesson to an artifact template and rubric. Learners in the Build tab will see the artifact builder.</p>
              <Field label="Linked artifact">
                <div className="flex gap-2">
                  <Select options={["— None —","Red Team Campaign Scope","Red Team Report (Phase artifact)","Threat Model Canvas"]}
                    value="Red Team Campaign Scope"/>
                  <button onClick={()=>go("artifact")} className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium hover:bg-secondary transition-colors flex-shrink-0">
                    Edit template
                  </button>
                </div>
              </Field>
              <Field label="Linked rubric">
                <div className="flex gap-2">
                  <Select options={["— None —","Campaign Scope Rubric","Report Quality Rubric"]}
                    value="Campaign Scope Rubric"/>
                  <button onClick={()=>go("rubric")} className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium hover:bg-secondary transition-colors flex-shrink-0">
                    Edit rubric
                  </button>
                </div>
              </Field>
              <Field label="Portfolio visibility default">
                <Select options={["Private (learner can share manually)","Public (appears in learner's SkillProof portfolio by default)"]}/>
              </Field>
            </>
          )}

          {tab==="access" && (
            <>
              <Field label="Video / media transcript status">
                <Select options={["No video for this lesson","Authored summary provided","External video — transcript pending","External video — transcript not available"]}
                  value="Authored summary provided"/>
              </Field>
              <Field label="Authored lesson summary" hint="Used as transcript fallback and by the AI tutor for grounding">
                <Textarea rows={5} placeholder="Write a 150–300 word summary of the lesson content. This is shown when video is unavailable and used as the AI tutor's context for this lesson."/>
              </Field>
              <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={13} style={{ color:C.red.base }} className="flex-shrink-0 mt-0.5"/>
                <p className="text-xs" style={{ color:C.red.base }}>No authored lesson summary. This is required for AI tutor grounding and video fallback. QA will fail without it.</p>
              </div>
              <Field label="Diagram text summaries" hint="Describe any diagrams so screen readers and low-bandwidth learners can understand them">
                <Textarea rows={3} placeholder="Diagram 1: A two-lane flow showing the red team campaign lifecycle…"/>
              </Field>
              <Field label="Language complexity note">
                <Select options={["Standard academic English","Simplified English (recommended)","Technical — add glossary links"]}
                  value="Simplified English (recommended)"/>
              </Field>
            </>
          )}
        </div>
      </div>
      <SaveBar saved={saved} onSave={()=>setSaved(true)}/>
    </div>
  );
}

// ─── Screen 5: Media / Source Mapper ─────────────────────────────────────────

function MediaScreen({ go }: { go:(s:Screen)=>void }) {
  const [sources, setSources] = useState(SAMPLE_SOURCES);
  const [addingSource, setAddingSource] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">Media &amp; Source Library</h1>
        <AIAssistButton label="Draft source card"/>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl space-y-7">

          {/* External video */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">External reference media</p>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">
                <Plus size={12}/> Add media
              </button>
            </div>
            <div className="space-y-3">
              {[
                { title:"AI Safety & Alignment — Red Teaming Overview", provider:"YouTube", url:"https://www.youtube.com/watch?v=example", status:"UNVERIFIED" as const, transcript:"pending" },
                { title:"Anthropic Model Card Overview", provider:"Anthropic", url:"https://www.anthropic.com", status:"EMBEDDABLE" as const, transcript:"provided" },
              ].map((m,i)=>{
                const embedColor = m.status==="EMBEDDABLE" ? C.green : C.amber;
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3 flex-wrap">
                      <div style={{ background:C.slate.light }} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Film size={15} className="text-muted-foreground"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.provider}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span style={{ background:embedColor.light, color:embedColor.base, border:`1px solid ${embedColor.border}` }}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase">
                            EMBED: {m.status}
                          </span>
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase
                            ${m.transcript==="provided" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                            TRANSCRIPT: {m.transcript.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-2.5 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">Edit</button>
                        <button className="px-2.5 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">
                          <Trash2 size={12}/>
                        </button>
                      </div>
                    </div>
                    <Field label="Course-authored summary" hint="Shown when embed is blocked; used by AI tutor">
                      <Textarea rows={2} placeholder="Summarise what the learner should take from this media in 50–100 words."/>
                    </Field>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Source cards */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">Source library</p>
              <button onClick={()=>setAddingSource(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">
                <Plus size={12}/> Add source
              </button>
            </div>

            {addingSource && (
              <div style={{ border:`1.5px solid ${C.teal.border}`, background:C.teal.light }} className="rounded-xl p-5 mb-3 space-y-4">
                <p className="text-xs font-semibold" style={{ color:C.teal.base }}>New source card</p>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title" required><TextInput placeholder="Paper or resource title"/></Field>
                  <Field label="Author / Organisation" required><TextInput placeholder="Author, org, or team"/></Field>
                </div>
                <Field label="URL or citation"><TextInput placeholder="https://" mono/></Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Type"><Select options={["Paper","Book","Video","Docs","Article","Course","Report","Benchmark","Policy"]} value="Paper"/></Field>
                  <Field label="Difficulty"><Select options={["Beginner","Intermediate","Advanced"]} value="Advanced"/></Field>
                  <Field label="Status"><Select options={["Required","Optional","Advanced track"]} value="Required"/></Field>
                </div>
                <Field label="Why it matters" required><Textarea rows={2} placeholder="Explain why this source supports the course claim or provides necessary background."/></Field>
                <Field label="Relevant section / timestamp"><TextInput placeholder="e.g. Section 3, Chapter 5, 14:20–18:40"/></Field>
                <div className="flex gap-2">
                  <button style={{ background:C.teal.base }} onClick={()=>setAddingSource(false)}
                    className="text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity">
                    Add source
                  </button>
                  <button onClick={()=>setAddingSource(false)} className="px-4 py-2 rounded-xl border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {sources.map(s=>(
                <div key={s.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                  <div style={{ background:C.teal.light }} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bookmark size={14} style={{ color:C.teal.base }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.org}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span style={{ background:C.teal.light, color:C.teal.base, border:`1px solid ${C.teal.border}` }}
                          className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase">{s.type}</span>
                        {s.required ? <Badge color={C.green}>Required</Badge> : <Badge color={C.slate}>Optional</Badge>}
                      </div>
                    </div>
                    <a href={s.url} target="_blank" rel="noreferrer"
                      className="text-[10px] mt-1.5 flex items-center gap-1 hover:underline" style={{ color:C.teal.base }}>
                      <ExternalLink size={9}/> {s.url.replace("https://","")}
                    </a>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
                      <Edit3 size={12} className="text-muted-foreground"/>
                    </button>
                    <button className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
                      <Trash2 size={12} className="text-muted-foreground"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: Quiz Builder ───────────────────────────────────────────────────

function QuizScreen({ go }: { go:(s:Screen)=>void }) {
  const [questions, setQuestions] = useState([
    { q:"What is the primary purpose of scoping a red team campaign before selecting tasks?", type:"Multiple choice", correct:1 },
    { q:"Which of the following is an example of a trajectory metric?", type:"Multiple choice", correct:2 },
  ]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">Quiz builder</h1>
        <AIAssistButton label="Generate question"/>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl space-y-4">
          {questions.map((q,qi)=>(
            <div key={qi} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 bg-secondary/40 border-b border-border flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-muted-foreground w-6">Q{qi+1}</span>
                <p className="text-sm font-semibold text-foreground flex-1 truncate">{q.q}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge color={C.blue}>{q.type}</Badge>
                  <button className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
                    <Trash2 size={12} className="text-muted-foreground"/>
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <Field label="Question" required>
                  <Textarea rows={2} value={q.q}/>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Type"><Select options={["Multiple choice","Multiple select","Short answer","Scenario decision","Source interpretation"]} value={q.type}/></Field>
                  <Field label="Difficulty"><Select options={["Beginner","Intermediate","Advanced"]} value="Intermediate"/></Field>
                </div>
                <Field label="Skill tag"><TextInput placeholder="e.g. evaluation-scoping, threat-model-design"/></Field>
                <Field label="Answer options">
                  <div className="space-y-2">
                    {["A thorough scope prevents invalid evidence and unsafe prompts.","A clear scope ensures better statistical power.","Scope mainly affects report presentation, not evidence quality.","Wider scope always produces better evaluation results."].map((opt,oi)=>(
                      <div key={oi} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${oi===q.correct?"border-green-500 bg-green-50":"border-border bg-background"}`}>
                          {oi===q.correct && <div className="w-2 h-2 rounded-full bg-green-500"/>}
                        </div>
                        <input defaultValue={opt}
                          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"/>
                        <button onClick={()=>setQuestions(prev=>prev.map((pq,pqi)=>pqi===qi?{...pq,correct:oi}:pq))}
                          className={`text-[10px] px-2 py-1 rounded-lg flex-shrink-0 transition-colors ${oi===q.correct?"bg-green-100 text-green-700":"bg-secondary text-muted-foreground hover:bg-green-50 hover:text-green-700"}`}>
                          {oi===q.correct ? "✓ Correct" : "Mark correct"}
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-1">
                      <Plus size={11}/> Add option
                    </button>
                  </div>
                </Field>
                <Field label="Correct answer explanation" required hint="Shown to all after submission">
                  <Textarea rows={2} placeholder="A scoped threat model ensures each task directly tests the named risk and evidence can support the target decision."/>
                </Field>
                <Field label="Wrong-answer feedback per option" hint="Specific to each incorrect choice">
                  {["Option A (incorrect)","Option C (incorrect)","Option D (incorrect)"].map(o=>(
                    <div key={o} className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground w-28 flex-shrink-0">{o}</span>
                      <TextInput placeholder={`Feedback for ${o}…`}/>
                    </div>
                  ))}
                </Field>
                <Field label="Linked lesson / source"><Select options={["M1.L3 — Scoping a Red Team Campaign","S1 — Responsible Scaling Policy","S2 — Evaluating Frontier Models"]} value="M1.L3 — Scoping a Red Team Campaign"/></Field>
              </div>
            </div>
          ))}

          <button onClick={()=>setQuestions(p=>[...p,{ q:"New question", type:"Multiple choice", correct:0 }])}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
            <Plus size={15}/> Add question
          </button>
        </div>
      </div>
      <SaveBar/>
    </div>
  );
}

// ─── Screen 7: Rubric Builder ─────────────────────────────────────────────────

function RubricScreen({ go }: { go:(s:Screen)=>void }) {
  const criteria = [
    { name:"Specificity of threat model",  weight:30, desc:"Does the scope name actor, access level, and harm pathway precisely?" },
    { name:"Task safety and sandboxing",   weight:30, desc:"Are evaluation tasks de-risked and non-operational?" },
    { name:"Evidence linkage",             weight:25, desc:"Does the scope explain what evidence is needed and which decision it supports?" },
    { name:"Communication clarity",        weight:15, desc:"Is the scope readable and decision-ready without specialist jargon?" },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">Rubric builder — Campaign Scope Rubric</h1>
        <AIAssistButton label="Suggest criteria"/>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl">
          {/* Rubric metadata */}
          <div className="bg-card border border-border rounded-xl p-5 mb-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rubric name" required><TextInput value="Campaign Scope Rubric"/></Field>
              <Field label="Linked artifact"><Select options={["Red Team Campaign Scope","Red Team Report"]} value="Red Team Campaign Scope"/></Field>
            </div>
            <Field label="Passing threshold" hint="Minimum weighted score to reach 'Proved' state">
              <div className="flex items-center gap-3">
                <input type="range" min="50" max="90" defaultValue="70" className="flex-1"/>
                <span className="font-mono text-sm text-foreground w-12 text-right">70%</span>
              </div>
            </Field>
            <Field label="AI-assist in feedback"><Select options={["AI may suggest improvements (educator reviews)","AI cannot assist — human feedback only"]} value="AI may suggest improvements (educator reviews)"/></Field>
          </div>

          {/* Criteria table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-border bg-secondary/30 grid grid-cols-12 gap-3">
              {["Criterion","Weight","Beginning","Passing","Strong",""].map((h,i)=>(
                <div key={i} className={`text-[10px] font-mono text-muted-foreground font-semibold uppercase ${i===0?"col-span-2":i===1?"col-span-1":i===5?"col-span-1":"col-span-2"}`}>{h}</div>
              ))}
            </div>
            {criteria.map((c,ci)=>(
              <div key={ci} className="px-5 py-4 border-b border-border last:border-0 grid grid-cols-12 gap-3 items-start">
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.desc}</p>
                </div>
                <div className="col-span-1">
                  <input type="number" defaultValue={c.weight} min="5" max="50"
                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/20"/>
                  <span className="text-[9px] text-muted-foreground block text-center mt-0.5">%</span>
                </div>
                {["Beginning","Passing","Strong"].map(level=>(
                  <div key={level} className="col-span-2">
                    <textarea rows={2} defaultValue={
                      level==="Beginning" ? "Scope is vague or missing key fields." :
                      level==="Passing"   ? "Scope names actor, access, task family, and evidence needed." :
                      "Scope includes validity threats, uncertainty, and threshold for decision change."
                    }
                      className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-[11px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"/>
                  </div>
                ))}
                <div className="col-span-1 flex flex-col gap-1">
                  <button className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors">
                    <Trash2 size={11} className="text-muted-foreground"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Plus size={14}/> Add criterion
          </button>

          {/* Total weight */}
          <div className={`mt-4 flex items-center gap-2 text-xs ${criteria.reduce((s,c)=>s+c.weight,0)===100?"text-green-700":"text-amber-700"}`}>
            {criteria.reduce((s,c)=>s+c.weight,0)===100 ? <CheckCircle2 size={13}/> : <AlertTriangle size={13}/>}
            Weights total: {criteria.reduce((s,c)=>s+c.weight,0)}% {criteria.reduce((s,c)=>s+c.weight,0)===100 ? "(valid)" : "(must equal 100%)"}
          </div>
        </div>
      </div>
      <SaveBar/>
    </div>
  );
}

// ─── Screen 8: Artifact Assignment Builder ────────────────────────────────────

function ArtifactScreen({ go }: { go:(s:Screen)=>void }) {
  const [fields, setFields] = useState([
    "Threat actor", "Access condition", "Harm pathway", "Task family", "Success condition", "Evidence needed", "Decision informed"
  ]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">Artifact template — Red Team Campaign Scope</h1>
        <AIAssistButton label="Suggest fields"/>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <Field label="Artifact name" required><TextInput value="Red Team Campaign Scope"/></Field>
            <Field label="Linked lesson"><Select options={["M1.L3 — Scoping a Red Team Campaign"]} value="M1.L3 — Scoping a Red Team Campaign"/></Field>
          </div>
          <Field label="Purpose" hint="What the learner is building and why">
            <Textarea rows={2} value="Define a scoped red team campaign that is effective, safe, and can produce evidence for a deployment decision."/>
          </Field>

          {/* Fields */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-foreground">Guided fields</p>
              <p className="text-[10px] text-muted-foreground">{fields.length} fields · drag to reorder</p>
            </div>
            <div className="space-y-2">
              {fields.map((f,i)=>(
                <div key={i} className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
                  <GripVertical size={13} className="text-muted-foreground flex-shrink-0"/>
                  <input defaultValue={f} className="flex-1 text-sm text-foreground bg-transparent focus:outline-none"/>
                  <button onClick={()=>setFields(prev=>prev.filter((_,fi)=>fi!==i))}
                    className="w-6 h-6 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center flex-shrink-0">
                    <X size={11} className="text-muted-foreground"/>
                  </button>
                </div>
              ))}
              <button onClick={()=>setFields(p=>[...p,"New field"])}
                className="flex items-center gap-2 text-xs text-primary hover:underline">
                <Plus size={11}/> Add field
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-2">EXAMPLE ANSWER</p>
              <Textarea rows={5} placeholder="Show what a strong, passing artifact response looks like. Be specific but do not make it operational."/>
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-2">NON-EXAMPLE</p>
              <Textarea rows={5} placeholder="Show what a weak or failing response looks like. Explain what is missing."/>
            </div>
          </div>

          <Field label="Required evidence" hint="What must be present for a valid submission">
            <Textarea rows={2} placeholder="Must name at least one threat actor. Must include a testable success condition. Must not include operational harmful instructions."/>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Completion threshold">
              <Select options={["All fields required","At least 5 of 7 fields","Core fields only (marked *)"]} value="All fields required"/>
            </Field>
            <Field label="Portfolio visibility default">
              <Select options={["Private","Public (SkillProof default)"]} value="Private"/>
            </Field>
          </div>

          {/* Validation rules */}
          <div style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl p-4">
            <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color:C.blue.base }}>VALIDATION RULES</p>
            <div className="space-y-2">
              {["Must not include harmful operational details.","Must name at least one threat actor.","Must include a testable success condition."].map((r,i)=>(
                <div key={i} className="flex items-start gap-2 text-xs text-secondary-foreground">
                  <CheckCircle2 size={12} style={{ color:C.blue.base }} className="flex-shrink-0 mt-0.5"/>{r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SaveBar/>
    </div>
  );
}

// ─── Screen 9: AI Tutor Grounding ─────────────────────────────────────────────

function TutorScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">AI Tutor grounding settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-6">

          {/* Global settings */}
          <section>
            <p className="text-sm font-semibold text-foreground mb-4">Course-level tutor settings</p>
            <div className="bg-card border border-border rounded-xl p-5 space-y-5">
              <Field label="Course summary for tutor context" hint="150–300 words. This grounds all tutor answers across the course.">
                <Textarea rows={5} placeholder="This course teaches AI red teaming for safe evaluation. All examples must remain fictional, sandboxed, and non-operational. The tutor should help learners design scoped campaigns, interpret evidence, and structure reports — but must not generate operational harmful instructions even when asked."/>
              </Field>
              <div style={{ background:C.red.light, border:`1px solid ${C.red.border}` }} className="rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={13} style={{ color:C.red.base }} className="flex-shrink-0 mt-0.5"/>
                <p className="text-xs" style={{ color:C.red.base }}>Course summary is empty. The AI tutor cannot be reliably grounded without it. QA will fail.</p>
              </div>
              <Field label="Tutor mode default">
                <Select options={["Explain (direct, concise)","Socratic (hints first)","Balanced (educator-configured per lesson)"]} value="Balanced (educator-configured per lesson)"/>
              </Field>
              <Field label="Assessment mode behaviour">
                <Select options={["Hints only (no direct answers during quiz)","Explain after attempt","Full explain (not recommended)"]} value="Hints only (no direct answers during quiz)"/>
              </Field>
            </div>
          </section>

          {/* Restricted topics */}
          <section>
            <p className="text-sm font-semibold text-foreground mb-1">Restricted topics</p>
            <p className="text-xs text-muted-foreground mb-3">The tutor will decline to answer, cite safety policy, and suggest contacting the educator if these topics arise.</p>
            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              {["Operational harmful instructions (cyber, bio, CBRN)","Specific vulnerability details or exploit code","Content outside the course scope that the tutor cannot verify"].map((r,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <div style={{ background:C.red.light }} className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                    <Lock size={10} style={{ color:C.red.base }}/>
                  </div>
                  <span className="text-xs text-foreground">{r}</span>
                </div>
              ))}
              <Field label="Additional restrictions for this course">
                <Textarea rows={2} placeholder="Any course-specific topics the tutor should not answer…"/>
              </Field>
            </div>
          </section>

          {/* Lesson-level tutor settings */}
          <section>
            <p className="text-sm font-semibold text-foreground mb-3">Lesson-level tutor grounding</p>
            <div className="space-y-2">
              {SAMPLE_MODULES[0].lessons.map(l=>{
                const missing = l.id==="M1.L3";
                return (
                  <div key={l.id} className={`bg-card border rounded-xl px-4 py-3 flex items-center gap-3 ${missing?"border-amber-200":""}`}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${missing?"bg-amber-400":"bg-green-500"}`}/>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{l.id} — {l.title}</p>
                      {missing && <p className="text-[10px]" style={{ color:C.amber.base }}>Missing tutor context and prompt chips</p>}
                    </div>
                    <button onClick={()=>go("lesson")} className="text-xs text-primary hover:underline flex-shrink-0">
                      {missing ? "Add context" : "Edit"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
      <SaveBar/>
    </div>
  );
}

// ─── Screen 10: Preview as Learner ────────────────────────────────────────────

function PreviewScreen({ go }: { go:(s:Screen)=>void }) {
  const [tab, setTab] = useState<"watch"|"understand"|"practice"|"build"|"sources">("understand");
  const tabs = ["watch","understand","practice","build","sources"] as const;
  const tabLabels: Record<typeof tabs[number], string> = {
    watch:"Watch / Read", understand:"Understand", practice:"Practice", build:"Build", sources:"Sources"
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Preview banner */}
      <div style={{ background:C.teal.base }} className="px-4 py-2 flex items-center gap-3">
        <Eye size={13} color="white"/>
        <p className="text-white text-xs font-semibold flex-1">Preview mode — learner view of M1.L1 "What is AI Red Teaming?"</p>
        <button onClick={()=>go("outline")}
          className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5">
          <X size={11}/> Exit preview
        </button>
      </div>

      {/* Lesson header */}
      <div className="px-6 pt-5 pb-0 border-b border-border bg-card">
        <p className="text-xs text-muted-foreground mb-1.5">Phase 1 — Understanding the Threat Landscape</p>
        <h1 className="text-xl font-bold text-foreground">What is AI Red Teaming?</h1>
        <p className="text-sm text-secondary-foreground mt-1 mb-3">Learn how systematic adversarial testing differs from informal prompting and why it matters for frontier model safety.</p>
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <Badge color={C.blue}>Concept</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11}/> 45 min</span>
          <span className="text-xs text-muted-foreground">→ Red Team Campaign Scope (artifact)</span>
        </div>
        <div className="flex gap-0.5 overflow-x-auto">
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors
                ${tab===t?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tabLabels[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-2xl">
        {tab==="watch" && (
          <div className="space-y-4">
            <div className="bg-secondary rounded-2xl border border-border p-8 text-center">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">REFERENCE VIDEO — NOT COURSE-OWNED MEDIA</p>
              <p className="font-semibold text-foreground mb-1">AI Safety &amp; Alignment — Red Teaming Overview</p>
              <p className="text-xs text-muted-foreground mb-4">External embed unavailable. Open on provider then mark as viewed.</p>
              <div className="flex gap-2 justify-center">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground hover:bg-secondary transition-colors">
                  <ExternalLink size={12}/> Open on provider
                </button>
                <button className="px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:bg-secondary transition-colors">
                  Mark as viewed
                </button>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-foreground mb-3">Authored course reading</p>
              <p className="text-sm text-secondary-foreground leading-relaxed">AI red teaming is a systematic process of adversarial testing designed to discover model failure modes, dangerous capabilities, and policy violations before deployment. Unlike informal prompting, structured red teaming defines a threat model, task family, access conditions, and evidence standard before running any tests…</p>
            </div>
          </div>
        )}
        {tab==="understand" && (
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                { n:"Adversarial intent", b:"Red teaming assumes an actor actively trying to elicit failures, not typical use." },
                { n:"Scope first", b:"A threat model defines the attack surface before any prompts are written." },
                { n:"Evidence standard", b:"Useful red teaming produces evidence that can support a release or restriction decision." },
              ].map((k,i)=>(
                <div key={i} className="bg-card border border-border rounded-xl px-4 py-3.5 flex gap-3">
                  <div style={{ background:C.blue.base }} className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold mt-0.5">{i+1}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{k.n}</p>
                    <p className="text-xs text-secondary-foreground mt-0.5 leading-relaxed">{k.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="practice" && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <p className="text-sm font-semibold text-foreground">Practice activity</p>
            <div style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl p-3">
              <p className="text-sm text-foreground">A team claims they "red teamed" a model by asking 10 adversarial questions from the internet. List three ways this differs from structured red teaming.</p>
            </div>
            <textarea rows={4} placeholder="Write your answer here…"
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"/>
            <button style={{ background:C.blue.base }} className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Submit</button>
          </div>
        )}
        {tab==="build" && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color:C.violet.base }}>ARTIFACT BUILDER</p>
            <p className="font-bold text-foreground">Red Team Campaign Scope</p>
            {["Threat actor","Access condition","Harm pathway","Task family","Success condition","Evidence needed","Decision informed"].map(f=>(
              <div key={f}>
                <label className="text-xs font-semibold text-foreground block mb-1.5">{f}</label>
                <textarea rows={2} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none" placeholder={`Describe ${f.toLowerCase()}…`}/>
              </div>
            ))}
          </div>
        )}
        {tab==="sources" && (
          <div className="space-y-3">
            {SAMPLE_SOURCES.map(s=>(
              <div key={s.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2 flex-wrap">
                  <span style={{ background:C.teal.light, color:C.teal.base, border:`1px solid ${C.teal.border}` }}
                    className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase">{s.type}</span>
                  {s.required ? <Badge color={C.green}>Required</Badge> : <Badge color={C.slate}>Optional</Badge>}
                </div>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.org}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 11: Publish-Readiness QA ─────────────────────────────────────────

function QAScreen({ go }: { go:(s:Screen)=>void }) {
  const categories = [...new Set(QA_CHECKS.map(c=>c.category))];
  const [filter, setFilter] = useState<"all"|QAResult>("all");
  const counts = { pass:0, fail:0, warn:0, skip:0 } as Record<QAResult,number>;
  QA_CHECKS.forEach(c=>counts[c.result]++);
  const score = Math.round((counts.pass/(QA_CHECKS.length-counts.skip))*100);
  const canSubmit = counts.fail===0;

  const resultConfig: Record<QAResult,{ label:string; bg:string; text:string }> = {
    pass:{ label:"PASS", bg:C.green.light, text:C.green.base },
    fail:{ label:"FAIL", bg:C.red.light,   text:C.red.base   },
    warn:{ label:"WARN", bg:C.amber.light, text:C.amber.base },
    skip:{ label:"N/A",  bg:C.slate.muted, text:C.slate.base },
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("outline")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> Outline
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground flex-1">Publish-Readiness QA</h1>
        <button onClick={()=>{}} style={{ background:C.blue.light, color:C.blue.base, border:`1px solid ${C.blue.border}` }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity">
          <RefreshCw size={12}/> Re-run checks
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl">

          {/* Score card */}
          <div className={`rounded-2xl p-5 mb-6 flex items-center gap-5 flex-wrap border ${canSubmit?"border-green-200":"border-red-200"}`}
            style={{ background: canSubmit ? C.green.light : C.red.light }}>
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="8"/>
                <circle cx="40" cy="40" r="32" fill="none"
                  stroke={canSubmit ? C.green.base : C.red.base}
                  strokeWidth="8" strokeDasharray={`${201*score/100} 201`} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{score}%</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">{canSubmit ? "Ready to submit" : "Issues to fix before submitting"}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {(["pass","warn","fail","skip"] as QAResult[]).map(r=>(
                  <div key={r} className="flex items-center gap-1.5">
                    <QARIcon r={r}/>
                    <span className="text-xs font-medium text-foreground">{counts[r]} {resultConfig[r].label}</span>
                  </div>
                ))}
              </div>
            </div>
            {canSubmit && (
              <button onClick={()=>go("submit")} style={{ background:C.green.base }}
                className="ml-auto text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0">
                Submit for review <ArrowRight size={14}/>
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {(["all","fail","warn","pass","skip"] as const).map(f=>{
              const cnt = f==="all" ? QA_CHECKS.length : counts[f as QAResult];
              return (
                <button key={f} onClick={()=>setFilter(f)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all
                    ${filter===f?"bg-foreground text-background border-foreground":"border-border text-muted-foreground hover:bg-secondary"}`}>
                  {f!=="all" && <QARIcon r={f}/>}
                  <span className="capitalize">{f}</span>
                  <span className="font-mono text-[10px] opacity-60">({cnt})</span>
                </button>
              );
            })}
          </div>

          {/* Checks grouped by category */}
          {categories.map(cat=>{
            const items = QA_CHECKS.filter(c=>c.category===cat && (filter==="all" || c.result===filter));
            if (items.length===0) return null;
            return (
              <div key={cat} className="mb-5">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">{cat}</p>
                <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
                  {items.map((item,i)=>{
                    const rc = resultConfig[item.result];
                    return (
                      <div key={i} className="flex items-start gap-3 px-4 py-3.5 hover:bg-secondary/30 transition-colors">
                        <div style={{ background:rc.bg }} className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <QARIcon r={item.result}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{item.item}</p>
                          {item.fix && (
                            <div className="flex items-start gap-1.5 mt-1">
                              <ArrowRight size={10} style={{ color:rc.text }} className="flex-shrink-0 mt-0.5"/>
                              <p className="text-xs" style={{ color:rc.text }}>{item.fix}</p>
                            </div>
                          )}
                        </div>
                        {item.fix && (
                          <button onClick={()=>go("lesson")} className="text-xs font-medium px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary transition-colors flex-shrink-0">
                            Fix
                          </button>
                        )}
                        <span style={{ background:rc.bg, color:rc.text }}
                          className="font-mono text-[9px] font-semibold tracking-widest px-2 py-0.5 rounded flex-shrink-0">
                          {rc.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 12: Submit for Review ─────────────────────────────────────────────

function SubmitScreen({ go }: { go:(s:Screen)=>void }) {
  const [declared, setDeclared] = useState({ orig:false, safe:false, sources:false, ai:false });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<CourseStatus>("qa_ready");
  const allChecked = Object.values(declared).every(Boolean);

  function handleSubmit() {
    setSubmitted(true);
    setStatus("submitted");
    setTimeout(()=>setStatus("in_review"), 1500);
  }

  if (submitted) {
    const cfg = STATUS_CFG[status];
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div style={{ background:cfg.color.light }} className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <cfg.icon size={28} style={{ color:cfg.color.base }}/>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {status==="submitted" ? "Submitting…" : "Course submitted for review"}
          </h2>
          <p className="text-secondary-foreground text-sm mb-4">
            {status==="in_review"
              ? "The OpenEd Team will review your course for content quality, source accuracy, and safety. You'll receive feedback within 5 business days."
              : "Sending your course to the review queue…"}
          </p>
          <StatusBadge status={status}/>
          {status==="in_review" && (
            <div className="mt-6 space-y-2">
              <button onClick={()=>go("dashboard")} style={{ background:C.blue.base }}
                className="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Back to dashboard
              </button>
              <p className="text-xs text-muted-foreground">You can still edit the course but it will require re-submission.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border bg-card flex items-center gap-3 flex-wrap">
        <button onClick={()=>go("qa")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13}/> QA check
        </button>
        <div className="h-4 w-px bg-border"/>
        <h1 className="text-sm font-semibold text-foreground">Submit for OpenEd review</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-5">

          {/* Course summary */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <p className="text-xs font-semibold text-foreground">Course summary</p>
            {[
              { l:"Title",        v:"AI Red Teaming Foundations" },
              { l:"Modules",      v:"3 modules · 6 lessons" },
              { l:"Total hours",  v:"~20 hours" },
              { l:"Proof output", v:"Red Team Campaign Scope + Red Team Report" },
              { l:"QA score",     v:"72% — all failures resolved" },
            ].map(({ l,v })=>(
              <div key={l} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{l}</span>
                <span className="text-xs font-medium text-foreground">{v}</span>
              </div>
            ))}
          </div>

          {/* Quality badges earned */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-foreground mb-3">Quality signals for review</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label:"Source-mapped", color:C.teal, earned:true },
                { label:"Tutor-ready",   color:C.violet, earned:true },
                { label:"Artifact-based", color:C.orange, earned:true },
                { label:"Rubric-reviewed", color:C.blue, earned:true },
                { label:"Accessibility-checked", color:C.green, earned:false },
              ].map(b=>(
                <span key={b.label}
                  style={{ background:b.earned?b.color.light:C.slate.muted, color:b.earned?b.color.base:C.slate.base,
                           border:`1px solid ${b.earned?b.color.border:C.slate.border}` }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${b.earned?"":"opacity-50 line-through"}`}>
                  {b.earned && <Check size={11}/>}
                  {b.label}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Accessibility badge pending — video transcript missing. OpenEd Team will flag if required.</p>
          </div>

          {/* Reviewer notes */}
          <div>
            <Field label="Notes for the OpenEd reviewer" hint="Optional — help the reviewer understand your pedagogical choices">
              <Textarea rows={4} placeholder="e.g. This course handles sensitive red teaming content. All examples are fictional and de-risked per the safety policy. Phase M2 uses sandboxed prompts verified against the harm checklist."/>
            </Field>
          </div>

          {/* Declaration */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <p className="text-xs font-semibold text-foreground mb-1">Educator declaration</p>
            {[
              { key:"orig" as const,    text:"I confirm that all course content is original or properly licensed. I am responsible for its accuracy." },
              { key:"safe" as const,    text:"I confirm that no content provides harmful operational instructions and all sensitive examples are fictional and sandboxed." },
              { key:"sources" as const, text:"I confirm that all cited sources are real, relevant, and correctly attributed." },
              { key:"ai" as const,      text:"I confirm that any AI-assisted content has been reviewed, edited, and is my responsibility as the educator." },
            ].map(({ key,text })=>(
              <label key={key} className="flex items-start gap-3 cursor-pointer group">
                <div onClick={()=>setDeclared(d=>({ ...d,[key]:!d[key] }))}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors
                    ${declared[key]?"border-green-500 bg-green-500":"border-border group-hover:border-primary"}`}>
                  {declared[key] && <Check size={11} color="white"/>}
                </div>
                <span className="text-xs text-secondary-foreground leading-relaxed">{text}</span>
              </label>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={!allChecked}
            style={{ background:allChecked ? C.blue.base : undefined }}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
              ${allChecked?"text-white hover:opacity-90":"bg-secondary text-muted-foreground cursor-not-allowed"}`}>
            <Send size={15}/> Submit for OpenEd review
          </button>
          {!allChecked && (
            <p className="text-center text-xs text-muted-foreground">Check all four declarations to enable submission.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────

const NAV: { id:Screen; label:string; Icon:React.FC<any>; group:string }[] = [
  { id:"dashboard", label:"Dashboard",         Icon:LayoutDashboard, group:"Studio" },
  { id:"create",    label:"New course",         Icon:Plus,            group:"Studio" },
  { id:"outline",   label:"Course outline",     Icon:FileText,        group:"Course" },
  { id:"lesson",    label:"Lesson editor",      Icon:Edit3,           group:"Course" },
  { id:"media",     label:"Media & sources",    Icon:Bookmark,        group:"Course" },
  { id:"quiz",      label:"Quiz builder",       Icon:HelpCircle,      group:"Assessment" },
  { id:"rubric",    label:"Rubric builder",     Icon:Target,          group:"Assessment" },
  { id:"artifact",  label:"Artifact template",  Icon:Package,         group:"Assessment" },
  { id:"tutor",     label:"AI tutor settings",  Icon:Sparkles,        group:"Publish" },
  { id:"preview",   label:"Preview as learner", Icon:Eye,             group:"Publish" },
  { id:"qa",        label:"Publish QA",         Icon:Shield,          group:"Publish" },
  { id:"submit",    label:"Submit for review",  Icon:Send,            group:"Publish" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function go(s: Screen) { setScreen(s); }

  const groups = [...new Set(NAV.map(n=>n.group))];
  const qaFails = QA_CHECKS.filter(c=>c.result==="fail").length;

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground" style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-40">
        <button onClick={()=>setSidebarOpen(o=>!o)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <Menu size={16} className="text-muted-foreground"/>
        </button>
        <div className="flex items-center gap-2 mr-2">
          <div style={{ background:C.teal.base }} className="w-6 h-6 rounded flex items-center justify-center">
            <GraduationCap size={13} color="white"/>
          </div>
          <span className="font-bold text-sm text-foreground">OpenEd</span>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">/ Educator Studio</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {qaFails>0 && screen!=="qa" && (
            <button onClick={()=>go("qa")}
              style={{ background:C.amber.light, color:C.amber.base, border:`1px solid ${C.amber.border}` }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity">
              <AlertTriangle size={11}/> {qaFails} QA issues
            </button>
          )}
          <button onClick={()=>setDark(d=>!d)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            {dark ? <Sun size={14} className="text-muted-foreground"/> : <Moon size={14} className="text-muted-foreground"/>}
          </button>
          <div style={{ background:C.teal.base }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold">E</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`border-r border-border bg-card flex-shrink-0 flex flex-col transition-all duration-200 overflow-y-auto ${sidebarOpen?"w-52":"w-14"}`}>
          <nav className="flex-1 p-2">
            {groups.map(group=>(
              <div key={group} className="mb-4">
                {sidebarOpen && (
                  <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase px-2 mb-1">{group}</p>
                )}
                <div className="space-y-0.5">
                  {NAV.filter(n=>n.group===group).map(({ id, label, Icon })=>{
                    const isActive = screen===id;
                    const hasAlert = id==="qa" && qaFails>0;
                    return (
                      <button key={id} onClick={()=>go(id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all
                          ${isActive?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                        <Icon size={15} className="flex-shrink-0"/>
                        {sidebarOpen && (
                          <span className="text-xs font-medium truncate flex-1">{label}</span>
                        )}
                        {sidebarOpen && hasAlert && (
                          <span style={{ background:C.amber.base }} className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                            {qaFails}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Course status in sidebar */}
          {sidebarOpen && (
            <div className="m-2 p-3 rounded-xl border border-border bg-background">
              <p className="font-mono text-[9px] tracking-widest text-muted-foreground mb-2">ACTIVE COURSE</p>
              <p className="text-xs font-semibold text-foreground leading-tight mb-1.5">AI Red Teaming Foundations</p>
              <StatusBadge status="changes_requested"/>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {screen==="dashboard" && <DashboardScreen go={go}/>}
          {screen==="create"    && <CreateScreen go={go}/>}
          {screen==="outline"   && <OutlineScreen go={go}/>}
          {screen==="lesson"    && <LessonScreen go={go}/>}
          {screen==="media"     && <MediaScreen go={go}/>}
          {screen==="quiz"      && <QuizScreen go={go}/>}
          {screen==="rubric"    && <RubricScreen go={go}/>}
          {screen==="artifact"  && <ArtifactScreen go={go}/>}
          {screen==="tutor"     && <TutorScreen go={go}/>}
          {screen==="preview"   && <PreviewScreen go={go}/>}
          {screen==="qa"        && <QAScreen go={go}/>}
          {screen==="submit"    && <SubmitScreen go={go}/>}
        </main>
      </div>
    </div>
  );
}
