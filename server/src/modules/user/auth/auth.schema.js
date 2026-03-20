import { z } from 'zod';

export const schema = {
  email: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .trim()
      .toLowerCase(),
  }),

  otp: z.object({
    email: z.string().email('Invalid email format').trim().toLowerCase(),
    otp: z
      .string()
      .length(6, 'OTP must be exactly 6 digits')
      .regex(/^[0-9]+$/, 'OTP must only contain numbers'),
  }),
};
