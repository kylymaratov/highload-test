import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface, Sequelize: any) => {
  await queryInterface.createTable("tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isRunning: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    intervalSeconds: {
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
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable("tasks");
};
