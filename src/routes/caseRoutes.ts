import express from "express";
import multer from "multer";
// Importing necessary controllers for handling cases
import {
  createCase,
  getCases,
  addResponse,
  getAllCasesByCompany,
  getCasesByEmployeeAndRole,
  getCaseById,
  updateCase,
  deleteCase,
} from "../controllers/caseController";
// Importing authentication middleware
import { auth } from "../middleware/auth";

const router = express.Router(); // Create a new router instance
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to store files in memory

router.use(auth);
// Apply authentication middleware to all routes in this router

// Route for creating a new case with optional file attachments
router.post("/create/", upload.array("attachments"), createCase);

// Route for retrieving all cases
router.get("/get/", getCases);

// Route for adding a response to a case with optional file attachments
router.post("/:id/responses", upload.array("attachments"), addResponse);

// Route for retrieving all cases associated with a specific company
router.get("/company/:companyId", getAllCasesByCompany);

// Route for retrieving cases by an employee's ID and their role
router.get("/employee/:employeeId/:role", getCasesByEmployeeAndRole);

// Route for retrieving a specific case by its ID
router.get("caseId/:id", getCaseById);

// Route for updating a specific case by its ID
router.put("/update/:id",upload.array("attachments"), updateCase);

// Route for deleting a specific case by its ID
router.delete("/delete/:id", deleteCase);

// Export the router with all configured routes
export { router as caseRoutes };
