import express from "express";
import { categoryController } from "../controllers/categorie";
import { auth } from "../middleware/auth";

const router = express.Router();
router.use(auth);

router.post("/create", categoryController.create);
router.get("/get", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export { router as categorieRoutes };
