import express from "express";
import {
  createIcon,
  getAllIcon,
  getIcon,
  updateIcon,
} from "../controllers/icon";

const router = express.Router();
router.get("/icon", getAllIcon);
router.get("/icon/:id", getIcon);
router.post("/icon", createIcon);
router.patch("/icon/:id", updateIcon);

export default router;
