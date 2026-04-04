import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowRight, CheckCircle2, Clock, User, XCircle } from 'lucide-react';

import { adminOverviewStore } from '../../store/admin/admin.overview.store';

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

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse">
      <div className="absolute top-0 left-0 h-0.5 w-full bg-gray-100" />
      <div className="flex items-center justify-between mb-4 mt-1">
        <div className="h-5 w-20 rounded-md bg-gray-100" />
        <div className="h-4 w-4 rounded bg-gray-100" />
      </div>
      <div className="h-9 w-14 rounded bg-gray-100 mb-2" />
      <div className="h-3 w-28 rounded bg-gray-100" />
    </div>
  );
}

export default function VendorApplications() {
  const navigate = useNavigate();
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
          <User className="h-4 w-4 text-gray-400" />
          <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
            Vendor Applications
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {isLoading
          ? CARD_CONFIG.map((c) => <SkeletonCard key={c.key} />)
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
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm text-left transition-all duration-200 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
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
                    <ArrowRight className="h-4 w-4 text-gray-300 transition-all duration-150 group-hover:text-gray-500 group-hover:translate-x-0.5" />
                  </div>

                  {/* Count */}
                  <p className="text-4xl font-semibold tabular-nums text-gray-800 tracking-tight">
                    {value}
                  </p>

                  {/* Sub-label */}
                  <p className="mt-1 text-xs text-gray-400">
                    {card.description}
                  </p>
                </button>
              );
            })}
      </div>
    </section>
  );
}
