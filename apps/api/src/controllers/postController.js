import { prisma } from '../lib/prisma.js';
import auth from '../auth/jwt.js';

async function getAllBlogPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: {
                publishedAt: 'desc'
            },
            include: {
                user: { select: { id: true, displayname: true } }
            },
        });
        return res.status(200).json(posts);
    } catch (error) {
        return next(error);
    }
};

async function createPost(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });


        const title = String(req.body.title ?? '').trim();
        const text = String(req.body.text ?? '').trim();

        if (!title || !text) return res.status(400).json({ message: 'Missing parameters' })

        await prisma.post.create({
            data: {
                title: req.body.title,
                text: req.body.text,
                userId: req.user.id,
            },
        });
        return res.status(201).json({
            message: 'Post added to drafts. Please confirm you\'re finished and then hit publish',
        });
    } catch (err) {
        return next(err);
    }
};

async function getMyPosts(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
        const posts = await prisma.post.findMany({
            where: {
                userId: req.user.id,
                published: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });
        return res.status(200).json(posts);
    } catch (err) {
        return next(err);
    }
};

async function getMyDrafts(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
        const drafts = await prisma.post.findMany({
            where: {
                userId: req.user.id,
                published: false,
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return res.status(200).json(drafts);
    } catch (err) {
        return next(err);
    }
};

async function getBlogPostById(req, res, next) {
    try {

        const postId = Number(req.params.postId)
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: { select: { id: true, displayname: true } },
                comments: { select: { id: true, text: true, createdAt: true, updatedAt: true, user: { select: { id: true, displayname: true } } } }
            },

        });


        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.published === false) {
            const header = req.headers['authorization'];
            const token = header && header.split(' ')[1];


            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' })
            };
            const payload = auth.verifyAccessToken(token);
            req.user = {
                id: payload.sub,
            };

            if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
            const isOwner = post.userId === req.user.id;
            if (!isOwner) return res.status(403).json({ message: 'Forbidden' });
            return res.status(200).json(post);
        };
        return res.status(200).json(post);
    } catch (err) {
        return next(err);
    }
};

async function updateBlogPost(req, res, next) {
    try {

        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const postId = Number(req.params.postId);
        if (!Number.isInteger(postId)) return res.status(400).json({ message: 'Post not found' });

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const isOwner = post.userId === req.user.id;
        if (!isOwner) return res.status(403).json({ message: 'Not authorized to edit this post' });

        const { title, text, publish } = req.body;
        const data = {};

        if (typeof title === 'string') data.title = title;
        if (typeof text === 'string') data.text = text;

        if (publish === true) {
            data.published = true;
            data.publishedAt = new Date();
        }

        if (publish === false) {
            data.published = false;
            data.publishedAt = null;
        }

        if (Object.keys(data).length === 0) return res.status(400).json({ message: 'No valid fields to update' });

        await prisma.post.update({
            where: {
                id: postId,
            },
            data,
        });
        return res.status(200).json({ message: 'Post updated' });
    } catch (err) {
        return next(err);
    }
};

async function deleteBlogPost(req, res, next) {
    try {

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const postId = Number(req.params.postId);
        if (!Number.isInteger(postId)) return res.status(404).json({ message: 'Post not found' });

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post) return res.status(404).json({ message: 'No post found' });
        const isOwner = post.userId === req.user.id;
        const isAdmin = req.user.isAdmin === true;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this post' })
        };
        await prisma.post.delete({
            where: {
                id: postId,
            }
        });
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        return next(err);
    }
};

export default { getAllBlogPosts, createPost, getMyDrafts, getMyPosts, getBlogPostById, updateBlogPost, deleteBlogPost };