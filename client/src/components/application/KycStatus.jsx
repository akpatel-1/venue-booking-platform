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
    navigate('/partners/application/apply');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f5f1eb]">
      <div className="w-full max-w-sm">
        <div
          className="bg-white border-2 border-[#0d0d0d] rounded-xl overflow-hidden"
          style={{ boxShadow: '6px 6px 0 #0d0d0d' }}
        >
          <div className="h-1.5" style={{ background: s.accent }} />

          <div className="px-8 py-10 text-center">
            <div
              className="w-14 h-14 rounded-xl border-2 border-[#0d0d0d] flex items-center justify-center text-2xl mx-auto mb-5"
              style={{ background: s.accent + '18' }}
            >
              {s.icon}
            </div>
            <div className="mb-4 flex justify-center">
              <span
                className="rounded-full border border-[#0d0d0d]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ background: s.accent + '14', color: s.accent }}
              >
                Status: {s.label}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#0d0d0d] mb-2">
              {s.title}
            </h2>

            <p className="text-sm font-light text-[#7a7267] leading-relaxed">
              {s.desc}
            </p>

            {showReason ? (
              <div className="mt-4 text-left bg-[#f5f1eb] border border-[#0d0d0d]/10 rounded-lg p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#7a7267] mb-1">
                  Reason
                </p>
                <p className="text-sm text-[#0d0d0d]">{reason}</p>
              </div>
            ) : null}

            {state === 'rejected' ? (
              <button
                type="button"
                onClick={handleReapply}
                className="mt-5 w-full bg-[#0d0d0d] text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Reapply
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
