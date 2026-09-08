import { useMemo, useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectForm } from "../components/projects/ProjectForm";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { useDebounce } from "../hooks/useDebounce";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useToast } from "../hooks/useToast";
import { useWorkspace } from "../hooks/useWorkspace";
import { matchesQuery } from "../lib/search";
import type { Project } from "../types/project";

export function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, removeProject } = useWorkspace();
  const { pushToast } = useToast();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const debounced = useDebounce(query);
  useDocumentTitle("Projects");

  const visible = useMemo(
    () => projects.filter((project) => matchesQuery(`${project.name} ${project.description} ${project.tags.join(" ")}`, debounced)),
    [projects, debounced],
  );

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Projects"
        title="What you are building"
        description="Status, tags, and progress from linked tasks."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            New project
          </Button>
        }
      />
      <Input id="project-search" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />
      {visible.length ? (
        <div className="card-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks}
              onEdit={(item) => {
                setEditing(item);
                setOpen(true);
              }}
              onRemove={(id) => {
                removeProject(id);
                pushToast("Project removed", "warn");
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects" body="Create one to start the public log." />
      )}
      <Modal open={open} title={editing ? "Edit project" : "New project"} onClose={() => setOpen(false)}>
        <ProjectForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSubmit={(value) => {
            if (editing) {
              updateProject(editing.id, value);
              pushToast("Project updated", "success");
            } else {
              addProject(value);
              pushToast("Project created", "success");
            }
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
