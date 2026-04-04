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
  isDarkMode = false,
  columns,
}) {
  const renderCellValue = (column, value) => {
    if (column.type === 'document') {
      return value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1 font-medium hover:underline ${
            isDarkMode
              ? 'text-sky-400 hover:text-sky-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
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
        className={`cursor-pointer transition-colors ${
          isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-50'
        }`}
        onClick={onToggle}
      >
        <td className="px-6 py-4">
          <FiChevronDown
            className={`w-5 h-5 transition-transform ${
              isDarkMode ? 'text-slate-500' : 'text-gray-400'
            } ${isExpanded ? 'rotate-180' : ''}`}
          />
        </td>

        {columns.map((column) => (
          <td
            key={column.key}
            className={`px-6 py-4 ${
              isDarkMode ? 'text-slate-100' : 'text-gray-900'
            }`}
          >
            {renderCellValue(column, application[column.key])}
          </td>
        ))}

        <td className="px-6 py-4 text-center">
          <ActionButtons
            status={status}
            onApprove={onApprove}
            onRejectClick={onRejectClick}
            isApproving={isApproving}
            isDarkMode={isDarkMode}
          />
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="100%">
            <div
              className={`px-6 py-6 ${
                isDarkMode ? 'bg-slate-950/70' : 'bg-gray-50/50'
              }`}
            >
              <ExpandedDetails
                application={application}
                status={status}
                columns={columns}
                isDarkMode={isDarkMode}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
