"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.roleRoutes = router;
router.use(auth_1.auth);
router.post('/', roleController_1.createRole);
router.get('/company/:companyId', roleController_1.getRoles);
router.patch('/:id', roleController_1.updateRole);
