// models/TimelineEvent.ts
import mongoose, { Document, Schema } from "mongoose";

interface ITimelineEvent extends Document {
  caseId: string;
  timestamp: Date;
  event: string;
  description: string;
  createdAt: Date;
  userId: mongoose.Types.ObjectId;
}

const TimelineEventSchema: Schema = new Schema({
  caseId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  event: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITimelineEvent>(
  "TimelineEvent",
  TimelineEventSchema
);
