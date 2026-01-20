import { prisma } from '../lib/prisma.js';

async function getAllCommentsOnPost(req, res, next) {
    try {
        const postId = Number(req.params.postId);
        if (!Number.isInteger(postId)) return res.status(400).json({ message: 'Invalid post Id' });

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: { id: true }
        });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
            },
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(comments);
    } catch (err) {
        return next(err);
    }
};

async function createComment(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        const userId = req.user.id;
        const postId = Number(req.params.postId);
        if (!Number.isInteger(postId)) return res.status(400).json({ message: 'Invalid post Id' });

        const text = String(req.body.text ?? '').trim();
        if (!text) return res.status(400).json({ message: 'Missing data' });

        const post = await prisma.post.findFirst({
            where: { id: postId, published: true },
            select: { id: true },
        });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = await prisma.comment.create({
            data: {
                text: text,
                postId,
                userId,
            },
        });
        return res.status(201).json({ message: 'Comment posted' });
    } catch (err) {
        return next(err);
    }
}