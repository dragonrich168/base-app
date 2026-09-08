/** Default and maximum page size for list endpoints. */
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export interface Page<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Slices an array into a page of results and returns pagination metadata.
 * Callers validate/clamp page and pageSize before invoking.
 */
export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return { data, page, pageSize, total, totalPages };
}
