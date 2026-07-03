import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse, fmeModules } from "../../data/fme";

export function FmePublicPage() {
  return (
    <section className="stack">
      <div className="split-hero">
        <div>
          <p className="eyebrow">{fmeCourse.eyebrow}</p>
          <h1>{fmeCourse.title}</h1>
          <p className="lede">{fmeCourse.promise}</p>
          <div className="hero-actions">
            <Link className="button" to="/learn/courses/fme">
              Start free <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" to="/settings/byok">
              Set up BYOK
            </Link>
          </div>
        </div>
        <div className="signal-panel">
          {fmeModules.map((phase) => (
            <div key={phase.id} className="phase-row">
              <span>{phase.id.toUpperCase()}</span>
              <strong>{phase.title}</strong>
              <progress value={0} max="100" aria-label={`${phase.title} preview progress`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
