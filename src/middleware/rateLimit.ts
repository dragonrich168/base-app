import { rateLimit } from 'express-rate-limit';
import { rateLimitMax, rateLimitWindowMs, isTest } from '../config/env';

/**
 * Global per-IP rate limiter to protect the API from abuse. The limit is
 * disabled in tests so the integration suite can make many requests freely;
 * the window/max come from validated configuration.
 */
export const rateLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  limit: rateLimitMax,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => isTest,
  message: { error: { message: 'Too many requests, please try again later', statusCode: 429 } },
});
