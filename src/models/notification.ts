import mongoose, { Schema, Document } from 'mongoose';

// Define the NotificationType enum
export type NotificationType = 
  | 'CASE_CREATED'
  | 'EMPLOYEE_JOINED'
  | 'RESPONSE_SUBMITTED'
  | 'CASE_UPDATED'
  | 'REMINDER'
  | 'CASE_CLOSED'
  | 'STRIKE_RECORDED';

// Interface to define the structure of a Notification document
export interface INotification extends Document {
  type: NotificationType;
  title: string;
  message: string;
  caseId?: string;
  employeeId?: string;
  userId: string;
  isRead: boolean;
  createdAt: Date;
}

// Create the schema
const NotificationSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['CASE_CREATED', 'EMPLOYEE_JOINED', 'RESPONSE_SUBMITTED', 'CASE_UPDATED', 'REMINDER', 'CASE_CLOSED', 'STRIKE_RECORDED'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  caseId: {
    type: String
  },
  employeeId: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
export default mongoose.model<INotification>('Notification', NotificationSchema);