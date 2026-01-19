import { Router } from 'express';
import home from '../routes/homeRoutes.js';

const router = Router();

router.use('/', home);

export default router;