import { starterDraft, type DraftCourse, type DraftCourseStatus } from "../../features/educator/courseStore";
import { supabase, supabaseConfigured } from "../supabase/client";
import { readLocalArray, writeLocal } from "./localFallback";

const eventName = "opened-courses";

export const courseRepository = {
  async list(userId: string | undefined): Promise<DraftCourse[]> {
    if (!supabaseConfigured || !userId) {
      return readLocalArray("courses", userId, "drafts", [starterDraft]);
    }

    const { data } = await supabase
      .from("courses")
      .select("slug,title,subtitle,status,updated_at")
      .order("updated_at", { ascending: false });

    if (!data?.length) return [starterDraft];
    return data.map((course) => ({
      ...starterDraft,
      id: course.slug,
      title: course.title,
      subtitle: course.subtitle ?? "",
      status: course.status as DraftCourseStatus,
      updatedAt: course.updated_at,
    }));
  },

  async get(userId: string | undefined, courseId: string) {
    const courses = await this.list(userId);
    return courses.find((course) => course.id === courseId) ?? starterDraft;
  },

  async upsert(userId: string | undefined, course: DraftCourse) {
    if (supabaseConfigured && userId) {
      await supabase.from("courses").upsert(
        {
          slug: course.id,
          title: course.title,
          subtitle: course.subtitle,
          owner_id: userId,
          status: course.status,
        },
        { onConflict: "slug" },
      );
    }

    const courses = readLocalArray("courses", userId, "drafts", [starterDraft]);
    const next = courses.some((item) => item.id === course.id)
      ? courses.map((item) => (item.id === course.id ? course : item))
      : [...courses, course];
    writeLocal("courses", userId, "drafts", next, eventName);
    return course;
  },

  async submit(userId: string | undefined, courseId: string) {
    const course = await this.get(userId, courseId);
    return this.upsert(userId, {
      ...course,
      status: "submitted",
      reviewNote: undefined,
      updatedAt: new Date().toISOString(),
    });
  },

  async decide(userId: string | undefined, courseId: string, status: DraftCourseStatus, reviewNote: string) {
    const course = await this.get(userId, courseId);
    return this.upsert(userId, { ...course, status, reviewNote, updatedAt: new Date().toISOString() });
  },
};
