export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  items: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2026-09-08",
    title: "Public workspace",
    items: [
      "Landing page, docs, and about.",
      "Local-first projects, tasks, and notes.",
      "Activity feed, settings, and JSON export.",
    ],
  },
];
