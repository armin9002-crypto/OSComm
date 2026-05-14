import { notFound } from "next/navigation";
import { learningPaths, lessons } from "@/data/seed";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CategoryPill } from "@/components/category-pill";
import { PathDetailProgress } from "@/components/path-detail-progress";
import { PathLessonList } from "@/components/path-lesson-list";

export function generateStaticParams() {
  return learningPaths.map((path) => ({ pathId: path.id }));
}

export default async function PathDetailPage({ params }: { params: Promise<{ pathId: string }> }) {
  const { pathId } = await params;
  const path = learningPaths.find((item) => item.id === pathId);

  if (!path) notFound();

  const pathLessons = path.lessonIds
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));

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
          <PathDetailProgress pathId={path.id} hours={path.estimatedHours} lessonCount={path.lessonIds.length} />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <PathLessonList pathId={path.id} lessons={pathLessons} />

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
