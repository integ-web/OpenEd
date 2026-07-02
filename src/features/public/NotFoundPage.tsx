import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="page-card narrow">
      <p className="eyebrow">404</p>
      <h1>That OpenEd route is not live yet.</h1>
      <p className="muted">
        The route-based shell handles missing pages cleanly and keeps the live app focused on OpenEd workflows.
      </p>
      <Link className="button" to="/">
        Go home
      </Link>
    </section>
  );
}
