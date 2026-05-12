"use strict";

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
          references: {
            model: "asa_areas",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        asa_branch_type_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "asa_branch_types",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
        created_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
        },
        updated_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      },
    );

    await queryInterface.addIndex("asa_branches", {
      name: "idx_asa_branches_asa_area_id",
      fields: ["asa_area_id"],
    });
    await queryInterface.addIndex("asa_branches", {
      name: "idx_asa_branches_asa_branch_type_id",
      fields: ["asa_branch_type_id"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "asa_branches",
      "idx_asa_branches_asa_area_id",
    );
    await queryInterface.removeIndex(
      "asa_branches",
      "idx_asa_branches_asa_branch_type_id",
    );
    await queryInterface.dropTable("asa_branches");
  },
};
