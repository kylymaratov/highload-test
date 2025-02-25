import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import { v4 } from "uuid";
import os from "os";
import Task from "@/common/database/schemas/task.schema";
import TaskLogs from "@/common/database/schemas/task.logs.schema";

export class TaskScheluder {
  private instanceId: string = `${os.hostname()}-${v4()}`;
  private timeout: number = 120_000_000;

  private async getTasks() {
    const avialableTasks = await Task.findAll({
      where: {
        is_running: false,
        [Op.or]: [
          { last_run_at: null },
          { last_run_at: { [Op.lte]: new Date(Date.now() - 2 * 60 * 1000) } },
        ],
      },
      order: Sequelize.literal("random()"),
    });

    return avialableTasks;
  }

  private wait(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async start() {
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
  }

  private async endTask(task: any) {
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
    });
  }

  private async process(task: any) {
    try {
      console.info(`Task ${task.name} instanceId: ${task.runningInstanceId}`);

      await this.wait(this.timeout);
      await this.endTask(task);

      console.info(`Task ${task.name} completed on ${task.runningInstanceId}`);
    } catch (error) {
      console.error(`Task failed ${task.name} on ${task.runningInstanceId}`);
    }
  }
}
