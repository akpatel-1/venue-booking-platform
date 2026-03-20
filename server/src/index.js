import express from 'express';

import { adminApplication } from './modules/admin/application/application.routes.js';
import { adminAuthRoutes } from './modules/admin/auth/auth.routes.js';
import { adminSessionRoutes } from './modules/admin/session/session.routes.js';
import { userAuth } from './modules/user/auth/auth.routes.js';
import { vendorApplication } from './modules/vendor/applications/application.routes.js';

export const router = express.Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', adminSessionRoutes);
router.use('/admin', adminApplication);

router.use(userAuth);

router.use('/partners', vendorApplication);
