import { Router } from 'express';
import controller from '../controllers/userController';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireAdmin, controller.getAllUsers); //Admin only
router.get('/:userId/posts', requireAuth, controller.getPostsByUser);
router.get('/:userId/comments', requireAuth, controller.getCommentsByUser);
router.get('/:userId', requireAuth, controller.getUserProfile);
router.patch('/:userId', requireAuth, controller.updateUserProfile);
router.delete('/:userId', requireAuth, controller.deleteUser);



export default router;