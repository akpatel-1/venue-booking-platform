import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AlertTriangle, Clock3, ShieldAlert } from 'lucide-react';

import {
  ADMIN_LOGIN_PATH,
  getSafeAdminRedirect,
} from '../../utils/admin.redirect';

const REDIRECT_DELAY_SECONDS = 5;

export default function SessionExpired() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_DELAY_SECONDS);

  const nextRedirect = useMemo(() => {
    const redirectTarget = getSafeAdminRedirect(searchParams.get('redirect'));
    return `${ADMIN_LOGIN_PATH}?redirect=${encodeURIComponent(redirectTarget)}`;
  }, [searchParams]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(intervalId);
          navigate(nextRedirect, { replace: true });
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [navigate, nextRedirect]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f9f7f2] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(251,191,36,0.12),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(14,116,144,0.12),transparent_40%),radial-gradient(circle_at_55%_90%,rgba(239,68,68,0.10),transparent_45%)]" />

      <div className="relative w-full max-w-lg rounded-3xl border border-[#d9d2c4] bg-white/95 p-7 shadow-[0_25px_65px_-24px_rgba(87,67,40,0.45)] backdrop-blur-sm sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
          <ShieldAlert className="h-4 w-4" />
          Security Notice
        </div>

        <h1
          className="text-3xl font-semibold text-[#241b10]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Session Expired
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#645844]">
          Your admin session has ended for security reasons. Please sign in
          again to continue.
        </p>

        <div className="mt-6 rounded-2xl border border-[#efe6d8] bg-[#fffaf0] p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-[#7a5c33]">
            <Clock3 className="h-4 w-4" />
            Redirecting to login in {secondsLeft}s
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f0e7da]">
            <div
              className="h-full rounded-full bg-[#c5853f] transition-all duration-1000"
              style={{
                width: `${(secondsLeft / REDIRECT_DELAY_SECONDS) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(nextRedirect, { replace: true })}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f2937] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#111827]"
        >
          <AlertTriangle className="h-4 w-4" />
          Login Now
        </button>
      </div>
    </div>
  );
}
