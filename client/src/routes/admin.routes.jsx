import { adminAuthLoader } from '../loaders/admin.auth.loder';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
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
    ],
  },
];
