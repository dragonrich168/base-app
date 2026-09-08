import { PROJECT_STATUS_LABELS } from "../../constants/labels";
import { formatDate } from "../../lib/format-date";
import { projectProgress } from "../../lib/project-stats";
import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onEdit: (project: Project) => void;
  onRemove: (id: string) => void;
}

export function ProjectCard({ project, tasks, onEdit, onRemove }: ProjectCardProps) {
  const progress = projectProgress(project.id, tasks);

  return (
    <Card className="project-card">
      <div className="project-card-top">
        <span className="swatch" style={{ background: project.color }} />
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <Badge tone={project.status === "shipped" ? "mint" : "accent"}>{PROJECT_STATUS_LABELS[project.status]}</Badge>
      </div>
      <Progress value={progress} />
      <div className="chip-row">
        {project.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-meta">
        <span className="quiet">Updated {formatDate(project.updatedAt)}</span>
        <div className="row-actions">
          <Button variant="ghost" onClick={() => onEdit(project)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onRemove(project.id)}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}
