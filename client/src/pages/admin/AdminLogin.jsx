import LoginForm from "../../components/shared/LoginForm";
import adminApi from "../../api/admin.api";

export default function AdminLogin() {
  const handleSubmit = async (formData) => {
    await adminApi.login(formData);
  };
  return <LoginForm onSubmit={handleSubmit} />;
}
