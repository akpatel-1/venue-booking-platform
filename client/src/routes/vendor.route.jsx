import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import ApplicationPage from '../pages/vendor/ApplicationPage';
import LandingPage from '../pages/vendor/LandingPage';
import VendorStatusPage from '../pages/vendor/VendorStatusPage';

export const vendorRoutes = [
  {
    path: '/partners',
    element: <LandingPage />,
  },
  {
    path: '/partners/application/apply',
    element: <ApplicationPage />,
  },
  {
    loader: vendorApplicationLoader,
    path: '/partners/application/status',
    element: <VendorStatusPage />,
  },
];
