import type { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

/**
 * Logs every incoming request and the response status with timing. Includes
 * the correlation id assigned by the requestId middleware, if present.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startedAt = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    logger.info('request completed', {
      requestId: res.locals.requestId as string | undefined,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
    });
  });

  next();
}
