import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface, Sequelize: any) => {
  await queryInterface.createTable("task_logs", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable("task_logs");
};
