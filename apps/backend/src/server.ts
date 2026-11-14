import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './db/mongoose.js';
async function main() {
  await connectDatabase();
  const server = createApp().listen(env.BACKEND_PORT, '127.0.0.1', () => console.log('API: http://localhost:' + env.BACKEND_PORT));
  const shutdown = () => server.close(() => { void disconnectDatabase().then(() => process.exit(0)); });
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
main().catch(error => { console.error('Startup failed. Check MongoDB is running.', error); process.exit(1); });
