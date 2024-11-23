"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResponseSchema = exports.createCaseSchema = void 0;
const zod_1 = require("zod");
exports.createCaseSchema = zod_1.z.object({
    type: zod_1.z.enum(["performance", "policy_violation", "review"]),
    title: zod_1.z.string().min(5).max(100),
    description: zod_1.z.string().min(10),
    employeeId: zod_1.z.string(),
    employeeName: zod_1.z.string(),
    incidentDate: zod_1.z.string(),
    status: zod_1.z.string().optional(),
});
exports.addResponseSchema = zod_1.z.object({
    message: zod_1.z.string().min(1),
});
