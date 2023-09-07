import express from "express";
import {
  createService,
  getAll,
  getOneService,
  removeService,
  updateService,
} from "../controllers/service";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/services", getAll);
router.get("/services/:id", getOneService);
router.post("/services", checkPermission, createService);
router.delete("/services/:id", checkPermission, removeService);
router.patch("/services/:id", checkPermission, updateService);

export default router;
