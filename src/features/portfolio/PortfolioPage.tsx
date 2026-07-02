import { FolderCheck, Award, FileClock, CheckCircle } from "lucide-react";
import { useProof } from "../proof/useProof";

export function PortfolioPage() {
  const { portfolioItems, submissions, certificate } = useProof();

  const progressPercent = Math.min(
    100,
    Math.round((certificate.acceptedArtifacts / certificate.requiredArtifacts) * 100),
  );

  return (
    <section className="stack">
      <div className="section-heading">
        <FolderCheck size={28} style={{ color: "var(--teal)" }} />
        <p className="eyebrow">SkillProof Portfolio</p>
        <h1>Your Proof of Learning</h1>
        <p>Certificates require completion of practice and accepted source-backed proof, never watch time alone.</p>
      </div>

      {/* Certificate Progress Widget */}
      <article className="course-panel featured" style={{ display: "grid", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>
              Certification Track
            </span>
            <h2 style={{ margin: "5px 0 0 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={22} style={{ color: "var(--violet)" }} />
              {certificate.eligible ? "Certificate Unlocked" : "In Progress"}
            </h2>
          </div>
          <span className={`status-pill ${certificate.eligible ? "success" : "warning"}`}>
            {progressPercent}% Complete
          </span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {certificate.reason}
        </p>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.85rem",
              fontWeight: 650,
              marginBottom: "6px",
            }}
          >
            <span>Artifact Milestones</span>
            <span>
              {certificate.acceptedArtifacts} / {certificate.requiredArtifacts} Accepted
            </span>
          </div>
          <progress value={certificate.acceptedArtifacts} max={certificate.requiredArtifacts} />
        </div>
      </article>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", marginTop: "1rem" }}>
        {/* Verified Portfolio */}
        <div>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={20} style={{ color: "var(--green)" }} />
            Verified Skill Portfolio ({portfolioItems.length})
          </h2>
          <div className="card-grid">
            {portfolioItems.map((item) => (
              <article className="course-card" key={item.id}>
                <p className="eyebrow" style={{ color: "var(--green)" }}>
                  ✓ Verified Proof
                </p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </article>
            ))}
            {portfolioItems.length === 0 && (
              <article className="course-card muted-card" style={{ borderStyle: "dashed" }}>
                <h3 className="muted">No verified artifacts yet</h3>
                <p className="muted">
                  Complete builds in the lesson workspace. Once reviewed by an educator, approved artifacts will appear
                  here as permanent proof of mastery.
                </p>
              </article>
            )}
          </div>
        </div>

        {/* Submissions queue in progress */}
        <div>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileClock size={20} style={{ color: "var(--blue)" }} />
            Submission Log & Revision History ({submissions.length})
          </h2>
          <div className="card-grid">
            {submissions.map((submission) => (
              <article className="course-card" key={submission.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span className={`status-pill ${submission.status === "accepted" ? "success" : "warning"}`}>
                    {submission.status.replace("_", " ")}
                  </span>
                </div>
                <h2>{submission.title}</h2>
                <p
                  style={{
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    borderLeft: "3px solid var(--line)",
                    paddingLeft: "10px",
                    margin: "10px 0",
                  }}
                >
                  "{submission.body.length > 100 ? `${submission.body.slice(0, 100)}...` : submission.body}"
                </p>
                <p className="muted" style={{ fontSize: "0.85rem", marginTop: "10px" }}>
                  <strong>Reviewer Feedback:</strong> {submission.reviewerNote || "Awaiting review."}
                </p>
              </article>
            ))}
            {submissions.length === 0 && (
              <article className="course-card muted-card" style={{ borderStyle: "dashed" }}>
                <h3 className="muted">No submission history</h3>
                <p className="muted">Use the Lesson Workspace tabs to build and submit your course projects.</p>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
