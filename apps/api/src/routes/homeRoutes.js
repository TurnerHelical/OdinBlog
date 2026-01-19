import { Router } from 'express';

const router = Router();

router.get('/', () => {
    console.log('home routes working');
});

export default router;