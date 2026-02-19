import express from 'express';

import { register, verifyEmail } from '../controllers/user.auth.controller.js';
import { authValidation } from '../middlewares/auth.validation.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/signup/email', authValidation, register);

userRoutes.get('/auth/verify-email/:token', verifyEmail);
