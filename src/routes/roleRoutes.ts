import express from 'express';
import { createRole, getRoles, updateRole } from '../controllers/roleController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.post('/', createRole);
router.get('/company/:companyId', getRoles);
router.patch('/:id', updateRole);

export { router as roleRoutes };