"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.employeeRoutes = router;
router.use(auth_1.auth);
router.post("/", employeeController_1.createEmployee);
router.get("/getEmployee", employeeController_1.getEmployees);
router.patch("/:id/status", employeeController_1.updateEmployeeStatus);
router.put("/:id", employeeController_1.updateEmployee);
router.delete("/:id", employeeController_1.deleteEmployee);
