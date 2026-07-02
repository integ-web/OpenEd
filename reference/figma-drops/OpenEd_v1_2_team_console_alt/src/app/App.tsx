import { useState, useEffect } from "react";
import {
  LayoutDashboard, ClipboardList, BookOpen, Bookmark, Target, Flag,
  Users, BarChart2, Shield, CheckSquare, FileCode, ChevronRight,
  Check, X, AlertTriangle, AlertCircle, Info, Clock, RefreshCw,
  Eye, Send, Trash2, Lock, Unlock, ArrowRight, ChevronDown,
  Moon, Sun, Menu, ExternalLink, Copy, Filter, Search,
  TrendingUp, TrendingDown, Minus, Award, Zap, Database
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "qa-queue" | "course-review" | "source-coverage" | "assessment"
  | "reports" | "roles" | "metrics" | "safety-cases"
  | "release" | "rls-handoff";

type CourseStatus = "draft"|"submitted"|"in_review"|"changes_requested"|"approved"|"published"|"monitored";
type ReportSeverity = "critical"|"high"|"medium"|"low";
type QAResult = "pass"|"fail"|"warn"|"skip";
type RoleState = "learner_active"|"educator_applicant"|"educator_active"|"educator_suspended"|"team_reviewer"|"team_admin";

// ─── Design tokens ────────────────────────────────────────────────────────────

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

// ─── Sample data ──────────────────────────────────────────────────────────────

const COURSES = [
  { id:"c1", title:"AI Red Teaming Foundations",    educator:"Kavya Reddy",   status:"changes_requested" as CourseStatus, qaScore:64, fails:3, warns:2, submitted:"2026-06-16", risk:"medium" },
  { id:"c2", title:"LLM Evaluation in Production",   educator:"Amara Osei",    status:"submitted"         as CourseStatus, qaScore:81, fails:1, warns:3, submitted:"2026-06-17", risk:"low"    },
  { id:"c3", title:"Frontier Model Evaluations",     educator:"OpenEd Team",   status:"published"         as CourseStatus, qaScore:94, fails:0, warns:1, submitted:"2026-05-10", risk:"none"   },
  { id:"c4", title:"Python for AI Safety Research",  educator:"Dmitri Volkov", status:"draft"             as CourseStatus, qaScore:0,  fails:0, warns:0, submitted:"—",          risk:"none"   },
];

const QA_CHECKS = [
  // Content
  { cat:"Content", item:"Course has audience and prerequisites",        r:"pass" as QAResult },
  { cat:"Content", item:"Course has 3+ learning outcomes",             r:"pass" as QAResult },
  { cat:"Content", item:"All lessons have learning objectives",         r:"fail" as QAResult, note:"M1.L3 and M2.L2 missing objectives." },
  { cat:"Content", item:"All lessons have summary text",               r:"pass" as QAResult },
  { cat:"Content", item:"All lessons have practice or knowledge check", r:"fail" as QAResult, note:"M2.L1 and M3.L1 have no practice activity." },
  { cat:"Content", item:"Every module has artifact or assessment",      r:"warn" as QAResult, note:"M3 has no artifact template." },
  // Sources
  { cat:"Sources", item:"All claim-heavy lessons have source cards",   r:"fail" as QAResult, note:"M2.L2 has 2 unsourced claims." },
  { cat:"Sources", item:"Sources marked required / optional",           r:"pass" as QAResult },
  { cat:"Sources", item:"No broken or unreachable links",              r:"pass" as QAResult },
  { cat:"Sources", item:"Advanced resources separated",                 r:"warn" as QAResult, note:"S3 not flagged as advanced track." },
  // Assessment
  { cat:"Assessment", item:"All quizzes have correct explanations",    r:"pass" as QAResult },
  { cat:"Assessment", item:"Wrong answers have specific feedback",      r:"fail" as QAResult, note:"Q2 and Q3 use generic wrong-answer copy." },
  { cat:"Assessment", item:"Rubrics have criteria and descriptors",    r:"pass" as QAResult },
  { cat:"Assessment", item:"Artifacts have worked example",            r:"warn" as QAResult, note:"No non-example in Red Team Report artifact." },
  // Tutor
  { cat:"AI Tutor",   item:"Lessons have tutor context summary",       r:"fail" as QAResult, note:"M2.L1 and M2.L2 missing context." },
  { cat:"AI Tutor",   item:"Suggested prompt chips defined",           r:"fail" as QAResult, note:"No prompt chips for M2 lessons." },
  { cat:"AI Tutor",   item:"Restricted topics declared",               r:"pass" as QAResult },
  // Accessibility
  { cat:"Accessibility", item:"External videos have authored summary", r:"fail" as QAResult, note:"M1.L2 reference video missing summary." },
  { cat:"Accessibility", item:"Language complexity appropriate",        r:"warn" as QAResult, note:"3 sentences above Grade 14 in M1.L1." },
  // Safety
  { cat:"Safety", item:"No harmful operational instructions",          r:"pass" as QAResult },
  { cat:"Safety", item:"Sensitive examples use sandboxed framing",     r:"pass" as QAResult },
  { cat:"Safety", item:"No unsupported safety claims",                 r:"warn" as QAResult, note:"M1.L2 makes unqualified risk claim." },
];

const REPORTS = [
  { id:"R001", type:"Harmful or unsafe content",    course:"AI Red Teaming Foundations", lesson:"M1.L2", reporter:"anon",          severity:"critical" as ReportSeverity, sla:"24h", age:"2h",   status:"open",     note:"Reporter claims lesson includes operational red team steps without sandboxing." },
  { id:"R002", type:"Tutor hallucination",           course:"Frontier Model Evaluations",  lesson:"P1.L4", reporter:"learner_4521", severity:"high"     as ReportSeverity, sla:"24h", age:"6h",   status:"in_review", note:"Tutor cited a source that does not exist in the course library (S-099)." },
  { id:"R003", type:"Broken source",                 course:"AI Red Teaming Foundations", lesson:"M2.L1", reporter:"learner_8832", severity:"medium"   as ReportSeverity, sla:"72h", age:"18h",  status:"open",     note:"S3 URL returns 404. May have been removed." },
  { id:"R004", type:"Incorrect course content",      course:"LLM Evaluation in Production",lesson:"L2",   reporter:"learner_2290", severity:"medium"   as ReportSeverity, sla:"72h", age:"1d",   status:"resolved", note:"Reviewer confirmed the claim is correct under a narrower reading. Closed." },
  { id:"R005", type:"Formatting / readability",      course:"Frontier Model Evaluations",  lesson:"P2.L3", reporter:"learner_0034", severity:"low"      as ReportSeverity, sla:"batch",age:"3d",  status:"open",     note:"Long paragraph without line breaks in transcript section." },
];

const USERS = [
  { id:"u1", name:"Ananya Krishnan",  email:"ananya@ex.com",    role:"learner_active"      as RoleState, joined:"2026-06-01", courses:1, artifacts:4 },
  { id:"u2", name:"Kavya Reddy",      email:"kavya@ex.com",     role:"educator_active"     as RoleState, joined:"2026-05-15", courses:2, artifacts:0 },
  { id:"u3", name:"Dmitri Volkov",    email:"dmitri@ex.com",    role:"educator_applicant"  as RoleState, joined:"2026-06-10", courses:1, artifacts:0 },
  { id:"u4", name:"Rohan Mehta",      email:"rohan@ex.com",     role:"learner_active"      as RoleState, joined:"2026-06-03", courses:1, artifacts:2 },
  { id:"u5", name:"Amara Osei",       email:"amara@ex.com",     role:"educator_active"     as RoleState, joined:"2026-05-28", courses:1, artifacts:0 },
  { id:"u6", name:"Priya Sharma",     email:"priya@ex.com",     role:"educator_suspended"  as RoleState, joined:"2026-05-20", courses:0, artifacts:0 },
  { id:"u7", name:"Admin Account",    email:"team@opened.ai",   role:"team_admin"          as RoleState, joined:"2026-04-01", courses:0, artifacts:0 },
];

const AUDIT_LOG = [
  { ts:"2026-06-18 14:32", actor:"team@opened.ai",    action:"course.status_change",    target:"c1 → changes_requested", note:"3 QA fails blocking approval." },
  { ts:"2026-06-18 12:10", actor:"team@opened.ai",    action:"report.status_change",    target:"R004 → resolved",         note:"Claim verified correct." },
  { ts:"2026-06-17 09:45", actor:"team@opened.ai",    action:"role.educator_approved",  target:"educator: Amara Osei",    note:"Application reviewed, quality sample passed." },
  { ts:"2026-06-16 16:00", actor:"team@opened.ai",    action:"user.suspended",          target:"educator: Priya Sharma",  note:"Repeated low-quality submissions after warnings." },
  { ts:"2026-06-15 11:22", actor:"team@opened.ai",    action:"course.published",        target:"c3 — FME",                note:"QA score 94, all gates passed." },
];

const SAFETY_CASES = [
  { id:"SC-01", title:"Operational red team content — AI Red Teaming M1.L2", severity:"critical" as ReportSeverity, opened:"2026-06-18", status:"active",   actions:["Course visibility restricted pending review","Educator notified","Human review assigned"] },
  { id:"SC-02", title:"Tutor hallucination — invented source S-099 in FME",  severity:"high"     as ReportSeverity, opened:"2026-06-18", status:"active",   actions:["Tutor log reviewed","Source not found in registry","Requesting educator comment"] },
  { id:"SC-03", title:"Educator repeat low-quality submissions",              severity:"medium"   as ReportSeverity, opened:"2026-06-15", status:"resolved", actions:["Three warnings issued","Account suspended after 3rd incident","Educator may appeal after 30 days"] },
];

// ─── Shared micro-components ──────────────────────────────────────────────────

const STATUS_CFG: Record<CourseStatus, { label:string; bg:string; text:string }> = {
  draft:             { label:"Draft",              bg:C.slate.light,  text:C.slate.base  },
  submitted:         { label:"Submitted",          bg:C.blue.light,   text:C.blue.base   },
  in_review:         { label:"In review",          bg:C.violet.light, text:C.violet.base },
  changes_requested: { label:"Changes requested",  bg:C.amber.light,  text:C.amber.base  },
  approved:          { label:"Approved",           bg:C.green.light,  text:C.green.base  },
  published:         { label:"Published",          bg:C.teal.light,   text:C.teal.base   },
  monitored:         { label:"Monitored",          bg:C.teal.light,   text:C.teal.base   },
};

const SEV_CFG: Record<ReportSeverity, { label:string; bg:string; text:string; sla:string }> = {
  critical: { label:"CRITICAL", bg:C.red.light,   text:C.red.base,   sla:"<24h" },
  high:     { label:"HIGH",     bg:C.orange.light, text:C.orange.base,sla:"<24h" },
  medium:   { label:"MED",      bg:C.amber.light,  text:C.amber.base, sla:"<72h" },
  low:      { label:"LOW",      bg:C.slate.light,  text:C.slate.base, sla:"batch"},
};

function StatusPill({ s }: { s: CourseStatus }) {
  const t = STATUS_CFG[s];
  return <span style={{ background:t.bg, color:t.text }} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded">{t.label}</span>;
}

function SevPill({ s }: { s: ReportSeverity }) {
  const t = SEV_CFG[s];
  return <span style={{ background:t.bg, color:t.text }} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded tracking-wider">{t.label}</span>;
}

function QAIcon({ r }: { r: QAResult }) {
  if (r==="pass") return <Check size={13} style={{ color:C.green.base }}/>;
  if (r==="fail") return <X size={13} style={{ color:C.red.base }}/>;
  if (r==="warn") return <AlertTriangle size={13} style={{ color:C.amber.base }}/>;
  return <Minus size={13} className="text-muted-foreground"/>;
}

function SectionHead({ label, sub }: { label:string; sub?:string }) {
  return (
    <div className="mb-5 pb-4 border-b border-border">
      <h2 className="text-lg font-bold text-foreground">{label}</h2>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function StatCard({ label, value, sub, delta, color }: { label:string; value:string|number; sub?:string; delta?:number; color?: typeof C.blue }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1" style={color ? { color:color.base } : {}}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
      {delta !== undefined && (
        <div className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
          {delta >= 0 ? <TrendingUp size={10}/> : <TrendingDown size={10}/>} {delta >= 0 ? "+" : ""}{delta}% vs last week
        </div>
      )}
    </div>
  );
}

function DevNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background:"#0F1117", border:`1px solid #334155` }} className="rounded-xl p-4 font-mono text-xs leading-relaxed text-green-400">
      {children}
    </div>
  );
}

