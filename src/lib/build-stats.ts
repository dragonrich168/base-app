import type { Note } from "../types/note";
import type { Project } from "../types/project";
import type { Stat } from "../types/stat";
import type { Task } from "../types/task";
import { activeProjectCount } from "./project-stats";
import { openTaskCount } from "./task-stats";
import { pinnedNotes } from "./note-stats";

export function buildStats(projects: Project[], tasks: Task[], notes: Note[]): Stat[] {
  return [
    {
      id: "projects",
      label: "Active projects",
      value: String(activeProjectCount(projects)),
      hint: `${projects.length} total`,
      tone: "accent",
    },
    {
      id: "tasks",
      label: "Open tasks",
      value: String(openTaskCount(tasks)),
      hint: `${tasks.length} total`,
      tone: "violet",
    },
    {
      id: "notes",
      label: "Pinned notes",
      value: String(pinnedNotes(notes).length),
      hint: `${notes.length} total`,
      tone: "mint",
    },
    {
      id: "shipped",
      label: "Shipped",
      value: String(projects.filter((project) => project.status === "shipped").length),
      hint: "Project status",
      tone: "amber",
    },
  ];
}
