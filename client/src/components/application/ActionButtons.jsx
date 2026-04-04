import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import RejectModal from './RejectModal';

export default function ActionButtons({
  status,
  onApprove,
  onRejectClick,
  isApproving,
  isDarkMode = false,
}) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
        <FaCheckCircle className="w-4 h-4" />
        Approved
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span className="inline-flex items-center gap-2 text-red-700 font-semibold">
        <FaTimesCircle className="w-4 h-4" />
        Rejected
      </span>
    );
  }

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onApprove?.();
        }}
        disabled={isApproving}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50"
      >
        {isApproving ? 'Approving...' : 'Approve'}
      </button>
      <RejectModal
        onConfirm={onRejectClick}
        disabled={isApproving}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
