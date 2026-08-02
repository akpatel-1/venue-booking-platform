import express from 'express';

import { validateSchema } from '../../../middleware/schema.validation.js';
import { controller } from './user.auth.controller.js';
import { middleware } from './user.auth.middleware.js';
import { schema } from './user.auth.schema.js';

const userAuthRoutes = express.Router();

userAuthRoutes.post(
  '/auth/otp/request',
  validateSchema(schema.email),
  controller.handleOtpRequest
);

userAuthRoutes.post(
  '/auth/otp/verify',
  validateSchema(schema.email),
  validateSchema(schema.otp),
  controller.handleOtpVerification
);

userAuthRoutes.post(
  '/auth/otp/resend',
  validateSchema(schema.email),
  controller.handleOtpRequest
);

userAuthRoutes.get(
  '/auth/me',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  controller.handleMeRequest
);

userAuthRoutes.post('/auth/refresh', controller.handleSessionRotation);

userAuthRoutes.post(
  '/auth/logout',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  controller.handleLogout
);

export default userAuthRoutes;
