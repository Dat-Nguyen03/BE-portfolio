import express from "express";

import { checkPermission } from "../middlewares/checkPermission.js";
import {
  createSeting,
  getAllSetting,
  getSetting,
  updateSetting,
} from "../controllers/setting.js";

const router = express.Router();
router.get("/setting", getAllSetting), 4;
router.get("/setting/:id", getSetting);
router.patch("/setting/:id", checkPermission, updateSetting);
router.post("/setting", checkPermission, createSeting);

export default router;
