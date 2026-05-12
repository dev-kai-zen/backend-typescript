"use strict";

/** @see src/modules/content-management/asa-branches/asa-branches.model.ts */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "asa_branches",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        branch_code: {
          type: Sequelize.STRING(64),
          allowNull: false,
          unique: true,
        },
        branch_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        asa_area_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "asa_areas", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        asa_branch_type_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "asa_branch_types", key: "id" },
          onDelete: "RESTRICT",
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
    await queryInterface.dropTable("asa_branches");
  },
};
