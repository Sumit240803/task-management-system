import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "./task.controller";

const router = Router();

router.use(authenticate);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;