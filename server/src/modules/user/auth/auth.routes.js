import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { controller } from './auth.controller.js';
import { middleware } from './auth.middleware.js';
import { schema } from './auth.schema.js';

export const userAuthRoutes = express.Router();

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

userAuthRoutes.post('/auth/refresh', controller.handleSessionRotation);

userAuthRoutes.post(
  '/auth/logout',
  middleware.authenticateToken,
  middleware.ensureAccountActive,
  controller.handleLogout
);
