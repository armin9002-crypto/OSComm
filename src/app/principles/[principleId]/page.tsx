import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons, principles } from "@/data/seed";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";

export function generateStaticParams() {
  return principles.map((principle) => ({ principleId: principle.id }));
}

export default async function PrincipleDetailPage({ params }: { params: Promise<{ principleId: string }> }) {
  const { principleId } = await params;
  const principle = principles.find((item) => item.id === principleId);

  if (!principle) notFound();

  const relatedLessons = lessons.filter((lesson) => principle.relatedLessonIds.includes(lesson.id));

  return (
    <>
      <PageHeader eyebrow={principle.difficulty} title={principle.title} description={principle.summary} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <Card>
          <CategoryPill category={principle.category} />
          <h2 className="mt-6 text-2xl font-semibold text-chalk">Principle</h2>
          <p className="mt-4 text-base leading-8 text-chalk/72">{principle.detail}</p>
        </Card>
        <Card className="h-fit">
          <h2 className="text-xl font-semibold text-chalk">Application</h2>
          <p className="mt-4 text-sm leading-7 text-muted">{principle.application}</p>
          <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Related Lessons</h3>
          <div className="mt-4 space-y-3">
            {relatedLessons.map((lesson) => (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block rounded-md border border-line bg-black/15 p-3 transition hover:border-gold/40">
                <p className="text-sm font-medium text-chalk">{lesson.title}</p>
                <p className="mt-1 text-xs text-muted">{lesson.category} · {lesson.readTime} min</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
