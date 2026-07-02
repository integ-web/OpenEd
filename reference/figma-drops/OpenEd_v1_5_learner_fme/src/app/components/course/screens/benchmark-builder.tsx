import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, type BenchmarkEntry } from '../course-types';
import { ChevronRight, Plus, CheckSquare, Square, Download, FlaskConical } from 'lucide-react';

const DOMAINS = ['CBRN', 'Cyber', 'Autonomy', 'Deception', 'Persuasion', 'General'];
const ELICITATION = ['Baseline', 'Scaffolded', 'Assisted', 'Mixed'];
const TASK_TYPES = ['Q&A', 'CTF', 'Open-ended', 'Execution'];
const VALIDITY_LEVELS = ['Strong', 'Moderate', 'Weak'] as const;

const VALIDITY_THREATS = [
  { id: 'contamination', label: 'Contamination risk', description: 'Training data may include benchmark items or near-identical variants' },
  { id: 'saturation',    label: 'Saturation risk',     description: 'Most frontier models may already exceed the threshold, reducing discriminability' },
  { id: 'elicitation',  label: 'Elicitation sensitivity', description: 'Results may vary significantly based on prompt scaffolding and framing' },
  { id: 'external',     label: 'External validity',    description: 'Tasks may not reflect real-world deployment conditions' },
  { id: 'adjudication', label: 'Adjudication reliability', description: 'Scoring may be inconsistent across human graders or model-based evaluators' },
];

const STARTER_TASKS: BenchmarkEntry[] = [
  {
    id: 'BM-STARTER-01',
    name: 'Dual-use synthesis query battery',
    domain: 'CBRN',
    taskType: 'Q&A',
    metric: 'Expert uplift score (0–5)',
    tasks: 30,
    validity: 'Moderate',
    notes: 'Expert adjudicators required. Contamination risk: low. Saturation: unlikely given specificity.',
  },
  {
    id: 'BM-STARTER-02',
    name: 'Scaffolded elicitation uplift study',
    domain: 'CBRN',
    taskType: 'Open-ended',
    metric: 'CAL boundary proximity (1–5)',
    tasks: 20,
    validity: 'Strong',
    notes: 'Multi-turn expert framing. Domain specialist adjudication required.',
  },
];

const EMPTY_TASK: Partial<BenchmarkEntry> = {
  name: '',
  domain: '',
  taskType: 'Q&A',
  metric: '',
  tasks: 10,
  validity: 'Moderate',
  notes: '',
};

type ThreatRating = 'Good' | 'Moderate' | 'Poor';

