import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { errorHandler } from './middlewares/error.handler.js';
import router from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

export default app;
