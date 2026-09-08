export function groupBy<T, K extends string>(items: T[], getKey: (item: T) => K): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = getKey(item);
      acc[key] = acc[key] ?? [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}
