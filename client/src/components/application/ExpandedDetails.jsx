import { FiFileText } from 'react-icons/fi';

export default function ExpandedDetails({
  application,
  status,
  columns,
  isDarkMode = false,
}) {
  const isImageDocument = (url) => {
    if (!url || typeof url !== 'string') return false;
    return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`rounded border p-3 shadow-sm ${
              isDarkMode
                ? 'border-slate-700 bg-slate-900'
                : 'border-gray-200 bg-white'
            }`}
          >
            <p
              className={`mb-1 text-xs font-semibold uppercase tracking-wide ${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              }`}
            >
              {column.label}
            </p>
            <div
              className={`text-sm font-medium break-all ${
                isDarkMode ? 'text-slate-100' : 'text-gray-900'
              }`}
            >
              {column.type === 'document' ? (
                application[column.key] ? (
                  isImageDocument(application[column.key]) ? (
                    <div className="space-y-2">
                      <img
                        src={application[column.key]}
                        alt="Document preview"
                        className={`max-h-56 w-full rounded border object-contain ${
                          isDarkMode ? 'border-slate-700' : 'border-gray-200'
                        }`}
                        loading="lazy"
                      />
                      <a
                        href={application[column.key]}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 hover:underline ${
                          isDarkMode
                            ? 'text-sky-400 hover:text-sky-300'
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <FiFileText className="w-4 h-4" /> Open Full Image
                      </a>
                    </div>
                  ) : (
                    <a
                      href={application[column.key]}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 hover:underline ${
                        isDarkMode
                          ? 'text-sky-400 hover:text-sky-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <FiFileText className="w-4 h-4" /> Open Document
                    </a>
                  )
                ) : (
                  '-'
                )
              ) : column.formatter ? (
                column.formatter(application[column.key])
              ) : (
                application[column.key] || '-'
              )}
            </div>
          </div>
        ))}
      </div>

      {status === 'rejected' && application.rejection_reason && (
        <div
          className={`rounded-lg border p-4 ${
            isDarkMode
              ? 'border-rose-500/30 bg-rose-500/10'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <p
            className={`mb-2 text-sm font-semibold ${
              isDarkMode ? 'text-rose-200' : 'text-red-900'
            }`}
          >
            Rejection Reason
          </p>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-rose-300' : 'text-red-700'
            }`}
          >
            {application.rejection_reason}
          </p>
        </div>
      )}
    </div>
  );
}
