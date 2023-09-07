import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
  updateFullFields,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products", checkPermission, create);
router.delete("/products/:id", checkPermission, remove);
router.patch("/products/:id", checkPermission, update);
router.put("/products/:id", checkPermission, updateFullFields);

export default router;
