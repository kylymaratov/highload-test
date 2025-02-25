import { Router } from "express";
import userController from "./user.controller";
import taskController from "./task.controller";

const router = Router();

router.use("/users/", userController);
router.use("/tasks/", taskController);

export default router;
