const isProd = process.env.NODE_ENV === 'production';

export const ADMIN_AUTH_CONFIG = {
  COOKIE_NAME: 'admin_sid',
  SESSION_PREFIX: 'admin:session',
  SESSION_TTL: 7 * 24 * 60 * 60,
  MAX_AGE: 7 * 24 * 60 * 60 * 1000,

  get COOKIE_OPTIONS() {
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: this.MAX_AGE,
    };
  },

  get CLEAR_COOKIE_OPTIONS() {
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    };
  },
};

export const ADMIN_AUTH_ERRORS = {
  ADMIN_ACCESS_REQUIRED: 'ADMIN_ACCESS_REQUIRED',
  PASSWORD_MIN_LENGTH: 12,
};
