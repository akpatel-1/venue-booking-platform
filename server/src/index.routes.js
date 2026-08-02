import express from 'express';

import adminRoutes from './modules/admin/admin.routes.js';
import userRoutes from './modules/user/user.routes.js';
import vendorRoutes from './modules/vendor/vendor.routes.js';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use(userRoutes);
router.use('/vendors', vendorRoutes);

export default router;
