import { Router } from 'express';
import controller from '../controllers/commentController.js';
import middleware from '../middleware/auth.js';

const router = Router();

router.get('/posts/:postId/comments', controller.getAllCommentsOnPost);
router.post('/posts/:postId/comments', middleware.requireAuth, controller.createComment);
router.patch('/comments/:commentId', middleware.requireAuth, controller.updateComment);
router.get('/comments/mine', middleware.requireAuth, controller.getMyComments);
router.delete('/comments/:commentId', middleware.requireAuth, controller.deleteComment);


export default router;