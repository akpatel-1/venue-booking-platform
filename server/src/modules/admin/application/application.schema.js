import { z } from 'zod';

import { APPLICATION_STATUS } from './application.config.js';

const ALLOWED_STATUS = new Set(Object.values(APPLICATION_STATUS));

export const applicationSchema = {
  status: z.object({
    status: z
      .string({ message: 'Status is required' })
      .trim()
      .refine((val) => ALLOWED_STATUS.has(val.toLowerCase()), {
        message: 'Invalid status value',
      })
      .transform((val) => val.toLowerCase()),
  }),
};
