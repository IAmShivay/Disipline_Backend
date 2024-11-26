import express from 'express';
import { createNotification, getNotifications, getNotification, updateNotification, deleteNotification } from '../controllers/notification';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.post('/', createNotification);
router.get('/user/:userId', getNotifications);
router.get('/:id', getNotification);
router.patch('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export { router as notificationRoutes };