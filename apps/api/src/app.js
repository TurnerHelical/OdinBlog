import express from "express";
import indexRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(
    cors({
        orgin: [
            'http://localhost:5173',
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


app.use('/', indexRouter);

export default app;