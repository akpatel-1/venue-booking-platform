import express from 'express';

import {
  adminLogin,
  adminLogout,
} from '../controllers/admin.auth.controller.js';
import { adminSession } from '../controllers/admin.session.controller.js';
import { sessionValidation } from '../middlewares/admin.session.validation.middleware.js';
import { authValidation } from '../middlewares/auth.validation.middleware.js';

export const adminRoutes = express.Router();

// Public routes
adminRoutes.post('/login', authValidation, adminLogin);
adminRoutes.post('/logout', adminLogout);

// Protected routes
adminRoutes.use(sessionValidation);
adminRoutes.get('/auth/session', adminSession);
