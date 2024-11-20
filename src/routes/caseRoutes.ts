import express from 'express';
import multer from 'multer';
import { createCase, getCases, addResponse } from '../controllers/caseController';
import { auth } from '../middleware/auth';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(auth);

router.post('/', upload.array('attachments'), createCase);
router.get('/', getCases);
router.post('/:id/responses', upload.array('attachments'), addResponse);

export { router as caseRoutes };