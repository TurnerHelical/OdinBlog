import { Router } from 'express';
import controller from '../controllers/commentController.js';
import middleware from '../middleware/auth.js';
import { commentValidation } from '../validators/commentValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/posts/:postId/comments', controller.getAllCommentsOnPost);
router.post('/posts/:postId/comments', middleware.requireAuth, commentValidation, validate, controller.createComment);
router.get('/comments/mine', middleware.requireAuth, controller.getMyComments);
router.get('/comments/:commentId', middleware.requireAuth, controller.getCommentById);
router.patch('/comments/:commentId', middleware.requireAuth, commentValidation, validate, controller.updateComment);
router.delete('/comments/:commentId', middleware.requireAuth, controller.deleteComment);


export default router;