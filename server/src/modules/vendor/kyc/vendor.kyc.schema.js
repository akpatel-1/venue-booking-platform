import { z } from 'zod';

export const vendorKycSchema = z.object({
  pan_name: z
    .string()
    .min(2, 'Full name is required')
    .transform((val) => val.toUpperCase()),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid 10-digit phone number'),
  pan_number: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Invalid PAN format')
    .transform((val) => val.toUpperCase()),
  address: z.string().min(5, 'Full address is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
});
