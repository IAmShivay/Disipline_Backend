import { z } from 'zod';

export const createCaseSchema = z.object({
  employeeId: z.string(),
  type: z.enum(['performance', 'policy_violation', 'review']),
  title: z.string().min(5).max(100),
  description: z.string().min(10)
});

export const addResponseSchema = z.object({
  message: z.string().min(1),
  attachments: z.array(z.string()).optional()
});