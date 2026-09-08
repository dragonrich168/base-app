import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { corsOrigins } from './config/env';
import { apiRoutes } from './routes';
import { requestId } from './middleware/requestId';
import { requestLogger } from './middleware/requestLogger';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

/**
 * Assembles and returns the configured Express application. Kept separate
 * from the server bootstrap so it can be imported directly by tests.
 */
export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: corsOrigins.includes('*') ? true : corsOrigins,
    }),
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(requestId);
  app.use(requestLogger);

  app.use('/api/v1', apiRoutes());

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
