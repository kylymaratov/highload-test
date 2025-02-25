import { Sequelize } from "sequelize";
import { v4 } from "uuid";
import os from "os";
import Task from "@/common/database/schemas/task.schema";
import TaskLogs from "@/common/database/schemas/task.logs.schema";
import { Op } from "sequelize";
import EventEmitter from "events";
import serverEmitter from "@/common/server/server.emitter";

export class TaskScheduler {
  private instanceId: string = `${os.hostname()}-${v4()}`;
  private timeout: number = 10000;
  // Зная количество запущенных экземпляров можно распределялись задачи более равномерно
  // private instancesCount: 5 | null = null;

  private async getTasks() {
    const avialableTasks = await Task.findAll({
      where: {
        isRunning: false,
        [Op.or]: [
          { lastRunTime: null },
          Sequelize.literal(
            `EXTRACT(EPOCH FROM NOW() - "Task"."lastRunTime") * 1000 >= "Task"."intervalSeconds" * 1000`
          ),
        ],
      },
      order: Sequelize.literal("random()"),
    });

    return avialableTasks;
  }

  private wait(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  private async endTask(task: any, status: "success" | "error") {
    await Task.update(
      {
        isRunning: false,
        runningInstanceId: null,
      },
      { where: { id: task.id } }
    );

    await TaskLogs.create({
      taskName: task.name,
      instanceId: this.instanceId,
      finishedAt: new Date(),
      status,
    });
    serverEmitter.emit("log", {
      task,
      instanceId: this.instanceId,
      status: "completed",
    });
  }

  private async process(task: any) {
    try {
      console.info(`Task ${task.name} started instanceId: ${this.instanceId}`);
      serverEmitter.emit("log", {
        task,
        instanceId: this.instanceId,
        status: "started",
      });

      await this.wait(this.timeout);
      await this.endTask(task, "success");
      console.info(`Task ${task.name} completed on ${this.instanceId}`);
    } catch (error) {
      console.error(`Task failed ${task.name} on ${this.instanceId}: ${error}`);
      await this.endTask(task, "error");
    }
  }

  async revert() {
    try {
      await Task.update(
        { isRunning: false, runningInstanceId: null },
        { where: { isRunning: true, runningInstanceId: this.instanceId } }
      );
    } catch {}
  }

  async start() {
    try {
      serverEmitter.emit("stat", {});
      const tasks = await this.getTasks();

      for (const task of tasks) {
        const locked = await Task.update(
          {
            isRunning: true,
            runningInstanceId: this.instanceId,
            lastRunTime: new Date(),
          },
          { where: { id: task.id, isRunning: false } }
        );

        if (locked[0] === 0) continue;

        this.process(task);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
