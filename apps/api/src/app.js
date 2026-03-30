import express from "express";
import indexRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173'
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


app.use('/', indexRouter);

export default app;