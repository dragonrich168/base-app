export const THEMES = ["dark", "light", "system"] as const;

export type Theme = (typeof THEMES)[number];
