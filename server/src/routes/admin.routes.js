import express from 'express';

import {
  adminLogin,
  adminLogout,
} from '../controllers/admin/admin.auth.controller.js';
import { adminSession } from '../controllers/admin/admin.session.controller.js';
import { sessionValidation } from '../middlewares/admin/admin.auth.middleware.js';
import { validateCredentials } from '../middlewares/admin/admin.validation.middleware.js';

export const adminRoutes = express.Router();

adminRoutes.post('/login', validateCredentials, adminLogin);
adminRoutes.post('/logout', sessionValidation, adminLogout);
adminRoutes.get('/auth/session', sessionValidation, adminSession);
