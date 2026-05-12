import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class AsaArea extends Model<
  InferAttributes<AsaArea>,
  InferCreationAttributes<AsaArea>
> {
  declare id: CreationOptional<number>;
  declare areaName: string;
  declare asaRegionId: number;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

AsaArea.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    areaName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asaRegionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_regions",
        key: "id",
      },
      onDelete: "CASCADE",
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
    tableName: "asa_areas",
    underscored: true,
    timestamps: true,
  },
);
