import { Router } from 'express';
import controller from '../controllers/commentController.js';

const router = Router();

router.get('/posts/:postId/comments', controller.getAllCommentsOnPost);
router.post('/posts/:postId/comments', controller.createComment);
router.patch('/comments/:commentId', controller.updateComment);
router.get('/comments/mine', controller.getMyComments);
router.delete('/comments/:commentId', controller.deleteComment);


export default router;