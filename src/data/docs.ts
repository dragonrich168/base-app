import type { DocPage } from "../types/doc-page";

export const docs: DocPage[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary: "Run the workspace locally and start shipping public commits.",
    body: [
      "Install Node 20+, then run npm install and npm run dev.",
      "The app stores projects, tasks, and notes in your browser. Clearing site data resets the workspace to seed content.",
      "Use Overview to see counts, then add a project that matches what you are actually building this week.",
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    summary: "A small React app with typed domain modules and local storage.",
    body: [
      "Routes are split into marketing pages and the /app workspace shell.",
      "Domain types live under src/types. Storage keys and labels are constants, not magic strings.",
      "Hooks wrap localStorage so pages stay focused on layout and interaction.",
    ],
  },
  {
    slug: "workspace",
    title: "Workspace",
    summary: "Projects, tasks, notes, and a chronological activity feed.",
    body: [
      "Projects carry status, color, and tags. Tasks can optionally belong to a project.",
      "Notes support pinning. Activity is appended whenever you create or update records.",
      "Export JSON from Settings if you want a portable snapshot of the workspace.",
    ],
  },
  {
    slug: "building-in-public",
    title: "Building in public",
    summary: "Why this repository stays open.",
    body: [
      "Public commits are the changelog. Prefer small, named changes over silent dumps.",
      "Keep the default branch green by shipping working UI with every meaningful slice.",
      "If a change is user-facing, add a line to the in-app changelog.",
    ],
  },
];
