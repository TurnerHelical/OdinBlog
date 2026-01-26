import auth from '../auth/jwt.js';

function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization || '';
        const [type, token] = header.split(' ');

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Unauthorized' })
        };
        const payload = auth.verifyAccessToken(token);

        req.user = {
            id: payload.sub,
            isAdmin: payload.isAdmin === true,
            canPost: payload.canPost === true,
        };
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    };
};

function requireAdmin(req, res, next) {
    if (!req.user?.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    return next();
};

export default { requireAdmin, requireAuth };