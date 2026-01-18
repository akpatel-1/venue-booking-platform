import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [credentialError, setCredentialError] = useState({
    usernameError: "",
    passwordError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentialError((prev) => ({ ...prev, [`${name}Error`]: "" }));
    setFormData((prev) => ({
      ...prev,
      [name]: name === "username" ? value.trim() : value,
    }));
  };

  const validateCredentials = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const regex = /^[a-zA-Z0-9._-]{8,50}$/;

      setCredentialError((prev) => ({
        ...prev,
        usernameError:
          value && !regex.test(value)
            ? "Username can contain only letters, numbers, . _ -"
            : "",
      }));
    }

    if (name === "password") {
      let error = "";

      if (value.trim().length === 0) {
        error = "Password cannot be empty or spaces only.";
      } else if (value.startsWith(" ") || value.endsWith(" ")) {
        error = "Password cannot start or end with a space.";
      } else if (value.length < 12) {
        error = "Password must be at least 12 characters long.";
      }

      setCredentialError((prev) => ({
        ...prev,
        passwordError: error,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentialError.username || credentialError.password) return;
    onSubmit(formData);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-100'>
      <div className='bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md'>
        <h1 className='text-2xl font-medium mb-8 text-center pb-2 border-b-2 border-purple-500'>
          Log in to your account
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Username */}
          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700'>
              Username
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username'
              required
              minLength={8}
              maxLength={50}
              value={formData.username}
              onChange={handleChange}
              onBlur={validateCredentials}
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            {credentialError.usernameError && (
              <p className='text-red-500 text-sm mt-1'>
                {credentialError.usernameError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              minLength={12}
              maxLength={128}
              value={formData.password}
              onBlur={validateCredentials}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
            {credentialError.passwordError && (
              <p className='text-red-500 text-sm mt-1'>
                {credentialError.passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full py-3 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600'
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
