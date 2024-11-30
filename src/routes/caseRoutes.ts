import express from "express";
import multer from "multer";
// Importing necessary controllers for handling cases
import {
  createCase,
  getCases,
  getAllCasesByCompany,
  getCasesByEmployeeAndRole,
  getCaseById,
  updateCase,
  deleteCase,
  addEmployeeResponse,
  addAdminResponse,
  getEmployeeResponses,
  getAdminResponses,
  updateCaseStatus,
} from "../controllers/caseController";
import { getTimelineEvents } from "../controllers/Timeline";
// Importing authentication middleware
import { auth, requireAdmin } from "../middleware/auth";
import { getNotificationsByCompanyId, markNotificationAsRead } from "../controllers/notificaation";
const router = express.Router(); // Create a new router instance
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to store files in memory

router.use(auth);
// Apply authentication middleware to all routes in this router

// Route for creating a new case with optional file attachments
router.post("/create/", upload.array("attachments"), createCase);

// Route for retrieving all cases
router.get("/get/", getCases);

// Route for adding a response of admin to a case with optional file attachments

router.post(
  "/:id/admin-responses",
  upload.array("attachments"),
  addAdminResponse
);

// Route for adding a response of employee to a case with optional file attachments

router.post(
  "/:id/employee-responses",
  upload.array("attachments"),
  addEmployeeResponse
);

// Route for retrieving all cases associated with a specific company
router.get("/company/:companyId", getAllCasesByCompany);

// Route for retrieving cases by an employee's ID and their role
router.get("/employee", getCasesByEmployeeAndRole);

// Route for retrieving a specific case by its ID
router.get("/caseId/:id", getCaseById);

// Route for updating a specific case by its ID
router.put("/update/:id", upload.array("attachments"), updateCase);

// Route for deleting a specific case by its ID

router.delete("/delete/:id", deleteCase);

// Route for retrieving all timeline events for a specific case
router.get("/timeline/:id", getTimelineEvents);

// Add employee response
router.post(
  "/:id/employee-response",
  upload.array("attachments"),
  addEmployeeResponse
);

// Add admin response
router.post(
  "/:id/admin-response",
  requireAdmin,
  upload.array("attachments"),
  addAdminResponse
);

// Get employee responses
router.get("/employee-responses/:id", getEmployeeResponses);
router.post("/status/:id", requireAdmin, updateCaseStatus);
// Get admin responses
router.get("/admin-responses", requireAdmin, getAdminResponses);
router.get("/notifications", requireAdmin, getNotificationsByCompanyId);
router.patch("/update-notifications/:id", requireAdmin, markNotificationAsRead);

export { router as caseRoutes };
