import { useMemo, useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { NoteCard } from "../components/notes/NoteCard";
import { NoteForm } from "../components/notes/NoteForm";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Modal } from "../components/ui/Modal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useToast } from "../hooks/useToast";
import { useWorkspace } from "../hooks/useWorkspace";
import { sortBy } from "../lib/sort-by";
import type { Note } from "../types/note";

export function NotesPage() {
  const { notes, addNote, updateNote, removeNote } = useWorkspace();
  const { pushToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  useDocumentTitle("Notes");

  const ordered = useMemo(
    () => sortBy(notes, (note) => `${note.pinned ? "0" : "1"}-${note.updatedAt}`, "asc"),
    [notes],
  );

  return (
    <div className="stack-lg">
      <PageHeader
        eyebrow="Notes"
        title="Decisions next to the work"
        description="Pin the notes you want at the top of the stack."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            New note
          </Button>
        }
      />
      {ordered.length ? (
        <div className="card-grid">
          {ordered.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(item) => {
                setEditing(item);
                setOpen(true);
              }}
              onPin={(item) => updateNote(item.id, { pinned: !item.pinned })}
              onRemove={(id) => {
                removeNote(id);
                pushToast("Note removed", "warn");
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No notes" body="Write the first decision while it is still sharp." />
      )}
      <Modal open={open} title={editing ? "Edit note" : "New note"} onClose={() => setOpen(false)}>
        <NoteForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSubmit={(value) => {
            if (editing) {
              updateNote(editing.id, value);
              pushToast("Note updated", "success");
            } else {
              addNote(value);
              pushToast("Note created", "success");
            }
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
