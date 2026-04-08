import { Navigate } from 'react-router-dom';

import { vendorProtected } from '../loaders/vendor.auth.loader';
import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import VendorAppPage from '../pages/vendor/VendorAppPage';
import VendorAppStatusPage from '../pages/vendor/VendorAppStatusPage';
import VendorDashboard from '../pages/vendor/VendorDashboardPage';
import VendorLandingPage from '../pages/vendor/VendorLandingPage';
import VendorOverviewPage from '../pages/vendor/VendorOveriviewPage';
import VendorProfilePage from '../pages/vendor/VendorProfilePage';

export const vendorRoutes = [
  {
    path: '/partners/landing',
    element: <VendorLandingPage />,
  },
  {
    path: '/partners/application',
    element: <VendorAppPage />,
  },
  {
    loader: vendorApplicationLoader,
    path: '/partners/application/status',
    element: <VendorAppStatusPage />,
  },
  {
    loader: vendorProtected,
    path: '/partners',
    element: <VendorDashboard />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: 'overview',
        element: <VendorOverviewPage />,
      },
      {
        path: 'profile',
        element: <VendorProfilePage />,
      },
    ],
  },
];
