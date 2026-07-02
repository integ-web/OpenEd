import { supabase, supabaseConfigured } from "../supabase/client";
import { readLocal, writeLocal } from "./localFallback";

export type LessonProgress = {
  enrolled: boolean;
  completedLessons: string[];
  practice: Record<string, string>;
  quiz: Record<string, boolean>;
  artifacts: Record<string, string>;
};

export const initialProgress: LessonProgress = {
  enrolled: false,
  completedLessons: [],
  practice: {},
  quiz: {},
  artifacts: {},
};

const eventName = "opened-progress";

export const progressRepository = {
  async read(userId: string | undefined): Promise<LessonProgress> {
    if (!supabaseConfigured || !userId) {
      return readLocal("progress", userId, "fme", initialProgress);
    }

    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_id,completed,practice_completed,artifact_completed,quiz_completed");
    if (!data) return initialProgress;

    return data.reduce<LessonProgress>(
      (acc, row) => {
        const lessonId = String(row.lesson_id);
        if (row.completed) acc.completedLessons.push(lessonId);
        if (row.practice_completed) acc.practice[lessonId] = "saved";
        if (row.quiz_completed) acc.quiz[lessonId] = true;
        if (row.artifact_completed) acc.artifacts[lessonId] = "submitted";
        return acc;
      },
      { ...initialProgress, enrolled: data.length > 0, completedLessons: [], practice: {}, quiz: {}, artifacts: {} },
    );
  },

  async write(userId: string | undefined, progress: LessonProgress) {
    if (!supabaseConfigured || !userId) {
      writeLocal("progress", userId, "fme", progress, eventName);
      return progress;
    }

    writeLocal("progress", userId, "fme", progress, eventName);
    return progress;
  },
};
