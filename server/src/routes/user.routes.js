import express from 'express';

import {
  handleOtpRequest,
  handleOtpVerification,
} from '../controllers/user.auth.controller.js';
import {
  validateEmail,
  validateOtp,
} from '../middlewares/user/user.validation.middleware.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/otp/request', validateEmail, handleOtpRequest);
userRoutes.post(
  '/auth/otp/verify',
  validateEmail,
  validateOtp,
  handleOtpVerification
);
