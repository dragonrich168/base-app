import { z } from 'zod';

/** Route param schema for resource ids (UUIDv4). */
export const IdParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});
