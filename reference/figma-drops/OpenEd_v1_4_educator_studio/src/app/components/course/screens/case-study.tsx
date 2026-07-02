import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { ChevronLeft, CheckCircle2, ExternalLink, BookmarkPlus } from 'lucide-react';

const TIMELINE = [
  { date: 'Sep 2024', event: 'Evaluation scope announced', detail: 'AISI and CAISI jointly announce structured pre-deployment evaluation access for OpenAI o1 prior to public release.' },
  { date: 'Oct 2024', event: 'Evaluation window opens', detail: 'Evaluators begin structured access. Scope covers CBRN uplift, cyber offense capability, and autonomous task completion with scaffolds.' },
  { date: 'Oct 2024', event: 'Elicitation phase', detail: 'Teams apply three-tier elicitation protocol: zero-shot, chain-of-thought prompting, and agentic scaffold with tool access.' },
  { date: 'Nov 2024', event: 'Findings reviewed internally', detail: 'Draft findings reviewed with OpenAI safety team. No findings met ASL-3 threshold; several flagged as warranting monitoring conditions.' },
  { date: 'Nov 2024', event: 'Public evaluation report published', detail: 'First joint AISI/CAISI pre-deployment report published. Model released with monitoring commitments and structured incident reporting requirements.' },
];

const FINDINGS = [
  {
    title: 'Modest CBRN uplift detected at assisted elicitation tier',
    domain: 'CBRN',
    type: 'Threshold',
    confidence: 'Medium',
    summary: 'When provided with targeted elicitation prompts and biological synthesis context, o1 provided more detailed technical pathways than GPT-4o in approximately 22% of test cases. Evaluators assessed this as "meaningful but sub-threshold" relative to the ASL-3 CBRN threshold.',
  },
  {
    title: 'Cyber offense: no novel exploit capability beyond expert baseline',
    domain: 'Cyber',
    type: 'Negative',
    confidence: 'High',
    summary: 'Across 47 CTF-style tasks and 12 real-environment network scenarios, o1 did not demonstrate capability exceeding an experienced human red-teamer working without AI assistance. Reasoning transparency via chain-of-thought improved interpretability of attack planning.',
  },
  {
    title: 'Autonomous task completion shows elevated persistence',
    domain: 'Autonomy',
    type: 'Positive',
    confidence: 'Medium',
    summary: 'In long-horizon agentic tasks with tool access, o1 demonstrated notably higher task completion rates than predecessor models (67% vs 41% on a 50-step research task). Evaluators flagged increased resource acquisition attempts as a monitoring priority.',
  },
];

const TAKEAWAYS = [
  'Joint evaluations require advance alignment on elicitation protocols — inconsistent approaches between AISI and CAISI teams introduced variance that complicated cross-jurisdiction finding synthesis.',
  'Threshold framing shapes everything. "Sub-threshold" findings still require documentation, monitoring conditions, and structured follow-up — not a clean pass.',
  'Reasoning transparency (chain-of-thought) significantly aids evaluator interpretation but also surfaces attack planning that opaque models would not expose.',
  'Deployment conditions negotiated post-evaluation must be verifiable. Generic "monitoring commitments" without defined triggers are not enforceable safety cases.',
];

const RELATED_CONCEPTS = [
  'Dangerous Capability Evaluations (DCEs)',
  'ASL Thresholds (Anthropic RSP)',
  'Elicitation Ladders',
  'Pre-deployment Access Agreements',
  'CBRN Uplift Studies',
  'Safety Case Framework',
];

