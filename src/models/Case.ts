import mongoose, { Schema, Document } from "mongoose";

export interface ICase extends Document {
  employeeId: string;
  employeeName: string;
  createdBy: string;
  type: "performance" | "policy_violation" | "review";
  status: "DRAFT" | "OPEN" | "PENDING_RESPONSE" | "UNDER_REVIEW" | "CLOSED";
  title: string;
  incidentDate: Date;
  description: string;
  attachments?: {
    url: string;
    uploadedBy: string;
    uploadedAt: Date;
  }[];
  adminResponses?: Array<
    {
      message: string;
      respondedBy: string;
      attachments: string[];
      createdAt: Date;
    }[]
  >;
  employeeResponse?: Array<{
    message: string;
    attachments: string[];
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
const attachmentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadedAt: { type: Date, default: Date.now },
});

const caseSchema = new Schema(
  {
    incidentDate: { type: Date, required: true },
    employeeName: { type: String, required: true },
    employeeId: { type: String, required: true },
    createdBy: { type: String, required: true },
    type: {
      type: String,
      enum: ["performance", "policy_violation", "review"],
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "PENDING_RESPONSE", "UNDER_REVIEW", "CLOSED"],
      default: "OPEN",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [
      {
        url: String,
        uploadedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    adminResponses: [
      {
        message: String,
        respondedBy: { type: Schema.Types.ObjectId, ref: "User" },
        attachments: [attachmentSchema],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    employeeResponse: [
      {
        message: String,
        attachments: [attachmentSchema],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Case = mongoose.model<ICase>("Case", caseSchema);
