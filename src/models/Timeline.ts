// models/TimelineEvent.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITimelineEvent extends Document {
  timestamp: Date;
  event: string;
  description: string;
  userId: mongoose.Types.ObjectId;
}

const TimelineEventSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  event: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);