import { useState, type FormEvent } from "react";
import { LIMITS } from "../../constants/limits";
import { maxLength, required } from "../../lib/validate";
import type { Note } from "../../types/note";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Toggle } from "../ui/Toggle";

interface NoteFormProps {
  initial?: Note | null;
  onSubmit: (value: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function NoteForm({ initial, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const problem =
      required(title, "Title") ||
      maxLength(title, LIMITS.noteTitle, "Title") ||
      maxLength(body, LIMITS.noteBody, "Body");
    if (problem) {
      setError(problem);
      return;
    }
    onSubmit({ title: title.trim(), body: body.trim(), pinned });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Input id="note-title" label="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <Textarea id="note-body" label="Body" rows={8} value={body} onChange={(event) => setBody(event.target.value)} />
      <Toggle label="Pin this note" checked={pinned} onChange={setPinned} />
      {error ? <p className="form-error">{error}</p> : null}
      <div className="row-actions">
        <Button type="submit">{initial ? "Save note" : "Create note"}</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
