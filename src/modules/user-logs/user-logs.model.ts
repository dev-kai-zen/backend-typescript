import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/sequelize-config";

export class UserLog extends Model<
  InferAttributes<UserLog>,
  InferCreationAttributes<UserLog>
> {
  declare id: CreationOptional<number>;
  declare userId: CreationOptional<number | null>;
  declare action: string;
  declare module: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
  declare method: CreationOptional<string | null>;
  declare route: CreationOptional<string | null>;
  declare statusCode: CreationOptional<number | null>;
  declare ipAddress: CreationOptional<string | null>;
  declare userAgent: CreationOptional<string | null>;
  declare deviceType: CreationOptional<string | null>;
  declare browser: CreationOptional<string | null>;
  declare os: CreationOptional<string | null>;
  declare sessionId: CreationOptional<string | null>;
  declare metadata: CreationOptional<Record<string, unknown> | null>;
  declare readonly createdAt: CreationOptional<Date>;
}

UserLog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    route: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deviceType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    os: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_logs",
    underscored: true,
    timestamps: true,
    updatedAt: false,
    indexes: [
      { name: "idx_user_id", fields: ["user_id"] },
      { name: "idx_action", fields: ["action"] },
      { name: "idx_created_at", fields: ["created_at"] },
    ],
  },
);
