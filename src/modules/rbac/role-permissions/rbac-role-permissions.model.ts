import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";
import { RbacRole } from "../roles/rbac-roles.model";
import { RbacPermission } from "../permissions/rbac-permissions.model";

export class RbacRolePermission extends Model<
  InferAttributes<RbacRolePermission>,
  InferCreationAttributes<RbacRolePermission>
> {
  declare id: CreationOptional<number>;
  declare role_id: number;
  declare permission_id: number;
}

RbacRolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "rbac_roles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    permission_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "rbac_permissions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "rbac_role_permissions",
    underscored: true,
    /** Adds `created_at` / `updated_at` (do not duplicate them in `attributes` — fixes `bulkCreate` timestamp injection). */
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    /** Adds `deleted_at` and enables soft delete. */
    deletedAt: "deleted_at",
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["role_id", "permission_id"],
      },
    ],
  },
);

RbacRolePermission.belongsTo(RbacRole, { foreignKey: "role_id", as: "role" });
RbacRolePermission.belongsTo(RbacPermission, {
  foreignKey: "permission_id",
  as: "permission",
});

RbacPermission.hasMany(RbacRolePermission, {
  foreignKey: "permission_id",
  as: "role_permissions",
});


