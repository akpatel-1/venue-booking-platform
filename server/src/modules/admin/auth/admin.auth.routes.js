import express from 'express';

import { validateSchema } from '../../schema.validation.middleware.js';
import { sessionValidation } from '../session/admin.session.middleware.js';
import {
  handleAdminLogin,
  handleAdminLogout,
} from './admin.auth.controller.js';
import { adminLoginSchema } from './admin.auth.validator.js';

export const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/login',
  validateSchema(adminLoginSchema),
  handleAdminLogin
);
adminAuthRoutes.post('/logout', sessionValidation, handleAdminLogout);
