import express from 'express';

import vendorAppRoutes from './application/vendor.app.routes.js';
import vendorDashRoutes from './dashboard/vendor.dash.routes.js';

const vendorRoutes = express.Router();

vendorRoutes.use(vendorAppRoutes);
vendorRoutes.use(vendorDashRoutes);

export default vendorRoutes;
