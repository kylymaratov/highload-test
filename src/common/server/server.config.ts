import { config } from "dotenv";

config();

interface ServerConfig {
  ENV: NodeJS.ProcessEnv;
  PORT: number;
  ISDEV: boolean;
}

export const serverConfig: ServerConfig = {
  ENV: process.env,
  PORT: Number(process.env.PORT) || 5000,
  ISDEV: process.env.NODE_ENV === "development",
};
