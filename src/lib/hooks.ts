"use client";

import { useEffect, useMemo, useState } from "react";
import { addXp, loadProgress, saveProgress } from "@/lib/progress";
import type { UserProgress } from "@/types";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    if (progress) {
      saveProgress(progress);
    }
  }, [progress]);

  const api = useMemo(
    () => ({
      markLessonComplete: (lessonId: string, xp: number) => {
        setProgress((current) => {
          if (!current || current.completedLessonIds.includes(lessonId)) return current;
          return addXp(
            {
              ...current,
              completedLessonIds: [...current.completedLessonIds, lessonId]
            },
            xp
          );
        });
      },
      completeFramework: (frameworkId: string, xp: number) => {
        setProgress((current) => {
          if (!current || current.completedFrameworkIds.includes(frameworkId)) return current;
          return addXp(
            {
              ...current,
              completedFrameworkIds: [...current.completedFrameworkIds, frameworkId]
            },
            xp
          );
        });
      },
      recordQuiz: (quizId: string, score: number, total: number, xp: number) => {
        setProgress((current) => {
          if (!current) return current;
          const alreadyCompleted = current.completedQuizIds.includes(quizId);
          return addXp(
            {
              ...current,
              completedQuizIds: alreadyCompleted ? current.completedQuizIds : [...current.completedQuizIds, quizId],
              quizAttempts: [
                ...current.quizAttempts,
                { quizId, score, total, completedAt: new Date().toISOString() }
              ]
            },
            alreadyCompleted ? 0 : xp
          );
        });
      }
    }),
    []
  );

  return { progress, setProgress, ...api };
}
