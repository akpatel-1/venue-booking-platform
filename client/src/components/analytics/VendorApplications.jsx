import { useEffect, useState } from 'react';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { adminApi } from '../../api/admin.api';

const INITIAL_COUNTS = {
  pending: 0,
  approved: 0,
  rejected: 0,
};

const CARD_CONFIG = [
  {
    key: 'pending',
    label: 'Pending Requests',
    icon: IoTimeOutline,
    cardClass: 'border-amber-200 bg-amber-50',
    iconClass: 'text-amber-600',
    valueClass: 'text-amber-700',
  },
  {
    key: 'approved',
    label: 'Approved Requests',
    icon: IoCheckmarkCircleOutline,
    cardClass: 'border-emerald-200 bg-emerald-50',
    iconClass: 'text-emerald-600',
    valueClass: 'text-emerald-700',
  },
  {
    key: 'rejected',
    label: 'Rejected Requests',
    icon: IoCloseCircleOutline,
    cardClass: 'border-rose-200 bg-rose-50',
    iconClass: 'text-rose-600',
    valueClass: 'text-rose-700',
  },
];

export default function RequestApplications() {
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState(INITIAL_COUNTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      setIsLoading(true);

      try {
        const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
          adminApi.getStatusCount('pending'),
          adminApi.getStatusCount('approved'),
          adminApi.getStatusCount('rejected'),
        ]);

        setStatusCounts({
          pending: Number(pendingRes?.data?.count ?? 0),
          approved: Number(approvedRes?.data?.count ?? 0),
          rejected: Number(rejectedRes?.data?.count ?? 0),
        });
      } catch (err) {
        if (!err.response || err.response.status >= 500) {
          navigate('/error/500');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchStatusCounts();
  }, [navigate]);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARD_CONFIG.map((card) => {
          const Icon = card.icon;
          const value = Number.isFinite(Number(statusCounts?.[card.key]))
            ? Number(statusCounts[card.key])
            : 0;

          return (
            <button
              type="button"
              key={card.key}
              onClick={() => navigate(`/admin/application?status=${card.key}`)}
              className={`rounded-lg border p-5 shadow-sm text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none ${card.cardClass}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  {card.label}
                </p>
                <Icon className={`h-6 w-6 ${card.iconClass}`} />
              </div>

              <p className={`mt-3 text-3xl font-bold ${card.valueClass}`}>
                {isLoading ? '...' : value}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
