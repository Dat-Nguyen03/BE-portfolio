import express from "express";
import { createTechology, getAllTechology } from "../controllers/techology";

const router = express.Router();
router.get("/techology", getAllTechology);
router.post("/techology", createTechology);

export default router;
