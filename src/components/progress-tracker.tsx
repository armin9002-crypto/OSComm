"use client";

import { Award, BarChart3, Boxes, Flame, GraduationCap, Target } from "lucide-react";
import { badges, initialProgress, lessons } from "@/data/seed";
import { getEarnedBadges, getLevel, getLevelProgress, getMasteryByCategory } from "@/lib/progress";
import { useProgress } from "@/lib/hooks";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";

export function ProgressTracker() {
  const { progress } = useProgress();
  const current = progress ?? initialProgress;
  const mastery = getMasteryByCategory(current);
  const earnedBadges = getEarnedBadges(current);
  const quizTotal = current.quizAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const quizScore = current.quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const accuracy = quizTotal ? Math.round((quizScore / quizTotal) * 100) : 0;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Level" value={getLevel(current.xp)} detail={`${getLevelProgress(current.xp)}% toward next level`} icon={GraduationCap} />
        <StatCard label="Streak" value={`${current.streak} days`} detail="Consistency signal" icon={Flame} />
        <StatCard label="Lessons" value={`${current.completedLessonIds.length}/${lessons.length}`} detail="Completed lessons" icon={Target} />
        <StatCard label="Quiz Accuracy" value={`${accuracy}%`} detail="Across attempts" icon={BarChart3} />
        <StatCard label="Frameworks" value={current.completedFrameworkIds.length} detail="Completed structures" icon={Boxes} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <Card>
          <h2 className="text-xl font-semibold text-white">Mastery by Category</h2>
          <div className="mt-6 space-y-6">
            {mastery.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/70">{item.category} mastery</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <ProgressBar value={item.value} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Award className="text-gold" size={20} />
            <h2 className="text-xl font-semibold text-white">Badges Earned</h2>
          </div>
          <div className="mt-5 space-y-3">
            {badges.map((badge) => {
              const earned = earnedBadges.some((item) => item.id === badge.id);
              return (
                <div key={badge.id} className={`rounded-lg border p-4 ${earned ? "border-gold/35 bg-gold/10" : "border-line bg-white/[0.03] opacity-55"}`}>
                  <p className="font-medium text-white">{badge.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}
