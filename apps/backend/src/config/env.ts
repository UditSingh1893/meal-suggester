import { z } from 'zod';
export const env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/meal_suggester'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:3000')
}).parse(process.env);
