import { env, isTest } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const threshold = ORDER[isTest ? 'error' : env.NODE_ENV === 'production' ? 'info' : 'debug'];

function write(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  if (ORDER[level] < threshold) return;

  const line = {
    ts: new Date().toISOString(),
    level,
    msg: message,
    ...meta,
  };

  const out = env.NODE_ENV === 'production' ? JSON.stringify(line) : pretty(line);
  const stream = level === 'error' ? console.error : console.log;
  stream(out);
}

function pretty(line: Record<string, unknown>): string {
  const { ts, level, msg, ...rest } = line;
  const meta = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : '';
  return `${ts} [${String(level).toUpperCase()}] ${msg}${meta}`;
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => write('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
};
