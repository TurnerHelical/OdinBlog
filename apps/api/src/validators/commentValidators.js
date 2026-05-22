import { body } from 'express-validator';
import { containsBlockedWord } from '../moderation/containsBlockedWord';

const commentValidation = [
    body('text')
        .trim()
        .isLength({ min: 1, max: 300 })
        .withMessage('Comment must be between 1 and 300 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Comment contains prohibited language');
            };
            return true
        })
];

