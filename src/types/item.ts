import { z } from 'zod';

/** Public shape of an item exposed by the API. */
export interface Item {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/** Zod schema for creating an item. */
export const CreateItemSchema = z.object({
  name: z.string().min(1).max(120),
});

export type CreateItemInput = z.infer<typeof CreateItemSchema>;

/** Zod schema for updating an item. */
export const UpdateItemSchema = z.object({
  name: z.string().min(1).max(120),
});

export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
