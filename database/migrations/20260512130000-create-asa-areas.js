"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "asa_areas",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        area_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        asa_region_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "asa_regions",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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

    await queryInterface.addIndex("asa_areas", {
      name: "idx_asa_areas_asa_region_id",
      fields: ["asa_region_id"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "asa_areas",
      "idx_asa_areas_asa_region_id",
    );
    await queryInterface.dropTable("asa_areas");
  },
};
