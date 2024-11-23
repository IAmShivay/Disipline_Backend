// routes/caseRoutes.ts
import express from 'express';
import { updateCase, closeCase, deleteCase, getCaseTimeline } from '../controllers/TimelineEvent';

const router = express.Router();

router.put('/:id', updateCase);
router.post('/:id/close', closeCase);
router.delete('/:id', deleteCase);
router.get('/:id/timeline', getCaseTimeline);

export default router;