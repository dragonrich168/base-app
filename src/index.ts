import { createApp } from './app';
import { env, isProduction } from './config/env';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(env.PORT, env.HOST, () => {
  logger.info(`base-app listening on http://${env.HOST}:${env.PORT}`, {
    environment: env.NODE_ENV,
    mode: isProduction ? 'production' : 'development',
  });
});

function shutdown(signal: string): void {
  logger.info(`received ${signal}, shutting down gracefully`);
  server.close(() => {
    logger.info('server closed');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
