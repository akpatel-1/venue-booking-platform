import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ApplicationTable from '../../components/application/ApplicationTable';
import { adminVendorKycStore } from '../../store/admin/admin.vendorkyc.store';
import { application } from '../../utils/application';

export default function AdminApplicationPage() {
  const { search } = useLocation();

  const status = application.getStatus({
    search,
  });

  const applications = adminVendorKycStore(
    (state) => state.applicationsByStatus[status] || []
  );
  const loading = adminVendorKycStore(
    (state) => state.loadingByStatus[status] || false
  );
  const hasFetched = adminVendorKycStore(
    (state) => state.hasFetchedByStatus[status] || false
  );
  const fetchApplicationsByStatus = adminVendorKycStore(
    (state) => state.fetchApplicationsByStatus
  );
  const updateApplicationStatus = adminVendorKycStore(
    (state) => state.updateApplicationStatus
  );

  useEffect(() => {
    void fetchApplicationsByStatus(status);
  }, [fetchApplicationsByStatus, status]);

  const approveApplication = async (id) => {
    await updateApplicationStatus(id, { status: 'approved' });
    await fetchApplicationsByStatus(status, true);
  };

  const rejectApplication = async (id, reason) => {
    await updateApplicationStatus(id, {
      status: 'rejected',
      rejection_reason: reason,
    });
    await fetchApplicationsByStatus(status, true);
  };

  return (
    <div className="h-full">
      <ApplicationTable
        applications={applications}
        status={status}
        onApprove={approveApplication}
        onReject={rejectApplication}
        loading={loading || !hasFetched}
      />
    </div>
  );
}
