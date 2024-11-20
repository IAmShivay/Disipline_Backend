import express from 'express';
import { createEmployee, getEmployees, updateEmployeeStatus } from '../controllers/employeeController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.post('/', createEmployee);
router.get('/getEmployee', getEmployees);
router.patch('/:id/status', updateEmployeeStatus);

export { router as employeeRoutes };