import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Employee } from "../models/Employee";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validators/employeeValidator";

export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = createEmployeeSchema.parse(req.body);
    console.log("validatedData", validatedData);
    if (!req.user || !req.user.userId) {
      res.status(403);
      throw new Error("Unauthorized access: Missing user information");
    }

    const employeeData = {
      ...validatedData,
      companyId: req.user.userId,
    };
    const employee = await Employee.create(employeeData);
    res.status(201).json(employee);
  }
);
export const getEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(403);
      throw new Error("Unauthorized access: Missing user information");
    }
    const filter: any = { companyId:userId };
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
