import type { Note } from "../types/note";

export function pinnedNotes(notes: Note[]): Note[] {
  return notes.filter((note) => note.pinned);
}

export function notePreview(body: string): string {
  const line = body.split("\n").map((part) => part.trim()).find(Boolean);
  return line ?? "Empty note";
}
