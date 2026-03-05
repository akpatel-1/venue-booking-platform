import { useLoaderData, useRevalidator } from 'react-router-dom';

import VerificationStatus from '../../components/vendor/application/VerificationStatus';
import AuthForm from '../../features/auth/AuthForm';

export default function VendorStatusPage() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  const refreshStatus = () => {
    revalidator.revalidate();
  };

  if (!data) return null;

  if (data.unauthorized) {
    return (
      <AuthForm
        isModal={true}
        onSuccess={refreshStatus}
        showClose={false}
        exitType="back"
      />
    );
  }

  if (data.state) {
    return <VerificationStatus state={data.state} reason={data.reason} />;
  }

  return null;
}
