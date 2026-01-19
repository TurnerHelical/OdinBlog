import { Router } from 'express';

import controller from '../controllers/postController.js';

const router = Router();

router.get('/', controller.getAllBlogPosts);
router.post('/', controller.createPost);
router.get('/mine', controller.getMyPosts);
router.get('/drafts', controller.getMyDrafts);
router.get('/:postId', controller.getBlogPostById);
router.patch('/:postId', controller.updateBlogPost);
router.delete('/:postId', controller.deleteBlogPost);
router.get('/:postId/comments', controller.getAllCommentsOnPost);
router.post('/:postId/comments', controller.newComment);



export default router;