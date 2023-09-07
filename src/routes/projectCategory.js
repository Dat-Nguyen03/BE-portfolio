import express from "express";
import {
  createCategory,
  getAllProjectCategory,
  getProjectCategory,
  removeProjectCategory,
  updateProjectCategory,
} from "../controllers/projectCategory.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();
router.get("/project-category", getAllProjectCategory);
router.get("/project-category/:id", getProjectCategory);
router.post("/project-category", checkPermission, createCategory);
router.patch("/project-category/:id", checkPermission, updateProjectCategory);
router.delete("/project-category/:id", checkPermission, removeProjectCategory);

export default router;
