import express from 'express';

import {
  adminLogin,
  adminLogout,
} from '../controllers/admin.auth.controller.js';
import { adminSession } from '../controllers/admin.session.controller.js';
import { sessionValidation } from '../middlewares/admin.session.validation.middleware.js';
import { validateCredentials } from '../middlewares/validate.credentials.middleware.js';

export const adminRoutes = express.Router();

adminRoutes.post('/login', validateCredentials, adminLogin);
adminRoutes.post('/logout', sessionValidation, adminLogout);
adminRoutes.get('/auth/session', sessionValidation, adminSession);
