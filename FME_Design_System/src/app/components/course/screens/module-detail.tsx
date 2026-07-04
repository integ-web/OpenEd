import { useState } from 'react';
import {
  CheckCircle2, Lock, Clock, ChevronRight, Play, BookOpen, Shield,
  FileText, AlertTriangle, Target, Layers, BarChart3, ExternalLink,
  Check, X, ChevronDown, ChevronUp, Award, Zap, ArrowRight,
} from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, getModule, type ModuleId } from '../course-types';

// ─── Module B static data ─────────────────────────────────────────────────────

const LESSONS = [
  { num: 1, title: 'Threat modeling for frontier systems',                  duration: '75 min', done: true,  active: false },
  { num: 2, title: 'NIST, FMF, AISI/CAISI, and AI Act landscape',           duration: '75 min', done: false, active: true  },
  { num: 3, title: 'Thresholds, safety cases, and mitigation logic',         duration: '70 min', done: false, active: false },
  { num: 4, title: 'Disclosure, dual-use ethics, and public reporting',      duration: '60 min', done: false, active: false },
];

const SKILLS = [
  { icon: Target,   label: 'Build a threat model',                    desc: 'Translate a vague risk concern into formal actors, pathways, assumptions, and consequence severity.' },
  { icon: BookOpen, label: 'Read a safety framework',                  desc: 'Navigate NIST AI RMF, Frontier Model Forum guidance, AISI standards, and EU GPAI obligations.' },
  { icon: BarChart3,label: 'Interpret risk thresholds',                desc: 'Understand what CCL, ASL, CAL, and TCL threshold designations mean and when they trigger action.' },
  { icon: Layers,   label: 'Decide disclosure tier',                   desc: 'Apply dual-use ethics reasoning to determine who should see evaluation findings and in what form.' },
  { icon: Shield,   label: 'Connect evidence to governance action',    desc: 'Link evaluation results to specific governance obligations: mitigations, safety cases, disclosure decisions.' },
];

const ARTIFACTS = [
  { letter: 'T', title: 'Threat Model Canvas',   color: '#7C3AED', softBg: '#EDE9FE', desc: 'A structured document covering actors, harm pathways, assumptions, and consequence severity for a specified frontier model.', tool: 'benchmark', toolLabel: 'Open in Benchmark Builder' },
  { letter: 'M', title: 'Threshold Memo',         color: '#B91C1C', softBg: '#FEE2E2', desc: 'A one-page memo explaining which capability threshold applies to your model, what evidence triggered it, and what governance action is required.', tool: 'capstone', toolLabel: 'Add to Capstone' },
  { letter: 'D', title: 'Disclosure Matrix',      color: '#0F766E', softBg: '#CCFBF1', desc: 'A decision matrix mapping evaluation findings to disclosure tiers, identifying who receives what, and under what conditions.', tool: 'evidence', toolLabel: 'View Evidence Library' },
  { letter: 'S', title: 'Safety Case Summary',    color: '#B45309', softBg: '#FEF3C7', desc: 'A structured argument that the model meets the safety requirements for deployment at a specified access level and context.', tool: 'capstone', toolLabel: 'Add to Capstone' },
];

const CASE_STUDIES = [
  {
    org: 'Anthropic',
    title: 'Responsible Scaling Policy',
    relevance: 'Module B reference',
    color: '#7C3AED',
    bg: '#EDE9FE',
    excerpt: 'Defines ASL tiers, capability thresholds, required evaluations before deployment, and internal safety commitments — the template for a formal safety case.',
    concepts: ['ASL thresholds', 'Safety commitments', 'Pre-deployment evaluation', 'Mitigation requirements'],
  },
  {
    org: 'Google DeepMind',
    title: 'Frontier Safety Framework',
    relevance: 'Module B reference',
    color: '#1D4ED8',
    bg: '#DBEAFE',
    excerpt: 'Introduces Critical Capability Levels (CCLs) as governance triggers, maps dangerous capability domains to evaluation requirements, and specifies mitigation tiers.',
    concepts: ['Critical Capability Levels', 'Dangerous capabilities', 'Mitigation tiers', 'Evaluation requirements'],
  },
  {
    org: 'OpenAI',
    title: 'Preparedness Framework & System Cards',
    relevance: 'Module B reference',
    color: '#15803D',
    bg: '#DCFCE7',
    excerpt: 'Establishes a Preparedness Framework with risk categories, threshold scores, and safety-case-style reporting. System cards operationalize disclosure obligations.',
    concepts: ['Preparedness risk tiers', 'System card disclosure', 'Threshold scores', 'Safety reporting'],
  },
];

