"use client";

import Link from "next/link";
import { Check, Lock, PlayCircle } from "lucide-react";
import { initialProgress } from "@/data/seed";
import { getLessonStatus } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import type { Lesson } from "@/types";
import { CategoryPill } from "@/components/category-pill";

export function PathLessonList({ pathId, lessons }: { pathId: string; lessons: Lesson[] }) {
  const { progress } = useProgress();
  const current = progress ?? initialProgress;

  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => {
        const status = getLessonStatus(pathId, lesson.id, current);
        const Icon = status === "complete" ? Check : status === "locked" ? Lock : PlayCircle;
        const body = (
          <div className="rounded-lg border border-line bg-white/[0.04] p-5 transition hover:border-white/20">
            <div className="flex gap-4">
              <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-md border border-line bg-black/20 text-gold">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-white/42">Lesson {index + 1}</p>
                  <CategoryPill category={lesson.category} />
                  <span className="text-xs text-white/42">{lesson.readTime} min</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">{lesson.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/58">{lesson.preview}</p>
              </div>
            </div>
          </div>
        );

        return status === "locked" ? (
          <div key={lesson.id} className="opacity-55">{body}</div>
        ) : (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`}>{body}</Link>
        );
      })}
    </div>
  );
}
