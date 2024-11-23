"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.createRoleSchema = void 0;
const zod_1 = require("zod");
exports.createRoleSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50),
    permissions: zod_1.z.array(zod_1.z.string()),
    companyId: zod_1.z.string()
});
exports.updateRoleSchema = exports.createRoleSchema.partial();
