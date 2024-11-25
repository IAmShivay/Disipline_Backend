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

// export const employeeResponseSchema = z.object({
//   message: z.string().min(1, "Message is required."),
//   attachments: z.array(z.string().url().optional()).optional(),
//   createdAt: z.date().default(new Date()),
// });

// export const adminResponseSchema = z.object({
//   message: z.string().min(1, "Message is required."),
//   respondedBy: z.string().min(1, "Responder ID is required."), // Typically a MongoDB ObjectId
//   attachments: z.array(z.string().url().optional()).optional(),
//   createdAt: z.date().default(new Date()),
// });
