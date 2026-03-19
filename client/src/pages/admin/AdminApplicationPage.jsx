import { useLocation, useParams } from 'react-router-dom';

import { adminApi } from '../../api/admin.api';
import ApplicationTable from '../../components/application/ApplicationTable';
import { useApplicationData } from '../../hooks/useApplicationData';
import { application } from '../../utils/application';

export default function AdminApplicationPage() {
  const { status: statusFromParams } = useParams();
  const { search } = useLocation();

  const status = application.getStatus({
    params: statusFromParams,
    search,
  });

  const { applications, refresh, loading } = useApplicationData(status);

  const approveApplication = async (id) => {
    await adminApi.approveApplication(id);
    void refresh();
  };

  const rejectApplication = async (id, reason) => {
    await adminApi.rejectApplication(id, reason);
    void refresh();
  };

  return (
    <div className="h-full">
      <ApplicationTable
        applications={applications}
        onApprove={approveApplication}
        onReject={rejectApplication}
        loading={loading}
      />
    </div>
  );
}
