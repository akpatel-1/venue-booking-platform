import { useNavigate } from 'react-router-dom';

const STATES = {
  pending: {
    label: 'Pending',
    icon: '⏳',
    title: 'Your application is under review',
    desc: 'We’ll notify you via email once it’s approved.',
    accent: '#ffb800',
  },
  rejected: {
    label: 'Rejected',
    icon: '✕',
    title: 'Application Rejected',
    desc: "Your application didn't meet our requirements. You can reapply after making changes.",
    accent: '#ff4d1c',
  },
  suspended: {
    label: 'Suspended',
    icon: '🚫',
    title: 'Account Suspended',
    desc: 'Your account is currently suspended.',
    accent: '#ff4d1c',
  },
};

export default function KycStatus({ state, reason }) {
  const navigate = useNavigate();
  const s = STATES[state];
  if (!s) return null;

  const showReason = (state === 'rejected' || state === 'suspended') && reason;

  const handleReapply = () => {
    navigate('/partners/application');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-[#fff7ec] to-[#fffdf8]">
      <div className="w-full max-w-md">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#ead9c2] bg-[#fffaf1]"
          style={{ boxShadow: '0 16px 36px rgba(67, 44, 10, 0.14)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255,175,82,.25) 0%, transparent 75%)',
            }}
          />

          <div className="h-1.5" style={{ background: s.accent }} />

          <div className="relative px-8 py-10 text-center">
            <div
              className="w-16 h-16 rounded-2xl border border-[#ecdac3] flex items-center justify-center text-2xl mx-auto mb-5"
              style={{ background: s.accent + '1F' }}
            >
              {s.icon}
            </div>
            <div className="mb-4 flex justify-center">
              <span
                className="rounded-full border border-[#f0d6a8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ background: s.accent + '14', color: s.accent }}
              >
                Status: {s.label}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#2b241a] mb-2">
              {s.title}
            </h2>

            <p className="text-sm font-light text-[#7a7267] leading-relaxed">
              {s.desc}
            </p>

            {showReason ? (
              <div className="mt-4 text-left bg-[#fff4e3] border border-[#f0dcc0] rounded-xl p-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a7267] mb-1">
                  Reason
                </p>
                <p className="text-sm text-[#2b241a]">{reason}</p>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleHome}
                className="w-full rounded-xl border border-[#ead9c2] bg-white py-2.5 text-sm font-semibold text-[#5f4a2d] hover:bg-[#fff6e9] transition-colors"
              >
                Home
              </button>
              {state === 'rejected' ? (
                <button
                  type="button"
                  onClick={handleReapply}
                  className="w-full rounded-xl border border-[#f0c992] bg-[#ffaf52] py-2.5 text-sm font-semibold text-[#2b241a] hover:bg-[#ffa73f] transition-colors"
                >
                  Reapply
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
