import React from "react";
import { SectionHeader, Card, Btn, GateWarning, FieldLabel, TextArea, InfoBox } from "./ui";
import { useCapstone } from "./CapstoneContext";

export function ExecutiveReport() {
  const { state, updateExecutiveReport, qualityGates } = useCapstone();
  const report = state.executiveReport;

  const isComplete =
    report.executiveSummary.trim().length > 80 &&
    report.keyFindings.trim().length > 50 &&
    report.recommendation.trim().length > 50 &&
    report.caveats.trim().length > 30;

  const handleDraft = () => {
    if (isComplete) updateExecutiveReport({ drafted: true });
  };

  return (
    <div>
      <SectionHeader
        number="SECTION 10"
        title="Executive Report Builder"
        subtitle="Produce a non-technical summary suitable for organizational leadership and decision-makers"
      />

      {!qualityGates.canExportReport && (
        <GateWarning
          message={`QUALITY GATE: Report cannot be exported until 12 evidence cards are complete. Currently: ${state.evidenceCards.length}/12.`}
        />
      )}

      <div className="grid gap-6">
        <InfoBox>
          This section is not a technical summary — it is a decision-support document. Leadership
          readers may not have a background in machine learning or AI safety. Write with precision
          but without jargon. Every claim must be traceable to the evidence card library.
          Hedging is appropriate; false confidence is a liability.
        </InfoBox>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Executive Summary
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            2-4 sentences. What is Aster-3, what is being evaluated, and what is the headline
            conclusion? This paragraph appears verbatim in the final dossier cover page.
          </p>
          <TextArea
            value={report.executiveSummary}
            onChange={(v) => updateExecutiveReport({ executiveSummary: v })}
            placeholder="Aster-3 Frontier is a multimodal large language model with agentic capabilities under consideration for restricted deployment to research, enterprise, and government partners. This evaluation assessed the model across [N] structured evaluations spanning [domains], producing [N] evidence cards and a benchmark packet. The evaluation team's finding is that..."
            rows={6}
          />
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Key Findings for Leadership
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            Enumerate the 3-5 most consequential findings. Each should state the finding, its
            severity classification, and the action it implies. Use plain language.
          </p>
          <TextArea
            value={report.keyFindings}
            onChange={(v) => updateExecutiveReport({ keyFindings: v })}
            placeholder={`1. CRITICAL — [Finding description]. This implies [action or constraint required].\n2. HIGH — [Finding description]. This implies [action or constraint required].\n3. MEDIUM — [Finding description]. This implies [monitoring or mitigation required].`}
            rows={10}
          />
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Release Recommendation
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            State the evaluation team's recommendation and the primary reasoning. This must match
            the final decision recorded in Section 12.
          </p>
          <TextArea
            value={report.recommendation}
            onChange={(v) => updateExecutiveReport({ recommendation: v })}
            placeholder="The evaluation team recommends [release decision] based on the following primary considerations..."
            rows={6}
          />
        </Card>

        <Card>
          <h3 className="mb-3" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            Caveats & Limitations
          </h3>
          <p className="font-mono text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            What does this evaluation not cover? What assumptions were made? What would change the
            recommendation? Professional integrity requires explicit acknowledgment of limitations.
          </p>
          <TextArea
            value={report.caveats}
            onChange={(v) => updateExecutiveReport({ caveats: v })}
            placeholder={`This evaluation did not assess [scope exclusion]. The finding regarding [X] assumes [assumption]. A significant change to [factor] would require re-evaluation.`}
            rows={6}
          />
        </Card>

        {report.drafted && (
          <div
            className="p-6 border"
            style={{
              background: "var(--muted)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>
                EXECUTIVE REPORT PREVIEW
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 border"
                style={{ borderColor: "rgba(34,197,94,0.4)", color: "#22c55e" }}
              >
                DRAFT
              </span>
            </div>
            <div className="space-y-4 font-mono text-sm" style={{ color: "var(--muted-foreground)" }}>
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  EXECUTIVE SUMMARY
                </p>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{report.executiveSummary}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  KEY FINDINGS
                </p>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{report.keyFindings}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  RECOMMENDATION
                </p>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{report.recommendation}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  CAVEATS & LIMITATIONS
                </p>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{report.caveats}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {!isComplete && (
              <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                All four sections must be completed to finalize report.
              </p>
            )}
          </div>
          <Btn
            onClick={handleDraft}
            disabled={!isComplete}
            size="lg"
            variant={isComplete ? "primary" : "ghost"}
          >
            {report.drafted ? "Report Finalized ✓" : isComplete ? "Finalize Report" : "Complete all sections"}
          </Btn>
        </div>
      </div>
    </div>
  );
}
