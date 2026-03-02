import {
  protectAdminRoute,
  redirectToAdminDashboard,
} from '../loaders/admin.auth.loader';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminLogin from '../pages/admin/AdminLoginPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        loader: redirectToAdminDashboard,
        path: 'login',
        element: <AdminLogin />,
      },
      {
        loader: protectAdminRoute,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
];
