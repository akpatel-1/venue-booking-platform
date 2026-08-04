import express from 'express';

import adminAppRoutes from './application/admin.app.routes.js';
import adminAuthRoutes from './auth/admin.auth.routes.js';

const adminRoutes = express.Router();

adminRoutes.use(adminAuthRoutes);
adminRoutes.use(adminAppRoutes);

export default adminRoutes;