export function BenchmarkBuilderScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [riskDomain, setRiskDomain] = useState('');
  const [elicitation, setElicitation] = useState('');
  const [objective, setObjective] = useState('');
  const [tasks, setTasks] = useState<BenchmarkEntry[]>(STARTER_TASKS);
  const [currentTask, setCurrentTask] = useState<Partial<BenchmarkEntry>>(EMPTY_TASK);
  const [addingTask, setAddingTask] = useState(false);
  const [threatRatings, setThreatRatings] = useState<Record<string, ThreatRating>>({});
  const [validityNotes, setValidityNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const overallValidity = (): 'Strong' | 'Moderate' | 'Weak' => {
    const ratings = Object.values(threatRatings);
    if (ratings.length === 0) return 'Moderate';
    const poor = ratings.filter(r => r === 'Poor').length;
    const good = ratings.filter(r => r === 'Good').length;
    if (poor >= 2) return 'Weak';
    if (good >= 4) return 'Strong';
    return 'Moderate';
  };

  const validityColor = (v: string) => {
    if (v === 'Strong') return { bg: c.successSoft, border: c.successBorder, text: c.success };
    if (v === 'Weak')   return { bg: c.dangerSoft,  border: c.dangerBorder,  text: c.danger  };
    return                     { bg: c.warningSoft, border: c.warningBorder, text: c.warning };
  };

  const addTask = () => {
    if (!currentTask.name?.trim() || !currentTask.metric?.trim()) return;
    const entry: BenchmarkEntry = {
      id: `BM-${Date.now()}`,
      name: currentTask.name!,
      domain: currentTask.domain || riskDomain || 'General',
      taskType: currentTask.taskType || 'Q&A',
      metric: currentTask.metric!,
      tasks: currentTask.tasks || 10,
      validity: currentTask.validity as 'Strong' | 'Moderate' | 'Weak' || 'Moderate',
      notes: currentTask.notes || '',
    };
    setTasks([...tasks, entry]);
    setCurrentTask(EMPTY_TASK);
    setAddingTask(false);
  };

  const handleSave = () => {
    const newBenchmarks = tasks.map(t => ({ ...t, domain: t.domain || riskDomain }));
    const existing = state.benchmarks.filter(b => !tasks.find(t => t.id === b.id));
    update({
      benchmarks: [...existing, ...newBenchmarks],
      artifactsCreated: [...state.artifactsCreated, `Benchmark Packet — ${riskDomain} — ${new Date().toLocaleDateString()}`],
    });
    setSaved(true);
  };

  const stepLabel = (s: number) => ['Define Scope', 'Add Tasks', 'Validity', 'Review & Save'][s - 1];

  const stepBtn = (s: number): React.CSSProperties => ({
    flex: 1,
    padding: '10px 8px',
    borderRadius: 8,
    border: 'none',
    cursor: step >= s ? 'pointer' : 'default',
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: step === s ? 600 : 400,
    background: step === s ? c.primary : step > s ? c.successSoft : 'transparent',
    color: step === s ? '#fff' : step > s ? c.success : c.textTertiary,
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 8,
    border: `1px solid ${c.border}`,
    background: c.elevated,
    color: c.textPrimary,
    fontFamily: fonts.sans,
    fontSize: 13,
    padding: '10px 12px',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: c.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <FlaskConical size={20} color={c.teal} />
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.textPrimary }}>Benchmark Builder</h1>
        </div>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: c.textSecondary }}>Build a benchmark packet for a frontier model evaluation. Module D artifact.</p>

        {/* Step tracker */}
        <div style={{ display: 'flex', gap: 6, background: c.surface, borderRadius: 10, padding: 5, border: `1px solid ${c.border}`, marginBottom: 28 }}>
          {([1, 2, 3, 4] as const).map(s => (
            <button key={s} style={stepBtn(s)} onClick={() => { if (step >= s) setStep(s); }}>
              {s}. {stepLabel(s)}
            </button>
          ))}
        </div>

        {/* ── Step 1: Define Scope ── */}
        {step === 1 && (
          <div>
            <p style={{ margin: '0 0 20px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Define the evaluation scope</p>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 22, marginBottom: 18, boxShadow: shadow.sm }}>
              <label style={labelStyle}>What risk domain are you evaluating?</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {DOMAINS.map(d => (
                  <button key={d} onClick={() => setRiskDomain(d)} style={{ padding: '10px 18px', borderRadius: 8, border: `1.5px solid ${riskDomain === d ? c.primary : c.border}`, background: riskDomain === d ? c.primarySoft : c.elevated, color: riskDomain === d ? c.primary : c.textSecondary, fontWeight: riskDomain === d ? 700 : 400, fontSize: 14, cursor: 'pointer' }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 22, marginBottom: 18, boxShadow: shadow.sm }}>
              <label style={labelStyle}>What elicitation approach will you use?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {ELICITATION.map(e => (
                  <label key={e} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, border: `1.5px solid ${elicitation === e ? c.primary : c.border}`, background: elicitation === e ? c.primarySoft : c.elevated, cursor: 'pointer' }}>
                    <input type="radio" name="elicitation" checked={elicitation === e} onChange={() => setElicitation(e)} style={{ accentColor: c.primary }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: elicitation === e ? 600 : 400, fontSize: 14, color: c.textPrimary }}>{e}</p>
                      <p style={{ margin: 0, fontSize: 11, color: c.textTertiary }}>
                        {e === 'Baseline' && 'Naive single-turn, no scaffolding'}
                        {e === 'Scaffolded' && 'Expert-guided multi-turn with framing'}
                        {e === 'Assisted' && 'Tool/resource augmented prompting'}
                        {e === 'Mixed' && 'Combination of the above approaches'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 22, marginBottom: 24, boxShadow: shadow.sm }}>
              <label style={labelStyle}>What is your evaluation objective?</label>
              <textarea
                value={objective}
                onChange={e => setObjective(e.target.value)}
                placeholder="e.g. Measure whether the model provides meaningful uplift to a non-expert attempting to synthesise Schedule 1 compounds using standard chemistry laboratory equipment..."
                style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
              />
              {objective.length > 0 && objective.length < 40 && (
                <p style={{ margin: '6px 0 0', fontSize: 12, color: c.warning }}>Evaluation objectives should be specific. Describe the risk question, the actor model, and the target capability.</p>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                disabled={!riskDomain || !elicitation || objective.length < 20}
                onClick={() => setStep(2)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: riskDomain && elicitation && objective.length >= 20 ? c.primary : c.elevated, color: riskDomain && elicitation && objective.length >= 20 ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: riskDomain && elicitation && objective.length >= 20 ? 'pointer' : 'not-allowed' }}
              >
                Next: Define tasks <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Add Tasks ── */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Benchmark tasks — {riskDomain} domain</p>
              <button onClick={() => setAddingTask(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${c.primary}`, background: c.primarySoft, color: c.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <Plus size={14} /> Add task
              </button>
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, overflow: 'hidden', marginBottom: 18, boxShadow: shadow.sm }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
                    {['Name', 'Type', 'Items', 'Metric', 'Validity'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => {
                    const vc = validityColor(task.validity);
                    return (
                      <tr key={task.id} style={{ borderBottom: i < tasks.length - 1 ? `1px solid ${c.borderSubtle}` : 'none' }}>
                        <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{task.name}</td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: c.textSecondary }}>{task.taskType}</td>
                        <td style={{ padding: '12px 14px', fontSize: 13, fontFamily: fonts.mono, color: c.textSecondary }}>{task.tasks}</td>
                        <td style={{ padding: '12px 14px', fontSize: 12, color: c.textSecondary }}>{task.metric}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: vc.bg, border: `1px solid ${vc.border}`, color: vc.text }}>{task.validity}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Add task form */}
            {addingTask && (
              <div style={{ background: c.surface, border: `1.5px solid ${c.primaryBorder}`, borderRadius: 10, padding: 20, marginBottom: 18, boxShadow: shadow.md }}>
                <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Add benchmark task</p>
                <div style={{ display: 'grid', gap: 12 }}>
                  <input value={currentTask.name || ''} onChange={e => setCurrentTask({ ...currentTask, name: e.target.value })} placeholder="Task name" style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    <select value={currentTask.taskType || 'Q&A'} onChange={e => setCurrentTask({ ...currentTask, taskType: e.target.value })} style={inputStyle}>
                      {TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="number" value={currentTask.tasks || 10} onChange={e => setCurrentTask({ ...currentTask, tasks: parseInt(e.target.value) })} placeholder="# items" style={inputStyle} />
                    <select value={currentTask.validity || 'Moderate'} onChange={e => setCurrentTask({ ...currentTask, validity: e.target.value as 'Strong' | 'Moderate' | 'Weak' })} style={inputStyle}>
                      {VALIDITY_LEVELS.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <input value={currentTask.metric || ''} onChange={e => setCurrentTask({ ...currentTask, metric: e.target.value })} placeholder="Metric / scoring rubric (e.g. Expert uplift score 0–5)" style={inputStyle} />
                  <textarea value={currentTask.notes || ''} onChange={e => setCurrentTask({ ...currentTask, notes: e.target.value })} placeholder="Notes on validity, adjudication method, contamination risk..." style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={addTask} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add to packet</button>
                    <button onClick={() => { setAddingTask(false); setCurrentTask(EMPTY_TASK); }} style={{ padding: '9px 14px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setStep(3)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Next: Validity assessment <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Validity ── */}
        {step === 3 && (
          <div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Validity assessment</p>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: c.textSecondary }}>Rate each validity threat for your benchmark packet. This will generate an overall validity rating.</p>

            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              {VALIDITY_THREATS.map(threat => {
                const current = threatRatings[threat.id];
                return (
                  <div key={threat.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 18, boxShadow: shadow.sm }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ margin: '0 0 3px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>{threat.label}</p>
                        <p style={{ margin: 0, fontSize: 13, color: c.textSecondary }}>{threat.description}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        {(['Good', 'Moderate', 'Poor'] as ThreatRating[]).map(rating => {
                          const ratingColor = { Good: c.success, Moderate: c.warning, Poor: c.danger }[rating];
                          const sel = current === rating;
                          return (
                            <button
                              key={rating}
                              onClick={() => setThreatRatings({ ...threatRatings, [threat.id]: rating })}
                              style={{ padding: '6px 12px', borderRadius: 6, border: `1.5px solid ${sel ? ratingColor : c.border}`, background: sel ? (rating === 'Good' ? c.successSoft : rating === 'Moderate' ? c.warningSoft : c.dangerSoft) : 'transparent', color: sel ? ratingColor : c.textTertiary, fontSize: 12, fontWeight: sel ? 700 : 400, cursor: 'pointer' }}
                            >
                              {rating}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall validity display */}
            <div style={{ marginBottom: 18 }}>
              {(() => {
                const ov = overallValidity();
                const ovc = validityColor(ov);
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: ovc.bg, border: `1.5px solid ${ovc.border}`, borderRadius: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary }}>Overall packet validity:</span>
                    <span style={{ fontWeight: 800, fontSize: 15, color: ovc.text }}>{ov}</span>
                    <span style={{ fontSize: 13, color: c.textTertiary }}>
                      {ov === 'Strong' && '— High confidence in benchmark evidence quality'}
                      {ov === 'Moderate' && '— Acceptable, but document the key threats'}
                      {ov === 'Weak' && '— Consider redesigning before data collection'}
                    </span>
                  </div>
                );
              })()}
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 24 }}>
              <label style={labelStyle}>How will you address the main validity threats?</label>
              <textarea
                value={validityNotes}
                onChange={e => setValidityNotes(e.target.value)}
                placeholder="Describe your planned mitigations for contamination, saturation, elicitation sensitivity, and adjudication reliability..."
                style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }}
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setStep(4)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Next: Review & save <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Review & Save ── */}
        {step === 4 && (
          <div>
            <p style={{ margin: '0 0 20px', fontWeight: 600, fontSize: 15, color: c.textPrimary }}>Review & save your benchmark packet</p>

            {/* Summary card */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 22, marginBottom: 20, boxShadow: shadow.sm }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
                {[
                  { label: 'Risk domain', value: riskDomain },
                  { label: 'Elicitation', value: elicitation },
                  { label: 'Overall validity', value: overallValidity() },
                  { label: 'Total tasks', value: `${tasks.length} benchmarks` },
                  { label: 'Total items', value: `${tasks.reduce((s, t) => s + t.tasks, 0)} items` },
                  { label: 'Task types', value: [...new Set(tasks.map(t => t.taskType))].join(', ') },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
                <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Evaluation objective</p>
                <p style={{ margin: 0, fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{objective}</p>
              </div>
            </div>

            {/* Tasks table */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, overflow: 'hidden', marginBottom: 24, boxShadow: shadow.sm }}>
              <div style={{ padding: '12px 16px', background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>Benchmark tasks ({tasks.length})</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: c.elevated, borderBottom: `1px solid ${c.border}` }}>
                    {['Name', 'Type', 'Items', 'Metric', 'Validity', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => {
                    const vc = validityColor(task.validity);
                    return (
                      <tr key={task.id} style={{ borderBottom: i < tasks.length - 1 ? `1px solid ${c.borderSubtle}` : 'none' }}>
                        <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 500, color: c.textPrimary }}>{task.name}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: c.textSecondary }}>{task.taskType}</td>
                        <td style={{ padding: '11px 14px', fontSize: 13, fontFamily: fonts.mono, color: c.textSecondary }}>{task.tasks}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: c.textSecondary }}>{task.metric}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: vc.bg, border: `1px solid ${vc.border}`, color: vc.text }}>{task.validity}</span>
                        </td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: c.textTertiary, maxWidth: 200 }}>{task.notes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Validity checklist */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 24 }}>
              <p style={{ margin: '0 0 14px', fontWeight: 600, fontSize: 13, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Validity threat ratings</p>
              <div style={{ display: 'grid', gap: 8 }}>
                {VALIDITY_THREATS.map(threat => {
                  const rating = threatRatings[threat.id];
                  const ratingColor = rating === 'Good' ? c.success : rating === 'Poor' ? c.danger : c.warning;
                  return (
                    <div key={threat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                      <span style={{ color: c.textSecondary }}>{threat.label}</span>
                      {rating
                        ? <span style={{ fontWeight: 600, color: ratingColor, display: 'flex', alignItems: 'center', gap: 4 }}>{rating === 'Good' ? <CheckSquare size={13} /> : <Square size={13} />} {rating}</span>
                        : <span style={{ color: c.textTertiary, fontSize: 12 }}>Not rated</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>

            {saved && (
              <div style={{ background: c.successSoft, border: `1.5px solid ${c.successBorder}`, borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckSquare size={18} color={c.success} />
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: c.success }}>Benchmark packet saved to your library and portfolio artifact created.</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={handleSave}
                disabled={saved}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 8, border: 'none', background: saved ? c.elevated : c.primary, color: saved ? c.textTertiary : '#fff', fontSize: 14, fontWeight: 600, cursor: saved ? 'not-allowed' : 'pointer' }}
              >
                {saved ? 'Saved' : 'Save to Benchmark Library'}
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  disabled
                  title="Export to PDF is available in the full course version"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1.5px solid ${c.border}`, background: c.elevated, color: c.textTertiary, fontSize: 14, cursor: 'not-allowed' }}
                >
                  <Download size={15} /> Export as PDF
                </button>
              </div>
              {saved && (
                <button onClick={() => navigate('evidence')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1.5px solid ${c.tealBorder}`, background: c.tealSoft, color: c.teal, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  View Evidence Library <ChevronRight size={15} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
