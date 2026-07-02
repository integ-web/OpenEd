import { ArrowRight, ClipboardCheck, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEducatorCourses } from "./useEducatorCourses";

export function EducatorDashboardPage() {
  const { courses } = useEducatorCourses();

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Educator Studio</p>
        <h1>Create quality-controlled courses</h1>
        <p>Courses move through source mapping, assessment design, preview, readiness QA, and OpenEd Team review.</p>
        <div className="inline-actions">
          <Link className="button" to="/educator/courses/new">
            New course
          </Link>
          <Link className="button secondary" to="/educator/proof-review">
            Review artifacts
          </Link>
        </div>
      </div>
      <div className="card-grid">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <Layers3 size={22} />
            <h2>{course.title}</h2>
            <p>Status: {course.status.replace("_", " ")}</p>
            {course.reviewNote && <p className="muted">{course.reviewNote}</p>}
            <div className="inline-actions">
              <Link className="text-link" to={`/educator/courses/${course.id}/edit`}>
                Open editor <ArrowRight size={15} />
              </Link>
              <Link className="text-link" to={`/educator/courses/${course.id}/review-status`}>
                Review status <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
        <article className="course-card">
          <ClipboardCheck size={22} />
          <h2>FME reference course</h2>
          <p>Published by OpenEd Team; useful as a quality bar, not an educator-owned template.</p>
        </article>
      </div>
    </section>
  );
}
