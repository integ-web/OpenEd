import { ACTORS } from "../sim-data";

interface Props {
  selectedActors: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

const THREAT_COLORS = {
  low: { text: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)" },
  medium: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  high: { text: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)" },
  critical: { text: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.28)" },
};

export function Screen2Actors({ selectedActors, onToggle, onNext }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
          STEP 2 OF 7 // ACTOR SELECTION
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>
          Who might misuse or interact with Aster-3?
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "14px", lineHeight: 1.6 }}>
          Select all actors relevant to the release context. Include actors who might interact benignly — they can surface unintended harms. You must select at least 2 actors to proceed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {ACTORS.map((actor) => {
          const selected = selectedActors.includes(actor.id);
          const tc = THREAT_COLORS[actor.threatLevel];
          return (
            <button
              key={actor.id}
              onClick={() => onToggle(actor.id)}
              className="rounded-lg p-4 text-left transition-all"
              style={{
                background: selected ? "rgba(245,158,11,0.08)" : "var(--card)",
                border: selected ? "1px solid rgba(245,158,11,0.4)" : "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                if (!selected) e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{actor.icon}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--foreground)", fontWeight: 500, fontSize: "13px" }}>
                    {actor.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono rounded px-1.5 py-0.5"
                    style={{ fontSize: "9px", letterSpacing: "0.06em", background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                  >
                    {actor.threatLevel.toUpperCase()}
                  </span>
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center transition-all"
                    style={{
                      background: selected ? "var(--primary)" : "transparent",
                      border: selected ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {selected && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#080d18" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "12px", lineHeight: 1.6 }}>{actor.description}</p>
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          {selectedActors.length === 0 ? (
            <span>Select actors to continue</span>
          ) : (
            <span style={{ color: "var(--foreground)" }}>
              {selectedActors.length} actor{selectedActors.length !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        <button
          onClick={onNext}
          disabled={selectedActors.length < 2}
          className="px-6 py-2.5 rounded font-mono text-sm tracking-wider transition-all"
          style={{
            background: selectedActors.length >= 2 ? "var(--primary)" : "var(--muted)",
            color: selectedActors.length >= 2 ? "var(--primary-foreground)" : "var(--muted-foreground)",
            cursor: selectedActors.length >= 2 ? "pointer" : "not-allowed",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}
