import { z } from 'zod';

const ALLOWED_STATUS = new Set(['pending', 'approved', 'rejected']);

export const schema = {
  status: z.object({
    status: z
      .string({ message: 'Status is required' })
      .trim()
      .refine((val) => ALLOWED_STATUS.has(val.toLowerCase()), {
        message: 'Invalid status value',
      })
      .transform((val) => val.toLowerCase()),
  }),

  id: z.object({
    id: z.string().trim().uuid({ message: 'Invalid application id' }),
  }),

  review: z
    .object({
      status: z
        .string({ message: 'Status is required' })
        .trim()
        .refine((val) => ALLOWED_STATUS.has(val.toLowerCase()), {
          message: 'Invalid status value',
        })
        .transform((val) => val.toLowerCase()),

      rejection_reason: z
        .string()
        .trim()
        .min(3, { message: 'Reason too short' })
        .max(200, { message: 'Reason too long' })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.status === 'rejected') {
          return !!data.rejection_reason;
        }
        return true;
      },
      {
        message: 'Rejection reason is required when status is rejected',
        path: ['rejection_reason'],
      }
    ),
};
