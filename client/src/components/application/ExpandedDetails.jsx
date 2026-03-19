import { FiFileText } from 'react-icons/fi';

export default function ExpandedDetails({ application, status, columns }) {
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
            className="bg-white p-3 rounded border border-gray-200 shadow-sm"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
              {column.label}
            </p>
            <div className="text-sm text-gray-900 font-medium break-all">
              {column.type === 'document' ? (
                application[column.key] ? (
                  isImageDocument(application[column.key]) ? (
                    <div className="space-y-2">
                      <img
                        src={application[column.key]}
                        alt="Document preview"
                        className="w-full max-h-56 object-contain rounded border border-gray-200"
                        loading="lazy"
                      />
                      <a
                        href={application[column.key]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <FiFileText className="w-4 h-4" /> Open Full Image
                      </a>
                    </div>
                  ) : (
                    <a
                      href={application[column.key]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-900 mb-2">
            Rejection Reason
          </p>
          <p className="text-sm text-red-700">{application.rejection_reason}</p>
        </div>
      )}
    </div>
  );
}
