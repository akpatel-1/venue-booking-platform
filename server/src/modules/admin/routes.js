import express from 'express';

import adminAuthRoutes from './auth/routes.js';
import adminVendorApplicationRoutes from './vendor/venue/application/routes.js';

const router = express.Router();

router.use(adminAuthRoutes);
router.use(adminVendorApplicationRoutes);

export default router;
