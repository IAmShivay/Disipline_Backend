"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.getRoles = exports.createRole = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Role_1 = require("../models/Role");
const roleValidator_1 = require("../validators/roleValidator");
exports.createRole = (0, express_async_handler_1.default)(async (req, res) => {
    const validatedData = roleValidator_1.createRoleSchema.parse(req.body);
    const role = await Role_1.Role.create(validatedData);
    res.status(201).json(role);
});
exports.getRoles = (0, express_async_handler_1.default)(async (req, res) => {
    const { companyId } = req.params;
    const roles = await Role_1.Role.find({ companyId });
    res.json(roles);
});
exports.updateRole = (0, express_async_handler_1.default)(async (req, res) => {
    const validatedData = roleValidator_1.updateRoleSchema.parse(req.body);
    const role = await Role_1.Role.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!role) {
        res.status(404);
        throw new Error('Role not found');
    }
    res.json(role);
});
