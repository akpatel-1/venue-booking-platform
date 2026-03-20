import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/session.middleware.js';
import { controller } from './auth.controller.js';
import { schema } from './auth.schema.js';

export const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/login',
  validateSchema(schema),
  controller.handleAdminLogin
);
adminAuthRoutes.post(
  '/logout',
  sessionValidation,
  controller.handleAdminLogout
);
