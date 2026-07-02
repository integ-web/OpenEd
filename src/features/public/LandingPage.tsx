import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse } from "../../data/fme";

export function LandingPage() {
  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">OpenEd Platform</p>
        <h1>Learn with sources, practice, AI help, and proof.</h1>
        <p className="lede">
          OpenEd is a free AI-native learning platform. This FME demo preview shows the first flagship course direction
          without claiming full course coverage yet.
        </p>
        <div className="hero-actions">
          <Link className="button" to="/courses/fme">
            Explore FME <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" to="/signup">
            Create account
          </Link>
        </div>
      </div>
      <div className="course-panel" aria-label="Featured OpenEd course">
        <div className="panel-topline">
          <span>{fmeCourse.eyebrow}</span>
          <Sparkles size={16} />
        </div>
        <h2>{fmeCourse.title}</h2>
        <p>{fmeCourse.promise}</p>
        <div className="metrics-row">
          <span>{fmeCourse.hours}h</span>
          <span>{fmeCourse.lessons} lessons</span>
          <span>{fmeCourse.level}</span>
        </div>
        <ul className="check-list">
          <li>
            <CheckCircle2 size={16} /> Source-mapped learning
          </li>
          <li>
            <CheckCircle2 size={16} /> BYOK tutor support
          </li>
          <li>
            <CheckCircle2 size={16} /> Artifact-based proof
          </li>
        </ul>
      </div>
    </section>
  );
}
