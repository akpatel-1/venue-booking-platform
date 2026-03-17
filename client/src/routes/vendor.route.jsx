import { vendorApplicationLoader } from '../loaders/vendor.status.loader';
import VendorKycPage from '../pages/vendor/VendorKycPage';
import VendorKycStatusPage from '../pages/vendor/VendorKycStatusPage';
import VendorLandingPage from '../pages/vendor/VendorLandingPage';

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
];
