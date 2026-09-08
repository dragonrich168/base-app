import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { logger } from '../utils/logger';
import { isProduction } from '../config/env';

interface ErrorResponseBody {
  error: { message: string; statusCode: number; details?: unknown };
}

/**
 * Central error handler. Turns ApiError into a structured JSON response,
 * treats zod/body-parser errors as bad requests, and returns a generic 500
 * (with the stack hidden in production) for anything unexpected.
 */
export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof ApiError) {
    const body: ErrorResponseBody = {
      error: { message: error.message, statusCode: error.statusCode },
    };
    if (error.details !== undefined) body.error.details = error.details;
    res.status(error.statusCode).json(body);
    return;
  }

  // Body-parser JSON errors surface as SyntaxError with a status property.
  const status = (error as Error & { status?: number }).status;
  if (error instanceof SyntaxError && status === 400) {
    res.status(400).json({
      error: { message: 'Invalid JSON payload', statusCode: 400 },
    });
    return;
  }

  logger.error('unhandled error', { name: error.name, message: error.message, stack: error.stack });
  res.status(500).json({
    error: {
      message: isProduction ? 'Internal server error' : error.message,
      statusCode: 500,
    },
  });
}
