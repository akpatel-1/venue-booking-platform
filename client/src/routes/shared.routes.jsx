import Error403 from '../pages/shared/ErrorPage403';
import Error404 from '../pages/shared/ErrorPage404';
import Error500 from '../pages/shared/ErrorPage500';

export const sharedRoutes = [
  { path: 'error/403', element: <Error403 /> },
  { path: 'error/500', element: <Error500 /> },
  { path: '*', element: <Error404 /> },
];
