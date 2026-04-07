import express from 'express';

import { adminAppRoutes } from './modules/admin/application/admin.app.routes.js';
import { adminAuthRoutes } from './modules/admin/auth/admin.auth.routes.js';
import { adminSessionRoutes } from './modules/admin/session/admin.session.routes.js';
import { userAuthRoutes } from './modules/user/auth/user.auth.routes.js';
import { vendorAppRoutes } from './modules/vendor/applications/vendor.app.routes.js';
import { vendorDashRoutes } from './modules/vendor/dashboard/vendor.dash.routes.js';

export const router = express.Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', adminAuthRoutes);
router.use('/admin', adminSessionRoutes);
router.use('/admin', adminAppRoutes);
router.use('/admin', adminAppRoutes);

router.use(userAuthRoutes);

router.use('/vendors', vendorAppRoutes);
router.use('/vendors', vendorDashRoutes);
