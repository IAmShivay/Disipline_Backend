import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(2).max(50),
  permissions: z.array(z.string()),
  companyId: z.string()
});

export const updateRoleSchema = createRoleSchema.partial();