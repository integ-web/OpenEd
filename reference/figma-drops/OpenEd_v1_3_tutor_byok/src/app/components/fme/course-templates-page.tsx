import { Clock, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';
import { type PageProps, C, fonts, shadow } from './types';

export function CourseTemplatesPage({ dark }: PageProps) {
  const c = C(dark);

  const lessons = [
    { num: 1, title: 'From Risk Question to Eval Objective', done: true,   mins: 90 },
    { num: 2, title: 'Elicitation Strategies',               done: false, active: true, mins: 90 },
    { num: 3, title: 'Metrics, Confidence & Adjudication',   done: false,  mins: 90 },
    { num: 4, title: 'Validity Failures & Anti-Patterns',    done: false,  mins: 90 },
  ];

  const objectives = [
    'Distinguish baseline prompting from scaffolded elicitation and explain why the distinction matters for evaluation validity',
    'Design a structured elicitation protocol with at least three prompting strategies for a given capability domain',
    'Identify four sources of elicitation sensitivity that could invalidate an evaluation conclusion',
    'Interpret divergent benchmark results as a function of elicitation choice rather than model capability',
  ];

  const glossary = [
    { term: 'Elicitation', def: 'The full prompting, tool, memory, retry, and coordination protocol used to estimate capability.' },
    { term: 'Scaffolding',  def: 'An elicitation layer — tools, context, workflow — that can materially raise observed capability.' },
    { term: 'Best-of-k',   def: 'Strategy where the model attempts a task k times and the best result is scored.' },
    { term: 'Eval. awareness', def: 'The hypothesis that a model behaves differently when it detects it is being evaluated.' },
  ];

  const sources = [
    { id: 'NIST-RMF',  label: 'NIST AI RMF 1.0',                    type: 'Primary' },
    { id: 'FMF-2024',  label: 'FMF Capability Assessment Guidance',  type: 'Primary' },
    { id: 'AISI-2024', label: 'AISI Pre-deployment Testing Report',  type: 'Research' },
    { id: 'ANT-SC',    label: 'Claude 3.7 System Card',              type: 'Case Study' },
  ];

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>

      {/* Page header */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '32px 64px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 8 }}>05 · COURSE TEMPLATES</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Course Templates</h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textSecondary, margin: 0 }}>Full lesson layout — Module C, Lesson 2: Elicitation Strategies</p>
      </div>

      {/* Top course nav */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.borderSubtle}`, padding: '0 64px' }}>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Overview','Modules','Resources','Progress','Dashboard'].map((item, i) => (
            <div key={item} style={{ padding: '13px 0', fontFamily: fonts.sans, fontSize: 13, fontWeight: i === 1 ? 600 : 400, color: i === 1 ? c.primary : c.textSecondary, borderBottom: i === 1 ? `2px solid ${c.primary}` : '2px solid transparent', cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
      </div>

      {/* Three-panel layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 296px', minHeight: 'calc(100vh - 176px)' }}>

        {/* Left rail */}
        <div style={{ background: c.surface, borderRight: `1px solid ${c.border}`, overflowY: 'auto' }}>
          <div style={{ padding: '20px 16px 12px' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 4 }}>MODULE C</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Evaluation Science</div>
            <div style={{ height: 4, background: c.elevated, borderRadius: 999, marginBottom: 6 }}>
              <div style={{ height: 4, width: '25%', background: c.primary, borderRadius: 999 }} />
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>1 / 4 lessons</div>
          </div>
          <div style={{ borderTop: `1px solid ${c.borderSubtle}` }} />
          {lessons.map(lesson => (
            <div key={lesson.num} style={{ padding: '13px 16px', background: lesson.active ? c.primarySoft : 'transparent', borderLeft: `3px solid ${lesson.active ? c.primary : 'transparent'}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: lesson.active ? 600 : 400, color: lesson.active ? c.primary : lesson.done ? c.textSecondary : c.textPrimary }}>
                  {lesson.title}
                </span>
                {lesson.done && (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: c.success, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 7, height: 4, borderBottom: '2px solid white', borderLeft: '2px solid white', transform: 'rotate(-45deg)', marginTop: -2 }} />
                  </div>
                )}
              </div>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{lesson.mins}m</span>
            </div>
          ))}
        </div>

        {/* Main lesson content */}
        <div style={{ overflowY: 'auto', padding: '40px 48px', background: c.bg }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            {['Course','Module C','Lesson 2'].map((item, i, arr) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: i < arr.length - 1 ? c.primary : c.textTertiary }}>{item}</span>
                {i < arr.length - 1 && <ChevronRight size={11} color={c.textTertiary} />}
              </span>
            ))}
          </div>

          {/* Lesson header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 36, fontWeight: 700, color: c.textPrimary, margin: '0 0 14px', lineHeight: 1.2 }}>
              Elicitation Strategies<br />for Capability Evaluation
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}><Clock size={13} /> 90 min</span>
              <div style={{ width: 1, height: 12, background: c.border }} />
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textSecondary }}>Intermediate</span>
              <div style={{ width: 1, height: 12, background: c.border }} />
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.primary }}>Module C of 9</span>
            </div>
          </div>

          {/* Learning objectives */}
          <div style={{ background: c.primarySoft, border: `1px solid ${c.primaryBorder}`, borderRadius: 12, padding: 22, marginBottom: 28 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.primary, letterSpacing: '0.08em', marginBottom: 14 }}>LEARNING OBJECTIVES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textPrimary, lineHeight: 1.55 }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mental model */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.teal}`, borderRadius: '0 12px 12px 0', padding: 22, marginBottom: 28, boxShadow: shadow.sm }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.teal, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 10 }}>◈ MENTAL MODEL TO BUILD</div>
            <div style={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Elicitation changes conclusions</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 15, color: c.textSecondary, lineHeight: 1.7 }}>
              A model's apparent capability is not a fixed property — it depends on how it is tested. The same model can appear safe under naive prompting and dangerous under expert-scaffolded elicitation. When results differ across labs, the first question is not "which model is stronger?" but "which elicitation protocol is more demanding?"
            </div>
          </div>

          {/* Body */}
          <div style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textPrimary, lineHeight: 1.8, marginBottom: 28 }}>
            <p style={{ marginBottom: 18 }}>
              Frontier model evaluation is not a passive process of running prompts and recording outputs. The evaluator's choices — how to prompt, what scaffolding to provide, how many attempts to allow, which tools to enable, and how to judge responses — fundamentally shape what the evaluation can conclude.
            </p>
            <p style={{ marginBottom: 0 }}>
              This lesson introduces the three major elicitation strategies used in contemporary safety evaluations: <strong>baseline prompting</strong>, <strong>scaffolded elicitation</strong>, and <strong>assisted elicitation</strong>. Each strategy reveals different aspects of a model's capability profile and is appropriate for different evaluation objectives.
            </p>
          </div>

          {/* Why this matters */}
          <div style={{ background: c.warningSoft, border: `1px solid ${c.warningBorder}`, borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AlertTriangle size={17} color={c.warning} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.warning, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>WHY THIS MATTERS</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textPrimary, lineHeight: 1.65 }}>
                  AISI's 2024 analysis found that multiple evaluations of the same model reached opposite conclusions on cybersecurity capability because they used different elicitation protocols. Lab A used naive prompting; Lab B used expert-scaffolded multi-turn elicitation with tool access. The gap in task-completion rate was 34 percentage points. Without elicitation standardisation, governance decisions based on evaluation comparisons are unreliable.
                </div>
              </div>
            </div>
          </div>

          {/* Glossary */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 14 }}>KEY TERMS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {glossary.map((g, i) => (
                <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '13px 15px', boxShadow: shadow.sm }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 600, color: c.teal, marginBottom: 5 }}>{g.term}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>{g.def}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: `1px solid ${c.border}` }}>
            <button style={{ padding: '10px 20px', background: 'none', border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, cursor: 'pointer' }}>
              ← Previous Lesson
            </button>
            <button style={{ padding: '10px 24px', background: c.primary, border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
              Continue → Metrics & Adjudication
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ background: c.surface, borderLeft: `1px solid ${c.border}`, padding: '22px 18px', overflowY: 'auto' }}>
          {/* Sources */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 12 }}>SOURCES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sources.map((s, i) => (
                <div key={i} style={{ padding: '10px 12px', background: c.elevated, borderRadius: 8, border: `1px solid ${c.borderSubtle}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                    <div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.primary, marginBottom: 3 }}>[{s.id}]</div>
                      <div style={{ fontFamily: fonts.sans, fontSize: 12, color: c.textPrimary, lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                    <ExternalLink size={11} color={c.textTertiary} style={{ flexShrink: 0, marginTop: 2 }} />
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, marginTop: 5 }}>{s.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 12 }}>YOUR NOTES</div>
            <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8, padding: 12, minHeight: 80 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary, fontStyle: 'italic' }}>Notes sync to your evidence log…</div>
            </div>
          </div>

          {/* Module progress */}
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 12 }}>MODULE C PROGRESS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lessons.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: l.done ? c.success : l.active ? c.primary : c.elevated, border: l.active ? `2px solid ${c.primary}` : 'none', flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 12, color: l.done || l.active ? c.textPrimary : c.textTertiary }}>{l.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
