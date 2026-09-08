export function countBy<T, K extends string>(items: T[], getKey: (item: T) => K): Record<K, number> {
  return items.reduce(
    (acc, item) => {
      const key = getKey(item);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<K, number>,
  );
}
