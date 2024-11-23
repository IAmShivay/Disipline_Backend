"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.createEmployeeSchema = void 0;
const zod_1 = require("zod");
// Schema for creating a new employee
exports.createEmployeeSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    phone: zod_1.z.string().optional(), // Phone is optional
    department: zod_1.z.string().min(1, { message: "Department is required" }),
    position: zod_1.z.string().min(1, { message: "Position is required" }),
    joinDate: zod_1.z
        .string()
        .transform((str) => new Date(str))
        .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
    }),
    roleId: zod_1.z.enum(["team_member", "team_leader", "manager", "employee"], {
        message: "Invalid role ID",
    }),
    managerId: zod_1.z.string().optional(), // Manager ID is optional
    status: zod_1.z.enum(["active", "inactive", "under_review,", "hold", "terminated"], { message: "Invalid status value" }),
    companyId: zod_1.z.string().optional(), // Company ID is optional
});
// Schema for updating an employee (partial)
exports.updateEmployeeSchema = exports.createEmployeeSchema.partial();
