import {
  processOtpRequest,
  processOtpVerification,
  processSessionRotation,
} from '../services/user.auth.services.js';

export async function handleOtpRequest(req, res) {
  await processOtpRequest(req.body);
  return res.status(201).json({
    success: true,
    message: 'Please verify your email to continue',
  });
}

export async function handleOtpVerification(req, res) {
  const { accessToken, refreshToken } = await processOtpVerification(req.body);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true, message: 'Login successful.' });
}

export async function handleSessionRotation(req, res) {
  const newToken = await processSessionRotation(req.cookies);

  res.cookie('accessToken', newToken.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 60 * 1000,
  });

  res.cookie('refreshToken', newToken.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
  });
}
