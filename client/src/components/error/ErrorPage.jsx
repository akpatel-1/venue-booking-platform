import { useNavigate } from 'react-router-dom';

import useDashboardDarkModePreference from '../../hooks/useDashboardDarkModePreference';

export default function ErrorPage({ errorConfig }) {
  const navigate = useNavigate();
  const isDarkMode = useDashboardDarkModePreference();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}
    >
      <div className="text-center">
        <h1
          className={`mb-4 text-8xl font-bold ${
            isDarkMode ? 'text-slate-300' : 'text-zinc-700'
          }`}
        >
          {errorConfig.code}
        </h1>

        <h2
          className={`mb-2 text-2xl font-semibold ${
            isDarkMode ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          {errorConfig.title}
        </h2>

        <p
          className={`mb-8 max-w-md ${
            isDarkMode ? 'text-slate-400' : 'text-gray-700'
          }`}
        >
          {errorConfig.message}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={`rounded-lg border px-5 py-2.5 transition-colors ${
              isDarkMode
                ? 'border-slate-700 text-slate-200 hover:bg-slate-900'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