const EVAL_OPTIONS = [
  { id: 'cyber-deep',   label: 'Comprehensive cyber evaluation (expert red team)',  domain: 'Cyber',       recommended: true  },
  { id: 'cyber-uplift', label: 'Human uplift study — cyber domain',                domain: 'Cyber',       recommended: true  },
  { id: 'persuasion',   label: 'Persuasion & manipulation deep-dive',              domain: 'Persuasion',  recommended: true  },
  { id: 'cbrn',         label: 'CBRN capability screening',                        domain: 'CBRN',        recommended: false },
  { id: 'autonomy',     label: 'Autonomy & long-horizon task evaluation',           domain: 'Autonomy',    recommended: false },
  { id: 'adv-elicit',   label: 'Adversarial elicitation — persuasion domain',      domain: 'Persuasion',  recommended: true  },
  { id: 'validity',     label: 'Benchmark validity review (contamination check)',   domain: 'Methodology', recommended: false },
  { id: 'alignment',    label: 'Alignment faking / sandbagging assessment',         domain: 'Autonomy',    recommended: false },
];

const DOMAIN_COLORS: Record<string, string> = {
  Cyber: '#334155', CBRN: '#B91C1C', Persuasion: '#7C3AED', Autonomy: '#B45309', Methodology: '#0F766E',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ label, title, subtitle, c }: { label: string; title: string; subtitle?: string; c: ReturnType<typeof C> }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.primary, letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
      <h2 style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px', lineHeight: 1.2 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: fonts.sans, fontSize: 15, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Divider({ c }: { c: ReturnType<typeof C> }) {
  return <div style={{ height: 1, background: c.borderSubtle, margin: '56px 0' }} />;
}

type ProgressStatus = 'not-started' | 'in-progress' | 'completed' | 'needs-review';

function statusOf(progress: number): ProgressStatus {
  if (progress === 0) return 'not-started';
  if (progress === 100) return 'completed';
  return 'in-progress';
}

// ─── Progress state card ──────────────────────────────────────────────────────

