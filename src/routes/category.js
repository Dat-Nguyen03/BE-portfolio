import express from "express";
import { create, getAll, getOne } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getOne);
router.post("/categories", checkPermission, create);

export default router;
