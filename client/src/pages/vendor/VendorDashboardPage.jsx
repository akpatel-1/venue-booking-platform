import { HiOutlineCash } from 'react-icons/hi';
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiUserLine } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

import DashboardLayout from '../../components/dashboard/DashboardLayout';

const vendorNavigationLinks = [
  {
    to: '/vendor/dashboard',
    label: 'Dashboard',
    icon: IoHomeOutline,
    color: '#6777F1',
  },
  {
    to: '/vendor/bookings',
    label: 'Bookings',
    icon: IoCalendarOutline,
    color: '#0EA5E9',
  },
  {
    to: '/vendor/venues',
    label: 'My Venues',
    icon: MdOutlineStorefront,
    color: '#8B5CF6',
  },
  {
    to: '/vendor/earnings',
    label: 'Earnings',
    icon: HiOutlineCash,
    color: '#22C55E',
  },
  {
    to: '/vendor/transactions',
    label: 'Transactions',
    icon: HiOutlineCash,
    color: '#16A34A',
  },
  {
    to: '/vendor/profile',
    label: 'Profile / KYC',
    icon: RiUserLine,
    color: '#b55104',
  },
  {
    to: '/vendor/settings',
    label: 'Settings',
    icon: IoSettingsOutline,
    color: '#fcba03',
  },
];

export default function VendorDashboard() {
  return (
    <DashboardLayout sidebarLinks={vendorNavigationLinks}>
      <Outlet />
    </DashboardLayout>
  );
}
