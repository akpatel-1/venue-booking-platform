import { z } from 'zod';

const ALLOWED_STATUS = new Set(['approved', 'rejected']);

const REJECTION_REASONS = [
  'pan_image_unclear',
  'pan_name_mismatch',
  'invalid_pan_number',
  'invalid_address',
  'invalid_phone',
  'document_not_supported',
  'duplicate_application',
];

const rejectionReasonSchema = z.enum(REJECTION_REASONS);

const statusSchema = z
  .string({ message: 'Status is required' })
  .trim()
  .transform((val) => val.toLowerCase())
  .refine((val) => ALLOWED_STATUS.has(val), {
    message: 'Invalid status value',
  });

const schema = {
  status: z.object({
    status: statusSchema,
  }),

  id: z.object({
    id: z.string().trim().uuid({ message: 'Invalid vendor application id' }),
  }),

  review: z
    .object({
      status: statusSchema,

      rejection_reason: rejectionReasonSchema.optional(),
    })
    .refine(
      (data) => {
        if (data.status === 'rejected') {
          return !!data.rejection_reason;
        }
        return !data.rejection_reason;
      },
      {
        message:
          'Rejection reason is required when status is rejected and forbidden otherwise',
        path: ['rejection_reason'],
      }
    ),
};

export default schema;
