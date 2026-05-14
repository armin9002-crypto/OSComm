import { DashboardProgress } from "@/components/dashboard-progress";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="A mastery system for clearer thinking in public."
        description="Train the principles behind attention, structure, persuasion, presence, and executive clarity."
      />
      <DashboardProgress />
    </>
  );
}
