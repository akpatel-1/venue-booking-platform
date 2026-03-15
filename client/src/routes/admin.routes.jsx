import AdminDashboard from '../pages/admin/AdminDashboardPage';
import AdminLogin from '../pages/admin/AdminLoginPage';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <AdminLogin />,
      },

      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
    ],
  },
];
