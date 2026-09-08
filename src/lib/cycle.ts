export function cycle<T>(items: readonly T[], current: T): T {
  const index = items.indexOf(current);
  if (index === -1) return items[0];
  return items[(index + 1) % items.length];
}
