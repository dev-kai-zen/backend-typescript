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
  declare user_id: CreationOptional<number | null>;
  declare action: string;
  declare entity_type: string;
  declare entity_id: CreationOptional<string | null>;
  declare old_values: CreationOptional<Record<string, unknown> | null>;
  declare new_values: CreationOptional<Record<string, unknown> | null>;
  declare change_fields: CreationOptional<string[] | null>;
  declare ip_address: CreationOptional<string | null>;
  declare user_agent: CreationOptional<string | null>;
  /** Business event time (distinct from `created_at` when logs are backfilled or delayed). */
  declare timestamp: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
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
    entity_type: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    old_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    new_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    change_fields: {
      type: DataTypes.JSON,
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
    timestamp: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "audit_logs",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

AuditLog.belongsTo(User, { foreignKey: "user_id", as: "user" });
