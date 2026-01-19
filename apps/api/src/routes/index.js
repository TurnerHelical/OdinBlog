import { Router } from 'express';
import posts from './blogRoutes.js';

const router = Router();

router.use('/posts', posts);

export default router;