import { Navigate } from 'react-router-dom';

import { adminAuthRoutesLoader } from '../loaders/admin.auth.loder';
import AdminDashboardOverviewPage from '../pages/admin/AdminDashboardOverviewPage';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminLogin from '../pages/admin/AdminLoginPage';
import adminApplicationRoutesPage from '../pages/admin/adminApplicationRoutesPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        loader: adminAuthRoutesLoader.publicRoute,
        element: <AdminLogin />,
      },

      {
        loader: adminAuthRoutesLoader.protectedRoute,
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
            element: <adminApplicationRoutesPage />,
          },
        ],
      },
    ],
  },
];
