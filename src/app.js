import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import categoryRouter from "./routes/category";
import projectRouter from "./routes/project";
import projectCategoryRouter from "./routes/projectCategory";
import serviceRouter from "./routes/service";
import settingRouter from "./routes/setting";
import aboutRouter from "./routes/about";
import iconRouter from "./routes/icon";
import techologyRouter from "./routes/techology";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", projectRouter);

app.use("/api", serviceRouter);
app.use("/api", settingRouter);
app.use("/api", aboutRouter);
app.use("/api", iconRouter);
app.use("/api", projectCategoryRouter);
app.use("/api", techologyRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

export const viteNodeApp = app;
