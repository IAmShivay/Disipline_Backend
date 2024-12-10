import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Role } from "../models/Role";
import {
  createRoleSchema,
  updateRoleSchema,
} from "../validators/roleValidator";

export const createRole = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createRoleSchema.parse(req.body);
  const roleData = {
    ...validatedData,
    companyId: req.user.companyId,
    createdBy: req.user.userId,
  };
  const existingRole = await Role.findOne({
    name: roleData.name,
    companyId: roleData.companyId,
  });
  if (existingRole) {
    res.status(409);
    throw new Error("Role already exists");
  }
  const role = await Role.create(roleData);
  res.status(201).json(role);
});

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const { companyId } = req.user;
  const roles = await Role.find({companyId});
  res.json(roles);
});

export const updateRole = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateRoleSchema.parse(req.body);
  const role = await Role.findByIdAndUpdate(req.params.id, validatedData, {
    new: true,
  });
  if (!role) {
    res.status(404);
    throw new Error("Role not found");
  }
  res.json(role);
});
