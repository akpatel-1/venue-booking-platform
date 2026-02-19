import 'dotenv/config';

import {
  registerUserWithEmail,
  verifyUserEmail,
} from '../services/user.auth.services.js';

export async function register(req, res) {
  const email = await registerUserWithEmail(req.body);

  return res.status(201).json({
    success: true,
    email,
    message: 'Signup successful. Please verify your email.',
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.params;

  if (!token) {
    return res.redirect(
      302,
      `${process.env.FRONTEND_URL}/email-verified?status=invalid`
    );
  }

  try {
    await verifyUserEmail(token);
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
