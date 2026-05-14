"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { lessons, principles } from "@/data/seed";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";

export default function LessonDetailPage() {
  const params = useParams<{ lessonId: string }>();
  const { progress, markLessonComplete } = useProgress();
  const lesson = lessons.find((item) => item.id === params.lessonId);

  if (!lesson) notFound();

  const related = principles.filter((principle) => lesson.relatedPrincipleIds.includes(principle.id));
  const complete = progress?.completedLessonIds.includes(lesson.id) ?? false;

  return (
    <>
      <PageHeader eyebrow={`${lesson.category} · ${lesson.readTime} min`} title={lesson.title} description={lesson.preview} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <article className="space-y-6">
          <Card>
            <CategoryPill category={lesson.category} />
            <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-chalk/78">
              {lesson.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          {[
            ["Why it matters", lesson.whyItMatters],
            ["Real-world example", lesson.realWorldExample],
            ["Common mistake", lesson.commonMistake],
            ["Key takeaway", lesson.keyTakeaway],
            ["Reflection prompt", lesson.reflectionPrompt]
          ].map(([title, body]) => (
            <Card key={title}>
              <h2 className="text-xl font-semibold text-chalk">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
            </Card>
          ))}
        </article>

        <aside className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-white">Completion</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Marking this lesson complete awards {lesson.xp} XP and may unlock the next lesson in the path.
            </p>
            <button
              disabled={complete || !progress}
              onClick={() => markLessonComplete(lesson.id, lesson.xp)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gold disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/45"
            >
              <CheckCircle2 size={18} />
              {complete ? "Lesson complete" : "Mark complete"}
            </button>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-white">Related Principles</h2>
            <div className="mt-5 space-y-3">
              {related.map((principle) => (
                <Link key={principle.id} href={`/principles/${principle.id}`} className="block rounded-md border border-line bg-black/15 p-4 transition hover:border-gold/40">
                  <p className="font-medium text-white">{principle.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{principle.summary}</p>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
