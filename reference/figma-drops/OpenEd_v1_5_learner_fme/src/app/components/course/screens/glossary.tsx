import { useState } from 'react';
import { C, fonts, shadow, radii } from '../../fme/types';
import { type ScreenProps } from '../course-types';

const PHASE_COLORS: Record<string, string> = {
  P1: '#1D4ED8', P2: '#0F766E', P3: '#7C3AED',
  P4: '#B45309', P5: '#B91C1C', P6: '#15803D',
};

const TERMS = [
  { id: 'TERM-01', term: 'Evaluation objective', definition: 'A precise statement of what capability or behavior a test is designed to measure, linked to a specific risk claim and deployment decision.', phases: ['P1'] },
  { id: 'TERM-02', term: 'Outcome metric', definition: 'A measurement of what a model achieves — accuracy, pass rate, uplift score — not how it got there. Outcome metrics are the primary currency of evaluation evidence.', phases: ['P1'] },
  { id: 'TERM-03', term: 'Trajectory metric', definition: 'A measurement of how a model solves a problem: steps taken, tools used, retries. Especially important for autonomous agent evaluation.', phases: ['P1', 'P3'] },
  { id: 'TERM-04', term: 'Harness', definition: 'The software infrastructure that runs evaluation tasks, collects outputs, applies scoring, and stores results in a reproducible, auditable format.', phases: ['P2'] },
  { id: 'TERM-05', term: 'Golden dataset', definition: 'A curated set of ground-truth examples held out from training, used to calibrate and validate automated scoring and to detect contamination.', phases: ['P2'] },
  { id: 'TERM-06', term: 'LLM-as-judge', definition: 'Using a language model to score or compare model outputs. Requires calibration controls to reduce self-deception, self-preference bias, and systematic scoring errors.', phases: ['P2'] },
  { id: 'TERM-07', term: 'RAG Triad', definition: 'Three quality dimensions for retrieval-augmented generation systems: Context Relevance, Groundedness (factual fidelity), and Answer Relevance.', phases: ['P2'] },
  { id: 'TERM-08', term: 'Benchmark saturation', definition: 'The state where a benchmark no longer distinguishes between top models because scores cluster near the ceiling. Saturated benchmarks stop being decision-useful.', phases: ['P1'] },
  { id: 'TERM-09', term: 'Contamination', definition: 'The presence of evaluation test content in training or fine-tuning data. Contamination inflates benchmark scores beyond what true generalization would produce.', phases: ['P1', 'P3'] },
  { id: 'TERM-10', term: 'Elicitation', definition: 'The process of prompting, scaffolding, or tooling a model to reveal its actual capability on a task, not just its default response behavior.', phases: ['P1', 'P2'] },
  { id: 'TERM-11', term: 'Sandbagging', definition: 'A model strategically underperforming on evaluation tasks to appear less capable than it is — potentially to avoid triggering safety controls or governance escalations.', phases: ['P5'] },
  { id: 'TERM-12', term: 'Evidence card', definition: 'A traceable, structured record of one evaluation finding, including provenance, confidence level, grading method, and relevance to a specific governance decision.', phases: ['P6'] },
  { id: 'TERM-13', term: 'Threshold memo', definition: 'A formal document stating what evidence level is required before a deployment decision can be made, and who is accountable for that judgment call.', phases: ['P6'] },
  { id: 'TERM-14', term: 'Deployment gate', definition: 'A set of verifiable criteria that must be met before a model can proceed to the next stage of release or production deployment.', phases: ['P6'] },
  { id: 'TERM-15', term: 'Uplift', definition: "How much a model improves an actor's success rate or reduces effort on a task compared to not using the model. The key variable in dangerous-capability assessment.", phases: ['P1', 'P5'] },
  { id: 'TERM-16', term: 'Residual risk', definition: 'The risk that remains after all mitigations are applied. The actual decision variable for deployment review — not raw capability scores alone.', phases: ['P6'] },
];

export function GlossaryScreen({ state }: ScreenProps) {
  const c = C(state.dark);
  const [query, setQuery] = useState('');

  const filtered = TERMS.filter(t =>
    !query ||
    t.term.toLowerCase().includes(query.toLowerCase()) ||
    t.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1100, margin: '0 auto', fontFamily: fonts.sans }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: state.dark ? '#60A5FA' : '#1D4ED8', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
          Frontier Evaluation Lab
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Glossary</h1>
        <p style={{ fontSize: 15, color: c.textSecondary, margin: 0 }}>{TERMS.length} key terms from frontier model evaluation practice.</p>
      </div>

      <input
        type="text"
        placeholder="Search terms and definitions..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: '100%', maxWidth: 480, padding: '10px 16px',
          background: c.elevated, border: `1px solid ${c.border}`,
          borderRadius: 10, color: c.textPrimary,
          fontFamily: fonts.sans, fontSize: 15, outline: 'none', marginBottom: 32,
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
        {filtered.map(t => (
          <div key={t.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px 22px', boxShadow: shadow.sm }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{t.id}</span>
              {t.phases.map(p => (
                <span key={p} style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: `${PHASE_COLORS[p]}18`, color: PHASE_COLORS[p], border: `1px solid ${PHASE_COLORS[p]}35` }}>{p}</span>
              ))}
            </div>
            <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, color: c.textPrimary, margin: '0 0 8px' }}>{t.term}</p>
            <p style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.65, margin: 0 }}>{t.definition}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: c.textTertiary, fontFamily: fonts.mono, fontSize: 13 }}>
          No terms match "{query}"
        </div>
      )}
    </div>
  );
}
