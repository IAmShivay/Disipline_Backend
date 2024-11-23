"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
// Importing necessary controllers for handling cases
const caseController_1 = require("../controllers/caseController");
// Importing authentication middleware
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router(); // Create a new router instance
exports.caseRoutes = router;
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }); // Configure multer to store files in memory
router.use(auth_1.auth);
// Apply authentication middleware to all routes in this router
// Route for creating a new case with optional file attachments
router.post("/create/", upload.array("attachments"), caseController_1.createCase);
// Route for retrieving all cases
router.get("/get/", caseController_1.getCases);
// Route for adding a response to a case with optional file attachments
router.post("/:id/responses", upload.array("attachments"), caseController_1.addResponse);
// Route for retrieving all cases associated with a specific company
router.get("/company/:companyId", caseController_1.getAllCasesByCompany);
// Route for retrieving cases by an employee's ID and their role
router.get("/employee/:employeeId/:role", caseController_1.getCasesByEmployeeAndRole);
// Route for retrieving a specific case by its ID
router.get("/caseId/:id", caseController_1.getCaseById);
// Route for updating a specific case by its ID
router.put("/update/:id", upload.array("attachments"), caseController_1.updateCase);
// Route for deleting a specific case by its ID
router.delete("/delete/:id", caseController_1.deleteCase);
