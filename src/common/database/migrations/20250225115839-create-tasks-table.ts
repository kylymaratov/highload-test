import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface, Sequelize: any) => {
  await queryInterface.createTable("tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isRunning: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    interval: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastRunTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    runningInstanceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable("tasks");
};
