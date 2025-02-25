import { Router } from "express";
import { TaskService } from "../services/task.service";
import {
  addTaskMiddleware,
  getTaskMiddleware,
} from "../middlewares/task.middleware";

const taskController = Router();
const taskService = new TaskService();

taskController.get("/all", taskService.getTasks);
taskController.get("/task/:name", getTaskMiddleware(), taskService.getTask);
taskController.post("/add", addTaskMiddleware(), taskService.addTask);

export default taskController;
