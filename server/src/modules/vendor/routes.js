import express from 'express';

import {
  authenticateToken,
  ensureAccountActive,
} from '../user/auth/middleware.js';
import venueApplication from '../vendor/venue/application/routes.js';
import ensureVendorAccess from './middleware.js';
import profileRoutes from './profile/routes.js';

const router = express.Router();

router.use(authenticateToken, ensureAccountActive, ensureVendorAccess);

router.use(profileRoutes);
router.use(venueApplication);

export default router;
