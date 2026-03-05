import ApplicationForm from '../components/vendor/application/ApplicationForm';
import LandingPage from '../components/vendor/application/landing/Landing';
import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import VendorDashboardPage from '../pages/vendor/VendorDashboardPage';
import VendorStatusPage from '../pages/vendor/VendorStatusPage';

export const vendorRoutes = [
  {
    path: '/partners',
    element: <LandingPage />,
  },
  {
    path: '/partners/application',
    element: <ApplicationForm />,
  },
  {
    loader: vendorApplicationLoader,
    children: [
      {
        path: '/partners/application/status',
        element: <VendorStatusPage />,
      },
      {
        path: '/partners/dashboard',
        element: <VendorDashboardPage />,
      },
    ],
  },
];
