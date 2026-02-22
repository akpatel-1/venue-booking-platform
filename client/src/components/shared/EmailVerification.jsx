import { useEffect } from 'react';
import { HiMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { userApi } from '../../api/user.api';

export default function EmailVerification() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('pendingEmail');

  useEffect(() => {
    let cancelled = false;

    const interval = setInterval(async () => {
      try {
        const res = await userApi.me();
        if (res.data.verified) {
          clearInterval(interval);
          if (!cancelled) navigate('/home');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            await userApi.refresh();
            const retry = await userApi.me();
            if (retry.data.verified) {
              clearInterval(interval);
              if (!cancelled) navigate('/home');
            }
          } catch {
            clearInterval(interval);
            if (!cancelled) navigate('/login');
          }
        }
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <HiMail className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Please verify your email
        </h1>

        <p className="text-gray-600 mb-2">
          You're almost there! We sent an email to
        </p>

        <p className="text-gray-800 font-semibold mb-6">{email}</p>

        <p className="text-gray-600 mb-2">
          Just click on the link in that email to complete your signup. If you
          don't see it, check your spam folder.
        </p>
      </div>
    </div>
  );
}
