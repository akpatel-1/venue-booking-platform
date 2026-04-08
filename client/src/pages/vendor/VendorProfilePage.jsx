import { createElement, useEffect } from 'react';

import {
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  Fingerprint,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';

import { vendorProfileStore } from '../../store/vendor/vendor.profile.store';

function getInitials(name) {
  if (!name) return '--';
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

function getAccountStatus(profile) {
  if (profile.status === 'banned') return 'banned';
  if (profile.isSuspended) return 'suspended';
  return 'active';
}

function formatJoinedDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

const statusStyles = {
  active: 'bg-[#e6f7ec] text-[#1f7a45] border border-[#bae6c9]',
  banned: 'bg-[#feecec] text-[#a84040] border border-[#f8c5c5]',
  suspended: 'bg-[#fff4df] text-[#8a6232] border border-[#f0d6a8]',
};

function Row({ icon, label, children }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#ead9c2] bg-white px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fff4e5] text-[#8a6232]">
        {createElement(icon, { size: 15 })}
      </div>
      <div className="min-w-20 text-xs font-semibold uppercase tracking-wide text-[#8b7a62]">
        {label}
      </div>
      <div className="ml-auto text-right text-sm font-medium text-[#2b241a]">
        {children}
      </div>
    </div>
  );
}

export default function VendorProfilePage({ profile }) {
  const currentProfile = vendorProfileStore((state) => state.profile);
  const isLoading = vendorProfileStore((state) => state.isLoading);
  const error = vendorProfileStore((state) => state.error);
  const fetchProfile = vendorProfileStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile().catch(() => {});
  }, [fetchProfile]);

  const profileData = currentProfile || profile;

  if (isLoading && !profileData) {
    return (
      <div className="rounded-xl border border-[#ead9c2] bg-white p-6 text-sm text-[#7b6d59] shadow-sm">
        Loading profile...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="rounded-xl border border-[#f2c6c6] bg-[#fff4f4] p-6 text-sm text-[#a84040] shadow-sm">
        {error || 'Profile data unavailable.'}
      </div>
    );
  }

  const accountStatus = getAccountStatus(profileData);

  return (
    <section className="mx-auto w-full  space-y-5">
      <div className="overflow-hidden rounded-2xl border border-[#ead9c2] bg-[#fffdf8]">
        <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#efdcc0] bg-[#fff4e5] text-lg font-bold text-[#8a6232]">
              {getInitials(profileData.displayName)}
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-[#2b241a]">
                {profileData.displayName}
              </p>
              <p className="truncate text-sm text-[#7b6d59]">
                {profileData.email}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#f0d6a8] bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a6232]">
                  {profileData.role}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[accountStatus]}`}
                >
                  {accountStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#ead9c2] bg-white px-4 py-3 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b7a62]">
                Vendor ID
              </p>
              <p className="mt-1 font-mono text-xs text-[#2b241a]">
                {(profileData.id || '--------').slice(0, 8)}...
              </p>
            </div>
            <div className="rounded-lg border border-[#ead9c2] bg-white px-4 py-3 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b7a62]">
                Joined
              </p>
              <p className="mt-1 text-xs font-semibold text-[#2b241a]">
                {formatJoinedDate(profileData.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#ead9c2] bg-white p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8b7a62]">
            Contact Details
          </p>
          <div className="space-y-3">
            <Row icon={Mail} label="Email">
              <span className="text-[#2133d1]">{profileData.email}</span>
            </Row>

            <Row icon={Phone} label="Phone">
              +91 {profileData.phone}
            </Row>

            <Row icon={MapPin} label="Location">
              {profileData.city}, {profileData.state}
            </Row>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ead9c2] bg-white p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8b7a62]">
            Account Details
          </p>
          <div className="space-y-3">
            <Row icon={ShieldCheck} label="Status">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[accountStatus]}`}
              >
                {accountStatus}
              </span>
            </Row>

            {profileData.suspensionReason ? (
              <Row icon={AlertTriangle} label="Reason">
                <span className="max-w-52 text-xs text-[#a84040]">
                  {profileData.suspensionReason}
                </span>
              </Row>
            ) : null}

            <Row icon={BadgeCheck} label="Role">
              <span className="rounded-full border border-[#f0d6a8] bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a6232]">
                {profileData.role}
              </span>
            </Row>

            <Row icon={Fingerprint} label="Vendor ID">
              <span className="font-mono text-xs text-[#7b6d59]">
                {(profileData.id || '--------').slice(0, 8)}...
              </span>
            </Row>

            <Row icon={CalendarDays} label="Joined">
              {formatJoinedDate(profileData.createdAt)}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
