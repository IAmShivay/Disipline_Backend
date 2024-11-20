import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Role } from '../models/Role';
import { createRoleSchema, updateRoleSchema } from '../validators/roleValidator';

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createRoleSchema.parse(req.body);
  const role = await Role.create(validatedData);
  res.status(201).json(role);
});

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const roles = await Role.find({ companyId });
  res.json(roles);
});

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateRoleSchema.parse(req.body);
  const role = await Role.findByIdAndUpdate(
    req.params.id,
    validatedData,
    { new: true }
  );
  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }
  res.json(role);
});