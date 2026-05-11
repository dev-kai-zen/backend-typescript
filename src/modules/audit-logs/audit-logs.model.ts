import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/sequelize-config";
import { User } from "../users/users.model";

export class AuditLog extends Model<
  InferAttributes<AuditLog>,
  InferCreationAttributes<AuditLog>
> {
  declare id: CreationOptional<string>;
  declare userId: CreationOptional<number | null>;
  declare action: string;
  declare entityType: string;
  declare entityId: CreationOptional<string | null>;
  declare oldValues: CreationOptional<Record<string, unknown> | null>;
  declare newValues: CreationOptional<Record<string, unknown> | null>;
  declare changeFields: CreationOptional<string[] | null>;
  declare ipAddress: CreationOptional<string | null>;
  declare userAgent: CreationOptional<string | null>;
  /** Business event time (distinct from `createdAt` when logs are backfilled or delayed). */
  declare timestamp: Date;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    action: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    entityType: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    oldValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    newValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    changeFields: {
      type: DataTypes.JSON,
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
    timestamp: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "audit_logs",
    underscored: true,
    timestamps: true,
  },
);

AuditLog.belongsTo(User, { foreignKey: "userId", as: "user" });
