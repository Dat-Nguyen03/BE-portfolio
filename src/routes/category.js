import express from "express";
import { create, getAll, getOne } from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getOne);
router.post("/categories", checkPermission, create);

export default router;
