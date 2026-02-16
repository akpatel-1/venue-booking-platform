import { registerEmailUser } from '../services/user.auth.services.js';

export async function registerWithEmail(req, res) {
  await registerEmailUser(req.body);

  res.status(201).json({
    message: 'Signup successful. Please verify your email.',
  });
}
