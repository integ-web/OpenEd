import { ArrowRight, BookOpen, FolderCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse, getFmeLesson } from "../../data/fme";
import { useFmeProgress } from "./useFmeProgress";

export function LearnerDashboardPage() {
  const nextLesson = getFmeLesson(fmeCourse.sampleLessonId);
  const { progress, enroll } = useFmeProgress();

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Learner App</p>
        <h1>Continue learning</h1>
        <p>Resume the FME demo preview with learning, sources, practice, AI help, and proof in the same workspace.</p>
      </div>
      <div className="dashboard-grid">
        <article className="course-card featured">
          <BookOpen size={22} />
          <h2>{fmeCourse.title}</h2>
          <p>{progress.enrolled ? `Next lesson: ${nextLesson.title}` : "Enroll to start the FME demo runtime."}</p>
          {!progress.enrolled && (
            <button className="button secondary" type="button" onClick={enroll}>
              Enroll in FME demo
            </button>
          )}
          <Link className="button" to={`/learn/courses/fme/lesson/${nextLesson.id}`}>
            Resume lesson <ArrowRight size={16} />
          </Link>
        </article>
        <article className="mini-card">
          <Sparkles size={20} />
          <h2>BYOK tutor</h2>
          <p>Mock mode is available until you add a browser-only key.</p>
        </article>
        <article className="mini-card">
          <FolderCheck size={20} />
          <h2>Portfolio</h2>
          <p>SkillProof items appear after artifact review.</p>
        </article>
      </div>
    </section>
  );
}
