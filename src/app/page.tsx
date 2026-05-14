"use client";

import Link from "next/link";
import { Award, Brain, Flame, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { learningPaths, lessons } from "@/data/seed";
import { getLevel, getMasteryByCategory, getMasteryScore, getNextLesson } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  const { progress } = useProgress();
  const current = progress;

  if (!current) {
    return <div className="text-white/60">Loading Communication OS...</div>;
  }

  const nextLesson = getNextLesson(current);
  const recent = lessons.filter((lesson) => current.completedLessonIds.includes(lesson.id)).slice(-3).reverse();
  const mastery = getMasteryByCategory(current);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="A mastery system for clearer thinking in public."
        description="Train the principles behind attention, structure, persuasion, presence, and executive clarity."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Current Level" value={getLevel(current.xp)} detail="Built from XP and completed practice." icon={GraduationCap} />
        <StatCard label="XP" value={current.xp} detail="Earned through lessons, quizzes, and frameworks." icon={Sparkles} />
        <StatCard label="Streak" value={`${current.streak} days`} detail="Learning rhythm over intensity." icon={Flame} />
        <StatCard label="Completed" value={current.completedLessonIds.length} detail="Lessons marked complete." icon={Trophy} />
        <StatCard label="Mastery" value={`${getMasteryScore(current)}%`} detail="Average across core categories." icon={Brain} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Continue Learning</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-chalk">{nextLesson.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{nextLesson.preview}</p>
            </div>
            <Link
              href={`/lessons/${nextLesson.id}`}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gold"
            >
              Open lesson
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {learningPaths.slice(0, 3).map((path) => (
              <div key={path.id} className="rounded-lg border border-line bg-black/15 p-4">
                <p className="text-sm font-medium text-white">{path.title}</p>
                <p className="mt-2 text-xs text-white/45">{path.lessonIds.length} lessons</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Daily Lesson</p>
          <h2 className="mt-3 text-xl font-semibold text-chalk">Make the listener's job explicit.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Before adding nuance, tell the room what mental operation to perform: decide, compare, diagnose, or remember.
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-chalk">Progress by Category</h2>
          <div className="mt-5 space-y-5">
            {mastery.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted">{item.category}</span>
                  <span className="font-medium text-chalk">{item.value}%</span>
                </div>
                <ProgressBar value={item.value} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-chalk">Recently Completed</h2>
          <div className="mt-5 space-y-3">
            {recent.length ? (
              recent.map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block rounded-lg border border-line bg-white/[0.03] p-4 transition hover:border-gold/40">
                  <p className="font-medium text-white">{lesson.title}</p>
                  <p className="mt-1 text-sm text-white/50">{lesson.category} · {lesson.readTime} min</p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-white/58">Complete your first lesson to build a visible learning history.</p>
            )}
          </div>
          <div className="mt-5 rounded-lg border border-gold/20 bg-gold/10 p-4">
            <div className="flex gap-3">
              <Award className="mt-1 text-gold" size={18} />
              <p className="text-sm leading-6 text-white/70">
                Insight: powerful communicators do not merely simplify language. They simplify the listener's cognitive task.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
