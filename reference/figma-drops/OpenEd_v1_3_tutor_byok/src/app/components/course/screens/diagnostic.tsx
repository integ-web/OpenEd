import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';

interface Question {
  text: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    text: 'What is the primary purpose of a threat model in AI safety evaluation?',
    options: [
      'A. To list every known vulnerability in the model\'s training data',
      'B. To formalize the actors, pathways, assumptions, and consequence severity before designing evaluation tasks',
      'C. To document past incidents involving similar models',
      'D. To assign numerical risk scores to each capability dimension',
    ],
    correct: 1,
    explanation: 'A threat model defines who might cause harm, how, under what assumptions, and with what consequences — before a single evaluation task is designed.',
  },
  {
    text: 'Which of these best describes "scaffolded elicitation"?',
    options: [
      'A. Using automated red-teaming to probe every prompt variation simultaneously',
      'B. Providing chain-of-thought prompts before asking a capability question',
      'C. A structured prompting method that provides the model intermediate steps, context, and tool access to maximise apparent capability',
      'D. Running the same prompt across multiple model versions to compare scores',
    ],
    correct: 2,
    explanation: 'Scaffolded elicitation is designed to get the best-case capability measurement by removing elicitation artifacts, not to reflect typical use.',
  },
  {
    text: 'HarmBench shows a model scored 8%. What is the correct interpretation?',
    options: [
      'A. The result is provisional; it depends on elicitation method, contamination status, and whether the benchmark has saturated',
      'B. The model is safe for deployment in high-risk domains',
      'C. The model fails 8% of all safety evaluations',
      'D. The score should be averaged with other benchmarks before drawing any conclusions',
    ],
    correct: 0,
    explanation: 'A single benchmark score without elicitation method, contamination assessment, and saturation status is nearly uninterpretable on its own.',
  },
  {
    text: 'A red team finds a model can assist with CBRN synthesis under roleplay framing. Which threshold concept applies?',
    options: [
      'A. CAL-1 — the model is exhibiting normal instruction-following behavior',
      'B. CAL-2 — minor uplift, likely within the range of general web sources',
      'C. CAL-2 — borderline finding requiring additional replication runs',
      'D. CAL-3 or higher — the finding suggests meaningful uplift beyond freely available sources under scaffolded conditions',
    ],
    correct: 3,
    explanation: 'CAL-3 applies when a model provides meaningful uplift under scaffolded, adversarial conditions — exactly what roleplay framing with CBRN synthesis describes.',
  },
  {
    text: 'What is the difference between a model card and a system card?',
    options: [
      'A. A model card is for researchers; a system card is for regulators only',
      'B. A model card describes the model\'s capabilities and limitations; a system card is deployment-focused and covers mitigations, residual risks, and threshold proximity',
      'C. They are interchangeable terms for the same document type',
      'D. A system card is produced by third-party auditors; a model card is always self-reported',
    ],
    correct: 1,
    explanation: 'Model cards are capability-focused; system cards add deployment context, applied mitigations, residual risk, and often near-threshold capability disclosures.',
  },
  {
    text: 'NIST AI RMF organizes AI risk work around which four functions?',
    options: [
      'A. Govern, Map, Measure, and Manage',
      'B. Identify, Protect, Detect, and Respond',
      'C. Plan, Execute, Review, and Report',
      'D. Assess, Scope, Evaluate, and Document',
    ],
    correct: 0,
    explanation: 'The NIST AI Risk Management Framework is organized around Govern, Map, Measure, and Manage — distinct from the cybersecurity framework\'s Identify/Protect/Detect/Respond.',
  },
];

function getRecommendation(score: number): { label: string; module: string; color: string } {
  if (score >= 5) return { label: 'Strong foundation', module: 'Module C — Evaluation Science', color: '#15803D' };
  if (score >= 3) return { label: 'Good base', module: 'Module B — Governance, Law & Safety Cases', color: '#B45309' };
  return { label: 'Start from the beginning', module: 'Module A — Frontier AI Foundations', color: '#1D4ED8' };
}

