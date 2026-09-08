import type { Priority } from "../types/priority";

const RANK: Record<Priority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  urgent: 3,
};

export function priorityRank(priority: Priority): number {
  return RANK[priority];
}
