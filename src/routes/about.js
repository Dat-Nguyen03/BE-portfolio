import express from "express";
import { getAllAbout, getOneAbout, updateAbout } from "../controllers/about.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/about", getAllAbout);
router.get("/about/:id", getOneAbout);
router.patch("/about/:id", checkPermission, updateAbout);

export default router;
