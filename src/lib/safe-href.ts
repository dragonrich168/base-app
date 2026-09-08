export function isSafeHref(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}
