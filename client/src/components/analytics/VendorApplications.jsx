import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowRight, CheckCircle2, Clock, User, XCircle } from 'lucide-react';

import { adminOverviewStore } from '../../store/admin/admin.overview.store';
import { useDashboardTheme } from '../dashboard/dashboard.theme.context';

const CARD_CONFIG = [
  {
    key: 'pending',
    label: 'Pending',
    description: 'Awaiting review',
    icon: Clock,
    bar: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-600 ring-amber-200',
  },
  {
    key: 'approved',
    label: 'Approved',
    description: 'Onboarded vendors',
    icon: CheckCircle2,
    bar: 'bg-emerald-400',
    badge: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
  },
  {
    key: 'rejected',
    label: 'Rejected',
    description: 'Declined applications',
    icon: XCircle,
    bar: 'bg-rose-400',
    badge: 'bg-rose-50 text-rose-600 ring-rose-200',
  },
];

function SkeletonCard({ isDarkMode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 shadow-sm animate-pulse ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900'
          : 'border-gray-100 bg-white'
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-0.5 w-full ${
          isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
        }`}
      />
      <div className="flex items-center justify-between mb-4 mt-1">
        <div
          className={`h-5 w-20 rounded-md ${
            isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
          }`}
        />
        <div
          className={`h-4 w-4 rounded ${
            isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
          }`}
        />
      </div>
      <div
        className={`mb-2 h-9 w-14 rounded ${
          isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
        }`}
      />
      <div
        className={`h-3 w-28 rounded ${
          isDarkMode ? 'bg-slate-800' : 'bg-gray-100'
        }`}
      />
    </div>
  );
}

export default function VendorApplications() {
  const navigate = useNavigate();
  const { isDarkMode } = useDashboardTheme();
  const statusCounts = adminOverviewStore((state) => state.statusCounts);
  const isLoading = adminOverviewStore((state) => state.isLoading);
  const fetchStatusCounts = adminOverviewStore(
    (state) => state.fetchStatusCounts
  );

  useEffect(() => {
    void fetchStatusCounts().catch((err) => {
      if (!err.response || err.response.status >= 500) {
        navigate('/error/500');
      }
    });
  }, [fetchStatusCounts, navigate]);

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User
            className={`h-4 w-4 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`}
          />
          <h2
            className={`text-xs font-semibold tracking-widest uppercase ${
              isDarkMode ? 'text-slate-300' : 'text-gray-500'
            }`}
          >
            Vendor Applications
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {isLoading
          ? CARD_CONFIG.map((c) => (
              <SkeletonCard key={c.key} isDarkMode={isDarkMode} />
            ))
          : CARD_CONFIG.map((card) => {
              const Icon = card.icon;
              const value = Number.isFinite(Number(statusCounts?.[card.key]))
                ? Number(statusCounts[card.key])
                : 0;

              return (
                <button
                  type="button"
                  key={card.key}
                  onClick={() =>
                    navigate(`/admin/application?status=${card.key}`)
                  }
                  className={`group relative overflow-hidden rounded-xl border p-5 shadow-sm text-left transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:shadow-slate-950/30 focus-visible:ring-slate-600'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md focus-visible:ring-gray-300'
                  }`}
                >
                  {/* Colored top accent bar */}
                  <div
                    className={`absolute top-0 left-0 h-0.5 w-full ${card.bar}`}
                  />

                  {/* Label + arrow row */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${card.badge}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {card.label}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition-all duration-150 group-hover:translate-x-0.5 ${
                        isDarkMode
                          ? 'text-slate-500 group-hover:text-slate-300'
                          : 'text-gray-300 group-hover:text-gray-500'
                      }`}
                    />
                  </div>

                  {/* Count */}
                  <p
                    className={`text-4xl font-semibold tabular-nums tracking-tight ${
                      isDarkMode ? 'text-slate-100' : 'text-gray-800'
                    }`}
                  >
                    {value}
                  </p>

                  {/* Sub-label */}
                  <p
                    className={`mt-1 text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-400'
                    }`}
                  >
                    {card.description}
                  </p>
                </button>
              );
            })}
      </div>
    </section>
  );
}
