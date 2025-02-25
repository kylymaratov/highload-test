import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

class Task extends Model {
  public id!: number;
  public name!: string;
  public isRunning!: boolean;
  public intervalSeconds!: number;
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
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
