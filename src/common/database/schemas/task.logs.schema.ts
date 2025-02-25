import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database";

class TaskLogs extends Model {
  public id!: number;
  public taskName!: string;
  public instanceId!: string;
  public startedAt!: Date;
  public finishedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TaskLogs.init(
  {
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
  },
  {
    sequelize,
    tableName: "task_logs",
    timestamps: true,
    underscored: true,
  }
);

export default TaskLogs;
