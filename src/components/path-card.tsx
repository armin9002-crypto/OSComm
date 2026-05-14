import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { LearningPath } from "@/types";
import { PathProgressCard } from "@/components/path-progress-card";

export function PathCard({ path }: { path: LearningPath }) {
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
        <PathProgressCard pathId={path.id} lessonCount={path.lessonIds.length} />
      </Card>
    </Link>
  );
}
