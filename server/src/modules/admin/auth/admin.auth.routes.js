import express from 'express';

import { validateSchema } from '../../../middleware/schema.validation.js';
import { validateSession } from '../session/admin.session.middleware.js';
import { controller } from './admin.auth.controller.js';
import { adminAuthSchema } from './admin.auth.schema.js';

const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/auth/login',
  validateSchema(adminAuthSchema),
  controller.handleAdminLogin
);

adminAuthRoutes.post(
  '/auth/logout',
  validateSession,
  controller.handleAdminLogout
);

export default adminAuthRoutes;
