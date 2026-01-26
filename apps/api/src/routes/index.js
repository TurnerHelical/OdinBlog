import { Router } from 'express';
import posts from './postRoutes.js';
import users from './userRoutes.js';
import comments from './commentRoutes.js';
import auth from './authRoutes.js';

const router = Router();

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/users', users);
router.use('/', comments);

export default router;