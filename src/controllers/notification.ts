import { Request, Response } from 'express';
import Notification, { INotification, NotificationType } from '../models/notification';

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { type, title, message, caseId, employeeId, userId } = req.body;
    
    const notification: INotification = new Notification({
      type,
      title,
      message,
      caseId,
      employeeId,
      userId,
    });

    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error creating notification', error });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching notifications', error });
  }
};

export const getNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching notification', error });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );
    if (updatedNotification) {
      res.status(200).json(updatedNotification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating notification', error });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (deletedNotification) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting notification', error });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(400).json({ message: 'Error marking notifications as read', error });
  }
};

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const count = await Notification.countDocuments({ userId, isRead: false });
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching unread count', error });
  }
};