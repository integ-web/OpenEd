import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps } from '../course-types';

type SourceType = 'Paper' | 'Tool' | 'Framework' | 'Dataset';

interface Source {
  id: string;
  title: string;
  type: SourceType;
  phases: string[];
  description: string;
  url: string;
}

const SOURCES: Source[] = [
  { id: 'S-001', title: 'HELM: Holistic Evaluation of Language Models', type: 'Paper', phases: ['P1', 'P2'], description: 'Broad benchmark covering accuracy, calibration, robustness, and efficiency across 30+ scenarios. Canonical reference for multi-dimension benchmark design.', url: 'https://crfm.stanford.edu/helm/' },
  { id: 'S-002', title: 'BIG-bench: Beyond the Imitation Game', type: 'Paper', phases: ['P1'], description: '204-task benchmark probing diverse capabilities; essential for saturation and contamination analysis in foundational evaluation work.', url: 'https://github.com/google/BIG-bench' },
  { id: 'S-003', title: 'Chatbot Arena / LMSYS', type: 'Tool', phases: ['P1'], description: 'Elo-based human preference ranking for frontier models via blind pairwise comparison. Reference for human-preference-based evaluation methodology.', url: 'https://chat.lmsys.org' },
  { id: 'S-004', title: 'GPQA Diamond', type: 'Dataset', phases: ['P1'], description: 'Expert-level graduate science questions. Useful for capability ceiling measurement and saturation detection in advanced reasoning evaluation.', url: 'https://github.com/idavidrein/gpqa' },
  { id: 'S-005', title: 'DeepEval', type: 'Tool', phases: ['P2'], description: 'Open-source LLM evaluation framework with RAG Triad, bias, and hallucination metrics. Primary harness tool for Phase 2 labs.', url: 'https://docs.confident-ai.com' },
  { id: 'S-006', title: 'promptfoo', type: 'Tool', phases: ['P2', 'P5'], description: 'CLI tool for automated prompt testing, red-teaming, and regression evaluation across model versions. Used in both harness and red-team phases.', url: 'https://www.promptfoo.dev' },
  { id: 'S-007', title: 'Inspect AI (AISI)', type: 'Tool', phases: ['P2', 'P5'], description: "UK AISI's open evaluation framework with dataset, solver, and scorer abstractions. Reference implementation for frontier safety evaluation harnesses.", url: 'https://inspect.ai-safety-institute.org.uk' },
  { id: 'S-008', title: 'SWE-bench', type: 'Dataset', phases: ['P3'], description: 'Software engineering benchmark using real GitHub issues requiring code fixes. Primary dataset for autonomous software agent evaluation.', url: 'https://www.swebench.com' },
  { id: 'S-009', title: 'OSWorld', type: 'Dataset', phases: ['P3'], description: 'Desktop computer tasks for evaluating GUI-capable agent models across real OS environments and applications.', url: 'https://os-world.github.io' },
  { id: 'S-010', title: 'GAIA Benchmark', type: 'Dataset', phases: ['P3'], description: 'Real-world web tasks requiring multi-step reasoning, tool use, and long-horizon planning. Tests agent capability in realistic settings.', url: 'https://huggingface.co/datasets/gaia-benchmark/GAIA' },
  { id: 'S-011', title: 'ARC-AGI-2', type: 'Dataset', phases: ['P4'], description: 'Novel pattern recognition tasks designed to resist memorization and test genuine reasoning under distribution shift.', url: 'https://arcprize.org' },
  { id: 'S-012', title: 'PHYBench', type: 'Dataset', phases: ['P4'], description: 'Physics reasoning benchmark requiring physical simulation reasoning and causal inference across diverse scenarios.', url: 'https://phybench-official.github.io' },
  { id: 'S-013', title: 'HarmBench', type: 'Dataset', phases: ['P5'], description: 'Standardized evaluation for harmful behaviors in LLMs across jailbreak, injection, and misuse attack categories.', url: 'https://www.harmbench.org' },
  { id: 'S-014', title: 'Garak', type: 'Tool', phases: ['P5'], description: 'LLM vulnerability scanner for probing jailbreaks, prompt injections, and harmful output generation. NVIDIA open-source red-team tool.', url: 'https://github.com/NVIDIA/garak' },
  { id: 'S-015', title: 'NIST AI RMF 1.0', type: 'Framework', phases: ['P1', 'P6'], description: 'Foundational risk management framework covering Govern, Map, Measure, and Manage functions. Reference vocabulary for evaluation-to-governance workflows.', url: 'https://airc.nist.gov/RMF' },
  { id: 'S-016', title: 'Anthropic Model Card (Claude 3)', type: 'Framework', phases: ['P1', 'P6'], description: 'Reference model card structure for capability reporting and safety case framing. Canonical example of transparent frontier model documentation.', url: 'https://www.anthropic.com/model-card' },
  { id: 'S-017', title: 'OpenAI Preparedness Framework', type: 'Framework', phases: ['P1', 'P5'], description: 'Defines capability evaluation tiers (low/medium/high/critical) and pre-deployment decision thresholds. Reference for capability-threshold governance logic.', url: 'https://openai.com/safety/preparedness' },
  { id: 'S-018', title: 'OpenTelemetry', type: 'Tool', phases: ['P6'], description: 'Open standard for distributed tracing, metrics, and logs. The foundation for production evaluation telemetry and drift monitoring.', url: 'https://opentelemetry.io' },
  { id: 'S-019', title: 'Prometheus / Grafana', type: 'Tool', phases: ['P6'], description: 'Metric collection and visualization for monitoring model latency, throughput, and regression signals in production environments.', url: 'https://prometheus.io' },
  { id: 'S-020', title: 'GitHub Actions', type: 'Tool', phases: ['P6'], description: 'CI/CD platform for automating evaluation harness runs triggered by model updates or scheduled regression checks.', url: 'https://docs.github.com/en/actions' },
];

