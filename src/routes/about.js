import express from "express";
import { getAllAbout, getOneAbout, updateAbout } from "../controllers/about";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/about", getAllAbout);
router.get("/about/:id", getOneAbout);
router.patch("/about/:id", checkPermission, updateAbout);

export default router;
