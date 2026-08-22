import { z } from 'zod';

const ALLOWED_CATEGORY = ['waterpark', 'amusement_park', 'playzone'];

const schema = z.object({
  name: z.string().trim().min(1, 'Venue name is required'),

  venue_details: z.string().trim().min(10, 'Venue details is required'),

  category: z.enum(ALLOWED_CATEGORY, {
    message: 'Allowed category are waterpark, amusement_park or playzone',
  }),

  address: z.string().trim().min(5, 'Full address is required'),

  district: z.string().trim().min(2, 'District is required'),

  state: z.string().trim().min(1, 'State is required'),

  pincode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),

  latitude: z.coerce.number().min(-90).max(90, 'Invalid latitude'),

  longitude: z.coerce.number().min(-180).max(180, 'Invalid longitude'),
});

export default schema;
