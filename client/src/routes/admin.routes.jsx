import { Navigate } from 'react-router-dom';

import { adminAuthLoader } from '../loaders/admin.auth.loder';
import AdminApplicationPage from '../pages/admin/AdminApplicationPage';
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
            element: <h1>Dashboard Page</h1>,
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
