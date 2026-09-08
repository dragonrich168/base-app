import type { ActivityItem } from "../types/activity";
import type { ActivityKind } from "../types/activity-kind";
import { LIMITS } from "../constants/limits";
import { createId } from "./id";
import { nowIso } from "./now";
import { sortBy } from "./sort-by";

export function appendActivity(items: ActivityItem[], kind: ActivityKind, message: string): ActivityItem[] {
  const next: ActivityItem = {
    id: createId("act"),
    kind,
    message,
    at: nowIso(),
  };
  return sortBy([next, ...items], (item) => item.at, "desc").slice(0, LIMITS.recentActivity);
}
