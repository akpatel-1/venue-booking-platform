import { Navigate } from 'react-router-dom';

import { adminAuthLoader } from '../loaders/admin.auth.loder';
import AdminApplicationPage from '../pages/admin/AdminApplicationPage';
import AdminDashboardOverviewPage from '../pages/admin/AdminDashboardOverviewPage';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminLogin from '../pages/admin/AdminLoginPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        loader: adminAuthLoader.publicRoute,
        element: <AdminLogin />,
      },

      {
        loader: adminAuthLoader.protectedRoute,
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },

          {
            path: 'dashboard',
            element: <AdminDashboardOverviewPage />,
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
