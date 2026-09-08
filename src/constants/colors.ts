export const PROJECT_COLORS = [
  "#5b8cff",
  "#7c5cff",
  "#3ee0a0",
  "#ffc14d",
  "#ff6b8a",
  "#5ad0ff",
  "#f0a36b",
  "#c9d4e5",
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];
