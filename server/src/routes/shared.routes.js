import express from 'express';

import {
  handleOtpRequest,
  handleOtpVerification,
  handleSessionRotation,
} from '../controllers/shared/auth.controller.js';
import {
  validateEmail,
  validateOtp,
} from '../middlewares/shared/validation.middleware.js';

export const sharedRoutes = express.Router();

sharedRoutes.post('/auth/otp/request', validateEmail, handleOtpRequest);
sharedRoutes.post(
  '/auth/otp/verify',
  validateEmail,
  validateOtp,
  handleOtpVerification
);
sharedRoutes.post('/auth/otp/resend', handleOtpRequest);
sharedRoutes.post('/auth/refresh', handleSessionRotation);
