import { type DraftCourse, type DraftCourseStatus } from "../educator/courseStore";
import { useEducatorCourses } from "../educator/useEducatorCourses";
import { useTeamAudit } from "./useTeamAudit";

export function TeamReviewQueuePage() {
  const { courses, decideCourse } = useEducatorCourses();
  const { addAuditEntry } = useTeamAudit();

  async function decide(course: DraftCourse, status: DraftCourseStatus, note: string) {
    await decideCourse(course.id, status, note);
    await addAuditEntry({
      actor: "team@opened.ai",
      action: "course.status_change",
      target: course.title,
      note,
    });
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Quality Assurance Operations</p>
        <h1>Course QA Decisions Queue</h1>
        <p>
          Review draft submissions, evaluate against compliance metrics, and approve courses for publication or request
          adjustments.
        </p>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th scope="col">Course Details</th>
              <th scope="col">Instructor Role</th>
              <th scope="col">Current Status</th>
              <th scope="col">QA Compliance Score</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => {
              const score =
                [
                  item.sources.length > 0,
                  item.quiz.length > 0,
                  item.rubric.length > 0,
                  Boolean(item.artifactPrompt),
                  Boolean(item.tutorGrounding),
                ].filter(Boolean).length * 20;

              let statusColorClass = "warning";
              if (item.status === "approved") statusColorClass = "success";
              else if (item.status === "rejected" || item.status === "changes_requested") statusColorClass = "warning";

              return (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 650, fontSize: "0.95rem" }}>{item.title}</div>
                    <div className="muted" style={{ fontSize: "0.8rem", marginTop: "2px" }}>
                      ID: {item.id} · {item.lessons.length} Lessons
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.9rem" }}>Educator Profile</span>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${statusColorClass}`}
                      style={{ fontSize: "0.75rem", padding: "2px 8px" }}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{score}%</span>
                      <div
                        style={{
                          flexGrow: 1,
                          maxWidth: "80px",
                          background: "var(--line)",
                          height: "6px",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${score}%`,
                            height: "100%",
                            background: score === 100 ? "var(--green)" : "var(--blue)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="inline-actions" style={{ justifyContent: "flex-end" }}>
                      <button
                        className="button secondary small"
                        type="button"
                        onClick={() =>
                          void decide(
                            item,
                            "changes_requested",
                            "Add stronger source coverage and artifact examples before approval.",
                          )
                        }
                      >
                        Request Changes
                      </button>
                      <button
                        className="button secondary danger small"
                        type="button"
                        style={{
                          borderColor: "color-mix(in srgb, var(--red), transparent 70%)",
                          background: "color-mix(in srgb, var(--red), transparent 94%)",
                          color: "var(--red)",
                        }}
                        onClick={() =>
                          void decide(
                            item,
                            "rejected",
                            "Rejected for v1 quality bar. Rebuild assessment and sources before resubmitting.",
                          )
                        }
                      >
                        Reject
                      </button>
                      <button
                        className="button small"
                        type="button"
                        onClick={() => void decide(item, "approved", "Approved by OpenEd Team. Ready to publish.")}
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {courses.length === 0 && (
              <tr>
                <td colSpan={5} className="muted" style={{ textAlign: "center", padding: "24px" }}>
                  No courses found in the system database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
