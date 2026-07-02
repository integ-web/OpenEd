import React from "react";
import { SectionHeader, Card, Btn, FieldLabel, TextArea, Select, MonoLabel, InfoBox } from "./ui";
import { useCapstone } from "./CapstoneContext";

const RISK_LEVELS = [
  { value: "negligible", label: "Negligible — No meaningful harm potential" },
  { value: "low", label: "Low — Harms containable with standard mitigations" },
  { value: "medium", label: "Medium — Significant harms possible; robust mitigations required" },
  { value: "high", label: "High — Severe harms likely without exceptional controls" },
  { value: "critical", label: "Critical — Release inadvisable without fundamental redesign" },
];

export function ThresholdMemo() {
  const { state, updateThresholdMemo } = useCapstone();
  const memo = state.thresholdMemo;

  const isComplete =
    memo.acceptableRiskLevel &&
    memo.redLines.trim().length > 20 &&
    memo.conditions.trim().length > 20 &&
    memo.content.trim().length > 50;

  const handleSave = () => {
    updateThresholdMemo({ written: true });
  };

  return (
    <div>
      <SectionHeader
        number="SECTION 08"
        title="Threshold Memo"
        subtitle="Define the acceptable risk envelope, red lines, and conditional release criteria"
      />

      <div className="grid gap-6">
        <InfoBox>
          A threshold memo is not a risk summary — it is a forward-looking policy document that
          specifies what the organization is and is not willing to accept. Red lines must be
          measurable and specific. Conditions must be verifiable. Vague language ("minimize risk",
          "ensure safety") is insufficient.
        </InfoBox>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Acceptable Risk Designation
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            Select the maximum aggregate risk level this organization is prepared to accept for
            Aster-3 at the proposed deployment scope.
          </p>
          <div className="space-y-2 mb-2">
            {RISK_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => updateThresholdMemo({ acceptableRiskLevel: level.value })}
                className="w-full text-left p-3 border transition-all font-mono text-sm"
                style={{
                  borderRadius: "var(--radius-sm)",
                  background:
                    memo.acceptableRiskLevel === level.value
                      ? "rgba(29,78,216,0.1)"
                      : "var(--muted)",
                  borderColor:
                    memo.acceptableRiskLevel === level.value
                      ? "rgba(29,78,216,0.5)"
                      : "var(--border)",
                  color:
                    memo.acceptableRiskLevel === level.value
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                  cursor: "pointer",
                }}
              >
                {memo.acceptableRiskLevel === level.value ? "◉ " : "○ "}
                {level.label}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Red Lines
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            Enumerate specific, measurable behaviors or outcomes that constitute an absolute bar to
            release. These are non-negotiable. Breaching a red line triggers mandatory escalation.
          </p>
          <FieldLabel>Red Line Criteria</FieldLabel>
          <TextArea
            value={memo.redLines}
            onChange={(v) => updateThresholdMemo({ redLines: v })}
            placeholder={`Example:\n1. Model provides synthesis-level detail on CBRN agents in any evaluation scenario\n2. Sandbox escape demonstrated under any prompt strategy with >0.5% success rate\n3. Alignment failure: model actively deceives evaluators in >1 controlled scenario\n4. Persistent memory accessed across organizational boundaries without authorization`}
            rows={8}
          />
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Conditional Release Criteria
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            If recommending restricted or conditional release, specify verifiable criteria that must
            be met before deployment. These are enforceable commitments, not aspirations.
          </p>
          <FieldLabel>Conditions for Release</FieldLabel>
          <TextArea
            value={memo.conditions}
            onChange={(v) => updateThresholdMemo({ conditions: v })}
            placeholder={`Example:\n1. CyberSecEval score below 0.08 (currently 0.14) verified by third-party audit\n2. CBRN classifier with <1% false negative rate deployed on all outputs\n3. Sandbox escape rate reduced to 0/500 trials across diverse adversarial inputs\n4. Human-in-the-loop enforcement for all enterprise workspace write operations`}
            rows={8}
          />
        </Card>

        <Card>
          <h3 className="mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Evaluator Judgment Statement
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            This section records your professional judgment as the lead evaluator. Articulate how
            the evidence base supports the threshold designation and what you consider the single
            greatest outstanding uncertainty.
          </p>
          <FieldLabel>Judgment Statement</FieldLabel>
          <TextArea
            value={memo.content}
            onChange={(v) => updateThresholdMemo({ content: v })}
            placeholder="As the evaluating officer for Aster-3 Frontier, I have reviewed the evaluation portfolio, benchmark data, and evidence card library. My professional judgment is that..."
            rows={10}
          />
        </Card>

        <div className="flex items-center justify-between">
          <div>
            {memo.written && (
              <span className="font-mono text-xs" style={{ color: "#22c55e" }}>
                ✓ Threshold memo saved
              </span>
            )}
          </div>
          <Btn
            onClick={handleSave}
            disabled={!isComplete}
            size="lg"
            variant={isComplete ? "primary" : "ghost"}
          >
            {isComplete ? "Finalize Threshold Memo" : "Complete all fields to save"}
          </Btn>
        </div>

        {!isComplete && (
          <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            Required: Acceptable risk level selection + red lines (&gt;20 chars) + conditions (&gt;20 chars) + judgment statement (&gt;50 chars)
          </div>
        )}
      </div>
    </div>
  );
}
