export function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalizeQuery(query);
  if (!q) return true;
  return haystack.toLowerCase().includes(q);
}
