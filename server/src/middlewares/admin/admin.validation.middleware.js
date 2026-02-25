import { ApiError } from '../../utils/api.error.utils.js';

export function validateCredentials(req, res, next) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const normalizedEmail = email.trim().toLowerCase();
  req.body.email = normalizedEmail;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new ApiError(400, 'Invalid credentials');
  }

  if (password.trim().length < 12 || password !== password.trim()) {
    throw new ApiError(400, 'Invalid credentials');
  }

  next();
}