function ProgressCard({ status, active, c }: { status: ProgressStatus; active: boolean; c: ReturnType<typeof C> }) {
  const cfg: Record<ProgressStatus, { label: string; sub: string; icon: React.ReactNode; bg: string; border: string; textColor: string }> = {
    'not-started':  { label: 'Not Started',   sub: 'No lessons begun',         icon: <Lock size={18} color={c.textTertiary} />, bg: c.elevated, border: c.border, textColor: c.textTertiary },
    'in-progress':  { label: 'In Progress',   sub: 'Lesson 2 of 4 active',     icon: <Play size={18} color={c.primary} fill={c.primary} />, bg: c.primarySoft, border: c.primaryBorder, textColor: c.primary },
    'completed':    { label: 'Completed',     sub: 'All lessons + quiz done',  icon: <CheckCircle2 size={18} color={c.success} />, bg: c.successSoft, border: c.successBorder, textColor: c.success },
    'needs-review': { label: 'Needs Review',  sub: 'Quiz score below 70%',     icon: <AlertTriangle size={18} color={c.warning} />, bg: c.warningSoft, border: c.warningBorder, textColor: c.warning },
  };
  const cfg_ = cfg[status];
  return (
    <div style={{
      background: active ? cfg_.bg : c.surface,
      border: `${active ? 2 : 1}px solid ${active ? cfg_.border : c.border}`,
      borderRadius: 14, padding: '20px 20px',
      boxShadow: active ? shadow.md : shadow.sm,
      transform: active ? 'translateY(-2px)' : 'none',
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        {cfg_.icon}
        <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: cfg_.textColor }}>{cfg_.label}</div>
        {active && <div style={{ marginLeft: 'auto', fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: cfg_.textColor, background: `${cfg_.border}`, padding: '2px 8px', borderRadius: 999, opacity: 0.7 }}>CURRENT</div>}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>{cfg_.sub}</div>
      {status === 'in-progress' && active && (
        <div style={{ marginTop: 12, height: 4, background: c.elevated, borderRadius: 999 }}>
          <div style={{ height: 4, width: '40%', background: c.primary, borderRadius: 999 }} />
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ModuleDetailScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const modId: ModuleId = state.currentModuleId ?? 'B';
  const mod = getModule(modId);
  const progress = state.moduleProgress[modId] ?? 0;
  const currentStatus = statusOf(progress);
  const isDone = state.completedModules.includes(modId);

  // Challenge state
  const [challengeStep, setChallengeStep] = useState<1 | 2 | 3>(1);
  const [domainRatings, setDomainRatings] = useState<Record<string, string>>({});
  const [selectedEvals, setSelectedEvals] = useState<Set<string>>(new Set());
  const [releaseDecision, setReleaseDecision] = useState<'release' | 'conditional' | 'deny' | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  // Case study expansions
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  // Artifact expansions
  const [expandedArtifact, setExpandedArtifact] = useState<number | null>(null);

  function toggleEval(id: string) {
    setSelectedEvals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function submitChallenge() {
    setChallengeSubmitted(true);
  }

  const recommendedSelected = EVAL_OPTIONS.filter(e => e.recommended).every(e => selectedEvals.has(e.id));

  // Model capability data
  const CAPABILITY_BARS = [
    { domain: 'Coding & software engineering', level: 92, risk: 'LOW', color: c.success },
    { domain: 'Cyber tool-use (CTF tasks)',    level: 54, risk: 'MEDIUM', color: c.warning },
    { domain: 'Persuasion tasks',              level: 31, risk: 'CONCERNING', color: c.danger },
  ];

  // ── HERO ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>

      {/* Module hero */}
      <div style={{ background: 'linear-gradient(140deg,#020617 0%,#0F172A 50%,#0C1A3E 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(96,165,250,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.05) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ height: 3, background: `linear-gradient(90deg,${mod.color},${mod.color}99,transparent)` }} />

        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 56px 56px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40 }}>

            {/* Left — identity + promise */}
            <div style={{ flex: 1 }}>
              {/* Module badge */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: `${mod.color}22`, border: `1px solid ${mod.color}44`, borderRadius: 999, padding: '4px 14px' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 800, color: 'white' }}>{mod.id}</span>
                  </div>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: mod.color, letterSpacing: '0.08em' }}>{mod.title.toUpperCase()}</span>
                </div>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#64748B', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 999 }}>MODULE {['A','B','C','D','E','F','G','H','I'].indexOf(mod.id) + 1} OF 9</span>
              </div>

              <h1 style={{ fontFamily: fonts.serif, fontSize: 40, fontWeight: 700, color: '#F8FAFC', margin: '0 0 6px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{mod.title}</h1>
              <p style={{ fontFamily: fonts.sans, fontSize: 17, color: '#94A3B8', margin: '0 0 24px', lineHeight: 1.65 }}>{mod.subtitle}</p>

              {/* Promise */}
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 18px', marginBottom: 28 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#64748B', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>MODULE PROMISE</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, color: '#CBD5E1', lineHeight: 1.7 }}>
                  The learner will understand how frontier model evaluations connect to governance frameworks, safety cases, capability thresholds, legal obligations, disclosure decisions, and public reporting standards.
                </div>
              </div>

              {/* Meta row */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
                {[
                  { icon: <Clock size={14} />, label: `${mod.hours} hours` },
                  { icon: <BarChart3 size={14} />, label: mod.difficulty },
                  { icon: <FileText size={14} />, label: `${LESSONS.length} lessons` },
                  { icon: <Award size={14} />, label: '4 artifacts' },
                ].map(m => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#64748B' }}>{m.icon}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 12, color: '#94A3B8' }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => navigate('lesson')}
                  style={{ padding: '12px 28px', background: mod.color, color: 'white', border: 'none', borderRadius: 11, fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 4px 18px ${mod.color}55` }}
                >
                  {isDone ? 'Review Module' : progress > 0 ? 'Continue Module' : 'Start Module'}
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('modules')} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.07)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 11, fontFamily: fonts.sans, fontSize: 14, cursor: 'pointer' }}>
                  All Modules
                </button>
              </div>
            </div>

            {/* Right — progress ring + quick stats */}
            <div style={{ width: 240, flexShrink: 0 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 }}>
                {/* Progress ring (SVG) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                  <svg width={100} height={100} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={50} cy={50} r={40} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
                    <circle cx={50} cy={50} r={40} fill="none" stroke={mod.color} strokeWidth={8}
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                      strokeLinecap="round" />
                  </svg>
                  <div style={{ marginTop: -68, fontFamily: fonts.mono, fontSize: 22, fontWeight: 700, color: '#F8FAFC' }}>{progress}%</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#64748B', marginTop: 44 }}>COMPLETE</div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Lessons done',    value: `${LESSONS.filter(l => l.done).length} / ${LESSONS.length}` },
                    { label: 'Artifacts built', value: `${state.artifactsCreated.filter(a => a.includes('Threat') || a.includes('Threshold') || a.includes('Disclosure') || a.includes('Safety')).length} / 4` },
                    { label: 'Quiz mastery',    value: `${state.quizMastery}%` },
                  ].map(stat => (
                    <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontFamily: fonts.sans, fontSize: 12, color: '#64748B' }}>{stat.label}</span>
                      <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '52px 56px 80px' }}>

        {/* ── SECTION 2: LEARNING PATH ──────────────────────────────────────── */}
        <SectionHeader label="SECTION 2 / 8 · LEARNING PATH" title="Four lessons to governance competence" subtitle="Each lesson builds on the last. Complete them in order, or use the progress indicators to jump back." c={c} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {LESSONS.map((lesson, i) => (
            <div key={i} style={{ display: 'flex', gap: 0 }}>
              {/* Left timeline */}
              <div style={{ width: 52, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                  background: lesson.done ? c.success : lesson.active ? mod.color : c.elevated,
                  border: `2px solid ${lesson.done ? c.success : lesson.active ? mod.color : c.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {lesson.done
                    ? <Check size={14} color="white" />
                    : <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: lesson.active ? 'white' : c.textTertiary }}>{lesson.num}</span>}
                </div>
                {i < LESSONS.length - 1 && (
                  <div style={{ flex: 1, width: 2, background: lesson.done ? c.success : c.borderSubtle, margin: '4px 0', minHeight: 32 }} />
                )}
              </div>

              {/* Lesson card */}
              <div style={{
                flex: 1, marginLeft: 16, marginBottom: i < LESSONS.length - 1 ? 16 : 0,
                background: lesson.active ? c.surface : 'transparent',
                border: lesson.active ? `2px solid ${mod.color}` : `1px solid ${c.borderSubtle}`,
                borderRadius: 14,
                padding: '18px 20px',
                boxShadow: lesson.active ? shadow.md : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: lesson.active ? 10 : 0 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      {lesson.active && (
                        <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: mod.color, background: `${mod.color}18`, border: `1px solid ${mod.color}33`, padding: '2px 8px', borderRadius: 999, letterSpacing: '0.08em' }}>ACTIVE</div>
                      )}
                      {lesson.done && (
                        <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: c.success, background: c.successSoft, border: `1px solid ${c.successBorder}`, padding: '2px 8px', borderRadius: 999, letterSpacing: '0.08em' }}>COMPLETE</div>
                      )}
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: lesson.active ? 700 : 500, color: lesson.done ? c.textSecondary : c.textPrimary }}>{lesson.title}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Clock size={12} color={c.textTertiary} />
                      <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}>{lesson.duration}</span>
                    </div>
                    {lesson.active && (
                      <button onClick={() => navigate('lesson')} style={{ padding: '7px 16px', background: mod.color, color: 'white', border: 'none', borderRadius: 8, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        Continue <ChevronRight size={13} />
                      </button>
                    )}
                    {!lesson.active && !lesson.done && (
                      <button style={{ padding: '7px 14px', background: 'none', color: c.textTertiary, border: `1px solid ${c.border}`, borderRadius: 8, fontFamily: fonts.sans, fontSize: 13, cursor: 'not-allowed', opacity: 0.5 }}>
                        Locked
                      </button>
                    )}
                    {lesson.done && (
                      <button onClick={() => navigate('lesson')} style={{ padding: '7px 14px', background: 'none', color: c.success, border: `1px solid ${c.successBorder}`, borderRadius: 8, fontFamily: fonts.sans, fontSize: 12, cursor: 'pointer' }}>
                        Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Divider c={c} />

        {/* ── SECTION 3: SKILLS UNLOCKED ──────────────────────────────────── */}
        <SectionHeader label="SECTION 3 / 8 · SKILLS" title="Skills you unlock in Module B" subtitle="These competencies are earned progressively across the four lessons and measured in the module quiz." c={c} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const earned = i === 0 || i === 1; // Lessons 1 + 2 done = first 2 skills earned
            return (
              <div key={i} style={{
                background: earned ? c.surface : c.elevated,
                border: `1px solid ${earned ? mod.color + '33' : c.border}`,
                borderRadius: 14, padding: '18px 18px',
                boxShadow: earned ? shadow.sm : 'none',
                opacity: earned ? 1 : 0.6,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: earned ? mod.color + '18' : c.elevated, border: `1px solid ${earned ? mod.color + '33' : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {earned ? <Icon size={17} color={mod.color} /> : <Lock size={17} color={c.textTertiary} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{skill.label}</div>
                      {earned && <Check size={13} color={c.success} />}
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{skill.desc}</div>
                    {!earned && <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 6 }}>Unlocks in Lesson {i + 1}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Divider c={c} />

        {/* ── SECTION 4: REQUIRED ARTIFACTS ───────────────────────────────── */}
        <SectionHeader label="SECTION 4 / 8 · ARTIFACTS" title="Four artifacts you will build" subtitle="Each artifact is a professional deliverable that becomes part of your evaluation portfolio." c={c} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {ARTIFACTS.map((art, i) => {
            const built = state.artifactsCreated.some(a => a.toLowerCase().includes(art.title.toLowerCase().split(' ')[0].toLowerCase()));
            return (
              <div key={i}
                onClick={() => setExpandedArtifact(expandedArtifact === i ? null : i)}
                style={{ background: c.surface, border: `1px solid ${built ? art.color + '44' : c.border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', boxShadow: shadow.sm }}
              >
                {/* Colored header */}
                <div style={{ background: `linear-gradient(135deg,${art.color}22,${art.color}0a)`, borderBottom: `1px solid ${art.color}22`, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: art.softBg, border: `1px solid ${art.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: fonts.mono, fontSize: 14, fontWeight: 800, color: art.color }}>{art.letter}</span>
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{art.title}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {built
                      ? <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.success, background: c.successSoft, border: `1px solid ${c.successBorder}`, padding: '3px 8px', borderRadius: 999 }}>BUILT</span>
                      : <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, background: c.elevated, border: `1px solid ${c.border}`, padding: '3px 8px', borderRadius: 999 }}>PENDING</span>}
                    {expandedArtifact === i ? <ChevronUp size={15} color={c.textTertiary} /> : <ChevronDown size={15} color={c.textTertiary} />}
                  </div>
                </div>

                {expandedArtifact === i && (
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.6, marginBottom: 14 }}>{art.desc}</div>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(art.tool as any); }}
                      style={{ padding: '8px 16px', background: art.color + '18', color: art.color, border: `1px solid ${art.color}33`, borderRadius: 9, fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      {art.toolLabel} <ExternalLink size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Divider c={c} />

        {/* ── SECTION 5: CASE STUDY PREVIEW ───────────────────────────────── */}
        <SectionHeader label="SECTION 5 / 8 · CASE STUDIES" title="Real-world frameworks you'll analyse" subtitle="These three primary sources ground Module B content in actual lab practice. You'll reference them throughout the module." c={c} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: shadow.sm }}>
              {/* Header band */}
              <div style={{ height: 6, background: cs.color }} />
              <div style={{ padding: '20px 20px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: cs.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={18} color={cs.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: cs.color, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 3 }}>{cs.org}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: c.textPrimary, lineHeight: 1.3 }}>{cs.title}</div>
                  </div>
                </div>

                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.6, marginBottom: 14 }}>{cs.excerpt}</div>

                {/* Concept chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {cs.concepts.map(concept => (
                    <span key={concept} style={{ fontFamily: fonts.mono, fontSize: 10, color: cs.color, background: cs.bg, border: `1px solid ${cs.color}30`, padding: '3px 8px', borderRadius: 999 }}>{concept}</span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('case-study')}
                  style={{ width: '100%', padding: '9px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 9, fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: cs.color, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  Read case study <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Divider c={c} />

        {/* ── SECTION 6: INTERACTIVE CHALLENGE ────────────────────────────── */}
        <SectionHeader label="SECTION 6 / 8 · MODULE CHALLENGE" title="Should this model be released?" subtitle="Apply Module B reasoning to a realistic pre-deployment scenario. Work through three decision phases." c={c} />

        {/* Scenario briefing */}
        <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 10 }}>SCENARIO · FICTIONAL FRONTIER MODEL</div>
          <div style={{ fontFamily: fonts.serif, fontSize: 16, color: c.textPrimary, lineHeight: 1.7 }}>
            <strong>TerraModel-7</strong> is a frontier model with strong code generation capability, moderate cyber tool-use ability, and weak but notable persuasion task performance. The development team wants to release with standard safety filtering. You are the independent evaluator advising the deployment committee.
          </div>
        </div>

        {/* Step tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 24, background: c.elevated, borderRadius: 10, padding: 3, width: 'fit-content' }}>
          {[
            { n: 1, label: 'Assess profile' },
            { n: 2, label: 'Commission evals' },
            { n: 3, label: 'Make decision' },
          ].map(tab => (
            <button key={tab.n} onClick={() => setChallengeStep(tab.n as 1|2|3)}
              style={{ padding: '8px 20px', borderRadius: 7, border: 'none', background: challengeStep === tab.n ? c.primary : 'transparent', color: challengeStep === tab.n ? 'white' : c.textSecondary, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: challengeStep === tab.n ? 'rgba(255,255,255,0.25)' : c.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: challengeStep === tab.n ? 'white' : c.textTertiary }}>
                {tab.n}
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Step 1: Model profile */}
        {challengeStep === 1 && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 28, boxShadow: shadow.sm }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 20 }}>TerraModel-7 — Capability Profile</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
              {CAPABILITY_BARS.map((cap, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{cap.domain}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: cap.color }}>{cap.level}%</span>
                      <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: cap.color, background: `${cap.color}15`, border: `1px solid ${cap.color}30`, padding: '2px 8px', borderRadius: 999 }}>{cap.risk}</span>
                    </div>
                  </div>
                  <div style={{ height: 10, background: c.elevated, borderRadius: 999 }}>
                    <div style={{ height: 10, width: `${cap.level}%`, background: cap.color, borderRadius: 999, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Classification task */}
            <div style={{ background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.primary, letterSpacing: '0.08em', marginBottom: 10 }}>YOUR TASK · Step 1</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textPrimary, lineHeight: 1.65 }}>
                Based on this capability profile, classify each domain's risk level under Module B governance frameworks. Which capability requires the most rigorous additional evaluation before a release decision can be made?
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { domain: 'Coding (92%)', q: 'Does this require additional evaluation before release?' },
                { domain: 'Cyber tool-use (54%)', q: 'What threshold proximity concern does this raise?' },
                { domain: 'Persuasion (31% — notable results)', q: 'Why is a low score with "notable results" still concerning?' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '14px 16px', background: c.elevated, borderRadius: 10, border: `1px solid ${c.border}` }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: c.textSecondary, marginBottom: 6 }}>{item.domain}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, marginBottom: 10, fontStyle: 'italic' }}>{item.q}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['Needs evaluation', 'Low concern', 'High concern', 'Threshold proximity'].map(opt => (
                      <button key={opt} onClick={() => setDomainRatings(r => ({ ...r, [item.domain]: opt }))}
                        style={{ padding: '5px 12px', borderRadius: 999, border: `1px solid ${domainRatings[item.domain] === opt ? c.primary : c.border}`, background: domainRatings[item.domain] === opt ? c.primarySoft : c.surface, fontFamily: fonts.mono, fontSize: 11, color: domainRatings[item.domain] === opt ? c.primary : c.textTertiary, cursor: 'pointer', fontWeight: domainRatings[item.domain] === opt ? 700 : 400 }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setChallengeStep(2)} style={{ marginTop: 20, padding: '10px 24px', background: c.primary, color: 'white', border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Next: Commission evaluations →
            </button>
          </div>
        )}

        {/* Step 2: Commission evaluations */}
        {challengeStep === 2 && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 28, boxShadow: shadow.sm }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>Select additional evaluations to commission</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, marginBottom: 20 }}>
              Choose which evaluations should be completed before a release decision. You may select as many as you need.
              <span style={{ color: selectedEvals.size > 0 ? c.primary : c.textTertiary }}> ({selectedEvals.size} selected)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
              {EVAL_OPTIONS.map(opt => {
                const selected = selectedEvals.has(opt.id);
                return (
                  <div key={opt.id} onClick={() => toggleEval(opt.id)}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 16px', background: selected ? c.primarySoft : c.elevated, border: `2px solid ${selected ? c.primary : c.border}`, borderRadius: 11, cursor: 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${selected ? c.primary : c.border}`, background: selected ? c.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {selected && <Check size={12} color="white" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{opt.label}</div>
                    </div>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: DOMAIN_COLORS[opt.domain], background: `${DOMAIN_COLORS[opt.domain]}15`, border: `1px solid ${DOMAIN_COLORS[opt.domain]}30`, padding: '3px 8px', borderRadius: 999, flexShrink: 0 }}>{opt.domain}</span>
                    {opt.recommended && <span style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 700, color: c.teal, background: c.tealSoft, border: `1px solid ${c.tealBorder}`, padding: '2px 7px', borderRadius: 999, flexShrink: 0 }}>RECOMMENDED</span>}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setChallengeStep(1)} style={{ padding: '10px 18px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, cursor: 'pointer' }}>
                ← Back
              </button>
              <button onClick={() => setChallengeStep(3)} disabled={selectedEvals.size === 0}
                style={{ padding: '10px 24px', background: selectedEvals.size > 0 ? c.primary : c.elevated, color: selectedEvals.size > 0 ? 'white' : c.textTertiary, border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Next: Make your decision →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Decision */}
        {challengeStep === 3 && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 28, boxShadow: shadow.sm }}>
            {!challengeSubmitted ? (
              <>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 6 }}>Your release recommendation</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, marginBottom: 22 }}>
                  Based on the capability profile and the evaluations you selected, what is your recommendation to the deployment committee?
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                  {[
                    { value: 'release',     label: 'Approve for release',       desc: 'Standard filtering sufficient. Deploy with existing safeguards.', color: c.success, softBg: c.successSoft, border: c.successBorder },
                    { value: 'conditional', label: 'Conditional release',        desc: 'Release pending completion of selected evaluations and specific mitigations.', color: c.warning, softBg: c.warningSoft, border: c.warningBorder },
                    { value: 'deny',        label: 'Deny — more evaluation needed', desc: 'Do not release. Significant evaluation gaps remain unresolved.', color: c.danger, softBg: c.dangerSoft, border: c.dangerBorder },
                  ].map(opt => (
                    <div key={opt.value} onClick={() => setReleaseDecision(opt.value as any)}
                      style={{ padding: '18px 16px', borderRadius: 13, border: `2px solid ${releaseDecision === opt.value ? opt.color : c.border}`, background: releaseDecision === opt.value ? opt.softBg : c.elevated, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: releaseDecision === opt.value ? opt.color : c.textPrimary, marginBottom: 8 }}>{opt.label}</div>
                      <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textSecondary, lineHeight: 1.5 }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 8 }}>YOUR REASONING (required)</div>
                  <textarea value={reasoning} onChange={e => setReasoning(e.target.value)} rows={3}
                    placeholder="Explain your decision in terms of Module B frameworks. Which threshold or governance obligation drives your recommendation?"
                    style={{ width: '100%', padding: '11px 14px', fontFamily: fonts.sans, fontSize: 13, color: c.textPrimary, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.65 }} />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setChallengeStep(2)} style={{ padding: '10px 18px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, cursor: 'pointer' }}>← Back</button>
                  <button onClick={submitChallenge} disabled={!releaseDecision || reasoning.length < 20}
                    style={{ padding: '10px 24px', background: releaseDecision && reasoning.length >= 20 ? mod.color : c.elevated, color: releaseDecision && reasoning.length >= 20 ? 'white' : c.textTertiary, border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Submit recommendation →
                  </button>
                </div>
              </>
            ) : (
              /* Feedback panel */
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: releaseDecision === 'conditional' ? c.successSoft : c.warningSoft, border: `1px solid ${releaseDecision === 'conditional' ? c.successBorder : c.warningBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {releaseDecision === 'conditional' ? <Check size={20} color={c.success} /> : <AlertTriangle size={20} color={c.warning} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>
                      {releaseDecision === 'conditional' ? 'Strong recommendation — aligned with expert practice' : releaseDecision === 'deny' ? 'Defensible, but consider a conditional approach' : 'Reconsider — persuasion findings are under-weighted'}
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, lineHeight: 1.7 }}>
                      {releaseDecision === 'conditional'
                        ? 'Conditional release is the appropriate recommendation here. The model\'s persuasion findings — weak aggregate score but "notable results" — signal elicitation sensitivity that cannot be resolved with standard filtering alone. Expert guidance (AISI, FMF) recommends conditional release with a human uplift study and adversarial elicitation protocol for persuasion before unrestricted access.'
                        : releaseDecision === 'deny'
                        ? 'Denial is defensible if the deployment committee has zero tolerance for persuasion uncertainty. However, a conditional release with mandatory evaluations is typically preferred — it keeps the evaluation process moving while protecting against identified risks.'
                        : 'Standard approval is not appropriate given the persuasion findings. Even a low aggregate score with notable elicitation-sensitive results is sufficient to trigger the FMF\'s requirement for additional evaluation before deployment.'}
                    </div>
                  </div>
                </div>

                {/* Recommended evaluations comparison */}
                <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 12 }}>RECOMMENDED EVALUATIONS · WHAT YOU SELECTED VS. EXPERT VIEW</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {EVAL_OPTIONS.map(opt => {
                      const youSelected = selectedEvals.has(opt.id);
                      return (
                        <div key={opt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: c.surface, borderRadius: 8 }}>
                          <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textPrimary }}>{opt.label}</span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ fontFamily: fonts.mono, fontSize: 10, color: youSelected ? c.primary : c.textTertiary, fontWeight: youSelected ? 700 : 400 }}>{youSelected ? 'You ✓' : 'You —'}</span>
                            {opt.recommended && <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.teal, fontWeight: 700 }}>Expert ✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => { setChallengeSubmitted(false); setChallengeStep(1); setReleaseDecision(null); setReasoning(''); setSelectedEvals(new Set()); setDomainRatings({}); }}
                    style={{ padding: '10px 18px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, cursor: 'pointer' }}>
                    Try again
                  </button>
                  <button onClick={() => navigate('lesson')}
                    style={{ padding: '10px 22px', background: mod.color, color: 'white', border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    Continue to Lesson 2 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <Divider c={c} />

        {/* ── SECTION 7: QUIZ PREVIEW ──────────────────────────────────────── */}
        <SectionHeader label="SECTION 7 / 8 · ASSESSMENT" title="Module quiz" subtitle="Complete all four lessons before attempting the module quiz." c={c} />

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px', boxShadow: shadow.sm }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 24 }}>
            {[
              { label: 'Questions', value: '16', mono: true },
              { label: 'Estimated time', value: '25 min', mono: true },
              { label: 'Mastery required', value: '70%', mono: true },
              { label: 'Attempts allowed', value: '3', mono: true },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center', padding: '16px', background: c.elevated, borderRadius: 12 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textTertiary }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textPrimary, lineHeight: 1.65 }}>
              <strong>Quiz covers:</strong> Threat modeling concepts, governance framework navigation, threshold interpretation, safety case structure, and disclosure decision-making. Includes scenario-based questions drawn from Anthropic RSP, DeepMind FSF, and OpenAI preparedness practice.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => navigate('quiz')}
              disabled={progress < 100}
              style={{ padding: '11px 24px', background: progress >= 100 ? mod.color : c.elevated, color: progress >= 100 ? 'white' : c.textTertiary, border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: progress >= 100 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Zap size={15} />
              {state.quizMastery >= 70 ? 'Retake Quiz' : progress < 100 ? 'Complete all lessons first' : 'Take Module Quiz'}
            </button>
            {state.quizMastery >= 70 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: c.successSoft, border: `1px solid ${c.successBorder}`, borderRadius: 10 }}>
                <Check size={14} color={c.success} />
                <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: c.success }}>Passed: {state.quizMastery}%</span>
              </div>
            )}
          </div>
        </div>

        <Divider c={c} />

        {/* ── SECTION 8: PROGRESS STATE ────────────────────────────────────── */}
        <SectionHeader label="SECTION 8 / 8 · PROGRESS STATUS" title="Your current module status" subtitle="The system tracks your status across lessons, artifacts, and quiz performance. Below are all four possible states." c={c} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 28 }}>
          {(['not-started', 'in-progress', 'completed', 'needs-review'] as ProgressStatus[]).map(status => (
            <ProgressCard key={status} status={status} active={currentStatus === status} c={c} />
          ))}
        </div>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, borderTop: `1px solid ${c.border}` }}>
          <button onClick={() => navigate('modules')} style={{ padding: '11px 20px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
            ← All Modules
          </button>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}>
            Module {mod.id} · {mod.hours}h · {progress}% complete
          </div>
          <button onClick={() => navigate('lesson')} style={{ padding: '11px 24px', background: mod.color, color: 'white', border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 2px 12px ${mod.color}44` }}>
            {progress > 0 ? 'Continue Learning' : 'Start Module'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
