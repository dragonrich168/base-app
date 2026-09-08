import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export const REQUEST_ID_HEADER = 'x-request-id';

/**
 * Attaches a correlation id to every request. Honors an id supplied by the
 * caller (useful for tracing across services) or generates one, then exposes
 * it on the response header and in res.locals for the logger to pick up.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header(REQUEST_ID_HEADER);
  const id = incoming && incoming.length > 0 && incoming.length <= 64 ? incoming : randomUUID();

  res.locals.requestId = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}
