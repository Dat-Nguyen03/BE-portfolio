import express from "express";
import { sendContact } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/contact", sendContact);

export default contactRouter;
