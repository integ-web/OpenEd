interface Props {
  screen: number;
  totalScreens: number;
  onBack?: () => void;
}

const SCREEN_LABELS = [
  "Scenario Brief",
  "Actor Selection",
  "Asset Selection",
  "Harm Pathway Builder",
  "Risk Classification",
  "Evaluation Feedback",
  "Threat Model Export",
];

export function ProgressHeader({ screen, totalScreens, onBack }: Props) {
  const progress = ((screen - 1) / (totalScreens - 1)) * 100;

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "rgba(8,13,24,0.95)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
                ASTER-3 // THREAT MODEL MAPPER
              </span>
            </div>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}
            >
              RESTRICTED
            </span>
          </div>
          <div className="flex items-center gap-4">
            {onBack && screen > 1 && (
              <button
                onClick={onBack}
                className="text-xs font-mono transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
              >
                ← BACK
              </button>
            )}
            <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
              {screen}/{totalScreens}
            </span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1.5 mb-2">
          {SCREEN_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === screen;
            const isDone = stepNum < screen;
            return (
              <div key={i} className="flex items-center gap-1.5 flex-1">
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                    style={{
                      background: isActive ? "var(--primary)" : isDone ? "rgba(245,158,11,0.25)" : "var(--muted)",
                      border: isActive ? "none" : isDone ? "1px solid rgba(245,158,11,0.4)" : "1px solid var(--border)",
                    }}
                  >
                    {isDone ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span
                        className="text-xs font-mono"
                        style={{ color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)", fontSize: "9px" }}
                      >
                        {stepNum}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs font-mono truncate hidden lg:block"
                    style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)", fontSize: "10px" }}
                  >
                    {label.toUpperCase()}
                  </span>
                </div>
                {i < SCREEN_LABELS.length - 1 && (
                  <div
                    className="h-px flex-1 transition-all hidden sm:block"
                    style={{ background: isDone ? "rgba(245,158,11,0.3)" : "var(--border)", minWidth: "8px", maxWidth: "32px" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--primary)" }}
          />
        </div>
      </div>
    </header>
  );
}
