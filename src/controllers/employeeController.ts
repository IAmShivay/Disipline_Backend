import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Employee } from "../models/Employee";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validators/employeeValidator";
import { sendMail } from "../mailer/mailer";
import { newEmployeeTemplate } from "../mailer/template";

export const createEmployee = asyncHandler(async (req: any, res: Response) => {
  const validatedData = createEmployeeSchema.parse(req.body);
  if (!req.user) {
    res.status(403);
    throw new Error("Unauthorized access: Missing user information");
  }
  const employeeData = {
    ...validatedData,
    companyId: req.user.companyId,
  };
  const employee = await Employee.create(employeeData);
  await sendMail(
    employee.email,
    "Welcome to Our Company",
    newEmployeeTemplate(employee)
  );
  res.status(201).json(employee);
});

export const getEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.companyId;
    if (!userId) {
      res.status(403);
      throw new Error("Unauthorized access: Missing user information");
    }
    const filter: any = { companyId: userId };
    const employees = await Employee.find(filter)
      .populate("roleId")
      .populate("managerId");
    res.json(employees);
  }
);

export const updateEmployeeStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json(employee);
  }
);

export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = updateEmployeeSchema.parse(req.body);

    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json(employee);
  }
);
export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json({ message: "Employee deleted successfully" });
  }
);
