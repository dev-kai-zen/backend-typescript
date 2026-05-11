import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class RbacPermission extends Model<
  InferAttributes<RbacPermission>,
  InferCreationAttributes<RbacPermission>
> {
  declare id: CreationOptional<number>;
  declare permissionCode: string;
  declare permissionDescription: CreationOptional<string | null>;
  declare groupId: CreationOptional<number | null>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

RbacPermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    permissionCode: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    permissionDescription: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    groupId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "rbac_groups",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
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
    tableName: "rbac_permissions",
    underscored: true,
    timestamps: true,
  },
);
