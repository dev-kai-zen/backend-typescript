import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class RbacGroup extends Model<
  InferAttributes<RbacGroup>,
  InferCreationAttributes<RbacGroup>
> {
  declare id: CreationOptional<number>;
  declare group_name: string;
}

RbacGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "rbac_groups",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
