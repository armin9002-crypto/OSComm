"use client";

import { initialProgress } from "@/data/seed";
import { getPathProgress } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import { ProgressBar } from "@/components/ui/progress-bar";

export function PathProgressCard({ pathId, lessonCount }: { pathId: string; lessonCount: number }) {
  const { progress } = useProgress();
  const current = progress ?? initialProgress;
  const value = getPathProgress(pathId, current);

  return (
    <div className="mt-7">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted">{lessonCount} lessons</span>
        <span className="font-medium text-chalk">{value}%</span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}
