import { USER_AUTH_CONFIG } from './user.auth.config.js';
import { service } from './user.auth.service.js';

export const controller = {
  async handleMeRequest(req, res) {
    return res.status(200).json({ success: true, user: req.user });
  },

  async handleOtpRequest(req, res) {
    await service.processOtpRequest(req.body);
    return res.status(201).json({
      success: true,
      message: 'Please verify your email to continue',
    });
  },

  async handleOtpVerification(req, res) {
    const { accessToken, refreshToken } = await service.processOtpVerification(
      req.body
    );

    res.cookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      accessToken,
      USER_AUTH_CONFIG.ACCESS_COOKIE_OPTIONS
    );

    res.cookie(
      USER_AUTH_CONFIG.REFRESH_COOKIE,
      refreshToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    return res
      .status(200)
      .json({ success: true, message: 'Login successful.' });
  },

  async handleSessionRotation(req, res) {
    const refreshToken = req.cookies[USER_AUTH_CONFIG.REFRESH_COOKIE];

    const newToken = await service.processSessionRotation(refreshToken);

    res.cookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      newToken.accessToken,
      USER_AUTH_CONFIG.ACCESS_COOKIE_OPTIONS
    );

    res.cookie(
      USER_AUTH_CONFIG.REFRESH_COOKIE,
      newToken.refreshToken,
      USER_AUTH_CONFIG.REFRESH_COOKIE_OPTIONS
    );

    return res.status(200).json({ success: true, message: 'Login successful' });
  },

  async handleLogout(req, res) {
    await service.processLogout(req.userId);

    res.clearCookie(
      USER_AUTH_CONFIG.ACCESS_COOKIE,
      USER_AUTH_CONFIG.ACCESS_CLEAR_COOKIE_OPTIONS
    );

    res.clearCookie(
      USER_AUTH_CONFIG.REFRESH_COOKIE,
      USER_AUTH_CONFIG.REFRESH_CLEAR_COOKIE_OPTIONS
    );

    return res
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  },
};
