import { useState, type FormEvent } from "react";
import { PRIORITY_LABELS, TASK_STATUS_LABELS } from "../../constants/labels";
import { LIMITS } from "../../constants/limits";
import { PRIORITIES } from "../../types/priority";
import { TASK_STATUSES } from "../../types/task-status";
import { maxLength, required } from "../../lib/validate";
import type { Priority } from "../../types/priority";
import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import type { TaskStatus } from "../../types/task-status";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";

interface TaskFormProps {
  projects: Project[];
  initial?: Task | null;
  onSubmit: (value: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function TaskForm({ projects, initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? "backlog");
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? "medium");
  const [projectId, setProjectId] = useState(initial?.projectId ?? "");
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const problem = required(title, "Title") || maxLength(title, LIMITS.taskTitle, "Title");
    if (problem) {
      setError(problem);
      return;
    }
    onSubmit({
      title: title.trim(),
      notes: notes.trim(),
      status,
      priority,
      projectId: projectId || null,
      dueDate: dueDate || null,
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Input id="task-title" label="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <Textarea id="task-notes" label="Notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} />
      <Select
        id="task-status"
        label="Status"
        value={status}
        onChange={(event) => setStatus(event.target.value as TaskStatus)}
        options={TASK_STATUSES.map((value) => ({ value, label: TASK_STATUS_LABELS[value] }))}
      />
      <Select
        id="task-priority"
        label="Priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
        options={PRIORITIES.map((value) => ({ value, label: PRIORITY_LABELS[value] }))}
      />
      <Select
        id="task-project"
        label="Project"
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        options={[{ value: "", label: "No project" }, ...projects.map((project) => ({ value: project.id, label: project.name }))]}
      />
      <Input id="task-due" label="Due date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      {error ? <p className="form-error">{error}</p> : null}
      <div className="row-actions">
        <Button type="submit">{initial ? "Save task" : "Create task"}</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
