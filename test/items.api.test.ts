import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { itemService } from '../src/services/item.service';

const app = createApp();

describe('Items REST API', () => {
  beforeEach(() => {
    // Each test starts from an empty store.
    itemService.list().forEach((item) => itemService.remove(item.id));
  });

  describe('POST /api/v1/items', () => {
    it('creates an item and returns 201', async () => {
      const res = await request(app).post('/api/v1/items').send({ name: 'created via api' });

      expect(res.status).toBe(201);
      expect(res.body.item.name).toBe('created via api');
      expect(res.body.item.id).toBeDefined();
    });

    it('rejects an empty name with 400 and field details', async () => {
      const res = await request(app).post('/api/v1/items').send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body.error.statusCode).toBe(400);
      expect(res.body.error.details[0].field).toBe('name');
    });

    it('rejects a missing name with 400', async () => {
      const res = await request(app).post('/api/v1/items').send({});

      expect(res.status).toBe(400);
    });

    it('rejects malformed JSON with 400', async () => {
      const res = await request(app)
        .post('/api/v1/items')
        .set('Content-Type', 'application/json')
        .send('{"name":');

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/v1/items', () => {
    it('lists items', async () => {
      await request(app).post('/api/v1/items').send({ name: 'one' });
      await request(app).post('/api/v1/items').send({ name: 'two' });

      const res = await request(app).get('/api/v1/items');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(2);
    });
  });

  describe('GET /api/v1/items/:id', () => {
    it('returns a single item', async () => {
      const created = await request(app).post('/api/v1/items').send({ name: 'find me' });
      const id = created.body.item.id;

      const res = await request(app).get(`/api/v1/items/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.item.name).toBe('find me');
    });

    it('returns 404 for a missing item', async () => {
      const res = await request(app).get('/api/v1/items/does-not-exist');
      expect(res.status).toBe(404);
      expect(res.body.error.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/items/:id', () => {
    it('updates an existing item', async () => {
      const created = await request(app).post('/api/v1/items').send({ name: 'before' });
      const id = created.body.item.id;

      const res = await request(app).put(`/api/v1/items/${id}`).send({ name: 'after' });

      expect(res.status).toBe(200);
      expect(res.body.item.name).toBe('after');
    });

    it('returns 404 when updating a missing item', async () => {
      const res = await request(app).put('/api/v1/items/nope').send({ name: 'x' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/items/:id', () => {
    it('deletes an item and returns 204', async () => {
      const created = await request(app).post('/api/v1/items').send({ name: 'bye' });
      const id = created.body.item.id;

      const res = await request(app).delete(`/api/v1/items/${id}`);
      expect(res.status).toBe(204);
    });

    it('returns 404 for a missing item', async () => {
      const res = await request(app).delete('/api/v1/items/nope');
      expect(res.status).toBe(404);
    });
  });

  describe('unknown routes', () => {
    it('returns 404 for an unknown endpoint', async () => {
      const res = await request(app).get('/api/v1/does-not-exist');
      expect(res.status).toBe(404);
      expect(res.body.error.message).toMatch(/not found/i);
    });
  });
});
