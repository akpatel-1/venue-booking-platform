import { z } from 'zod';

export const venueId = z.object({
  venueId: z.string().trim().uuid({
    message: 'Invalid venue id',
  }),
});
