import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./routes/admin.routes";
import { sharedRoutes } from "./routes/shared.routes";

export const router = createBrowserRouter([...adminRoutes, ...sharedRoutes]);
