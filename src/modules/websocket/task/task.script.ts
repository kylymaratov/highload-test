import Task from "@/common/database/schemas/task.schema";
import { Op, Sequelize } from "sequelize";

export const getCurrentStat = async () => {
  try {
    const inProcess = await Task.findAll({ where: { isRunning: true } });
    const scheluded = await Task.findAll({
      where: {
        isRunning: false,
        [Op.or]: [
          { lastRunTime: null },
          Sequelize.literal(
            `EXTRACT(EPOCH FROM NOW() - "Task"."lastRunTime") * 1000 <= "Task"."intervalSeconds" * 1000`
          ),
        ],
      },
    });

    return { inProcess, scheluded };
  } catch {
    return [];
  }
};
