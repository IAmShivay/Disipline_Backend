import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { roleRoutes } from "./routes/roleRoutes";
import { employeeRoutes } from "./routes/employeeRoutes";
import { caseRoutes } from "./routes/caseRoutes";
import { companyRoutes } from "./routes/companyRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { categorieRoutes } from "./routes/category";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/roles", roleRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/catagories", categorieRoutes);

// Error handling
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
