import { Express } from "express";
import { serverConfig } from "./server.config";
import { sequelize } from "@/common/database/database";
import { createTasks } from "../database/scripts/task.scripts";
// import { createUser } from "@/common/database/scripts/user.scripts";
import * as http from "http";
import { SocketIo } from "@/modules/websocket";
import { LogsSocket } from "@/modules/websocket/logs/log.socket";
import { TaskSocket } from "@/modules/websocket/task/task.socket";

const beforeRun = async (server: http.Server) => {
  await sequelize.authenticate();
  // await createUser();
  await createTasks();

  const io = SocketIo.getInstance(server);

  io.initializeHandlers([
    {
      path: "/logs",
      handler: new LogsSocket(),
    },
    {
      path: "/tasks",
      handler: new TaskSocket(),
    },
  ]);
};

const afterRun = () => {
  console.info(`Server running on port: ${serverConfig.PORT}`);
};

export const startServer = async (app: Express) => {
  const server = http.createServer(app);

  await beforeRun(server);

  server.listen(serverConfig.PORT, afterRun);
};
