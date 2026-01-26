import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
import auth from '../auth/jwt.js';

async function register(req, res, next) {
    try {
        const { email, password, confirmPassword, displayname } = req.body;


        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof confirmPassword !== "string" ||
            typeof displayname !== "string"
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords need to match" });
        }

        const trimmedDisplayname = displayname.trim();
        if (!trimmedDisplayname.length) {
            return res.status(400).json({ message: "Display name cannot be blank" });
        }


        const passwordHash = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                displayname: trimmedDisplayname,
            },
            select: {
                id: true,
                isAdmin: true,
                canPost: true,
            },
        });


        const payload = {
            sub: user.id,
            isAdmin: user.isAdmin,
            canPost: user.canPost,
        };

        const accessToken = auth.signAccessToken(payload);
        const refreshToken = auth.signRefreshToken(payload);


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/auth/refresh",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            accessToken,
            user: {
                id: user.id,
            },
        });
    } catch (err) {

        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] ?? "field";
            return res.status(409).json({ message: `${field} already in use` });
        }

        return next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Email and password required' });
        };

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, passwordHash: true, isAdmin: true, canPost: true },
        });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const payload = { sub: user.id, isAdmin: user.isAdmin, canPost: user.canPost };

        const accessToken = auth.signAccessToken(payload);
        const refreshToken = auth.signRefreshToken(payload);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/auth/refresh',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken });
    } catch (err) {
        return next(err);
    }
};

async function refresh(req, res) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const payload = auth.verifyRefreshToken(token);

        const accessToken = auth.signAccessToken({
            sub: payload.sub,
            isAdmin: payload.isAdmin,
            canPost: payload.canPost,
        });

        return res.status(200).json({ accessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    };
};

async function logout(req, res) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return res.status(200).json({ message: 'Logged out' });
};

export default { login, refresh, logout, register };