import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/admin.session.middleware.js';
import { authController } from './admin.auth.controller.js';
import { adminLoginSchema } from './admin.auth.schema.js';

export const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/login',
  validateSchema(adminLoginSchema),
  authController.handleAdminLogin
);
adminAuthRoutes.post(
  '/logout',
  sessionValidation,
  authController.handleAdminLogout
);
