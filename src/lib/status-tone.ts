import type { ProjectStatus } from "../types/project-status";
import type { TaskStatus } from "../types/task-status";

export function projectStatusTone(status: ProjectStatus): "accent" | "mint" | "amber" | "neutral" {
  if (status === "shipped") return "mint";
  if (status === "paused") return "amber";
  if (status === "active") return "accent";
  return "neutral";
}

export function taskStatusTone(status: TaskStatus): "neutral" | "accent" | "violet" | "mint" {
  if (status === "done") return "mint";
  if (status === "review") return "violet";
  if (status === "in_progress") return "accent";
  return "neutral";
}
