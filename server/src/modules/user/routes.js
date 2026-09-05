import express from 'express';

import userApplicationRoutes from './application/routes.js';
import userAuthRoutes from './auth/routes.js';
import userBookingRoutes from './venue/booking/routes.js';

const router = express.Router();

router.use(userAuthRoutes);
router.use(userApplicationRoutes);
router.use(userBookingRoutes);

export default router;
