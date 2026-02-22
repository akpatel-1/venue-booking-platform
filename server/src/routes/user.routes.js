import express from 'express';

import {
  refreshToken,
  register,
  verifyEmail,
  verifyUser,
} from '../controllers/user.auth.controller.js';
import { requireAuth } from '../middlewares/user.auth.middleware.js';
import { validateCredentials } from '../middlewares/validate.credentials.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/signup/email', validateCredentials, register);
userRoutes.get('/auth/verify-email/:verificationToken', verifyEmail);
userRoutes.get('/me', requireAuth, verifyUser);
userRoutes.post('/auth/refresh', refreshToken);
