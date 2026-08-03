const isProd = process.env.NODE_ENV === 'production';

export const ADMIN_AUTH_CONFIG = {
  COOKIE_NAME: 'admin_sid',
  SESSION_PREFIX: 'admin:session:',
  SESSION_TTL: 30 * 24 * 60 * 60,
  MAX_AGE: 30 * 24 * 60 * 60 * 1000,

  get ADMIN_COOKIE_OPTIONS() {
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: this.MAX_AGE,
    };
  },

  get ADMIN_CLEAR_COOKIE_OPTIONS() {
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    };
  },
};
