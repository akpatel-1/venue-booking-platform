import { ApiError } from '../../utils/api.error.utils.js';

export function validateEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email required');
  }

  const normalizedEmail = email.trim().toLowerCase();
  req.body.email = normalizedEmail;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new ApiError(400, 'Invalid email');
  }

  next();
}

export function validateOtp(req, res, next) {
  const { otp } = req.body;

  const otpRegex = /^[0-9]{6}$/;
  if (!otp || !otpRegex.test(otp)) {
    throw new ApiError(400, 'Invalid OTP');
  }

  next();
}
