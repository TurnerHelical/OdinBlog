import { body } from 'express-validator';
import { containsBlockedWord } from '../moderation/containsBlockedWord.js';

const registerValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8, max: 72 })
        .withMessage('Password must be between 8 and 72 characters'),

    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords must match'),

    body('displayname')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Display name must be between 1 and 30 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Display name contains prohibited language');
            };
            return true;
        })
];

const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid Email')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password Required')
];

export {
    registerValidation,
    loginValidation,
};