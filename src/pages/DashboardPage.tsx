import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { QuickActions } from "../components/dashboard/QuickActions";
import { StatCard } from "../components/dashboard/StatCard";
import { PageHeader } from "../components/layout/PageHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useWorkspace } from "../hooks/useWorkspace";
import { buildStats } from "../lib/build-stats";

export function DashboardPage() {
  const { projects, tasks, notes, activity, settings } = useWorkspace();
  useDocumentTitle("Overview");
  const stats = buildStats(projects, tasks, notes);

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${settings.displayName}`}
        description={settings.tagline}
      />
      <div className="stat-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
      <QuickActions />
      {settings.showActivity ? <ActivityFeed items={activity.slice(0, 6)} /> : null}
    </div>
  );
}
