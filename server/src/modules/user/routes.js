import express from 'express';

import userApplicationRoutes from './application/routes.js';
import userAuthRoutes from './auth/routes.js';

const router = express.Router();

router.use(userAuthRoutes);
router.use(userApplicationRoutes);

export default router;
