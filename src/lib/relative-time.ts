export function relativeTime(iso: string): string {
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  if (Number.isNaN(date.getTime())) return "unknown";

  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d ago`;

  return date.toLocaleDateString();
}
