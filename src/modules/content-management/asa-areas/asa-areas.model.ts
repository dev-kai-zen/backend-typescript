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
  declare area_name: string;
  declare asa_region_id: number;
}

AsaArea.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    area_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asa_region_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_regions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "asa_areas",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
