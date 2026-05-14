"use client";

import { initialProgress } from "@/data/seed";
import { getPathProgress } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import { ProgressBar } from "@/components/ui/progress-bar";

export function PathDetailProgress({ pathId, hours, lessonCount }: { pathId: string; hours: number; lessonCount: number }) {
  const { progress } = useProgress();
  const current = progress ?? initialProgress;
  const value = getPathProgress(pathId, current);

  return (
    <div>
      <div className="mb-3 flex justify-between text-sm">
        <span className="text-white/58">Path completion</span>
        <span className="text-white">{value}%</span>
      </div>
      <ProgressBar value={value} />
      <p className="mt-4 text-sm text-white/50">{hours} hours · {lessonCount} lessons</p>
    </div>
  );
}
