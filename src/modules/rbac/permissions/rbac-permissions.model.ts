import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../../config/sequelize-config";
import { RbacCategory } from "../categories/rbac-categories.model";

export class RbacPermission extends Model<
  InferAttributes<RbacPermission>,
  InferCreationAttributes<RbacPermission>
> {
  declare id: CreationOptional<number>;
  declare permission_code: string;
  declare permission_description: CreationOptional<string | null>;
  declare category_id: CreationOptional<number | null>;
  declare is_active: CreationOptional<boolean>;
}

RbacPermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    permission_code: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    permission_description: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "rbac_categories",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "rbac_permissions",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

RbacPermission.belongsTo(RbacCategory, {
  foreignKey: "category_id",
  as: "category",
});
