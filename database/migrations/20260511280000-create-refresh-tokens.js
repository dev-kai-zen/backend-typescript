"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "refresh_tokens",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        token: {
          type: Sequelize.STRING(512),
          allowNull: false,
          unique: true,
        },
        expires_at: {
          type: Sequelize.DATE(3),
          allowNull: false,
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

    await queryInterface.addIndex("refresh_tokens", {
      fields: ["user_id"],
      name: "refresh_tokens_user_id_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "refresh_tokens",
      "refresh_tokens_user_id_idx",
    );
    await queryInterface.dropTable("refresh_tokens");
  },
};
