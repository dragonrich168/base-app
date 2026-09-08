import { ROUTES } from "../constants/routes";
import type { NavItem } from "../types/nav";

export const appNav: NavItem[] = [
  { to: ROUTES.app, label: "Overview", icon: "grid", end: true },
  { to: ROUTES.projects, label: "Projects", icon: "layers" },
  { to: ROUTES.tasks, label: "Tasks", icon: "check" },
  { to: ROUTES.notes, label: "Notes", icon: "edit" },
  { to: ROUTES.activity, label: "Activity", icon: "pulse" },
  { to: ROUTES.settings, label: "Settings", icon: "sliders" },
];

export const marketingNav: NavItem[] = [
  { to: ROUTES.home, label: "Home", icon: "home", end: true },
  { to: ROUTES.docs, label: "Docs", icon: "book" },
  { to: ROUTES.changelog, label: "Changelog", icon: "list" },
  { to: ROUTES.about, label: "About", icon: "info" },
];
