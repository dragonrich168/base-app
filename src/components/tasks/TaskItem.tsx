import { PRIORITY_LABELS } from "../../constants/labels";
import type { Task } from "../../types/task";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const priorityTone = {
  low: "neutral",
  medium: "accent",
  high: "amber",
  urgent: "rose",
} as const;

interface TaskItemProps {
  task: Task;
  projectName?: string;
  onEdit: (task: Task) => void;
  onRemove: (id: string) => void;
}

export function TaskItem({ task, projectName, onEdit, onRemove }: TaskItemProps) {
  return (
    <article className="task-item">
      <div>
        <h3>{task.title}</h3>
        {task.notes ? <p>{task.notes}</p> : null}
        <div className="chip-row">
          <Badge tone={priorityTone[task.priority]}>{PRIORITY_LABELS[task.priority]}</Badge>
          {projectName ? <span className="chip">{projectName}</span> : null}
        </div>
      </div>
      <div className="row-actions">
        <Button variant="ghost" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onRemove(task.id)}>
          Remove
        </Button>
      </div>
    </article>
  );
}
