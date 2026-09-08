import { describe, it, expect, beforeEach } from 'vitest';
import { ItemService } from '../src/services/item.service';
import { ApiError } from '../src/errors/ApiError';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    service = new ItemService();
  });

  describe('create', () => {
    it('creates an item with generated fields', () => {
      const item = service.create({ name: 'alpha' });

      expect(item.name).toBe('alpha');
      expect(item.id).toMatch(/^[0-9a-f-]{36}$/);
      expect(item.createdAt).toBe(item.updatedAt);
    });
  });

  describe('list', () => {
    it('returns an empty list initially', () => {
      expect(service.list()).toEqual([]);
    });

    it('returns all created items', () => {
      service.create({ name: 'alpha' });
      service.create({ name: 'beta' });

      expect(service.list()).toHaveLength(2);
    });
  });

  describe('get', () => {
    it('returns an existing item', () => {
      const created = service.create({ name: 'alpha' });
      const found = service.get(created.id);

      expect(found.id).toBe(created.id);
    });

    it('throws a not-found ApiError for a missing item', () => {
      expect(() => service.get('does-not-exist')).toThrow(ApiError);
      expect(() => service.get('does-not-exist')).toThrowError(/not found/i);
    });
  });

  describe('update', () => {
    it('updates name and bumps updatedAt', async () => {
      const created = service.create({ name: 'alpha' });
      await new Promise((r) => setTimeout(r, 5)); // ensure timestamps differ
      const updated = service.update(created.id, { name: 'renamed' });

      expect(updated!.name).toBe('renamed');
      expect(updated!.updatedAt > created.updatedAt).toBe(true);
    });

    it('throws for a missing item', () => {
      expect(() => service.update('nope', { name: 'x' })).toThrow(ApiError);
    });
  });

  describe('remove', () => {
    it('deletes an existing item', () => {
      const created = service.create({ name: 'alpha' });
      service.remove(created.id);

      expect(service.list()).toHaveLength(0);
    });

    it('throws for a missing item', () => {
      expect(() => service.remove('nope')).toThrow(ApiError);
    });
  });
});
