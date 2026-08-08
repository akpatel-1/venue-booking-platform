import express from 'express';

import {
  authenticateToken,
  ensureAccountActive,
} from '../../user/auth/middleware.js';
import verifyVendorRole from '../middleware.js';
import getVendorProfile from './controller.js';

const router = express.Router();

router.use(authenticateToken, ensureAccountActive, verifyVendorRole);

router.get('/profile', getVendorProfile);

export default router;
