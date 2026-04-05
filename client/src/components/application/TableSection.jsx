import { TABLE_VARIANT_CONFIG } from '../../config/application.column';
import ApplicationRow from './ApplicationRow';

export default function TableSection({
  title,
  count,
  status,
  variant,
  isDarkMode = false,
  stretch = false,
  rows,
  expandedId,
  setExpandedId,
  onApprove,
  onRejectClick,
  approvingId,
  columns,
  emptyMessage = 'No data available',
}) {
  const config = TABLE_VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className={`overflow-hidden rounded-lg border shadow-sm ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900'
          : `${config.borderColor} bg-white`
      } ${stretch ? 'flex h-full min-h-0 flex-col' : ''}`}
    >
      <div
        className={`border-b px-6 py-4 ${
          isDarkMode
            ? 'border-slate-800 bg-slate-900'
            : `${config.headerBg} ${config.borderColor}`
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-slate-100' : 'text-gray-900'
              }`}
            >
              {title}
            </h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              isDarkMode
                ? 'bg-slate-800 text-slate-200'
                : `${config.badgeBg} ${config.badgeText}`
            }`}
          >
            {count} {count === 1 ? 'request' : 'requests'}
          </span>
        </div>
      </div>

      <div
        className={`stable-scrollbar-gutter overflow-y-auto overflow-x-auto ${stretch ? 'flex-1 min-h-0' : 'max-h-[calc(100vh-14rem)]'}`}
      >
        <table className="w-full text-sm">
          <thead
            className={`sticky top-0 z-10 border-b ${
              isDarkMode
                ? 'border-slate-800 bg-slate-950/80 backdrop-blur'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <tr>
              <th
                className={`w-8 px-6 py-3 text-left font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}
              ></th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left font-semibold ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}
                >
                  {col.label}
                </th>
              ))}
              <th
                className={`px-6 py-3 text-center font-semibold ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? 'divide-slate-800' : 'divide-gray-200'
            }`}
          >
            {rows.length > 0 ? (
              rows.map((application) => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  status={status}
                  isExpanded={expandedId === application.id}
                  onToggle={() =>
                    setExpandedId(
                      expandedId === application.id ? null : application.id
                    )
                  }
                  onApprove={() => onApprove && onApprove(application.id)}
                  onRejectClick={(reason) =>
                    onRejectClick && onRejectClick(application.id, reason)
                  }
                  isApproving={approvingId === application.id}
                  isDarkMode={isDarkMode}
                  columns={columns}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className={`px-6 py-10 text-center text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
