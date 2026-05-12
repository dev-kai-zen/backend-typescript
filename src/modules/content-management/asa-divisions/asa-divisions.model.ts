import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";

export class AsaDivision extends Model<
  InferAttributes<AsaDivision>,
  InferCreationAttributes<AsaDivision>
> {
  declare id: CreationOptional<number>;
  declare division_name: string;
  declare asa_operation_id: number;
}

AsaDivision.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    division_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    asa_operation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "asa_operations",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "asa_divisions",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
