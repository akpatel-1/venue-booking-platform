import { HiOutlineCash } from 'react-icons/hi';
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiUserLine } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

import { userApi } from '../../api/user.api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const vendorNavigationLinks = [
  {
    to: '/partners/dashboard',
    label: 'Dashboard',
    icon: IoHomeOutline,
    color: '#6777F1',
  },
  {
    to: '/partners/bookings',
    label: 'Bookings',
    icon: IoCalendarOutline,
    color: '#0EA5E9',
  },
  {
    to: '/partners/venues',
    label: 'My Venues',
    icon: MdOutlineStorefront,
    color: '#8B5CF6',
  },
  {
    to: '/partners/earnings',
    label: 'Earnings',
    icon: HiOutlineCash,
    color: '#22C55E',
  },
  {
    to: '/partners/transactions',
    label: 'Transactions',
    icon: HiOutlineCash,
    color: '#16A34A',
  },
  {
    to: '/partners/profile',
    label: 'Profile / KYC',
    icon: RiUserLine,
    color: '#b55104',
  },
  {
    to: '/partners/settings',
    label: 'Settings',
    icon: IoSettingsOutline,
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
