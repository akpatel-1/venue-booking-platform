import express from 'express';

import { adminAuthRoutes } from './modules/admin/auth/admin.auth.routes.js';
import { adminSessionRoutes } from './modules/admin/session/admin.session.routes.js';

export const router = express.Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', adminSessionRoutes);
