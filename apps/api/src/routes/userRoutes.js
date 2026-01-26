import { Router } from 'express';
import controller from '../controllers/userController.js';
import middleware from '../middleware/auth.js';

const router = Router();

router.get('/', middleware.requireAuth, middleware.requireAdmin, controller.getAllUsers); //Admin only
router.get('/:userId/posts', middleware.requireAuth, controller.getPostsByUser);
router.get('/:userId/comments', middleware.requireAuth, controller.getCommentsByUser);
router.get('/:userId', middleware.requireAuth, controller.getUserProfile);
router.patch('/:userId', middleware.requireAuth, controller.updateUserProfile);
router.delete('/:userId', middleware.requireAuth, controller.deleteUser);



export default router;