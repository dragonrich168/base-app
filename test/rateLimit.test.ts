import { describe, it, expect } from 'vitest';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import request from 'supertest';

describe('rate limiter middleware', () => {
  it('allows requests under the limit and blocks beyond it', async () => {
    // A standalone limiter with a tiny limit to exercise the 429 path, since
    // the app's real limiter is disabled under the test environment.
    const app = express();
    app.use(
      rateLimit({
        windowMs: 60_000,
        limit: 2,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: { error: { message: 'too many', statusCode: 429 } },
      }),
    );
    app.get('/ping', (_req, res) => res.send('pong'));

    await request(app).get('/ping');
    await request(app).get('/ping');

    const blocked = await request(app).get('/ping');
    expect(blocked.status).toBe(429);
    expect(blocked.body.error.statusCode).toBe(429);
  });
});
