"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { LearningPath, UserProgress } from "@/types";
import { getPathProgress } from "@/lib/progress";

export function PathCard({ path, progress }: { path: LearningPath; progress: UserProgress }) {
  const value = getPathProgress(path.id, progress);

  return (
    <Link href={`/paths/${path.id}`} className="group block">
      <Card className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              {path.difficulty}
            </span>
            <ArrowUpRight className="text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" size={19} />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-chalk">{path.title}</h2>
          <p className="mt-3 min-h-20 text-sm leading-6 text-muted">{path.description}</p>
        </div>
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-muted">{path.lessonIds.length} lessons</span>
            <span className="font-medium text-chalk">{value}%</span>
          </div>
          <ProgressBar value={value} />
        </div>
      </Card>
    </Link>
  );
}
