import type { Request } from 'express';
import type { z } from 'zod';

export type ZodSchema = z.ZodTypeAny;

/**
 * Reads a value that the `validate` middleware stored on the request.
 * Route handlers use these helpers to receive clean, already-parsed,
 * strongly-typed payloads without fighting Express's handler typing.
 */
export function validatedBody<T>(req: Request): T {
  return (req as Request & { validatedBody: T }).validatedBody;
}

export function validatedQuery<T>(req: Request): T {
  return (req as Request & { validatedQuery: T }).validatedQuery;
}
