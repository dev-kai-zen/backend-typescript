import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class AsaBranch extends Model<
  InferAttributes<AsaBranch>,
  InferCreationAttributes<AsaBranch>
> {
  declare id: CreationOptional<number>;
  declare branch_code: string;
  declare branch_name: string;
  declare asa_area_id: number;
  declare asa_branch_type_id: number;
}

AsaBranch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    branch_code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    branch_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asa_area_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_areas",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    asa_branch_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_branch_types",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "asa_branches",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
