"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Check, Lock, PlayCircle } from "lucide-react";
import { learningPaths, lessons } from "@/data/seed";
import { getLessonStatus, getPathProgress } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";

export default function PathDetailPage() {
  const params = useParams<{ pathId: string }>();
  const { progress } = useProgress();
  const path = learningPaths.find((item) => item.id === params.pathId);

  if (!path) notFound();
  if (!progress) return <div className="text-white/60">Loading path...</div>;

  const pathLessons = path.lessonIds.map((id) => lessons.find((lesson) => lesson.id === id)).filter(Boolean);
  const value = getPathProgress(path.id, progress);

  return (
    <>
      <PageHeader eyebrow={path.difficulty} title={path.title} description={path.description} />
      <Card className="mb-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <CategoryPill category={path.category} />
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/64">
              This path is designed as a progression, not a playlist. Complete lessons in order to unlock the next layer of communication judgment.
            </p>
          </div>
          <div>
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-white/58">Path completion</span>
              <span className="text-white">{value}%</span>
            </div>
            <ProgressBar value={value} />
            <p className="mt-4 text-sm text-white/50">{path.estimatedHours} hours · {path.lessonIds.length} lessons</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <div className="space-y-3">
          {pathLessons.map((lesson, index) => {
            if (!lesson) return null;
            const status = getLessonStatus(path.id, lesson.id, progress);
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

        <Card className="h-fit">
          <h2 className="text-xl font-semibold text-white">Milestones</h2>
          <div className="mt-5 space-y-3">
            {path.milestones.map((milestone) => (
              <div key={milestone} className="rounded-md border border-line bg-black/15 px-4 py-3 text-sm text-white/68">
                {milestone}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
