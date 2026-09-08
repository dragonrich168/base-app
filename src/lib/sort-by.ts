export function sortBy<T>(items: T[], getValue: (item: T) => string | number, dir: "asc" | "desc" = "asc"): T[] {
  const copy = [...items];
  copy.sort((a, b) => {
    const av = getValue(a);
    const bv = getValue(b);
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
  return copy;
}
