import { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { IoWarningOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { userApi } from '../../api/user.api';

export default function Authentication() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const resetOtpStep = () => {
    setOtp(['', '', '', '', '', '']);
    setServerError('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
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

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setServerError('');
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Auto-focus previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pasted)) return;

    setOtp(pasted.split(''));
    setServerError('');
    // Focus last input after paste
    inputRefs.current[5]?.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (otp.some((d) => d === '')) {
      setServerError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const otpString = otp.join('');
      await userApi.verifyOtp({ email, otp: otpString });
      navigate('/home');
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

  // TODO: Implement Google OAuth
  const handleGoogleAuth = () => {
    console.log('Initiating Google Auth...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Top accent bar */}
          <div className="h-1 bg-gray-800" />

          <div className="px-8 pt-8 pb-10">
            {/* EMAIL STEP */}
            {step === 'email' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Sign in with a one-time code or continue with Google.
                  </p>
                </div>

                {/* Google Button — not yet implemented */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 bg-white text-gray-400 font-medium text-sm mb-4 cursor-not-allowed opacity-60"
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-xs text-gray-500 font-medium">
                    or with email
                  </span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {serverError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm flex gap-2 items-center">
                      <IoWarningOutline className="w-4 h-4 shrink-0" />
                      {serverError}
                    </p>
                  </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setServerError('');
                      }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        Send OTP <HiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* OTP STEP */}
            {step === 'otp' && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    resetOtpStep();
                  }}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                  <HiArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Check your inbox
                  </h1>
                  <p className="text-gray-600 text-sm">
                    We sent a 6-digit code to{' '}
                    <span className="font-semibold text-gray-900">{email}</span>
                  </p>
                </div>

                {serverError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm flex gap-2 items-center">
                      <IoWarningOutline className="w-4 h-4 shrink-0" />
                      {serverError}
                    </p>
                  </div>
                )}

                <form onSubmit={handleOtpSubmit}>
                  <div className="flex gap-2 justify-center mb-6">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        onFocus={(e) => e.target.select()}
                        className={`w-12 h-12 text-center text-lg font-bold rounded-lg border-2 transition-all bg-white text-gray-900 focus:outline-none ${
                          data
                            ? 'border-gray-800 shadow-sm'
                            : 'border-gray-300 focus:border-gray-800'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mb-4"
                  >
                    {isLoading ? (
                      'Verifying...'
                    ) : (
                      <>
                        Verify & Sign In <HiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Didn't receive it?{' '}
                    <button
                      type="button"
                      disabled={isLoading}
                      className="font-semibold text-gray-900 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Resend code
                    </button>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Secured with end-to-end encryption · No password required
        </p>
      </div>
    </div>
  );
}
