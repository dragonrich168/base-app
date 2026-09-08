import { seedNotes } from "../data/seed-notes";
import { seedProjects } from "../data/seed-projects";
import { seedTasks } from "../data/seed-tasks";

export function sampleWorkspaceSize(): number {
  return seedProjects.length + seedTasks.length + seedNotes.length;
}
