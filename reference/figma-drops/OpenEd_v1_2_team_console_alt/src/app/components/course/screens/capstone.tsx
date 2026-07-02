import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, MODULES } from '../course-types';
import { CheckCircle, Circle, ChevronRight, ExternalLink, Clock, Users } from 'lucide-react';

const SECTIONS = [
  { id: 'exec',       label: 'Executive Summary',       desc: 'A 1-page leadership-ready summary of your evaluation findings and deployment recommendation.', editable: true,  placeholder: 'Write a concise summary suitable for a senior leader who has 5 minutes. Cover: (1) which model was evaluated, (2) the highest-risk capability findings, (3) your deployment recommendation, and (4) required mitigations. Avoid jargon — use plain language anchored to evidence.' },
  { id: 'threat',     label: 'Threat Model',             desc: 'Your formal threat model: actors, pathways, assumptions, and consequence severity.',            editable: true,  placeholder: 'Structure: Actor profile → Threat pathway → Key assumptions → Consequence severity → Threshold proximity. Reference the NIST AI RMF and at least one governance framework (FMF, EU AI Act, or AISI guidance).' },
  { id: 'evaldesign', label: 'Evaluation Design',        desc: 'Your evaluation objectives, elicitation protocol, metrics, and validity analysis.',             editable: true,  placeholder: 'Cover: (1) Risk question → evaluation objective, (2) Elicitation protocol (prompts, scaffolds, tool access), (3) Metrics and adjudication criteria, (4) Validity checks — what could go wrong and how you tested for it.' },
  { id: 'benchmarks', label: 'Benchmark Packet',         desc: '(Linked from your Benchmark Builder)',                                                           editable: false },
  { id: 'evidence',   label: 'Findings & Evidence',      desc: '(Linked from your Evidence Library)',                                                            editable: false },
  { id: 'risk',       label: 'Risk Dashboard',           desc: '(Linked from your Risk Dashboard)',                                                              editable: false },
  { id: 'deploy',     label: 'Deployment Recommendation', desc: 'Your recommended deployment decision with required mitigations and monitoring conditions.',     editable: true,  placeholder: 'State clearly: Deploy / Conditional Deploy / Do Not Deploy. Then list (a) required mitigations before deployment, (b) monitoring conditions post-deployment, and (c) trigger conditions for escalation or retest.' },
];

