import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { controller } from './auth.controller.js';
import { schema } from './auth.schema.js';

export const userAuth = express.Router();

userAuth.post(
  '/auth/otp/request',
  validateSchema(schema.email),
  controller.handleOtpRequest
);

userAuth.post(
  '/auth/otp/verify',
  validateSchema(schema.email),
  validateSchema(schema.otp),
  controller.handleOtpVerification
);

userAuth.post(
  '/auth/otp/resend',
  validateSchema(schema.email),
  controller.handleOtpRequest
);

userAuth.post('/auth/refresh', controller.handleSessionRotation);
