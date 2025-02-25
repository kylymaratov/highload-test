import * as cron from "node-cron";
import { TaskScheluder } from "./task.schelude";

const taskScheluder = new TaskScheluder();

cron.schedule("*/30 * * * * *", taskScheluder.start);
