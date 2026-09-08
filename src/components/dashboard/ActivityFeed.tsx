import { relativeTime } from "../../lib/relative-time";
import type { ActivityItem } from "../../types/activity";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";

const tones = {
  project: "accent",
  task: "violet",
  note: "mint",
  system: "neutral",
} as const;

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (!items.length) {
    return <EmptyState title="No activity yet" body="Create a project, task, or note to start the public log." />;
  }

  return (
    <Card className="stack">
      {items.map((item) => (
        <div key={item.id} className="activity-row">
          <Badge tone={tones[item.kind]}>{item.kind}</Badge>
          <p>{item.message}</p>
          <span className="quiet">{relativeTime(item.at)}</span>
        </div>
      ))}
    </Card>
  );
}
