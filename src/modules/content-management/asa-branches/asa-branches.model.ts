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
  declare branchCode: string;
  declare branchName: string;
  declare asaAreaId: number;
  declare asaBranchTypeId: number;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

AsaBranch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    branchCode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    branchName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asaAreaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_areas",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    asaBranchTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_branch_types",
        key: "id",
      },
      onDelete: "RESTRICT",
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
    tableName: "asa_branches",
    underscored: true,
    timestamps: true,
  },
);
