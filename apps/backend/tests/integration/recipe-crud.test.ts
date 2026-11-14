import { afterAll, beforeAll, expect, it } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createApp } from '../../src/app.js';

let database: MongoMemoryServer | undefined;
const app = createApp();
beforeAll(async () => {
  const uri = process.env.TEST_MONGODB_URI;
  if (!uri) database = await MongoMemoryServer.create();
  await mongoose.connect(uri || database!.getUri());
}, 120000);
afterAll(async () => { await mongoose.disconnect(); await database?.stop(); });
it('creates, reads, updates and deletes a recipe without accounts', async () => {
  const created = await request(app).post('/api/v1/recipes').send({
    title: 'CRUD Example', ingredients: [{ name: 'rice' }], instructions: ['Cook rice']
  });
  expect(created.status).toBe(201);
  const path = '/api/v1/recipes/' + created.body.data._id;
  expect((await request(app).get(path)).body.data.title).toBe('CRUD Example');
  expect((await request(app).patch(path).send({ title: 'Updated Example' })).body.data.title).toBe('Updated Example');
  expect((await request(app).delete(path)).status).toBe(204);
  expect((await request(app).get(path)).status).toBe(404);
});
