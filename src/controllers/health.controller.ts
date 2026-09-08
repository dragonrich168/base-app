import type { Request, Response } from 'express';
import { meta } from '../config/meta';

/** Basic liveness endpoint used by load balancers and uptime checks. */
export function healthHandler(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'ok',
    name: meta.name,
    version: meta.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
