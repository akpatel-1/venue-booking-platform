import express from 'express';

import validateSchema from '../../../middleware/schema.validation.js';
import {
  handleLogout,
  handleMeRequest,
  handleOtpRequest,
  handleOtpVerification,
  handleSessionRotation,
} from './user.auth.controller.js';
import {
  authenticateToken,
  ensureAccountActive,
} from './user.auth.middleware.js';
import userAuthSchema from './user.auth.schema.js';

const userAuthRoutes = express.Router();

userAuthRoutes.post(
  '/auth/otp/request',
  validateSchema(userAuthSchema.email),
  handleOtpRequest
);

userAuthRoutes.post(
  '/auth/otp/verify',
  validateSchema(userAuthSchema.verify),
  handleOtpVerification
);

userAuthRoutes.get(
  '/auth/me',
  authenticateToken,
  ensureAccountActive,
  handleMeRequest
);

userAuthRoutes.post('/auth/refresh', handleSessionRotation);

userAuthRoutes.post(
  '/auth/logout',
  authenticateToken,
  ensureAccountActive,
  handleLogout
);

export default userAuthRoutes;
