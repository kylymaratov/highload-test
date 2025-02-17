import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

export const sequelize = new Sequelize(process.env.PSQL_URL as string, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development",
});
