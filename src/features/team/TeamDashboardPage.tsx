import { ArrowRight, ShieldCheck, BookOpen, AlertTriangle, Users, BarChart3, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useEducatorCourses } from "../educator/useEducatorCourses";
import { useTeamAudit } from "./useTeamAudit";

export function TeamDashboardPage() {
  const { courses } = useEducatorCourses();
  const { audit } = useTeamAudit();
  const submitted = courses.filter((course) => course.status === "submitted").length;

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">OpenEd Team Console</p>
        <h1>Quality & Trust Operations</h1>
        <p>Review courses, source coverage, assessment strength, reported content, roles, and audit trails.</p>
      </div>

      <article className="course-panel featured" style={{ display: "grid", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck size={26} style={{ color: "var(--teal)" }} />
          <h2 style={{ margin: 0 }}>Course Review Queue</h2>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          <strong>{submitted}</strong> course submissions require quality assurance decisions. Verify that outcomes,
          sources, quizzes, rubrics, and tutor grounding are fully compliant.
        </p>
        <Link className="button" to="/team/review-queue" style={{ justifySelf: "start" }}>
          Open Review Queue <ArrowRight size={16} />
        </Link>
      </article>

      <div className="card-grid">
        <article className="course-card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BookOpen size={20} style={{ color: "var(--blue)" }} />
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>Source Coverage Review</h2>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
            Ensure every lesson claim is backed by a verified reference. Target: 100% primary source mapping.
          </p>
          <span className="status-pill success" style={{ alignSelf: "start", marginTop: "auto", fontSize: "0.75rem" }}>
            94% Average Mapped
          </span>
        </article>

        <article className="course-card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 size={20} style={{ color: "var(--violet)" }} />
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>Assessment Strength</h2>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
            Verify artifact submission thresholds and check active rubric items. No certification by watch-time.
          </p>
          <span className="status-pill success" style={{ alignSelf: "start", marginTop: "auto", fontSize: "0.75rem" }}>
            100% Proof-Enforced
          </span>
        </article>

        <article className="course-card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={20} style={{ color: "var(--red)" }} />
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>Reported Content</h2>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
            Monitor tutor flags, hallucination reports, dead URLs, and content abuse tickets from users.
          </p>
          <span className="status-pill success" style={{ alignSelf: "start", marginTop: "auto", fontSize: "0.75rem" }}>
            0 Active Reports
          </span>
        </article>

        <article className="course-card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={20} style={{ color: "var(--teal)" }} />
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>User Role Management</h2>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
            Provision and audit privileged accounts. Educator roles must be authorized by the team console.
          </p>
          <span className="status-pill" style={{ alignSelf: "start", marginTop: "auto", fontSize: "0.75rem" }}>
            IAM Configured
          </span>
        </article>
      </div>

      <article className="table-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "18px 24px",
            background: "var(--panel-strong)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <Database size={20} style={{ color: "var(--muted)" }} />
          <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Operations Audit Trail</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Action Type</th>
              <th scope="col">Target Object</th>
              <th scope="col">Operational Details</th>
            </tr>
          </thead>
          <tbody>
            {audit.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <span
                    className={`status-pill ${entry.action.includes("status") ? "warning" : "success"}`}
                    style={{ padding: "3px 8px", fontSize: "0.75rem" }}
                  >
                    {entry.action}
                  </span>
                </td>
                <td style={{ fontWeight: 650 }}>{entry.target}</td>
                <td className="muted">{entry.note}</td>
              </tr>
            ))}
            {audit.length === 0 && (
              <tr>
                <td colSpan={3} className="muted" style={{ textAlign: "center", padding: "24px" }}>
                  Audit log is currently empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
