import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginForm from "../components/shared/LoginForm";

const AdminRoutes = [
  {
    path: "/admin/login",
    element: <LoginForm />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
];

export default AdminRoutes;
