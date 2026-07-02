import { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { type PageProps, C, fonts, shadow } from './types';

type Option = { text: string; correct: boolean };

function QuestionBlock({
  num, tag, question, context, options, submitted, chosen,
  onChoose, onSubmit, c,
}: {
  num: number; tag: string; question: string; context?: string;
  options: Option[]; submitted: boolean; chosen: number | null;
  onChoose: (i: number) => void; onSubmit: () => void;
  c: ReturnType<typeof C>;
}) {
  const tagColor = tag.includes('Scenario') ? c.violet : c.primary;
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: shadow.sm }}>
      {/* Question header */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: context ? 16 : 22 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${tagColor}18`, border: `1px solid ${tagColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, color: tagColor }}>{num}</span>
        </div>
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 8 }}>{tag}</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 600, color: c.textPrimary, lineHeight: 1.45 }}>{question}</div>
        </div>
      </div>

      {/* Scenario context */}
      {context && (
        <div style={{ background: c.elevated, border: `1px solid ${c.border}`, borderRadius: 10, padding: '13px 16px', marginBottom: 20 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, fontWeight: 600, marginBottom: 6 }}>SCENARIO CONTEXT</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.6 }}>{context}</div>
        </div>
      )}

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
        {options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = opt.correct;
          let bg = c.surface;
          let border = c.border;
          let textColor = c.textPrimary;
          if (submitted) {
            if (isCorrect) { bg = c.successSoft; border = c.success; }
            else if (isChosen && !isCorrect) { bg = c.dangerSoft; border = c.danger; }
            else { textColor = c.textTertiary; }
          } else if (isChosen) {
            bg = c.primarySoft; border = c.primary;
          }
          return (
            <div
              key={i}
              onClick={() => !submitted && onChoose(i)}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 16px', borderRadius: 10, background: bg, border: `2px solid ${border}`, cursor: submitted ? 'default' : 'pointer', transition: 'all 0.12s' }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${submitted && isCorrect ? c.success : submitted && isChosen && !isCorrect ? c.danger : isChosen ? c.primary : c.border}`, background: submitted && isCorrect ? c.success : submitted && isChosen && !isCorrect ? c.danger : isChosen ? c.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {submitted && isCorrect && <CheckCircle size={13} color="white" />}
                {submitted && isChosen && !isCorrect && <XCircle size={13} color="white" />}
                {!submitted && isChosen && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
              <span style={{ fontFamily: fonts.sans, fontSize: 14, color: textColor, lineHeight: 1.5 }}>
                <span style={{ fontFamily: fonts.mono, fontWeight: 700 }}>{'ABCD'[i]}.</span> {opt.text}
              </span>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={onSubmit}
          disabled={chosen === null}
          style={{ padding: '10px 24px', background: chosen !== null ? c.primary : c.elevated, color: chosen !== null ? 'white' : c.textTertiary, border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, cursor: chosen !== null ? 'pointer' : 'not-allowed' }}
        >Submit Answer</button>
      ) : (
        <div style={{ background: options[chosen!].correct ? c.successSoft : c.dangerSoft, border: `1px solid ${options[chosen!].correct ? c.successBorder : c.dangerBorder}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            {options[chosen!].correct
              ? <CheckCircle size={17} color={c.success} style={{ flexShrink: 0 }} />
              : <XCircle size={17} color={c.danger} style={{ flexShrink: 0 }} />}
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 6 }}>
                {options[chosen!].correct ? 'Correct!' : 'Incorrect — review the explanation below.'}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.65 }}>
                {num === 1
                  ? 'Scaffolded elicitation refers to a structured prompting method that provides the model with intermediate steps, contextual framing, tool access, and multiple attempts in order to maximise capability demonstration. It reveals the model\'s ceiling, not its average behaviour. [Source: FMF Capability Assessment Guidance, 2024]'
                  : 'The correct answer is C. Frontier evaluation requires converging evidence from automated benchmarks, expert human red teaming, and uplift studies. A single benchmark score — especially from automated prompts only — cannot account for scaffolded elicitation, multi-turn adversarial context, or deployment conditions. [NIST GenAI Profile, FMF Reports 2024]'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function QuizTemplatesPage({ dark }: PageProps) {
  const c = C(dark);
  const [q1Chosen, setQ1Chosen] = useState<number | null>(null);
  const [q1Submitted, setQ1Submitted] = useState(false);
  const [q2Chosen, setQ2Chosen] = useState<number | null>(null);
  const [q2Submitted, setQ2Submitted] = useState(false);

  const q1Options: Option[] = [
    { text: 'A model that refuses to answer any harmful question', correct: false },
    { text: 'A structured prompting method that maximises a model\'s apparent capability, used to produce the most demanding evidence for evaluation', correct: true },
    { text: 'A technique for reducing refusal rates in safety-trained models', correct: false },
    { text: 'An automated benchmark that tests models without human involvement', correct: false },
  ];

  const q2Options: Option[] = [
    { text: 'A model\'s benchmark score on HarmBench is the only evidence required to assess misuse risk', correct: false },
    { text: 'Single-score benchmarks are sufficient if run by an independent third party', correct: false },
    { text: 'Frontier evaluation requires multiple evidence types, including expert red-teaming, human uplift studies, and automated benchmarks', correct: true },
    { text: 'If a model passes the NIST AI RMF evaluation, no further testing is needed before deployment', correct: false },
  ];

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: fonts.sans }}>

      {/* Page header */}
      <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: '32px 64px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, letterSpacing: '0.1em', marginBottom: 8 }}>07 · QUIZ TEMPLATES</div>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Quiz Templates</h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 16, color: c.textSecondary, margin: 0 }}>Assessment layouts — Module C Knowledge Check</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 64px' }}>

        {/* Quiz header bar */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '18px 28px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: shadow.sm }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary, letterSpacing: '0.08em', marginBottom: 4 }}>MODULE C · KNOWLEDGE CHECK</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 600, color: c.textPrimary }}>Evaluation Science</div>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {[{ value: '8', label: 'QUESTIONS' }, { value: '12m', label: 'TIME LIMIT' }, { value: '70%', label: 'TO PASS' }].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, color: c.textPrimary }}>{stat.value}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 9, color: c.textTertiary, letterSpacing: '0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textSecondary }}>Question 1 of 8</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary }}>11:28 remaining</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < 1 ? c.primary : c.elevated }} />
            ))}
          </div>
        </div>

        {/* Question 1 */}
        <QuestionBlock
          num={1} tag="MULTIPLE CHOICE · 1 POINT"
          question="What is 'scaffolded elicitation' in the context of frontier model capability evaluation?"
          options={q1Options}
          submitted={q1Submitted} chosen={q1Chosen}
          onChoose={setQ1Chosen}
          onSubmit={() => q1Chosen !== null && setQ1Submitted(true)}
          c={c}
        />

        {/* Question 2 */}
        <QuestionBlock
          num={2} tag="SCENARIO-BASED · 2 POINTS"
          question="Which statement best reflects the 'single scores are weak evidence' mental model?"
          context="Lab Alpha publishes a pre-deployment evaluation showing their new frontier model scored 12% on HarmBench. They conclude the model is safe for unrestricted deployment. Their evaluation took 3 days and used only automated benchmark prompts with no human red-teaming."
          options={q2Options}
          submitted={q2Submitted} chosen={q2Chosen}
          onChoose={setQ2Chosen}
          onSubmit={() => q2Chosen !== null && setQ2Submitted(true)}
          c={c}
        />

        {/* Completion + Retry state examples */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginTop: 16 }}>

          {/* Completion */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', boxShadow: shadow.sm }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: c.successSoft, border: `2px solid ${c.successBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={26} color={c.success} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>Quiz Complete!</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 700, color: c.success }}>87.5%</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, marginTop: 4 }}>7 / 8 correct · Passed</div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ l: 'Time', v: '8m 34s' }, { l: 'Points', v: '14/16' }, { l: 'Streak', v: '3 days' }].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 700, color: c.textPrimary }}>{s.v}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '10px 20px', background: c.primary, color: 'white', border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Next Lesson →</button>
              <button style={{ padding: '10px 16px', background: 'none', color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer' }}>Review Answers</button>
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>COMPLETION STATE</div>
          </div>

          {/* Retry */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', boxShadow: shadow.sm }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: c.dangerSoft, border: `2px solid ${c.dangerBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={26} color={c.danger} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>Not passed</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 700, color: c.danger }}>50%</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, marginTop: 4 }}>4 / 8 correct · 70% required</div>
            </div>
            <div style={{ background: c.elevated, borderRadius: 10, padding: '12px 16px', width: '100%' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>Review Lesson 2 (Elicitation Strategies) and Lesson 3 (Metrics) before retrying.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '10px 20px', background: c.danger, color: 'white', border: 'none', borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Retry Quiz</button>
              <button style={{ padding: '10px 16px', background: 'none', color: c.textSecondary, border: `1px solid ${c.border}`, borderRadius: 10, fontFamily: fonts.sans, fontSize: 13, cursor: 'pointer' }}>Review Lessons</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < 2 ? c.danger : c.elevated }} />)}
              </div>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>2 / 3 attempts used</span>
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: c.textTertiary }}>RETRY STATE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
