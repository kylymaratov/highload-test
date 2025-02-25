import * as cron from "node-cron";
import { TaskScheduler } from "./task.schelude";

const taskScheluder = new TaskScheduler();

cron.schedule("*/30 * * * * *", () => taskScheluder.start());

process.on("SIGINT", async () => {
  await taskScheluder.revert();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await taskScheluder.revert();
  process.exit(0);
});

process.on("uncaughtException", async (err) => {
  await taskScheluder.revert();
  process.exit(1);
});
