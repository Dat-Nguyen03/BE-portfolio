import express from "express";
import {
  createProject,
  getAllProject,
  getOneProject,
  remove,
  updateProject,
} from "../controllers/project";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/projects", getAllProject);
router.get("/projects/:id", getOneProject);
router.patch("/projects/:id", checkPermission, updateProject);
router.post("/projects", createProject);
router.delete("/projects/:id", checkPermission, remove);

export default router;
