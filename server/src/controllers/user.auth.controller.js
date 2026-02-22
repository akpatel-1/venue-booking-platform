import 'dotenv/config';

import * as authService from '../services/user.auth.services.js';
import { apiError } from '../utils/api.error.utils.js';

export async function register(req, res) {
  const { userId, email } = await authService.registerUserWithEmail(req.body);

  const { accessToken, refreshToken } = await authService.createSession(userId);

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

  return res.status(201).json({
    success: true,
    email,
    message: 'Signup successful. Please verify your email.',
  });
}

export async function verifyEmail(req, res) {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res.redirect(
      302,
      `${process.env.FRONTEND_URL}/email-verified?status=invalid`
    );
  }

  try {
    await authService.verifyUserEmail(verificationToken);
    return res.redirect(
      302,
      `${process.env.FRONTEND_URL}/email-verified?status=success`
    );
  } catch (error) {
    return res.redirect(
      302,
      `${process.env.FRONTEND_URL}/email-verified?status=invalid`
    );
  }
}

export async function verifyUser(req, res) {
  const data = await authService.checkEmailVerified(req.userId);
  return res.json(data);
}

export async function refreshToken(req, res) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new apiError(401, 'No active session. Please login again');
  }
  const newToken = await authService.rotateSession(refreshToken);

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
