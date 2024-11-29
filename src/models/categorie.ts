import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  companyId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    companyId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);