import { formatDate } from "../../lib/format-date";
import { notePreview } from "../../lib/note-stats";
import { truncate } from "../../lib/truncate";
import type { Note } from "../../types/note";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onRemove: (id: string) => void;
  onPin: (note: Note) => void;
}

export function NoteCard({ note, onEdit, onRemove, onPin }: NoteCardProps) {
  return (
    <Card className="note-card">
      <div className="card-meta">
        <h3>{note.title}</h3>
        {note.pinned ? <Badge tone="mint">Pinned</Badge> : null}
      </div>
      <p>{truncate(notePreview(note.body), 160)}</p>
      <div className="card-meta">
        <span className="quiet">{formatDate(note.updatedAt)}</span>
        <div className="row-actions">
          <Button variant="ghost" onClick={() => onPin(note)}>
            {note.pinned ? "Unpin" : "Pin"}
          </Button>
          <Button variant="ghost" onClick={() => onEdit(note)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onRemove(note.id)}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}
