import { body } from 'express-validator';
import { containsBlockedWord } from '../moderation/containsBlockedWord.js';

const profileValidation = [
    body('bio')
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio can be a max of 500 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Contains prohibited language')
            };
            return true
        }),

    body('displayname')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Display name needs to be between 1 and 30 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Contains prohibited language')
            };
            return true
        })
]

export { profileValidation };