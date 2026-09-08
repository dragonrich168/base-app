import type { Project } from "../types/project";

export const seedProjects: Project[] = [
  {
    id: "proj_northstar",
    name: "Northstar",
    description: "Public landing and onboarding for the workspace.",
    status: "active",
    color: "#5b8cff",
    tags: ["web", "public"],
    createdAt: "2026-08-12T09:00:00.000Z",
    updatedAt: "2026-09-07T18:20:00.000Z",
  },
  {
    id: "proj_ledger",
    name: "Open Ledger",
    description: "Track shipped work and weekly builder notes.",
    status: "planning",
    color: "#7c5cff",
    tags: ["docs", "ops"],
    createdAt: "2026-08-20T11:30:00.000Z",
    updatedAt: "2026-09-06T14:12:00.000Z",
  },
  {
    id: "proj_harbor",
    name: "Harbor",
    description: "Task board and note capture for day-to-day building.",
    status: "active",
    color: "#3ee0a0",
    tags: ["product"],
    createdAt: "2026-08-28T16:00:00.000Z",
    updatedAt: "2026-09-08T08:40:00.000Z",
  },
];
