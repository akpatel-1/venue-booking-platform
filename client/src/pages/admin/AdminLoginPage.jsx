import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AlertCircle, AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react';

import { adminAuthStore } from '../../store/admin/admin.auth.store';
import { loginSchema } from '../../utils/login.schema';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const login = adminAuthStore((state) => state.login);
  const initializeSession = adminAuthStore((state) => state.initializeSession);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentialError, setCredentialError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await initializeSession();
      if (isAuthenticated) {
        navigate('/admin/overview');
      }
    };

    checkAuth();
  }, [initializeSession, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentialError((prev) => ({ ...prev, [`${name}Error`]: '' }));
    setServerError('');
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.trim() : value,
    }));
  };

  const validateCredentials = (e) => {
    const { name, value } = e.target;

    const fieldSchema = loginSchema.shape[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);

    setCredentialError((prev) => ({
      ...prev,
      [`${name}Error`]: result.success
        ? ''
        : result.error.issues[0]?.message || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setCredentialError({ emailError: '', passwordError: '' });
    setServerError('');

    // Validate form data before API call
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setCredentialError({
        emailError: fieldErrors.email?.[0] || '',
        passwordError: fieldErrors.password?.[0] || '',
      });
      return;
    }

    setIsLoading(true);

    try {
      const loginResult = await login(formData);

      if (loginResult.success) {
        navigate('/admin/overview');
      } else if (loginResult.statusCode >= 500) {
        navigate('/error/500');
      } else {
        setServerError(loginResult.serverError);
      }
    } catch {
      navigate('/error/500');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-[#f8f7f4] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#000 39px,#000 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#000 39px,#000 40px)',
          }}
        />

        <div
          className="relative z-10 w-full max-w-100"
          style={{ animation: 'fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <div className="mb-8">
            <h1
              className="text-[2rem] font-bold text-slate-900 leading-tight mb-1.5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Admin Sign In
            </h1>
            <p className="text-slate-500 text-sm">
              Restricted access — authorised personnel only.
            </p>
          </div>

          {serverError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 mb-5 text-red-600 text-[0.825rem] font-medium">
              <AlertTriangle className="shrink-0 text-base" />
              {serverError}
            </div>
          )}

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[0.78rem] font-semibold text-slate-700 tracking-tight"
              >
                Admin email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="admin@venuz.io"
                  required
                  minLength={8}
                  maxLength={50}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={validateCredentials}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 bg-white outline-none transition-all duration-200
                    placeholder:text-slate-300
                    focus:ring-2 focus:ring-violet-500/20
                    ${
                      credentialError.emailError
                        ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/15'
                        : 'border-slate-200 focus:border-violet-500'
                    }`}
                />
              </div>
              {credentialError.emailError && (
                <p
                  className="flex items-center gap-1 text-[0.775rem] text-red-500 font-medium"
                  style={{ animation: 'fadeUp 0.18s ease both' }}
                >
                  <AlertCircle /> {credentialError.emailError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[0.78rem] font-semibold text-slate-700 tracking-tight"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  required
                  minLength={12}
                  maxLength={128}
                  value={formData.password}
                  onBlur={validateCredentials}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-slate-800 bg-white outline-none transition-all duration-200
                    placeholder:text-slate-300
                    focus:ring-2 focus:ring-violet-500/20
                    ${
                      credentialError.passwordError
                        ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/15'
                        : 'border-slate-200 focus:border-violet-500'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[1.1rem] hover:text-violet-500 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {credentialError.passwordError && (
                <p
                  className="flex items-center gap-1 text-[0.775rem] text-red-500 font-medium"
                  style={{ animation: 'fadeUp 0.18s ease both' }}
                >
                  <AlertCircle /> {credentialError.passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 rounded-xl text-sm font-semibold text-white
                bg-slate-900 hover:bg-slate-800
                shadow-[0_4px_14px_rgba(15,23,42,0.25)] hover:shadow-[0_6px_22px_rgba(15,23,42,0.35)]
                hover:-translate-y-px active:translate-y-0
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Admin Portal
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex items-start gap-2.5 bg-amber-50 border border-amber-200/70 rounded-xl px-3.5 py-3">
            <svg
              className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[0.72rem] text-amber-700 leading-relaxed">
              This portal is for <strong>authorised admins only</strong>.
              Unauthorised access attempts are logged and may be reported.
            </p>
          </div>

          <p className="text-center text-[0.72rem] text-slate-400 mt-6">
            © {new Date().getFullYear()} Vyra Technologies. All rights reserved.
          </p>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
