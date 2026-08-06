import express from 'express';

import adminAuthRoutes from './auth/routes.js';
import adminVendorApplicationRoutes from './vendor/application/routes.js';

const adminRoutes = express.Router();

adminRoutes.use(adminAuthRoutes);
adminRoutes.use(adminVendorApplicationRoutes);

export default adminRoutes;
