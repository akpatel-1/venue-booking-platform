import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/shared/DashboardLayout";
import { adminApi } from "../../api/admin.api";
import { useNavigate } from "react-router-dom";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineStorefront } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";

const adminNavigationLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: IoHomeOutline },
  { to: "/admin/owners", label: "Owner KYC", icon: RiUserAddLine },
  { to: "/admin/venues", label: "Venues", icon: MdOutlineStorefront },
  { to: "/admin/transactions", label: "Transactions", icon: HiOutlineCash },
  { to: "/admin/reports", label: "Reports", icon: TbReportAnalytics },
  { to: "/admin/settings", label: "Settings", icon: IoSettingsOutline },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch (err) {
      if (!err.response || err.response.status >= 500) {
        navigate("/error/500");
        return;
      }
    } finally {
      navigate("/admin/login");
    }
  };

  return (
    <DashboardLayout
      sidebarLinks={adminNavigationLinks}
      onLogout={handleLogout}
    >
      <Outlet />
    </DashboardLayout>
  );
}
