import express from 'express';

import validateSchema from '../../../middleware/schema.validation.js';
import {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminSession,
} from './admin.auth.controller.js';
import validateAdminSession from './admin.auth.middleware.js';
import adminAuthSchema from './admin.auth.schema.js';

const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/auth/login',
  validateSchema(adminAuthSchema),
  handleAdminLogin
);

adminAuthRoutes.post('/auth/logout', validateAdminSession, handleAdminLogout);

adminAuthRoutes.get('/auth/me', validateAdminSession, handleAdminSession);
export default adminAuthRoutes;
