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
            include: {
                user: { select: { id: true, displayname: true } }
            },
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
};

async function updateComment(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const commentId = Number(req.params.commentId);
        if (!Number.isInteger(commentId) || commentId <= 0) {
            return res.status(400).json({ message: "Invalid comment id" });
        };
        const text = String(req.body.updatedText ?? "").trim();
        if (!text) {
            return res.status(400).json({ message: "Missing comment text" });
        }
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true, userId: true },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const isOwner = comment.userId === req.user.id;
        const isAdmin = req.user.isAdmin === true;
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to edit this comment" });
        }

        await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                text: updatedText,
                updatedAt: new Date(),
            },
        });
        return res.status(200).json({ message: 'Comment updated' });
    } catch (err) {
        return next(err);
    }
};

async function deleteComment(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const commentId = Number(req.params.commentId);
        if (!Number.isInteger(commentId) || commentId <= 0) {
            return res.status(400).json({ message: 'Invalid comment Id' });
        };

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true, userId: true },
        });

        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const isOwner = comment.userId === req.user.id;
        const isAdmin = req.user.isAdmin === true;
        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        };
        await prisma.comment.delete({
            where: {
                id: commentId
            },
        });

        return res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        return next(err);
    }
};

async function getMyComments(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        const myComments = await prisma.comment.findMany({
            where: { userId: req.user.id },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },

        });
        return res.status(200).json(myComments);
    } catch (err) {
        return next(err)
    }
};

export default { getAllCommentsOnPost, getMyComments, updateComment, deleteComment, createComment }