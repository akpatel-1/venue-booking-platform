import { Outlet } from 'react-router-dom';

import { Calendar, House, Settings, Store, User, Wallet } from 'lucide-react';

import { userApi } from '../../api/user.api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const vendorNavigationLinks = [
  {
    to: '/partners/dashboard',
    label: 'Dashboard',
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
    label: 'Profile / KYC',
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
  await userApi.logout();
  return (window.location.href = '/');
}

export default function VendorDashboard() {
  return (
    <DashboardLayout
      sidebarLinks={vendorNavigationLinks}
      onLogout={handleLogout}
    >
      <Outlet />
    </DashboardLayout>
  );
}
