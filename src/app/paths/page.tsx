"use client";

import { learningPaths } from "@/data/seed";
import { useProgress } from "@/lib/hooks";
import { PageHeader } from "@/components/page-header";
import { PathCard } from "@/components/path-card";

export default function PathsPage() {
  const { progress } = useProgress();

  if (!progress) return <div className="text-white/60">Loading paths...</div>;

  return (
    <>
      <PageHeader
        eyebrow="Learning Paths"
        title="Six disciplines for communication mastery."
        description="Each path is sequenced as a practice arc: principle, interpretation, application, and reinforcement."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <PathCard key={path.id} path={path} progress={progress} />
        ))}
      </div>
    </>
  );
}
