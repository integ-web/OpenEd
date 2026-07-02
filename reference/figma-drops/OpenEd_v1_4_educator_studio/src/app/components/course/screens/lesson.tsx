import { useState, useRef, useEffect } from 'react';
import {
  FileText, Captions, Gauge, StickyNote,
  ChevronDown, ChevronUp, Check, X, Target, RotateCcw,
  CheckCircle, Save, ArrowRight, Sparkles, AlertTriangle,
  ChevronRight, Star, ExternalLink,
} from 'lucide-react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { LESSONS, PHASE_LESSONS, DEFAULT_LESSON_ID, type LessonData } from '../../../data/lessonContent';
import { VideoReferencePlayer } from '../VideoReferencePlayer';
import { BYOKCoachPanel } from '../BYOKCoachPanel';

// ── Watch tab ─────────────────────────────────────────────────────────────────
function WatchTab({ lesson, dark }: { lesson: LessonData; dark: boolean }) {
  const c = C(dark);
  const [note, setNote] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <VideoReferencePlayer lessonId={lesson.lessonId} dark={dark} />
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>What to watch for</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lesson.keyIdeas.slice(0, 3).map((idea, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, color: dark ? '#60A5FA' : '#2563EB', fontWeight: 700 }}>{i + 1}</span>
              </div>
              <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, margin: 0, lineHeight: 1.65 }}><strong style={{ color: c.textPrimary }}>{idea.title}</strong> — {idea.body.split('.')[0]}.</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 8px' }}>Lesson notes</p>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add your notes here — key ideas, questions, connections to your own work..." rows={4} style={{ width: '100%', padding: '12px 14px', fontFamily: fonts.sans, fontSize: 14, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, color: c.textPrimary, resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }} />
      </div>
    </div>
  );
}

