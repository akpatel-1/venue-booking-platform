import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState("");

  const handleChange = (e) => {
    setUsernameError("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const validateUsername = (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9._-]{8,50}$/;
    if (value && !regex.test(value.trim())) {
      setUsernameError("Username can contain only letters, numbers, . _ -");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameError) return;
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
              onBlur={validateUsername}
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            {usernameError && (
              <p className='text-red-500 text-sm mt-1'>{usernameError}</p>
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
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
            />
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
