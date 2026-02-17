import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { errorHandler } from './middlewares/error.handler.middleware.js';
import { adminRoutes } from './routes/admin.routes.js';
import { userRoutes } from './routes/user.routes.js';

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

app.use(userRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandler);

export default app;
