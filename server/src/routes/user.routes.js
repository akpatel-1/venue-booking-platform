import express from 'express';

import { handleOtpRequest } from '../controllers/user.auth.controller.js';
import { validateEmail } from '../middlewares/user/user.validation.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/otp/request', validateEmail, handleOtpRequest);
