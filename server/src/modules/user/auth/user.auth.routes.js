import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { userAuthController } from './user.auth.controller.js';
import { userEmail, userOtp } from './user.auth.schema.js';

export const userAuthRoutes = express.Router();

userAuthRoutes.post(
  '/auth/otp/request',
  validateSchema(userEmail),
  userAuthController.handleOtpRequest
);
userAuthRoutes.post(
  '/auth/otp/verify',
  validateSchema(userEmail),
  validateSchema(userOtp),
  userAuthController.handleOtpVerification
);
userAuthRoutes.post('/auth/otp/resend', userAuthController.handleOtpRequest);

userAuthRoutes.post('/auth/refresh', userAuthController.handleSessionRotation);
