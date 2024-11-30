import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import TimelineEvent from "../models/Timeline";

export const getTimelineEvents = asyncHandler(async (req: Request, res: Response) => {
  const caseId = req.params.id;

  if (!caseId) {
    res.status(400);
    throw new Error("Case ID is required");
  }

  const timelineEvents = await TimelineEvent.find({ caseId }).sort({ timestamp: -1 });

  if (timelineEvents?.length === 0) {
    res.status(404);
    throw new Error("No timeline events found for this case");
  }

  res.status(200).json(timelineEvents);
});