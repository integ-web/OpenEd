import { useState } from 'react';
import { C, fonts, shadow } from '../../fme/types';
import { type ScreenProps, type EvidenceCard, type EvidenceType, type Confidence } from '../course-types';
import { Plus, ChevronDown, ChevronUp, Library } from 'lucide-react';

const DOMAINS = ['CBRN', 'Cyber', 'Autonomy', 'Deception', 'Persuasion', 'General'];
const TYPES: EvidenceType[] = ['Positive', 'Negative', 'Threshold', 'Mitigating'];
const CONFIDENCES: Confidence[] = ['High', 'Medium', 'Low'];

const TYPE_COLORS = (c: ReturnType<typeof C>) => ({
  Positive:   { bg: c.successSoft,  border: c.successBorder,  text: c.success  },
  Negative:   { bg: c.dangerSoft,   border: c.dangerBorder,   text: c.danger   },
  Threshold:  { bg: c.warningSoft,  border: c.warningBorder,  text: c.warning  },
  Mitigating: { bg: c.tealSoft,     border: c.tealBorder,     text: c.teal     },
});

const CONFIDENCE_DOT = (c: ReturnType<typeof C>) => ({
  High:   c.success,
  Medium: c.warning,
  Low:    c.danger,
});

const EMPTY_CARD: Partial<EvidenceCard> = {
  title: '',
  domain: 'CBRN',
  type: 'Positive',
  confidence: 'High',
  summary: '',
  source: '',
  date: new Date().toISOString().split('T')[0],
};

