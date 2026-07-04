import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  PATHWAY_CARDS,
  SLOT_CONFIG,
  ACTORS,
  type Pathway,
  type CardItem,
  type SlotKey,
} from "../sim-data";

interface Props {
  selectedActors: string[];
  pathways: Pathway[];
  onChange: (pathways: Pathway[]) => void;
  onNext: () => void;
}

function createEmptyPathway(): Pathway {
  return {
    id: `pathway-${Date.now()}-${Math.random()}`,
    slots: {
      actor: null,
      access: null,
      capability: null,
      task: null,
      harm: null,
      mitigation: null,
      evaluation: null,
    },
  };
}

interface DraggableCardProps {
  item: CardItem;
  onClickSelect?: (item: CardItem) => void;
  isSelected?: boolean;
}

function DraggableCard({ item, onClickSelect, isSelected }: DraggableCardProps) {
  const slotCfg = SLOT_CONFIG.find((s) => s.key === item.category);
  const color = slotCfg?.color || "#94a3b8";

  const [{ isDragging }, drag] = useDrag({
    type: item.category,
    item: () => item,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      onClick={() => onClickSelect?.(item)}
      className="rounded px-2 py-1.5 cursor-grab active:cursor-grabbing transition-all select-none"
      style={{
        opacity: isDragging ? 0.4 : 1,
        background: isSelected ? `${color}25` : "var(--muted)",
        border: `1px solid ${isSelected ? `${color}60` : "var(--border)"}`,
        fontSize: "11px",
        color: "var(--foreground)",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {item.label}
    </div>
  );
}

interface SlotDropZoneProps {
  slotKey: SlotKey;
  value: CardItem | null;
  onDrop: (item: CardItem) => void;
  onClear: () => void;
  color: string;
  label: string;
  description: string;
  pendingCard: CardItem | null;
  onPendingDrop: () => void;
}

function SlotDropZone({ slotKey, value, onDrop, onClear, color, label, description, pendingCard, onPendingDrop }: SlotDropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: slotKey,
    drop: (item: CardItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const hasPending = pendingCard && pendingCard.category === slotKey;

  return (
    <div
      ref={drop}
      className="rounded transition-all"
      style={{
        minHeight: "64px",
        background: isOver && canDrop ? `${color}20` : value ? `${color}0d` : "var(--muted)",
        border: `1px ${value ? "solid" : "dashed"} ${isOver && canDrop ? color : value ? `${color}50` : hasPending ? `${color}70` : "var(--border)"}`,
        padding: "8px",
      }}
      onClick={() => {
        if (hasPending) onPendingDrop();
      }}
    >
      <div className="font-mono mb-1" style={{ fontSize: "9px", letterSpacing: "0.08em", color }}>
        {label.toUpperCase()}
      </div>
      {value ? (
        <div className="flex items-start justify-between gap-1">
          <span style={{ fontSize: "11px", color: "var(--foreground)", lineHeight: 1.4 }}>{value.label}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="shrink-0 rounded transition-all"
            style={{ color: "var(--muted-foreground)", fontSize: "14px", lineHeight: 1, padding: "0 2px" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            ×
          </button>
        </div>
      ) : hasPending ? (
        <div className="text-center" style={{ fontSize: "10px", color: `${color}90` }}>
          Click to place "{pendingCard.label}"
        </div>
      ) : (
        <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>
          {isOver && canDrop ? "Drop here" : description}
        </div>
      )}
    </div>
  );
}

export function Screen4Pathway({ selectedActors, pathways, onChange, onNext }: Props) {
  const [activePathwayIdx, setActivePathwayIdx] = useState(0);
  const [pendingCard, setPendingCard] = useState<CardItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<SlotKey>("access");

  const actorCards: CardItem[] = ACTORS.filter((a) => selectedActors.includes(a.id)).map((a) => ({
    id: a.id,
    label: a.label,
    category: "actor" as SlotKey,
  }));

  const allCards = [
    ...actorCards,
    ...PATHWAY_CARDS.filter((c) => c.category !== "actor"),
  ];

  const cardsByCategory = SLOT_CONFIG.reduce<Record<string, CardItem[]>>((acc, slot) => {
    acc[slot.key] = allCards.filter((c) => c.category === slot.key);
    return acc;
  }, {});

  const handleDrop = (pathwayIdx: number, slotKey: SlotKey, item: CardItem) => {
    const updated = pathways.map((p, i) =>
      i === pathwayIdx ? { ...p, slots: { ...p.slots, [slotKey]: item } } : p
    );
    onChange(updated);
    setPendingCard(null);
  };

  const handleClear = (pathwayIdx: number, slotKey: SlotKey) => {
    const updated = pathways.map((p, i) =>
      i === pathwayIdx ? { ...p, slots: { ...p.slots, [slotKey]: null } } : p
    );
    onChange(updated);
  };

  const handleCardClick = (item: CardItem) => {
    if (pendingCard?.id === item.id) {
      setPendingCard(null);
    } else {
      setPendingCard(item);
      setActiveCategory(item.category as SlotKey);
    }
  };

  const addPathway = () => {
    const updated = [...pathways, createEmptyPathway()];
    onChange(updated);
    setActivePathwayIdx(updated.length - 1);
  };

  const removePathway = (idx: number) => {
    if (pathways.length <= 1) return;
    const updated = pathways.filter((_, i) => i !== idx);
    onChange(updated);
    setActivePathwayIdx(Math.max(0, idx - 1));
  };

  const activePathway = pathways[activePathwayIdx] || null;

  const completedSlots = activePathway
    ? Object.values(activePathway.slots).filter(Boolean).length
    : 0;

  const canProceed = pathways.some((p) => Object.values(p.slots).filter(Boolean).length >= 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
          STEP 4 OF 7 // HARM PATHWAY BUILDER
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "6px" }}>
          Build harm pathways
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "13px" }}>
          Drag cards from the palette into the pathway slots — or click a card then click a slot to place it. Build at least one pathway with 4+ slots filled.
        </p>
      </div>

      <div className="flex gap-4">
        {/* Card Palette */}
        <div className="w-48 shrink-0">
          <div
            className="rounded-lg p-3 sticky"
            style={{ top: "120px", background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="font-mono text-xs mb-3 tracking-widest" style={{ color: "var(--muted-foreground)" }}>
              CARD PALETTE
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 mb-3">
              {SLOT_CONFIG.map((slot) => (
                <button
                  key={slot.key}
                  onClick={() => setActiveCategory(slot.key)}
                  className="font-mono rounded px-1.5 py-0.5 transition-all"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    background: activeCategory === slot.key ? slot.color + "30" : "var(--muted)",
                    color: activeCategory === slot.key ? slot.color : "var(--muted-foreground)",
                    border: `1px solid ${activeCategory === slot.key ? slot.color + "60" : "var(--border)"}`,
                  }}
                >
                  {slot.label.slice(0, 6).toUpperCase()}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
              {(cardsByCategory[activeCategory] || []).map((card) => (
                <DraggableCard
                  key={card.id}
                  item={card}
                  onClickSelect={handleCardClick}
                  isSelected={pendingCard?.id === card.id}
                />
              ))}
            </div>

            {pendingCard && (
              <div
                className="mt-3 rounded p-2"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", fontSize: "10px", color: "#f59e0b" }}
              >
                Selected: <strong>{pendingCard.label}</strong>
                <br />
                Click a {pendingCard.category} slot to place it.
              </div>
            )}
          </div>
        </div>

        {/* Pathways */}
        <div className="flex-1 min-w-0">
          {/* Pathway tabs */}
          <div className="flex items-center gap-2 mb-4">
            {pathways.map((p, i) => {
              const filled = Object.values(p.slots).filter(Boolean).length;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePathwayIdx(i)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs transition-all"
                  style={{
                    background: i === activePathwayIdx ? "var(--primary)" : "var(--muted)",
                    color: i === activePathwayIdx ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    fontSize: "11px",
                  }}
                >
                  <span>Pathway {i + 1}</span>
                  <span
                    className="rounded-full w-4 h-4 flex items-center justify-center"
                    style={{
                      background: i === activePathwayIdx ? "rgba(0,0,0,0.2)" : "var(--secondary)",
                      fontSize: "9px",
                    }}
                  >
                    {filled}
                  </span>
                </button>
              );
            })}
            {pathways.length < 5 && (
              <button
                onClick={addPathway}
                className="px-3 py-1.5 rounded font-mono text-xs transition-all"
                style={{
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                  border: "1px dashed var(--border)",
                  fontSize: "11px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                + Add Pathway
              </button>
            )}
            {pathways.length > 1 && (
              <button
                onClick={() => removePathway(activePathwayIdx)}
                className="ml-auto px-2 py-1 rounded font-mono text-xs transition-all"
                style={{ color: "#ef4444", fontSize: "11px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Remove
              </button>
            )}
          </div>

          {activePathway ? (
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              {/* Pathway header */}
              <div className="px-4 py-3 flex items-center justify-between" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
                <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  PATHWAY {activePathwayIdx + 1}
                </span>
                <span className="font-mono text-xs" style={{ color: completedSlots >= 5 ? "#22c55e" : "var(--muted-foreground)" }}>
                  {completedSlots}/7 slots filled
                  {completedSlots >= 4 && " ✓"}
                </span>
              </div>

              {/* Pathway flow - arrow chain */}
              <div className="p-4" style={{ background: "var(--secondary)" }}>
                <div className="grid grid-cols-7 gap-2">
                  {SLOT_CONFIG.map((slot, idx) => (
                    <div key={slot.key} className="flex items-start gap-0">
                      <div className="flex-1 min-w-0">
                        <SlotDropZone
                          slotKey={slot.key}
                          value={activePathway.slots[slot.key]}
                          onDrop={(item) => handleDrop(activePathwayIdx, slot.key, item)}
                          onClear={() => handleClear(activePathwayIdx, slot.key)}
                          color={slot.color}
                          label={slot.label}
                          description={slot.description}
                          pendingCard={pendingCard}
                          onPendingDrop={() => {
                            if (pendingCard && pendingCard.category === slot.key) {
                              handleDrop(activePathwayIdx, slot.key, pendingCard);
                            }
                          }}
                        />
                      </div>
                      {idx < SLOT_CONFIG.length - 1 && (
                        <div className="flex items-center justify-center w-4 shrink-0 mt-6">
                          <span style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>→</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pathway summary text */}
              {completedSlots >= 3 && (
                <div className="px-4 py-3" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
                  <div className="font-mono text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>NARRATIVE SUMMARY</div>
                  <p style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.7 }}>
                    {activePathway.slots.actor && <><strong style={{ color: "#7c3aed" }}>{activePathway.slots.actor.label}</strong></>}
                    {activePathway.slots.access && <> gains access via <strong style={{ color: "#2563eb" }}>{activePathway.slots.access.label}</strong></>}
                    {activePathway.slots.capability && <>, leverages <strong style={{ color: "#0891b2" }}>{activePathway.slots.capability.label}</strong></>}
                    {activePathway.slots.task && <> to <strong style={{ color: "#d97706" }}>{activePathway.slots.task.label.toLowerCase()}</strong></>}
                    {activePathway.slots.harm && <>, resulting in <strong style={{ color: "#dc2626" }}>{activePathway.slots.harm.label.toLowerCase()}</strong></>}
                    {activePathway.slots.mitigation && <>. Current mitigation: <strong style={{ color: "#059669" }}>{activePathway.slots.mitigation.label}</strong></>}
                    {activePathway.slots.evaluation && <>. Evaluation required: <strong style={{ color: "#7c3aed" }}>{activePathway.slots.evaluation.label}</strong></>}
                    .
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg p-8 text-center" style={{ background: "var(--card)", border: "1px dashed var(--border)" }}>
              <button
                onClick={addPathway}
                className="font-mono text-sm transition-all"
                style={{ color: "var(--primary)" }}
              >
                + Create your first pathway
              </button>
            </div>
          )}

          {/* All pathways summary */}
          {pathways.length > 1 && (
            <div className="mt-4 rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>ALL PATHWAYS</div>
              <div className="space-y-2">
                {pathways.map((p, i) => {
                  const filled = Object.values(p.slots).filter(Boolean).length;
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)", width: "70px" }}>
                        Pathway {i + 1}
                      </span>
                      <div className="flex-1 flex gap-1">
                        {SLOT_CONFIG.map((slot) => (
                          <div
                            key={slot.key}
                            className="h-1.5 flex-1 rounded-full"
                            style={{ background: p.slots[slot.key] ? slot.color : "var(--muted)" }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-xs" style={{ color: filled >= 4 ? "#22c55e" : "var(--muted-foreground)" }}>
                        {filled}/7
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          Build pathways representing how different actors could exploit Aster-3
        </div>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2.5 rounded font-mono text-sm tracking-wider transition-all"
          style={{
            background: canProceed ? "var(--primary)" : "var(--muted)",
            color: canProceed ? "var(--primary-foreground)" : "var(--muted-foreground)",
            cursor: canProceed ? "pointer" : "not-allowed",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          CLASSIFY RISKS →
        </button>
      </div>
    </div>
  );
}
