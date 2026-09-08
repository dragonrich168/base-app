import type { ActivityKind } from "./activity-kind";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  message: string;
  at: string;
}
