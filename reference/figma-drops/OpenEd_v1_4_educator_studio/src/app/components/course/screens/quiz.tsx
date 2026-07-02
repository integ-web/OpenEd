import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';
import { CheckCircle, XCircle, ChevronRight, BookOpen, Trophy, Save } from 'lucide-react';

const QUESTIONS = [
  {
    text: 'What is the primary purpose of specifying an evaluation objective before designing benchmark tasks?',
    options: [
      'To save time during evaluation',
      'To ensure the benchmark tests the right thing by grounding it in a specific risk question',
      'To satisfy compliance requirements',
      'To make scoring easier for non-expert graders',
    ],
    correct: 1,
    explanation: 'An evaluation objective grounds the benchmark in a specific risk question. Without this, tasks may measure the wrong capability or proxy for the wrong harm pathway — producing evidence that looks rigorous but answers a different question than the one that matters.',
  },
  {
    text: "You're evaluating a model's CBRN uplift potential. Which elicitation approach produces the most externally valid evidence?",
    options: [
      'Naive single-turn prompts with standard phrasing',
      'Best-of-k sampling with randomized seeds',
      'Expert-scaffolded multi-turn elicitation with domain specialist adjudication',
      'Automated refusal rate measurement across prompt variants',
    ],
    correct: 2,
    explanation: 'Expert-scaffolded elicitation with domain specialist adjudication best approximates the conditions under which a capable threat actor would use the model. Naive prompts underestimate capability; automated refusal rates conflate unhelpfulness with safety.',
  },
  {
    text: 'A benchmark shows a model scored 94%. Why might this result be misleading?',
    options: [
      'The score is too high to be statistically credible',
      'The benchmark may have saturated — most frontier models now exceed this threshold, so it no longer discriminates capability levels',
      'The model probably saw training data contamination',
      '94% is the minimum passing score for this benchmark class',
    ],
    correct: 1,
    explanation: 'Benchmark saturation means the task no longer differentiates between frontier model capability levels. When all leading models score above 90%, a 94% result tells you nothing about relative risk or capability advancement. A saturated benchmark should be retired or replaced with harder tasks.',
  },
  {
    text: "Which of these best defines 'adjudication' in the context of evaluation?",
    options: [
      'Arguing about evaluation results with the deployment team',
      'The scoring process using rubrics, human judges, model graders, or execution-based oracles to determine whether a model output passes',
      'A legal process for challenging evaluation findings with a regulator',
      'Choosing which benchmarks to run based on the risk domain',
    ],
    correct: 1,
    explanation: 'Adjudication is the process of deciding whether a model output meets the evaluation criterion. It can be done via rubric-guided human judgment, LLM-as-judge, execution-based oracles (e.g., does code run correctly?), or hybrid pipelines. The choice of adjudication method significantly affects result reliability.',
  },
  {
    text: 'A model performs poorly on a benchmark under naive prompting but significantly better under scaffolded elicitation. What does this finding tell you?',
    options: [
      'The model is inconsistent and its capability level is undefined',
      'The naive prompting result represents the true capability ceiling',
      'Elicitation sensitivity is high — the evaluation protocol materially changes the measured capability level',
      'The benchmark is contaminated and should be discarded',
    ],
    correct: 2,
    explanation: 'High elicitation sensitivity means that protocol design — not just model capability — determines what the evaluation finds. This is a key validity concern: if different protocols produce different conclusions, the protocol must be specified precisely and evaluated teams must use the same standard.',
  },
  {
    text: 'An evaluator runs 10 trials and finds the model passes 3/10. Their colleague runs 5 trials and finds 4/5 passes. Both claim different capability levels. What is the most likely explanation?',
    options: [
      'One evaluator made systematic errors in scoring',
      'Different elicitation protocols, sampling budgets, or acceptance thresholds — this is expected and demonstrates why protocol standardisation matters',
      'The model is non-deterministic and results are therefore meaningless',
      "The colleague is wrong because 10 trials is a larger and more reliable sample",
    ],
    correct: 1,
    explanation: 'Divergent results between evaluators almost always reflect protocol differences: different scaffolding, different acceptance criteria, different sampling temperatures, or different adjudication rubrics. This is expected and highlights why evaluation protocols must be standardised and documented before data collection begins.',
  },
];

