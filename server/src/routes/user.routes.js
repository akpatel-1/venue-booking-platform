import express from 'express';

import { register, verifyEmail } from '../controllers/user.auth.controller.js';
import { validateCredentials } from '../middlewares/validate.credentials.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/signup/email', validateCredentials, register);

userRoutes.get('/auth/verify-email/:token', verifyEmail);
