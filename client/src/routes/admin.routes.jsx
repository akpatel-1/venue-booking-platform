import {
  protectAdminRoute,
  redirectAdminLogin,
} from '../loaders/admin.auth.loaders';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogin from '../pages/admin/AdminLogin';

export const adminRoutes = [
  {
    path: '/admin',
    children: [
      {
        loader: redirectAdminLogin,
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
