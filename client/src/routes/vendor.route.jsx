import { userProtectedRotue } from '../loaders/user.auth.loader';
import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import VendorDashboard from '../pages/vendor/VendorDashboardPage';
import VendorKycPage from '../pages/vendor/VendorKycPage';
import VendorKycStatusPage from '../pages/vendor/VendorKycStatusPage';
import VendorLandingPage from '../pages/vendor/VendorLandingPage';
import VendorOverviewPage from '../pages/vendor/VendorOveriviewPage';

// Alias for correct naming
const userProtectedRoute = userProtectedRotue;

export const vendorRoutes = [
  {
    path: '/partners',
    element: <VendorLandingPage />,
  },
  {
    path: '/partners/application',
    element: <VendorKycPage />,
  },
  {
    loader: vendorApplicationLoader,
    path: '/partners/application/status',
    element: <VendorKycStatusPage />,
  },
  {
    loader: userProtectedRoute,
    path: '/partners',
    element: <VendorDashboard />,
    children: [
      {
        index: true,
        element: <VendorOverviewPage />,
      },
      {
        path: 'overview',
        element: <VendorOverviewPage />,
      },
    ],
  },
];
