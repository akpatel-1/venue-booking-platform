import { useLoaderData } from 'react-router-dom';

import VerificationStatus from '../../components/vendor/application/VerificationStatus';

export default function VendorStatusPage() {
  const data = useLoaderData();

  if (!data) return null;

  if (data.state) {
    return <VerificationStatus state={data.state} reason={data.reason} />;
  }

  return null;
}
