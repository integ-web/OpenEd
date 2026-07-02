import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fmeCourse, fmeModules, fmeLessons, getFmeLesson } from "../../data/fme";
import { useFmeProgress } from "./useFmeProgress";

export function LearnerFmeCoursePage() {
  const nextLesson = getFmeLesson(fmeCourse.sampleLessonId);
  const { progress, enroll } = useFmeProgress();

  return (
    <section className="stack">
      <div className="section-heading">
        <p className="eyebrow">Course Runtime</p>
        <h1>{fmeCourse.title}</h1>
        <p>{fmeCourse.promise}</p>
      </div>
      <div className="phase-list">
        {fmeModules.map((module) => {
          const lessons = fmeLessons.filter((lesson) => lesson.moduleId === module.id);
          const complete = lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
          const pct = lessons.length ? Math.round((complete / lessons.length) * 100) : 0;
          return (
            <article key={module.id} className="phase-card">
              <span>{module.id.toUpperCase()}</span>
              <h2>{module.title}</h2>
              <p>{module.summary}</p>
              <progress value={pct} max="100" aria-label={`${module.title} progress`} />
            </article>
          );
        })}
      </div>
      {!progress.enrolled && (
        <button className="button secondary" type="button" onClick={enroll}>
          Enroll in FME
        </button>
      )}
      <Link className="button" to={`/learn/courses/fme/lesson/${nextLesson.id}`}>
        Open next lesson <ArrowRight size={16} />
      </Link>
    </section>
  );
}
