import { createBrowserRouter } from 'react-router-dom';

import { adminRoutes } from './routes/admin.routes';
import { sharedRoutes } from './routes/shared.routes';
import { userRoutes } from './routes/user.routes';
import { vendorRoutes } from './routes/vendor.route';

export const router = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...vendorRoutes,
  ...sharedRoutes,
]);
