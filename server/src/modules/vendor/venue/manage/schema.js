import { z } from 'zod';

const reverificationSchema = z.object({
  name: z.string().trim().min(1, 'Venue name is required'),

  category: z.enum(['waterpark', 'amusement_park', 'playzone'], {
    message: 'Allowed category are waterpark, amusement_park or playzone',
  }),

  address: z.string().trim().min(5, 'Full address is required'),

  district: z.string().trim().min(2, 'District is required'),

  state: z.string().trim().min(1, 'State is required'),

  pincode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),

  latitude: z.coerce.number().min(-90).max(90),

  longitude: z.coerce.number().min(-180).max(180),
});

const schema = {
  id: z.object({
    id: z.string().trim().uuid({
      message: 'Invalid venue id',
    }),
  }),

  deleteIds: z.object({
    deleteIds: z.preprocess(
      (value) => {
        if (typeof value !== 'string') {
          return value;
        }

        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },

      z
        .array(
          z.string().trim().uuid({
            message: 'Invalid image id',
          })
        )
        .max(10)
        .refine((ids) => new Set(ids).size === ids.length, {
          message: 'Duplicate image ids are not allowed',
        })
    ),
  }),
  reverification: reverificationSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required for reverification',
    }),
};

export default schema;
