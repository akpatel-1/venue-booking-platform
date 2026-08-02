import express from 'express';

import adminAppRoutes from './application/admin.app.routes.js';
import adminAuthRoutes from './auth/admin.auth.routes.js';
import adminSessionRoutes from './session/admin.session.routes.js';

const adminRoutes = express.Router();

adminRoutes.use(adminAuthRoutes);
adminRoutes.use(adminSessionRoutes);
adminRoutes.use(adminAppRoutes);

export default adminRoutes;
