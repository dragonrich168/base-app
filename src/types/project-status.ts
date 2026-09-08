export const PROJECT_STATUSES = ["planning", "active", "paused", "shipped"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
