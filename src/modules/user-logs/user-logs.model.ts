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
  declare user_id: CreationOptional<number | null>;
  declare action: string;
  declare module: CreationOptional<string | null>;
  declare description: CreationOptional<string | null>;
  declare method: CreationOptional<string | null>;
  declare route: CreationOptional<string | null>;
  declare status_code: CreationOptional<number | null>;
  declare ip_address: CreationOptional<string | null>;
  declare user_agent: CreationOptional<string | null>;
  declare device_type: CreationOptional<string | null>;
  declare browser: CreationOptional<string | null>;
  declare os: CreationOptional<string | null>;
  declare session_id: CreationOptional<string | null>;
  declare metadata: CreationOptional<Record<string, unknown> | null>;
}

UserLog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
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
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    device_type: {
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
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_logs",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    indexes: [
      { name: "idx_user_id", fields: ["user_id"] },
      { name: "idx_action", fields: ["action"] },
      { name: "idx_created_at", fields: ["created_at"] },
    ],
  },
);
