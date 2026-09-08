import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { TaskBoard } from "../components/tasks/TaskBoard";
import { TaskForm } from "../components/tasks/TaskForm";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useToast } from "../hooks/useToast";
import { useWorkspace } from "../hooks/useWorkspace";
import type { Task } from "../types/task";

export function TasksPage() {
  const { tasks, projects, addTask, updateTask, removeTask } = useWorkspace();
  const { pushToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  useDocumentTitle("Tasks");

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Tasks"
        title="Move work across the board"
        description="Backlog through done. Keep titles short enough to read at a glance."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            New task
          </Button>
        }
      />
      <TaskBoard
        tasks={tasks}
        projects={projects}
        onEdit={(task) => {
          setEditing(task);
          setOpen(true);
        }}
        onRemove={(id) => {
          removeTask(id);
          pushToast("Task removed", "warn");
        }}
      />
      <Modal open={open} title={editing ? "Edit task" : "New task"} onClose={() => setOpen(false)}>
        <TaskForm
          projects={projects}
          initial={editing}
          onCancel={() => setOpen(false)}
          onSubmit={(value) => {
            if (editing) {
              updateTask(editing.id, value);
              pushToast("Task updated", "success");
            } else {
              addTask(value);
              pushToast("Task created", "success");
            }
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
