import z from 'zod';

const schema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

export default schema;
