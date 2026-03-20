import { useState } from 'react';

import { APPLICATION_COLUMN_CONFIG } from '../../config/application.column';
import TableSection from './TableSection';

export default function ApplicationTable({
  applications = [],
  status = 'pending',
  onApprove,
  onReject,
  onApproveVendor,
  columnConfig = APPLICATION_COLUMN_CONFIG,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  const rows = Array.isArray(applications) ? applications : [];

  const handleRejectSubmit = async (applicationId, reason) => {
    if (onReject && applicationId) {
      await onReject(applicationId, reason);
    }
  };

  const handleApproveClick = async (applicationId) => {
    setApprovingId(applicationId);
    try {
      if (onApproveVendor) await onApproveVendor(applicationId);
      if (onApprove) await onApprove(applicationId);
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setApprovingId(null);
    }
  };

  const statusConfig = {
    pending: {
      title: 'Pending Review',
      status: 'pending',
      variant: 'pending',
      columns: columnConfig.pending,
      emptyMessage: 'No pending requests',
      onApprove: handleApproveClick,
      onRejectClick: handleRejectSubmit,
      approvingId,
    },
    approved: {
      title: 'Approved Vendors',
      status: 'approved',
      variant: 'approved',
      columns: columnConfig.approved,
      emptyMessage: 'No approved vendors',
    },
    rejected: {
      title: 'Rejected Requests',
      status: 'rejected',
      variant: 'rejected',
      columns: columnConfig.rejected,
      emptyMessage: 'No rejected requests',
    },
  };

  const currentSection = statusConfig[status] ?? statusConfig.pending;

  return (
    <div className="h-full min-h-0 flex flex-col">
      <TableSection
        title={currentSection.title}
        count={rows.length}
        status={currentSection.status}
        variant={currentSection.variant}
        rows={rows}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        onApprove={currentSection.onApprove}
        onRejectClick={currentSection.onRejectClick}
        approvingId={currentSection.approvingId}
        columns={currentSection.columns}
        emptyMessage={currentSection.emptyMessage}
        stretch
      />
    </div>
  );
}
