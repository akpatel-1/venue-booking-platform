import express from 'express';

import { registerWithEmail } from '../controllers/user.auth.controller.js';
import { authValidation } from '../middlewares/auth.validation.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/signup/email', authValidation, registerWithEmail);
