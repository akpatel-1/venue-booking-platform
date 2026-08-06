import express from 'express';

import validateSchema from '../../../middleware/schema.validation.js';
import {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminSession,
} from './controller.js';
import validateAdminSession from './middleware.js';
import adminAuthSchema from './schema.js';

const adminAuthRoutes = express.Router();

adminAuthRoutes.post(
  '/auth/login',
  validateSchema(adminAuthSchema),
  handleAdminLogin
);

adminAuthRoutes.post('/auth/logout', validateAdminSession, handleAdminLogout);

adminAuthRoutes.get('/auth/me', validateAdminSession, handleAdminSession);
export default adminAuthRoutes;
