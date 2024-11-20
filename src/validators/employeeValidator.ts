import { z } from 'zod';

export const createEmployeeSchema = z.object({
  userId: z.string(),
  companyId: z.string(),
  roleId: z.string(),
  managerId: z.string().optional(),
  department: z.string(),
  position: z.string(),
  joinDate: z.string().transform(str => new Date(str))
});

export const updateEmployeeSchema = createEmployeeSchema.partial();