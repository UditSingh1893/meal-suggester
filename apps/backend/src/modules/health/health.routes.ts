import { Router } from 'express';
import { databaseReady } from '../../db/mongoose.js';
const router = Router();
router.get('/live', (_req, res) => res.json({ status: 'ok' }));
router.get('/ready', (_req, res) => { const ready = databaseReady(); res.status(ready ? 200 : 503).json({ status: ready ? 'ready' : 'not_ready' }); });
export default router;
