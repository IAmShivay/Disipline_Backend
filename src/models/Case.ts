import mongoose, { Schema, Document } from 'mongoose';

export interface ICase extends Document {
  employeeId: string;
  createdBy: string;
  type: 'performance' | 'policy_violation' | 'review';
  status: 'open' | 'closed' | 'in_progress';
  title: string;
  description: string;
  attachments: {
    url: string;
    uploadedBy: string;
    uploadedAt: Date;
  }[];
  responses: Array<{
    message: string;
    respondedBy: string;
    attachments: string[];
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const caseSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { 
    type: String, 
    enum: ['performance', 'policy_violation', 'review'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['open', 'closed', 'in_progress'],
    default: 'open'
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  attachments: [{
    url: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
    uploadedAt: { type: Date, default: Date.now }
  }],
  responses: [{
    message: String,
    respondedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
    attachments: [String],
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Case = mongoose.model<ICase>('Case', caseSchema);