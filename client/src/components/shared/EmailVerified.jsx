import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  const config =
    status === 'success'
      ? {
          icon: HiCheckCircle,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Email Verified!',
          message1: 'Your email has been successfully verified.',
          message2: 'You can now close this tab.',
        }
      : status === 'invalid'
        ? {
            icon: HiExclamationCircle,
            iconBg: 'bg-red-100',
            iconColor: 'text-red-500',
            title: 'Link Invalid or Expired',
            message1: 'This verification link is no longer valid.',
            message2: 'Please request a new verification email.',
          }
        : null;

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Invalid verification response.</p>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center`}
          >
            <Icon className={`w-10 h-10 ${config.iconColor}`} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {config.title}
        </h1>

        <p className="text-gray-600 mb-2">{config.message1}</p>
        <p className="text-gray-600">{config.message2}</p>
      </div>
    </div>
  );
}
