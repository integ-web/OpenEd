import { ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse } from "../../data/fme";

export function CoursesPage() {
  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Course Catalog</p>
        <h1>OpenEd courses</h1>
        <p>FME is seeded as a demo preview while the platform remains broader than one runtime.</p>
      </div>

      <div className="card-grid">
        <article className="course-card featured">
          <p className="eyebrow">{fmeCourse.eyebrow}</p>
          <h2>{fmeCourse.title}</h2>
          <p>{fmeCourse.promise}</p>
          <div className="metrics-row">
            <span>{fmeCourse.hours} hours</span>
            <span>{fmeCourse.lessons} lessons</span>
          </div>
          <Link className="text-link" to="/courses/fme">
            View course <ArrowRight size={15} />
          </Link>
        </article>
        <article className="course-card muted-card">
          <LockKeyhole size={20} />
          <h2>More courses coming through Educator Studio</h2>
          <p>New courses will be source-mapped, QA reviewed, and approved by the OpenEd Team before publishing.</p>
        </article>
      </div>
    </section>
  );
}
