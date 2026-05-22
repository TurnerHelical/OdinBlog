import { body } from 'express-validator';
import { containsBlockedWord } from '../moderation/containsBlockedWord.js'

const postValidation = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 150 })
        .withMessage('Title needs to have between 1 and 150 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Post title contains prohibited language')
            };
            return true
        }),

    body('text')
        .trim()
        .isLength({ min: 50, max: 20000 })
        .withMessage('Post needs to have a min of 50 and a max of 20000 characters')
        .custom((value) => {
            if (containsBlockedWord(value)) {
                throw new Error('Contains prohibited language')
            };
            return true
        }),

]

export { postValidation };