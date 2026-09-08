import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { itemRoutes } from './item.routes';

/**
 * Top-level API router. New resource groups should be mounted here, e.g.
 * router.use('/widgets', widgetRoutes());
 */
export function apiRoutes(): Router {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({ name: 'base-app', version: '0.1.0' });
  });

  router.use('/health', healthRoutes());
  router.use('/items', itemRoutes());

  return router;
}