export function CapstoneScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [activeSection, setActiveSection] = useState('exec');
  const [sectionContent, setSectionContent] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const wordCount = (s: string) => s.trim() ? s.trim().split(/\s+/).length : 0;
  const isStarted = (id: string) => (sectionContent[id] ?? '').trim().length > 0;
  const startedCount = SECTIONS.filter(s => s.editable ? isStarted(s.id) : (
    s.id === 'benchmarks' ? state.benchmarks.length > 0 :
    s.id === 'evidence'   ? state.evidenceCards.length > 0 :
    s.id === 'risk'       ? state.artifactsCreated.includes('Risk Dashboard') : false
  )).length;
  const allReady = startedCount >= SECTIONS.length;

  const activeSec = SECTIONS.find(s => s.id === activeSection)!;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sidebarItem = (s: typeof SECTIONS[0]) => {
    const done = s.editable ? isStarted(s.id) : (
      s.id === 'benchmarks' ? state.benchmarks.length > 0 :
      s.id === 'evidence'   ? state.evidenceCards.length > 0 :
      s.id === 'risk'       ? state.artifactsCreated.includes('Risk Dashboard') : false
    );
    const active = activeSection === s.id;
    return (
      <button key={s.id} onClick={() => setActiveSection(s.id)}
        style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, background: active ? c.primarySoft : 'transparent', border: active ? `1px solid ${c.primaryBorder}` : '1px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        {done
          ? <CheckCircle size={15} color={c.success} style={{ flexShrink: 0 }} />
          : <Circle size={15} color={c.textTertiary} style={{ flexShrink: 0 }} />}
        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? c.primary : c.textSecondary, lineHeight: 1.3 }}>{s.label}</span>
      </button>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: fonts.sans, color: c.textPrimary }}>
      {/* Top bar */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.textTertiary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Module I · Capstone Studio</div>
          <div style={{ fontSize: 17, fontWeight: 700, fontFamily: fonts.serif, color: c.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Final Evaluation Dossier — {state.learnerName}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: c.textSecondary }}>
            <span style={{ fontWeight: 700, color: c.textPrimary }}>{startedCount}</span> / {SECTIONS.length} sections started
          </div>
          <div style={{ height: 6, width: 120, borderRadius: 3, background: c.elevated, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(startedCount / SECTIONS.length) * 100}%`, background: c.primary, borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
          <button onClick={handleSave} style={{ padding: '7px 14px', borderRadius: 6, border: `1px solid ${c.border}`, background: saved ? c.successSoft : 'transparent', color: saved ? c.success : c.textSecondary, fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 500, transition: 'all 0.2s' }}>
            {saved ? '✓ Saved' : 'Save draft'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 'calc(100vh - 65px)' }}>
        {/* Sidebar */}
        <div style={{ background: c.surface, borderRight: `1px solid ${c.border}`, padding: '16px 12px', overflowY: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }}>Sections</div>
          {SECTIONS.map(sidebarItem)}
        </div>

        {/* Main editor area */}
        <div style={{ overflowY: 'auto', padding: '28px 32px' }}>
          {allReady && (
            <div style={{ padding: '12px 16px', borderRadius: 8, background: c.successSoft, border: `1px solid ${c.successBorder}`, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle size={18} color={c.success} />
              <span style={{ fontSize: 14, color: c.success, fontWeight: 600 }}>Ready for portfolio review — all sections have content.</span>
            </div>
          )}

          <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            Section {SECTIONS.findIndex(s => s.id === activeSection) + 1} of {SECTIONS.length}
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, fontFamily: fonts.serif }}>{activeSec.label}</h2>
          <p style={{ margin: '0 0 20px', fontSize: 14, color: c.textSecondary }}>{activeSec.desc}</p>

          {activeSec.editable ? (
            <div>
              <textarea
                value={sectionContent[activeSection] ?? ''}
                onChange={e => setSectionContent(sc => ({ ...sc, [activeSection]: e.target.value }))}
                placeholder={activeSec.placeholder}
                style={{ width: '100%', minHeight: 320, padding: '14px 16px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface, color: c.textPrimary, fontFamily: fonts.sans, fontSize: 14, lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: c.textTertiary, textAlign: 'right' }}>
                {wordCount(sectionContent[activeSection] ?? '')} words
              </div>
            </div>
          ) : activeSection === 'benchmarks' ? (
            <div>
              {state.benchmarks.length === 0 ? (
                <div style={{ padding: 24, borderRadius: 8, background: c.elevated, border: `1px dashed ${c.border}`, textAlign: 'center', color: c.textTertiary }}>
                  No benchmarks yet. <button onClick={() => navigate('benchmark')} style={{ background: 'none', border: 'none', color: c.primary, cursor: 'pointer', fontSize: 14, fontFamily: fonts.sans }}>Open Benchmark Builder →</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {state.benchmarks.map(bm => (
                    <div key={bm.id} style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{bm.name}</div>
                      <div style={{ fontSize: 12, color: c.textSecondary }}>Domain: {bm.domain} · {bm.taskType} · {bm.tasks} tasks · Validity: {bm.validity}</div>
                      {bm.notes && <div style={{ fontSize: 12, color: c.textTertiary, marginTop: 4 }}>{bm.notes}</div>}
                    </div>
                  ))}
                  <button onClick={() => navigate('benchmark')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.primary, fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, marginTop: 4, fontWeight: 500 }}>
                    <ExternalLink size={13} /> View in Benchmark Builder
                  </button>
                </div>
              )}
            </div>
          ) : activeSection === 'evidence' ? (
            <div>
              {state.evidenceCards.length === 0 ? (
                <div style={{ padding: 24, borderRadius: 8, background: c.elevated, border: `1px dashed ${c.border}`, textAlign: 'center', color: c.textTertiary }}>
                  No evidence cards yet. <button onClick={() => navigate('evidence')} style={{ background: 'none', border: 'none', color: c.primary, cursor: 'pointer', fontSize: 14, fontFamily: fonts.sans }}>Open Evidence Library →</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {state.evidenceCards.map(ev => {
                    const typeColor = ev.type === 'Positive' ? c.dangerSoft : ev.type === 'Negative' ? c.successSoft : ev.type === 'Threshold' ? c.warningSoft : c.primarySoft;
                    const typeText  = ev.type === 'Positive' ? c.danger : ev.type === 'Negative' ? c.success : ev.type === 'Threshold' ? c.warning : c.primary;
                    return (
                      <div key={ev.id} style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surface }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10, background: typeColor, color: typeText }}>{ev.type}</span>
                          <span style={{ fontSize: 11, color: c.textTertiary }}>{ev.domain} · Confidence: {ev.confidence}</span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{ev.title}</div>
                        <div style={{ fontSize: 12, color: c.textSecondary }}>{ev.summary}</div>
                      </div>
                    );
                  })}
                  <button onClick={() => navigate('evidence')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.primary, fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, marginTop: 4, fontWeight: 500 }}>
                    <ExternalLink size={13} /> View in Evidence Library
                  </button>
                </div>
              )}
            </div>
          ) : activeSection === 'risk' ? (
            <div>
              {state.artifactsCreated.includes('Risk Dashboard') ? (
                <div style={{ padding: '16px 20px', borderRadius: 8, border: `1px solid ${c.successBorder}`, background: c.successSoft }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <CheckCircle size={16} color={c.success} />
                    <span style={{ fontWeight: 600, color: c.success, fontSize: 14 }}>Risk Dashboard generated</span>
                  </div>
                  <div style={{ fontSize: 13, color: c.textSecondary, marginBottom: 12 }}>Your risk matrix findings and deployment recommendation are linked to this section.</div>
                  <button onClick={() => navigate('risk')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.primary, fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 500 }}>
                    <ExternalLink size={13} /> View Risk Dashboard
                  </button>
                </div>
              ) : (
                <div style={{ padding: 24, borderRadius: 8, background: c.elevated, border: `1px dashed ${c.border}`, textAlign: 'center', color: c.textTertiary }}>
                  Risk Dashboard not yet created. <button onClick={() => navigate('risk')} style={{ background: 'none', border: 'none', color: c.primary, cursor: 'pointer', fontSize: 14, fontFamily: fonts.sans }}>Open Risk Dashboard →</button>
                </div>
              )}
            </div>
          ) : null}

          {/* Navigation between sections */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: `1px solid ${c.borderSubtle}` }}>
            {SECTIONS.findIndex(s => s.id === activeSection) > 0 ? (
              <button onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) - 1].id)}
                style={{ padding: '8px 16px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans }}>
                ← Previous
              </button>
            ) : <div />}
            {SECTIONS.findIndex(s => s.id === activeSection) < SECTIONS.length - 1 ? (
              <button onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) + 1].id)}
                style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: c.primary, color: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                Next Section <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => { update({ capstoneProgress: 100 }); navigate('portfolio'); }}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: c.success, color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: fonts.sans, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Submit to Portfolio <ChevronRight size={15} />
              </button>
            )}
          </div>

          {/* Peer review callout */}
          <div style={{ marginTop: 28, padding: '16px 20px', borderRadius: 10, background: c.elevated, border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Users size={16} color={c.textTertiary} />
              <span style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary }}>Peer Review</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 8px', borderRadius: 10, background: c.warningSoft, color: c.warning, fontWeight: 600 }}>Waiting</span>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 13, color: c.textSecondary }}>In the full course, a trained peer evaluator reviews your dossier against a structured rubric — checking threat model completeness, evaluation design validity, and evidence quality before signing off on your capstone.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: c.textTertiary }}>
              <Clock size={13} />
              Waiting for reviewer assignment — available in full course enrollment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
