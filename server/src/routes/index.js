import express from 'express';

import { adminRoutes } from './admin.routes.js';
import { sharedRoutes } from './shared.routes.js';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use(sharedRoutes);

export default router;
