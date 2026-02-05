import Error403 from "../pages/shared/ErrorPage403";
import Error404 from "../pages/shared/ErrorPage404";
import Error503 from "../pages/shared/ErrorPage500";

export const sharedRoutes = [
  { path: "error/403", element: <Error403 /> },
  { path: "error/500", element: <Error503 /> },
  { path: "*", element: <Error404 /> },
];
