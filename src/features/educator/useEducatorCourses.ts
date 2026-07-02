import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../app/providers";
import { courseRepository } from "../../lib/repositories/courseRepository";
import { starterDraft, type DraftCourse, type DraftCourseStatus } from "./courseStore";

export function useEducatorCourses() {
  const { user } = useAuth();
  const userId = user?.id;
  const [courses, setCourses] = useState<DraftCourse[]>([starterDraft]);

  const refresh = useCallback(async () => {
    setCourses(await courseRepository.list(userId));
  }, [userId]);

  useEffect(() => {
    void refresh();
    window.addEventListener("opened-courses", refresh);
    return () => window.removeEventListener("opened-courses", refresh);
  }, [refresh]);

  return {
    courses,
    refresh,
    getCourse: useCallback(
      async (courseId: string | undefined) => courseRepository.get(userId, courseId ?? starterDraft.id),
      [userId],
    ),
    upsertCourse: useCallback(
      async (course: DraftCourse) => {
        await courseRepository.upsert(userId, course);
        await refresh();
      },
      [refresh, userId],
    ),
    submitCourse: useCallback(
      async (courseId: string) => {
        await courseRepository.submit(userId, courseId);
        await refresh();
      },
      [refresh, userId],
    ),
    decideCourse: useCallback(
      async (courseId: string, status: DraftCourseStatus, reviewNote: string) => {
        await courseRepository.decide(userId, courseId, status, reviewNote);
        await refresh();
      },
      [refresh, userId],
    ),
  };
}
