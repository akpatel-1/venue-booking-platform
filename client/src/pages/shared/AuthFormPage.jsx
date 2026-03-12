import { useNavigate, useSearchParams } from 'react-router-dom';

import AuthForm from '../../features/auth/AuthForm';

export default function AuthFormPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const redirect = decodeURIComponent(params.get('redirect') || '/');
  const handleBack = () => navigate(-1);

  const handleSuccess = () => {
    navigate(redirect, { replace: true });
  };

  return (
    <AuthForm
      onSuccess={handleSuccess}
      onClose={handleBack}
      showClose={true}
      exitType="back"
    />
  );
}
