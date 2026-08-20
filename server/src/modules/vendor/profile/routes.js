import express from 'express';

import getVendorProfile from './controller.js';

const router = express.Router();

router.get('/profile', getVendorProfile);

export default router;
