import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Case } from "../models/Case";
import {
  createCaseSchema,
  // employeeResponseSchema,
  // adminResponseSchema,
} from "../validators/caseValidator";
import { uploadFile } from "../utils/fileUpload";
import TimelineEvent from "../models/Timeline";
import mongoose from "mongoose";
// Create a new Case
const addTimelineEvent = async (
  caseId: string,
  event: string,
  description: string,
  userId: string
): Promise<void> => {
  const timelineEvent = new TimelineEvent({
    caseId,
    event,
    description,
    userId: new mongoose.Types.ObjectId(userId),
  });
  await timelineEvent.save();
};
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
  console.log(validatedData);
  const caseData = {
    ...validatedData,
    createdBy: userId,
    attachments,
    status: "open",
    responses: [],
  };
  const newCase: any = await Case.create(caseData);
  await newCase.populate("employeeId");
  await newCase.populate("createdBy");
  const caseId = newCase._id.toString();
  await addTimelineEvent(
    caseId,
    "Case Created",
    "New case was created",
    userId
  );
  res.status(201).json(newCase);
});

// Get all cases

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

// Get all cases by company

export const getAllCasesByCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId } = req.params;
    const cases = await Case.find({ companyId });
    res.status(200).json({ success: true, data: cases });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cases", error });
  }
};

// Get cases by employee and role

export const getCasesByEmployeeAndRole = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { role, employeeId, userId } = req.user; // Destructure once
    let cases;

    // Check if the role is 'employee'
    if (role === "employee") {
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee ID missing" });
      }
      cases = await Case.find({ employeeId });

    } else if (role === "user") {
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID missing" });
      }
      console.log(userId); // Still logging for debugging purposes
      cases = await Case.find({createdBy: userId });
      console.log(cases)
    } else {
      res.status(400).json({ success: false, message: "Invalid role" });
      return;
    }

    res.status(200).json({ success: true, data: cases });
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Error fetching cases", error });
  }
};

// Get Cases by id for a case

export const getCaseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id);
    const caseItem = await Case.findById(id);
    if (!caseItem) {
      res.status(404).json({ success: false, message: "Case not found" });
      return;
    }
    res.status(200).json({ success: true, data: caseItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching case", error });
  }
};

// Update a case

export const updateCase = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user;
  const files = req.files as Express.Multer.File[];
  const attachments = await Promise.all(
    files.map(async (file) => ({
      url: await uploadFile(file),
      uploadedBy: userId,
      uploadedAt: new Date(),
    }))
  );
  const updateData = {
    ...req.body,
    createdBy: userId,
    attachments,
  };
  const updatedCase: any = await Case.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  await addTimelineEvent(
    updatedCase._id.toString(),
    "Case Updated",
    "The case was updated",
    userId
  );
  if (!updatedCase) {
    res.status(404).json({ success: false, message: "Case not found" });
    return;
  }

  res.status(200).json({ success: true, data: updatedCase });
});

// Delete a case

export const deleteCase = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCase = await Case.findByIdAndDelete(id);
    const { userId } = req.user;
    await addTimelineEvent(id, "Case Deleted", "The case was deleted", userId);
    if (!deletedCase) {
      res.status(404).json({ success: false, message: "Case not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Case deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting case", error });
  }
};

// Add response from employee

export const addEmployeeResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message, attachments } = req.body;

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        $push: {
          employeeResponse: {
            message,
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

    res.status(200).json(updatedCase);
  }
);

// Add response from admin
export const addAdminResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message, attachments } = req.body;
    const respondedBy = req.user.id; // Assuming you have user information in the request

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        $push: {
          adminResponses: {
            message,
            respondedBy,
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

    res.status(200).json(updatedCase);
  }
);

// Get responses for employee

export const getEmployeeResponses = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const cases = await Case.find({ employeeId })
      .select("responses")
      .sort({ createdAt: -1 });

    res.json(cases);
  }
);

// Get responses for admin

export const getAdminResponses = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    const cases = await Case.find({
      "responses.adminResponse.respondedBy": userId,
    })
      .select("responses")
      .sort({ createdAt: -1 });

    res.json(cases);
  }
);
