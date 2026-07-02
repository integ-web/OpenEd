import { useState } from "react";
import { useProof } from "./useProof";

export function ProofReviewPage() {
  const { submissions, scoreSubmission } = useProof();
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [feedbackNotes, setFeedbackNotes] = useState<Record<string, string>>({});

  function setCriterionScore(submissionId: string, criterionId: string, value: number) {
    setScores((prev) => ({
      ...prev,
      [submissionId]: {
        ...(prev[submissionId] || {}),
        [criterionId]: value,
      },
    }));
  }

  function handleAction(submissionId: string, accept: boolean) {
    const feedback = feedbackNotes[submissionId] || "";
    void scoreSubmission(submissionId, accept, feedback);
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Assessment & Proof Engine</p>
        <h1>Artifact Review Queue</h1>
        <p>Score learner submissions with interactive rubrics, request revision, or accept proof into the portfolio.</p>
      </div>

      <div className="card-grid" style={{ gridTemplateColumns: "1fr" }}>
        {submissions.length === 0 ? (
          <article className="course-card" style={{ textAlign: "center", padding: "48px" }}>
            <p className="eyebrow" style={{ color: "var(--muted)" }}>
              Queue Empty
            </p>
            <h2>No submissions to review</h2>
            <p className="muted">Newly submitted learner artifacts from courses will appear here automatically.</p>
          </article>
        ) : (
          submissions.map((submission) => {
            const currentFeedback = feedbackNotes[submission.id] || "";
            return (
              <article className="course-panel" key={submission.id} style={{ display: "grid", gap: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <span
                      className={`status-pill ${submission.status === "accepted" ? "success" : "warning"}`}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {submission.status.replace("_", " ")}
                    </span>
                    <h2 style={{ margin: 0 }}>{submission.title}</h2>
                    <p style={{ margin: "5px 0 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                      Submission ID: <code>{submission.id}</code>
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "var(--panel-strong)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <strong style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                    Learner Response:
                  </strong>
                  <p style={{ margin: 0, whiteSpace: "pre-wrap", fontStyle: "italic", fontSize: "0.95rem" }}>
                    "{submission.body}"
                  </p>
                </div>

                {submission.scores && submission.scores.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: "1rem", margin: "0 0 0.75rem 0" }}>Interactive Rubric Scoring</h3>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {submission.scores.map((score) => {
                        const max = score.maxScore || 4;
                        const currentScore = scores[submission.id]?.[score.criterionId] ?? score.score;
                        return (
                          <div
                            key={score.criterionId}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 14px",
                              border: "1px solid var(--line)",
                              borderRadius: "8px",
                              background: "var(--panel)",
                            }}
                          >
                            <div>
                              <strong style={{ fontSize: "0.9rem" }}>{score.label}</strong>
                              <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block" }}>
                                Max Score: {max} pts
                              </span>
                            </div>
                            <div style={{ display: "flex", gap: "6px" }}>
                              {Array.from({ length: max }, (_, idx) => idx + 1).map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  className={`tab ${currentScore === val ? "active" : ""}`}
                                  style={{ minHeight: "32px", padding: "0 10px", fontSize: "0.85rem" }}
                                  onClick={() => setCriterionScore(submission.id, score.criterionId, val)}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <label style={{ display: "grid", gap: "6px" }}>
                  <span style={{ fontWeight: 650, fontSize: "0.9rem" }}>Feedback / Reviewer Note</span>
                  <textarea
                    rows={3}
                    placeholder="Provide specific feedback or explain why revision is required..."
                    value={currentFeedback}
                    onChange={(e) => setFeedbackNotes({ ...feedbackNotes, [submission.id]: e.target.value })}
                  />
                </label>

                {submission.reviewerNote && (
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    <strong>Previous Note:</strong> {submission.reviewerNote}
                  </div>
                )}

                <div
                  className="inline-actions"
                  style={{ justifyContent: "flex-end", borderTop: "1px solid var(--line)", paddingTop: "15px" }}
                >
                  <button className="button secondary" type="button" onClick={() => handleAction(submission.id, false)}>
                    Request Revision
                  </button>
                  <button className="button" type="button" onClick={() => handleAction(submission.id, true)}>
                    Accept Proof
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
