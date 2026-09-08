import { body } from 'express-validator';
import { containsBlockedWord } from '../moderation/containsBlockedWord.js';

const profileValidation = [
    body('bio')
        .optional()
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
        .optional()
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Display name needs to be between 1 and 30 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Contains prohibited language')
            };
            return true
        }),
    body('postRequest')
    .custom((value, { req }) => {
        if (req.body.hasRequested === true) {
            if (typeof value !== 'string' || value.trim().length < 1) {
                throw new Error('A post request message is required');
            }

            if (value.trim().length > 500) {
                throw new Error('Post request can be a max of 500 characters');
            }

            if (containsBlockedWord(value)) {
                throw new Error('Contains prohibited language');
            }
        }

        return true;
    })
    
]

export { profileValidation };