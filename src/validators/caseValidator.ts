import { z } from "zod";

export const createCaseSchema = z.object({
  type: z.enum(["performance", "policy_violation", "review"]),
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  employeeId: z.string(),
  employeeName: z.string(),
  incidentDate: z.string(),
  status: z.string().optional(),
});

export const addResponseSchema = z.object({
  message: z.string().min(1),
});
