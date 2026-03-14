import { userAuthService } from './user.auth.service.js';

export const userAuthController = {
  async handleOtpRequest(req, res) {
    await userAuthService.processOtpRequest(req.body);
    return res.status(201).json({
      message: 'Please verify your email to continue',
    });
  },
  async handleOtpVerification(req, res) {
    const { accessToken, refreshToken } =
      await userAuthService.processOtpVerification(req.body);

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

    return res.status(200).json({ message: 'Login successful.' });
  },

  async handleSessionRotation(req, res) {
    const newToken = await userAuthService.processSessionRotation(req.cookies);

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

    res.status(200).json({});
  },
};
