import Task from "@/common/database/schemas/task.schema";
import { ServerError } from "@/common/server/server.exception";
import { NextFunction, Request, Response } from "express";

export class TaskService {
  constructor() {}

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = 100 } = req.query;
      const tasks = await Task.findAll({ limit: Number(limit) });

      res.json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;

      const task = await Task.findOne({ where: { name } });

      res.json({ task });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, interval_seconds } = req.body;

      if (await Task.findOne({ where: { name } }))
        throw new ServerError("Task with this name already exists", 409);

      const task = await Task.create({
        name,
        intervalSeconds: interval_seconds,
      });

      res.json({ task });
    } catch (error) {
      next(error);
    }
  }
}
