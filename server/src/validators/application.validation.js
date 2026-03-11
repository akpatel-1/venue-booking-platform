import { z } from 'zod';

export const vendorApplicationSchema = z.object({
  business_name: z.string().min(3),
  venue_type: z.string().min(2),

  gst_number: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      'Invalid GST format'
    )
    .optional()
    .or(z.literal('')),

  phone: z.string().regex(/^[0-9]{10}$/),

  address: z.string().min(5),

  city: z.string().min(2),

  state: z.string().min(2),

  pincode: z.string().regex(/^[0-9]{6}$/),
});
