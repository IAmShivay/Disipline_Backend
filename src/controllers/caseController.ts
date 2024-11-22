import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Case } from "../models/Case";
import {
  createCaseSchema,
  addResponseSchema,
} from "../validators/caseValidator";
import { uploadFile } from "../utils/fileUpload";

export const createCase = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createCaseSchema.parse(req.body);
  const files = req.files as Express.Multer.File[];
  const { userId } = req.user;
  const attachments = await Promise.all(
    files.map(async (file) => ({
      url: await uploadFile(file),
      uploadedBy: userId,
      uploadedAt: new Date(),
    }))
  );
  const caseData = {
    ...validatedData,
    employeeId: userId,
    createdBy: userId,
    attachments,
    status: "open",
    responses: [],
  };
  const newCase = await Case.create(caseData);

  // Populate the employee and createdBy fields
  await newCase.populate("employeeId");
  await newCase.populate("createdBy");

  res.status(201).json(newCase);
});
export const addResponse = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedData = addResponseSchema.parse(req.body);
  const files = req.files as Express.Multer.File[];

  const attachments = await Promise.all(files.map((file) => uploadFile(file)));

  const updatedCase = await Case.findByIdAndUpdate(
    id,
    {
      $push: {
        responses: {
          ...validatedData,
          // respondedBy: req.user.id,
          attachments,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  if (!updatedCase) {
    res.status(404);
    throw new Error("Case not found");
  }

  res.json(updatedCase);
});

export const getCases = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId, status, type } = req.query;
  const filter: any = {};

  if (employeeId) filter.employeeId = employeeId;
  if (status) filter.status = status;
  if (type) filter.type = type;

  const cases = await Case.find(filter)
    .populate("employeeId")
    .populate("createdBy")
    .sort({ createdAt: -1 });

  res.json(cases);
});
