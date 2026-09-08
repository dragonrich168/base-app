export const TASK_STATUSES = ["backlog", "in_progress", "review", "done"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
