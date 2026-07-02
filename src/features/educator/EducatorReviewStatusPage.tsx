import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { starterDraft, type DraftCourse } from "./courseStore";
import { useEducatorCourses } from "./useEducatorCourses";

export function EducatorReviewStatusPage() {
  const { courseId } = useParams();
  const { getCourse } = useEducatorCourses();
  const [course, setCourse] = useState<DraftCourse>(starterDraft);

  useEffect(() => {
    void getCourse(courseId).then(setCourse);
  }, [courseId, getCourse]);

  return (
    <section className="page-card">
      <p className="eyebrow">Review Status</p>
      <h1>{course.title}</h1>
      <p>
        Status: <strong>{course.status.replace("_", " ")}</strong>
      </p>
      <p className="muted">
        {course.reviewNote ??
          "No review note yet. Submitted courses will receive a publish decision from the OpenEd Team."}
      </p>
    </section>
  );
}
