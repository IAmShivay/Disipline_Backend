import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployeeStatus,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.use(auth);

router.post("/", createEmployee);
router.get("/getEmployee", getEmployees);
router.patch("/:id/status", updateEmployeeStatus);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
export { router as employeeRoutes };
