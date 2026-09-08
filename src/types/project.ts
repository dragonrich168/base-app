import type { ProjectStatus } from "./project-status";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  color: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
