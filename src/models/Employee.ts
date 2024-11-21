import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  userId: string;
  companyId: string;
  roleId: string;
  managerId?: string;
  status: "active" | "under_review" | "hold" | "terminated";
  department: string;
  phone: string;
  email: string;
  position: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyId: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    roleId: { type: String, required: true },
    managerId: { type: String },
    status: {
      type: String,
      enum: ["active", "under_review", "hold", "terminated"],
      default: "active",
    },
    department: { type: String, required: true },
    position: { type: String, required: true },
    joinDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
