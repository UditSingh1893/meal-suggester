import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export async function connectDatabase(uri = env.MONGODB_URI) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: env.NODE_ENV !== 'production' });
  logger.info('MongoDB connected');
}
export async function disconnectDatabase() { await mongoose.disconnect(); }
export function databaseReady() { return mongoose.connection.readyState === 1; }
