import { Request, Response } from "express";
import Notification from "../models/notification";

export const getNotificationsByCompanyId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId } = req.user;

    const notifications = await Notification.find({ companyId })
      .sort({ createdAt: -1 }) // Sort by most recent first
      .limit(50); // Limit to 50 notifications, adjust as needed

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const markNotificationAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: notificationId } = req.params;
    const { companyId } = req.user;

    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, companyId },
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      res.status(404).json({
        success: false,
        message: "Notification not found or does not belong to the company",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating notification",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
