import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;