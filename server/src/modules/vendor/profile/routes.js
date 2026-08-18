import express from 'express';

import {
  authenticateToken,
  ensureAccountActive,
} from '../../user/auth/middleware.js';
import ensureVendorAccess from '../middleware.js';
import getVendorProfile from './controller.js';

const router = express.Router();

router.use(authenticateToken, ensureAccountActive, ensureVendorAccess);

router.get('/profile', getVendorProfile);

export default router;
