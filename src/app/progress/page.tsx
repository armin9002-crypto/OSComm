import { PageHeader } from "@/components/page-header";
import { ProgressTracker } from "@/components/progress-tracker";

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mastery Tracker"
        title="Track the invisible skills that make communication work."
        description="Progress combines lessons, quizzes, framework practice, badges, and mastery by category."
      />
      <ProgressTracker />
    </>
  );
}
