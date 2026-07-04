import { useEffect, useState } from "react";
import { useAuth } from "../../app/providers";
import { initialProgress, progressRepository, type LessonProgress } from "../../lib/repositories/progressRepository";

export function useFmeProgress() {
  const { user } = useAuth();
  const userId = user?.id;
  const [progress, setProgress] = useState<LessonProgress>(initialProgress);

  useEffect(() => {
    let active = true;
    async function sync() {
      const next = await progressRepository.read(userId);
      if (active) setProgress(next);
    }

    void sync();
    window.addEventListener("opened-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      active = false;
      window.removeEventListener("opened-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, [userId]);

  async function save(mutator: (current: LessonProgress) => LessonProgress) {
    const next = mutator(await progressRepository.read(userId));
    await progressRepository.write(userId, next);
    setProgress(next);
  }

  return {
    progress,
    enroll: () => void save((current) => ({ ...current, enrolled: true })),
    savePractice: (lessonId: string, value: string) =>
      void save((current) => ({ ...current, practice: { ...current.practice, [lessonId]: value } })),
    completeQuiz: (lessonId: string) =>
      void save((current) => ({ ...current, quiz: { ...current.quiz, [lessonId]: true } })),
    submitArtifact: (lessonId: string, value: string) =>
      void save((current) => ({
        ...current,
        artifacts: { ...current.artifacts, [lessonId]: value },
        completedLessons: Array.from(new Set([...current.completedLessons, lessonId])),
      })),
  };
}
