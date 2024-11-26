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
  const role = await Role.create(roleData);
  res.status(201).json(role);
});

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const roles = await Role.find({ createdBy: userId });
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
