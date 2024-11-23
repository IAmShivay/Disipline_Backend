"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const roleRoutes_1 = require("./routes/roleRoutes");
const employeeRoutes_1 = require("./routes/employeeRoutes");
const caseRoutes_1 = require("./routes/caseRoutes");
const companyRoutes_1 = require("./routes/companyRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/roles', roleRoutes_1.roleRoutes);
app.use('/api/employees', employeeRoutes_1.employeeRoutes);
app.use('/api/cases', caseRoutes_1.caseRoutes);
app.use('/api/companies', companyRoutes_1.companyRoutes);
// Error handling
app.use(errorHandler_1.errorHandler);
// Database connection
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
