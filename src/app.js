import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import projectRouter from "./routes/project.js";
import projectCategoryRouter from "./routes/projectCategory.js";
import serviceRouter from "./routes/service.js";
import settingRouter from "./routes/setting.js";
import aboutRouter from "./routes/about.js";
import iconRouter from "./routes/icon.js";
import techologyRouter from "./routes/techology.js";
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// export const viteNodeApp = app;
