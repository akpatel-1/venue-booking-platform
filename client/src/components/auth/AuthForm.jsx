import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiArrowLeft, HiArrowRight, HiXMark } from 'react-icons/hi2';
// Added HiXMark
import { IoWarningOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { userApi } from '../../api/user.api';

/* ── shared primitives ── */
const Label = ({ children }) => (
  <label className="block text-xs font-semibold uppercase tracking-widest text-[#7a7267] mb-1.5">
    {children}
  </label>
);

const ErrorBox = ({ msg }) =>
  msg ? (
    <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 text-sm">
      <IoWarningOutline className="w-4 h-4 shrink-0" /> {msg}
    </div>
  ) : null;

const SubmitBtn = ({ loading, label, loadingLabel }) => (
  <button
    type="submit"
    disabled={loading}
    className="btn-pop w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ff4d1c] text-white font-display font-bold text-sm border-2 border-[#0d0d0d] hover:bg-[#e03d10] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
  >
    {loading ? (
      loadingLabel
    ) : (
      <>
        {label} <HiArrowRight className="w-4 h-4" />
      </>
    )}
  </button>
);

export default function AuthForm({
  isModal = false,
  onSuccess,
  onClose,
  showClose = false,
  exitType = 'back',
}) {
  const navigate = useNavigate();

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const inputRefs = useRef([]);
  const modalRef = useRef(null);

  const clearError = () => setServerError('');
  const resetOtp = () => {
    setOtp(Array(6).fill(''));
    clearError();
  };

  /* ── API handlers ── */
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      await userApi.requestOtp({ email });
      setStep('otp');
    } catch (err) {
      if (!err.response || err.response?.status === 500) {
        navigate('/error/500');
        return;
      }
      setServerError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (otp.some((d) => d === '')) {
      setServerError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const otpString = otp.join('');
      await userApi.verifyOtp({ email, otp: otpString });

      if (onSuccess) {
        onSuccess();
      } else {
        const redirectTo =
          searchParams.get('redirect') || '/partners/application/status';
        navigate(redirectTo);
      }
    } catch (err) {
      if (!err.response || err.response?.status === 500) {
        navigate('/error/500');
        return;
      }
      setServerError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    resetOtp();
    setIsLoading(true);
    try {
      await userApi.resendOtp({ email });
    } catch (err) {
      if (!err.response || err.response?.status === 500) {
        navigate('/error/500');
        return;
      }
      setServerError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── OTP input handlers ── */
  const handleOtpChange = (el, i) => {
    if (isNaN(el.value)) return;
    clearError();
    const next = [...otp];
    next[i] = el.value;
    setOtp(next);
    if (el.value && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pasted)) return;
    setOtp(pasted.split(''));
    clearError();
    inputRefs.current[5]?.focus();
  };

  const handleGoogleAuth = () => console.log('Initiating Google Auth...');

  /* ── shared inner content ── */
  const AuthContent = (
    <div
      ref={isModal ? modalRef : null}
      className="w-full max-w-sm bg-white border-2 border-[#0d0d0d] rounded-xl overflow-hidden relative"
      style={{ boxShadow: '6px 6px 0 #0d0d0d' }}
      onClick={isModal ? (e) => e.stopPropagation() : undefined}
    >
      {/* ── Dynamic Exit Button: Left for Back, Right for Close ── */}
      {isModal &&
        showClose &&
        (exitType === 'back' ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 left-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#7a7267] hover:text-[#ff4d1c] transition-colors z-20"
          >
            <HiArrowLeft size={14} /> Back
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-[#7a7267] hover:text-[#0d0d0d] transition-colors z-20"
          >
            <HiXMark size={20} />
          </button>
        ))}

      {/* Accent bar */}
      <div className="h-1.5 bg-[#ff4d1c]" />

      <div className="px-8 pt-8 pb-6">
        {/* ── EMAIL STEP ── */}
        {step === 'email' && (
          <>
            <h1 className="font-display font-extrabold text-2xl tracking-tight text-[#0d0d0d] mb-1">
              Welcome back
            </h1>
            <p className="text-sm font-light text-[#7a7267] mb-6">
              Sign in to manage your venue, bookings &amp; payouts.
            </p>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border-2 border-[#0d0d0d]/20 text-[#0d0d0d]/40 text-sm font-medium mb-4 cursor-not-allowed opacity-60"
            >
              <FcGoogle className="w-5 h-5" /> Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#0d0d0d]/10" />
              <span className="text-xs text-[#7a7267] font-medium">
                or with email
              </span>
              <div className="flex-1 h-px bg-[#0d0d0d]/10" />
            </div>

            <ErrorBox msg={serverError} />

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label>Email address</Label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError();
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-[#0d0d0d]/20 bg-white text-[#0d0d0d] placeholder-[#7a7267] text-sm focus:outline-none focus:border-[#0d0d0d] transition-colors"
                />
              </div>
              <SubmitBtn
                loading={isLoading}
                label="Send OTP"
                loadingLabel="Sending..."
              />
            </form>
          </>
        )}

        {/* ── OTP STEP ── */}
        {step === 'otp' && (
          <>
            <button
              type="button"
              onClick={() => {
                setStep('email');
                resetOtp();
              }}
              className="flex items-center gap-1.5 text-sm text-[#7a7267] hover:text-[#0d0d0d] mb-6 transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="font-display font-extrabold text-2xl tracking-tight text-[#0d0d0d] mb-1">
              Check your inbox
            </h1>
            <p className="text-sm font-light text-[#7a7267] mb-6">
              We sent a 6-digit code to{' '}
              <span className="font-semibold text-[#1c1a1a]">{email}</span>
            </p>

            <ErrorBox msg={serverError} />

            <form onSubmit={handleOtpSubmit}>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    onPaste={handleOtpPaste}
                    onFocus={(e) => e.target.select()}
                    className={`w-11 h-11 text-center text-base font-display font-bold rounded-lg border-2 transition-all bg-white text-[#0d0d0d] focus:outline-none
                      ${digit ? 'border-[#ff4d1c] shadow-[2px_2px_0_#0d0d0d]' : 'border-[#0d0d0d]/25 focus:border-[#0d0d0d]'}`}
                  />
                ))}
              </div>

              <SubmitBtn
                loading={isLoading}
                label="Verify & Sign In"
                loadingLabel="Verifying..."
              />

              <p className="text-center text-sm text-[#7a7267] mt-4">
                Didn't receive it?{' '}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleResend}
                  className="font-semibold text-[#1c1a1a] hover:text-[#ff4d1c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend code
                </button>
              </p>
            </form>
          </>
        )}
      </div>

      {/* ── NEW: Repositioned Footer Text ── */}
      <div className="px-8 pb-6 border-t border-gray-100 pt-4 bg-gray-50/30">
        <p className="text-center text-[10px] uppercase tracking-[0.15em] text-[#7a7267] font-semibold leading-relaxed">
          Secured with end-to-end encryption <br /> No password required
        </p>
      </div>
    </div>
  );

  /* ── layout wrappers ── */
  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        onClick={onClose ? onClose : undefined}
      >
        {AuthContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4 py-12">
      {AuthContent}
    </div>
  );
}
