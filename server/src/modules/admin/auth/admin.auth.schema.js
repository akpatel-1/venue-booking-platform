import { z } from 'zod';

import { ADMIN_AUTH_ERRORS } from './admin.auth.config.js';

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .toLowerCase()
    .email('Invalid email format'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(
      ADMIN_AUTH_ERRORS.PASSWORD_MIN_LENGTH,
      `Password must be at least ${ADMIN_AUTH_ERRORS.PASSWORD_MIN_LENGTH} characters`
    ),
});
