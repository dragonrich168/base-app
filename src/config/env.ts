import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Central, validated configuration.
 * Every setting the app reads from the environment lives here so the rest of
 * the codebase never reaches into process.env directly.
 */

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().min(1).default('0.0.0.0'),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),
  CORS_ORIGINS: z.string().default('*'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Fail fast with a readable message instead of running with bad settings.
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;

/** Comma-separated list of allowed CORS origins, or ['*'] for all. */
export const corsOrigins: string[] =
  env.CORS_ORIGINS === '*' ? ['*'] : env.CORS_ORIGINS.split(',').map((origin) => origin.trim());

export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
