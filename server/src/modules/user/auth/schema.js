import { z } from 'zod';

const schema = {
  email: z.object({
    email: z.string().trim().toLowerCase().min(1).email(),
  }),

  verify: z.object({
    email: z.string().trim().toLowerCase().min(1).email(),
    otp: z
      .string()
      .length(6, 'OTP must be exactly 6 digits')
      .regex(/^[0-9]+$/, 'OTP must only contain numbers'),
  }),
};

export default schema;
