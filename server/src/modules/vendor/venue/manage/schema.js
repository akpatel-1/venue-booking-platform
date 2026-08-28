import { z } from 'zod';

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
};

export default schema;
