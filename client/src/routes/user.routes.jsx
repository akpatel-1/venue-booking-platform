import Home from '../components/user/Home';
import UserAuthenticationPage from '../pages/shared/UserAuthenticationPage';

export const userRoutes = [
  {
    path: '/auth',
    element: <UserAuthenticationPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];
