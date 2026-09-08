import type { Note } from "../types/note";

export const seedNotes: Note[] = [
  {
    id: "note_open",
    title: "Build in the open",
    body: "Keep the repository public. Ship small, readable commits. Write the next step in the workspace before closing the laptop.",
    pinned: true,
    createdAt: "2026-08-12T12:00:00.000Z",
    updatedAt: "2026-09-06T09:00:00.000Z",
  },
  {
    id: "note_stack",
    title: "Stack notes",
    body: "Vite, React, TypeScript. Local-first data in localStorage so the app runs anywhere without a backend.",
    pinned: false,
    createdAt: "2026-08-18T10:00:00.000Z",
    updatedAt: "2026-08-18T10:00:00.000Z",
  },
  {
    id: "note_next",
    title: "Next public slice",
    body: "Polish empty states, then add a changelog entry for every meaningful week of work.",
    pinned: false,
    createdAt: "2026-09-07T17:00:00.000Z",
    updatedAt: "2026-09-07T17:00:00.000Z",
  },
];
