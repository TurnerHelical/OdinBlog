import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

async function getAllUsers(req, res, next) {
    try {
        const currentPage = Number(req.query.page);
        const postLimit = Number(req.query.limit);

        const totalItems = await prisma.user.count();

        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });

        const items = await prisma.user.findMany({
            select: { canPost: true, displayname: true, email: true, id: true, isAdmin: true, hasRequested: true, postRequest: true },
            orderBy: { displayname: 'desc' },
            skip: (currentPage - 1) * postLimit,
            take: postLimit,

        });

        const data = {
            totalItems,
            items
        }

        return res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};


async function getPostsByUser(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        const currentPage = Number(req.query.page);
        const postLimit = Number(req.query.limit);
        console.log(userId);
        console.log(currentPage);
        console.log(postLimit);
        const totalItems = await prisma.post.count({
            where: { userId: userId },
        });


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
                publishedAt: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
            skip: (currentPage - 1) * postLimit,
            take: postLimit,
        });

        const items = posts.map(post => ({
            id: post.id,
            title: post.title,
            publishedAt: post.publishedAt,
        }));

        const data = {
            items,
            totalItems,
        }
        return res.status(200).json(data);

    } catch (err) {
        return next(err)
    }
};

async function getCommentsByUser(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        const currentPage = Number(req.query.page);
        const postLimit = Number(req.query.limit);
        const userId = Number(req.params.userId);

        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });

        const totalItems = await prisma.comment.count({
            where: { userId: userId },
        });

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
            skip: (currentPage - 1) * postLimit,
            take: postLimit,
        });
        const PREVIEW_LEN = 100;

        const items = comments.map(c => ({
            id: c.id,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
            postId: c.postId,
            previewText: c.text.length > PREVIEW_LEN
                ? c.text.slice(0, PREVIEW_LEN) + '...'
                : c.text,
        }));
        const data = {
            items,
            totalItems,
        }

        return res.status(200).json(data);

    } catch (err) {
        return next(err);
    }
};

async function getUserProfile(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const userId = Number(req.params.userId);
        if (!Number.isInteger(userId) || userId <= 0) return res.status(400).json({ message: 'Invalid user id' });
        const profile = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                displayname: true,
                bio: true,

                posts: {
                    where: {
                        published: true,
                    },
                    take: 5,
                    select: {
                        id: true,
                        title: true,
                        publishedAt: true,
                    },
                    orderBy: {
                        publishedAt: 'desc',
                    },
                },
                comments: {
                    take: 5,
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        updatedAt: true,
                        postId: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            }
        });
        return res.status(200).json(profile)



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

        const requestPostAbility = typeof req.body.hasRequested === 'boolean' || req.body.postRequest === 'string';
        if (requestPostAbility) {
            const hasRequested = req.body.hasRequested ?? '';
            const postRequest = req.body.postRequest ?? '';

            if (hasRequested && !postRequest) return res.status(400).json({ message: 'Please include a reason you want access' });
            if (hasRequested && postRequest) {
                data.hasRequested = hasRequested;
                data.postRequest = postRequest;
            }
        }

        const approvePostAbility = typeof req.body.approvePostAccess === 'boolean';
        if (approvePostAbility) {
            data.canPost = true
        }

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
};

async function getProfile(req, res, next) {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

        const profile = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                displayname: true,
                bio: true,


                posts: {
                    where: {
                        published: true,
                    },
                    take: 5,
                    select: {
                        id: true,
                        title: true,
                        publishedAt: true,
                    },
                    orderBy: {
                        publishedAt: 'desc',
                    },
                },
                comments: {
                    take: 5,
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        updatedAt: true,
                        postId: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            }
        });
        return res.status(200).json({ profile });



    } catch (err) {
        return next(err);
    };
};

async function getMe(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                displayname: true,
                email: true,
                isAdmin: true,
                canPost: true,
            }

        })
        res.json({ user })
    } catch (err) {
        return next(err);
    }
}

export default { deleteUser, updateUserProfile, getUserProfile, getAllUsers, getPostsByUser, getCommentsByUser, getMe, getProfile };