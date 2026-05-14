import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons, principles } from "@/data/seed";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";
import { MarkLessonComplete } from "@/components/mark-lesson-complete";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function LessonDetailPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) notFound();

  const related = principles.filter((principle) => lesson.relatedPrincipleIds.includes(principle.id));

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
            <MarkLessonComplete lessonId={lesson.id} xp={lesson.xp} />
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
