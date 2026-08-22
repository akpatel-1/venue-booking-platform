import { z } from 'zod';

const schema = z.object({
  id: z.string().trim().uuid({ message: 'Invalid venue id' }),
});

export default schema;
