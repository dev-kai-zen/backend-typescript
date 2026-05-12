import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class AsaRegion extends Model<
  InferAttributes<AsaRegion>,
  InferCreationAttributes<AsaRegion>
> {
  declare id: CreationOptional<number>;
  declare region_name: string;
  declare asa_division_id: number;
}

AsaRegion.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    region_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asa_division_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_divisions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "asa_regions",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
