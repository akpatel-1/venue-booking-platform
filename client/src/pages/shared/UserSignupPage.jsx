import { useNavigate } from 'react-router-dom';

import { userApi } from '../../api/user.api';
import LoginForm from '../../components/shared/LoginForm';

export default function UserSignup() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const response = await userApi.signup(formData);
    sessionStorage.setItem('pendingEmail', response.data.email);
    navigate('/verify-email');
  };
  return <LoginForm onSubmit={handleSubmit} formUse={'Create new account'} />;
}
