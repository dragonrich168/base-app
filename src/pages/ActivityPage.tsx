import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { PageHeader } from "../components/layout/PageHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useWorkspace } from "../hooks/useWorkspace";

export function ActivityPage() {
  const { activity } = useWorkspace();
  useDocumentTitle("Activity");

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Activity"
        title="A public log of workspace changes"
        description="Creates, updates, and removals stay on this device until you reset."
      />
      <ActivityFeed items={activity} />
    </div>
  );
}
