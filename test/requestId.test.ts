import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { REQUEST_ID_HEADER } from '../src/middleware/requestId';

const app = createApp();

describe('request id middleware', () => {
  it('generates a request id and echoes it on the response header', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.headers[REQUEST_ID_HEADER]).toBeDefined();
  });

  it('honors a caller-supplied request id', async () => {
    const res = await request(app).get('/api/v1/health').set(REQUEST_ID_HEADER, 'trace-abc-123');

    expect(res.headers[REQUEST_ID_HEADER]).toBe('trace-abc-123');
  });

  it('generates distinct ids for separate requests', async () => {
    const first = await request(app).get('/api/v1/health');
    const second = await request(app).get('/api/v1/health');

    expect(first.headers[REQUEST_ID_HEADER]).not.toBe(second.headers[REQUEST_ID_HEADER]);
  });
});
