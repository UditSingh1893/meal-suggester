import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import pantry from './modules/pantry/pantry.routes.js';
import recipes from './modules/recipes/recipe.routes.js';
import matching from './modules/matching/matching.routes.js';
import favorites from './modules/favorites/favorite.routes.js';
import shopping from './modules/shopping/shopping.routes.js';
import health from './modules/health/health.routes.js';
import { notFound, errorHandler } from './middleware/error.js';
export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: env.FRONTEND_ORIGIN }));
  app.use(express.json({ limit: '1mb' }));
  app.use('/api/v1/health', health);
  app.use('/api/v1/pantry', pantry);
  app.use('/api/v1/recipes', recipes);
  app.use('/api/v1/matching', matching);
  app.use('/api/v1/favorites', favorites);
  app.use('/api/v1/shopping-lists', shopping);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
