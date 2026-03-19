import { TABLE_VARIANT_CONFIG } from '../../config/application.column';
import ApplicationRow from './ApplicationRow';

export default function TableSection({
  title,
  count,
  status,
  variant,
  stretch = false,
  rows,
  expandedId,
  setExpandedId,
  onApprove,
  onRejectClick,
  approvingId,
  columns,
}) {
  const config = TABLE_VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border ${config.borderColor} bg-white shadow-sm overflow-hidden ${stretch ? 'flex flex-col h-full min-h-0' : ''}`}
    >
      <div
        className={`${config.headerBg} px-6 py-4 border-b ${config.borderColor}`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <span
            className={`${config.badgeBg} ${config.badgeText} text-sm font-semibold px-3 py-1 rounded-full`}
          >
            {count} {count === 1 ? 'request' : 'requests'}
          </span>
        </div>
      </div>

      <div
        className={`overflow-y-auto overflow-x-auto ${stretch ? 'flex-1 min-h-0' : 'max-h-[calc(100vh-14rem)]'}`}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 w-8"></th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-center font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((application) => (
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
                columns={columns}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
