import { useState } from 'react';
import { LuFileText } from 'react-icons/lu';

import { APPLICATION_COLUMN_CONFIG } from '../../config/application.column';
import TableSection from './TableSection';

export default function ApplicationTable({
  applications = [],
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

  const pendingRows = rows.filter((r) => r.status === 'pending');
  const approvedRows = rows.filter((r) => r.status === 'approved');
  const rejectedRows = rows.filter((r) => r.status === 'rejected');
  const visibleSectionCount = [pendingRows, approvedRows, rejectedRows].filter(
    (sectionRows) => sectionRows.length > 0
  ).length;
  const shouldStretchSection = visibleSectionCount === 1;

  return (
    <div className="h-full min-h-0 flex flex-col space-y-8">
      {pendingRows.length > 0 && (
        <TableSection
          title="Pending Review"
          count={pendingRows.length}
          status="pending"
          variant="pending"
          stretch={shouldStretchSection}
          rows={pendingRows}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          onApprove={handleApproveClick}
          onRejectClick={handleRejectSubmit}
          approvingId={approvingId}
          columns={columnConfig.pending}
        />
      )}

      {approvedRows.length > 0 && (
        <TableSection
          title="Approved Vendors"
          count={approvedRows.length}
          status="approved"
          variant="approved"
          stretch={shouldStretchSection}
          rows={approvedRows}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          columns={columnConfig.approved}
        />
      )}

      {rejectedRows.length > 0 && (
        <TableSection
          title="Rejected Requests"
          count={rejectedRows.length}
          status="rejected"
          variant="rejected"
          stretch={shouldStretchSection}
          rows={rejectedRows}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          columns={columnConfig.rejected}
        />
      )}

      {rows.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center justify-center text-gray-400">
            <LuFileText className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No application yet</p>
            <p className="text-sm mt-1">
              Submitted application requests will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
