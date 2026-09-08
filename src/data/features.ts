export interface Feature {
  id: string;
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    id: "projects",
    title: "Projects with status",
    body: "Keep a living list of what is planning, active, paused, or already shipped.",
  },
  {
    id: "tasks",
    title: "A board that stays local",
    body: "Four columns, priorities, and optional project links — no account required.",
  },
  {
    id: "notes",
    title: "Pinned builder notes",
    body: "Capture decisions next to the work instead of losing them in a chat scrollback.",
  },
  {
    id: "public",
    title: "Built in the open",
    body: "The source is public. Every slice of the workspace is meant to be readable.",
  },
];