export function QuizScreen({ state, navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = QUESTIONS[current];
  const answered = answers[current];
  const allAnswered = answers.every(a => a !== null);
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const passed = score >= 4;

  const selectAnswer = (idx: number) => {
    if (submitted) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCurrent(0);
    update({ quizMastery: Math.round((score / 6) * 100) });
  };

  const segmentColor = (i: number) => {
    if (answers[i] === null) return c.border;
    if (submitted) return answers[i] === QUESTIONS[i].correct ? c.success : c.danger;
    return c.primary;
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Score header */}
          <div style={{ background: passed ? c.successSoft : c.dangerSoft, border: `2px solid ${passed ? c.successBorder : c.dangerBorder}`, borderRadius: 14, padding: 28, marginBottom: 28, textAlign: 'center', boxShadow: shadow.md }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <Trophy size={36} color={passed ? c.success : c.danger} />
            </div>
            <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: c.textPrimary }}>
              {score} / 6 correct
            </h2>
            <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: passed ? c.success : c.danger }}>
              {passed ? 'PASSED — Module C Knowledge Check' : 'NOT PASSED — Review and retry'}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: c.textSecondary }}>
              {passed ? `Strong grasp of evaluation science fundamentals. Score: ${Math.round((score / 6) * 100)}%` : `You need 4/6 to pass. Score: ${Math.round((score / 6) * 100)}% — review the explanations below.`}
            </p>
          </div>

          {/* Per-question breakdown */}
          <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
            {QUESTIONS.map((q, i) => {
              const correct = answers[i] === q.correct;
              return (
                <div key={i} style={{ background: c.surface, border: `1.5px solid ${correct ? c.successBorder : c.dangerBorder}`, borderRadius: 10, padding: 18, boxShadow: shadow.sm }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      {correct
                        ? <CheckCircle size={18} color={c.success} />
                        : <XCircle size={18} color={c.danger} />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>Q{i + 1}: {q.text}</p>
                      <p style={{ margin: '0 0 4px', fontSize: 13, color: correct ? c.success : c.danger }}>
                        Your answer: {q.options[answers[i]!]}
                      </p>
                      {!correct && (
                        <p style={{ margin: '0 0 8px', fontSize: 13, color: c.success }}>
                          Correct: {q.options[q.correct]}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: 13, color: c.textSecondary, lineHeight: 1.65, background: c.elevated, borderRadius: 6, padding: '10px 12px' }}>
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                update({ artifactsCreated: [...state.artifactsCreated, `Module C Quiz — ${Math.round((score / 6) * 100)}% — ${new Date().toLocaleDateString()}`] });
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1.5px solid ${c.tealBorder}`, background: c.tealSoft, color: c.teal, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              <Save size={15} /> Save to Portfolio
            </button>
            <button
              onClick={() => navigate('lesson')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Continue to Lesson 4 <ChevronRight size={15} />
            </button>
            {!passed && (
              <button
                onClick={() => { setAnswers(Array(6).fill(null)); setSubmitted(false); setCurrent(0); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: `1.5px solid ${c.border}`, background: c.elevated, color: c.textSecondary, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Retry quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Quiz header */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 22px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, boxShadow: shadow.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={18} color={c.teal} />
            <span style={{ fontWeight: 700, fontSize: 15, color: c.textPrimary }}>Module C Knowledge Check</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: '6 questions', icon: null },
              { label: '12 min', icon: null },
              { label: '70% to pass', icon: null },
            ].map(item => (
              <span key={item.label} style={{ fontSize: 13, color: c.textSecondary }}>{item.label}</span>
            ))}
          </div>
        </div>

        {/* Progress segments */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              onClick={() => { if (answers[i] !== null || i <= current) setCurrent(i); }}
              style={{ flex: 1, height: 6, borderRadius: 3, background: i === current ? c.primary : segmentColor(i), cursor: 'pointer', transition: 'background 0.2s', opacity: i > current && answers[i] === null ? 0.35 : 1 }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}>Question {current + 1} of {QUESTIONS.length}</span>
          <span style={{ fontSize: 12, color: c.textTertiary }}>{answers.filter(a => a !== null).length} answered</span>
        </div>

        {/* Question card */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: shadow.md }}>
          <p style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 600, color: c.textPrimary, lineHeight: 1.6 }}>{q.text}</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {q.options.map((opt, idx) => {
              const isSelected = answered === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 18px',
                    borderRadius: 8,
                    border: `1.5px solid ${isSelected ? c.primary : c.border}`,
                    background: isSelected ? c.primarySoft : c.elevated,
                    color: c.textPrimary,
                    fontSize: 14,
                    fontFamily: fonts.sans,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${isSelected ? c.primary : c.border}`, background: isSelected ? c.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: isSelected ? '#fff' : c.textTertiary }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation toggle */}
        {answered !== null && (
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 13, cursor: 'pointer' }}
            >
              {showExplanation ? 'Hide' : 'Show'} explanation
            </button>
            {showExplanation && (
              <div style={{ marginTop: 10, background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 8, padding: 16, fontSize: 13, color: c.textSecondary, lineHeight: 1.7 }}>
                <strong style={{ color: c.textPrimary }}>Correct answer: {q.options[q.correct]}</strong>
                <br /><br />
                {q.explanation}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => { if (current > 0) { setCurrent(current - 1); setShowExplanation(false); } }}
            disabled={current === 0}
            style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: current === 0 ? c.textTertiary : c.textSecondary, fontSize: 14, cursor: current === 0 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            {current < QUESTIONS.length - 1 ? (
              <button
                onClick={() => { setCurrent(current + 1); setShowExplanation(false); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 8, border: 'none', background: allAnswered ? c.success : c.elevated, color: allAnswered ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: allAnswered ? 'pointer' : 'not-allowed' }}
              >
                Submit quiz <CheckCircle size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
