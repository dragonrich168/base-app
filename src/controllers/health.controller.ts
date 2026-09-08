import type { Request, Response } from 'express';

/** Basic liveness endpoint used by load balancers and uptime checks. */
export function healthHandler(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