export function DiagnosticScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false); // show explanation after selecting

  const q = QUESTIONS[current];
  const selectedAnswer = answers[current];
  const rec = getRecommendation(score);

  function selectAnswer(idx: number) {
    if (answers[current] !== null) return; // already answered
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    setRevealed(true);
  }

  function advance() {
    setRevealed(false);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      // Submit
      const final = answers.reduce<number>((acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0), 0);
      setScore(final);
      setSubmitted(true);
    }
  }

  const progressPct = ((current + (revealed ? 1 : 0)) / QUESTIONS.length) * 100;

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh', background: c.bg, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', fontFamily: fonts.sans,
      }}>
        <div style={{
          background: c.surface, border: `1px solid ${c.border}`,
          borderRadius: 16, padding: '48px 52px', maxWidth: 560, width: '100%',
          boxShadow: shadow.lg,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: score >= 5 ? c.successSoft : score >= 3 ? c.warningSoft : c.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, margin: '0 auto 20px',
            }}>
              {score >= 5 ? '🎯' : score >= 3 ? '📈' : '🌱'}
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, color: rec.color, fontFamily: fonts.mono, lineHeight: 1 }}>
              {score}/6
            </div>
            <div style={{ fontSize: 14, color: c.textTertiary, marginTop: 6 }}>
              {score >= 5 ? '5–6 correct' : score >= 3 ? '3–4 correct' : '0–2 correct'}
            </div>
          </div>

          <div style={{ background: c.elevated, borderRadius: 12, padding: '20px 22px', marginBottom: 20, border: `1px solid ${c.borderSubtle}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textTertiary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Verdict
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: rec.color, marginBottom: 6 }}>{rec.label}</div>
            <div style={{ fontSize: 14, color: c.textSecondary }}>Recommended entry point: <strong>{rec.module}</strong></div>
          </div>

          {/* Per-question breakdown */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary, marginBottom: 12 }}>Question results</div>
            {QUESTIONS.map((question, i) => {
              const correct = answers[i] === question.correct;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 0', borderBottom: i < 5 ? `1px solid ${c.borderSubtle}` : 'none',
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: correct ? c.successSoft : c.dangerSoft,
                    color: correct ? c.success : c.danger, flexShrink: 0,
                  }}>
                    {correct ? '✓' : '✗'}
                  </span>
                  <span style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.4 }}>
                    Q{i + 1}: {question.text.slice(0, 55)}…
                  </span>
                </div>
              );
            })}
          </div>

          <button
            style={{
              background: c.primary, color: '#fff', border: 'none',
              padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: fonts.sans, width: '100%',
            }}
            onClick={() => { update({ diagnosed: true }); navigate('dashboard'); }}
          >
            Enter the Lab →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: c.bg, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', fontFamily: fonts.sans,
    }}>
      <div style={{ width: '100%', maxWidth: 640, marginBottom: 12 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.textTertiary }}>
            Diagnostic · Question {current + 1} of {QUESTIONS.length}
          </span>
          <span style={{ fontSize: 13, color: c.textTertiary, fontFamily: fonts.mono }}>
            {answers.filter(a => a !== null).length} answered
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: c.borderSubtle, borderRadius: 2, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: c.primary, borderRadius: 2, transition: 'width 0.3s',
          }} />
        </div>
      </div>

      <div style={{
        background: c.surface, border: `1px solid ${c.border}`,
        borderRadius: 16, padding: '40px 44px', maxWidth: 640, width: '100%',
        boxShadow: shadow.lg,
      }}>
        <div style={{
          display: 'inline-block', background: c.primarySoft,
          border: `1px solid ${c.primaryBorder}`, borderRadius: 6,
          padding: '3px 10px', fontSize: 11, color: c.primary,
          fontWeight: 600, marginBottom: 18, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {['Threat Modeling', 'Elicitation', 'Benchmarks', 'CBRN Thresholds', 'Documentation', 'Governance'][current]}
        </div>

        <h2 style={{
          fontFamily: fonts.serif, fontSize: 20, fontWeight: 700,
          color: c.textPrimary, lineHeight: 1.4, marginBottom: 28,
        }}>
          {q.text}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {q.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === q.correct;
            let bg = c.elevated;
            let border = c.border;
            let textColor = c.textPrimary;

            if (revealed) {
              if (isCorrect) { bg = c.successSoft; border = c.successBorder; textColor = c.success; }
              else if (isSelected && !isCorrect) { bg = c.dangerSoft; border = c.dangerBorder; textColor = c.danger; }
            } else if (isSelected) {
              bg = c.primarySoft; border = c.primary;
            }

            return (
              <div
                key={i}
                onClick={() => selectAnswer(i)}
                style={{
                  background: bg, border: `2px solid ${border}`,
                  borderRadius: 10, padding: '14px 18px',
                  cursor: revealed ? 'default' : 'pointer',
                  color: textColor, fontSize: 14, lineHeight: 1.5,
                  transition: 'all 0.15s', fontWeight: isSelected || (revealed && isCorrect) ? 600 : 400,
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{
            background: selectedAnswer === q.correct ? c.successSoft : c.warningSoft,
            border: `1px solid ${selectedAnswer === q.correct ? c.successBorder : c.warningBorder}`,
            borderRadius: 10, padding: '14px 18px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: selectedAnswer === q.correct ? c.success : c.warning, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {selectedAnswer === q.correct ? 'Correct' : 'Incorrect'} — Explanation
            </div>
            <div style={{ fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{q.explanation}</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: c.textTertiary }}>
            {revealed ? 'Ready to continue' : 'Select an answer above'}
          </span>
          <button
            onClick={advance}
            disabled={!revealed}
            style={{
              background: revealed ? c.primary : c.border,
              color: revealed ? '#fff' : c.textTertiary,
              border: 'none', padding: '11px 24px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: revealed ? 'pointer' : 'default',
              fontFamily: fonts.sans, transition: 'all 0.15s',
            }}
          >
            {current < QUESTIONS.length - 1 ? 'Next question →' : 'See results →'}
          </button>
        </div>
      </div>
    </div>
  );
}
