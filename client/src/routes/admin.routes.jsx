import { Navigate } from 'react-router-dom';

import { adminAuthLoader } from '../loaders/admin.auth.loder';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminKycPage from '../pages/admin/AdminKycPage';
import AdminLogin from '../pages/admin/AdminLoginPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        loader: adminAuthLoader.publicRoute,
        path: 'login',
        element: <AdminLogin />,
      },

      {
        loader: adminAuthLoader.protectedRoute,
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        loader: adminAuthLoader.protectedRoute,
        path: 'vendor',
        element: <Navigate to="/admin/vendor/pending" replace />,
      },
      {
        loader: adminAuthLoader.protectedRoute,
        path: 'vendor/:status',
        element: <AdminDashboard />,
        children: [{ index: true, element: <AdminKycPage /> }],
      },
    ],
  },
];
