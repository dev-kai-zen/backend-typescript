"use strict";

/** @see src/modules/rbac/permissions/rbac-permissions.model.ts */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "rbac_permissions",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        permission_code: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: true,
        },
        permission_description: {
          type: Sequelize.STRING(512),
          allowNull: true,
        },
        group_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          references: { model: "rbac_groups", key: "id" },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        created_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
        },
        updated_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)",
          ),
        },
      },
      { charset: "utf8mb4", collate: "utf8mb4_unicode_ci" },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("rbac_permissions");
  },
};
