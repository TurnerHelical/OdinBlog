import { Router } from 'express';
import middleware from '../middleware/auth.js';
import controller from '../controllers/postController.js';
import { postValidation } from '../validators/postValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();


router.get('/mine', middleware.requireAuth, controller.getMyPosts);
router.get('/drafts', middleware.requireAuth, controller.getMyDrafts);
router.get('/', controller.getAllBlogPosts);
router.post('/', middleware.requireAuth, postValidation, validate, controller.createPost);
router.get('/:postId', controller.getBlogPostById);
router.patch('/:postId', middleware.requireAuth, postValidation, validate, controller.updateBlogPost);
router.delete('/:postId', middleware.requireAuth, controller.deleteBlogPost);



export default router;