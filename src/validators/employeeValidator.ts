import { z } from "zod";

// Schema for creating a new employee
export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().optional(), // Phone is optional
  department: z.string().min(1, { message: "Department is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  joinDate: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  roleId: z.enum(["team_member", "team_leader", "manager", "employee"], {
    message: "Invalid role ID",
  }),
  managerId: z.string().optional(), // Manager ID is optional
  status: z.enum(
    ["active", "inactive", "under_review,", "hold", "terminated"],
    { message: "Invalid status value" }
  ),
  companyId: z.string().optional(), // Company ID is optional
});

// Schema for updating an employee (partial)
export const updateEmployeeSchema = createEmployeeSchema.partial();

// TypeScript types inferred from schemas
export type CreateEmployee = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof updateEmployeeSchema>;
