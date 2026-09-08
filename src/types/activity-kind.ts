export const ACTIVITY_KINDS = ["project", "task", "note", "system"] as const;

export type ActivityKind = (typeof ACTIVITY_KINDS)[number];
