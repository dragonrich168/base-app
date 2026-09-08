export const ROUTES = {
  home: "/",
  app: "/app",
  projects: "/app/projects",
  tasks: "/app/tasks",
  notes: "/app/notes",
  activity: "/app/activity",
  docs: "/docs",
  changelog: "/changelog",
  about: "/about",
  settings: "/app/settings",
} as const;

export type RouteKey = keyof typeof ROUTES;
