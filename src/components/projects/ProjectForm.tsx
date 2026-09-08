import { useState, type FormEvent } from "react";
import { PROJECT_COLORS } from "../../constants/colors";
import { PROJECT_STATUS_LABELS } from "../../constants/labels";
import { LIMITS } from "../../constants/limits";
import { PROJECT_STATUSES } from "../../types/project-status";
import { parseTags } from "../../lib/parse-tags";
import { maxLength, required } from "../../lib/validate";
import type { Project } from "../../types/project";
import type { ProjectStatus } from "../../types/project-status";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";

interface ProjectFormProps {
  initial?: Project | null;
  onSubmit: (value: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? "planning");
  const [color, setColor] = useState(initial?.color ?? PROJECT_COLORS[0]);
  const [tagText, setTagText] = useState(initial?.tags.join(", ") ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const problem =
      required(name, "Name") ||
      maxLength(name, LIMITS.projectName, "Name") ||
      maxLength(description, LIMITS.projectDescription, "Description");
    if (problem) {
      setError(problem);
      return;
    }
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      status,
      color,
      tags: parseTags(tagText, LIMITS.tagsPerProject),
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Input id="project-name" label="Name" value={name} onChange={(event) => setName(event.target.value)} />
      <Textarea
        id="project-desc"
        label="Description"
        rows={3}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Select
        id="project-status"
        label="Status"
        value={status}
        onChange={(event) => setStatus(event.target.value as ProjectStatus)}
        options={PROJECT_STATUSES.map((value) => ({ value, label: PROJECT_STATUS_LABELS[value] }))}
      />
      <Input id="project-tags" label="Tags" value={tagText} onChange={(event) => setTagText(event.target.value)} />
      <div className="color-row">
        {PROJECT_COLORS.map((value) => (
          <button
            key={value}
            type="button"
            className={value === color ? "swatch is-active" : "swatch"}
            style={{ background: value }}
            onClick={() => setColor(value)}
            aria-label={value}
          />
        ))}
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="row-actions">
        <Button type="submit">{initial ? "Save project" : "Create project"}</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
