import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

/**
 * 404 handler for any route that did not match an existing definition.
 */
export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  next(ApiError.notFound('Route not found'));
}
