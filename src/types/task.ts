import type { Priority } from "./priority";
import type { TaskStatus } from "./task-status";

export interface Task {
  id: string;
  projectId: string | null;
  title: string;
  notes: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
