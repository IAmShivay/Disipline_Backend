import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Employee } from '../models/Employee';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/employeeValidator';

export const createEmployee = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createEmployeeSchema.parse(req.body);
  const employee = await Employee.create(validatedData);
  res.status(201).json(employee);
});

export const getEmployees = asyncHandler(async (req: Request, res: Response) => {
  const { companyId, department } = req.query;
  const filter: any = { companyId };
  if (department) filter.department = department;
  
  const employees = await Employee.find(filter)
    .populate('roleId')
    .populate('managerId');
  res.json(employees);
});

export const updateEmployeeStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const employee = await Employee.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }
  
  res.json(employee);
});