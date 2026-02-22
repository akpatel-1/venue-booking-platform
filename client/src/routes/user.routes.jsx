import Home from '../components/user/Home';
import EmailVerificationPage from '../pages/shared/EmailVerificationPage';
import EmailVerifiedPage from '../pages/shared/EmailVerifiedPage';
import UserSignupPage from '../pages/shared/UserSignupPage';

export const userRoutes = [
  {
    path: '/signup',
    element: <UserSignupPage />,
  },
  {
    path: '/verify-email',
    element: <EmailVerificationPage />,
  },
  {
    path: '/email-verified',
    element: <EmailVerifiedPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];