// ─── Screen 1: QA Queue ───────────────────────────────────────────────────────

function QAQueueScreen({ go, setActiveId }: { go:(s:Screen)=>void; setActiveId:(id:string)=>void }) {
  const pending = COURSES.filter(c => ["submitted","in_review","changes_requested"].includes(c.status));
  const published = COURSES.filter(c => ["published","monitored"].includes(c.status));

  const qaScoreColor = (s: number) => s >= 85 ? C.green : s >= 70 ? C.blue : s >= 50 ? C.amber : C.red;

  return (
    <div className="p-6 max-w-5xl">
      <SectionHead label="Content QA queue" sub="Courses awaiting review or flagged for attention. Automated checks run before human review." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Pending review"   value={pending.length}   sub="Need action" color={C.amber}/>
        <StatCard label="Critical fails"   value="3"                sub="Blocking approval" color={C.red}/>
        <StatCard label="Avg QA score"     value="73"               sub="/ 100 across queue"/>
        <StatCard label="Median review time" value="3.2d"           sub="Target: <5d"/>
      </div>

      {/* Pending */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Pending</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Course","Educator","Status","QA score","Fails","Warns","Submitted","Risk",""].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pending.map(c => {
                const sc = qaScoreColor(c.qaScore);
                return (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                    onClick={() => { setActiveId(c.id); go("course-review"); }}>
                    <td className="px-4 py-3 font-medium text-foreground max-w-48 truncate">{c.title}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.educator}</td>
                    <td className="px-4 py-3"><StatusPill s={c.status}/></td>
                    <td className="px-4 py-3">
                      <span style={{ background:sc.light, color:sc.base }} className="font-mono text-xs font-bold px-2 py-0.5 rounded">
                        {c.qaScore > 0 ? c.qaScore : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {c.fails > 0 ? <span style={{ color:C.red.base }} className="font-mono text-xs font-bold">{c.fails}</span> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {c.warns > 0 ? <span style={{ color:C.amber.base }} className="font-mono text-xs font-bold">{c.warns}</span> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.submitted}</td>
                    <td className="px-4 py-3">
                      {c.risk !== "none" && <span style={{ background:c.risk==="medium"?C.amber.light:C.red.light, color:c.risk==="medium"?C.amber.base:C.red.base }} className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase">{c.risk}</span>}
                    </td>
                    <td className="px-4 py-3"><ChevronRight size={14} className="text-muted-foreground"/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Published */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Published — monitored</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Course","Status","QA score","Reports","Published"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {published.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer"
                  onClick={() => { setActiveId(c.id); go("course-review"); }}>
                  <td className="px-4 py-3 font-medium text-foreground">{c.title}</td>
                  <td className="px-4 py-3"><StatusPill s={c.status}/></td>
                  <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color:C.green.base }}>{c.qaScore}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {c.id === "c3" ? <span style={{ color:C.amber.base }}>2 open</span> : "0"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Course Review ──────────────────────────────────────────────────

function CourseReviewScreen({ go }: { go:(s:Screen)=>void }) {
  const [decision, setDecision] = useState<"approve"|"changes"|"reject"|null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const cats = [...new Set(QA_CHECKS.map(c => c.cat))];
  const fails = QA_CHECKS.filter(c => c.r === "fail").length;
  const warns = QA_CHECKS.filter(c => c.r === "warn").length;
  const score = Math.round((QA_CHECKS.filter(c => c.r === "pass").length / QA_CHECKS.length) * 100);

  return (
    <div className="p-6 max-w-5xl">
      <button onClick={() => go("qa-queue")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowRight size={12} className="rotate-180"/> QA queue
      </button>
      <div className="flex items-start gap-4 flex-wrap mb-5">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] text-muted-foreground mb-0.5">COURSE REVIEW · c1</p>
          <h2 className="text-lg font-bold text-foreground">AI Red Teaming Foundations</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <StatusPill s="changes_requested"/>
            <span className="text-xs text-muted-foreground">Educator: Kavya Reddy · Submitted 2026-06-16</span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          <button onClick={() => go("source-coverage")} className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">Source report</button>
          <button onClick={() => go("assessment")} className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:bg-secondary transition-colors">Assessment audit</button>
        </div>
      </div>

      {/* Score summary */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="QA score" value={score} sub="/ 100" color={C.amber}/>
        <StatCard label="Fails" value={fails} sub="Blocking" color={C.red}/>
        <StatCard label="Warnings" value={warns} sub="Non-blocking" color={C.amber}/>
        <StatCard label="Pass" value={QA_CHECKS.filter(c=>c.r==="pass").length} sub={`/ ${QA_CHECKS.length} checks`} color={C.green}/>
      </div>

      {/* QA checks */}
      <div className="mb-6">
        {cats.map(cat => (
          <div key={cat} className="mb-4">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">{cat}</p>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {QA_CHECKS.filter(c => c.cat === cat).map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors">
                  <div className="mt-0.5 flex-shrink-0"><QAIcon r={item.r}/></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground">{item.item}</p>
                    {item.note && (
                      <p className="text-[11px] mt-0.5" style={{ color: item.r==="fail" ? C.red.base : C.amber.base }}>→ {item.note}</p>
                    )}
                  </div>
                  <span style={{
                    background: item.r==="pass"?C.green.light:item.r==="fail"?C.red.light:item.r==="warn"?C.amber.light:C.slate.light,
                    color: item.r==="pass"?C.green.base:item.r==="fail"?C.red.base:item.r==="warn"?C.amber.base:C.slate.base,
                  }} className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
                    {item.r.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decision */}
      {!sent ? (
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-semibold text-foreground mb-3">Reviewer decision</p>
          <div className="flex gap-2 mb-4">
            {([
              { id:"changes", label:"Request changes", color:C.amber },
              { id:"approve", label:"Approve",         color:C.green },
              { id:"reject",  label:"Reject",          color:C.red   },
            ] as const).map(d => (
              <button key={d.id} onClick={() => setDecision(d.id)}
                style={decision === d.id ? { background:d.color.base, color:"white" } : { border:`1px solid ${d.color.border}`, color:d.color.base, background:d.color.light }}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90">
                {d.label}
              </button>
            ))}
          </div>
          <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
            placeholder="Required: rationale for this decision. Educator will see this."
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none mb-3"/>
          <button disabled={!decision || !note.trim()} onClick={() => setSent(true)}
            style={{ background: decision && note.trim() ? C.blue.base : undefined }}
            className={`px-5 py-2 rounded-xl text-sm font-semibold ${decision && note.trim() ? "text-white hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
            Send decision
          </button>
        </div>
      ) : (
        <div style={{ background:C.green.light, border:`1px solid ${C.green.border}` }} className="rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1"><Check size={14} style={{ color:C.green.base }}/><p className="text-sm font-semibold">Decision sent and logged in audit trail.</p></div>
          <p className="text-xs text-muted-foreground">Educator has been notified. Status updated to <strong>{decision === "approve" ? "approved" : decision === "changes" ? "changes_requested" : "rejected"}</strong>.</p>
        </div>
      )}
    </div>
  );
}

// ─── Screen 3: Source Coverage ────────────────────────────────────────────────

function SourceCoverageScreen({ go }: { go:(s:Screen)=>void }) {
  const sources = [
    { id:"S1", title:"Anthropic Responsible Scaling Policy", org:"Anthropic", type:"Policy", lessons:["M1.L1","M1.L2","M2.L1"], required:true,  verified:true,  broken:false },
    { id:"S2", title:"Evaluating Frontier Models for Dangerous Capabilities", org:"Google DeepMind", type:"Paper", lessons:["M1.L2","M2.L2"], required:true, verified:true, broken:false },
    { id:"S3", title:"Red Teaming Language Models with Language Models", org:"Perez et al.", type:"Paper", lessons:["M2.L1"], required:false, verified:true, broken:true },
  ];
  const uncited = [
    { lesson:"M2.L2", claim:"A well-scoped red team campaign reduces false positive rate by up to 40%." },
    { lesson:"M2.L2", claim:"Most frontier labs run fewer than 5 red team sessions per model release." },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="Source coverage — AI Red Teaming Foundations" sub="All sources, lesson mappings, verification status, and unsupported claims." />

      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total sources" value={sources.length}/>
        <StatCard label="Broken links"  value={sources.filter(s=>s.broken).length} color={C.red}/>
        <StatCard label="Uncited claims" value={uncited.length} color={C.amber}/>
        <StatCard label="Coverage"       value="68%" sub="lessons with ≥1 source" color={C.amber}/>
      </div>

      {/* Source list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-5">
        <div className="px-5 py-2.5 border-b border-border grid grid-cols-12 gap-2">
          {["ID","Title","Type","Lessons","Required","Verified","Link"].map(h => (
            <div key={h} className="text-[10px] font-mono text-muted-foreground uppercase col-span-2 first:col-span-1 last:col-span-1">{h}</div>
          ))}
        </div>
        {sources.map(s => (
          <div key={s.id} className="px-5 py-3.5 border-b border-border last:border-0 grid grid-cols-12 gap-2 items-center hover:bg-secondary/20">
            <span className="font-mono text-[10px] text-muted-foreground col-span-1">{s.id}</span>
            <div className="col-span-2">
              <p className="text-xs font-medium text-foreground truncate">{s.title}</p>
              <p className="text-[10px] text-muted-foreground">{s.org}</p>
            </div>
            <span style={{ background:C.teal.light, color:C.teal.base }} className="text-[9px] font-mono px-1.5 py-0.5 rounded col-span-2">{s.type}</span>
            <div className="col-span-2 flex flex-wrap gap-0.5">
              {s.lessons.map(l => <span key={l} className="text-[9px] font-mono bg-secondary px-1 py-0.5 rounded">{l}</span>)}
            </div>
            <span className="col-span-2 text-[10px] font-mono" style={{ color: s.required ? C.blue.base : C.slate.base }}>
              {s.required ? "Required" : "Optional"}
            </span>
            <span className="col-span-1"><Check size={12} style={{ color:C.green.base }}/></span>
            <span className="col-span-1">
              {s.broken
                ? <span className="flex items-center gap-1 text-[10px]" style={{ color:C.red.base }}><X size={10}/> 404</span>
                : <span style={{ color:C.green.base }}><Check size={12}/></span>}
            </span>
          </div>
        ))}
      </div>

      {/* Unsupported claims */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Unsupported claims — flagged by automated check</p>
        <div className="space-y-2">
          {uncited.map((u,i) => (
            <div key={i} style={{ background:C.amber.light, border:`1px solid ${C.amber.border}` }} className="rounded-xl px-4 py-3 flex items-start gap-3">
              <AlertTriangle size={13} style={{ color:C.amber.base }} className="flex-shrink-0 mt-0.5"/>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">{u.lesson}</p>
                <p className="text-sm text-foreground italic mt-0.5">"{u.claim}"</p>
                <p className="text-[11px] mt-1" style={{ color:C.amber.base }}>No source card mapped to this claim. Educator must add source or rephrase.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Assessment Strength ───────────────────────────────────────────

function AssessmentScreen({ go }: { go:(s:Screen)=>void }) {
  const quizIssues = [
    { q:"Q2 — Why is scope important in red teaming?",   issue:"Wrong-answer feedback is generic — 'Incorrect, try again.' No diagnostic value.", severity:"fail" as QAResult },
    { q:"Q3 — Which practice best resists Goodharting?", issue:"Wrong-answer feedback missing for options A and C.", severity:"fail" as QAResult },
    { q:"Q1 — What defines a scoped campaign?",          issue:"Explanation is clear. No issues.", severity:"pass" as QAResult },
  ];
  const rubricIssues = [
    { artifact:"Red Team Campaign Scope", issue:"No non-example provided. Rubric descriptors exist but learner cannot compare against a weak example.", severity:"warn" as QAResult },
    { artifact:"Red Team Report",         issue:"Criterion 'Evidence linkage' descriptor at Beginning level is vague. 'Needs work' does not tell learner what to fix.", severity:"warn" as QAResult },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="Assessment strength — AI Red Teaming Foundations" sub="Quiz quality, rubric depth, and artifact completeness audit." />

      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Quiz questions" value="8" sub="across 3 modules"/>
        <StatCard label="Quiz fails"     value="2" sub="Wrong-answer feedback" color={C.red}/>
        <StatCard label="Rubric warnings" value="2" sub="Descriptor gaps" color={C.amber}/>
      </div>

      {/* Quiz */}
      <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Quiz quality</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden mb-5">
        {quizIssues.map((q,i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <div className="mt-0.5 flex-shrink-0"><QAIcon r={q.severity}/></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{q.q}</p>
              <p className="text-[11px] mt-0.5" style={{ color: q.severity==="fail" ? C.red.base : q.severity==="warn" ? C.amber.base : C.green.base }}>
                {q.issue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rubric */}
      <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Rubric and artifact quality</p>
      <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden mb-5">
        {rubricIssues.map((r,i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5">
            <div className="mt-0.5 flex-shrink-0"><QAIcon r={r.severity}/></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{r.artifact}</p>
              <p className="text-[11px] mt-0.5" style={{ color:C.amber.base }}>{r.issue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rubric-level distribution */}
      <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Learner rubric score distribution (FME — published)</p>
      <div className="space-y-2">
        {[
          { crit:"Specificity",      pct:{ b:25, p:50, s:25 } },
          { crit:"Evidence linkage", pct:{ b:55, p:30, s:15 } },
          { crit:"Safety handling",  pct:{ b:10, p:60, s:30 } },
          { crit:"Communication",    pct:{ b:15, p:55, s:30 } },
        ].map(r => (
          <div key={r.crit} className="flex items-center gap-3">
            <span className="text-xs text-foreground w-36 flex-shrink-0">{r.crit}</span>
            <div className="flex-1 flex h-4 rounded-full overflow-hidden gap-px">
              <div style={{ width:`${r.pct.b}%`, background:C.red.base }} title={`Beginning ${r.pct.b}%`} className="h-full"/>
              <div style={{ width:`${r.pct.p}%`, background:C.blue.base }} title={`Passing ${r.pct.p}%`} className="h-full"/>
              <div style={{ width:`${r.pct.s}%`, background:C.green.base }} title={`Strong ${r.pct.s}%`} className="h-full"/>
            </div>
            {r.pct.b > 40 && <span className="text-[10px]" style={{ color:C.amber.base }}>⚠ high Beginning</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {[["Beginning",C.red],["Passing",C.blue],["Strong",C.green]].map(([l,c]) => (
          <div key={l as string} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background:(c as typeof C.blue).base }}/>
            {l as string}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 5: Reported Content ───────────────────────────────────────────────

function ReportsScreen({ go }: { go:(s:Screen)=>void }) {
  const [filter, setFilter] = useState<"all"|ReportSeverity>("all");
  const [selected, setSelected] = useState<string|null>(null);
  const filtered = filter === "all" ? REPORTS : REPORTS.filter(r => r.severity === filter);
  const open = REPORTS.filter(r => r.status !== "resolved").length;

  return (
    <div className="p-6 max-w-5xl">
      <SectionHead label="Reported content" sub="Learner and automated reports. Critical and high require human action within SLA." />

      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Open reports" value={open} color={open > 0 ? C.amber : C.green}/>
        <StatCard label="Critical / High" value={REPORTS.filter(r=>["critical","high"].includes(r.severity)&&r.status!=="resolved").length} color={C.red}/>
        <StatCard label="Avg resolution" value="1.4d" sub="Target: <3d"/>
        <StatCard label="This week" value={REPORTS.length} sub="Total reported"/>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all","critical","high","medium","low"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all uppercase ${filter===f ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}>
            {f} {f !== "all" && `(${REPORTS.filter(r => r.severity === f).length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1 bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
          {filtered.map(r => (
            <div key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)}
              className={`px-5 py-4 cursor-pointer transition-colors hover:bg-secondary/30 ${selected===r.id ? "bg-secondary/50" : ""}`}>
              <div className="flex items-start gap-3">
                <SevPill s={r.severity}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{r.type}</p>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${r.status==="resolved" ? "bg-green-100 text-green-700" : r.status==="in_review" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{r.course} · {r.lesson}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{r.id} · {r.age} ago · SLA {r.sla}</p>
                </div>
              </div>
              {selected === r.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-foreground mb-3 leading-relaxed">{r.note}</p>
                  <div className="flex gap-2 flex-wrap">
                    {r.status !== "resolved" && (
                      <>
                        <button style={{ background:C.blue.base }} className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">Mark in review</button>
                        <button style={{ background:C.green.base }} className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">Resolve</button>
                        {(r.severity === "critical" || r.severity === "high") && (
                          <button style={{ background:C.red.base }} className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">Restrict content</button>
                        )}
                      </>
                    )}
                    <button className="px-3 py-1.5 rounded-lg text-xs border border-border bg-card text-muted-foreground hover:bg-secondary">View lesson</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SLA legend */}
        <div className="w-52 flex-shrink-0 space-y-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] font-mono text-muted-foreground uppercase mb-3">SLA policy</p>
            {Object.entries(SEV_CFG).map(([k,v]) => (
              <div key={k} className="flex items-center gap-2 mb-2">
                <SevPill s={k as ReportSeverity}/>
                <span className="text-[10px] text-muted-foreground">{v.sla}</span>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2">Critical action</p>
            <p className="text-xs text-secondary-foreground leading-relaxed">Critical reports should result in immediate visibility restriction until human review is complete.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: User / Role Management ────────────────────────────────────────

function RolesScreen({ go }: { go:(s:Screen)=>void }) {
  const applicants = USERS.filter(u => u.role === "educator_applicant");
  const suspended  = USERS.filter(u => u.role === "educator_suspended");

  const roleLabel: Record<RoleState, { label:string; color:typeof C.blue }> = {
    learner_active:     { label:"Learner",            color:C.blue   },
    educator_applicant: { label:"Educator applicant", color:C.amber  },
    educator_active:    { label:"Educator",           color:C.violet },
    educator_suspended: { label:"Suspended",          color:C.red    },
    team_reviewer:      { label:"Team reviewer",      color:C.teal   },
    team_admin:         { label:"Team admin",         color:C.teal   },
  };

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="User & role management" sub="Three roles only: Learner, Educator, OpenEd Team. No org portals, no employer dashboards in v1." />

      {/* Role state machine */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <p className="text-[10px] font-mono text-muted-foreground uppercase mb-3">Role state machine — v1</p>
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-foreground">
          {[
            "anonymous",
            "→ learner_pending_email",
            "→ learner_active",
            "→ educator_applicant",
            "→ educator_active",
            "⟷ educator_suspended",
          ].map((s,i) => (
            <span key={i} className={`px-2 py-1 rounded ${s.startsWith("→") || s.startsWith("⟷") ? "text-muted-foreground" : "bg-secondary text-foreground"}`}>{s}</span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs font-mono text-foreground">
          {["team_member → team_reviewer → team_admin"].map((s,i) => (
            <span key={i} className="px-2 py-1 rounded bg-secondary">{s}</span>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3">Educator role is not self-granted. Requires OpenEd Team approval. Publishing always requires review gate.</p>
      </div>

      {/* Educator applications */}
      {applicants.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Educator applications — pending</p>
          <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
            {applicants.map(u => (
              <div key={u.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0">
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email} · Applied {u.joined}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button style={{ background:C.green.base }} className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">Approve</button>
                  <button style={{ background:C.red.light, color:C.red.base, border:`1px solid ${C.red.border}` }} className="px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full user table */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">All users</p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name","Email","Role","Joined","Courses","Artifacts","Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => {
                const rc = roleLabel[u.role];
                return (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/20">
                    <td className="px-4 py-3 font-medium text-foreground text-xs">{u.name}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <span style={{ background:rc.color.light, color:rc.color.base, border:`1px solid ${rc.color.border}` }}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded">{rc.label}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{u.joined}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{u.courses}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{u.artifacts}</td>
                    <td className="px-4 py-3">
                      {u.role === "educator_suspended" && <button className="text-[10px] text-primary hover:underline">Reinstate</button>}
                      {u.role === "educator_active"    && <button className="text-[10px]" style={{ color:C.amber.base }}>Warn / Suspend</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: Platform Metrics ───────────────────────────────────────────────

function MetricsScreen({ go }: { go:(s:Screen)=>void }) {
  const funnelRows = [
    { stage:"Visited landing",     n:3400, pct:100,  note:null },
    { stage:"Signed up",           n:612,  pct:18,   note:"18% conversion" },
    { stage:"Completed onboarding",n:428,  pct:70,   note:"target 60% ✓" },
    { stage:"Started first lesson",n:381,  pct:89,   note:"target 70% ✓" },
    { stage:"First quiz attempt",  n:187,  pct:49,   note:"target 35% ✓" },
    { stage:"First artifact start",n:96,   pct:25,   note:"target 25% ✓" },
    { stage:"Artifact submitted",  n:61,   pct:16,   note:null },
    { stage:"Rubric passed",       n:43,   pct:11,   note:null },
    { stage:"Proof portfolio item",n:31,   pct:8,    note:"north star 🎯" },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <SectionHead label="Platform metrics" sub="North star: meaningful proofs per active learner. Data is illustrative for v1 beta." />

      {/* North star */}
      <div style={{ background:C.blue.light, border:`1px solid ${C.blue.border}` }} className="rounded-xl p-4 mb-6 flex items-center gap-4">
        <Award size={24} style={{ color:C.blue.base }}/>
        <div>
          <p className="text-xs font-mono text-muted-foreground">NORTH STAR METRIC</p>
          <p className="text-2xl font-bold text-foreground">0.22</p>
          <p className="text-xs text-muted-foreground">Meaningful proofs per active learner · target 0.3 by end of beta</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">Definition</p>
          <p className="text-[10px] font-mono text-muted-foreground max-w-xs">Submitted portfolio-eligible artifacts meeting minimum rubric threshold / active learners in period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquisition funnel */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Acquisition & activation funnel</p>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {funnelRows.map((r,i) => {
              const barW = Math.max(r.pct, 2);
              const color = r.stage.includes("proof") ? C.green : r.pct >= 50 ? C.blue : C.slate;
              return (
                <div key={i} className="px-5 py-3 border-b border-border last:border-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-foreground">{r.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">{r.n.toLocaleString()}</span>
                      {r.note && <span className="text-[10px]" style={{ color: r.note.includes("✓") ? C.green.base : r.note.includes("🎯") ? C.blue.base : C.muted }}>{r.note}</span>}
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div style={{ width:`${barW}%`, background:color.base }} className="h-full rounded-full"/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality metrics */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Learning & proof quality</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l:"Artifact completion", v:"63%", sub:"Started → submitted", d:+8 },
                { l:"Rubric pass rate",    v:"71%", sub:"Target 70%",          d:+3 },
                { l:"Revision rate",       v:"38%", sub:"Healthy signal",      d:+5 },
                { l:"Avg rubric score",    v:"74",  sub:"/ 100",               d:0  },
              ].map(m => <StatCard key={m.l} label={m.l} value={m.v} sub={m.sub} delta={m.d}/>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Tutor quality</p>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {[
                { m:"Helpfulness rating",        v:"4.1 / 5",  ok:true },
                { m:"Source-grounded answers",   v:"78%",      ok:true },
                { m:"Tutor fallback rate",       v:"12%",      ok:true },
                { m:"Hallucination reports",     v:"1",        ok:false},
                { m:"Hint-to-answer ratio",      v:"3.2:1",    ok:true },
              ].map(r => (
                <div key={r.m} className="flex items-center justify-between px-5 py-2.5">
                  <span className="text-xs text-foreground">{r.m}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: r.ok ? C.green.base : C.amber.base }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-3 font-mono uppercase tracking-wider">Platform health</p>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {[
                { m:"Open reports",         v:"4",    ok:false },
                { m:"Broken sources",       v:"1",    ok:false },
                { m:"Video fallback rate",  v:"100%", ok:false, note:"All external — expected" },
                { m:"QA pass rate",         v:"50%",  ok:false, note:"Pre-launch baseline" },
                { m:"Avg review time",      v:"3.2d", ok:true  },
              ].map(r => (
                <div key={r.m} className="flex items-center justify-between px-5 py-2.5">
                  <div>
                    <span className="text-xs text-foreground">{r.m}</span>
                    {r.note && <span className="text-[10px] text-muted-foreground ml-2">({r.note})</span>}
                  </div>
                  <span className="font-mono text-xs font-bold" style={{ color: r.ok ? C.green.base : C.amber.base }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8: Trust / Safety Cases ──────────────────────────────────────────

function SafetyCasesScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="Trust & safety cases" sub="Active cases, escalation log, and audit trail. All team actions are logged." />

      {/* Active cases */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Active cases</p>
        <div className="space-y-3">
          {SAFETY_CASES.map(c => (
            <div key={c.id} style={{ border:`1px solid ${c.status==="resolved" ? C.green.border : c.severity==="critical" ? C.red.border : C.amber.border}` }}
              className="bg-card rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border flex items-center gap-3 flex-wrap">
                <SevPill s={c.severity}/>
                <p className="text-sm font-semibold text-foreground flex-1">{c.title}</p>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${c.status==="resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {c.status}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{c.id} · opened {c.opened}</span>
              </div>
              <div className="px-5 py-3">
                {c.actions.map((a,i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-secondary-foreground mb-1 last:mb-0">
                    <Check size={10} style={{ color: c.status==="resolved" ? C.green.base : C.slate.base }} className="flex-shrink-0"/>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit log */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-foreground font-mono uppercase tracking-wider">Audit log — append only</p>
          <span className="text-[10px] font-mono text-muted-foreground">All team admin actions logged here</span>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {AUDIT_LOG.map((e,i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20">
              <span className="font-mono text-[10px] text-muted-foreground flex-shrink-0 mt-0.5 w-36">{e.ts}</span>
              <span className="font-mono text-[10px] text-muted-foreground flex-shrink-0 w-28">{e.actor.split("@")[0]}</span>
              <span style={{ background:C.blue.light, color:C.blue.base }} className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0">{e.action}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-foreground truncate">{e.target}</p>
                <p className="text-[10px] text-muted-foreground">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9: Release Checklist ─────────────────────────────────────────────

function ReleaseScreen({ go }: { go:(s:Screen)=>void }) {
  type Gate = { area:string; item:string; status:"pass"|"fail"|"todo"|"warn"; note?:string };
  const gates: Gate[] = [
    // Technical
    { area:"Security",    item:"RLS enabled on all public schema tables",              status:"pass" },
    { area:"Security",    item:"Service role key not in any frontend bundle",          status:"pass" },
    { area:"Security",    item:"BYOK key not in logs, telemetry, or Sentry",          status:"pass" },
    { area:"Security",    item:"audit_events table writes on all admin actions",       status:"pass" },
    { area:"Security",    item:"Soft-delete on courses and profiles confirmed",        status:"todo", note:"Needs verification in staging." },
    { area:"Auth",        item:"Route guards tested for all three roles",              status:"pass" },
    { area:"Auth",        item:"Role escalation requires server-side check (not UI)", status:"pass" },
    { area:"Auth",        item:"Session expiry and token refresh working",            status:"warn", note:"Refresh token edge case under testing." },
    // Content
    { area:"Content",     item:"FME course QA score ≥ 80",                           status:"pass", note:"Score 94." },
    { area:"Content",     item:"No lorem ipsum in any published lesson",              status:"pass" },
    { area:"Content",     item:"All FME source URLs verified live",                  status:"warn", note:"3 sources not tested since 2026-06-10." },
    { area:"Content",     item:"Harmful content scan complete (FME)",                status:"pass" },
    // Product
    { area:"Product",     item:"Learner can complete full flow: signup → lesson → quiz → artifact → portfolio", status:"pass" },
    { area:"Product",     item:"BYOK setup and mock mode both functional",           status:"pass" },
    { area:"Product",     item:"Educator Studio v0 can create and submit course",    status:"pass" },
    { area:"Product",     item:"OpenEd Team console review flow functional",         status:"pass" },
    { area:"Product",     item:"Mobile and tablet layout QA passes",                 status:"warn", note:"Bottom nav touch targets need 44px audit." },
    { area:"Product",     item:"Proof ladder states update correctly",               status:"pass" },
    // Operations
    { area:"Ops",         item:"On-call rotation set for launch week",               status:"todo", note:"Schedule not confirmed." },
    { area:"Ops",         item:"Report queue SLA alerts configured",                 status:"todo", note:"Alerting not wired." },
    { area:"Ops",         item:"Backup and restore tested on Supabase project",      status:"todo" },
    { area:"Ops",         item:"Critical report escalation runbook written",         status:"pass" },
  ];

  const counts = { pass:0, fail:0, warn:0, todo:0 };
  gates.forEach(g => counts[g.status]++);
  const canLaunch = counts.fail === 0 && counts.todo === 0;

  const statusCfg = {
    pass: { label:"PASS", bg:C.green.light, text:C.green.base },
    fail: { label:"FAIL", bg:C.red.light,   text:C.red.base   },
    warn: { label:"WARN", bg:C.amber.light, text:C.amber.base },
    todo: { label:"TODO", bg:C.slate.light, text:C.slate.base },
  };
  const areas = [...new Set(gates.map(g => g.area))];

  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="v1 release checklist" sub="Launch gates across security, content, product, and operations. All FAIL and TODO must clear before launch." />

      {/* Summary */}
      <div className={`rounded-xl p-4 mb-6 flex items-center gap-4 flex-wrap ${canLaunch ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
        <div>
          <p className="text-sm font-bold text-foreground">{canLaunch ? "Ready to launch" : "Not launch-ready"}</p>
          <p className="text-xs text-muted-foreground">{counts.todo} TODO · {counts.warn} WARN · {counts.fail} FAIL · {counts.pass} PASS</p>
        </div>
        <div className="flex gap-2 ml-auto flex-wrap">
          {Object.entries(counts).map(([k,v]) => (
            <div key={k} style={{ background:statusCfg[k as keyof typeof statusCfg].bg, color:statusCfg[k as keyof typeof statusCfg].text }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
              {v} {k.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {areas.map(area => (
        <div key={area} className="mb-5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">{area}</p>
          <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
            {gates.filter(g => g.area === area).map((g,i) => {
              const sc = statusCfg[g.status];
              return (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-secondary/20">
                  <div className="mt-0.5 flex-shrink-0">
                    {g.status === "pass" ? <Check size={13} style={{ color:C.green.base }}/> :
                     g.status === "fail" ? <X size={13} style={{ color:C.red.base }}/> :
                     g.status === "warn" ? <AlertTriangle size={13} style={{ color:C.amber.base }}/> :
                     <Clock size={13} className="text-muted-foreground"/>}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground">{g.item}</p>
                    {g.note && <p className="text-[11px] mt-0.5 text-muted-foreground italic">{g.note}</p>}
                  </div>
                  <span style={{ background:sc.bg, color:sc.text }}
                    className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded flex-shrink-0">{sc.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Screen 10: RLS / IAM Dev Handoff ────────────────────────────────────────

function RLSHandoffScreen({ go }: { go:(s:Screen)=>void }) {
  return (
    <div className="p-6 max-w-4xl">
      <SectionHead label="RLS & IAM dev handoff" sub="Implementation notes for Supabase RLS, route guards, audit logging. Not a user-facing screen." />

      <div className="space-y-6">

        {/* Core tables */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Core tables and ownership model</p>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {[
              { table:"profiles",          rls:"auth.uid() = id",                   note:"Owner-only read/write. Team can read all via service role in edge function only." },
              { table:"courses",           rls:"status=published OR creator=uid()",  note:"Published: public read. Draft: creator only. Publish action server-side only." },
              { table:"course_enrollments",rls:"learner_id = auth.uid()",            note:"Learner sees own. Educator cannot read learner enrollments. Team read-all via function." },
              { table:"lesson_progress",   rls:"learner_id = auth.uid()",            note:"No cross-learner visibility. Aggregate stats via DB function, not raw table." },
              { table:"artifacts",         rls:"learner_id = auth.uid() OR (educator_course_owner AND feature_enabled)", note:"Private by default. Public only if learner shares." },
              { table:"artifact_feedback", rls:"educator owns course OR learner owns artifact", note:"Educator feedback visible to learner. Learner cannot see other feedback." },
              { table:"course_reviews",    rls:"role = open_ed_team",               note:"Team-only table. No educator or learner access." },
              { table:"content_reports",   rls:"reporter = auth.uid() OR role = open_ed_team", note:"Reporter sees own. Team sees all." },
              { table:"audit_events",      rls:"INSERT only via service role in edge functions; SELECT = team only", note:"Append-only. No delete. Tamper-evident." },
              { table:"tutor_sessions",    rls:"learner_id = auth.uid()",            note:"No API key stored. Non-sensitive metadata only." },
            ].map(r => (
              <div key={r.table} className="px-5 py-3.5 border-b border-border last:border-0">
                <div className="flex items-start gap-3">
                  <code className="font-mono text-xs text-foreground bg-secondary px-1.5 py-0.5 rounded flex-shrink-0">{r.table}</code>
                  <div>
                    <code className="font-mono text-[10px]" style={{ color:C.teal.base }}>{r.rls}</code>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{r.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Route guards */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Route guard map</p>
          <DevNote>
{`// Route access by role
// Public routes — no auth required
["/", "/catalog", "/course/:slug/preview", "/login", "/signup"]

// Learner-protected — role: learner_active
["/learner/dashboard", "/course/:slug/*", "/portfolio", "/settings/byok"]

// Educator-protected — role: educator_active
["/educator/dashboard", "/educator/course/:id/*"]

// Team-protected — role: open_ed_team_*
["/team/review", "/team/reports", "/team/roles", "/team/analytics", "/team/audit"]

// Guards implemented server-side via Supabase session + DB role check
// UI route guards are advisory only — never sole enforcement
// Escalation: team role requires open_ed_team_member state; sub-roles (reviewer, admin) checked per action`}
          </DevNote>
        </section>

        {/* Role check pattern */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Role check pattern</p>
          <DevNote>
{`// Never use UI-only role checks for sensitive actions
// Always verify role server-side before any state mutation

// Pattern: Supabase edge function
async function requireRole(req, requiredRole) {
  const { data: { user } } = await supabase.auth.getUser(req.headers.authorization)
  if (!user) throw new Error("401 Unauthenticated")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, role_state")
    .eq("id", user.id)
    .single()

  if (!profile || profile.role !== requiredRole) {
    throw new Error("403 Forbidden")
  }
  return profile
}

// Educator publish action: requires educator_active AND course_review approved
// Course status machine enforced server-side, never client-side
// Role escalation (learner → educator): OpenEd Team action only, audited`}
          </DevNote>
        </section>

        {/* Audit events */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Required audit event types</p>
          <DevNote>
{`// All write to audit_events via service role in edge functions only
// Learner cannot write audit_events directly (enforced by RLS)

const AUDIT_EVENTS = {
  "course.status_change":      // who, from_status, to_status, note
  "role.educator_approved":    // who approved, which educator
  "role.educator_rejected":    // who rejected, reason
  "user.suspended":            // who, reason, by whom
  "user.reinstated":           // who, by whom
  "artifact.accessed_by_team": // team member, artifact_id, reason (support/moderation)
  "report.status_change":      // report_id, from, to, by whom
  "course.visibility_changed": // course_id, from, to
  "admin.impersonation":       // MUST be logged; not supported in v1
}

// Retention: audit_events retained for 12 months minimum
// No soft-delete on audit_events — append-only constraint`}
          </DevNote>
        </section>

        {/* Security posture */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Security posture rules</p>
          <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
            {[
              { rule:"Service role key",     policy:"Never in frontend bundle. Never in client-side env vars. Edge functions only." },
              { rule:"BYOK key",             policy:"Never stored server-side. Never logged. Never in telemetry. Browser session/localStorage only." },
              { rule:"Learner PII",          policy:"Minimised. Display name only in public context. Email never exposed to educators or other learners." },
              { rule:"Artifact privacy",     policy:"Private by default. RLS enforced. Team access to learner artifacts only via audited support flow." },
              { rule:"Cross-learner data",   policy:"Strictly prohibited by RLS. Aggregate stats via DB function only." },
              { rule:"Role escalation",      policy:"Server-side check required. UI state never sole authority. Test with RLS policy unit tests." },
              { rule:"Tutor session logs",   policy:"No prompt content, no key, no full response stored. Metadata only (model, token count, rating)." },
            ].map(({ rule, policy }) => (
              <div key={rule} className="flex items-start gap-4 px-5 py-3">
                <code className="font-mono text-[10px] text-muted-foreground w-36 flex-shrink-0 mt-0.5">{rule}</code>
                <p className="text-[11px] text-foreground leading-relaxed">{policy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Test fixtures */}
        <section>
          <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">Required test fixtures for IAM</p>
          <DevNote>
{`// Minimum IAM test matrix before launch
[
  { actor:"learner_A", target:"learner_B artifact", expected:"403" },
  { actor:"learner_A", target:"course_reviews",      expected:"403" },
  { actor:"educator",  target:"another_educators_course", expected:"403" },
  { actor:"educator",  target:"publish_without_approval", expected:"403 from status machine" },
  { actor:"team",      target:"learner BYOK key",    expected:"not in DB (N/A)" },
  { actor:"anon",      target:"learner dashboard",   expected:"302 to /login" },
  { actor:"learner",   target:"team console route",  expected:"403" },
]

// Run via Supabase policy unit tests (supabase test db)
// All fixtures must pass before v1 launch gate clears`}
          </DevNote>
        </section>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const NAV: { id:Screen; label:string; icon:React.FC<any>; group:string }[] = [
  { id:"qa-queue",       label:"QA queue",          icon:ClipboardList, group:"Review"   },
  { id:"course-review",  label:"Course review",     icon:BookOpen,      group:"Review"   },
  { id:"source-coverage",label:"Source coverage",   icon:Bookmark,      group:"Review"   },
  { id:"assessment",     label:"Assessment audit",  icon:Target,        group:"Review"   },
  { id:"reports",        label:"Reported content",  icon:Flag,          group:"Trust"    },
  { id:"safety-cases",   label:"Safety cases",      icon:Shield,        group:"Trust"    },
  { id:"roles",          label:"Role management",   icon:Users,         group:"Platform" },
  { id:"metrics",        label:"Platform metrics",  icon:BarChart2,     group:"Platform" },
  { id:"release",        label:"Release checklist", icon:CheckSquare,   group:"Platform" },
  { id:"rls-handoff",    label:"RLS / IAM handoff", icon:FileCode,      group:"Dev"      },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("qa-queue");
  const [activeId, setActiveId] = useState("c1");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  function go(s: Screen) { setScreen(s); }

  const groups = [...new Set(NAV.map(n => n.group))];
  const openReports = REPORTS.filter(r => r.status !== "resolved").length;
  const criticalCases = SAFETY_CASES.filter(c => c.status === "active" && c.severity === "critical").length;

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground" style={{ fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="h-11 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(o => !o)}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
          <Menu size={15} className="text-muted-foreground"/>
        </button>
        <div className="flex items-center gap-2 mr-3">
          <div style={{ background:C.teal.base }} className="w-5 h-5 rounded flex items-center justify-center">
            <Shield size={11} color="white"/>
          </div>
          <span className="font-bold text-sm text-foreground">OpenEd</span>
          <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">/ Team Console · v1</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {criticalCases > 0 && (
            <button onClick={() => go("safety-cases")}
              style={{ background:C.red.light, color:C.red.base, border:`1px solid ${C.red.border}` }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold animate-pulse">
              {criticalCases} CRITICAL
            </button>
          )}
          {openReports > 0 && (
            <button onClick={() => go("reports")}
              style={{ background:C.amber.light, color:C.amber.base, border:`1px solid ${C.amber.border}` }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold">
              {openReports} reports open
            </button>
          )}
          <button onClick={() => setDark(d => !d)}
            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            {dark ? <Sun size={13} className="text-muted-foreground"/> : <Moon size={13} className="text-muted-foreground"/>}
          </button>
          <div style={{ background:C.teal.base }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold">T</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`border-r border-border bg-card flex-shrink-0 flex flex-col overflow-y-auto transition-all duration-200 ${sidebarOpen ? "w-48" : "w-12"}`}>
          <nav className="flex-1 p-2">
            {groups.map(group => (
              <div key={group} className="mb-4">
                {sidebarOpen && <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase px-2 mb-1">{group}</p>}
                <div className="space-y-0.5">
                  {NAV.filter(n => n.group === group).map(({ id, label, icon: Icon }) => {
                    const hasAlert = (id==="reports" && openReports > 0) || (id==="safety-cases" && criticalCases > 0);
                    return (
                      <button key={id} onClick={() => go(id)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all ${screen===id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                        <Icon size={14} className="flex-shrink-0"/>
                        {sidebarOpen && (
                          <span className="text-xs font-medium truncate flex-1">{label}</span>
                        )}
                        {sidebarOpen && hasAlert && (
                          <span style={{ background: id==="safety-cases" ? C.red.base : C.amber.base }}
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"/>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          {sidebarOpen && (
            <div className="m-2 p-2.5 rounded-xl border border-border bg-background">
              <p className="font-mono text-[9px] text-muted-foreground">Internal tool · 3 roles only · Not an LMS</p>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {screen === "qa-queue"        && <QAQueueScreen go={go} setActiveId={setActiveId}/>}
          {screen === "course-review"   && <CourseReviewScreen go={go}/>}
          {screen === "source-coverage" && <SourceCoverageScreen go={go}/>}
          {screen === "assessment"      && <AssessmentScreen go={go}/>}
          {screen === "reports"         && <ReportsScreen go={go}/>}
          {screen === "roles"           && <RolesScreen go={go}/>}
          {screen === "metrics"         && <MetricsScreen go={go}/>}
          {screen === "safety-cases"    && <SafetyCasesScreen go={go}/>}
          {screen === "release"         && <ReleaseScreen go={go}/>}
          {screen === "rls-handoff"     && <RLSHandoffScreen go={go}/>}
        </main>
      </div>
    </div>
  );
}
