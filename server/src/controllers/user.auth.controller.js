import {
  processOtpRequest,
  processOtpVerification,
} from '../services/user.auth.services.js';

export async function handleOtpRequest(req, res) {
  await processOtpRequest(req.body);
  return res.status(201).json({
    success: true,
    message: 'Please verify your email to continue',
  });
}

export async function handleOtpVerification(req, res) {
  await processOtpVerification(req.body);

  return res.status(200).json({ success: true, message: 'Login successful.' });
}
