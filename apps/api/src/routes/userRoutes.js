import { Router } from 'express';
import controller from '../controllers/userController.js';
import middleware from '../middleware/auth.js';
import { profileValidation } from '../validators/profileValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', middleware.requireAuth, middleware.requireAdmin, controller.getAllUsers); //Admin only
router.get('/me', middleware.requireAuth, controller.getMe);
router.get('/myProfile', middleware.requireAuth, controller.getProfile);
router.get('/:userId/posts', middleware.requireAuth, controller.getPostsByUser);
router.get('/:userId/comments', middleware.requireAuth, controller.getCommentsByUser);
router.get('/:userId', middleware.requireAuth, controller.getUserProfile);
router.patch('/:userId', middleware.requireAuth, profileValidation, validate, controller.updateUserProfile);
router.delete('/:userId', middleware.requireAuth, controller.deleteUser);



export default router;