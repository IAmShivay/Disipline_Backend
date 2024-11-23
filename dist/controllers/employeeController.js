"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.updateEmployeeStatus = exports.getEmployees = exports.createEmployee = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Employee_1 = require("../models/Employee");
const employeeValidator_1 = require("../validators/employeeValidator");
const mailer_1 = require("../mailer/mailer");
const template_1 = require("../mailer/template");
exports.createEmployee = (0, express_async_handler_1.default)(async (req, res) => {
    const validatedData = employeeValidator_1.createEmployeeSchema.parse(req.body);
    if (!req.user) {
        res.status(403);
        throw new Error("Unauthorized access: Missing user information");
    }
    const employeeData = {
        ...validatedData,
        companyId: req.user.companyId,
    };
    const employee = await Employee_1.Employee.create(employeeData);
    await (0, mailer_1.sendMail)(employee.email, "Welcome to Our Company", (0, template_1.newEmployeeTemplate)(employee));
    res.status(201).json(employee);
});
exports.getEmployees = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user.companyId;
    if (!userId) {
        res.status(403);
        throw new Error("Unauthorized access: Missing user information");
    }
    const filter = { companyId: userId };
    const employees = await Employee_1.Employee.find(filter)
        .populate("roleId")
        .populate("managerId");
    res.json(employees);
});
exports.updateEmployeeStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const employee = await Employee_1.Employee.findByIdAndUpdate(id, { status }, { new: true });
    if (!employee) {
        res.status(404);
        throw new Error("Employee not found");
    }
    res.json(employee);
});
exports.updateEmployee = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const updateData = employeeValidator_1.updateEmployeeSchema.parse(req.body);
    const employee = await Employee_1.Employee.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!employee) {
        res.status(404);
        throw new Error("Employee not found");
    }
    res.json(employee);
});
exports.deleteEmployee = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const employee = await Employee_1.Employee.findByIdAndDelete(id);
    if (!employee) {
        res.status(404);
        throw new Error("Employee not found");
    }
    res.json({ message: "Employee deleted successfully" });
});
