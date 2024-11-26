import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  companyId: string;
  createdBy: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const roleSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  companyId: { type: String, required: true },
  permissions: [{ type: String }],
}, { timestamps: true });

export const Role = mongoose.model<IRole>('Role', roleSchema);