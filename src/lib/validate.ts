export function required(value: string, label = "This field"): string | null {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

export function maxLength(value: string, max: number, label = "This field"): string | null {
  if (value.trim().length > max) return `${label} must be under ${max} characters.`;
  return null;
}
