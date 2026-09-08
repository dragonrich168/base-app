import { createContext } from "react";
import type { ActivityItem } from "../types/activity";
import type { Note } from "../types/note";
import type { Project } from "../types/project";
import type { AppSettings } from "../types/settings";
import type { Task } from "../types/task";
import { defaultSettings } from "../config/defaults";

export interface WorkspaceState {
  projects: Project[];
  tasks: Task[];
  notes: Note[];
  activity: ActivityItem[];
  settings: AppSettings;
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  removeNote: (id: string) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetWorkspace: () => void;
}

export const WorkspaceContext = createContext<WorkspaceState>({
  projects: [],
  tasks: [],
  notes: [],
  activity: [],
  settings: defaultSettings,
  addProject: () => undefined,
  updateProject: () => undefined,
  removeProject: () => undefined,
  addTask: () => undefined,
  updateTask: () => undefined,
  removeTask: () => undefined,
  addNote: () => undefined,
  updateNote: () => undefined,
  removeNote: () => undefined,
  updateSettings: () => undefined,
  resetWorkspace: () => undefined,
});
