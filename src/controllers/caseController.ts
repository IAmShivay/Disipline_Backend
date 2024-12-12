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
import Notification from "../models/notification";
import { sendMail } from "../mailer/mailer";
import { Employee } from "../models/Employee";
import {
  warningLetterTemplate,
  caseUpdatedTemplate,
  employeeResponseReceivedTemplate,
} from "../mailer/template";
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
const addNotification = async (
  type: string,
  title: string,
  caseId: string,
  message: string,
  employeeId: string,
  userId: string,
  createdAt: Date,
  isRead: boolean,
  companyId: string
): Promise<void> => {
  const notification = new Notification({
    type,
    title,
    caseId,
    message,
    employeeId,
    userId,
    createdAt,
    isRead,
    companyId,
  });
  await notification.save();
};

export const createCase = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createCaseSchema.parse(req.body);
  const files = req.files as Express.Multer.File[];
  const { companyId, userId } = req.user;
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
    createdBy: companyId,
    initiatedBy: userId,
    attachments,
    status: "OPEN",
    responses: [],
  };
  // const companyId = req.user.companyId;
  const newCase: any = await Case.create(caseData);
  await newCase.populate("employeeId");
  await newCase.populate("createdBy");
  const caseId = newCase._id.toString();
  const Employe = await Employee.findById(newCase.employeeId);
  const { email }: any = Employe;
  console.log("email", email);
  await addTimelineEvent(
    caseId,
    "Case Created",
    `New case was created by ${req.user.fullName}`,
    userId
  );
  await addNotification(
    "CASE_CREATED",
    "New Disciplinary Case Created",
    caseId,
    `A new case "${newCase.type}" has been created.`,
    newCase.employeeId,
    userId,
    new Date(),
    false,
    companyId
  );
  await sendMail(
    email,
    "Case Has Been Registerd",
    warningLetterTemplate(newCase)
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
    const { employeeId, role } = req.user;
    if (role === "employee") {
      const cases = await Case.find({ employeeId });
      res.status(200).json({ success: true, data: cases });
    } else {
      const { companyId: createdBy } = req.user;
      const cases = await Case.find({ createdBy });
      res.status(200).json({ success: true, data: cases });
    }
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
    const { role, employeeId, companyId, userId } = req.user; // Destructure once
    let cases;

    // Check if the role is 'employee'
    if (role === "employee") {
      if (!employeeId) {
        return res
          .status(400)
          .json({ success: false, message: "Employee ID missing" });
      }
      cases = await Case.find({ employeeId });
    } else if (
      role === "HR Manager" ||
      role === "Super Admin" ||
      role === "Editor" ||
      role === "hr" ||
      role === "Company"
    ) {
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "User ID missing" });
      }
      console.log(userId); // Still logging for debugging purposes
      cases = await Case.find({ createdBy: companyId });
      console.log(cases);
    } else {
      res.status(400).json({ success: false, message: "Invalid role" });
      return;
    }

    res.status(200).json({ success: true, data: cases });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ success: false, message: "Error fetching cases", error });
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
  const { companyId, userId } = req.user;
  const files = req.files as Express.Multer.File[];
  const attachments = await Promise.all(
    files.map(async (file) => ({
      url: await uploadFile(file),
      uploadedBy: userId,
      uploadedAt: new Date(),
    }))
  );
  const casea = await Case.findById(id);
  if (!casea) {
    res.status(404);
    throw new Error("Case not found");
  }
  if (casea.status === "CLOSED") {
    res.status(403);
    throw new Error("Case is closed. Cannot update");
  }
  if (casea.initiatedBy !== userId) {
    res.status(401);
    throw new Error("You are not allowed to update this case");
  }
  if (
    casea.adminResponses &&
    casea.adminResponses.length > 0 &&
    casea.employeeResponse &&
    casea.employeeResponse.length > 0
  ) {
    res.status(403);
    throw new Error("Once Communication Started Case Cannot be Updated.");
  }

  const updateData = {
    ...req.body,
    adminResponses: req.body.adminResponses || [],
    employeeResponse: req.body.employeeResponse || [],
    createdBy: companyId,
    attachments,
  };
  const updatedCase: any = await Case.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  await addTimelineEvent(
    updatedCase._id.toString(),
    "Case Updated",
    `The case was updated by ${req.user.fullName}`,
    userId
  );
  await addNotification(
    "CASE_UPDATED",
    "New Disciplinary Case Created",
    updatedCase._id.toString(),
    `A new case "${updatedCase.type}" has been created.`,
    updatedCase.employeeId,
    userId,
    new Date(),
    false,
    companyId
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
    const { message } = req.body;
    const { employeeId } = req.user;
    const files = req.files as Express.Multer.File[];
    const attachments = await Promise.all(
      files.map(async (file) => ({
        url: await uploadFile(file),
        uploadedBy: req.user.userId,
        uploadedAt: new Date(),
      }))
    );
    const casea = await Case.findById(id);

    if (casea?.status === "CLOSED") {
      res.status(403);
      throw new Error("Case is closed. Employee cannot reply.");
    }
    if (employeeId !== casea?.employeeId) {
      res.status(401);
      throw new Error("You are not allowed to respond to this case");
    }
    if (!casea) {
      res.status(404);
      throw new Error("Case not found");
    }
    if (
      casea?.adminResponses &&
      casea.adminResponses.length === 0 &&
      casea.employeeResponse &&
      casea.adminResponses.length < casea.employeeResponse.length
    ) {
      res.status(403);
      throw new Error("You Can Only Reply After Admin Response");
    }
    if (
      (casea?.adminResponses?.length || 0) <
      (casea?.employeeResponse?.length || 0)
    ) {
      res.status(403);
      throw new Error("You Can Only Reply After Admin Response");
    }

    console.log(casea?.adminResponses?.length, casea?.employeeResponse?.length);
    const respondedBy = req.user.userId;

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        $push: {
          employeeResponse: {
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

// Add response from admin
export const addAdminResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = req.body;
    const { userId } = req.user;
    const files = req.files as Express.Multer.File[];
    const attachments = await Promise.all(
      files.map(async (file) => ({
        url: await uploadFile(file),
        uploadedBy: req.user.userId,
        uploadedAt: new Date(),
      }))
    );
    const casea = await Case.findById(id);
    if (userId !== casea?.initiatedBy) {
      res.status(401);
      throw new Error("You are not allowed to respond to this case");
    }
    if (casea?.status === "CLOSED") {
      res.status(403);
      throw new Error("Case is closed. Employee cannot reply.");
    }
    const respondedBy = userId; // Assuming you have user information in the request
    {
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
      // await sendMail(
      //   email,
      //   "Case Has Been Registerd",
      //   employeeResponseReceivedTemplate(updatedCase)
      // );
      res.status(200).json(updatedCase);
    }
  }
);

// Get responses for employee

export const getEmployeeResponses = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: caseId } = req.params;
    const cases = await Case.find({ _id: caseId })
      .select("employeeResponse")
      .sort({ createdAt: -1 });

    res.json(cases);
    console.log(cases);
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
export const updateCaseStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const { userId } = req.user;

    const casea = await Case.findById(id);
    if (!casea) {
      res.status(404);
      throw new Error("Case not found");
    }

    if (casea.initiatedBy !== userId) {
      res.status(401);
      throw new Error("You are not allowed to update this case");
    }
    // Validate the status
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    const employeeId = updatedCase?.employeeId;
    const employee = await Employee.findById(employeeId);
    if (!updatedCase) {
      res.status(404);
      throw new Error("Case not found");
    }
    console.log("updatedCase", updatedCase);
    if (employee?.email && updatedCase) {
      await sendMail(
        employee.email,
        "Case Has Been Registerd",
        caseUpdatedTemplate(updatedCase)
      );
    }
    await addTimelineEvent(
      id,
      "Case Status Updated",
      `Case status was updated to ${status} by ${req.user.fullName}`,
      userId
    );

    res.status(200).json({ success: true, data: updatedCase });
  }
);
