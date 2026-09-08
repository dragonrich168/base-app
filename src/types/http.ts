import type { Request } from 'express';
import type { z } from 'zod';

/**
 * Helpers used by route handlers to read already-validated data off the
 * request object (see the `validate` middleware).
 */

export type ZodSchema = z.ZodTypeAny;

export interface ValidatedRequest<B = unknown, Q = unknown> extends Request {
  body: B;
  query: Q & Request['query'];
  validatedBody: B;
  validatedQuery: Q;
}
