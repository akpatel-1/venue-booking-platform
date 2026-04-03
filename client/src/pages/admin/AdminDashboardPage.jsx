import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  BarChart3,
  CircleCheck,
  CircleX,
  Clock3,
  Home,
  Settings,
  Store,
  UserPlus,
  Wallet,
} from 'lucide-react';

import { adminApi } from '../../api/admin.api';
import Layout from '../../components/dashboard/Layout';
import { adminAuthStore } from '../../store/admin.auth.store';

const adminNavigationLinks = [
  {
    to: '/admin/overview',
    label: 'Overview',
    icon: Home,
  },
  {
    to: '/admin/application?status=pending',
    label: 'Vendor KYC',
    icon: UserPlus,
    children: [
      {
        to: '/admin/application?status=pending',
        label: 'Pending',
        icon: Clock3,
      },
      {
        to: '/admin/application?status=approved',
        label: 'Approved',
        icon: CircleCheck,
      },
      {
        to: '/admin/application?status=rejected',
        label: 'Rejected',
        icon: CircleX,
      },
    ],
  },
  {
    to: '/admin/venues?status=pendig',
    label: 'Venues',
    icon: Store,
  },
  {
    to: '/admin/transactions',
    label: 'Transactions',
    icon: Wallet,
  },
  {
    to: '/admin/reports',
    label: 'Reports',
    icon: BarChart3,
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const clearSession = adminAuthStore((state) => state.clearSession);

  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch (err) {
      if (!err.response || err.response.status >= 500) {
        navigate('/error/500');
        return;
      }
    } finally {
      clearSession();
      navigate('/admin/login');
    }
  };

  return (
    <Layout sidebarLinks={adminNavigationLinks} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );
}
