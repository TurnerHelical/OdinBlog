import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

async function getAllUsers(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });

        const users = await prisma.user.findMany({
            orderBy: { displayname: 'desc' }
        });
        return res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
};

async function getPostsByUser(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({ message: 'Invalid userId' });
        };

        const posts = await prisma.post.findMany({
            where: {
                userId,
                published: true,
            },
            select: {
                id: true,
                title: true,
                text: true,
                publishedAt: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });

        const PREVIEW_LEN = 240;

        const previewPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            publishedAt: post.publishedAt,
            previewText: post.text.length > PREVIEW_LEN
                ? post.text.slice(0, PREVIEW_LEN) + '...'
                : post.text,
        }));
        return res.status(200).json(previewPosts);

    } catch (err) {
        return next(err)
    }
};

async function getCommentsByUser(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });

        const comments = await prisma.comment.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                updatedAt: true,
                postId: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const PREVIEW_LEN = 100;

        const previewComments = comments.map(c => ({
            id: c.id,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
            postId: c.postId,
            previewText: c.text.length > PREVIEW_LEN
                ? c.text.slice(0, PREVIEW_LEN) + '...'
                : c.text,
        }));

        return res.status(200).json(previewComments);

    } catch (err) {
        return next(err);
    }
};

async function getUserProfile(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });

        const isOwner = req.user.id === userId;
        const isAdmin = req.user.isAdmin === true;

        if (!isOwner && !isAdmin) {
            const profile = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    displayname: true,
                    bio: true,
                },
            });
            return res.status(200).json(profile)
        };
        const ownerProfile = await prisma.user.findUnique({
            where: { userId },
            select: {
                id: true,
                email: true,
                displayname: true,
                firstname: true,
                lastname: true,
                bio: true,
            },
        });
        return res.status(200).json(ownerProfile);


    } catch (err) {
        return next(err);
    };
};

async function updateUserProfile(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });

        const isOwner = req.user.id === userId;
        const isAdmin = req.user.isAdmin === true;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Forbidden' })
        };

        const data = {};

        if (typeof req.body.displayname === 'string') {
            const trimmed = req.body.displayname.trim();
            if (trimmed.length === 0) {
                return res.status(400).json({ message: 'Display Name cannot be blank' })
            };
            data.displayname = trimmed;
        };
        if (typeof req.body.firstname === 'string') data.firstname = req.body.firstname.trim();
        if (typeof req.body.lastname === 'string') data.lastname = req.body.lastname.trim();
        if (typeof req.body.bio === 'string') data.bio = req.body.bio.trim();
        const hasPasswordFields =
            typeof req.body.password === "string" || typeof req.body.confirmPassword === "string";

        if (hasPasswordFields) {
            const password = req.body.password ?? '';
            const confirmPassword = req.body.confirmPassword ?? '';

            if (!password || !confirmPassword) {
                return res.status(400).json({ message: 'Both password fields need to be filled in' })
            };

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords need to match' })
            };
            const passwordHash = await bcrypt.hash(password, 10);
            data.passwordHash = passwordHash;
        };

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }
        await prisma.user.update({
            where: { id: userId },
            data,
        });
        return res.status(200).json({ message: 'User updated' });


    } catch (err) {
        return next(err);
    }
};

async function deleteUser(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });

        const isOwner = req.user.id === userId;
        const isAdmin = req.user.isAdmin === true;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Forbidden' })
        };

        await prisma.user.delete({
            where: { id: userId },
        });
        return res.status(200).json({ message: 'User deleted' })
    } catch (err) {
        return next(err);
    }
}