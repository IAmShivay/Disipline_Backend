import { z } from "zod";

export const createCaseSchema = z.object({
  type: z.string().min(5).max(100,{message: "Type must be between 5 and 100 characters"}),
  title: z.string().min(5).max(100,{message: "Title must be between 5 and 100 characters"}),
  description: z.string().min(10,{message: "Description must be at least 10 characters"}),
  employeeId: z.string(),
  employeeName: z.string().min(10).max(100,{message: "Employee name must be between 5 and 100 characters"}),
  incidentDate: z.string(),
  status: z.string().optional(),
});

