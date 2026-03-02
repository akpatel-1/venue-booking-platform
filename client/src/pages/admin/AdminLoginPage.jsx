import { useNavigate } from 'react-router-dom';

import { adminApi } from '../../api/admin.api.js';
import LoginForm from '../../components/admin/LoginForm.jsx';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await adminApi.login(formData);
    navigate('/admin/dashboard');
  };

  return <LoginForm onSubmit={handleSubmit} formUse="Admin login" />;
}