// ── Understand tab ────────────────────────────────────────────────────────────
function UnderstandTab({ lesson, dark }: { lesson: LessonData; dark: boolean }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [openIdea, setOpenIdea] = useState<number | null>(0);
  const [exTab, setExTab] = useState<'weak' | 'improved'>('weak');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Key ideas */}
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Key ideas</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lesson.keyIdeas.map((idea, i) => (
            <div key={i} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpenIdea(openIdea === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: dark ? 'rgba(37,99,235,0.14)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: blue }}>{i + 1}</span>
                </div>
                <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, flex: 1, textAlign: 'left' }}>{idea.title}</span>
                {openIdea === i ? <ChevronUp size={14} color={c.textTertiary} /> : <ChevronDown size={14} color={c.textTertiary} />}
              </button>
              {openIdea === i && (
                <div style={{ padding: '0 20px 18px 60px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, lineHeight: 1.7, margin: 0 }}>{idea.body}</p>
                  <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8, padding: '10px 14px' }}>
                    <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '0 0 5px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Example</p>
                    <p style={{ fontFamily: fonts.serif, fontSize: 14, color: c.textPrimary, lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>{idea.example}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mental model */}
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Mental model</p>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 22px' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: '0 0 14px', lineHeight: 1.6 }}>{lesson.mentalModelTitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {lesson.flowNodes.map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ background: `${node.color}12`, border: `1px solid ${node.color}30`, borderRadius: 8, padding: '7px 12px' }}>
                  <p style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: node.color, margin: '0 0 2px' }}>{node.label}</p>
                  <p style={{ fontFamily: fonts.sans, fontSize: 11, color: c.textTertiary, margin: 0 }}>{node.desc}</p>
                </div>
                {i < lesson.flowNodes.length - 1 && <ChevronRight size={12} color={c.textTertiary} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Worked example */}
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Worked example</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {(['weak', 'improved'] as const).map(t => (
            <button key={t} onClick={() => setExTab(t)} style={{ padding: '6px 16px', borderRadius: 999, fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: exTab === t ? (t === 'weak' ? (dark ? 'rgba(185,28,28,0.14)' : '#FEE2E2') : (dark ? 'rgba(21,128,61,0.14)' : '#DCFCE7')) : c.elevated, color: exTab === t ? (t === 'weak' ? (dark ? '#F87171' : '#B91C1C') : (dark ? '#4ADE80' : '#15803D')) : c.textSecondary, border: `1px solid ${exTab === t ? (t === 'weak' ? (dark ? 'rgba(248,113,113,0.3)' : '#FECACA') : (dark ? 'rgba(74,222,128,0.3)' : '#BBF7D0')) : c.border}` }}>
              {t === 'weak' ? '✗ Weak' : '✓ Improved'}
            </button>
          ))}
        </div>
        {exTab === 'weak' ? (
          <div style={{ background: dark ? 'rgba(185,28,28,0.07)' : '#FFF1F2', border: `1px solid ${dark ? 'rgba(248,113,113,0.22)' : '#FECDD3'}`, borderRadius: 12, padding: '18px 22px' }}>
            <p style={{ fontFamily: fonts.serif, fontSize: 16, color: c.textPrimary, fontStyle: 'italic', margin: '0 0 14px', lineHeight: 1.55 }}>{lesson.workedExample.weak}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {lesson.workedExample.weakProblems.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <X size={13} color={dark ? '#F87171' : '#B91C1C'} style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background: dark ? 'rgba(21,128,61,0.07)' : '#F0FDF4', border: `1px solid ${dark ? 'rgba(74,222,128,0.22)' : '#BBF7D0'}`, borderRadius: 12, padding: '18px 22px' }}>
            <p style={{ fontFamily: fonts.serif, fontSize: 14, color: c.textPrimary, fontStyle: 'italic', margin: '0 0 14px', lineHeight: 1.65 }}>{lesson.workedExample.improved}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {lesson.workedExample.improvedStrengths.map(([label, detail], i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <Check size={13} color={dark ? '#4ADE80' : '#15803D'} style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary }}><strong style={{ color: c.textPrimary }}>{label}</strong> — {detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Common mistake */}
      <div style={{ background: dark ? 'rgba(180,83,9,0.08)' : '#FFFBEB', border: `1px solid ${dark ? 'rgba(251,191,36,0.22)' : '#FDE68A'}`, borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <AlertTriangle size={14} color={dark ? '#FBBF24' : '#B45309'} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, color: dark ? '#FBBF24' : '#B45309', margin: '0 0 5px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Common mistake</p>
            <p style={{ fontFamily: fonts.sans, fontSize: 14, color: C(dark).textSecondary, margin: 0, lineHeight: 1.65 }}>{lesson.commonMistake}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Practice tab ──────────────────────────────────────────────────────────────
function PracticeTab({ lesson, dark }: { lesson: LessonData; dark: boolean }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [ans, setAns] = useState<Record<string, string>>({});
  const [quizAns, setQuizAns] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const allFilled = lesson.practiceFields.every(f => (ans[f.key] || '').trim().length > 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Practice prompt */}
      <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 22px' }}>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: dark ? '#FBBF24' : '#B45309', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>Your scenario</p>
        <p style={{ fontFamily: fonts.serif, fontSize: 17, color: c.textPrimary, fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.5 }}>{lesson.practicePrompt}</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>{lesson.practiceTask}</p>
      </div>

      {/* Practice fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {lesson.practiceFields.map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</label>
            <textarea value={ans[f.key] ?? ''} onChange={e => setAns(a => ({ ...a, [f.key]: e.target.value }))} disabled={submitted} placeholder={f.ph} rows={2} style={{ width: '100%', padding: '10px 14px', fontFamily: fonts.sans, fontSize: 13, background: submitted ? c.elevated : c.surface, border: `1px solid ${(ans[f.key] || '').trim() ? (dark ? 'rgba(74,222,128,0.35)' : '#86EFAC') : c.border}`, borderRadius: 8, color: c.textPrimary, resize: 'vertical', outline: 'none', lineHeight: 1.55, boxSizing: 'border-box' }} />
          </div>
        ))}
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={!allFilled} style={{ alignSelf: 'flex-start', padding: '10px 24px', borderRadius: 8, background: allFilled ? blue : c.elevated, color: allFilled ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: allFilled ? 'pointer' : 'not-allowed' }}>
            Submit response
          </button>
        ) : (
          <div style={{ background: dark ? 'rgba(21,128,61,0.1)' : '#F0FDF4', border: `1px solid ${dark ? 'rgba(74,222,128,0.28)' : '#BBF7D0'}`, borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <CheckCircle size={14} color={dark ? '#4ADE80' : '#15803D'} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: dark ? '#4ADE80' : '#15803D', margin: '0 0 5px' }}>Response submitted</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: '0 0 10px', lineHeight: 1.6 }}>Compare your answer with the worked example in the Understand tab, or ask the AI Coach to review it.</p>
                <button onClick={() => { setSubmitted(false); setAns({}); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary, fontFamily: fonts.sans, fontSize: 12, cursor: 'pointer' }}>
                  <RotateCcw size={11} /> Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz */}
      <div>
        <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Knowledge check</p>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 20px' }}>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: '0 0 14px', lineHeight: 1.5 }}>{lesson.quizQuestion}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {lesson.quizOptions.map((opt, i) => {
              const selected = quizAns === i;
              const correct = i === lesson.quizCorrect;
              let bg = c.elevated, border = c.border, color = c.textSecondary;
              if (quizSubmitted && correct) { bg = dark ? 'rgba(74,222,128,0.12)' : '#F0FDF4'; border = dark ? 'rgba(74,222,128,0.3)' : '#BBF7D0'; color = dark ? '#4ADE80' : '#15803D'; }
              if (quizSubmitted && selected && !correct) { bg = dark ? 'rgba(248,113,113,0.12)' : '#FFF1F2'; border = dark ? 'rgba(248,113,113,0.3)' : '#FECDD3'; color = dark ? '#F87171' : '#B91C1C'; }
              if (!quizSubmitted && selected) { bg = dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF'; border = dark ? 'rgba(96,165,250,0.3)' : '#BFDBFE'; color = c.textPrimary; }
              return (
                <button key={i} disabled={quizSubmitted} onClick={() => setQuizAns(i)} style={{ textAlign: 'left', padding: '11px 14px', borderRadius: 8, background: bg, border: `1px solid ${border}`, color, fontFamily: fonts.sans, fontSize: 13, cursor: quizSubmitted ? 'default' : 'pointer', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 11, minWidth: 18 }}>{String.fromCharCode(65 + i)}.</span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {quizSubmitted && correct && <Check size={13} color={dark ? '#4ADE80' : '#15803D'} style={{ flexShrink: 0 }} />}
                  {quizSubmitted && selected && !correct && <X size={13} color={dark ? '#F87171' : '#B91C1C'} style={{ flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
          {!quizSubmitted ? (
            <button onClick={() => setQuizSubmitted(true)} disabled={quizAns === null} style={{ marginTop: 14, padding: '9px 22px', borderRadius: 8, background: quizAns !== null ? blue : c.elevated, color: quizAns !== null ? '#fff' : c.textTertiary, border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: quizAns !== null ? 'pointer' : 'not-allowed' }}>
              Submit answer
            </button>
          ) : (
            <div style={{ marginTop: 12, padding: '12px 14px', background: c.elevated, borderRadius: 8 }}>
              <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.6 }}>{lesson.quizExplanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Build tab ─────────────────────────────────────────────────────────────────
function BuildTab({ lesson, dark, onSave }: { lesson: LessonData; dark: boolean; onSave: () => void }) {
  const c = C(dark);
  const blue = dark ? '#60A5FA' : '#2563EB';
  const [artifact, setArtifact] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const filled = lesson.artifactFields.filter(f => (artifact[f.key] || '').trim().length > 3).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, padding: '14px 18px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <Target size={14} color={blue} />
          <p style={{ fontFamily: fonts.mono, fontSize: 10, color: blue, margin: 0, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Artifact · {lesson.lessonId}</p>
        </div>
        <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: '0 0 4px' }}>{lesson.artifactType}</p>
        <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.5 }}>{lesson.capstoneConnection} Complete all fields to save to your portfolio.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 4, background: c.elevated, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: 4, width: `${(filled / lesson.artifactFields.length) * 100}%`, background: blue, borderRadius: 999, transition: 'width 0.25s' }} />
        </div>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, flexShrink: 0 }}>{filled}/{lesson.artifactFields.length} fields</span>
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: shadow.sm }}>
        <div style={{ background: '#2563EB', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: fonts.mono, fontSize: 10, color: 'rgba(255,255,255,0.65)', margin: '0 0 2px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Artifact · {lesson.lessonId}</p>
            <p style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{lesson.artifactType}</p>
          </div>
          {saved && <CheckCircle size={18} color="#fff" />}
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lesson.artifactFields.map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 }}>{f.label}</label>
              <textarea value={artifact[f.key] ?? ''} onChange={e => { setArtifact(a => ({ ...a, [f.key]: e.target.value })); setSaved(false); }} placeholder={f.ph} rows={2} style={{ width: '100%', padding: '9px 13px', fontFamily: fonts.sans, fontSize: 13, background: c.elevated, border: `1px solid ${(artifact[f.key] || '').trim() ? (dark ? 'rgba(96,165,250,0.32)' : '#93C5FD') : c.border}`, borderRadius: 8, color: c.textPrimary, resize: 'vertical', outline: 'none', lineHeight: 1.55, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 4 }}>
            <button onClick={() => { setSaved(true); onSave(); }} style={{ padding: '10px 22px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Save size={14} /> {saved ? 'Saved to portfolio' : 'Save to portfolio'}
            </button>
            {saved && (
              <button style={{ padding: '10px 18px', borderRadius: 8, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ArrowRight size={13} /> Add to capstone
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sources tab ───────────────────────────────────────────────────────────────
function SourcesTab({ lesson, dark }: { lesson: LessonData; dark: boolean }) {
  const c = C(dark);
  const required = lesson.sources.filter(s => s.required);
  const optional = lesson.sources.filter(s => !s.required);
  const typeColor: Record<string, string> = {
    'paper': dark ? '#A78BFA' : '#6D28D9',
    'paper / leaderboard': dark ? '#60A5FA' : '#2563EB',
    'tool documentation': dark ? '#2DD4BF' : '#0F766E',
    'benchmark / docs': dark ? '#FBBF24' : '#B45309',
    'benchmark / paper': dark ? '#F87171' : '#B91C1C',
    'benchmark / dataset': dark ? '#4ADE80' : '#15803D',
    'policy framework': dark ? '#A78BFA' : '#6D28D9',
    'free book': dark ? '#60A5FA' : '#2563EB',
    'free course': dark ? '#2DD4BF' : '#0F766E',
    'leaderboard': dark ? '#FBBF24' : '#B45309',
    'tool': dark ? '#2DD4BF' : '#0F766E',
    'benchmark': dark ? '#FBBF24' : '#B45309',
    'robotics benchmark': dark ? '#60A5FA' : '#2563EB',
    'controlled learning game': dark ? '#4ADE80' : '#15803D',
    'technical report': dark ? '#60A5FA' : '#2563EB',
    'model documentation': dark ? '#2DD4BF' : '#0F766E',
    'research blog': dark ? '#A78BFA' : '#6D28D9',
    'framework': dark ? '#FBBF24' : '#B45309',
    'report': dark ? '#60A5FA' : '#2563EB',
    'paper / report': dark ? '#60A5FA' : '#2563EB',
  };
  const diffColor: Record<string, string> = { 'beginner': dark ? '#4ADE80' : '#15803D', 'beginner-intermediate': dark ? '#A3E635' : '#4D7C0F', 'intermediate': dark ? '#FBBF24' : '#B45309', 'advanced': dark ? '#F87171' : '#B91C1C' };

  const SourceCard = ({ s }: { s: typeof lesson.sources[0] }) => (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 20px', boxShadow: shadow.sm }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, padding: '2px 7px', borderRadius: 999, background: `${typeColor[s.type] ?? c.primary}14`, color: typeColor[s.type] ?? c.primary, border: `1px solid ${typeColor[s.type] ?? c.primary}25` }}>{s.type}</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, padding: '2px 7px', borderRadius: 999, background: `${diffColor[s.diff] ?? c.textTertiary}14`, color: diffColor[s.diff] ?? c.textTertiary, border: `1px solid ${diffColor[s.diff] ?? c.textTertiary}25` }}>{s.diff}</span>
        {s.required && <span style={{ fontFamily: fonts.mono, fontSize: 10, padding: '2px 7px', borderRadius: 999, background: dark ? 'rgba(45,212,191,0.12)' : '#CCFBF1', color: dark ? '#2DD4BF' : '#0F766E', border: `1px solid ${dark ? 'rgba(45,212,191,0.25)' : '#99F6E4'}` }}>Required</span>}
      </div>
      <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: '0 0 3px' }}>{s.title}</p>
      <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: '0 0 8px' }}>{s.id} · {s.org}</p>
      <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: '0 0 10px', lineHeight: 1.6 }}>{s.why}</p>
      {s.url ? (
        <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary, fontFamily: fonts.sans, fontSize: 12, textDecoration: 'none' }}>
          <ExternalLink size={11} /> Open source
        </a>
      ) : (
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, margin: 0 }}>Source URL pending — add to content pack.</p>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {lesson.sources.length === 0 && (
        <div style={{ padding: '24px', background: c.elevated, borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary, margin: 0 }}>Source metadata pending — add at least one required source before publishing this lesson.</p>
        </div>
      )}
      {required.length > 0 && (
        <div>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Required sources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {required.map((s, i) => <SourceCard key={i} s={s} />)}
          </div>
        </div>
      )}
      {optional.length > 0 && (
        <div>
          <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Optional / advanced sources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {optional.map((s, i) => <SourceCard key={i} s={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// AICoachPanel is now BYOKCoachPanel — imported from BYOKCoachPanel.tsx

// ── Lesson navigator (prev/next) ──────────────────────────────────────────────
function LessonNav({ lesson, phaseId, onNavigate }: { lesson: LessonData; phaseId: string; onNavigate: (id: string) => void }) {
  const phaseList = PHASE_LESSONS[phaseId] ?? [];
  const idx = phaseList.indexOf(lesson.lessonId);
  const prevId = idx > 0 ? phaseList[idx - 1] : null;
  const nextId = lesson.nextLessonId;
  const c = C(false); // use light for nav
  const blue = '#2563EB';

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {prevId && (
        <button onClick={() => onNavigate(prevId)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 7, background: 'transparent', border: `1px solid #E2E8F0`, color: '#475569', fontFamily: fonts.sans, fontSize: 12, cursor: 'pointer' }}>
          ← Prev
        </button>
      )}
      {nextId && (
        <button onClick={() => onNavigate(nextId)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 7, background: blue, border: 'none', color: '#fff', fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          Next → {LESSONS[nextId]?.title?.split(':')[0] ?? ''}
        </button>
      )}
    </div>
  );
}

// ── Main lesson screen ────────────────────────────────────────────────────────
type TabId = 'watch' | 'understand' | 'practice' | 'build' | 'sources';
const TABS: { id: TabId; label: string }[] = [
  { id: 'watch', label: 'Watch' },
  { id: 'understand', label: 'Understand' },
  { id: 'practice', label: 'Practice' },
  { id: 'build', label: 'Build' },
  { id: 'sources', label: 'Sources' },
];

export function LessonScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const blue = state.dark ? '#60A5FA' : '#2563EB';
  const [activeTab, setActiveTab] = useState<TabId>('watch');
  const [artifactSaved, setArtifactSaved] = useState(false);
  const [complete, setComplete] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const lessonId = state.currentLessonId ?? DEFAULT_LESSON_ID;
  const lesson = LESSONS[lessonId] ?? LESSONS[DEFAULT_LESSON_ID];

  const handleNavigateLesson = (nextId: string) => {
    update({ currentLessonId: nextId });
    setActiveTab('watch');
    setArtifactSaved(false);
    setComplete(false);
    setConfidence(0);
  };

  const handleSave = () => {
    setArtifactSaved(true);
    update({ artifactsCreated: [...state.artifactsCreated, `${lesson.artifactType} — ${lesson.lessonId}`] });
  };

  if (complete) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: fonts.sans, maxWidth: 520, margin: '0 auto' }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: `${c.success}14`, border: `2px solid ${c.success}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle size={30} color={c.success} />
        </div>
        <p style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>{lesson.phaseId} · Lesson {lesson.lessonNum} of {lesson.lessonOf}</p>
        <h1 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, color: c.textPrimary, margin: '0 0 10px' }}>Lesson complete</h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 14, color: c.textSecondary, margin: '0 0 20px', lineHeight: 1.6 }}>{lesson.title}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, margin: '0 0 28px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setConfidence(i + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <Star size={22} fill={i < confidence ? c.warning : 'none'} color={i < confidence ? c.warning : c.textTertiary} />
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {lesson.nextLessonId && (
            <button onClick={() => handleNavigateLesson(lesson.nextLessonId!)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Next lesson <ArrowRight size={14} />
            </button>
          )}
          <button onClick={() => setComplete(false)} style={{ padding: '11px 18px', borderRadius: 8, background: c.elevated, color: c.textSecondary, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer' }}>
            Review lesson
          </button>
          <button onClick={() => navigate('evidence')} style={{ padding: '11px 18px', borderRadius: 8, background: c.elevated, color: c.textSecondary, border: `1px solid ${c.border}`, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer' }}>
            Evidence library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Lesson header */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
        <div style={{ padding: '18px 32px 0' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, color: blue, background: state.dark ? 'rgba(96,165,250,0.12)' : '#EFF6FF', padding: '2px 7px', borderRadius: 999 }}>{lesson.phaseId}</span>
            <span style={{ color: c.textTertiary, fontSize: 12 }}>·</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textTertiary }}>{lesson.phaseTitle}</span>
            <span style={{ color: c.textTertiary }}>›</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>Lesson {lesson.lessonNum} of {lesson.lessonOf} · {lesson.duration} · {lesson.difficulty}</span>
            {lesson.videoStatus === 'candidate-external' && (
              <span style={{ fontFamily: fonts.mono, fontSize: 9, color: state.dark ? '#FBBF24' : '#B45309', background: state.dark ? 'rgba(251,191,36,0.12)' : '#FFFBEB', padding: '2px 7px', borderRadius: 999, border: `1px solid ${state.dark ? 'rgba(251,191,36,0.25)' : '#FDE68A'}` }}>Verify video before publishing</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: fonts.display, fontSize: 21, fontWeight: 700, color: c.textPrimary, margin: '0 0 5px', lineHeight: 1.2 }}>{lesson.title}</h1>
              <p style={{ fontFamily: fonts.serif, fontSize: 14, color: c.textSecondary, fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.5 }}>{lesson.subtitle}</p>
              <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8, padding: '9px 13px' }}>
                <Target size={12} color={blue} style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, margin: 0, lineHeight: 1.5 }}>
                  <strong style={{ color: c.textPrimary }}>Objective:</strong> {lesson.objective}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <button onClick={() => setComplete(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Complete lesson <ArrowRight size={13} />
              </button>
              <LessonNav lesson={lesson} phaseId={lesson.phaseId} onNavigate={handleNavigateLesson} />
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', paddingLeft: 32, borderTop: `1px solid ${c.border}` }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '11px 18px', fontFamily: fonts.sans, fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? blue : c.textTertiary, background: 'none', border: 'none', cursor: 'pointer', borderBottom: `2px solid ${activeTab === tab.id ? blue : 'transparent'}`, transition: 'color 0.12s, border-color 0.12s', position: 'relative' }}>
              {tab.label}
              {tab.id === 'build' && artifactSaved && (
                <span style={{ position: 'absolute', top: 9, right: 10, width: 5, height: 5, borderRadius: '50%', background: c.success }} />
              )}
              {tab.id === 'sources' && lesson.sources.length === 0 && (
                <span style={{ position: 'absolute', top: 9, right: 10, width: 5, height: 5, borderRadius: '50%', background: c.warning }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', minWidth: 0 }}>
          {activeTab === 'watch'      && <WatchTab lesson={lesson} dark={state.dark} />}
          {activeTab === 'understand' && <UnderstandTab lesson={lesson} dark={state.dark} />}
          {activeTab === 'practice'   && <PracticeTab lesson={lesson} dark={state.dark} />}
          {activeTab === 'build'      && <BuildTab lesson={lesson} dark={state.dark} onSave={handleSave} />}
          {activeTab === 'sources'    && <SourcesTab lesson={lesson} dark={state.dark} />}

          {activeTab !== 'build' && lesson.nextLessonId && (
            <div style={{ marginTop: 40, paddingTop: 22, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, margin: '0 0 3px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Next in {lesson.phaseTitle}</p>
                <p style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: c.textPrimary, margin: 0 }}>{LESSONS[lesson.nextLessonId]?.title ?? 'Next lesson'}</p>
              </div>
              <button onClick={() => handleNavigateLesson(lesson.nextLessonId!)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, background: blue, color: '#fff', border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                Continue <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

        <div style={{ width: 340, flexShrink: 0, padding: '24px 22px 24px 0', display: 'flex', flexDirection: 'column' }}>
          <BYOKCoachPanel lesson={lesson} dark={state.dark} />
        </div>
      </div>
    </div>
  );
}
