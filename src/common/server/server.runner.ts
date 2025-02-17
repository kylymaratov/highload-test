import { Express } from "express";
import { serverConfig } from "./server.config";
import { sequelize } from "@/common/database/database";
import { createUser } from "@/common/database/scripts/user.scripts";

const beforeRun = async () => {
  await sequelize.authenticate();
  await createUser();
};

const afterRun = () => {
  console.info(`Server running on port: ${serverConfig.PORT}`);
};

export const startServer = async (app: Express) => {
  await beforeRun();

  app.listen(serverConfig.PORT, afterRun);
};
