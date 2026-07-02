import { ASSETS } from "../sim-data";

interface Props {
  selectedAssets: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  People: "#3b82f6",
  Infrastructure: "#f97316",
  CBRN: "#ef4444",
  Democracy: "#a855f7",
  "AI System": "#f59e0b",
};

export function Screen3Assets({ selectedAssets, onToggle, onNext }: Props) {
  const grouped = ASSETS.reduce<Record<string, typeof ASSETS>>(
    (acc, a) => ({ ...acc, [a.category]: [...(acc[a.category] || []), a] }),
    {}
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--primary)" }}>
          STEP 3 OF 7 // ASSET SELECTION
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>
          What could be harmed?
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "14px", lineHeight: 1.6 }}>
          Select all assets at risk given the actors you chose. Assets are grouped by domain. Consider second-order effects — a compromised evaluation dataset enables harm to all downstream users.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(grouped).map(([category, assets]) => {
          const color = CATEGORY_COLORS[category] || "#94a3b8";
          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{ color, background: `${color}18`, border: `1px solid ${color}30`, letterSpacing: "0.08em" }}
                >
                  {category.toUpperCase()}
                </span>
                <div className="h-px flex-1" style={{ background: "var(--border)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assets.map((asset) => {
                  const selected = selectedAssets.includes(asset.id);
                  return (
                    <button
                      key={asset.id}
                      onClick={() => onToggle(asset.id)}
                      className="rounded-lg p-4 text-left transition-all"
                      style={{
                        background: selected ? `${color}0d` : "var(--card)",
                        border: selected ? `1px solid ${color}50` : "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{asset.icon}</span>
                          <span className="font-mono text-xs" style={{ color: "var(--foreground)", fontWeight: 500, fontSize: "13px" }}>
                            {asset.label}
                          </span>
                        </div>
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center transition-all"
                          style={{
                            background: selected ? color : "transparent",
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
                      <p style={{ color: "var(--muted-foreground)", fontSize: "12px", lineHeight: 1.6 }}>{asset.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          {selectedAssets.length === 0 ? (
            <span>Select assets to continue</span>
          ) : (
            <span style={{ color: "var(--foreground)" }}>
              {selectedAssets.length} asset{selectedAssets.length !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        <button
          onClick={onNext}
          disabled={selectedAssets.length < 2}
          className="px-6 py-2.5 rounded font-mono text-sm tracking-wider transition-all"
          style={{
            background: selectedAssets.length >= 2 ? "var(--primary)" : "var(--muted)",
            color: selectedAssets.length >= 2 ? "var(--primary-foreground)" : "var(--muted-foreground)",
            cursor: selectedAssets.length >= 2 ? "pointer" : "not-allowed",
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
