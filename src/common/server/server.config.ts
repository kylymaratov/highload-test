import { config } from "dotenv";

config();

const args = process.argv.slice(2);

const port = args.find((arg) => arg.startsWith("--port="))?.split("=")[1];

interface ServerConfig {
  ENV: NodeJS.ProcessEnv;
  PORT: number;
  ISDEV: boolean;
}

export const serverConfig: ServerConfig = {
  ENV: process.env,
  PORT: Number(port) || Number(process.env.PORT) || 5000,
  ISDEV: process.env.NODE_ENV === "development",
};
