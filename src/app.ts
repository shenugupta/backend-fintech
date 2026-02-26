import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;