import { HiOutlineCash } from 'react-icons/hi';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { MdOutlineStorefront } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { adminApi } from '../../api/admin.api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const adminNavigationLinks = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: IoHomeOutline,
    color: '#6777F1',
  },
  {
    to: '/admin/application/pending',
    label: 'Vendor KYC',
    icon: RiUserAddLine,
    color: '#b55104',
    children: [
      {
        to: '/admin/application/pending',
        label: 'Pending',
        icon: IoTimeOutline,
        color: '#F59E0B',
      },
      {
        to: '/admin/application/approved',
        label: 'Approved',
        icon: IoCheckmarkCircleOutline,
        color: '#10B981',
      },
      {
        to: '/admin/application/rejected',
        label: 'Rejected',
        icon: IoCloseCircleOutline,
        color: '#EF4444',
      },
    ],
  },
  {
    to: '/admin/venues/status/pendig',
    label: 'Venues',
    icon: MdOutlineStorefront,
    color: '#8B5CF6',
  },
  {
    to: '/admin/transactions',
    label: 'Transactions',
    icon: HiOutlineCash,
    color: '#22C55E',
  },
  {
    to: '/admin/reports',
    label: 'Reports',
    icon: TbReportAnalytics,
    color: '#0EA5E9',
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    icon: IoSettingsOutline,
    color: '#fcba03',
  },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch (err) {
      if (!err.response || err.response.status >= 500) {
        navigate('/error/500');
        return;
      }
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <DashboardLayout
      sidebarLinks={adminNavigationLinks}
      onLogout={handleLogout}
    >
      <Outlet />
    </DashboardLayout>
  );
}
