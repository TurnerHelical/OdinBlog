import { Router } from 'express';
import controller from '../controllers/userController';

const router = Router();

router.get('/', controller.getAllUsers); //Admin only
router.post('/', controller.newUser);
router.post('/login', controller.userLogin);
router.post('/logout', controller.userLogout);
router.get('/:userId/posts', controller.getPostsByUser);
router.get('/:userId/comments', controller.getCommentsByUser);
router.get('/:userId', controller.getUserProfile);
router.patch('/:userId', controller.updateUserProfile);
router.delete('/:userId', controller.deleteUser);



export default router;