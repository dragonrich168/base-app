import type { ActivityItem } from "../types/activity";

export const seedActivity: ActivityItem[] = [
  {
    id: "act_1",
    kind: "system",
    message: "Workspace created as a public repository.",
    at: "2026-08-12T09:00:00.000Z",
  },
  {
    id: "act_2",
    kind: "project",
    message: "Project Northstar moved to active.",
    at: "2026-08-14T10:05:00.000Z",
  },
  {
    id: "act_3",
    kind: "task",
    message: "Shipped the public README task.",
    at: "2026-08-14T10:08:00.000Z",
  },
  {
    id: "act_4",
    kind: "note",
    message: "Pinned the build-in-the-open note.",
    at: "2026-09-06T09:01:00.000Z",
  },
  {
    id: "act_5",
    kind: "task",
    message: "Harbor task board marked in progress.",
    at: "2026-09-08T08:40:00.000Z",
  },
];
