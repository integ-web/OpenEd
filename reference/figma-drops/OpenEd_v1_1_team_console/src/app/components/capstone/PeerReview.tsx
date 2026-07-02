import React from "react";
import { SectionHeader, Card, InfoBox } from "./ui";
import { useCapstone } from "./CapstoneContext";

export function PeerReview() {
  const { state, togglePeerReviewItem } = useCapstone();
  const items = state.peerReview.items;
  const checked = items.filter((i) => i.checked).length;
  const total = items.length;
  const pct = Math.round((checked / total) * 100);

  const categories = [
    {
      label: "Evidence & Documentation",
      ids: ["pr-1", "pr-2", "pr-3", "pr-4"],
    },
    {
      label: "Analysis Quality",
      ids: ["pr-5", "pr-6", "pr-7", "pr-8"],
    },
    {
      label: "Professional Standards",
      ids: ["pr-9", "pr-10", "pr-11", "pr-12"],
    },
  ];

  return (
    <div>
      <SectionHeader
        number="SECTION 11"
        title="Peer Review Checklist"
        subtitle="Self-assessment against professional evaluation standards before final submission"
      />

      <div className="grid gap-6">
        <InfoBox>
          This checklist is not a compliance exercise — it is the evaluator's professional
          self-assessment. Checking a box means you are attesting that the criterion is genuinely
          met, not merely attempted. Unchecked boxes will be visible to the review panel.
        </InfoBox>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
              Items Attested
            </p>
            <p
              className="font-mono mt-1"
              style={{ fontSize: "2rem", color: pct === 100 ? "#22c55e" : "var(--primary)" }}
            >
              {checked}/{total}
            </p>
          </Card>
          <Card>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
              Completion
            </p>
            <p
              className="font-mono mt-1"
              style={{ fontSize: "2rem", color: pct === 100 ? "#22c55e" : "var(--primary)" }}
            >
              {pct}%
            </p>
          </Card>
          <Card>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
              Review Status
            </p>
            <p
              className="font-mono mt-1 text-sm"
              style={{ color: pct === 100 ? "#22c55e" : pct >= 75 ? "#f59e0b" : "#ef4444" }}
            >
              {pct === 100 ? "READY FOR DEFENSE" : pct >= 75 ? "NEAR COMPLETE" : "IN PROGRESS"}
            </p>
          </Card>
        </div>

        <div
          className="h-2 w-full overflow-hidden"
          style={{ background: "var(--muted)", borderRadius: "var(--radius-sm)" }}
        >
          <div
            className="h-full transition-all"
            style={{
              width: `${pct}%`,
              background: pct === 100 ? "#22c55e" : "var(--primary)",
            }}
          />
        </div>

        <div className="grid gap-4">
          {categories.map((cat) => (
            <Card key={cat.label}>
              <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
                {cat.label}
              </h3>
              <div className="space-y-3">
                {items
                  .filter((item) => cat.ids.includes(item.id))
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => togglePeerReviewItem(item.id)}
                      className="w-full text-left flex items-start gap-3 p-3 border transition-all"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        background: item.checked ? "rgba(34,197,94,0.05)" : "var(--muted)",
                        borderColor: item.checked ? "rgba(34,197,94,0.3)" : "var(--border)",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          borderColor: item.checked ? "#22c55e" : "var(--muted-foreground)",
                          background: item.checked ? "rgba(34,197,94,0.2)" : "transparent",
                          borderRadius: "2px",
                        }}
                      >
                        {item.checked && (
                          <span className="font-mono text-xs" style={{ color: "#22c55e" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        className="font-mono text-sm"
                        style={{ color: item.checked ? "var(--foreground)" : "var(--muted-foreground)" }}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
              </div>
            </Card>
          ))}
        </div>

        {pct === 100 && (
          <div
            className="p-5 border font-mono text-sm"
            style={{
              background: "rgba(34,197,94,0.05)",
              borderColor: "rgba(34,197,94,0.3)",
              borderRadius: "var(--radius)",
            }}
          >
            <p className="mb-2" style={{ color: "#22c55e" }}>
              ✓ All peer review criteria attested. Dossier is cleared for Final Defense submission.
            </p>
            <p style={{ color: "var(--muted-foreground)" }}>
              By completing this checklist, the evaluating officer attests that the dossier meets
              professional evaluation lab standards and that all findings are evidence-grounded
              and defensible under scrutiny.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
