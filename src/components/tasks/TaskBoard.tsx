import { TASK_STATUS_LABELS } from "../../constants/labels";
import { TASK_STATUSES } from "../../types/task-status";
import { groupBy } from "../../lib/group-by";
import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import { EmptyState } from "../ui/EmptyState";
import { TaskItem } from "./TaskItem";

interface TaskBoardProps {
  tasks: Task[];
  projects: Project[];
  onEdit: (task: Task) => void;
  onRemove: (id: string) => void;
}

export function TaskBoard({ tasks, projects, onEdit, onRemove }: TaskBoardProps) {
  const grouped = groupBy(tasks, (task) => task.status);

  return (
    <div className="board">
      {TASK_STATUSES.map((status) => {
        const column = grouped[status] ?? [];
        return (
          <section key={status} className="board-column">
            <header>
              <h2>{TASK_STATUS_LABELS[status]}</h2>
              <span>{column.length}</span>
            </header>
            {column.length ? (
              column.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  projectName={projects.find((project) => project.id === task.projectId)?.name}
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ))
            ) : (
              <EmptyState title="Empty" body="Drop work here as it moves." />
            )}
          </section>
        );
      })}
    </div>
  );
}
