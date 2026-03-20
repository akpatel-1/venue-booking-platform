import { USER_AUTH_CONFIG } from './user.auth.config.js';
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

    res.cookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      accessToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    res.cookie(
      USER_AUTH_CONFIG.REFRESH_COOKIE,
      refreshToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    return res.status(200).json({ message: 'Login successful.' });
  },

  async handleSessionRotation(req, res) {
    const refreshToken = req.cookies[USER_AUTH_CONFIG.REFRESH_COOKIE];

    const newToken = await userAuthService.processSessionRotation(refreshToken);

    res.cookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      newToken.accessToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    res.cookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      newToken.refreshToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    return res.status(200).json({ message: 'Login successful' });
  },
};
