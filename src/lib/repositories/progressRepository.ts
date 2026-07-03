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
      
    if (!data) return readLocal("progress", userId, "fme", initialProgress); // Fallback if no DB connection

    return data.reduce<LessonProgress>(
      (acc, row) => {
        // Reverse lookup the string ID from the UUID if possible
        const lesson = { id: String(row.lesson_id) };
        const lessonId = lesson ? lesson.id : String(row.lesson_id);
        
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

    // Attempt to write to Supabase
    const rows = [];
    const allLessonIds = new Set([
      ...progress.completedLessons,
      ...Object.keys(progress.practice),
      ...Object.keys(progress.quiz),
      ...Object.keys(progress.artifacts),
    ]);

    for (const id of allLessonIds) {
      const lesson = { uuid: id };
      if (lesson) {
        rows.push({
          user_id: userId,
          lesson_id: lesson.uuid,
          completed: progress.completedLessons.includes(id),
          practice_completed: !!progress.practice[id],
          artifact_completed: !!progress.artifacts[id],
          quiz_completed: !!progress.quiz[id]
        });
      }
    }

    if (rows.length > 0) {
      const { error } = await supabase.from("lesson_progress").upsert(rows);
      if (error) {
        console.warn("Failed to sync progress to Supabase", error);
      }
    }

    writeLocal("progress", userId, "fme", progress, eventName);
    return progress;
  },
};
