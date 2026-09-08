import type { Task } from "../types/task";
import type { TaskStatus } from "../types/task-status";
import { countBy } from "./count-by";

export function tasksByStatus(tasks: Task[]): Record<TaskStatus, number> {
  const counts = countBy(tasks, (task) => task.status);
  return {
    backlog: counts.backlog ?? 0,
    in_progress: counts.in_progress ?? 0,
    review: counts.review ?? 0,
    done: counts.done ?? 0,
  };
}

export function openTaskCount(tasks: Task[]): number {
  return tasks.filter((task) => task.status !== "done").length;
}
