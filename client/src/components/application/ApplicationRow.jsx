import { FiChevronDown, FiFileText } from 'react-icons/fi';

import ActionButtons from './ActionButtons';
import ExpandedDetails from './ExpandedDetails';

export default function ApplicationRow({
  application,
  status,
  isExpanded,
  onToggle,
  onApprove,
  onRejectClick,
  isApproving,
  columns,
}) {
  const renderCellValue = (column, value) => {
    if (column.type === 'document') {
      return value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium inline-flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <FiFileText className="w-4 h-4" /> View
        </a>
      ) : (
        '-'
      );
    }
    if (column.formatter) return column.formatter(value);
    return value || '-';
  };

  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-gray-50"
        onClick={onToggle}
      >
        <td className="px-6 py-4">
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </td>

        {columns.map((column) => (
          <td key={column.key} className="px-6 py-4 text-gray-900">
            {renderCellValue(column, application[column.key])}
          </td>
        ))}

        <td className="px-6 py-4 text-center">
          <ActionButtons
            status={status}
            onApprove={onApprove}
            onRejectClick={onRejectClick}
            isApproving={isApproving}
          />
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="100%">
            <div className="px-6 py-6 bg-gray-50/50">
              <ExpandedDetails
                application={application}
                status={status}
                columns={columns}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
