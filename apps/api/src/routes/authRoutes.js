import { Router } from "express";
import controller from "../controllers/authController.js";
import { registerValidation, loginValidation } from '../validators/authValidators.js';
import { validate } from '../middleware/validate.js';
const router = Router();

router.post('/register', registerValidation, validate, controller.register);
router.post('/login', loginValidation, validate, controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

export default router;