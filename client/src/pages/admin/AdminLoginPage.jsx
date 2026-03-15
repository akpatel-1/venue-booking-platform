import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as z from 'zod';

import { adminApi } from '../../api/admin.api';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(50, 'Email cannot exceed 50 characters')
    .email('Invalid email format'),
  password: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: 'Password cannot be empty or spaces only.',
    })
    .refine((value) => !value.startsWith(' ') && !value.endsWith(' '), {
      message: 'Password cannot start or end with a space.',
    })
    .min(12, 'Password must be at least 12 characters long.')
    .max(128, 'Password cannot exceed 128 characters.'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [credentialError, setCredentialError] = useState({
    emailError: '',
    passwordError: '',
  });
  const [serverError, setServerError] = useState('');

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
      const response = await adminApi.login(formData);

      if (response.status === 200) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      const status = err.response?.status;
      const errorMessage = err.response?.data?.message;

      if (!err.response || status >= 500) {
        navigate('/error/500');
        return;
      }

      setServerError(
        errorMessage || 'Invalid credentials or connection issue.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-medium mb-6 text-center pb-2 border-b-2 border-purple-500">
          Admin login
        </h1>
        {serverError && (
          <p className="text-red-500 text-sm mt-1 mb-4">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              required
              minLength={8}
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              onBlur={validateCredentials}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {credentialError.emailError && (
              <p className="text-red-500 text-sm mt-1">
                {credentialError.emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={12}
              maxLength={128}
              value={formData.password}
              onBlur={validateCredentials}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {credentialError.passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {credentialError.passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
