import { describe, it, expect } from 'vitest';
import { paginate } from '../src/utils/pagination';

const items = ['a', 'b', 'c', 'd', 'e'];

describe('paginate', () => {
  it('returns metadata for an empty list', () => {
    const page = paginate([], 1, 20);
    expect(page.data).toEqual([]);
    expect(page.total).toBe(0);
    expect(page.totalPages).toBe(1);
  });

  it('slices the requested page', () => {
    const page = paginate(items, 2, 2);
    expect(page.data).toEqual(['c', 'd']);
    expect(page.page).toBe(2);
    expect(page.pageSize).toBe(2);
  });

  it('reports total pages', () => {
    const page = paginate(items, 1, 2);
    expect(page.totalPages).toBe(3);
  });

  it('returns an empty page past the end', () => {
    const page = paginate(items, 10, 2);
    expect(page.data).toEqual([]);
  });
});
