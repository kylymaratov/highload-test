import { SequelizeStorage, Umzug } from "umzug";
import * as path from "path";
import { sequelize } from "../database";
import { Sequelize } from "sequelize";

export const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, "../migrations/*.ts"),
    resolve: ({ name, path, context }) => {
      const migration = require(path || "");
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});
