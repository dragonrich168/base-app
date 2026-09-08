import { InMemoryStore } from '../data/InMemoryStore';
import { ApiError } from '../errors/ApiError';
import type { Item, CreateItemInput, UpdateItemInput } from '../types/item';
import { paginate, type Page } from '../utils/pagination';

interface ItemRecord extends Item {}

export interface ItemListQuery {
  page: number;
  pageSize: number;
}

/**
 * Business logic for items. The controller is deliberately thin and delegates
 * everything here, keeping persistence concerns out of the HTTP layer.
 */
export class ItemService {
  private readonly store = new InMemoryStore<ItemRecord>();

  list(query: ItemListQuery): Page<Item> {
    const items = this.store.findAll();
    return paginate(items, query.page, query.pageSize);
  }

  get(id: string): Item {
    const item = this.store.findById(id);
    if (!item) throw ApiError.notFound(`Item '${id}' was not found`);
    return item;
  }

  create(input: CreateItemInput): Item {
    return this.store.create(input);
  }

  update(id: string, input: UpdateItemInput): Item {
    const updated = this.store.update(id, input);
    if (!updated) throw ApiError.notFound(`Item '${id}' was not found`);
    return updated;
  }

  remove(id: string): void {
    const deleted = this.store.delete(id);
    if (!deleted) throw ApiError.notFound(`Item '${id}' was not found`);
  }
}

/** Shared singleton so all routes/tests talk to the same store. */
export const itemService = new ItemService();
