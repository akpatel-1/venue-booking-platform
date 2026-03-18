import express from 'express';

import { adminApplicationRoutes } from './modules/admin/application/application.routes.js';
import { adminAuthRoutes } from './modules/admin/auth/admin.auth.routes.js';
import { adminSessionRoutes } from './modules/admin/session/admin.session.routes.js';
import { userAuthRoutes } from './modules/user/auth/user.auth.routes.js';
import { vendorApplicationRoutes } from './modules/vendor/kyc/vendor.kyc.routes.js';

export const router = express.Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', adminSessionRoutes);
router.use('/admin', adminApplicationRoutes);

router.use(userAuthRoutes);

router.use('/partners', vendorApplicationRoutes);
