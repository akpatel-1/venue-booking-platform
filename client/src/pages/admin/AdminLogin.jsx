import LoginForm from "../../components/shared/LoginForm.jsx";
import { adminApi } from "../../api/admin.api.js";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await adminApi.login(formData);
    navigate("/admin/dashboard");
  };

  return <LoginForm onSubmit={handleSubmit} formUse='Admin login' />;
}
