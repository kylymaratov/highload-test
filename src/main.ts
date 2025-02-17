import "./alias";

import express from "express";
import { setServerCors } from "@/common/server/server.cors";
import { startServer } from "@/common/server/server.runner";
import { setServerMiddlewares } from "@/common/server/server.middlewares";

async function bootstrap() {
  try {
    const app = express();

    setServerCors(app);
    setServerMiddlewares(app);

    await startServer(app);
  } catch (error) {
    console.error(`Failed start server: ${error}`);
  }
}

bootstrap();
