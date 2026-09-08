import { unique } from "./unique";

export function parseTags(value: string, max = 8): string[] {
  const tags = value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
  return unique(tags).slice(0, max);
}
