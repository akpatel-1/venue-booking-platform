import { HiMail } from 'react-icons/hi';

export default function EmailVerification() {
  const email = sessionStorage.getItem('pendingEmail');

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <HiMail className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Please verify your email
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-2">
          You're almost there! We sent an email to
        </p>
        <p className="text-gray-800 font-semibold mb-6">{email}</p>

        {/* Instructions */}
        <p className="text-gray-600 mb-2">
          Just click on the link in that email to complete your signup. If you
          don't see it, you may need to{' '}
          <span className="font-semibold">check your spam</span> folder.
        </p>
      </div>
    </div>
  );
}
