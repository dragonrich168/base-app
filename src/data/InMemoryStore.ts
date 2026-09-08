import { randomUUID } from 'node:crypto';

export interface StoredRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * A tiny in-memory key/value store used as a stand-in for a real database.
 * Replace this with an actual persistence layer (Postgres, Mongo, etc.)
 * without changing the public API of the services that consume it.
 */
export class InMemoryStore<T extends StoredRecord> {
  private readonly records = new Map<string, T>();

  create(data: Omit<T, keyof StoredRecord>): T {
    const now = new Date().toISOString();
    const record = { ...data, id: randomUUID(), createdAt: now, updatedAt: now } as T;
    this.records.set(record.id, record);
    return record;
  }

  findAll(): T[] {
    return Array.from(this.records.values());
  }

  findById(id: string): T | undefined {
    return this.records.get(id);
  }

  update(id: string, patch: Partial<Omit<T, keyof StoredRecord>>): T | undefined {
    const existing = this.records.get(id);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...patch,
      updatedAt: new Date().toISOString(),
    } as T;
    this.records.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.records.delete(id);
  }

  clear(): void {
    this.records.clear();
  }

  get size(): number {
    return this.records.size;
  }
}
