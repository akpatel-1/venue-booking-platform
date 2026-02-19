import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const isError = searchParams.get('status') === 'invalid';

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <HiExclamationCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Link Invalid or Expired
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-2">
            This verification link is no longer valid.
          </p>
          <p className="text-gray-600">
            Please request a new verification email and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <HiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Email Verified!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-2">
          Your email has been successfully verified.
        </p>
        <p className="text-gray-600">You can now close this tab.</p>
      </div>
    </div>
  );
}
