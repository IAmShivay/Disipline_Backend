import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

// These endpoints will be handled by the auth microservice
router.get('/', (req, res) => {
  res.status(501).json({ message: 'This endpoint is handled by the auth microservice' });
});

export { router as companyRoutes };