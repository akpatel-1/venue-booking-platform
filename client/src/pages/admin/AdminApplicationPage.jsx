import { useLocation } from 'react-router-dom';

import { adminApi } from '../../api/admin.api';
import ApplicationTable from '../../components/application/ApplicationTable';
import { useApplicationData } from '../../hooks/useApplicationData';
import { application } from '../../utils/application';

export default function AdminApplicationPage() {
  const { search } = useLocation();

  const status = application.getStatus({
    search,
  });

  const { applications, refresh, loading } = useApplicationData(status);

  const approveApplication = async (id) => {
    await adminApi.updateStatus(id, { status: 'approved' });
    void refresh();
  };

  const rejectApplication = async (id, reason) => {
    await adminApi.updateStatus(id, {
      status: 'rejected',
      rejection_reason: reason,
    });
    void refresh();
  };

  return (
    <div className="h-full">
      <ApplicationTable
        applications={applications}
        status={status}
        onApprove={approveApplication}
        onReject={rejectApplication}
        loading={loading}
      />
    </div>
  );
}
