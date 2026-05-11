import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/sequelize-config";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare googleId: CreationOptional<string | null>;
  declare email: string;
  declare fullName: CreationOptional<string | null>;
  declare pictureUrl: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare lastLoginAt: CreationOptional<Date | null>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pictureUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE(3),
      allowNull: true,
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
    tableName: "users",
    underscored: true,
    timestamps: true,
  },
);
