import { Navigate } from 'react-router-dom';

import { adminAuthLoader } from '../loaders/admin.auth.loder';
import AdminApplicationPage from '../pages/admin/AdminApplicationPage';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminOverviewPage from '../pages/admin/AdminOverviewPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        loader: adminAuthLoader.publicRoute,
        element: <AdminLoginPage />,
      },

      {
        loader: adminAuthLoader.protectedRoute,
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },

          {
            path: 'overview',
            element: <AdminOverviewPage />,
          },

          {
            path: 'application',
            element: <AdminApplicationPage />,
          },
        ],
      },
    ],
  },
];
