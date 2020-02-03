import { Router } from 'express';
import ChirpsRouter from './chirps';

const router = Router();
router.use('/chirps', ChirpsRouter);

export default router;
