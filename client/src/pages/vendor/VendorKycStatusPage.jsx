import { useLoaderData } from 'react-router-dom';

import KycStatus from '../../components/application/KycStatus';

export default function VendorKycStatusPage() {
  const data = useLoaderData();

  if (!data) return null;

  if (data.state) {
    return <KycStatus state={data.state} reason={data.reason} />;
  }

  return null;
}
