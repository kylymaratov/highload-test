import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

class Task extends Model {
  public id!: number;
  public isRunning!: boolean;
  public intervalSeconds!: boolean;
  public lastRunTime!: Date;
  public runningInstanceId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
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
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
    underscored: true,
  }
);

export default Task;
