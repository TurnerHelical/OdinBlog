import express from "express";
import indexRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// 🔍 TEMP DEBUG ROUTE — PUT IT HERE
app.get("/debug/me", (req, res) => {
    const auth = req.headers.authorization || "";
    const [scheme, token] = auth.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(400).json({ authHeader: auth });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ payload });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
});


app.use('/', indexRouter);

export default app;