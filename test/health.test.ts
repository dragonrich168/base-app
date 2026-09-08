import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/v1/health', () => {
  it('returns 200 with status ok and a timestamp', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
    expect(new Date(res.body.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('has security headers enabled via helmet', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.headers['x-powered-by']).toBeUndefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });
});

describe('GET /api/v1 (index)', () => {
  it('exposes service name and version', async () => {
    const res = await request(app).get('/api/v1/');

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('base-app');
    expect(typeof res.body.version).toBe('string');
  });
});
