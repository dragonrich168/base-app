import type { Project } from "../types/project";
import type { Task } from "../types/task";
import { percent } from "./percent";

export function projectProgress(projectId: string, tasks: Task[]): number {
  const related = tasks.filter((task) => task.projectId === projectId);
  const done = related.filter((task) => task.status === "done").length;
  return percent(done, related.length);
}

export function activeProjectCount(projects: Project[]): number {
  return projects.filter((project) => project.status === "active").length;
}
