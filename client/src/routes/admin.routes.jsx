import { Navigate } from 'react-router-dom';

import SessionExpired from '../components/error/SessionExpired';
import { adminProtected } from '../loaders/admin.auth.loader';
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
        element: <AdminLoginPage />,
      },

      {
        path: 'session-expired',
        element: <SessionExpired />,
      },

      {
        loader: adminProtected,
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
