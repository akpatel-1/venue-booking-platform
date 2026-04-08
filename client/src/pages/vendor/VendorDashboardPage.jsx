import { Outlet } from 'react-router-dom';

import { Calendar, House, Settings, Store, User, Wallet } from 'lucide-react';

import Layout from '../../components/dashboard/Layout';
import { clearStoresByRole } from '../../store/user/clean.all.store';
import { userAuthStore } from '../../store/user/user.auth.store';

const vendorNavigationLinks = [
  {
    to: '/partners/overview',
    label: 'Overview',
    icon: House,
    color: '#6777F1',
  },
  {
    to: '/partners/bookings',
    label: 'Bookings',
    icon: Calendar,
    color: '#0EA5E9',
  },
  {
    to: '/partners/venues',
    label: 'My Venues',
    icon: Store,
    color: '#8B5CF6',
  },
  {
    to: '/partners/earnings',
    label: 'Earnings',
    icon: Wallet,
    color: '#22C55E',
  },
  {
    to: '/partners/transactions',
    label: 'Transactions',
    icon: Wallet,
    color: '#16A34A',
  },
  {
    to: '/partners/profile',
    label: 'Profile ',
    icon: User,
    color: '#b55104',
  },
  {
    to: '/partners/settings',
    label: 'Settings',
    icon: Settings,
    color: '#fcba03',
  },
];

async function handleLogout() {
  const role = userAuthStore.getState().user?.role;

  try {
    await userAuthStore.getState().logout();
  } finally {
    clearStoresByRole(role);
  }

  return (window.location.href = '/');
}

export default function VendorDashboard() {
  return (
    <Layout sidebarLinks={vendorNavigationLinks} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );
}
