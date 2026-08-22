import { z } from 'zod';

const REJECTION_REASONS = [
  'pan_image_unclear',
  'pan_name_mismatch',
  'invalid_pan_number',
  'invalid_address',
  'invalid_phone',
  'document_not_supported',
  'duplicate_application',
];

const rejectionReasonSchema = z.enum(REJECTION_REASONS, {
  message: 'Invalid rejection reason',
});

const applicationStatusSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.enum(['pending', 'approved', 'rejected'], {
      message: 'Status must be pending, approved, or rejected',
    })
  );

const reviewStatusSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.enum(['approved', 'rejected'], {
      message: 'Review status must be either approved or rejected',
    })
  );

const schema = {
  status: z.object({
    status: applicationStatusSchema,
  }),

  id: z.object({
    id: z.string().trim().uuid({ message: 'Invalid vendor application id' }),
  }),

  review: z
    .object({
      status: reviewStatusSchema,

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
