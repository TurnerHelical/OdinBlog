import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import controller from '../controllers/postController.js';

const router = Router();


router.get('/mine', requireAuth, controller.getMyPosts);
router.get('/drafts', requireAuth, controller.getMyDrafts);
router.get('/', controller.getAllBlogPosts);
router.post('/', requireAuth, controller.createPost);
router.get('/:postId', controller.getBlogPostById);
router.patch('/:postId', requireAuth, controller.updateBlogPost);
router.delete('/:postId', requireAuth, controller.deleteBlogPost);



export default router;