const TYPE_COLORS: Record<SourceType, string> = {
  Paper: '#7C3AED',
  Tool: '#0F766E',
  Framework: '#1D4ED8',
  Dataset: '#B45309',
};

const PHASE_COLORS: Record<string, string> = {
  P1: '#1D4ED8', P2: '#0F766E', P3: '#7C3AED',
  P4: '#B45309', P5: '#B91C1C', P6: '#15803D',
};

export function SourcesScreen({ state }: ScreenProps) {
  const c = C(state.dark);
  const [typeFilter, setTypeFilter] = useState<SourceType | 'All'>('All');
  const [phaseFilter, setPhaseFilter] = useState('All');
  const blue = state.dark ? '#60A5FA' : '#1D4ED8';

  const types: Array<SourceType | 'All'> = ['All', 'Paper', 'Tool', 'Framework', 'Dataset'];
  const phases = ['All', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

  const filtered = SOURCES.filter(s => {
    if (typeFilter !== 'All' && s.type !== typeFilter) return false;
    if (phaseFilter !== 'All' && !s.phases.includes(phaseFilter)) return false;
    return true;
  });

  const filterBtn = (label: string, active: boolean, onClick: () => void, color?: string) => (
    <button key={label} onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 999,
      fontFamily: fonts.mono, fontSize: 11, fontWeight: 600,
      background: active ? (color ? `${color}18` : `${blue}18`) : c.elevated,
      color: active ? (color ?? blue) : c.textSecondary,
      border: active ? `1px solid ${color ?? blue}` : `1px solid ${c.border}`,
      cursor: 'pointer',
    }}>{label}</button>
  );

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1100, margin: '0 auto', fontFamily: fonts.sans }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Frontier Evaluation Lab</div>
        <h1 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: c.textPrimary, margin: '0 0 8px' }}>Source Library</h1>
        <p style={{ fontSize: 15, color: c.textSecondary, margin: 0 }}>{SOURCES.length} verified sources — papers, tools, frameworks, and datasets used across all 6 phases.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 10 }}>
        {types.map(t => filterBtn(t, typeFilter === t, () => setTypeFilter(t), t !== 'All' ? TYPE_COLORS[t as SourceType] : undefined))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 24 }}>
        {phases.map(p => filterBtn(p, phaseFilter === p, () => setPhaseFilter(p), p !== 'All' ? PHASE_COLORS[p] : undefined))}
      </div>

      <div style={{ fontFamily: fonts.mono, fontSize: 12, color: c.textTertiary, marginBottom: 16 }}>
        {filtered.length} source{filtered.length !== 1 ? 's' : ''}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: shadow.sm }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary, minWidth: 52, paddingTop: 2 }}>{s.id}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' as const }}>
                <span style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 600, color: c.textPrimary }}>{s.title}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: `${TYPE_COLORS[s.type]}18`, color: TYPE_COLORS[s.type], border: `1px solid ${TYPE_COLORS[s.type]}35` }}>{s.type}</span>
                {s.phases.map(p => (
                  <span key={p} style={{ fontFamily: fonts.mono, fontSize: 10, padding: '2px 6px', borderRadius: 999, background: `${PHASE_COLORS[p]}12`, color: PHASE_COLORS[p] }}>{p}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: c.textSecondary, margin: '0 0 8px', lineHeight: 1.55 }}>{s.description}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11, color: blue, textDecoration: 'none' }}>
                {s.url.replace('https://', '')} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
