import express from 'express';

import validateSchema from '../../../middleware/schema.validation.js';
import validateAdminSession from '../session/admin.session.middleware.js';
import {
  handleAdminLogin,
  handleAdminLogout,
} from './admin.auth.controller.js';
import adminAuthSchema from './admin.auth.schema.js';

const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/auth/login',
  validateSchema(adminAuthSchema),
  handleAdminLogin
);

adminAuthRoutes.post('/auth/logout', validateAdminSession, handleAdminLogout);

export default adminAuthRoutes;
