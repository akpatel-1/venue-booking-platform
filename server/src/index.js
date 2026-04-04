import express from 'express';

import { adminAppRoutes } from './modules/admin/application/admin.app.routes.js';
import { adminAuthRoutes } from './modules/admin/auth/admin.auth.routes.js';
import { adminSessionRoutes } from './modules/admin/session/admin.session.routes.js';
import { userAuthRoutes } from './modules/user/auth/auth.routes.js';
import { vendorApplicationRoutes } from './modules/vendor/applications/application.routes.js';

export const router = express.Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', adminSessionRoutes);
router.use('/admin', adminAppRoutes);

router.use(userAuthRoutes);

router.use('/partners', vendorApplicationRoutes);