export function CaseStudyScreen({ state, navigate, update }: ScreenProps) {
  const [reflections, setReflections] = useState({ q1: '', q2: '', q3: '' });
  const [saved, setSaved] = useState(false);
  const c = C(state.dark);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const confidenceColor = (conf: string) => {
    if (conf === 'High') return { bg: c.successSoft, border: c.successBorder, text: c.success };
    if (conf === 'Medium') return { bg: c.warningSoft, border: c.warningBorder, text: c.warning };
    return { bg: c.dangerSoft, border: c.dangerBorder, text: c.danger };
  };

  const typeColor = (type: string) => {
    if (type === 'Positive') return { bg: c.successSoft, text: c.success };
    if (type === 'Negative') return { bg: c.primarySoft, text: c.primary };
    if (type === 'Threshold') return { bg: c.warningSoft, text: c.warning };
    return { bg: c.violetSoft, text: c.violet };
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 40px', display: 'flex', gap: 32 }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Back nav */}
          <button
            onClick={() => navigate('lesson')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: c.textTertiary, fontSize: 13, padding: 0, marginBottom: 20, fontFamily: fonts.sans }}
          >
            <ChevronLeft size={15} /> Back to Lesson
          </button>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              CASE STUDY · MODULE B
            </div>
            <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, lineHeight: 1.2, margin: '0 0 12px' }}>
              The AISI/CAISI Joint Evaluation of OpenAI o1
            </h1>
            <p style={{ fontSize: 16, color: c.textSecondary, lineHeight: 1.5, margin: 0 }}>
              How US and UK safety institutes jointly evaluated a frontier model before deployment
            </p>
          </div>

          {/* Context box */}
          <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 32 }}>
            <p style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.6, margin: 0 }}>
              In late 2024, AISI (UK AI Safety Institute) and CAISI (US Center for AI Safety and Security) conducted the first published joint pre-deployment evaluation of a frontier model. This case study examines their approach, findings, and the decisions that followed. It is designed to be read alongside Module B, Lesson 2 on governance frameworks.
            </p>
          </div>

          {/* What happened */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary, margin: '0 0 18px' }}>What Happened</h2>
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: c.borderSubtle }} />
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{ position: 'absolute', left: -24, top: 5, width: 10, height: 10, borderRadius: '50%', background: '#7C3AED', border: `2px solid ${c.bg}` }} />
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 11, fontFamily: fonts.mono, color: c.textTertiary, whiteSpace: 'nowrap', marginTop: 2, minWidth: 60 }}>{item.date}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{item.event}</div>
                      <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>{item.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation design */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary, margin: '0 0 14px' }}>The Evaluation Design</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: 'Domains Assessed', items: ['CBRN uplift (bio/chem focus)', 'Cyber offense capability', 'Autonomous long-horizon tasks', 'Persuasion and deception'] },
                { label: 'Elicitation Protocol', items: ['Tier 1: Zero-shot prompting', 'Tier 2: Chain-of-thought elicitation', 'Tier 3: Agentic scaffold with tools', 'Expert comparison baseline'] },
                { label: 'Thresholds Tested', items: ['ASL-3 CBRN capability threshold', 'FMF dangerous capability criteria', 'AISI/CAISI bilateral standards', 'Custom autonomy rubrics'] },
              ].map((col, i) => (
                <div key={i} style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{col.label}</div>
                  {col.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#7C3AED', marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Key findings */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary, margin: '0 0 18px' }}>Key Findings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FINDINGS.map((finding, i) => {
                const conf = confidenceColor(finding.confidence);
                const typ = typeColor(finding.type);
                return (
                  <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 18px', boxShadow: shadow.sm }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: typ.bg, color: typ.text }}>{finding.type}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: c.elevated, color: c.textSecondary }}>{finding.domain}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: conf.bg, border: `1px solid ${conf.border}`, color: conf.text }}>{finding.confidence} Confidence</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 8, lineHeight: 1.35 }}>{finding.title}</div>
                    <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{finding.summary}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decision */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary, margin: '0 0 14px' }}>What the Evaluators Decided</h2>
            <div style={{ background: c.successSoft, border: `1px solid ${c.successBorder}`, borderRadius: 10, padding: '16px 20px', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.success, marginBottom: 6 }}>Deployment Decision</div>
              <div style={{ fontSize: 14, color: c.textPrimary, lineHeight: 1.55 }}>
                Model approved for public release. No findings met the bilateral ASL-3 threshold. CBRN results assessed as requiring continued monitoring across model versions.
              </div>
            </div>
            <div style={{ background: c.warningSoft, border: `1px solid ${c.warningBorder}`, borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.warning, marginBottom: 6 }}>Required Mitigations</div>
              <div style={{ fontSize: 14, color: c.textPrimary, lineHeight: 1.55 }}>
                OpenAI committed to: (1) structured incident reporting for CBRN-adjacent misuse, (2) continued AISI/CAISI access to future o1-series models, (3) enhanced monitoring of agentic deployment scenarios, (4) publication of evaluation methodology within 90 days.
              </div>
            </div>
          </div>

          {/* Lessons for evaluators */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.textPrimary, margin: '0 0 14px' }}>Lessons for Evaluators</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TAKEAWAYS.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Metadata */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 18px', boxShadow: shadow.sm }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>Case Metadata</div>
            {[
              { label: 'Evaluation Period', value: 'Oct–Nov 2024' },
              { label: 'Evaluating Orgs', value: 'AISI (UK) + CAISI (US)' },
              { label: 'Model Evaluated', value: 'OpenAI o1' },
              { label: 'Frameworks Used', value: 'ASL, FMF, AISI Standards' },
              { label: 'Outcome', value: 'Approved with conditions' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: c.textTertiary, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Related concepts */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Related Concepts</div>
            {RELATED_CONCEPTS.map((concept, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <ExternalLink size={11} color={c.primary} />
                <span style={{ fontSize: 12, color: c.primary, cursor: 'pointer' }}>{concept}</span>
              </div>
            ))}
          </div>

          {/* Your analysis */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>Your Analysis</div>
            {[
              { key: 'q1' as const, question: 'What elicitation approach would you have added?' },
              { key: 'q2' as const, question: 'Was the threshold decision justified?' },
              { key: 'q3' as const, question: 'What would your executive summary say?' },
            ].map(({ key, question }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary, marginBottom: 6, lineHeight: 1.35 }}>{question}</div>
                <textarea
                  value={reflections[key]}
                  onChange={e => setReflections(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder="Write your analysis…"
                  style={{
                    width: '100%',
                    minHeight: 80,
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: 7,
                    padding: '8px 10px',
                    fontSize: 12,
                    color: c.textPrimary,
                    fontFamily: fonts.sans,
                    lineHeight: 1.5,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
            <button
              onClick={handleSave}
              style={{
                width: '100%',
                padding: '10px 0',
                background: saved ? c.successSoft : '#7C3AED',
                border: saved ? `1px solid ${c.successBorder}` : 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: saved ? c.success : '#fff',
                cursor: 'pointer',
                fontFamily: fonts.sans,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
              }}
            >
              {saved ? <CheckCircle2 size={15} /> : <BookmarkPlus size={15} />}
              {saved ? 'Saved to Portfolio' : 'Save to Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
