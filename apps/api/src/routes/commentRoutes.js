import { Router } from 'express';
import controller from '../controllers/commentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/posts/:postId/comments', controller.getAllCommentsOnPost);
router.post('/posts/:postId/comments', requireAuth, controller.createComment);
router.patch('/comments/:commentId', requireAuth, controller.updateComment);
router.get('/comments/mine', requireAuth, controller.getMyComments);
router.delete('/comments/:commentId', requireAuth, controller.deleteComment);


export default router;