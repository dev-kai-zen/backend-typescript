import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class RbacRole extends Model<
  InferAttributes<RbacRole>,
  InferCreationAttributes<RbacRole>
> {
  declare id: CreationOptional<number>;
  declare role_name: string;
  declare role_description: CreationOptional<string | null>;
}

RbacRole.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    role_description: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "rbac_roles",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

/** Value alias matching `Role` usages in rbac repositories/services. */
export { RbacRole as Role };