export function EvidenceLibraryScreen({ state, navigate: _navigate, update }: ScreenProps) {
  const c = C(state.dark);
  const tc = TYPE_COLORS(c);
  const dc = CONFIDENCE_DOT(c);

  const [filter, setFilter] = useState<'all' | EvidenceType>('all');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | Confidence>('all');
  const [creating, setCreating] = useState(false);
  const [newCard, setNewCard] = useState<Partial<EvidenceCard>>(EMPTY_CARD);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = state.evidenceCards.filter(card => {
    if (filter !== 'all' && card.type !== filter) return false;
    if (confidenceFilter !== 'all' && card.confidence !== confidenceFilter) return false;
    return true;
  });

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  };

  const addCard = () => {
    if (!newCard.title?.trim() || !newCard.summary?.trim()) return;
    const card: EvidenceCard = {
      id: `EVD-${String(state.evidenceCards.length + 1).padStart(3, '0')}`,
      title: newCard.title!,
      domain: newCard.domain || 'General',
      type: newCard.type as EvidenceType || 'Positive',
      confidence: newCard.confidence as Confidence || 'Medium',
      summary: newCard.summary!,
      source: newCard.source || 'Manual entry',
      date: newCard.date || new Date().toISOString().split('T')[0],
    };
    update({ evidenceCards: [...state.evidenceCards, card] });
    setNewCard(EMPTY_CARD);
    setCreating(false);
  };

  // Domain coverage counts
  const domainCounts = DOMAINS.map(d => ({
    domain: d,
    count: state.evidenceCards.filter(e => e.domain === d).length,
  }));
  const maxCount = Math.max(...domainCounts.map(d => d.count), 1);

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

  const radioGroupStyle = (selected: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    borderRadius: 8,
    border: `1.5px solid ${selected ? c.primary : c.border}`,
    background: selected ? c.primarySoft : c.elevated,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: selected ? 600 : 400,
    color: selected ? c.primary : c.textSecondary,
  });

  return (
    <div style={{ fontFamily: fonts.sans, background: c.bg, minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Library size={20} color={c.teal} />
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.textPrimary }}>Evidence Library</h1>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: c.textSecondary }}>
              {state.evidenceCards.length} evidence item{state.evidenceCards.length !== 1 ? 's' : ''} collected
            </p>
          </div>
          <button
            onClick={() => setCreating(!creating)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 8, border: 'none', background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            <Plus size={16} /> New Evidence Card
          </button>
        </div>

        {/* Domain coverage chart */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 20, marginBottom: 24, boxShadow: shadow.sm }}>
          <p style={{ margin: '0 0 14px', fontWeight: 600, fontSize: 13, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Evidence Coverage by Domain</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {domainCounts.map(({ domain, count }) => (
              <div key={domain} style={{ textAlign: 'center' }}>
                <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
                  <div style={{ width: 28, borderRadius: '4px 4px 0 0', background: count > 0 ? c.teal : c.elevated, height: `${Math.max((count / maxCount) * 100, 8)}%`, transition: 'height 0.3s', opacity: count > 0 ? 1 : 0.4 }} />
                </div>
                <p style={{ margin: '0 0 2px', fontSize: 11, color: c.textTertiary }}>{domain}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: count > 0 ? c.teal : c.textTertiary }}>{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {(['all', ...TYPES] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${filter === t ? c.primary : c.border}`, background: filter === t ? c.primarySoft : 'transparent', color: filter === t ? c.primary : c.textSecondary, fontSize: 13, fontWeight: filter === t ? 600 : 400, cursor: 'pointer' }}
            >
              {t === 'all' ? 'All types' : t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {(['all', ...CONFIDENCES] as const).map(conf => {
            const dotColor = conf === 'all' ? c.textTertiary : dc[conf];
            return (
              <button
                key={conf}
                onClick={() => setConfidenceFilter(conf)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, border: `1.5px solid ${confidenceFilter === conf ? c.primary : c.border}`, background: confidenceFilter === conf ? c.primarySoft : 'transparent', color: confidenceFilter === conf ? c.primary : c.textSecondary, fontSize: 12, fontWeight: confidenceFilter === conf ? 600 : 400, cursor: 'pointer' }}
              >
                {conf !== 'all' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />}
                {conf === 'all' ? 'All confidence' : `${conf} confidence`}
              </button>
            );
          })}
        </div>

        {/* New card form */}
        {creating && (
          <div style={{ background: c.surface, border: `1.5px solid ${c.primaryBorder}`, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: shadow.md }}>
            <p style={{ margin: '0 0 18px', fontWeight: 700, fontSize: 15, color: c.textPrimary }}>New Evidence Card</p>
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                <input value={newCard.title || ''} onChange={e => setNewCard({ ...newCard, title: e.target.value })} placeholder="Short descriptive title for this evidence item" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Domain</label>
                  <select value={newCard.domain || 'CBRN'} onChange={e => setNewCard({ ...newCard, domain: e.target.value })} style={{ ...inputStyle }}>
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</label>
                  <input value={newCard.source || ''} onChange={e => setNewCard({ ...newCard, source: e.target.value })} placeholder="Module, lab, or reference" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Evidence Type</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TYPES.map(t => (
                    <label key={t} style={radioGroupStyle(newCard.type === t)}>
                      <input type="radio" name="type" value={t} checked={newCard.type === t} onChange={() => setNewCard({ ...newCard, type: t })} style={{ display: 'none' }} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {CONFIDENCES.map(conf => (
                    <label key={conf} style={{ ...radioGroupStyle(newCard.confidence === conf), gap: 8 }}>
                      <input type="radio" name="confidence" value={conf} checked={newCard.confidence === conf} onChange={() => setNewCard({ ...newCard, confidence: conf })} style={{ display: 'none' }} />
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dc[conf], display: 'inline-block' }} />
                      {conf}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summary</label>
                <textarea
                  value={newCard.summary || ''}
                  onChange={e => setNewCard({ ...newCard, summary: e.target.value })}
                  placeholder="Describe what this evidence item demonstrates, under what conditions, and why it matters..."
                  style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button
                onClick={addCard}
                disabled={!newCard.title?.trim() || !newCard.summary?.trim()}
                style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: newCard.title?.trim() && newCard.summary?.trim() ? c.primary : c.elevated, color: newCard.title?.trim() && newCard.summary?.trim() ? '#fff' : c.textTertiary, fontSize: 14, fontWeight: 600, cursor: newCard.title?.trim() && newCard.summary?.trim() ? 'pointer' : 'not-allowed' }}
              >
                Add to Library
              </button>
              <button
                onClick={() => { setCreating(false); setNewCard(EMPTY_CARD); }}
                style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSecondary, fontSize: 14, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Evidence grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: c.textTertiary }}>
            <Library size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: 15 }}>No evidence cards match these filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {filtered.map(card => {
              const colors = tc[card.type];
              const isExpanded = expanded.has(card.id);
              return (
                <div key={card.id} style={{ background: c.surface, border: `1.5px solid ${c.border}`, borderRadius: 10, padding: 20, boxShadow: shadow.sm, transition: 'box-shadow 0.15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.teal, fontWeight: 600 }}>{card.id}</span>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: c.elevated, border: `1px solid ${c.border}`, color: c.textSecondary }}>{card.domain}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}>{card.type}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: c.textTertiary }}>
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: dc[card.confidence], display: 'inline-block' }} />
                          {card.confidence}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 14, color: c.textPrimary }}>{card.title}</p>
                      <p style={{ margin: '0 0 8px', fontSize: 13, color: c.textSecondary, lineHeight: 1.65, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: isExpanded ? 'none' : 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
                        {card.summary}
                      </p>
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{card.source}</span>
                        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.textTertiary }}>{card.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpand(card.id)}
                      style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: c.textTertiary, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}
                    >
                      {isExpanded ? <><ChevronUp size={13} /> Collapse</> : <><ChevronDown size={13} /> Expand</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
