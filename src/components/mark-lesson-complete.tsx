"use client";

import { CheckCircle2 } from "lucide-react";
import { initialProgress } from "@/data/seed";
import { useProgress } from "@/lib/hooks";

export function MarkLessonComplete({ lessonId, xp }: { lessonId: string; xp: number }) {
  const { progress, markLessonComplete } = useProgress();
  const current = progress ?? initialProgress;
  const complete = current.completedLessonIds.includes(lessonId);

  return (
    <button
      disabled={complete}
      onClick={() => markLessonComplete(lessonId, xp)}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/45"
    >
      <CheckCircle2 size={18} />
      {complete ? "Lesson complete" : "Mark complete"}
    </button>
  );
}
