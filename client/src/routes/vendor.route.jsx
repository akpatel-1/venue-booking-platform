import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import VendorApplicationPage from '../pages/vendor/VendorApplicationPage';
import VendorLandingPage from '../pages/vendor/VendorLandingPage';
import VendorStatusPage from '../pages/vendor/VendorStatusPage';

export const vendorRoutes = [
  {
    path: '/partners',
    element: <VendorLandingPage />,
  },
  {
    path: '/partners/application/apply',
    element: <VendorApplicationPage />,
  },
  {
    loader: vendorApplicationLoader,
    path: '/partners/application/status',
    element: <VendorStatusPage />,
  },
];
